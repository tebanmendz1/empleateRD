"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStoredUser } from "@/components/account-nav";
import { api } from "@/lib/api";
type Member = {
  id: number;
  name: string;
  email: string;
  role: "owner" | "admin" | "recruiter" | "viewer";
  status: string;
};
const access = () => localStorage.getItem("empleaterd_token");
const labels = {
  owner: "Propietario",
  admin: "Administrador",
  recruiter: "Reclutador",
  viewer: "Solo lectura",
};
export default function CompanyTeam() {
  const router = useRouter(),
    user = useStoredUser();
  const [members, setMembers] = useState<Member[] | null>(null),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!access()) {
      router.replace("/acceso?next=/empresa/equipo");
      return;
    }
    if (user && user.account_type !== "company") {
      router.replace("/panel");
      return;
    }
    api("/company/team", { headers: { Authorization: `Bearer ${access()}` } })
      .then((r) => setMembers(r.data))
      .catch(showError);
  }, [router, user]);
  function showError(err: unknown) {
    setError(
      err instanceof Error ? err.message : "No pudimos completar la solicitud.",
    );
  }
  async function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = e.currentTarget,
      f = new FormData(form);
    try {
      const r = await api("/company/team", {
        method: "POST",
        headers: { Authorization: `Bearer ${access()}` },
        body: JSON.stringify(Object.fromEntries(f)),
      });
      setMembers(r.data);
      setMessage(r.message);
      form.reset();
    } catch (err) {
      showError(err);
    } finally {
      setSaving(false);
    }
  }
  async function change(id: number, role: string) {
    try {
      const r = await api(`/company/team/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${access()}` },
        body: JSON.stringify({ role }),
      });
      setMembers(r.data);
      setMessage(r.message);
    } catch (err) {
      showError(err);
    }
  }
  async function remove(id: number) {
    if (!window.confirm("¿Eliminar esta persona del equipo?")) return;
    try {
      const r = await api(`/company/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${access()}` },
      });
      setMembers(r.data);
      setMessage(r.message);
    } catch (err) {
      showError(err);
    }
  }
  if (!members)
    return (
      <main className="grid min-h-[75vh] place-items-center bg-slate-50 text-slate-500">
        Cargando equipo…
      </main>
    );
  const owner = members.find((x) => x.email === user?.email)?.role === "owner";
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Cuenta empresarial
        </p>
        <h1 className="mt-1 text-3xl font-black">Equipo y permisos</h1>
        <p className="mt-2 text-slate-500">
          Controla quién puede colaborar en los procesos de contratación.
        </p>
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
        {owner && (
          <form
            onSubmit={add}
            className="mt-7 grid gap-3 rounded-2xl border bg-white p-5 sm:grid-cols-[1fr_180px_auto]"
          >
            <input
              required
              type="email"
              name="email"
              placeholder="correo@empresa.com"
              className="rounded-xl border p-3"
            />
            <select name="role" className="rounded-xl border p-3">
              <option value="recruiter">Reclutador</option>
              <option value="admin">Administrador</option>
              <option value="viewer">Solo lectura</option>
            </select>
            <button
              disabled={saving}
              className="rounded-xl bg-blue-700 px-5 font-bold text-white disabled:opacity-60"
            >
              Agregar
            </button>
            <p className="text-xs text-slate-500 sm:col-span-3">
              La persona debe tener previamente una cuenta empresarial en
              EmpléateRD.
            </p>
          </form>
        )}
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b p-5 last:border-0"
            >
              <div>
                <p className="font-extrabold">{member.name}</p>
                <p className="text-sm text-slate-500">{member.email}</p>
              </div>
              <div className="flex items-center gap-3">
                {owner && member.role !== "owner" ? (
                  <>
                    <select
                      value={member.role}
                      onChange={(e) => change(member.id, e.target.value)}
                      className="rounded-lg border p-2 text-sm"
                    >
                      <option value="admin">Administrador</option>
                      <option value="recruiter">Reclutador</option>
                      <option value="viewer">Solo lectura</option>
                    </select>
                    <button
                      onClick={() => remove(member.id)}
                      className="text-sm font-bold text-rose-700"
                    >
                      Eliminar
                    </button>
                  </>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                    {labels[member.role]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <Role
          title="Administrador"
          text="Gestiona vacantes y procesos empresariales."
          />
          <Role title="Reclutador" text="Trabaja con vacantes y candidatos." />
          <Role
            title="Solo lectura"
            text="Consulta información sin modificarla."
          />
        </div>
      </div>
    </main>
  );
}
function Role({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}
