import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";
import { HouseAd } from "@/components/house-ad";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a
    ? {
        title: a.title,
        description: a.description,
        alternates: { canonical: `/blog/${a.slug}` },
        openGraph: {
          title: a.title,
          description: a.description,
          type: "article",
          publishedTime: a.publishedAt,
        },
      }
    : {};
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    publisher: { "@type": "Organization", name: "EmpléateRD" },
  };
  return (
    <main className="bg-slate-50 px-5 py-12">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-bold text-blue-700">
          ← Volver al blog
        </Link>
        <p className="mt-8 text-sm font-bold uppercase text-blue-700">
          {a.category}
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight">{a.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{a.description}</p>
        <p className="mt-3 text-sm text-slate-500">
          {new Date(a.publishedAt).toLocaleDateString("es-DO")} ·{" "}
          {a.readingMinutes} minutos
        </p>
        <div className="mt-10 space-y-9">
          {a.content.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-black">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 leading-8 text-slate-700">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-10">
          <HouseAd
            audience={a.category === "Empresas" ? "company" : "candidate"}
          />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </article>
    </main>
  );
}
