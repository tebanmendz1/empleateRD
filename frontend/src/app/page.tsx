const categories = [
  "Tecnología",
  "Administración",
  "Ventas",
  "Servicio al cliente",
  "Salud",
  "Hotelería",
];

export default function Home() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="text-xl font-extrabold tracking-tight text-blue-700">
            Empléate<span className="text-emerald-500">RD</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#empleos">Buscar empleos</a>
            <a href="#empresas">Empresas</a>
            <a href="#recursos">Recursos</a>
          </nav>
          <div className="flex items-center gap-3 text-sm font-bold">
            <button className="hidden text-slate-700 sm:block">Iniciar sesión</button>
            <button className="rounded-xl bg-blue-700 px-4 py-2.5 text-white shadow-sm">
              Publicar vacante
            </button>
          </div>
        </div>
      </header>

      <section className="hero-grid overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Oportunidades en República Dominicana
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              El próximo paso de tu carrera comienza aquí.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Encuentra empleos relevantes y conecta con empresas confiables de forma simple, rápida y transparente.
            </p>
          </div>

          <form className="mt-10 grid gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:grid-cols-[1fr_0.7fr_auto]">
            <label className="sr-only" htmlFor="query">Cargo o palabra clave</label>
            <input id="query" className="rounded-xl border border-slate-200 px-4 py-4 text-slate-900 outline-none focus:border-blue-500" placeholder="Cargo, habilidad o palabra clave" />
            <label className="sr-only" htmlFor="location">Ubicación</label>
            <select id="location" className="rounded-xl border border-slate-200 px-4 py-4 text-slate-700 outline-none focus:border-blue-500">
              <option>Toda República Dominicana</option>
              <option>Distrito Nacional</option>
              <option>Santo Domingo</option>
              <option>Santiago</option>
            </select>
            <button type="submit" className="rounded-xl bg-emerald-500 px-7 py-4 font-extrabold text-slate-950 transition hover:bg-emerald-400">
              Buscar empleos
            </button>
          </form>
        </div>
      </section>

      <section id="empleos" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Explora por área</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Encuentra tu lugar</h2>
          </div>
          <a href="#" className="hidden text-sm font-bold text-blue-700 sm:block">Ver todas las categorías →</a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <a key={category} href="#" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <span className="text-xs font-bold text-emerald-600">{12 + index * 7} vacantes</span>
              <h3 className="mt-2 text-lg font-extrabold text-slate-900 group-hover:text-blue-700">{category}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Descubre oportunidades recientes en empresas de todo el país.</p>
            </a>
          ))}
        </div>
      </section>

      <section id="empresas" className="bg-blue-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Para empresas</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Publica según lo que realmente necesitas.</h2>
            <p className="mt-4 leading-7 text-slate-600">Nuestro asistente prepara una recomendación basada en cantidad de vacantes, duración, postulaciones y urgencia. Sin planes rígidos.</p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-blue-100">
            <p className="font-extrabold text-slate-900">Obtén una recomendación personalizada</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Responde unas preguntas y conoce el precio antes de registrarte.</p>
            <button className="mt-6 w-full rounded-xl bg-blue-700 px-5 py-3.5 font-extrabold text-white">Calcular publicación</button>
          </div>
        </div>
      </section>

      <footer id="recursos" className="bg-slate-950 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-9 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EmpléateRD. Construyendo mejores conexiones laborales.</p>
          <p>Privacidad · Términos · Ayuda</p>
        </div>
      </footer>
    </main>
  );
}
