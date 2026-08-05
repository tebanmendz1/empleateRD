"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
type Application = {
  id: number;
  status: string;
  applied_at: string;
  user: { name: string; email: string };
  job: { title: string };
};
const labels: Record<string, string> = {
  submitted: "Nueva",
  viewed: "Vista",
  evaluating: "En evaluación",
  shortlisted: "Preseleccionada",
  interview: "Entrevista",
  offer: "Oferta",
  hired: "Contratada",
  rejected: "Rechazada",
  withdrawn: "Retirada",
};
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function Candidates() {
  const [items, setItems] = useState<Application[]>([]),
    [error, setError] = useState("");
  useEffect(() => {
    api("/company/applications", { headers: auth() })
      .then((r) => setItems(r.data))
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : "No pudimos cargar las candidaturas.",
        ),
      );
  }, []);
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Panel empresarial
        </p>
        <h1 className="mt-1 text-3xl font-black">Candidatos</h1>
        <p className="mt-2 text-slate-500">
          Revisa postulaciones y gestiona cada proceso.
        </p>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <div className="mt-7 space-y-3">
          {items.map((a) => (
            <Link
              key={a.id}
              href={`/empresa/candidatos/${a.id}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white p-5 hover:border-blue-300"
            >
              <div>
                <h2 className="font-extrabold">{a.user.name}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {a.job.title} · {a.user.email} ·{" "}
                  {new Date(a.applied_at).toLocaleDateString("es-DO")}
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {labels[a.status] ?? a.status}
              </span>
            </Link>
          ))}
          {!items.length && !error && (
            <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500">
              Todavía no hay candidaturas.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
