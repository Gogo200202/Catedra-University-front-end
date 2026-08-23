export type Lang = "en" | "bg";

const en = {
  "header.university": "Technical University – Gabrovo",
  "header.department": "Department of Computer Systems and Technologies",
  "header.search": "Search",

  "nav.home": "Home",
  "nav.aboutUs": "About Us",
  "nav.teachers": "Teachers",
  "nav.education": "Education",
  "nav.research": "Research",
  "nav.news": "News",
  "nav.contacts": "Contacts",

  "aboutUs.department": "The Department",
  "aboutUs.headOfDept": "Head of Department",
  "aboutUs.accreditation": "Accreditation",
  "aboutUs.history": "History",

  "education.curricula": "Curricula",
  "education.schedules": "Schedules",
  "education.bachelor": "Bachelor Programmes",
  "education.master": "Master Programmes",
  "education.doctoral": "Doctoral Programmes",

  "research.publications": "Publications",
  "research.projects": "Research Projects",
  "research.funding": "Funded by",
  "research.selectedPublications": "Selected Publications",

  "slide1.title": "Welcome to the Department of Computer Systems and Technologies",
  "slide1.subtitle":
    "A leading academic unit with a long-standing tradition in engineering education and research.",
  "slide1.cta": "Learn more",
  "slide2.title": "Bachelor's and Master's Programmes",
  "slide2.subtitle":
    "Get acquainted with our degree programmes, curricula and admission requirements.",
  "slide2.cta": "See all programmes",
  "slide3.title": "International Scientific Conference UNITECH",
  "slide3.subtitle":
    "Join researchers and industry professionals from Bulgaria and abroad.",
  "slide3.cta": "Participate",

  "systems.title": "University Systems",
  "systems.umis": "University Information System",
  "systems.epublishing": "E-Publishing",
  "systems.journal": "Journal of TU – Gabrovo",
  "systems.career": "Career Centre",

  "programmes.overline": "Study with us",
  "programmes.title": "Degree Programmes",
  "programmes.subtitle":
    "Modern engineering education consistent with the current labour market requirements.",
  "programmes.bachelor.desc":
    "Four-year degree courses in software, computer systems and technologies.",
  "programmes.master.desc":
    "Specialized postgraduate training in modern IT and engineering fields.",
  "programmes.doctoral.desc":
    "Doctoral studies in scientific majors of the technical sciences.",
  "programmes.viewMore": "View programmes",

  "welcome.overline": "About the department",
  "welcome.title":
    "A modern European centre for engineering education and science",
  "welcome.p1":
    "The Department of Computer Systems and Technologies trains qualified specialists in the field of computer engineering, software and information technologies. The curricula are consistent with the current labour market conditions and the requirements of the business for highly qualified engineers.",
  "welcome.p2":
    "The scientific achievements of the academic staff, active participation in national and international research projects and cooperation with the industry make the department a preferred place for study and development.",
  "welcome.readMore": "Read more",
  "welcome.headName": "Prof. Dr. Eng. Rosen Ivanov",
  "welcome.headRole": "Head of Department",
  "welcome.headQuote":
    "\u201cOur mission is to give every student solid engineering knowledge and the freedom to create the technologies of tomorrow.\u201d",

  "footer.aboutTitle": "About Us",
  "footer.aboutText":
    "The Department of Computer Systems and Technologies is an accredited academic unit of the Technical University of Gabrovo, offering bachelor, master and doctoral degrees.",
  "footer.quickLinks": "Quick Links",
  "footer.contactTitle": "Contacts",
  "footer.address": "4 Hadzhi Dimitar Str., Gabrovo 5300, Bulgaria",
  "footer.rights": "All rights reserved.",

  "common.language": "Language",
  "common.backHome": "Back to home",

  "pages.aboutTitle": "About the Department",
  "pages.aboutSubtitle":
    "Tradition, quality and modern engineering education at TU — Gabrovo",
  "pages.teachersTitle": "Academic Staff",
  "pages.teachersSubtitle":
    "Teachers of the Department of Computer Systems and Technologies",
  "pages.educationTitle": "Education",
  "pages.educationSubtitle":
    "Bachelor, master and doctoral programmes of the department",
  "pages.researchTitle": "Research",
  "pages.researchSubtitle":
    "Scientific projects and publications of the academic staff",
  "pages.newsTitle": "News and Events",
  "pages.newsSubtitle":
    "Exam sessions, thesis defences, guest lectures and conferences",
  "pages.contactsTitle": "Contacts",
  "pages.contactsSubtitle": "How to reach the department",

  "about.overline": "Who we are",
  "about.universityText":
    "The Technical University of Gabrovo is an accredited public higher education institution founded in 1964. It is accredited by the National Evaluation and Accreditation Agency, as well as by IGIP and FEANI, and holds an ISO 9001 certified quality management system.",
  "about.accreditationTitle": "Accreditation and Quality",
  "about.historyTitle": "Department History",

  "positions.professor": "Professor",
  "positions.assocProfessor": "Assoc. Professor",
  "positions.chiefAssistant": "Chief Assistant",
  "positions.assistant": "Assistant",

  "teachers.searchPlaceholder": "Search by name or interest…",
  "teachers.filterAll": "All positions",
  "teachers.foundLabel": "teacher(s) found",

  "education.semestersLabel": "semesters",
  "education.curriculaTitle": "Curricula and schedules",
  "education.curriculaText":
    "Current curricula for all degree courses, weekly schedules and exam sessions are maintained in the department information system. Students can export their personal programme in PDF format.",

  "news.filterAll": "All",
  "news.categories.exams": "Exams",
  "news.categories.defences": "Defences",
  "news.categories.events": "Events",
  "news.categories.lectures": "Lectures",
  "news.categories.conference": "Conference",

  "contacts.hours": "Office hours",
  "contacts.hoursValue": "Monday – Friday, 08:30 – 17:00",
  "contacts.formTitle": "Ask a question",
  "contacts.formName": "Your name",
  "contacts.formEmail": "Your email",
  "contacts.formMessage": "Message",
  "contacts.formSend": "Send request",
  "contacts.formSuccess": "Thank you! Your message has been sent.",
  "contacts.mapPlaceholder": "4 Hadzhi Dimitar Str., Gabrovo",

  "notFound.title": "Page not found",
  "notFound.subtitle":
    "The page you are looking for does not exist or has been moved.",
};

