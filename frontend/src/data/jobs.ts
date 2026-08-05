export type Job = {
  slug: string;
  title: string;
  companySlug: string;
  company: string;
  initials: string;
  category: string;
  location: string;
  modality: "Presencial" | "Remoto" | "Híbrido";
  contract: string;
  salary: string;
  salaryFrom: number;
  postedAt: string;
  featured?: boolean;
  urgent?: boolean;
  summary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
};

export const jobs: Job[] = [
  {
    slug: "desarrollador-frontend-react",
    title: "Desarrollador Frontend React",
    companySlug: "caribe-digital",
    company: "Caribe Digital",
    initials: "CD",
    category: "Tecnología",
    location: "Distrito Nacional",
    modality: "Híbrido",
    contract: "Tiempo completo",
    salary: "RD$85,000 – RD$115,000",
    salaryFrom: 85000,
    postedAt: "Hoy",
    featured: true,
    summary: "Construye productos digitales modernos para clientes del Caribe.",
    description: [
      "Participarás en el diseño y desarrollo de aplicaciones web de alto tráfico utilizando React y TypeScript.",
      "Trabajarás con diseño, producto y backend para entregar experiencias rápidas y accesibles.",
    ],
    requirements: [
      "2 años de experiencia con React",
      "Dominio de TypeScript y Git",
      "Conocimientos de accesibilidad web",
      "Comunicación efectiva",
    ],
    benefits: [
      "Seguro médico complementario",
      "Horario flexible",
      "Presupuesto de formación",
      "Dos días remotos por semana",
    ],
  },
  {
    slug: "representante-servicio-al-cliente",
    title: "Representante de Servicio al Cliente",
    companySlug: "conexion-global",
    company: "Conexión Global",
    initials: "CG",
    category: "Servicio al cliente",
    location: "Santo Domingo",
    modality: "Presencial",
    contract: "Tiempo completo",
    salary: "RD$38,000 – RD$48,000",
    salaryFrom: 38000,
    postedAt: "Hace 2 horas",
    urgent: true,
    summary: "Brinda soporte cercano a clientes locales e internacionales.",
    description: [
      "Atenderás consultas por teléfono, correo y chat, documentando cada caso y ofreciendo soluciones claras.",
    ],
    requirements: [
      "Bachiller o estudiante universitario",
      "Orientación al servicio",
      "Manejo básico de computadoras",
      "Disponibilidad de horario",
    ],
    benefits: [
      "Bonos por desempeño",
      "Transporte nocturno",
      "Capacitación pagada",
      "Oportunidad de crecimiento",
    ],
  },
  {
    slug: "analista-contabilidad",
    title: "Analista de Contabilidad",
    companySlug: "grupo-horizonte",
    company: "Grupo Horizonte",
    initials: "GH",
    category: "Administración",
    location: "Santiago",
    modality: "Presencial",
    contract: "Tiempo completo",
    salary: "RD$55,000 – RD$70,000",
    salaryFrom: 55000,
    postedAt: "Ayer",
    summary: "Apoya el cierre contable y los controles financieros.",
    description: [
      "Gestionarás conciliaciones, cuentas por pagar y reportes mensuales bajo supervisión de la gerencia financiera.",
    ],
    requirements: [
      "Licenciatura en Contabilidad",
      "Excel intermedio",
      "Conocimiento tributario dominicano",
      "Un año de experiencia",
    ],
    benefits: ["Seguro médico", "Bonificación anual", "Almuerzo subsidiado"],
  },
  {
    slug: "ejecutivo-ventas-corporativas",
    title: "Ejecutivo de Ventas Corporativas",
    companySlug: "altavista-soluciones",
    company: "Altavista Soluciones",
    initials: "AS",
    category: "Ventas",
    location: "Distrito Nacional",
    modality: "Híbrido",
    contract: "Tiempo completo",
    salary: "RD$45,000 + comisiones",
    salaryFrom: 45000,
    postedAt: "Hace 2 días",
    featured: true,
    summary:
      "Desarrolla relaciones comerciales y presenta soluciones tecnológicas.",
    description: [
      "Identificarás prospectos, realizarás demostraciones y acompañarás la negociación hasta el cierre.",
    ],
    requirements: [
      "Experiencia en ventas B2B",
      "Movilidad propia",
      "Excelente presentación",
      "Orientación a resultados",
    ],
    benefits: [
      "Comisiones sin techo",
      "Combustible",
      "Teléfono corporativo",
      "Trabajo híbrido",
    ],
  },
  {
    slug: "enfermera-asistencial",
    title: "Enfermera Asistencial",
    companySlug: "centro-medico-del-cibao",
    company: "Centro Médico del Cibao",
    initials: "CM",
    category: "Salud",
    location: "Santiago",
    modality: "Presencial",
    contract: "Tiempo completo",
    salary: "RD$48,000 – RD$58,000",
    salaryFrom: 48000,
    postedAt: "Hace 3 días",
    summary:
      "Forma parte de un equipo clínico comprometido con una atención humana.",
    description: [
      "Ofrecerás atención directa, administrarás medicamentos y mantendrás registros clínicos actualizados.",
    ],
    requirements: [
      "Licenciatura en Enfermería",
      "Exequátur vigente",
      "Disponibilidad para turnos",
      "Vocación de servicio",
    ],
    benefits: ["Seguro complementario", "Uniformes", "Educación continua"],
  },
  {
    slug: "agente-reservas-remoto",
    title: "Agente de Reservas",
    companySlug: "quisqueya-travel",
    company: "Quisqueya Travel",
    initials: "QT",
    category: "Hotelería",
    location: "República Dominicana",
    modality: "Remoto",
    contract: "Tiempo completo",
    salary: "RD$42,000 – RD$52,000",
    salaryFrom: 42000,
    postedAt: "Hace 4 días",
    summary:
      "Ayuda a viajeros a planificar experiencias desde cualquier provincia.",
    description: [
      "Procesarás solicitudes, cambios y confirmaciones utilizando nuestros sistemas de reservas.",
    ],
    requirements: [
      "Inglés intermedio",
      "Internet estable",
      "Experiencia de servicio",
      "Organización",
    ],
    benefits: ["Trabajo remoto", "Descuentos de viaje", "Incentivos mensuales"],
  },
];

export const categories = [
  "Tecnología",
  "Administración",
  "Ventas",
  "Servicio al cliente",
  "Salud",
  "Hotelería",
];
export const getJob = (slug: string) => jobs.find((job) => job.slug === slug);
export function getCompany(slug: string) {
  const companyJobs = jobs.filter((job) => job.companySlug === slug);
  return companyJobs.length
    ? {
        slug,
        name: companyJobs[0].company,
        initials: companyJobs[0].initials,
        jobs: companyJobs,
      }
    : undefined;
}
