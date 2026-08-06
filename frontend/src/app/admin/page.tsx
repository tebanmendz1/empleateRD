"use client";
import { useEffect, useState } from "react";
import { API_URL, api } from "@/lib/api";
import { useStoredUser } from "@/components/account-nav";
import Link from "next/link";
type Payment = {
  id: number;
  amount: string;
  currency: string;
  proof_name: string;
  company: { name: string };
  job: { title: string };
};
type Company = {
  id: number;
  name: string;
  legal_name?: string;
  tax_id?: string;
  industry?: string;
  location?: string;
  website?: string;
  phone?: string;
  size?: string;
  verification_submitted_at: string;
  members: { name: string; email: string }[];
};
type Job = {
  id: number;
  title: string;
  summary: string;
  quality_score: number;
  company: { name: string; verification_status: string };
};
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function Admin() {
  const user = useStoredUser(),
    [companies, setCompanies] = useState<Company[]>([]),
    [payments, setPayments] = useState<Payment[]>([]),
    [jobs, setJobs] = useState<Job[]>([]),
    [error, setError] = useState("");
  function load() {
    api("/admin/moderation", { headers: auth() })
      .then((r) => {
        setCompanies(r.data.companies);
        setPayments(r.data.payments);
        setJobs(r.data.jobs);
      })
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos cargar la moderación.",
        ),
      );
  }
  useEffect(() => {
    if (user?.is_admin) load();
  }, [user?.is_admin]);
  async function review(path: string, decision: string) {
    const note =
      decision === "approve"
        ? null
        : window.prompt("Indica el motivo u observación:");
    if (decision !== "approve" && !note) return;
    try {
      await api(path, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ decision, note }),
      });
      load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No pudimos registrar la revisión.",
      );
    }
  }
  if (!user?.is_admin)
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50">
        <div className="rounded-2xl border bg-white p-8">
          Acceso administrativo requerido.
        </div>
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Administración
        </p>
        <h1 className="mt-1 text-3xl font-black">Moderación pendiente</h1>
        <Link
          href="/admin/reportes"
          className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          Ver métricas y auditoría
        </Link>
        <Link
          href="/admin/sistema"
          className="mt-4 ml-3 inline-block rounded-xl border bg-white px-4 py-2.5 text-sm font-bold"
        >
          Estado del sistema
        </Link>
        <Link href="/admin/ferias" className="mt-4 ml-3 inline-block rounded-xl border bg-white px-4 py-2.5 text-sm font-bold">
          Gestionar ferias
        </Link>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <h2 className="mt-8 text-xl font-black">
          Empresas ({companies.length})
        </h2>
        <div className="mt-3 space-y-3">
          {companies.map((company) => (
            <article
              key={company.id}
              className="rounded-2xl border bg-white p-5"
            >
              <b>{company.name}</b>
              <p className="mt-1 text-sm text-slate-500">
                {company.legal_name} · RNC/identificación: {company.tax_id} ·{" "}
                {company.industry}
              </p>
              <p className="mt-2 text-sm">
                {company.location} · {company.phone} · {company.size} empleados
              </p>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm font-bold text-blue-700"
                >
                  Visitar sitio web
                </a>
              )}
              {company.members[0] && (
                <p className="mt-2 text-sm text-slate-500">
                  Responsable: {company.members[0].name} ·{" "}
                  {company.members[0].email}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    review(`/admin/companies/${company.id}/review`, "approve")
                  }
                  className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold"
                >
                  Verificar empresa
                </button>
                <button
                  onClick={() =>
                    review(`/admin/companies/${company.id}/review`, "reject")
                  }
                  className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700"
                >
                  Rechazar
                </button>
              </div>
            </article>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-black">
          Comprobantes ({payments.length})
        </h2>
        <div className="mt-3 space-y-3">
          {payments.map((p) => (
            <article key={p.id} className="rounded-2xl border bg-white p-5">
              <b>
                {p.company.name} · {p.job.title}
              </b>
              <p className="mt-1 text-sm text-slate-500">
                {p.currency} {Number(p.amount).toLocaleString("es-DO")} ·{" "}
                {p.proof_name}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`${API_URL}/admin/payments/${p.id}/proof`}
                  onClick={async (e) => {
                    e.preventDefault();
                    const r = await fetch(e.currentTarget.href, {
                      headers: auth(),
                    });
                    const blob = await r.blob();
                    window.open(URL.createObjectURL(blob));
                  }}
                  className="rounded-lg border px-3 py-2 text-sm font-bold"
                >
                  Ver comprobante
                </a>
                <button
                  onClick={() =>
                    review(`/admin/payments/${p.id}/review`, "approve")
                  }
                  className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold"
                >
                  Aprobar
                </button>
                <button
                  onClick={() =>
                    review(`/admin/payments/${p.id}/review`, "reject")
                  }
                  className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700"
                >
                  Rechazar
                </button>
              </div>
            </article>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-black">Vacantes ({jobs.length})</h2>
        <div className="mt-3 space-y-3">
          {jobs.map((j) => (
            <article key={j.id} className="rounded-2xl border bg-white p-5">
              <b>{j.title}</b>
              <p className="mt-1 text-sm text-slate-500">
                {j.company.name} · Calidad {j.quality_score}/100
              </p>
              <p className="mt-3 text-sm">{j.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    review(`/admin/jobs/${j.id}/review`, "approve")
                  }
                  className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold"
                >
                  Publicar
                </button>
                <button
                  onClick={() =>
                    review(`/admin/jobs/${j.id}/review`, "changes")
                  }
                  className="rounded-lg bg-amber-100 px-3 py-2 text-sm font-bold"
                >
                  Solicitar cambios
                </button>
                <button
                  onClick={() => review(`/admin/jobs/${j.id}/review`, "reject")}
                  className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700"
                >
                  Rechazar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
