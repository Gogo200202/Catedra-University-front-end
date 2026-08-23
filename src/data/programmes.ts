import type { Lang } from "../i18n/translations.ts";

export type ProgrammeLevel = "bachelor" | "master" | "phd";

export interface Programme {
  id: string;
  level: ProgrammeLevel;
  abbreviation: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  semesters: number;
}

export const programmes: Programme[] = [
  {
    id: "kst-ba",
    level: "bachelor",
    abbreviation: "KST",
    name: {
      en: "Computer Systems and Technologies",
      bg: "Компютърни системи и технологии",
    },
    description: {
      en: "Programming, computer architecture, operating systems, databases and software engineering — the core degree course of the department.",
      bg: "Програмиране, компютърна архитектура, операционни системи, бази данни и софтуерно инженерство — основната специалност на катедрата.",
    },
    semesters: 8,
  },
  {
    id: "ctcs-ba",
    level: "bachelor",
    abbreviation: "CTCS",
    name: {
      en: "Communication Technologies and Cybersecurity",
      bg: "Комуникационни технологии и киберсигурност",
    },
    description: {
      en: "Modern communication networks, information security and protection of critical infrastructures.",
      bg: "Модерни комуникационни мрежи, сигурност на информацията и защита на критичната инфраструктура.",
    },
    semesters: 8,
  },
  {
    id: "sta-ma",
    level: "master",
    abbreviation: "STA",
    name: {
      en: "Software Technologies and Applications",
      bg: "Софтуерни технологии и приложения",
    },
    description: {
      en: "Advanced training in software architecture, cloud services, distributed systems and intelligent applications.",
      bg: "Надградена подготовка по софтуерна архитектура, облачни услуги, разпределени системи и интелигентни приложения.",
    },
    semesters: 3,
  },
  {
    id: "cns-ma",
    level: "master",
    abbreviation: "CNS",
    name: {
      en: "Computer Networks and Security",
      bg: "Компютърни мрежи и сигурност",
    },
    description: {
      en: "Design and administration of large-scale networks, ethical hacking and security management.",
      bg: "Проектиране и администриране на мащабни мрежи, етичен хакинг и управление на сигурността.",
    },
    semesters: 3,
  },
  {
    id: "cst-phd",
    level: "phd",
    abbreviation: "PhD",
    name: {
      en: "Computer Systems and Technologies (doctoral programme)",
      bg: "Компютърни системи и технологии (докторска програма)",
    },
    description: {
      en: "Doctoral studies in the scientific major of the technical sciences, including individual study plan and research work.",
      bg: "Докторантура по научната специалност на техническите науки с индивидуален учебен план и изследователска дейност.",
    },
    semesters: 6,
  },
];
