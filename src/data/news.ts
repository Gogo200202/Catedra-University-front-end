import type { Lang } from "../i18n/translations.ts";

export type NewsCategory = "exams" | "defences" | "events" | "lectures" | "conference";

export interface NewsItem {
  id: number;
  date: string;
  category: NewsCategory;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  content: Record<Lang, string[]>;
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
    content: {
      en: [
        "The winter examination session for the academic year 2025/2026 starts on 9 February and continues until 1 March. The full schedule covers all disciplines taught by the department for bachelor, master and doctoral students.",
        "Students can check their personal examination times through the University Information System. Please verify your group, room and examiner before each exam, as individual sessions may be rescheduled only through your faculty supervisor.",
        "Students with outstanding semester assignments are reminded that these must be submitted before the corresponding exam. For questions about admission to examinations, contact the departmental office in building XI, room 1104.",
      ],
      bg: [
        "Зимният изпитен период за учебната 2025/2026 година започва на 9 февруари и продължава до 1 март. Пълната програма обхваща всички дисциплини, преподавани в катедрата за бакалаври, магистри и докторанти.",
        "Студентите могат да проверят личното си време за изпит през Университетската информационна система. Моля, проверявайте групата, залата и преподавателя преди всеки изпит, тъй като отделните заседания могат да бъдат преместени само чрез научния ви ръководител.",
        "Напомняме на студентите с незавършени семестрални задачи, че те трябва да бъдат предадени преди съответния изпит. За въпроси относно допускането до изпити се обръщайте към учебния отдел в корпус XI, стая 1104.",
      ],
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
    content: {
      en: [
        "The department invites all students and staff to a guest lecture on applied machine learning in industry, delivered by invited engineers from partner software companies.",
        "The speakers will present case studies of machine learning pipelines in production: demand forecasting, document processing and quality control in manufacturing. A Q&A block and an informal networking session follow the presentations.",
        "Participation is free, but students attending for credit in the Artificial Intelligence course must register through the University Information System no later than two days before the event.",
      ],
      bg: [
        "Катедрата кани всички студенти и преподаватели на гостуваща лекция върху приложимото машинно обучение в индустрията, изнесена от поканени инженери от партньорски софтуерни компании.",
        "Лекторите ще представят казуси от производството: прогнозиране на търсенето, обработка на документи и контрол на качеството в промишлеността. След презентациите следват въпроси и неформална среща с лекторите.",
        "Участието е свободно, но студентите, посещаващи за кредит по дисциплината „Изкуствен интелект“, трябва да се регистрират чрез Университетската информационна система не по-късно от два дни преди събитието.",
      ],
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
    content: {
      en: [
        "Prospective students and their families are welcome to visit the department during the university open doors day. The programme includes short presentations of every degree course we offer and guided tours of the teaching laboratories.",
        "Current students will demonstrate projects from the robotics, embedded systems and web development labs. Academic staff will be available for consultations about admission requirements, curricula and career prospects after graduation.",
        "The event takes place in building XI starting at 10:00. No prior registration is required.",
      ],
      bg: [
        "Кандидатстудентите и техните семейства са добре дошли в катедрата по време на Деня на отворените врати на университета. Програмата включва кратки презентации на всяка специалност и обиколка на учебните лаборатории.",
        "Настоящи студенти ще демонстрират проекти от лабораториите по роботика, вградени системи и уеб разработване. Преподавателите ще бъдат на разположение за консултации относно условията за приемане, учебните планове и кариерните перспективи след дипломирането.",
        "Събитието се провежда в корпус XI от 10:00 ч. Предварителна регистрация не е необходима.",
      ],
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
    content: {
      en: [
        "The June defence sessions for diploma theses will take place between 22 and 30 June in the departmental meeting room. The complete schedule with times, commissions and rooms is published in the University Information System.",
        "Graduating students must submit the final version of their thesis, the supervisor's evaluation and all accompanying documentation to the departmental office no later than two weeks before their defence date.",
        "Each defence includes a presentation of up to ten minutes followed by questions from the state examination commission. Defences are public — fellow students are welcome to attend.",
      ],
      bg: [
        "Юнските защиты на дипломни работи ще се проведат между 22 и 30 юни в заседателната зала на катедрата. Пълният график с часове, комисии и зали е публикуван в Университетската информационна система.",
        "Завършващите студенти трябва да предадат финалната версия на дипломната работа, рецензията на ръководителя и целия придружаващ пакет документи в учебния отдел не по-късно от две седмици преди датата на защитата.",
        "Всяка защита включва представяне до десет минуты, последвано от въпроси на държавната изпитна комисия. Защитите са публични — колегите имат право да присъстват.",
      ],
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
    content: {
      en: [
        "The annual student scientific session gives bachelor and master students the opportunity to present their research results in front of an academic audience. The best presentations receive awards from the department.",
        "Applications must be proposed by an academic supervisor and submitted by 25 April. Accepted papers are grouped into sections covering programming, computer architecture, communications and intelligent systems.",
        "Presentations are limited to twelve minutes with three minutes for discussion. Selected papers will be recommended for publication in the annual proceedings of the university.",
      ],
      bg: [
        "Годишната студентска научна сесия дава възможност на бакалаврите и магистрите да представят своите изследователски резултати пред академична аудитория. Най-добрите презентации получават награди от катедрата.",
        "Заявките се предлагат от научен ръководитель и се подават до 25 април. Приетите доклади се групират в секции по програмиране, компютърна архитектура, комуникации и интелигентни системи.",
        "Презентациите са ограничени до дванадесет минути с три минути за дискусия. Избраните доклади ще бъдат препоръчани за публикация в годишния сборник на университета.",
      ],
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
    content: {
      en: [
        "The International Scientific Conference UNITECH 2026 will be hosted by Technical University of Gabrovo in November. Researchers are invited to submit papers in all sections related to computer systems, communications and information technologies.",
        "Submissions undergo a double-blind peer review. Accepted papers are published in the conference proceedings with DOI indexing. The submission deadline and formatting requirements are available on the conference website.",
        "Members of the department traditionally form part of the programme committee. Doctoral students are especially encouraged to apply; participation can be recognized under the individual study plans of the doctoral programme.",
      ],
      bg: [
        "Международната научна конференция ЮНИТЕХ 2026 ще се проведе в Технически университет – Габрово през ноември. Изследователите се канят да представят доклади във всички секции, свързани с компютърните системи, комуникациите и информационните технологии.",
        "Докладите преминават през двойно анонимно рецензиране. Приетите статии се публикуват в сборника на конференцията с DOI индексиране. Краят срок за подаване и изискванията за оформление са налични на уебсайта на конференцията.",
        "Членове на катедрата традиционно участват в програмния комитет. Особено насърчаваме докторантите да кандидатстват; участието може да бъде признато в индивидуалните учебни планове на докторантската програма.",
      ],
    },
  },
];