export type Dictionary = typeof en;
export type TranslationKey = keyof Dictionary;

const bg: Dictionary = {
  "header.university": "Технически университет – Габрово",
  "header.department": "Катедра „Компютърни системи и технологии“",
  "header.search": "Търсене",

  "nav.home": "Начало",
  "nav.aboutUs": "За нас",
  "nav.teachers": "Преподаватели",
  "nav.education": "Обучение",
  "nav.research": "Наука",
  "nav.news": "Новини",
  "nav.contacts": "Контакти",

  "aboutUs.department": "Катедрата",
  "aboutUs.headOfDept": "Ръководител на катедрата",
  "aboutUs.accreditation": "Акредитация",
  "aboutUs.history": "История",

  "education.curricula": "Учебни планове",
  "education.schedules": "Графици",
  "education.bachelor": "Бакалавърски програми",
  "education.master": "Магистърски програми",
  "education.doctoral": "Докторски програми",

  "research.publications": "Публикации",
  "research.projects": "Научни проекти",
  "research.funding": "Финансиран от",
  "research.selectedPublications": "Избрани публикации",

  "slide1.title":
    "Добре дошли в катедра „Компютърни системи и технологии“",
  "slide1.subtitle":
    "Водеща академична единица с дългогодишна традиция в инженерното образование и науката.",
  "slide1.cta": "Научете повече",
  "slide2.title": "Бакалавърски и магистърски програми",
  "slide2.subtitle":
    "Запознайте се с нашите образователни степени, учебни планове и условия за прием.",
  "slide2.cta": "Виж всички програми",
  "slide3.title": "Научна конференция ЮНИТЕХ",
  "slide3.subtitle":
    "Присъединете се към изследователи и специалисти от България и чужбина.",
  "slide3.cta": "Участвай",

  "systems.title": "Университетски системи",
  "systems.umis": "Университетска информационна система",
  "systems.epublishing": "Електронни издания",
  "systems.journal": "Списание на ТУ – Габрово",
  "systems.career": "Кариерен център",

  "programmes.overline": "Учи при нас",
  "programmes.title": "Образователни степени",
  "programmes.subtitle":
    "Модно инженерно образование, съобразено с изискванията на пазара на труда.",
  "programmes.bachelor.desc":
    "Четиригодишно обучение в областта на софтуера, компютърните системи и технологии.",
  "programmes.master.desc":
    "Специализирана надградена подготовка в съвременни ИТ и инженерни области.",
  "programmes.doctoral.desc":
    "Докторантури по научните специальности на техническите науки.",
  "programmes.viewMore": "Виж програмите",

  "welcome.overline": "За катедрата",
  "welcome.title":
    "Модерен европейски център за инженерно образование и наука",
  "welcome.p1":
    "Катедра „Компютърни системи и технологии“ обучава квалифицирани специалисти в областта на компютърното инженерство, софтуера и информационните технологии. Учебните планове са съобразени с актуалните условия на пазара на труда и изискванията на бизнеса към високо квалифицираните инженери.",
  "welcome.p2":
    "Научните постижения на академичния състав, активното участие в национални и международни проекти и сътрудничеството с индустрията правят катедрата предпочитано място за обучение и развитие.",
  "welcome.readMore": "Прочетете повече",
  "welcome.headName": "проф. д-р инж. Росен Иванов",
  "welcome.headRole": "Ръководител на катедрата",
  "welcome.headQuote":
    "„Нашата мисия е да дадем на всеки студент солидни инженерни знания и свобода да създава технологиите на утрешния ден.“",

  "footer.aboutTitle": "За нас",
  "footer.aboutText":
    "Катедра „Компютърни системи и технологии“ е акредитирана академична единица на Техническия университет в Габрово, предлагаща обучение по образователните степени бакалавър, магистър и доктор.",
  "footer.quickLinks": "Бързи връзки",
  "footer.contactTitle": "Контакти",
  "footer.address": "ул. „Хаджи Димитър“ № 4, Габрово 5300, България",
  "footer.rights": "Всички права запазени.",

  "common.language": "Език",
  "common.backHome": "Обратно към началото",

  "pages.aboutTitle": "За катедрата",
  "pages.aboutSubtitle":
    "Традиция, качество и модерно инженерно образование в ТУ – Габрово",
  "pages.teachersTitle": "Академичен състав",
  "pages.teachersSubtitle":
    "Преподаватели в катедра „Компютърни системи и технологии“",
  "pages.educationTitle": "Обучение",
  "pages.educationSubtitle":
    "Бакалавърски, магистърски и докторски програми на катедрата",
  "pages.researchTitle": "Научна дейност",
  "pages.researchSubtitle":
    "Научни проекти и публикации на академичния състав",
  "pages.newsTitle": "Новини и събития",
  "pages.newsSubtitle":
    "Изпитни сесии, защити, гостуващи лекции и конференции",
  "pages.contactsTitle": "Контакти",
  "pages.contactsSubtitle": "Как да се свържете с катедрата",

  "about.overline": "Кои сме ние",
  "about.universityText":
    "Техническият университет в Габрово е акредитирано държавно висше училище, основано през 1964 година. Акредитиран е от Националната агенция за оценяване и акредитация, както и от IGIP и FEANI, и поддържа сертифицирана по ISO 9001 система за управление на качеството.",
  "about.accreditationTitle": "Акредитация и качество",
  "about.historyTitle": "История на катедрата",

  "positions.professor": "Професор",
  "positions.assocProfessor": "Доцент",
  "positions.chiefAssistant": "Гл. асистент",
  "positions.assistant": "Асистент",

  "teachers.searchPlaceholder": "Търсене по име или интерес…",
  "teachers.filterAll": "Всички длъжности",
  "teachers.foundLabel": "намерени преподаватели",

  "education.semestersLabel": "семестъра",
  "education.curriculaTitle": "Учебни планове и графици",
  "education.curriculaText":
    "Актуалните учебни планове по всички специалности, седмичните графици и изпитните сесии се поддържат в информационната система на катедрата. Студентите могат да експортират личната си програма в PDF формат.",

  "news.filterAll": "Всички",
  "news.categories.exams": "Изпити",
  "news.categories.defences": "Защити",
  "news.categories.events": "Събития",
  "news.categories.lectures": "Лекции",
  "news.categories.conference": "Конференция",

  "contacts.hours": "Приемно време",
  "contacts.hoursValue": "Понеделник – Петък, 08:30 – 17:00",
  "contacts.formTitle": "Задайте въпрос",
  "contacts.formName": "Вашето име",
  "contacts.formEmail": "Вашият имейл",
  "contacts.formMessage": "Съобщение",
  "contacts.formSend": "Изпрати запитване",
  "contacts.formSuccess": "Благодарим! Вашето съобщение беше изпратено.",
  "contacts.mapPlaceholder": "ул. „Хаджи Димитър“ 4, Габрово",

  "notFound.title": "Страницата не е намерена",
  "notFound.subtitle":
    "Страницата, която търсите, не съществува или е била преместена.",
};

export const dictionaries: Record<Lang, Dictionary> = { en, bg };
