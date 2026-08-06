"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
type Data = {
  summary: Record<string, number>;
  jobs: {
    id: number;
    title: string;
    status: string;
    applications_count: number;
    views_count: number;
    apply_starts_count: number;
    conversion_rate: number;
  }[];
};
const labels: Record<string, string> = {
  jobs: "Vacantes",
  active_jobs: "Vacantes activas",
  applications: "Postulaciones",
  job_views: "Vistas",
  apply_starts: "Iniciaron aplicación",
  conversion_rate: "Conversión (%)",
  interviews: "Entrevistas",
  hired: "Contrataciones",
};
export default function CompanyReports() {
  const [data, setData] = useState<Data | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    api("/company/reports", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
      },
    })
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos cargar los reportes.",
        ),
      );
  }, []);
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Panel empresarial
        </p>
        <h1 className="mt-1 text-3xl font-black">Reportes</h1>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        {data && (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {Object.entries(data.summary).map(([key, value]) => (
                <div key={key} className="rounded-2xl border bg-white p-5">
                  <p className="text-sm font-bold text-slate-500">
                    {labels[key] ?? key}
                  </p>
                  <p className="mt-2 text-3xl font-black">{value}</p>
                </div>
              ))}
            </div>
            <section className="mt-7 rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-black">Rendimiento por vacante</h2>
              <div className="mt-4 divide-y">
                {data.jobs.map((j) => (
                  <div key={j.id} className="flex justify-between gap-4 py-3">
                    <div>
                      <b>{j.title}</b>
                      <p className="text-xs uppercase text-slate-500">
                        {j.status}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <b>{j.views_count} vistas · {j.applications_count} aplicaron</b>
                      <p className="text-slate-500">{j.apply_starts_count} iniciaron · {j.conversion_rate}% conversión</p>
                    </div>
                  </div>
                ))}
                {!data.jobs.length && (
                  <p className="text-slate-500">
                    Aún no hay datos de vacantes.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
