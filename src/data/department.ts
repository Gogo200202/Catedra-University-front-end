import type { Lang } from "../i18n/translations.ts";

export interface Milestone {
  year: string;
  text: Record<Lang, string>;
}

export const accreditationItems = [
  {
    title: "NEAA",
    description: {
      en: "Programme accreditation by the National Evaluation and Accreditation Agency",
      bg: "Програмна акредитация от Националната агенция за оценяване и акредитация",
    },
  },
  {
    title: "IGIP",
    description: {
      en: "International Society for Engineering Education — ing.PAED qualification",
      bg: "Международно общество за инженерно образование — квалификация ing.PAED",
    },
  },
  {
    title: "FEANI",
    description: {
      en: "European Federation of National Engineering Associations",
      bg: "Европейска федерация на националните инженерни асоциации",
    },
  },
  {
    title: "ISO 9001:2015",
    description: {
      en: "Certified quality management system of the university",
      bg: "Сертифицирана система за управление на качеството на университета",
    },
  },
];

export const historyMilestones: Milestone[] = [
  {
    year: "1964",
    text: {
      en: "Foundation of the higher technical school in Gabrovo — the predecessor of today's Technical University.",
      bg: "Основаване на висшето техническо училище в Габрово — предшественик на днешния Технически университет.",
    },
  },
  {
    year: "1970s",
    text: {
      en: "First computing courses introduced; computer laboratories equipped with the era's leading technology.",
      bg: "Въвеждане на първите курсове по изчислителна техника; оборудвани са компютърни лаборатории с водещите технологии на времето.",
    },
  },
  {
    year: "1995",
    text: {
      en: "Establishment of the Department of Computer Systems and Technologies as an independent academic unit.",
      bg: "Установяване на катедра „Компютърни системи и технологии“ като самостоятелна академична единица.",
    },
  },
  {
    year: "2000s",
    text: {
      en: "Launch of master and doctoral programmes; active participation in national and European research projects.",
      bg: "Откриване на магистърски и докторски програми; активно участие в национални и европейски научни проекти.",
    },
  },
  {
    year: "Today",
    text: {
      en: "Modern laboratories, international cooperation under Erasmus+ and hundreds of graduates working in Bulgaria and abroad.",
      bg: "Модерни лаборатории, международно сътрудничество по Еразъм+ и стотици завършили специалисти, работещи в България и чужбина.",
    },
  },
];
