import type { Lang } from "../i18n/translations.ts";

export interface ResearchProject {
  id: number;
  name: Record<Lang, string>;
  fundingOrganization: Record<Lang, string>;
  period: string;
  contractNumber?: string;
  description: Record<Lang, string>;
  content: Record<Lang, string[]>;
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
    content: {
      en: [
        "The Competence Center unites the four engineering faculties of Technical University of Gabrovo around a shared research infrastructure. The Department of Computer Systems and Technologies leads the laboratories for intelligent systems, embedded control and big data processing.",
        "Within the center, the department develops software platforms for predictive maintenance, machine vision quality inspection and energy consumption optimization for industrial partners from the Gabrovo region and beyond.",
        "The infrastructure is actively used in education: bachelor and master students complete laboratory exercises and diploma theses on the center's equipment, and doctoral students carry out their research work within its projects.",
      ],
      bg: [
        "Центърът за компетентност обединява четирите инженерни факултета на Технически университет – Габрово около споделена изследователска инфраструктура. Катедра „Компютърни системи и технологии“ ръководи лабораториите по интелигентни системи, вградено управление и обработка на големи данни.",
        "В рамките на центъра катедрата разработва софтуерни платформи за предиктивна поддръжка, машинно зрение за контрол на качеството и оптимизация на енергийното потребление за индустриални партньори от региона и отвъд него.",
        "Инфраструктурата се използва активно в обучението: бакалаври и магистри изпълняват лабораторни упражнения и дипломни работи на оборудването на центъра, а докторантите провеждат изследователската си работа в неговите проекти.",
      ],
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
    content: {
      en: [
        "UNITECH is the flagship international scientific conference of Technical University of Gabrovo, held every year since 2001. The department administers the sections on computer informatics, intelligent systems and cybersecurity.",
        "Each edition gathers contributions from universities and companies across Europe. All accepted papers pass a double-blind review and are published in proceedings indexed in international bibliographic databases.",
        "Members of the department serve on the programme committee and as reviewers. The conference also hosts a student section where the best diploma thesis presentations are awarded.",
      ],
      bg: [
        "ЮНИТЕХ е водещата международна научна конференция на Технически университет – Габрово, провеждана всяка година от 2001 г. Катедрата администрира секциите по компютърна информатика, интелигентни системи и киберсигурност.",
        "Всяко издание събира доклади от университети и компании из цяла Европа. Приетите статии преминават през двойно анонимно рецензиране и се публикуват в сборник, индексиран в международни библиографски бази данни.",
        "Членове на катедрата участват в програмния комитет и като рецензенти. Конференцията включва и студентска секция, в която се награждават най-добрите представления на дипломни работи.",
      ],
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
    content: {
      en: [
        "The project addresses the growing need for intelligent processing of massive sensor streams in cyber-physical systems: industrial automation, smart energy grids and intelligent transport.",
        "The research team develops adaptive models for anomaly detection and short-term forecasting that operate directly on the data stream, without the need to store the full history centrally.",
        "The planned outcomes include an open software toolkit, pilot deployments at two industrial partner sites and a series of joint publications with the project partners.",
      ],
      bg: [
        "Проектът отговаря на нарастващата нужда от интелигентна обработка на масивни потоци от сензорни данни в киберфизични системи: промишлена автоматизация, интелигентни енергийни мрежи и интелигентен транспорт.",
        "Изследователският екип разработва адаптивни модели за откриване на аномалии и краткосрочно прогнозиране, работещи директно върху потока от данни, без централно съхранение на пълната история.",
        "Планираните резултати включват отворен софтуерен комплект, пилотни внедрявания при двама индустриални партньори и поредица от съвместни публикации с партньорите по проекта.",
      ],
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
    content: {
      en: [
        "The Erasmus+ cooperation partnership brings together six universities from four European countries with the goal of modernizing engineering education through digital methodologies.",
        "The department contributes its experience with automated assessment in programming courses and leads the work package on shared digital laboratories, including remote access to embedded systems exercises.",
        "Project results — methodology guides, open courseware and a shared resource platform — will be freely available to all engineering faculties after the project completion in 2026.",
      ],
      bg: [
        "Партньорството по Еразъм+ обединява шест университета от четири европейски държави с цел модернизиране на инженерното образование чрез дигитални методологии.",
        "Катедрата допринася с опита си от автоматичното оценяване в курсовете по програмиране и ръководи работния пакет за споделени цифрови лаборатории, включително отдалечен достъп до упражнения със вградени системи.",
        "Резултатите от проекта — методически наръчници, отворени учебни материали и платформа за споделени ресурси — ще бъдат свободно достъпни за всички инженерни факултети след завършването на проекта през 2026 г.",
      ],
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
