"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL, api } from "@/lib/api";
type Payment = {
  id: number;
  reference: string;
  amount: string;
  currency: string;
  status: string;
  proof_name?: string;
  review_note?: string;
};
const token = () => localStorage.getItem("empleaterd_token");
const labels: Record<string, string> = {
  awaiting_proof: "Esperando comprobante",
  proof_submitted: "En revisión",
  approved: "Aprobado",
  rejected: "Rechazado",
};
export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<Payment | null | undefined>(undefined),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  useEffect(() => {
    api(`/company/jobs/${id}/payment`, {
      headers: { Authorization: `Bearer ${token()}` },
    })
      .then((r) => setPayment(r.data))
      .catch(showError);
  }, [id]);
  function showError(e: unknown) {
    setError(
      e instanceof Error ? e.message : "No pudimos completar la solicitud.",
    );
  }
  async function create() {
    setLoading(true);
    try {
      const r = await api(`/company/jobs/${id}/payment`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token()}` },
      });
      setPayment(r.data);
    } catch (e) {
      showError(e);
    } finally {
      setLoading(false);
    }
  }
  async function upload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      const response = await fetch(
        `${API_URL}/company/jobs/${id}/payment/proof`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
          body: data,
        },
      );
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          body.message ??
            Object.values(body.errors ?? {}).flat()[0] ??
            "No pudimos enviar el comprobante.",
        );
      setPayment(body.data);
    } catch (e) {
      showError(e);
    } finally {
      setLoading(false);
    }
  }
  if (payment === undefined)
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50">
        Cargando pago…
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-8">
        <p className="text-sm font-bold uppercase text-blue-700">
          Pago de publicación
        </p>
        <h1 className="mt-2 text-3xl font-black">
          Comprobante de transferencia
        </h1>
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        {!payment ? (
          <>
            <p className="mt-4 text-slate-600">
              Crea la orden para conocer el monto exacto y enviar tu
              comprobante.
            </p>
            <button
              disabled={loading}
              onClick={create}
              className="mt-6 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-50"
            >
              Crear orden de pago
            </button>
          </>
        ) : (
          <>
            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
              <p>
                <b>Monto:</b>
                <br />
                {payment.currency}{" "}
                {Number(payment.amount).toLocaleString("es-DO")}
              </p>
              <p>
                <b>Estado:</b>
                <br />
                {labels[payment.status] ?? payment.status}
              </p>
              <p className="break-all sm:col-span-2">
                <b>Referencia:</b>
                <br />
                {payment.reference}
              </p>
            </div>
            {payment.review_note && (
              <p className="mt-4 rounded-xl bg-amber-50 p-4 text-amber-900">
                <b>Observación:</b> {payment.review_note}
              </p>
            )}
            {["awaiting_proof", "rejected"].includes(payment.status) && (
              <form onSubmit={upload} className="mt-6 space-y-4">
                <label className="block text-sm font-bold">
                  Comprobante (PDF o imagen, máximo 5 MB)
                  <input
                    required
                    type="file"
                    name="proof"
                    accept="application/pdf,image/jpeg,image/png,image/webp"
                    className="mt-2 block w-full rounded-xl border p-3 font-normal"
                  />
                </label>
                <label className="block text-sm font-bold">
                  Nota opcional
                  <textarea
                    name="company_note"
                    maxLength={1000}
                    rows={3}
                    className="mt-2 w-full rounded-xl border p-3 font-normal"
                  />
                </label>
                <button
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-500 p-4 font-black text-slate-950 disabled:opacity-50"
                >
                  {loading ? "Enviando…" : "Enviar comprobante"}
                </button>
              </form>
            )}
          </>
        )}
        <Link
          href="/empresa/vacantes"
          className="mt-6 block text-center font-bold text-blue-700"
        >
          Volver a mis vacantes
        </Link>
      </div>
    </main>
  );
}
