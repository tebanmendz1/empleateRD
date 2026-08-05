import Link from "next/link";
import type { Job } from "@/data/jobs";
export function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-700">
          {job.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex gap-2 text-xs font-bold">
            {job.featured && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
                Destacada
              </span>
            )}
            {job.urgent && (
              <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-700">
                Urgente
              </span>
            )}
          </div>
          <Link
            href={`/empleos/${job.slug}`}
            className="mt-2 block text-lg font-extrabold text-slate-900 hover:text-blue-700"
          >
            {job.title}
          </Link>
          <Link
            href={`/empresas/${job.companySlug}`}
            className="mt-1 block text-sm font-semibold text-slate-600 hover:text-blue-700"
          >
            {job.company}
          </Link>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
            <span>{job.location}</span>
            <span>{job.modality}</span>
            <span>{job.contract}</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="font-bold text-slate-800">{job.salary}</span>
            <span className="text-xs text-slate-500">{job.postedAt}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
