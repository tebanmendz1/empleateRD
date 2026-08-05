"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_URL, api } from "@/lib/api";

type Profile = Record<string, unknown>;
type Template =
  "classic" | "modern" | "minimal" | "executive" | "creative" | "compact";
type Analysis = {
  score: number;
  level: string;
  strengths: string[];
  improvements: string[];
  summary: string;
};
const templates: {
  id: Template;
  name: string;
  text: string;
  color: string;
  photo?: boolean;
}[] = [
  {
    id: "classic",
    name: "Clásica",
    text: "Formal y centrada para perfiles corporativos.",
    color: "border-blue-700 bg-slate-50",
  },
  {
    id: "modern",
    name: "Moderna",
    text: "Encabezado verde con mayor contraste.",
    color: "bg-emerald-700",
  },
  {
    id: "minimal",
    name: "Minimalista",
    text: "Tipografía sobria y máxima claridad.",
    color: "border border-slate-300 bg-white",
  },
  {
    id: "executive",
    name: "Ejecutiva + foto",
    text: "Presencia profesional para liderazgo y gestión.",
    color: "bg-blue-950",
    photo: true,
  },
  {
    id: "creative",
    name: "Creativa + foto",
    text: "Acentos cálidos para perfiles de comunicación y diseño.",
    color: "border-l-[12px] border-orange-600 bg-orange-50",
    photo: true,
  },
  {
    id: "compact",
    name: "Compacta + foto",
    text: "Aprovecha el espacio para trayectorias extensas.",
    color: "border-t-8 border-violet-700 bg-slate-100",
    photo: true,
  },
];
const lines = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
const records = (value: FormDataEntryValue | null, keys: string[]) =>
  lines(value).map((line) =>
    Object.fromEntries(
      keys.map((key, i) => [key, line.split("|")[i]?.trim() ?? ""]),
    ),
  );
const token = () => localStorage.getItem("empleaterd_token");

