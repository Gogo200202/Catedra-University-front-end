import type { Lang } from "../i18n/translations.ts";

export interface ResearchProject {
  id: number;
  name: Record<Lang, string>;
  fundingOrganization: Record<Lang, string>;
  period: string;
  contractNumber?: string;
  description: Record<Lang, string>;
}

export interface Publication {
  id: number;
  authors: string;
  title: string;
  venue: string;
  year: number;
}

export const projects: ResearchProject[] = [
  {
    id: 1,
    name: {
      en: "Competence Center \u201cIntelligent Mechatronic, Eco and Energy Saving Technologies and Systems\u201d",
      bg: "Център за компетентност \u201eИнтелигентни мехатронни, еко и енергоспестяващи технологии и системи\u201c",
    },
    fundingOrganization: {
      en: "Operational Programme Science and Education for Smart Growth",
      bg: "Оперативна програма Наука и образование за интелигентен растеж",
    },
    period: "2019 – 2028",
    contractNumber: "BG05M2OP001-1.002-0023",
    description: {
      en: "The department participates with research laboratories in the field of intelligent systems, embedded control and data processing.",
      bg: "Катедрата участва с изследователски лаборатории в областта на интелигентните системи, вграденото управление и обработката на данни.",
    },
  },
  {
    id: 2,
    name: {
      en: "International Scientific Conference UNITECH",
      bg: "Международна научна конференция ЮНИТЕХ",
    },
    fundingOrganization: {
      en: "Technical University of Gabrovo",
      bg: "Технически университет – Габрово",
    },
    period: "annual",
    description: {
      en: "Organized with active participation of the department staff; proceedings are indexed in international databases.",
      bg: "Организирана с активното участие на преподавателите от катедрата; докладите се индексират в международни бази данни.",
    },
  },
  {
    id: 3,
    name: {
      en: "Methods and Algorithms for Intelligent Data Processing in Cyber-Physical Systems",
      bg: "Методи и алгоритми за интелигентна обработка на данни в киберфизични системи",
    },
    fundingOrganization: {
      en: "Bulgarian National Science Fund",
      bg: "Фонд \u201eНаучни изследвания\u201c",
    },
    period: "2024 – 2027",
    description: {
      en: "Development of models and software tools for real-time analysis of sensor data streams.",
      bg: "Разработване на модели и софтуерни инструменти за анализ на потоци от сензорни данни в реално време.",
    },
  },
  {
    id: 4,
    name: {
      en: "Digital Skills for Engineering Education (Erasmus+ KA220)",
      bg: "Дигитални умения за инженерното образование (Erasmus+ KA220)",
    },
    fundingOrganization: {
      en: "European Commission — Erasmus+ Programme",
      bg: "Европейска комисия — програма Еразъм+",
    },
    period: "2024 – 2026",
    description: {
      en: "Cooperation partnership for development of digital teaching methodologies and shared learning resources.",
      bg: "Партньорско сътрудничество за разработване на дигитални методологии и споделени учебни ресурси.",
    },
  },
];

export const publications: Publication[] = [
  {
    id: 1,
    authors: "Ivanov R., Stoynev S., Dimitrova M.",
    title:
      "An adaptive machine learning approach for predictive maintenance in industrial IoT environments",
    venue: "Journal of the Technical University of Gabrovo",
    year: 2025,
  },
  {
    id: 2,
    authors: "Dimitrova M., Georgieva E.",
    title:
      "Microservice-based architecture for scalable university information services",
    venue: "UNITECH Proceedings, Section Computer Informatics",
    year: 2025,
  },
  {
    id: 3,
    authors: "Stoynev S., Kolev N.",
    title:
      "A comparative study of network intrusion detection methods using deep learning",
    venue: "International Conference on Communications and Cybersecurity",
    year: 2024,
  },
  {
    id: 4,
    authors: "Petkov I.",
    title:
      "Low-cost embedded platform for robotics education in engineering degree courses",
    venue: "Bulletin of the Union of Scientists — Gabrovo",
    year: 2024,
  },
  {
    id: 5,
    authors: "Georgieva E., Peneva V.",
    title:
      "Improving first-year programming outcomes through automated assessment tools",
    venue: "Annual University Scientific Session, TU — Gabrovo",
    year: 2023,
  },
];
