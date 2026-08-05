import Link from "next/link";
import { ResendVerification } from "./resend-verification";
export default async function Verify({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const verified = (await searchParams).status === "verified";
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-5">
      <section className="w-full max-w-md rounded-3xl border bg-white p-8 text-center">
        <h1 className="text-2xl font-black">
          {verified ? "Correo verificado" : "Verifica tu correo"}
        </h1>
        <p className="mt-3 text-slate-600">
          {verified
            ? "Tu cuenta ya está confirmada."
            : "Enviamos un enlace seguro a tu correo. Revisa también la carpeta de spam."}
        </p>
        {!verified && <ResendVerification />}
        <Link
          href={verified ? "/" : "/acceso"}
          className="mt-5 block rounded-xl bg-slate-900 p-3 font-bold text-white"
        >
          Continuar
        </Link>
      </section>
    </main>
  );
}
