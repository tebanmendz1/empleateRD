"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
export default function Forgot() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const r = await api("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: f.get("email") }),
      });
      setMsg(r.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No pudimos procesar la solicitud.",
      );
    }
  }
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-5">
      <section className="w-full max-w-md rounded-3xl border bg-white p-8">
        <h1 className="text-2xl font-black">Recuperar contraseña</h1>
        <p className="mt-2 text-slate-500">
          Te enviaremos un enlace si encontramos tu cuenta.
        </p>
        {msg ? (
          <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-800">
            {msg}
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {error && (
              <p className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>
            )}
            <label className="block text-sm font-bold">
              Correo
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
              />
            </label>
            <button className="w-full rounded-xl bg-blue-700 p-4 font-bold text-white">
              Enviar instrucciones
            </button>
          </form>
        )}
        <Link
          href="/acceso"
          className="mt-6 block text-center text-sm font-bold text-blue-700"
        >
          Volver al acceso
        </Link>
      </section>
    </main>
  );
}
