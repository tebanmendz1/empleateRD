export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  content: { heading: string; paragraphs: string[] }[];
};
export const articles: Article[] = [
  {
    slug: "como-preparar-curriculum-republica-dominicana",
    title: "Cómo preparar un currículum que destaque",
    description:
      "Consejos prácticos para presentar tu experiencia, habilidades y logros con claridad.",
    category: "Currículum",
    publishedAt: "2026-08-05",
    readingMinutes: 6,
    content: [
      {
        heading: "Empieza por un objetivo claro",
        paragraphs: [
          "Adapta el título profesional y el resumen al tipo de puesto que buscas. Explica en pocas líneas qué sabes hacer y qué valor aportas.",
        ],
      },
      {
        heading: "Convierte tareas en resultados",
        paragraphs: [
          "Describe logros concretos cuando sea posible. Los resultados ayudan a comprender el impacto real de tu trabajo.",
        ],
      },
      {
        heading: "Facilita la lectura",
        paragraphs: [
          "Usa secciones claras, fechas consistentes y descripciones breves. Revisa tus datos antes de exportar el PDF.",
        ],
      },
    ],
  },
  {
    slug: "prepararse-para-entrevista-laboral",
    title: "Guía para prepararte antes de una entrevista",
    description:
      "Una preparación sencilla para responder con seguridad y evaluar la oportunidad.",
    category: "Entrevistas",
    publishedAt: "2026-08-05",
    readingMinutes: 5,
    content: [
      {
        heading: "Investiga la empresa",
        paragraphs: [
          "Revisa su actividad, servicios y la descripción de la vacante. Prepara ejemplos relacionados con los requisitos.",
        ],
      },
      {
        heading: "Practica ejemplos reales",
        paragraphs: [
          "Explica la situación, la acción que tomaste y el resultado. Hablar de experiencias reales transmite confianza.",
        ],
      },
      {
        heading: "También puedes preguntar",
        paragraphs: [
          "Consulta las responsabilidades, el equipo, las expectativas iniciales y las próximas etapas.",
        ],
      },
    ],
  },
  {
    slug: "como-publicar-vacante-atractiva",
    title: "Cómo redactar una vacante clara y atractiva",
    description:
      "Elementos esenciales para atraer candidatos adecuados y reducir dudas.",
    category: "Empresas",
    publishedAt: "2026-08-05",
    readingMinutes: 7,
    content: [
      {
        heading: "Explica la oportunidad",
        paragraphs: [
          "Usa un título reconocible y un resumen directo. Describe las tareas principales y el equipo.",
        ],
      },
      {
        heading: "Separa requisitos y preferencias",
        paragraphs: [
          "Incluye como obligatorios solamente los conocimientos realmente necesarios.",
        ],
      },
      {
        heading: "Ofrece transparencia",
        paragraphs: [
          "Indica modalidad, ubicación, contrato, beneficios y rango salarial cuando sea posible.",
        ],
      },
    ],
  },
];
export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);
