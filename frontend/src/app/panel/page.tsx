"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStoredUser } from "@/components/account-nav";
import { api } from "@/lib/api";
export default function Dashboard() {
  const router = useRouter();
  const user = useStoredUser();
  const [completion, setCompletion] = useState(0);
  const [applications, setApplications] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("empleaterd_token");
    if (!token) {
      router.push("/acceso?next=/panel");
      return;
    }
    if (user?.account_type === "candidate") {
      const headers = { Authorization: `Bearer ${token}` };
      Promise.all([
        api("/candidate/profile", { headers }),
        api("/candidate/applications", { headers }),
      ])
        .then(([profile, items]) => {
          setCompletion(profile.data.completion ?? 0);
          setApplications(items.data.length);
        })
        .catch((err) =>
          setError(
            err instanceof Error
              ? err.message
              : "No pudimos cargar el resumen.",
          ),
        );
    }
  }, [router, user?.account_type]);
  if (!user) return <main className="min-h-[70vh] bg-slate-50" />;
  const candidate = user.account_type === "candidate";
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          {candidate ? "Panel del candidato" : "Panel empresarial"}
        </p>
        <h1 className="mt-1 text-3xl font-black">Hola, {user.name}</h1>
        <p className="mt-2 text-slate-500">
          {candidate
            ? "Administra tu perfil y sigue tus oportunidades."
            : "Gestiona tu empresa y sus procesos de contratación."}
        </p>
        {user.is_admin && (
          <Link
            href="/admin"
            className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-3 font-bold text-white"
          >
            Abrir administración
          </Link>
        )}
        {!user.email_verified && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            Tu correo aún no está verificado.{" "}
            <Link href="/verificar" className="font-bold underline">
              Reenviar verificación
            </Link>
          </div>
        )}
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        {candidate ? (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Stat
                label="Perfil completado"
                value={`${completion}%`}
                href="/mi-perfil"
                action="Completar perfil"
              />
              <Stat
                label="Postulaciones"
                value={String(applications)}
                href="/mis-postulaciones"
                action="Ver seguimiento"
              />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Action
                href="/empleos"
                title="Buscar empleos"
                text="Descubre nuevas oportunidades."
              />
              <Action
                href="/constructor-cv"
                title="Crear CV en PDF"
                text="Elige una plantilla y descarga tu currículum."
              />
              <Action
                href="/mi-cv-publico"
                title="Compartir mi CV"
                text="Controla un enlace público para tu currículum."
              />
              <Action
                href="/talento"
                title="Visibilidad y oportunidades"
                text="Gestiona invitaciones de empresas verificadas."
              />
              <Action
                href="/mis-postulaciones"
                title="Mis postulaciones"
                text="Consulta el estado de tus procesos."
              />
            </div>
          </>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Action
              href="/publicar"
              title="Publicar vacante"
              text="Inicia una nueva contratación."
            />
            <Action
              href="/empresa/perfil"
              title="Perfil empresarial"
              text="Completa los datos y solicita verificación."
            />
            <Action
              href="/empresa/equipo"
              title="Equipo y permisos"
              text="Administra representantes y roles de acceso."
            />
            <Action
              href="/empresa/candidatos"
              title="Candidatos"
              text="Gestiona estados, mensajes y entrevistas."
            />
            <Action
              href="/empresa/reportes"
              title="Reportes"
              text="Consulta vacantes, postulaciones y contrataciones."
            />
            <Action
              href="/empresa/talentos"
              title="Base de talentos"
              text="Busca e invita perfiles con consentimiento."
            />
          </div>
        )}
      </div>
    </main>
  );
}
function Stat({
  label,
  value,
  href,
  action,
}: {
  label: string;
  value: string;
  href: string;
  action: string;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
      <Link
        href={href}
        className="mt-5 inline-block text-sm font-bold text-blue-700"
      >
        {action} →
      </Link>
    </section>
  );
}
function Action({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
    >
      <h2 className="font-extrabold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </Link>
  );
}
