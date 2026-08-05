"use client";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
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
  location_or_link?: string;
  notes?: string;
  status: string;
};
type Process = {
  job: { title: string; company: { name: string } };
  messages: Message[];
  interviews: Interview[];
};
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function ProcessPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Process | null>(null),
    [error, setError] = useState("");
  function load() {
    api(`/candidate/applications/${id}/process`, { headers: auth() })
      .then((r) => setItem(r.data))
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos cargar el proceso.",
        ),
      );
  }
  useEffect(load, [id]);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      f = new FormData(form);
    try {
      await api(`/candidate/applications/${id}/messages`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ body: f.get("body") }),
      });
      form.reset();
      load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No pudimos enviar el mensaje.",
      );
    }
  }
  async function respond(interview: number, response: string) {
    try {
      await api(`/candidate/interviews/${interview}/respond`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ response }),
      });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos responder.");
    }
  }
  if (!item)
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50">
        Cargando proceso…
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          {item.job.company.name}
        </p>
        <h1 className="mt-1 text-3xl font-black">{item.job.title}</h1>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <section className="mt-7 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Entrevistas</h2>
          <div className="mt-4 space-y-3">
            {item.interviews.map((i) => (
              <article key={i.id} className="rounded-xl bg-slate-50 p-4">
                <b>{i.title}</b>
                <p className="mt-1">
                  {new Date(i.scheduled_at).toLocaleString("es-DO")} ·{" "}
                  {i.duration_minutes} minutos
                </p>
                {i.location_or_link && (
                  <p className="mt-1 text-sm text-blue-700">
                    {i.location_or_link}
                  </p>
                )}
                {i.notes && (
                  <p className="mt-2 text-sm text-slate-600">{i.notes}</p>
                )}
                <p className="mt-2 text-xs font-bold uppercase">{i.status}</p>
                {i.status === "scheduled" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => respond(i.id, "accepted")}
                      className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => respond(i.id, "declined")}
                      className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </article>
            ))}
            {!item.interviews.length && (
              <p className="text-slate-500">No hay entrevistas programadas.</p>
            )}
          </div>
        </section>
        <section className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Mensajes</h2>
          <div className="mt-4 space-y-3">
            {item.messages.map((m) => (
              <div
                key={m.id}
                className={`rounded-xl p-3 ${m.sender.account_type === "candidate" ? "ml-8 bg-blue-50" : "mr-8 bg-slate-100"}`}
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
              placeholder="Escribe una respuesta"
              className="min-w-0 flex-1 rounded-xl border p-3"
            />
            <button className="rounded-xl bg-blue-700 px-4 font-bold text-white">
              Enviar
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
