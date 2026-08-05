"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
type Job = {
  id: number;
  title: string;
  status: string;
  quality_score: number;
  created_at: string;
};
const labels: Record<string, string> = {
  draft: "Borrador",
  pending_payment: "Pendiente de pago",
  pending_review: "Pendiente de revisión",
  changes_requested: "Requiere corrección",
  active: "Activa",
  rejected: "Rechazada",
};
export default function Jobs() {
  const [jobs, setJobs] = useState<Job[] | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    api("/company/jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
      },
    })
      .then((r) => setJobs(r.data))
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos cargar las vacantes.",
        ),
      );
  }, []);
  if (!jobs)
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50">
        Cargando vacantes…
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase text-blue-700">
              Panel empresarial
            </p>
            <h1 className="mt-1 text-3xl font-black">Mis vacantes</h1>
          </div>
          <Link
            href="/empresa/vacantes/nueva"
            className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
          >
            Nueva vacante
          </Link>
        </div>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <div className="mt-7 space-y-3">
          {jobs.length ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white p-5"
              >
                <div>
                  <h2 className="font-extrabold">{job.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Calidad {job.quality_score}/100 ·{" "}
                    {new Date(job.created_at).toLocaleDateString("es-DO")}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                  {labels[job.status] ?? job.status}
                </span>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
              Todavía no has creado vacantes.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
