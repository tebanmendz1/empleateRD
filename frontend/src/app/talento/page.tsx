"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
type Invite = {
  id: number;
  status: string;
  message?: string;
  company: { id: number; name: string };
  job: { title: string; slug: string };
};
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function TalentPreferences() {
  const [invites, setInvites] = useState<Invite[]>([]),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  function load() {
    api("/candidate/talent/invitations", { headers: auth() })
      .then((r) => setInvites(r.data))
      .catch(show);
  }
  useEffect(load, []);
  function show(e: unknown) {
    setError(
      e instanceof Error ? e.message : "No pudimos completar la solicitud.",
    );
  }
  async function visibility(enabled: boolean) {
    try {
      const r = await api("/candidate/talent/preferences", {
        method: "PUT",
        headers: auth(),
        body: JSON.stringify({
          talent_visibility: enabled ? "verified_companies" : "hidden",
          available_for_opportunities: enabled,
        }),
      });
      setMessage(r.message);
    } catch (e) {
      show(e);
    }
  }
  async function respond(id: number, response: string) {
    try {
      await api(`/candidate/talent/invitations/${id}/respond`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ response }),
      });
      load();
    } catch (e) {
      show(e);
    }
  }
  async function block(company: number) {
    if (!confirm("¿Bloquear esta empresa?")) return;
    try {
      await api(`/candidate/talent/companies/${company}/block`, {
        method: "POST",
        headers: auth(),
      });
      setMessage("Empresa bloqueada.");
      load();
    } catch (e) {
      show(e);
    }
  }
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Privacidad y oportunidades
        </p>
        <h1 className="mt-1 text-3xl font-black">Base de talentos</h1>
        <section className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Controla tu visibilidad</h2>
          <p className="mt-2 text-slate-600">
            Solo empresas verificadas podrán ver un perfil parcialmente
            anonimizado. Tus datos de contacto no se muestran.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => visibility(true)}
              className="rounded-xl bg-emerald-500 px-4 py-3 font-bold"
            >
              Disponible para oportunidades
            </button>
            <button
              onClick={() => visibility(false)}
              className="rounded-xl border px-4 py-3 font-bold"
            >
              Mantenerme oculto
            </button>
          </div>
        </section>
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
        <h2 className="mt-8 text-xl font-black">Invitaciones</h2>
        <div className="mt-3 space-y-3">
          {invites.map((i) => (
            <article key={i.id} className="rounded-2xl border bg-white p-5">
              <b>
                {i.company.name} · {i.job.title}
              </b>
              {i.message && <p className="mt-2 text-slate-600">{i.message}</p>}
              <p className="mt-2 text-xs font-bold uppercase text-blue-700">
                {i.status}
              </p>
              {i.status === "pending" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => respond(i.id, "accepted")}
                    className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => respond(i.id, "declined")}
                    className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-bold"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => block(i.company.id)}
                    className="rounded-lg border px-3 py-2 text-sm font-bold"
                  >
                    Bloquear empresa
                  </button>
                </div>
              )}
              {i.status === "accepted" && (
                <Link
                  href={`/empleos/${i.job.slug}`}
                  className="mt-3 inline-block font-bold text-blue-700"
                >
                  Ver vacante
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
