"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStoredUser } from "@/components/account-nav";
import { api } from "@/lib/api";
type Quote = {
  reference: string;
  total: number;
  currency: string;
  expires_at: string;
};
type Job = {
  id: number;
  quality_score: number;
  quality_issues: string[];
  status: string;
};
const access = () => localStorage.getItem("empleaterd_token"),
  lines = (value: FormDataEntryValue | null) =>
    String(value ?? "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
export default function NewJob() {
  const router = useRouter(),
    user = useStoredUser();
  const [quotes, setQuotes] = useState<Quote[] | null>(null),
    [job, setJob] = useState<Job | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!access()) {
      router.replace("/acceso?next=/empresa/vacantes/nueva");
      return;
    }
    if (user && user.account_type !== "company") {
      router.replace("/panel");
      return;
    }
    api("/company/quotations", {
      headers: { Authorization: `Bearer ${access()}` },
    })
      .then((r) =>
        setQuotes(
          r.data.filter((q: Quote) => new Date(q.expires_at) > new Date()),
        ),
      )
      .catch(showError);
  }, [router, user]);
  function showError(err: unknown) {
    setError(
      err instanceof Error ? err.message : "No pudimos completar la solicitud.",
    );
  }
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget),
      body = {
        quotation_reference: f.get("quotation_reference"),
        title: f.get("title"),
        summary: f.get("summary"),
        description: f.get("description"),
        requirements: lines(f.get("requirements")),
        benefits: lines(f.get("benefits")),
        location: f.get("location"),
        modality: f.get("modality"),
        contract_type: f.get("contract_type"),
        salary_min: Number(f.get("salary_min")) || null,
        salary_max: Number(f.get("salary_max")) || null,
        currency: f.get("currency"),
      };
    try {
      const r = await api("/company/jobs", {
        method: "POST",
        headers: { Authorization: `Bearer ${access()}` },
        body: JSON.stringify(body),
      });
      setJob(r.data);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  }
  async function submit() {
    if (!job) return;
    setLoading(true);
    try {
      const r = await api(`/company/jobs/${job.id}/submit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${access()}` },
      });
      setJob(r.data);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  }
  if (!quotes)
    return (
      <main className="grid min-h-[75vh] place-items-center bg-slate-50 text-slate-500">
        Cargando configuración…
      </main>
    );
  if (!quotes.length)
    return (
      <main className="grid min-h-[75vh] place-items-center bg-slate-50 px-5">
        <div className="max-w-lg rounded-3xl border bg-white p-8 text-center">
          <h1 className="text-2xl font-black">Primero genera una cotización</h1>
          <p className="mt-3 text-slate-500">
            La vacante debe quedar asociada a una configuración vigente.
          </p>
          <Link
            href="/publicar"
            className="mt-6 inline-block rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
          >
            Ir al cotizador
          </Link>
        </div>
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Nueva vacante
        </p>
        <h1 className="mt-1 text-3xl font-black">Describe la oportunidad</h1>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        {job ? (
          <div className="mt-7 rounded-3xl border bg-white p-8">
            <p className="text-sm font-bold uppercase text-emerald-600">
              Borrador guardado
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Calidad: {job.quality_score}/100
            </h2>
            {job.quality_issues?.length > 0 && (
              <div className="mt-5 space-y-2">
                {job.quality_issues.map((issue) => (
                  <p
                    key={issue}
                    className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900"
                  >
                    → {issue}
                  </p>
                ))}
              </div>
            )}
            <button
              disabled={
                loading || job.quality_score < 60 || job.status !== "draft"
              }
              onClick={submit}
              className="mt-6 w-full rounded-xl bg-emerald-500 p-4 font-black text-slate-950 disabled:opacity-50"
            >
              {job.status === "pending_payment"
                ? "Pendiente de pago"
                : "Continuar al pago"}
            </button>
            <Link
              href="/empresa/vacantes"
              className="mt-4 block text-center font-bold text-blue-700"
            >
              Ver mis vacantes
            </Link>
          </div>
        ) : (
          <form
            onSubmit={save}
            className="mt-7 grid gap-5 rounded-3xl border bg-white p-7 sm:grid-cols-2"
          >
            <Select
              label="Cotización vigente"
              name="quotation_reference"
              options={quotes.map((q) => [
                q.reference,
                `${q.reference.slice(0, 8).toUpperCase()} · RD$${q.total.toLocaleString()}`,
              ])}
            />
            <Field label="Título del puesto" name="title" required />
            <label className="text-sm font-bold sm:col-span-2">
              Resumen breve
              <textarea
                required
                maxLength={500}
                name="summary"
                rows={3}
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
              />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              Descripción completa
              <textarea
                required
                name="description"
                rows={7}
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
              />
            </label>
            <Area label="Requisitos" name="requirements" hint="Uno por línea" />
            <Area label="Beneficios" name="benefits" hint="Uno por línea" />
            <Field label="Ubicación" name="location" required />
            <Select
              label="Modalidad"
              name="modality"
              options={[
                ["Presencial", "Presencial"],
                ["Remoto", "Remoto"],
                ["Híbrido", "Híbrido"],
              ]}
            />
            <Select
              label="Tipo de contrato"
              name="contract_type"
              options={[
                ["Tiempo completo", "Tiempo completo"],
                ["Medio tiempo", "Medio tiempo"],
                ["Contrato", "Contrato"],
                ["Freelance", "Freelance"],
              ]}
            />
            <Select
              label="Moneda"
              name="currency"
              options={[
                ["DOP", "Peso dominicano"],
                ["USD", "Dólar estadounidense"],
              ]}
            />
            <Field label="Salario mínimo" name="salary_min" type="number" />
            <Field label="Salario máximo" name="salary_max" type="number" />
            <button
              disabled={loading}
              className="rounded-xl bg-blue-700 p-4 font-extrabold text-white disabled:opacity-60 sm:col-span-2"
            >
              {loading ? "Guardando…" : "Guardar borrador y analizar"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-bold">
      {label}
      <input
        required={required}
        type={type}
        min={type === "number" ? 0 : undefined}
        name={name}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      />
    </label>
  );
}
function Area({
  label,
  name,
  hint,
}: {
  label: string;
  name: string;
  hint: string;
}) {
  return (
    <label className="text-sm font-bold">
      {label}
      <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>
      <textarea
        required
        name={name}
        rows={5}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      />
    </label>
  );
}
function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[][];
}) {
  return (
    <label className="text-sm font-bold">
      {label}
      <select
        required
        name={name}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
