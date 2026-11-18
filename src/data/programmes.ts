import type { Lang } from "../i18n/translations.ts";

export type ProgrammeLevel = "bachelor" | "master" | "phd";

export interface Programme {
  id: string;
  level: ProgrammeLevel;
  abbreviation: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  semesters: number;
  degree: Record<Lang, string>;
  form: Record<Lang, string>;
  faculty: Record<Lang, string>;
  highlights: Record<Lang, string>[];
  careers: Record<Lang, string>;
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
    degree: {
      en: "Bachelor of Science in Engineering",
      bg: "Бакалавър — инженерен степен",
    },
    form: {
      en: "Full-time",
      bg: "Редовна форма на обучение",
    },
    faculty: {
      en: "Faculty of Electrical Engineering and Electronics — Department of Computer Systems and Technologies",
      bg: "Факултет по електротехника и електроника — катедра „Компютърни системи и технологии“",
    },
    highlights: [
      {
        en: "Programming fundamentals with modern languages (C/C++, Java, Python)",
        bg: "Основи на програмирането със съвременни езици (C/C++, Java, Python)",
      },
      {
        en: "Computer architecture and microcontroller systems",
        bg: "Компютърна архитектура и микроконтролерни системи",
      },
      {
        en: "Operating systems, computer networks and administration",
        bg: "Операционни системи, компютърни мрежи и администриране",
      },
      {
        en: "Databases, web technologies and software engineering",
        bg: "Бази данни, уеб технологии и софтуерно инженерство",
      },
      {
        en: "Team project practice and diploma thesis with real partners",
        bg: "Екипни проектни задачи и дипломна работа с реални партньори",
      },
    ],
    careers: {
      en: "Graduates work as software developers, embedded systems engineers, system administrators and QA engineers in Bulgarian and international companies, or continue their studies in a master's programme.",
      bg: "Выпускниците работят като софтуерни разработчици, инженери по вградени системи, системни администратори и QA инженери в български и международни компании или продължават обучението си в магистърска програма.",
    },
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
    degree: {
      en: "Bachelor of Science in Engineering",
      bg: "Бакалавър — инженерен степен",
    },
    form: {
      en: "Full-time",
      bg: "Редовна форма на обучение",
    },
    faculty: {
      en: "Faculty of Communications Equipment and Technologies — Department of Communication Technologies and Cybersecurity",
      bg: "Факултет по съобщителната техника и технологии — катедра „Комуникационна техника и технологии“",
    },
    highlights: [
      {
        en: "Modern telecommunication networks and radio technologies",
        bg: "Съвременни телекомуникационни мрежи и радио технологии",
      },
      {
        en: "Cryptographic methods and information security protocols",
        bg: "Криптографски методи и протоколи за сигурност на информацията",
      },
      {
        en: "Network design, configuration and administration",
        bg: "Проектиране, конфигуриране и администриране на мрежи",
      },
      {
        en: "Protection of critical infrastructures and cyber defence basics",
        bg: "Защита на критичната инфраструктура и основи на киберотбраната",
      },
    ],
    careers: {
      en: "Graduates are prepared for roles as network engineers, security analysts and telecommunications specialists in operators, integrators and security teams.",
      bg: "Выпускниците се подготвят за роли на мрежови инженери, анализатори по сигурност и специалисти по телекомуникации в оператори, интегратори и екипи за сигурност.",
    },
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
    degree: {
      en: "Master of Science in Engineering",
      bg: "Магистър — инженерен степен",
    },
    form: {
      en: "Full-time and part-time",
      bg: "Редовна и задочна форма на обучение",
    },
    faculty: {
      en: "Faculty of Electrical Engineering and Electronics — Department of Computer Systems and Technologies",
      bg: "Факултет по електротехника и електроника — катедра „Компютърни системи и технологии“",
    },
    highlights: [
      {
        en: "Advanced software architecture and design patterns",
        bg: "Надградена софтуерна архитектура и шаблони за проектиране",
      },
      {
        en: "Cloud services, containers and DevOps practices",
        bg: "Облачни услуги, контейнери и DevOps практики",
      },
      {
        en: "Distributed systems and microservice architectures",
        bg: "Разпределени системи и микросервизни архитектури",
      },
      {
        en: "Intelligent applications and applied machine learning",
        bg: "Интелигентни приложения и приложимо машинно обучение",
      },
    ],
    careers: {
      en: "The programme targets future software architects, cloud engineers and technical leads who design complex modern systems.",
      bg: "Програмата цели подготовка на софтуерни архитекти, облачни инженери и технически ръководители, които проектират сложни съвременни системи.",
    },
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
    degree: {
      en: "Master of Science in Engineering",
      bg: "Магистър — инженерен степен",
    },
    form: {
      en: "Full-time and part-time",
      bg: "Редовна и задочна форма на обучение",
    },
    faculty: {
      en: "Faculty of Electrical Engineering and Electronics — Department of Computer Systems and Technologies",
      bg: "Факултет по електротехника и електроника — катедра „Компютърни системи и технологии“",
    },
    highlights: [
      {
        en: "Design of large-scale enterprise and campus networks",
        bg: "Проектиране на мащабни корпоративни и кампусни мрежи",
      },
      {
        en: "Ethical hacking and penetration testing methodology",
        bg: "Етичен хакинг и методология на тестове за проникване",
      },
      {
        en: "Firewalls, intrusion detection and security management",
        bg: "Защитни стени, откриване на нашествия и управление на сигурността",
      },
      {
        en: "Security standards, audit and regulatory compliance",
        bg: "Стандарти за сигурност, одит и нормативна съответствие",
      },
    ],
    careers: {
      en: "Graduates pursue careers as security architects, penetration testers and network operations managers.",
      bg: "Выпускниците развиват кариера като архитекти по сигурност, специалисти по тестове за проникване и мениджъри на мрежови операции.",
    },
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
    degree: {
      en: "Doctor of Philosophy (PhD)",
      bg: "Доктор (PhD)",
    },
    form: {
      en: "Full-time and self-supported",
      bg: "Редовна и самостоятелна форма",
    },
    faculty: {
      en: "Faculty of Electrical Engineering and Electronics — Department of Computer Systems and Technologies",
      bg: "Факултет по електротехника и електроника — катедра „Компютърни системи и технологии“",
    },
    highlights: [
      {
        en: "Individual study plan agreed with a scientific supervisor",
        bg: "Индивидуален учебен план, съгласуван с научен ръководител",
      },
      {
        en: "Research methodology and scientific publishing practice",
        bg: "Методология на изследването и практика на научното публикуване",
      },
      {
        en: "Participation in research projects and conferences",
        bg: "Участие в научни проекти и конференции",
      },
      {
        en: "Teaching practice and public defence of a dissertation",
        bg: "Преподавателска практика и публична защита на дисертация",
      },
    ],
    careers: {
      en: "Doctoral graduates build academic and research careers at universities, institutes and R&D departments of technology companies.",
      bg: "Докторантите изграждат академична и изследователска кариера в университети, институти и R&D отдели на технологични компании.",
    },
  },
];
