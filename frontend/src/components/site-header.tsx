import Link from "next/link";
import { AccountNav } from "./account-nav";
import { CompanyOnly } from "./company-only";
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-blue-700"
        >
          Empléate<span className="text-emerald-500">RD</span>
        </Link>
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex"
        >
          <Link href="/empleos">Buscar empleos</Link>
          <Link href="/mi-perfil">Mi perfil</Link>
          <Link href="/constructor-cv">Crear CV</Link>
          <Link href="/mis-postulaciones">Postulaciones</Link>
          <Link href="/notificaciones">Notificaciones</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm font-bold">
          <AccountNav />
          <CompanyOnly>
            <Link
              href="/publicar"
              className="rounded-xl bg-blue-700 px-4 py-2.5 text-white"
            >
              Publicar vacante
            </Link>
          </CompanyOnly>
        </div>
      </div>
    </header>
  );
}
