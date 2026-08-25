import type { Lang } from "../i18n/translations.ts";

export type SystemId = "umis" | "epublishing" | "journal" | "career";

export interface SystemFeature {
  text: Record<Lang, string>;
}

export interface SystemService {
  url: string;
  intro: Record<Lang, string>;
  features: SystemFeature[];
}

export const systemServices: Record<SystemId, SystemService> = {
  umis: {
    url: "http://umis.tugab.bg/",
    intro: {
      en: "The University Information System (UMIS) is the central electronic service of Technical University – Gabrovo. It maintains the academic records of every student — admission, enrolment, curricula, weekly schedules, exam sessions and diploma procedures.",
      bg: "Университетската информационна система (УИС) е централната електронна услуга на Техническия университет – Габрово. Тя поддържа академичното досие на всеки студент – кандидатстване, записване, учебни планове, седмични графици, изпитни сесии и дипломиране.",
    },
    features: [
      {
        text: {
          en: "Online application of prospective students",
          bg: "Онлайн кандидатстване на кандидат-студенти",
        },
      },
      {
        text: {
          en: "Electronic grade book and academic records",
          bg: "Електронна зачетна книжка и академично досие",
        },
      },
      {
        text: {
          en: "Curricula, weekly schedules and exam sessions",
          bg: "Учебни планове, седмични графици и изпитни сесии",
        },
      },
      {
        text: {
          en: "Online payment of tuition fees and services",
          bg: "Онлайн плащане на семестриални такси и услуги",
        },
      },
    ],
  },
  epublishing: {
    url: "https://epublish.tugab.bg/",
    intro: {
      en: "The E-Publishing platform is the electronic library of Technical University – Gabrovo. It currently hosts 576 electronic editions used by 964 registered users, including the complete run of the “Izvestia na TU – Gabrovo” collection, study materials and university documents in open access.",
      bg: "Платформата за електронни издания е електронната библиотека на Техническия университет – Габрово. В момента тя съдържа 576 електронни издания с 964 регистрирани потребители, включително пълната колекция „Известия на ТУ – Габрово“, учебни материали и университетски документи в отворен достъп.",
    },
    features: [
      {
        text: {
          en: "“Izvestia na TU – Gabrovo” collection — 75 volumes available online",
          bg: "Колекция „Известия на ТУ – Габрово“ — 75 тома с онлайн достъп",
        },
      },
      {
        text: {
          en: "576 electronic editions: textbooks, study materials and monographs",
          bg: "576 електронни издания: учебници, учебни материали и монографии",
        },
      },
      {
        text: {
          en: "Dedicated documents section for academic staff and authors",
          bg: "Специализирана секция с документи за академичния състав и авторите",
        },
      },
      {
        text: {
          en: "Support line: +359 66 827 224, dvasilev@tugab.bg",
          bg: "Линия за поддръжка: +359 66 827 224, dvasilev@tugab.bg",
        },
      },
    ],
  },
  journal: {
    url: "https://izvestia.tugab.bg/",
    intro: {
      en: "The Journal of the Technical University of Gabrovo provides an international forum for the presentation and discussion of the latest developments in mechanical and electrical engineering. The Journal is interdisciplinary and includes papers from scientists and engineers in mechanical engineering, materials science, mechanics, electronics and automation. Published by the Vasil Aprilov University Publishing House.",
      bg: "Списанието на Техническия университет – Габрово предоставя международна трибуна за представяне и обсъждане на най-новите постижения в машиностроенето и електротехниката. Изданието е интердисциплинарно и включва трудове на учени и инженери в областта на машиностроенето, науката за материалите, механиката, електрониката и автоматиката. Издава се от Университетското издателство „Васил Априлов“.",
    },
    features: [
      {
        text: {
          en: "International forum for mechanical and electrical engineering research",
          bg: "Международна трибуна за изследвания в машиностроенето и електротехниката",
        },
      },
      {
        text: {
          en: "ISSN 1310-6686 · eISSN 3033-1498 · Vasil Aprilov University Publishing House",
          bg: "ISSN 1310-6686 · eISSN 3033-1498 · Университетско издателство „Васил Априлов“",
        },
      },
      {
        text: {
          en: "Open archive: Vol 60 (2020) through Vol 72 (2026)",
          bg: "Отворен архив: от том 60 (2020) до том 72 (2026)",
        },
      },
      {
        text: {
          en: "Guide for authors, ethical guidelines and online submission via ManuscriptCentral",
          bg: "Наставления за авторите, етични правила и онлайн подаване чрез ManuscriptCentral",
        },
      },
    ],
  },
  career: {
    url: "https://career.tugab.bg/",
    intro: {
      en: "The University Career Centre is a mediator between students and business organisations. Founded in 2005 by decision of the Academic Council (Protocol No 1/04.10.2005) on the initiative of the USAID “Labour Market” project and Job Tiger, it publishes job and internship offers, company presentations, competitions and scholarships, together with practical advice on CVs, motivation letters and job interviews.",
      bg: "Университетският кариерен център е своеобразен посредник между студентите и бизнес организациите. Създаден през 2005 г. с Решение на Академичния съвет (Протокол № 1/04.10.2005) по инициатива на проекта „Пазар на труда“ на Агенцията за международно развитие на САЩ и Job Tiger, той публикува обяви за работа и стажантски програми, презентации на фирми, конкурси и стипендии, както и практична информация за автобиография, мотивационно писмо и интервю за работа.",
    },
    features: [
      {
        text: {
          en: "Job ads and internship programmes from Bulgarian and international companies",
          bg: "Обяви за работа и стажантски програми от български и международни фирми",
        },
      },
      {
        text: {
          en: "Company presentations and seminars held at TU – Gabrovo",
          bg: "Презентации и семинари на фирми, провеждани в ТУ – Габрово",
        },
      },
      {
        text: {
          en: "Guidance on application documents and interview preparation",
          bg: "Помощ при изготвяне на документи за кандидатстване и подготовка за интервю",
        },
      },
      {
        text: {
          en: "Mon–Fri 8:00–17:00 · +359 66 827 278 · career-centre@tugab.bg",
          bg: "Пон–Пет 8:00–17:00 · +359 66 827 278 · career-centre@tugab.bg",
        },
      },
    ],
  },
};
