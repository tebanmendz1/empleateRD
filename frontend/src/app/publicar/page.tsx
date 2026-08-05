"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStoredUser } from "@/components/account-nav";
import { api } from "@/lib/api";
type Quote = {
  reference: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  expires_at: string;
  breakdown: {
    publication: number;
    extras: number;
    volume_discount_rate: number;
  };
};
const access = () => localStorage.getItem("empleaterd_token"),
  money = (value: number) =>
    new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      maximumFractionDigits: 0,
    }).format(value);
export default function Publish() {
  const router = useRouter(),
    user = useStoredUser();
  const [quote, setQuote] = useState<Quote | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    [budgetExceeded, setBudgetExceeded] = useState(false);
  useEffect(() => {
    if (!access()) {
      router.replace("/acceso?next=/publicar");
      return;
    }
    if (user && user.account_type !== "company") router.replace("/panel");
  }, [router, user]);
  async function calculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const body = {
      vacancies: Number(f.get("vacancies")),
      duration: Number(f.get("duration")),
      applications: f.get("applications"),
      urgency: f.get("urgency"),
      visibility: f.get("visibility"),
      classification: f.get("classification"),
      diffusion: f.getAll("diffusion"),
      budget: Number(f.get("budget")) || null,
    };
    try {
      const r = await api("/company/quotations", {
        method: "POST",
        headers: { Authorization: `Bearer ${access()}` },
        body: JSON.stringify(body),
      });
      setQuote(r.data);
      setBudgetExceeded(r.meta.budget_exceeded);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No pudimos calcular la cotización.",
      );
    } finally {
      setLoading(false);
    }
  }
  if (!user || user.account_type !== "company")
    return <main className="min-h-[65vh] bg-slate-50" />;
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Cotización empresarial
        </p>
        <h1 className="mt-1 text-3xl font-black">Configura lo que necesitas</h1>
        <p className="mt-2 text-slate-500">
          Sin planes rígidos. Ajusta alcance, duración y herramientas para
          obtener una estimación transparente.
        </p>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_.72fr]">
          <form
            onSubmit={calculate}
            className="grid gap-5 rounded-3xl border bg-white p-7 sm:grid-cols-2"
          >
            <Select
              label="Cantidad de vacantes"
              name="vacancies"
              options={[
                ["1", "1 vacante"],
                ["3", "2 a 3"],
                ["5", "4 a 5"],
                ["8", "6 a 10"],
                ["12", "Más de 10"],
              ]}
            />
            <Select
              label="Duración"
              name="duration"
              options={[
                ["7", "7 días"],
                ["15", "15 días"],
                ["30", "30 días"],
                ["60", "60 días"],
              ]}
            />
            <Select
              label="Límite de postulaciones"
              name="applications"
              options={[
                ["20", "Hasta 20"],
                ["50", "Hasta 50"],
                ["100", "Hasta 100"],
                ["200", "Hasta 200"],
                ["unlimited", "Ilimitadas"],
              ]}
            />
            <Select
              label="Urgencia"
              name="urgency"
              options={[
                ["normal", "Normal"],
                ["15_days", "Contratar en 15 días"],
                ["urgent", "Urgente"],
                ["immediate", "Inmediata"],
              ]}
            />
            <Select
              label="Visibilidad"
              name="visibility"
              options={[
                ["normal", "Posición normal"],
                ["results", "Destacada en resultados"],
                ["home", "Destacada en inicio"],
                ["priority", "Difusión prioritaria"],
                ["campaign", "Campaña personalizada"],
              ]}
            />
            <Select
              label="Clasificación"
              name="classification"
              options={[
                ["manual", "Gestión manual"],
                ["filters", "Filtros automáticos"],
                ["assisted", "Clasificación asistida"],
                ["advanced", "Resumen y ranking avanzado"],
              ]}
            />
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-bold">Difusión adicional</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  ["platform", "Alertas en la plataforma"],
                  ["email", "Correo a perfiles compatibles"],
                  ["push", "Notificación push"],
                  ["social", "Publicación en redes"],
                  ["sponsored", "Difusión patrocinada"],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className="flex gap-2 rounded-xl border p-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="diffusion"
                      value={value}
                      defaultChecked={value === "platform"}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="text-sm font-bold sm:col-span-2">
              Presupuesto máximo opcional
              <input
                type="number"
                min="0"
                name="budget"
                placeholder="RD$"
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
              />
            </label>
            <button
              disabled={loading}
              className="rounded-xl bg-blue-700 p-4 font-extrabold text-white disabled:opacity-60 sm:col-span-2"
            >
              {loading ? "Calculando…" : "Calcular recomendación"}
            </button>
            <p className="text-xs leading-5 text-slate-500 sm:col-span-2">
              El límite de postulaciones habilita recepciones hasta esa
              cantidad; no garantiza una cantidad de candidatos.
            </p>
          </form>
          <aside>
            {quote ? (
              <QuoteCard quote={quote} exceeded={budgetExceeded} />
            ) : (
              <div className="rounded-3xl border bg-white p-7">
                <p className="text-sm font-bold uppercase text-emerald-600">
                  Resultado
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Tu recomendación aparecerá aquí
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Verás publicación, servicios adicionales, descuento por
                  volumen, impuestos y total.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[][];
}) {
  return (
    <label className="text-sm font-bold">
      {label}
      <select
        name={name}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function QuoteCard({ quote, exceeded }: { quote: Quote; exceeded: boolean }) {
  return (
    <div className="sticky top-24 rounded-3xl bg-slate-900 p-7 text-white">
      <p className="text-xs font-bold uppercase text-emerald-400">
        Recomendación principal
      </p>
      <h2 className="mt-2 text-4xl font-black">{money(quote.total)}</h2>
      <p className="mt-1 text-xs text-slate-400">
        Estimación provisional en pesos dominicanos
      </p>
      {exceeded && (
        <p className="mt-4 rounded-xl bg-amber-400/15 p-3 text-sm text-amber-200">
          La configuración supera el presupuesto indicado. Reduce alcance,
          duración o servicios.
        </p>
      )}
      <div className="mt-6 space-y-3 border-y border-slate-700 py-5 text-sm">
        <Line label="Publicación" value={quote.breakdown.publication} />
        <Line label="Servicios adicionales" value={quote.breakdown.extras} />
        <Line label="Subtotal" value={quote.subtotal} />
        <Line
          label={`Descuento (${quote.breakdown.volume_discount_rate * 100}%)`}
          value={-quote.discount}
        />
        <Line label="Impuestos estimados" value={quote.tax} />
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-400">
        Cotización guardada por 7 días. Referencia:{" "}
        {quote.reference.slice(0, 8).toUpperCase()}. El precio final se
        confirmará antes del pago.
      </p>
      <Link
        href="/empresa/vacantes/nueva"
        className="mt-5 block rounded-xl bg-emerald-500 p-3 text-center font-black text-slate-950"
      >
        Crear vacante con esta cotización
      </Link>
    </div>
  );
}
function Line({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-300">{label}</span>
      <strong>{money(value)}</strong>
    </div>
  );
}
