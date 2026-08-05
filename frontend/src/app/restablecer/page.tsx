"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
export default function Reset() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      p = new URLSearchParams(window.location.search);
    try {
      const r = await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token: p.get("token"),
          email: p.get("email"),
          password: f.get("password"),
          password_confirmation: f.get("password_confirmation"),
        }),
      });
      setMsg(r.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "El enlace no es válido.");
    }
  }
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-5">
      <section className="w-full max-w-md rounded-3xl border bg-white p-8">
        <h1 className="text-2xl font-black">Nueva contraseña</h1>
        {msg ? (
          <>
            <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-800">
              {msg}
            </p>
            <Link
              href="/acceso"
              className="mt-5 block text-center font-bold text-blue-700"
            >
              Iniciar sesión
            </Link>
          </>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && (
              <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>
            )}
            <label className="block text-sm font-bold">
              Contraseña
              <input
                required
                minLength={8}
                type="password"
                name="password"
                className="mt-2 w-full rounded-xl border p-3.5"
              />
            </label>
            <label className="block text-sm font-bold">
              Confirmar
              <input
                required
                minLength={8}
                type="password"
                name="password_confirmation"
                className="mt-2 w-full rounded-xl border p-3.5"
              />
            </label>
            <button className="w-full rounded-xl bg-blue-700 p-4 font-bold text-white">
              Actualizar contraseña
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
