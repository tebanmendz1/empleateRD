import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EmpléateRD",
    short_name: "EmpléateRD",
    description: "Empleos y contratación en República Dominicana",
    start_url: "/panel",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#1d4ed8",
    lang: "es-DO",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
