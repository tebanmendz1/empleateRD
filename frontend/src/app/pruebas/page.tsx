"use client";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
type Assignment = {
  id: number;
  status: string;
  score?: string;
  assessment: {
    title: string;
    duration_minutes: number;
    questions: { prompt: string; type: string; options?: string[] }[];
  };
  application: { job: { title: string } };
};
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function Tests() {
  const [items, setItems] = useState<Assignment[]>([]),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  function load() {
    api("/candidate/assessments", { headers: auth() })
      .then((r) => setItems(r.data))
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos cargar las pruebas.",
        ),
      );
  }
  useEffect(load, []);
  async function submit(e: FormEvent<HTMLFormElement>, a: Assignment) {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      answers = a.assessment.questions.map((_, i) => f.get(`answer_${i}`));
    try {
      const r = await api(`/candidate/assessments/${a.id}/submit`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ answers }),
      });
      setMessage(r.message);
      load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No pudimos entregar la prueba.",
      );
    }
  }
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">Candidato</p>
        <h1 className="mt-1 text-3xl font-black">Pruebas y evaluaciones</h1>
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
        <div className="mt-6 space-y-5">
          {items.map((a) => (
            <article key={a.id} className="rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-black">{a.assessment.title}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {a.application.job.title} · {a.assessment.duration_minutes}{" "}
                minutos · {a.status}
              </p>
              {a.score && (
                <p className="mt-3 text-2xl font-black text-blue-700">
                  Puntuación: {a.score}%
                </p>
              )}
              {["assigned", "started"].includes(a.status) && (
                <form onSubmit={(e) => submit(e, a)} className="mt-5 space-y-5">
                  {a.assessment.questions.map((q, i) => (
                    <label key={i} className="block font-bold">
                      {i + 1}. {q.prompt}
                      {q.type === "single_choice" ? (
                        <select
                          required
                          name={`answer_${i}`}
                          className="mt-2 w-full rounded-xl border p-3 font-normal"
                        >
                          <option value="">Selecciona</option>
                          {q.options?.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <textarea
                          required
                          name={`answer_${i}`}
                          className="mt-2 w-full rounded-xl border p-3 font-normal"
                        />
                      )}
                    </label>
                  ))}
                  <button className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">
                    Entregar prueba
                  </button>
                </form>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
