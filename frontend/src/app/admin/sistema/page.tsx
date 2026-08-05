"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
type Health = {
  status: string;
  checks: Record<string, boolean>;
  latest_backup?: { file: string; created_at: string } | null;
};
const labels: Record<string, string> = {
  database: "Base de datos",
  cache: "Caché",
  storage: "Almacenamiento",
};
export default function SystemHealth() {
  const [data, setData] = useState<Health | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    api("/admin/system-health", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
      },
    })
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(
          e instanceof Error ? e.message : "No pudimos verificar el sistema.",
        ),
      );
  }, []);
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Administración
        </p>
        <h1 className="mt-1 text-3xl font-black">Estado del sistema</h1>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        {data && (
          <>
            <div
              className={`mt-6 rounded-2xl p-5 font-black ${data.status === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}
            >
              Estado general:{" "}
              {data.status === "ok"
                ? "Operando correctamente"
                : "Requiere atención"}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {Object.entries(data.checks).map(([key, ok]) => (
                <div key={key} className="rounded-2xl border bg-white p-5">
                  <p className="font-bold">{labels[key] ?? key}</p>
                  <p
                    className={`mt-2 text-sm font-black ${ok ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {ok ? "Disponible" : "Con problemas"}
                  </p>
                </div>
              ))}
            </div>
            <section className="mt-5 rounded-2xl border bg-white p-5">
              <h2 className="font-black">Última copia de seguridad</h2>
              {data.latest_backup ? (
                <p className="mt-2 text-sm text-slate-600">
                  {data.latest_backup.file} ·{" "}
                  {new Date(data.latest_backup.created_at).toLocaleString(
                    "es-DO",
                  )}
                </p>
              ) : (
                <p className="mt-2 text-sm text-amber-700">
                  Todavía no se ha registrado una copia. El proceso automático
                  se ejecuta diariamente a las 2:30 a. m.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