export default function CvBuilder() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({});
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [template, setTemplate] = useState<Template>("classic");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!token()) {
      router.push("/acceso?next=/constructor-cv");
      return;
    }
    api("/candidate/profile", {
      headers: { Authorization: `Bearer ${token()}` },
    })
      .then((r) => setProfile(r.data))
      .catch(showError)
      .finally(() => setProfileLoaded(true));
  }, [router]);
  function showError(err: unknown) {
    setError(
      err instanceof Error ? err.message : "No pudimos completar la solicitud.",
    );
  }
  function currentData(form: HTMLFormElement) {
    const f = new FormData(form);
    return {
      professional_title: f.get("professional_title"),
      summary: f.get("summary"),
      portfolio_url: f.get("portfolio_url") || null,
      skills: lines(f.get("skills")),
      languages: lines(f.get("languages")),
      certifications: lines(f.get("certifications")),
      experience: records(f.get("experience"), [
        "role",
        "company",
        "period",
        "description",
      ]),
      education: records(f.get("education"), [
        "degree",
        "institution",
        "period",
      ]),
    };
  }
  async function saveCurrent(signal?: AbortSignal) {
    const form = document.querySelector<HTMLFormElement>("main form");
    if (!form) throw new Error("El constructor todavía no está listo.");
    const r = await api("/candidate/profile", {
      method: "PUT",
      signal,
      headers: { Authorization: `Bearer ${token()}` },
      body: JSON.stringify(currentData(form)),
    });
    setProfile(r.data);
    setAnalysis(null);
  }
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await saveCurrent();
      setMessage("Toda la información del CV fue guardada.");
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  }
  async function uploadPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setPhotoPreview(URL.createObjectURL(file));
    const form = new FormData();
    form.append("photo", file);
    const response = await fetch(`${API_URL}/candidate/cv/photo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: form,
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setPhotoPreview(null);
      return setError(
        body.errors
          ? (Object.values(body.errors).flat()[0] as string)
          : (body.message ?? "No pudimos guardar la foto."),
      );
    }
    setProfile((p) => ({ ...p, has_photo: true }));
    setMessage("Fotografía guardada de forma privada.");
  }
  async function analyze() {
    setLoading(true);
    setError("");
    try {
      await saveCurrent();
      const r = await api("/candidate/cv/analyze", {
        headers: { Authorization: `Bearer ${token()}` },
      });
      setAnalysis(r.data);
      setMessage("Analizamos la información actual del constructor.");
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  }
  async function exportPdf() {
    setExporting(true);
    setError("");
    setMessage("Guardando la información y preparando el PDF…");
    const controller = new AbortController(),
      timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      await saveCurrent(controller.signal);
      const response = await fetch(
        `${API_URL}/candidate/cv/export?template=${template}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/pdf",
            Authorization: `Bearer ${token()}`,
          },
        },
      );
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message ?? "No pudimos generar el PDF.");
      }
      const url = URL.createObjectURL(await response.blob()),
        link = document.createElement("a");
      link.href = url;
      link.download = "cv-empleaterd.pdf";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("CV actualizado y descargado correctamente.");
    } catch (err) {
      setMessage("");
      showError(
        err instanceof DOMException && err.name === "AbortError"
          ? new Error(
              "La API tardó demasiado en generar el PDF. Intenta nuevamente en unos segundos.",
            )
          : err,
      );
    } finally {
      window.clearTimeout(timeout);
      setExporting(false);
    }
  }
  if (!profileLoaded)
    return (
      <main className="grid min-h-[75vh] place-items-center bg-slate-50 text-slate-500">
        Cargando tu información profesional…
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase text-blue-700">
          Constructor y analizador de CV
        </p>
        <h1 className="mt-1 text-3xl font-black">
          Crea un currículum que destaque
        </h1>
        <p className="mt-2 text-slate-500">
          Completa tus datos, recibe recomendaciones y descarga la plantilla que
          prefieras.
        </p>
        {message && (
          <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-emerald-800">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">
            {error}
          </p>
        )}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
          <form
            onSubmit={save}
            className="space-y-5 rounded-3xl border bg-white p-7"
          >
            <PhotoInput
              preview={photoPreview}
              hasPhoto={Boolean(profile.has_photo)}
              onChange={uploadPhoto}
            />
            <Field
              label="Titular profesional"
              name="professional_title"
              value={profile.professional_title}
            />
            <label className="block text-sm font-bold">
              Resumen
              <textarea
                name="summary"
                rows={5}
                defaultValue={String(profile.summary ?? "")}
                className="mt-2 w-full rounded-xl border p-3.5 font-normal"
              />
            </label>
            <Field
              label="Portafolio o LinkedIn"
              name="portfolio_url"
              value={profile.portfolio_url}
            />
            <Area
              label="Experiencia"
              hint="Cargo | Empresa | Período | Descripción"
              name="experience"
              value={formatRecords(profile.experience, [
                "role",
                "company",
                "period",
                "description",
              ])}
            />
            <Area
              label="Educación"
              hint="Título | Institución | Período"
              name="education"
              value={formatRecords(profile.education, [
                "degree",
                "institution",
                "period",
              ])}
            />
            <Area
              label="Habilidades"
              hint="Una por línea"
              name="skills"
              value={formatList(profile.skills)}
            />
            <Area
              label="Idiomas"
              hint="Una por línea"
              name="languages"
              value={formatList(profile.languages)}
            />
            <Area
              label="Certificaciones"
              hint="Una por línea"
              name="certifications"
              value={formatList(profile.certifications)}
            />
            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-700 p-4 font-extrabold text-white disabled:opacity-60"
            >
              {loading ? "Guardando…" : "Guardar información"}
            </button>
          </form>
          <aside className="space-y-6">
            <AnalysisCard analysis={analysis} onAnalyze={analyze} />
            <div className="rounded-3xl border bg-white p-6">
              <h2 className="text-xl font-extrabold">
                Elige entre 6 plantillas
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {templates.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setTemplate(item.id)}
                    className={`rounded-2xl border-2 p-3 text-left ${template === item.id ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <div
                      className={`relative mb-3 h-16 rounded-lg ${item.color}`}
                    >
                      {item.photo && (
                        <span className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-lg">
                          👤
                        </span>
                      )}
                    </div>
                    <p className="font-extrabold">{item.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={exportPdf}
                disabled={exporting}
                className="mt-6 w-full cursor-pointer rounded-xl bg-emerald-500 p-4 font-black text-slate-950 disabled:cursor-wait disabled:opacity-70"
              >
                {exporting ? "Preparando PDF…" : "Descargar PDF"}
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Todos los PDF incluyen un pie discreto de EmpléateRD.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
function PhotoInput({
  preview,
  hasPhoto,
  onChange,
}: {
  preview: string | null;
  hasPhoto: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed p-4">
      <div className="flex items-center gap-4">
        {preview ? (
          <Image
            unoptimized
            src={preview}
            alt="Vista previa"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="grid h-20 w-20 place-items-center rounded-full bg-slate-100 text-2xl">
            {hasPhoto ? "✓" : "📷"}
          </div>
        )}
        <div>
          <p className="font-extrabold">Fotografía profesional</p>
          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG o WebP. Cuadrada y con fondo neutro.
          </p>
          <label className="mt-3 inline-block cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white">
            {hasPhoto ? "Cambiar foto" : "Subir foto"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={onChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
function AnalysisCard({
  analysis,
  onAnalyze,
}: {
  analysis: Analysis | null;
  onAnalyze: () => void;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-emerald-400">
            Analizador de CV
          </p>
          <h2 className="mt-1 text-xl font-extrabold">
            {analysis
              ? `${analysis.score}/100 · ${analysis.level}`
              : "Descubre qué mejorar"}
          </h2>
        </div>
        {analysis && (
          <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-emerald-400 text-lg font-black">
            {analysis.score}
          </div>
        )}
      </div>
      {analysis ? (
        <>
          <p className="mt-4 text-sm text-slate-300">{analysis.summary}</p>
          {analysis.strengths.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-bold text-emerald-400">Fortalezas</p>
              {analysis.strengths.map((x) => (
                <p key={x} className="mt-2 text-xs text-slate-300">
                  ✓ {x}
                </p>
              ))}
            </div>
          )}
          {analysis.improvements.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-bold text-amber-300">
                Próximas mejoras
              </p>
              {analysis.improvements.map((x) => (
                <p key={x} className="mt-2 text-xs text-slate-300">
                  → {x}
                </p>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Evaluamos estructura, claridad, logros medibles, habilidades, contacto
          y presencia profesional.
        </p>
      )}
      <button
        type="button"
        onClick={onAnalyze}
        className="mt-5 w-full rounded-xl bg-white p-3 font-extrabold text-slate-900"
      >
        {analysis ? "Analizar de nuevo" : "Analizar mi CV"}
      </button>
    </div>
  );
}
function Field({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: unknown;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        name={name}
        defaultValue={String(value ?? "")}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      />
    </label>
  );
}
function Area({
  label,
  hint,
  name,
  value,
}: {
  label: string;
  hint: string;
  name: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <span className="ml-2 text-xs font-normal text-slate-400">{hint}</span>
      <textarea
        name={name}
        rows={4}
        defaultValue={value}
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      />
    </label>
  );
}
function formatList(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}
function formatRecords(value: unknown, keys: string[]) {
  return Array.isArray(value)
    ? value
        .map((item) =>
          keys
            .map((k) => (item as Record<string, string>)?.[k] ?? "")
            .join(" | "),
        )
        .join("\n")
    : "";
}
