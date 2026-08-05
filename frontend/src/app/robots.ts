import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/panel",
        "/mi-perfil",
        "/mis-postulaciones",
        "/empresa/",
      ],
    },
    sitemap: "https://empleaterd.com/sitemap.xml",
  };
}
