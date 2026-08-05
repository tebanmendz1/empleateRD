"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, api } from "@/lib/api";
type Profile = Record<string, unknown> & { completion?: number };
type Document = {
  id: number;
  original_name: string;
  kind: string;
  size: number;
};
const split = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
export default function CandidateProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Profile>({});
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = () => localStorage.getItem("empleaterd_token");
  useEffect(() => {
    async function load() {
      const access = token();
      if (!access) {
        router.push("/acceso?next=/mi-perfil");
        return;
      }
      try {
        const headers = { Authorization: `Bearer ${access}` };
        const [p, d] = await Promise.all([
          api("/candidate/profile", { headers }),
          api("/candidate/documents", { headers }),
        ]);
        setProfile(p.data);
        setDocuments(d.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "No pudimos cargar tu perfil.",
        );
      } finally {
        setProfileLoaded(true);
      }
    }
    void load();
  }, [router]);
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};
    if (step === 1)
      Object.assign(body, {
        professional_title: f.get("professional_title"),
        summary: f.get("summary"),
        province: f.get("province"),
        city: f.get("city"),
      });
    if (step === 2)
      Object.assign(body, {
        desired_roles: split(f.get("desired_roles")),
        interest_areas: split(f.get("interest_areas")),
        preferred_modalities: f.getAll("preferred_modalities"),
        preferred_provinces: split(f.get("preferred_provinces")),
        salary_expectation: Number(f.get("salary_expectation")) || null,
        availability: f.get("availability"),
        employment_types: f.getAll("employment_types"),
        willing_to_relocate: f.get("willing_to_relocate") === "on",
      });
    if (step === 3)
      Object.assign(body, {
        skills: split(f.get("skills")),
        languages: split(f.get("languages")),
      });
    try {
      const r = await api("/candidate/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token()}` },
        body: JSON.stringify(body),
      });
      setProfile(r.data);
      setMessage(r.message);
      if (step < 3) setStep(step + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos guardar.");
    }
  }
  async function upload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${API_URL}/candidate/documents`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: form,
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          body.message ?? Object.values(body.errors ?? {}).flat()[0],
        );
      setDocuments([body.data, ...documents]);
      setMessage(body.message);
      e.currentTarget.reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No pudimos cargar el documento.",
      );
    }
  }
  async function remove(id: number) {
    try {
      await api(`/candidate/documents/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      setDocuments(documents.filter((d) => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos eliminarlo.");
    }
  }
  async function download(doc: Document) {
    const response = await fetch(
      `${API_URL}/candidate/documents/${doc.id}/download`,
      { headers: { Authorization: `Bearer ${token()}` } },
    );
    if (!response.ok) return setError("No pudimos descargar el documento.");
    const url = URL.createObjectURL(await response.blob()),
      link = document.createElement("a");
    link.href = url;
    link.download = doc.original_name;
    link.click();
    URL.revokeObjectURL(url);
  }
  if (!profileLoaded)
    return (
      <main className="grid min-h-[75vh] place-items-center bg-slate-50 text-slate-500">
        Cargando tu perfil profesional…
      </main>
    );
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-blue-700">
              Perfil candidato
            </p>
            <h1 className="mt-1 text-3xl font-black">
              Construye tu perfil profesional
            </h1>
          </div>
          <div className="w-48">
            <div className="flex justify-between text-xs font-bold">
              <span>Completado</span>
              <span>{profile.completion ?? 0}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: `${profile.completion ?? 0}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-2">
          {["Información", "Preferencias", "Habilidades y CV"].map(
            (name, i) => (
              <button
                key={name}
                onClick={() => setStep(i + 1)}
                className={`flex-1 rounded-xl px-3 py-3 text-sm font-bold ${step === i + 1 ? "bg-blue-700 text-white" : "bg-white text-slate-600"}`}
              >
                {i + 1}. {name}
              </button>
            ),
          )}
        </div>
        {message && (
          <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-emerald-800">
            {message}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700"
          >
            {error}
          </p>
        )}
        <section className="mt-5 rounded-3xl border bg-white p-6 sm:p-8">
          <form onSubmit={save} className="grid gap-5 sm:grid-cols-2">
            {step === 1 && (
              <>
                <Field
                  label="Titular profesional"
                  name="professional_title"
                  value={profile.professional_title}
                />
                <Field
                  label="Provincia"
                  name="province"
                  value={profile.province}
                />
                <Field
                  label="Municipio o ciudad"
                  name="city"
                  value={profile.city}
                />
                <label className="block text-sm font-bold sm:col-span-2">
                  Resumen profesional
                  <textarea
                    name="summary"
                    defaultValue={String(profile.summary ?? "")}
                    rows={5}
                    className="mt-2 w-full rounded-xl border p-3.5 font-normal"
                  />
                </label>
              </>
            )}
            {step === 2 && (
              <>
                <Field
                  label="Cargos deseados (separados por coma)"
                  name="desired_roles"
                  value={profile.desired_roles}
                />
                <Field
                  label="Áreas de interés"
                  name="interest_areas"
                  value={profile.interest_areas}
                />
                <Field
                  label="Provincias preferidas"
                  name="preferred_provinces"
                  value={profile.preferred_provinces}
                />
                <Field
                  label="Salario esperado mensual"
                  name="salary_expectation"
                  value={profile.salary_expectation}
                  type="number"
                />
                <Checks
                  label="Modalidad"
                  name="preferred_modalities"
                  values={["Presencial", "Remoto", "Híbrido"]}
                  selected={profile.preferred_modalities}
                />
                <Checks
                  label="Tipo de empleo"
                  name="employment_types"
                  values={[
                    "Tiempo completo",
                    "Medio tiempo",
                    "Contrato",
                    "Freelance",
                  ]}
                  selected={profile.employment_types}
                />
                <label className="block text-sm font-bold">
                  Disponibilidad
                  <select
                    name="availability"
                    defaultValue={String(profile.availability ?? "")}
                    className="mt-2 w-full rounded-xl border p-3.5 font-normal"
                  >
                    <option value="">Seleccionar</option>
                    <option>Inmediata</option>
                    <option>15 días</option>
                    <option>30 días</option>
                    <option>A convenir</option>
                  </select>
                </label>
                <label className="flex items-center gap-3 text-sm font-bold">
                  <input
                    type="checkbox"
                    name="willing_to_relocate"
                    defaultChecked={Boolean(profile.willing_to_relocate)}
                  />
                  Puedo trasladarme
                </label>
              </>
            )}
            {step === 3 && (
              <>
                <Field
                  label="Habilidades (separadas por coma)"
                  name="skills"
                  value={profile.skills}
                />
                <Field
                  label="Idiomas (separados por coma)"
                  name="languages"
                  value={profile.languages}
                />
              </>
            )}
            <button className="rounded-xl bg-blue-700 p-4 font-extrabold text-white sm:col-span-2">
              {step < 3 ? "Guardar y continuar" : "Guardar perfil"}
            </button>
          </form>
          {step === 3 && (
            <div className="mt-8 border-t pt-8">
              <h2 className="text-xl font-extrabold">Documentos privados</h2>
              <p className="mt-1 text-sm text-slate-500">
                PDF, DOC o DOCX, máximo 5 MB.
              </p>
              <form
                onSubmit={upload}
                className="mt-4 flex flex-col gap-3 sm:flex-row"
              >
                <select name="kind" className="rounded-xl border p-3">
                  <option value="cv">Currículum</option>
                  <option value="certification">Certificación</option>
                  <option value="portfolio">Portafolio</option>
                </select>
                <input
                  required
                  type="file"
                  name="document"
                  accept=".pdf,.doc,.docx"
                  className="flex-1 rounded-xl border p-3"
                />
                <button className="rounded-xl bg-slate-900 px-5 font-bold text-white">
                  Subir
                </button>
              </form>
              <div className="mt-5 space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4"
                  >
                    <div>
                      <p className="font-bold">{doc.original_name}</p>
                      <p className="text-xs text-slate-500">
                        {doc.kind} · {(doc.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <div className="flex gap-3 text-sm font-bold">
                      <button
                        onClick={() => download(doc)}
                        className="text-blue-700"
                      >
                        Descargar
                      </button>
                      <button
                        onClick={() => remove(doc.id)}
                        className="text-rose-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
function Field({
  label,
  name,
  value,
  type = "text",
}: {
  label: string;
  name: string;
  value: unknown;
  type?: string;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={
          Array.isArray(value) ? value.join(", ") : String(value ?? "")
        }
        className="mt-2 w-full rounded-xl border p-3.5 font-normal"
      />
    </label>
  );
}
function Checks({
  label,
  name,
  values,
  selected,
}: {
  label: string;
  name: string;
  values: string[];
  selected: unknown;
}) {
  const current = Array.isArray(selected) ? selected : [];
  return (
    <fieldset>
      <legend className="text-sm font-bold">{label}</legend>
      <div className="mt-3 space-y-2">
        {values.map((value) => (
          <label key={value} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              name={name}
              value={value}
              defaultChecked={current.includes(value)}
            />
            {value}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
