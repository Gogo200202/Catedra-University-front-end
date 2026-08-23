import type { Lang } from "../i18n/translations.ts";

export type NewsCategory = "exams" | "defences" | "events" | "lectures" | "conference";

export interface NewsItem {
  id: number;
  date: string;
  category: NewsCategory;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
}

export const news: NewsItem[] = [
  {
    id: 1,
    date: "2026-02-02",
    category: "exams",
    title: {
      en: "Winter examination session — schedule published",
      bg: "Зимен изпитен период — публикувана програма",
    },
    excerpt: {
      en: "The examination schedule for all bachelor and master courses in the department is now available in the University Information System.",
      bg: "Програмата на изпитите по всички бакалавърски и магистърски дисциплини в катедрата е вече налична в Университетската информационна система.",
    },
  },
  {
    id: 2,
    date: "2026-03-12",
    category: "lectures",
    title: {
      en: "Guest lecture: Applied Machine Learning in Industry",
      bg: "Гостуваща лекция: Приложимо машинно обучение в индустрията",
    },
    excerpt: {
      en: "Invited speakers from the software industry will present real-world applications of machine learning. Hall 1127, 14:00.",
      bg: "Поканени лектори от софтуерната индустрия ще представят приложенията на машинното обучение в практиката. Зала 1127, 14:00.",
    },
  },
  {
    id: 3,
    date: "2026-04-18",
    category: "events",
    title: {
      en: "Open doors day for prospective students",
      bg: "Ден на отворените врати за кандидатстудентите",
    },
    excerpt: {
      en: "Meet our teachers and students, tour the laboratories and learn more about admission to the Computer Systems and Technologies programmes.",
      bg: "Запознайте се с преподавателите и студентите ни, разгледайте лабораториите и научете повече за приема в специалностите на катедрата.",
    },
  },
  {
    id: 4,
    date: "2026-06-22",
    category: "defences",
    title: {
      en: "Diploma thesis defence sessions announced",
      bg: "Обявени са датите за защитите на дипломни работи",
    },
    excerpt: {
      en: "The defence schedule for graduating bachelor and master students is published. Students must submit their final documentation two weeks prior.",
      bg: "Графикът за защитите на дипломни работи на завършващите бакалаври и магистри е публикуван. Документите се предават две седмици преди защитата.",
    },
  },
  {
    id: 5,
    date: "2026-05-08",
    category: "events",
    title: {
      en: "Student scientific session 2026",
      bg: "Студентска научна сесия 2026",
    },
    excerpt: {
      en: "Annual session for student research papers. Applications are accepted by the academic supervisors until 25 April.",
      bg: "Годишна сесия за студентски научни доклади. Заявките се приемат от научните ръководители до 25 април.",
    },
  },
  {
    id: 6,
    date: "2026-11-05",
    category: "conference",
    title: {
      en: "UNITECH 2026 — call for papers",
      bg: "ЮНИТЕХ 2026 — покана за доклади",
    },
    excerpt: {
      en: "The International Scientific Conference UNITECH invites submissions in all sections of computer systems and technologies.",
      bg: "Международната научна конференция ЮНИТЕХ приема доклади по всички секции на компютърните системи и технологии.",
    },
  },
];
