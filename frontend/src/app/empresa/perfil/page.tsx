"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStoredUser } from "@/components/account-nav";
import { api } from "@/lib/api";
type Company = Record<string, unknown> & {
  completion?: number;
  verification_status?: string;
};
const access = () => localStorage.getItem("empleaterd_token");
export default function CompanyProfile() {
  const router = useRouter(),
    user = useStoredUser();
  const [company, setCompany] = useState<Company | null>(null),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!access()) {
      router.replace("/acceso?next=/empresa/perfil");
      return;
    }
    if (user && user.account_type !== "company") {
      router.replace("/panel");
      return;
    }
    api("/company/profile", {
      headers: { Authorization: `Bearer ${access()}` },
    })
      .then((r) => setCompany(r.data))
      .catch(showError);
  }, [router, user]);
  function showError(err: unknown) {
    setError(
      err instanceof Error ? err.message : "No pudimos completar la solicitud.",
    );
  }
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const r = await api("/company/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${access()}` },
        body: JSON.stringify(Object.fromEntries(f)),
      });
      setCompany(r.data);
      setMessage(r.message);
    } catch (err) {
      showError(err);
    } finally {
      setSaving(false);
    }
  }
  async function submitVerification() {
    setSaving(true);
    setError("");
    try {
      const r = await api("/company/verification/submit", {
        method: "POST",
        headers: { Authorization: `Bearer ${access()}` },
      });
      setCompany(r.data);
      setMessage(r.message);
    } catch (err) {
      showError(err);
    } finally {
      setSaving(false);
    }
  }
  if (!company)
    return (
      <main className="grid min-h-[75vh] place-items-center bg-slate-50 text-slate-500">
        Cargando perfil empresarial…
      </main>
    );
  const status = company.verification_status ?? "incomplete";
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase text-blue-700">
              Cuenta empresarial
            </p>
            <h1 className="mt-1 text-3xl font-black">Perfil y verificación</h1>
            <p className="mt-2 text-slate-500">
              Esta información identifica a tu empresa ante candidatos y
              EmpléateRD.
            </p>
          </div>
          <div className="rounded-2xl border bg-white px-5 py-3">
            <p className="text-xs font-bold uppercase text-slate-500">
              Completado
            </p>
            <p className="text-2xl font-black text-blue-700">
              {company.completion ?? 0}%
            </p>
          </div>
        </div>
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
        <Status value={String(status)} />
        <form
          onSubmit={save}
          className="mt-6 grid gap-5 rounded-3xl border bg-white p-7 sm:grid-cols-2"
        >
          <Field
            label="Nombre comercial"
            name="name"
            value={company.name}
            required
          />
          <Field
            label="Razón social"
            name="legal_name"
            value={company.legal_name}
            required
          />
          <Field
            label="RNC o identificación fiscal"
            name="tax_id"
            value={company.tax_id}
            required
          />
          <Field
            label="Industria"
            name="industry"
            value={company.industry}
            required
          />
          <Field
            label="Teléfono empresarial"
            name="phone"
            value={company.phone}
            required
          />
          <Field
            label="Ubicación"
            name="location"
            value={company.location}
            required
          />
          <Field
            label="Sitio web"
            name="website"
            value={company.website}
            type="url"
          />
          <label className="text-sm font-bold">
            Cantidad de empleados
            <select
              required
              name="size"
              defaultValue={String(company.size ?? "")}
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            >
              <option value="">Seleccionar</option>
              {["1-10", "11-50", "51-200", "201-500", "501+"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold sm:col-span-2">
            Descripción de la empresa
            <textarea
              required
              name="description"
              rows={5}
              defaultValue={String(company.description ?? "")}
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            />
          </label>
          <button
            disabled={saving}
            className="rounded-xl bg-blue-700 p-4 font-extrabold text-white disabled:opacity-60 sm:col-span-2"
          >
            {saving ? "Guardando…" : "Guardar perfil empresarial"}
          </button>
        </form>
        <button
          disabled={saving || status === "pending" || status === "verified"}
          onClick={submitVerification}
          className="mt-5 w-full rounded-xl bg-emerald-500 p-4 font-black text-slate-950 disabled:opacity-50"
        >
          {status === "pending"
            ? "Verificación en revisión"
            : status === "verified"
              ? "Empresa verificada"
              : "Solicitar verificación"}
        </button>
      </div>
    </main>
  );
}
function Field({
  label,
  name,
  value,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: unknown;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-bold">
      {label}
      <input
        required={required}
        type={type}
        name={name}
        defaultValue={String(value ?? "")}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      />
    </label>
  );
}
function Status({ value }: { value: string }) {
  const values: Record<string, [string, string]> = {
    incomplete: [
      "Perfil pendiente",
      "Completa todos los campos para solicitar verificación.",
    ],
    pending: [
      "En revisión",
      "Recibimos tus datos y serán revisados por EmpléateRD.",
    ],
    verified: [
      "Empresa verificada",
      "Tu empresa completó la verificación básica.",
    ],
    rejected: [
      "Requiere corrección",
      "Revisa los datos empresariales y vuelve a enviar la solicitud.",
    ],
  };
  const [label, text] = values[value] ?? values.incomplete;
  return (
    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p className="font-extrabold text-amber-900">{label}</p>
      <p className="mt-1 text-sm text-amber-800">{text}</p>
    </div>
  );
}
