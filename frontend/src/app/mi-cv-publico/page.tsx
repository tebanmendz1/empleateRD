"use client";
import { useState } from "react";
import { api } from "@/lib/api";
export default function CvSharing() {
  const [url, setUrl] = useState<string | null>(null),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  async function change(enabled: boolean) {
    try {
      const r = await api("/candidate/cv/share", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
        },
        body: JSON.stringify({ enabled }),
      });
      setUrl(r.data.url);
      setMessage(r.message);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No pudimos cambiar la visibilidad.",
      );
    }
  }
  return (
    <main className="min-h-[70vh] bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-8">
        <p className="text-sm font-bold uppercase text-blue-700">
          Currículum avanzado
        </p>
        <h1 className="mt-2 text-3xl font-black">Enlace público controlado</h1>
        <p className="mt-3 text-slate-600">
          Actívalo para compartir tu CV mediante un enlace. Puedes desactivarlo
          cuando quieras y el contenido dejará de estar disponible.
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
        {url && (
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="break-all text-sm">{url}</p>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="mt-3 text-sm font-bold text-blue-700"
            >
              Copiar enlace
            </button>
          </div>
        )}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => change(true)}
            className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
          >
            Activar enlace
          </button>
          <button
            onClick={() => change(false)}
            className="rounded-xl border px-5 py-3 font-bold text-rose-700"
          >
            Desactivar
          </button>
        </div>
      </div>
    </main>
  );
}
