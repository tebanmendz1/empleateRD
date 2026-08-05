import Link from "next/link";
export function HouseAd({
  audience = "candidate",
}: {
  audience?: "candidate" | "company";
}) {
  const company = audience === "company";
  return (
    <aside
      aria-label="Promoción de EmpléateRD"
      className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 p-5"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
        EmpléateRD recomienda
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-black">
            {company
              ? "Encuentra el talento que necesita tu empresa"
              : "Mejora tu currículum antes de postularte"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {company
              ? "Cotiza y publica una vacante con un proceso guiado."
              : "Crea, analiza y exporta tu CV profesional gratuitamente."}
          </p>
        </div>
        <Link
          href={company ? "/publicar" : "/constructor-cv"}
          className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white"
        >
          {company ? "Cotizar vacante" : "Crear mi CV"}
        </Link>
      </div>
    </aside>
  );
}
