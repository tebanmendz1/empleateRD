import type { Job } from "@/data/jobs";

type ApiJob = {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  location: string;
  modality: Job["modality"];
  contract_type: string;
  salary_min?: number | null;
  salary_max?: number | null;
  currency?: string;
  published_at?: string;
  company: { name: string; slug: string };
};
const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
export function normalizeJob(j: ApiJob): Job {
  const initials = j.company.name
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
  const money = (n: number) =>
    new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: j.currency ?? "DOP",
      maximumFractionDigits: 0,
    }).format(n);
  return {
    slug: j.slug,
    title: j.title,
    companySlug: j.company.slug,
    company: j.company.name,
    initials,
    category: "General",
    location: j.location,
    modality: j.modality,
    contract: j.contract_type,
    salary:
      j.salary_min && j.salary_max
        ? `${money(j.salary_min)} – ${money(j.salary_max)}`
        : j.salary_min
          ? `Desde ${money(j.salary_min)}`
          : "A convenir",
    salaryFrom: j.salary_min ?? 0,
    postedAt: j.published_at
      ? new Date(j.published_at).toLocaleDateString("es-DO")
      : "Reciente",
    summary: j.summary,
    description: (j.description ?? j.summary).split(/\n+/).filter(Boolean),
    requirements: j.requirements ?? [],
    benefits: j.benefits ?? [],
  };
}
export async function apiJobs(): Promise<Job[]> {
  try {
    const r = await fetch(`${base}/jobs`, { next: { revalidate: 60 } });
    if (!r.ok) return [];
    const body = await r.json();
    return (body.data?.data ?? []).map(normalizeJob);
  } catch {
    return [];
  }
}
export async function apiJob(slug: string): Promise<Job | null> {
  try {
    const r = await fetch(`${base}/jobs/${slug}`, { next: { revalidate: 60 } });
    if (!r.ok) return null;
    return normalizeJob((await r.json()).data);
  } catch {
    return null;
  }
}
