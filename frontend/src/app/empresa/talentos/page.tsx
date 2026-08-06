"use client";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
type Talent = {
  candidate_id: number;
  display_name: string;
  professional_title: string;
  province: string;
  skills: string[];
};
type Job = { id: number; title: string; status: string };
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function Talents() {
  const [items, setItems] = useState<Talent[]>([]),
    [jobs, setJobs] = useState<Job[]>([]),
    [query, setQuery] = useState(""),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  function search(q = "") {
    api(`/company/talents${q ? `?q=${encodeURIComponent(q)}` : ""}`, {
      headers: auth(),
    })
      .then((r) => setItems(r.data.data))
      .catch(show);
  }
  useEffect(() => {
    search();
    api("/company/jobs", { headers: auth() }).then((r) =>
      setJobs(r.data.filter((j: Job) => j.status === "active")),
    );
  }, []);
  function show(e: unknown) {
    setError(
      e instanceof Error ? e.message : "No pudimos completar la solicitud.",
    );
  }
  async function save(id: number) {
    try {
      await api(`/company/talents/${id}/save`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({ list_name: "Favoritos" }),
      });
      setMessage("Talento guardado.");
    } catch (e) {
      show(e);
    }
  }
  async function invite(e: FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault();
    const form = e.currentTarget,
      f = new FormData(form);
    try {
      await api(`/company/talents/${id}/invite`, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({
          job_id: Number(f.get("job_id")),
          message: f.get("message"),
        }),
      });
      setMessage("Invitación enviada.");
      form.reset();
    } catch (e) {
      show(e);
    }
  }
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Empresa verificada
        </p>
        <h1 className="mt-1 text-3xl font-black">Buscar talento</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(query);
          }}
          className="mt-6 flex gap-2"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cargo o habilidad"
            className="flex-1 rounded-xl border p-3"
          />
          <button className="rounded-xl bg-blue-700 px-5 font-bold text-white">
            Buscar
          </button>
        </form>
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
        <div className="mt-6 space-y-4">
          {items.map((t) => (
            <article
              key={t.candidate_id}
              className="rounded-2xl border bg-white p-6"
            >
              <h2 className="text-xl font-black">{t.display_name}</h2>
              <p className="mt-1 text-slate-600">
                {t.professional_title} · {t.province}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.skills?.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button
                onClick={() => save(t.candidate_id)}
                className="mt-4 text-sm font-bold text-blue-700"
              >
                Guardar en favoritos
              </button>
              <form
                onSubmit={(e) => invite(e, t.candidate_id)}
                className="mt-4 grid gap-2 sm:grid-cols-[.7fr_1fr_auto]"
              >
                <select
                  required
                  name="job_id"
                  className="rounded-xl border p-3"
                >
                  <option value="">Selecciona vacante</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>
                <input
                  name="message"
                  placeholder="Mensaje opcional"
                  className="rounded-xl border p-3"
                />
                <button className="rounded-xl bg-emerald-500 px-4 font-bold">
                  Invitar
                </button>
              </form>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
