"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
type Application = {
  id: number;
  status: string;
  applied_at: string;
  job: { slug: string; title: string; company: string; location: string };
};
const labels: Record<string, string> = {
  submitted: "Enviada",
  viewed: "Vista",
  evaluating: "En evaluación",
  shortlisted: "Preseleccionada",
  interview: "Entrevista",
  offer: "Oferta",
  hired: "Contratada",
  rejected: "Rechazada",
  withdrawn: "Retirada",
};
export default function Applications() {
  const router = useRouter();
  const [items, setItems] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("empleaterd_token");
    if (!token) {
      router.push("/acceso?next=/mis-postulaciones");
      return;
    }
    api("/candidate/applications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => setItems(r.data))
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "No pudimos cargar las postulaciones.",
        ),
      );
  }, [router]);
  async function withdraw(id: number) {
    if (!confirm("¿Deseas retirar esta postulación?")) return;
    try {
      const token = localStorage.getItem("empleaterd_token"),
        r = await api(`/candidate/applications/${id}/withdraw`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
      setItems(items.map((x) => (x.id === id ? r.data : x)));
      setMessage(r.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos retirarla.");
    }
  }
  return (
    <main className="min-h-[70vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Área del candidato
        </p>
        <h1 className="mt-1 text-3xl font-black">Mis postulaciones</h1>
        {message && (
          <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-emerald-800">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <div className="mt-7 space-y-4">
          {items.map((a) => (
            <article key={a.id} className="rounded-2xl border bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/empleos/${a.job.slug}`}
                    className="text-xl font-extrabold hover:text-blue-700"
                  >
                    {a.job.title}
                  </Link>
                  <p className="mt-1 font-semibold text-slate-600">
                    {a.job.company}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    {a.job.location} ·{" "}
                    {new Date(a.applied_at).toLocaleDateString("es-DO")}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                  {labels[a.status] ?? a.status}
                </span>
              </div>
              {!["withdrawn", "rejected", "hired"].includes(a.status) && (
                <button
                  onClick={() => withdraw(a.id)}
                  className="mt-5 text-sm font-bold text-rose-700"
                >
                  Retirar postulación
                </button>
              )}
            </article>
          ))}
          {!items.length && !error && (
            <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
              <h2 className="text-xl font-extrabold">
                Aún no tienes postulaciones
              </h2>
              <Link
                href="/empleos"
                className="mt-4 inline-block font-bold text-blue-700"
              >
                Explorar vacantes
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
