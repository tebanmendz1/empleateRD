"use client";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
type Test = { id: number; title: string; duration_minutes: number };
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function CompanyTests() {
  const [items, setItems] = useState<Test[]>([]),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  function load() {
    api("/company/assessments", { headers: auth() })
      .then((r) => setItems(r.data))
      .catch(show);
  }
  useEffect(load, []);
  function show(e: unknown) {
    setError(
      e instanceof Error ? e.message : "No pudimos completar la solicitud.",
    );
  }
  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      f = new FormData(form),
      options = String(f.get("options"))
        .split("|")
        .map((x) => x.trim())
        .filter(Boolean);
    try {
      const r = await api("/company/assessments", {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({
          title: f.get("title"),
          duration_minutes: Number(f.get("duration")),
          instructions: f.get("instructions"),
          questions: [
            {
              prompt: f.get("question"),
              type: "single_choice",
              options,
              correct_answer: f.get("correct"),
            },
          ],
        }),
      });
      setMessage(r.message);
      form.reset();
      load();
    } catch (e) {
      show(e);
    }
  }
  async function assign(e: FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const r = await api(`/company/assessments/${id}/assign`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({
          application_id: Number(f.get("application_id")),
        }),
      });
      setMessage(r.message);
    } catch (e) {
      show(e);
    }
  }
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">Empresa</p>
        <h1 className="mt-1 text-3xl font-black">Pruebas técnicas</h1>
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
        <form
          onSubmit={create}
          className="mt-6 grid gap-3 rounded-2xl border bg-white p-6 sm:grid-cols-2"
        >
          <input
            required
            name="title"
            placeholder="Título"
            className="rounded-xl border p-3"
          />
          <input
            required
            name="duration"
            type="number"
            min="5"
            max="480"
            defaultValue="30"
            className="rounded-xl border p-3"
          />
          <textarea
            name="instructions"
            placeholder="Instrucciones"
            className="rounded-xl border p-3 sm:col-span-2"
          />
          <input
            required
            name="question"
            placeholder="Primera pregunta"
            className="rounded-xl border p-3 sm:col-span-2"
          />
          <input
            required
            name="options"
            placeholder="Opciones separadas por |"
            className="rounded-xl border p-3"
          />
          <input
            required
            name="correct"
            placeholder="Respuesta correcta"
            className="rounded-xl border p-3"
          />
          <button className="rounded-xl bg-blue-700 p-3 font-bold text-white sm:col-span-2">
            Crear prueba
          </button>
        </form>
        <div className="mt-6 space-y-3">
          {items.map((t) => (
            <article key={t.id} className="rounded-2xl border bg-white p-5">
              <b>{t.title}</b>
              <p className="text-sm text-slate-500">
                {t.duration_minutes} minutos
              </p>
              <form
                onSubmit={(e) => assign(e, t.id)}
                className="mt-3 flex gap-2"
              >
                <input
                  required
                  name="application_id"
                  type="number"
                  placeholder="ID de postulación"
                  className="rounded-xl border p-3"
                />
                <button className="rounded-xl bg-emerald-500 px-4 font-bold">
                  Asignar
                </button>
              </form>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
