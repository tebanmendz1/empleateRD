"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
type Log = {
  id: number;
  action: string;
  response_status: number;
  created_at: string;
  user?: { name: string };
};
type Suggestion={id:number;name?:string;email:string;category:string;message:string;status:string;created_at:string};
type Data = { summary: Record<string, number>; recent_activity: Log[] };
const labels: Record<string, string> = {
  users: "Usuarios",
  candidates: "Candidatos",
  companies: "Empresas",
  verified_companies: "Empresas verificadas",
  active_jobs: "Vacantes activas",
  applications: "Postulaciones",
  job_views: "Vistas de vacantes",
  apply_starts: "Inicios de aplicación",
  view_to_application_rate: "Conversión (%)",
  approved_revenue: "Ingresos aprobados",
};
export default function AdminReports() {
  const [data, setData] = useState<Data | null>(null),
    [suggestions,setSuggestions]=useState<Suggestion[]>([]),
    [error, setError] = useState("");
  useEffect(() => {
    Promise.all([api("/admin/reports", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
      },
    }),api("/admin/suggestions",{headers:{Authorization:`Bearer ${localStorage.getItem("empleaterd_token")}`}})])
      .then(([r,s]) => {setData(r.data);setSuggestions(s.data.data);})
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos cargar las métricas.",
        ),
      );
  }, []);
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Administración
        </p>
        <h1 className="mt-1 text-3xl font-black">Métricas y auditoría</h1>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        {data && (
          <>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(data.summary).map(([key, value]) => (
                <div key={key} className="rounded-2xl border bg-white p-5">
                  <p className="text-sm font-bold text-slate-500">
                    {labels[key] ?? key}
                  </p>
                  <p className="mt-2 text-3xl font-black">
                    {key === "approved_revenue"
                      ? `RD$${value.toLocaleString("es-DO")}`
                      : value}
                  </p>
                </div>
              ))}
            </div>
            <section className="mt-7 rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-black">Sugerencias recientes</h2>
              <div className="mt-4 space-y-3">{suggestions.map(s=><article key={s.id} className="rounded-xl bg-slate-50 p-4"><div className="flex justify-between gap-3"><b>{s.name||s.email}</b><span className="text-xs font-bold uppercase text-blue-700">{s.category} · {s.status}</span></div><p className="mt-2 text-sm text-slate-600">{s.message}</p></article>)}{!suggestions.length&&<p className="text-sm text-slate-500">No hay sugerencias recibidas.</p>}</div>
            </section>
            <section className="mt-7 rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-black">Actividad reciente</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Usuario</th>
                      <th className="p-3">Acción</th>
                      <th className="p-3">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent_activity.map((log) => (
                      <tr key={log.id} className="border-b">
                        <td className="p-3">
                          {new Date(log.created_at).toLocaleString("es-DO")}
                        </td>
                        <td className="p-3">{log.user?.name ?? "Sistema"}</td>
                        <td className="p-3 font-mono text-xs">{log.action}</td>
                        <td className="p-3">{log.response_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
