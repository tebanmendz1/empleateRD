import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PwaRegister } from "@/components/pwa-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://empleaterd.com",
  ),
  title: {
    default: "EmpléateRD — Empleos en República Dominicana",
    template: "%s | EmpléateRD",
  },
  description:
    "Encuentra empleos y conecta con empresas confiables en República Dominicana.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_DO", siteName: "EmpléateRD" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PwaRegister />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
