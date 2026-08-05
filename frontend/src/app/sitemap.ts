import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { jobs } from "@/data/jobs";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://empleaterd.com",
    now = new Date();
  return [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/empleos`, lastModified: now, priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, priority: 0.7 },
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      priority: 0.6,
    })),
    ...jobs.map((j) => ({
      url: `${base}/empleos/${j.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
