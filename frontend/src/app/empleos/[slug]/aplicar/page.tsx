"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getJob } from "@/data/jobs";
type Doc = { id: number; original_name: string; kind: string };
export default function Apply() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const job = getJob(slug);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("empleaterd_token");
    if (!token) {
      router.push(`/acceso?next=/empleos/${slug}/aplicar`);
      return;
    }
    api("/candidate/documents", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => setDocs(r.data))
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "No pudimos cargar tus documentos.",
        ),
      );
  }, [router, slug]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget),
      token = localStorage.getItem("empleaterd_token");
    try {
      await api(`/candidate/jobs/${slug}/applications`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          candidate_document_id: f.get("candidate_document_id")
            ? Number(f.get("candidate_document_id"))
            : null,
          cover_letter: f.get("cover_letter"),
        }),
      });
      router.push("/mis-postulaciones?created=1");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No pudimos enviar tu postulación.",
      );
    } finally {
      setLoading(false);
    }
  }
  if (!job)
    return <main className="p-10 text-center">Vacante no encontrada.</main>;
  return (
    <main className="min-h-[70vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/empleos/${slug}`}
          className="text-sm font-bold text-blue-700"
        >
          ← Volver a la vacante
        </Link>
        <section className="mt-5 rounded-3xl border bg-white p-7 sm:p-9">
          <p className="text-sm font-bold text-blue-700">{job.company}</p>
          <h1 className="mt-1 text-3xl font-black">Postularme a {job.title}</h1>
          <p className="mt-3 text-slate-500">
            Enviaremos una instantánea de tu perfil actual para preservar esta
            postulación.
          </p>
          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700"
            >
              {error}
            </p>
          )}
          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block text-sm font-bold">
              Currículum o documento
              <select
                name="candidate_document_id"
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
              >
                <option value="">Aplicar sin documento</option>
                {docs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.original_name} ({d.kind})
                  </option>
                ))}
              </select>
            </label>
            {!docs.length && (
              <p className="text-sm text-amber-700">
                No tienes un CV cargado. Puedes añadirlo desde{" "}
                <Link className="font-bold underline" href="/mi-perfil">
                  Mi perfil
                </Link>
                .
              </p>
            )}
            <label className="block text-sm font-bold">
              Carta de presentación opcional
              <textarea
                name="cover_letter"
                maxLength={3000}
                rows={7}
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
                placeholder="Cuéntale a la empresa por qué te interesa la posición."
              />
            </label>
            <label className="flex gap-3 text-sm text-slate-600">
              <input required type="checkbox" className="mt-1" />
              Confirmo que la información de mi perfil es correcta.
            </label>
            <button
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 p-4 font-black text-slate-950 disabled:opacity-60"
            >
              {loading ? "Enviando…" : "Confirmar postulación"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
