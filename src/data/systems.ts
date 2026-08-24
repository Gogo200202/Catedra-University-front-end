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
    url: "http://epublish.tugab.bg/",
    intro: {
      en: "The E-Publishing platform hosts the electronic editions of Technical University – Gabrovo: textbooks, study materials, monographs and conference proceedings available in open access to students, academics and practitioners.",
      bg: "Платформата за електронни издания събира електронните публикации на Техническия университет – Габрово: учебници, учебни помагала, монографии и доклади от научни конференции с отворен достъп за студенти, преподаватели и специалисти.",
    },
    features: [
      {
        text: {
          en: "Textbooks and lecture courses",
          bg: "Учебници и лекционни курсове",
        },
      },
      {
        text: {
          en: "Monographs and habilitation works",
          bg: "Монографии и хабилитационни трудове",
        },
      },
      {
        text: {
          en: "UNITECH conference proceedings",
          bg: "Доклади от конференция ЮНИТЕХ",
        },
      },
      {
        text: {
          en: "Open access to all editions",
          bg: "Отворен достъп до всички издания",
        },
      },
    ],
  },
  journal: {
    url: "http://izvestia.tugab.bg/",
    intro: {
      en: "The Journal of the Technical University of Gabrovo is a peer-reviewed scientific journal publishing original research in engineering, technology, natural and social sciences. The journal appears quarterly and accepts manuscripts from Bulgaria and abroad.",
      bg: "Списанието на Техническия университет – Габрово е рецензирано научно издание, което публикува оригинални изследвания в областта на техниката, технологиите, природните и социалните науки. Списанието излиза четири пъти годишно и приема ръкописи от България и чужбина.",
    },
    features: [
      {
        text: {
          en: "Original peer-reviewed research articles",
          bg: "Оригинални рецензирани научни статии",
        },
      },
      {
        text: {
          en: "Quarterly scientific edition",
          bg: "Научно издание, излизащо четири пъти годишно",
        },
      },
      {
        text: {
          en: "Current and archived issues in PDF",
          bg: "Текущи и архивни броеве в PDF формат",
        },
      },
      {
        text: {
          en: "Submission guidelines for authors",
          bg: "Наставления за авторите при подаване на статии",
        },
      },
    ],
  },
  career: {
    url: "http://career.tugab.bg/",
    intro: {
      en: "The Career Centre supports students and graduates of Technical University – Gabrovo in their professional realisation: internships, job offers, company presentations and individual career consultations.",
      bg: "Кариерният център подпомага студентите и выпускниците на Техническия университет – Габрово в тяхната професионална реализация: стажове, обяви за работа, презентации на компании и индивидуални кариерни консултации.",
    },
    features: [
      {
        text: {
          en: "Job and internship offers from partner companies",
          bg: "Обяви за работа и стажове от партньорски компании",
        },
      },
      {
        text: {
          en: "Career consultations and CV guidance",
          bg: "Кариерни консултации и помощ при създаване на CV",
        },
      },
      {
        text: {
          en: "Company presentations and job fairs",
          bg: "Презентации на компании и панаири на кариерата",
        },
      },
      {
        text: {
          en: "Trainings, workshops and soft skills courses",
          bg: "Обучения, работилницы и курсове по меки умения",
        },
      },
    ],
  },
};
