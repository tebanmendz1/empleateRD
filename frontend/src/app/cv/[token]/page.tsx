import { notFound } from "next/navigation";
const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
type Cv = {
  name: string;
  professional_title?: string;
  summary?: string;
  province?: string;
  city?: string;
  skills?: string[];
  languages?: string[];
  experience?: Record<string, string>[];
  education?: Record<string, string>[];
  certifications?: string[];
  portfolio_url?: string;
};
export default async function PublicCv({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const response = await fetch(`${base}/cv/${token}`, { cache: "no-store" });
  if (!response.ok) notFound();
  const cv: Cv = (await response.json()).data;
  return (
    <main className="min-h-screen bg-slate-100 px-5 py-12">
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <header className="border-b-4 border-blue-700 pb-6">
          <p className="text-sm font-bold uppercase text-blue-700">
            Currículum compartido con EmpléateRD
          </p>
          <h1 className="mt-2 text-4xl font-black">{cv.name}</h1>
          <p className="mt-2 text-xl text-slate-600">{cv.professional_title}</p>
          <p className="mt-2 text-sm text-slate-500">
            {[cv.city, cv.province].filter(Boolean).join(", ")}
          </p>
        </header>
        {cv.summary && (
          <Section title="Perfil">
            <p className="leading-7 text-slate-700">{cv.summary}</p>
          </Section>
        )}
        <Section title="Habilidades">
          <div className="flex flex-wrap gap-2">
            {cv.skills?.map((s) => (
              <span
                key={s}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
        <Section title="Experiencia">
          {cv.experience?.map((x, i) => (
            <div key={i} className="mb-5">
              <h3 className="font-black">
                {x.role} · {x.company}
              </h3>
              <p className="text-sm text-slate-500">{x.period}</p>
              <p className="mt-2 text-slate-700">{x.description}</p>
            </div>
          ))}
        </Section>
        <Section title="Educación">
          {cv.education?.map((x, i) => (
            <p key={i} className="mb-3">
              <b>{x.degree}</b> · {x.institution} · {x.period}
            </p>
          ))}
        </Section>
        {cv.portfolio_url && (
          <a
            href={cv.portfolio_url}
            rel="noreferrer"
            target="_blank"
            className="mt-7 inline-block font-bold text-blue-700"
          >
            Ver portafolio profesional
          </a>
        )}
        <footer className="mt-10 border-t pt-5 text-center text-xs text-slate-500">
          Currículum generado y compartido mediante EmpléateRD
        </footer>
      </article>
    </main>
  );
}
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-lg font-black uppercase tracking-wider text-blue-700">
        {title}
      </h2>
      {children}
    </section>
  );
}
