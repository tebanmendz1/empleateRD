"use client";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL, api } from "@/lib/api";
type Message = {
  id: number;
  body: string;
  sender: { name: string; account_type: string };
};
type Interview = {
  id: number;
  title: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
};
type Application = {
  id: number;
  status: string;
  cover_letter?: string;
  profile_snapshot: {
    name: string;
    email: string;
    phone?: string;
    profile?: Record<string, unknown>;
  };
  document?: { name: string };
  job: { title: string };
  messages: Message[];
  interviews: Interview[];
};
type Match = {
  score: number;
  level: string;
  strengths: string[];
  gaps: string[];
  disclaimer: string;
};
const token = () => localStorage.getItem("empleaterd_token");
const auth = () => ({ Authorization: `Bearer ${token()}` });
const statuses = [
  ["viewed", "Vista"],
  ["evaluating", "En evaluación"],
  ["shortlisted", "Preseleccionada"],
  ["interview", "Entrevista"],
  ["offer", "Oferta"],
  ["hired", "Contratada"],
  ["rejected", "Rechazada"],
];
export default function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Application | null>(null),
    [match, setMatch] = useState<Match | null>(null),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  function load() {
    Promise.all([
      api(`/company/applications/${id}`, { headers: auth() }),
      api(`/company/applications/${id}/match`, { headers: auth() }),
    ])
      .then(([application, matching]) => {
        setItem(application.data);
        setMatch(matching.data);
      })
      .catch(show);
  }
  useEffect(load, [id]);
  function show(e: unknown) {
    setError(
      e instanceof Error ? e.message : "No pudimos completar la solicitud.",
    );
  }
  async function status(value: string) {
    try {
      await api(`/company/applications/${id}/status`, {
        method: "PATCH",
        headers: auth(),
        body: JSON.stringify({ status: value }),
      });
      load();
    } catch (e) {
      show(e);
    }
  }
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      data = new FormData(form);
    try {
      await api(`/company/applications/${id}/messages`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ body: data.get("body") }),
      });
      form.reset();
      load();
    } catch (e) {
      show(e);
    }
  }
  async function interview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      f = new FormData(form);
    try {
      await api(`/company/applications/${id}/interviews`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({
          title: f.get("title"),
          scheduled_at: f.get("scheduled_at"),
          duration_minutes: Number(f.get("duration_minutes")),
          format: f.get("format"),
          location_or_link: f.get("location_or_link"),
          notes: f.get("notes"),
        }),
      });
      form.reset();
      setNotice("Entrevista programada.");
      load();
    } catch (e) {
      show(e);
    }
  }
  async function document() {
    const r = await fetch(`${API_URL}/company/applications/${id}/document`, {
      headers: auth(),
    });
    if (!r.ok) {
      show(new Error("No pudimos descargar el CV."));
      return;
    }
    const blob = await r.blob(),
      url = URL.createObjectURL(blob),
      a = window.document.createElement("a");
    a.href = url;
    a.download = item?.document?.name ?? "curriculum";
    a.click();
    URL.revokeObjectURL(url);
  }
  if (!item)
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50">
        Cargando candidatura…
      </main>
    );
  const profile = item.profile_snapshot.profile ?? {};
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_380px]">
        <section>
          <p className="text-sm font-bold uppercase text-blue-700">
            {item.job.title}
          </p>
          <h1 className="mt-1 text-3xl font-black">
            {item.profile_snapshot.name}
          </h1>
          <p className="mt-2 text-slate-500">
            {item.profile_snapshot.email} ·{" "}
            {item.profile_snapshot.phone || "Sin teléfono"}
          </p>
          {match && (
            <section className="mt-6 rounded-2xl border bg-white p-6">
              <p className="text-sm font-bold uppercase text-blue-700">
                Compatibilidad asistida
              </p>
              <div className="mt-2 flex items-end gap-3">
                <p className="text-4xl font-black">{match.score}%</p>
                <p className="pb-1 font-bold capitalize text-slate-500">
                  {match.level}
                </p>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div>
                  {match.strengths.map((x) => (
                    <p
                      key={x}
                      className="mb-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900"
                    >
                      ✓ {x}
                    </p>
                  ))}
                </div>
                <div>
                  {match.gaps.map((x) => (
                    <p
                      key={x}
                      className="mb-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900"
                    >
                      → {x}
                    </p>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">{match.disclaimer}</p>
            </section>
          )}
          {error && (
            <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
              {error}
            </p>
          )}
          {notice && (
            <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-emerald-800">
              {notice}
            </p>
          )}
          <div className="mt-6 rounded-2xl border bg-white p-6">
            <div className="flex flex-wrap gap-3">
              <select
                value={item.status}
                onChange={(e) => status(e.target.value)}
                className="rounded-xl border p-3 font-bold"
              >
                {statuses.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              {item.document && (
                <button
                  onClick={document}
                  className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white"
                >
                  Descargar CV
                </button>
              )}
            </div>
            {item.cover_letter && (
              <>
                <h2 className="mt-6 font-extrabold">Carta de presentación</h2>
                <p className="mt-2 whitespace-pre-wrap text-slate-600">
                  {item.cover_letter}
                </p>
              </>
            )}
            <h2 className="mt-6 font-extrabold">Perfil enviado</h2>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {Object.entries(profile)
                .filter(([, v]) => v && typeof v !== "object")
                .map(([k, v]) => (
                  <p key={k} className="rounded-lg bg-slate-50 p-3">
                    <b>{k.replaceAll("_", " ")}:</b> {String(v)}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-6 rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-black">Mensajes</h2>
            <div className="mt-4 space-y-3">
              {item.messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-xl p-3 ${m.sender.account_type === "company" ? "ml-8 bg-blue-50" : "mr-8 bg-slate-100"}`}
                >
                  <b className="text-sm">{m.sender.name}</b>
                  <p className="mt-1 whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="mt-4 flex gap-2">
              <input
                required
                name="body"
                maxLength={5000}
                placeholder="Escribe un mensaje"
                className="min-w-0 flex-1 rounded-xl border p-3"
              />
              <button className="rounded-xl bg-blue-700 px-4 font-bold text-white">
                Enviar
              </button>
            </form>
          </div>
        </section>
        <aside>
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-black">Programar entrevista</h2>
            <form onSubmit={interview} className="mt-4 space-y-3">
              <input
                required
                name="title"
                placeholder="Título"
                className="w-full rounded-xl border p-3"
              />
              <input
                required
                name="scheduled_at"
                type="datetime-local"
                className="w-full rounded-xl border p-3"
              />
              <input
                required
                name="duration_minutes"
                type="number"
                min="15"
                max="480"
                defaultValue="30"
                className="w-full rounded-xl border p-3"
              />
              <select
                required
                name="format"
                className="w-full rounded-xl border p-3"
              >
                <option value="video">Videollamada</option>
                <option value="phone">Teléfono</option>
                <option value="in_person">Presencial</option>
              </select>
              <input
                name="location_or_link"
                placeholder="Enlace, teléfono o ubicación"
                className="w-full rounded-xl border p-3"
              />
              <textarea
                name="notes"
                rows={3}
                placeholder="Indicaciones"
                className="w-full rounded-xl border p-3"
              />
              <button className="w-full rounded-xl bg-emerald-500 p-3 font-black">
                Programar
              </button>
            </form>
            <div className="mt-6 space-y-3">
              {item.interviews.map((i) => (
                <div key={i.id} className="rounded-xl bg-slate-50 p-4">
                  <b>{i.title}</b>
                  <p className="mt-1 text-sm">
                    {new Date(i.scheduled_at).toLocaleString("es-DO")} ·{" "}
                    {i.duration_minutes} min.
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase text-blue-700">
                    {i.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
