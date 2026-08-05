"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api, saveSession } from "@/lib/api";
export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const f = new FormData(e.currentTarget);
    try {
      const result = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          phone: f.get("phone"),
          account_type: f.get("account_type"),
          password: f.get("password"),
          password_confirmation: f.get("password_confirmation"),
          terms: f.get("terms") === "on",
        }),
      });
      saveSession(result.data.token, result.data.user);
      router.push("/verificar");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No pudimos crear la cuenta.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="bg-slate-50 px-5 py-12">
      <section className="mx-auto w-full max-w-xl rounded-3xl border bg-white p-8">
        <h1 className="text-3xl font-black">Crea tu cuenta</h1>
        <p className="mt-2 text-slate-500">
          Elige el perfil correcto para comenzar.
        </p>
        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"
          >
            {error}
          </p>
        )}
        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold sm:col-span-2">
            Tipo de cuenta
            <select
              name="account_type"
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            >
              <option value="candidate">Busco empleo</option>
              <option value="company">Represento una empresa</option>
            </select>
          </label>
          <label className="block text-sm font-bold sm:col-span-2">
            Nombre completo o responsable
            <input
              required
              name="name"
              autoComplete="name"
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Correo
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Teléfono
            <input
              name="phone"
              autoComplete="tel"
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Contraseña
            <input
              required
              minLength={8}
              type="password"
              name="password"
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Confirmar contraseña
            <input
              required
              minLength={8}
              type="password"
              name="password_confirmation"
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl border p-3.5 font-normal"
            />
          </label>
          <label className="flex gap-3 text-sm text-slate-600 sm:col-span-2">
            <input required type="checkbox" name="terms" className="mt-1" />
            Acepto los términos y la política de privacidad.
          </label>
          <button
            disabled={loading}
            className="rounded-xl bg-blue-700 p-4 font-extrabold text-white disabled:opacity-60 sm:col-span-2"
          >
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/acceso" className="font-bold text-blue-700">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}
