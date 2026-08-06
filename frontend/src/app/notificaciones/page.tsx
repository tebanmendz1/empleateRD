"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
type Notice = {
  id: number;
  title: string;
  body: string;
  action_url?: string;
  read_at?: string;
  created_at: string;
};
type Data = {
  preferences?: {
    email_enabled: boolean;
    push_enabled: boolean;
    whatsapp_enabled: boolean;
  };
  notifications: Notice[];
};
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("empleaterd_token")}`,
});
export default function Notifications() {
  const [data, setData] = useState<Data | null>(null),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  function load() {
    api("/notifications", { headers: auth() })
      .then((r) => setData(r.data))
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : "No pudimos cargar las notificaciones.",
        ),
      );
  }
  useEffect(load, []);
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const r = await api("/notifications/preferences", {
        method: "PUT",
        headers: auth(),
        body: JSON.stringify({
          email_enabled: f.has("email"),
          push_enabled: f.has("push"),
          whatsapp_enabled: f.has("whatsapp"),
        }),
      });
      setMessage(r.message);
      load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No pudimos guardar tus preferencias.",
      );
    }
  }
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border bg-white p-6">
          <h1 className="text-xl font-black">Canales</h1>
          <p className="mt-2 text-sm text-slate-600">
            WhatsApp requiere tu consentimiento y un número guardado en la
            cuenta.
          </p>
          <form onSubmit={save} className="mt-5 space-y-3">
            <Check
              name="email"
              label="Correo"
              checked={data?.preferences?.email_enabled ?? true}
            />
            <Check
              name="push"
              label="Notificaciones push"
              checked={data?.preferences?.push_enabled ?? false}
            />
            <Check
              name="whatsapp"
              label="WhatsApp"
              checked={data?.preferences?.whatsapp_enabled ?? false}
            />
            <button className="w-full rounded-xl bg-blue-700 p-3 font-bold text-white">
              Guardar preferencias
            </button>
          </form>
          {message && (
            <p className="mt-3 text-sm text-emerald-700">{message}</p>
          )}
          {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
        </aside>
        <section>
          <h2 className="text-3xl font-black">Notificaciones</h2>
          <div className="mt-5 space-y-3">
            {data?.notifications.map((n) => (
              <article
                key={n.id}
                className={`rounded-2xl border p-5 ${n.read_at ? "bg-white" : "border-blue-200 bg-blue-50"}`}
              >
                <b>{n.title}</b>
                <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                {n.action_url && (
                  <Link
                    href={n.action_url}
                    className="mt-3 inline-block text-sm font-bold text-blue-700"
                  >
                    Abrir
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
function Check({
  name,
  label,
  checked,
}: {
  name: string;
  label: string;
  checked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border p-3">
      <input type="checkbox" name={name} defaultChecked={checked} />
      <span className="font-bold">{label}</span>
    </label>
  );
}
