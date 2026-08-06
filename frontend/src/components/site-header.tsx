import Link from "next/link";
import { AccountNav } from "./account-nav";
import { CompanyOnly } from "./company-only";
import { RoleNavigation } from "./role-navigation";
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
        <RoleNavigation />
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
