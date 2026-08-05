import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";
export const metadata: Metadata = {
  title: "Consejos de empleo y contratación",
  description:
    "Guías sobre currículum, entrevistas y contratación en República Dominicana.",
  alternates: { canonical: "/blog" },
};
export default function Blog() {
  return (
    <main className="min-h-[70vh] bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase text-blue-700">Recursos</p>
        <h1 className="mt-2 text-4xl font-black">
          Consejos para avanzar profesionalmente
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Información práctica para candidatos y empresas en República
          Dominicana.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {articles.map((a) => (
            <article key={a.slug} className="rounded-2xl border bg-white p-6">
              <p className="text-xs font-bold uppercase text-blue-700">
                {a.category}
              </p>
              <h2 className="mt-3 text-xl font-black">
                <Link href={`/blog/${a.slug}`} className="hover:text-blue-700">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-3 leading-6 text-slate-600">{a.description}</p>
              <p className="mt-5 text-xs text-slate-500">
                {a.readingMinutes} minutos de lectura
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
