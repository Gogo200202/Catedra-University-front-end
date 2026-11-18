import type { TranslationKey } from "../i18n/translations.ts";

export interface TeacherSummary {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  academicPosition: "professor" | "assocProfessor" | "chiefAssistant" | "assistant";
  researchInterests: string[];
  officeRoom: string;
  email: string;
  administrativeFunction?: TranslationKey | null;
}

const fullName = (
  firstName: string,
  middleName: string,
  lastName: string,
): string => [firstName, middleName, lastName].filter(Boolean).join(" ");

export const teacherDisplayName = (teacher: TeacherSummary): string =>
  fullName(teacher.firstName, teacher.middleName, teacher.lastName);

export const teachers: TeacherSummary[] = [
  {
    id: 1,
    firstName: "Росен",
    middleName: "Петров",
    lastName: "Иванов",
    academicPosition: "professor",
    researchInterests: ["Artificial Intelligence", "Machine Learning", "Big Data"],
    officeRoom: "1127-А",
    email: "r_ivanov@tugab.bg",
    administrativeFunction: "aboutUs.headOfDept",
  },
  {
    id: 2,
    firstName: "Стефан",
    middleName: "Иванов",
    lastName: "Стойнов",
    academicPosition: "assocProfessor",
    researchInterests: ["Computer Networks", "Cybersecurity", "IoT"],
    officeRoom: "2110",
    email: "s_stoynov@tugab.bg",
  },
  {
    id: 3,
    firstName: "Мария",
    middleName: "Георгиева",
    lastName: "Димитрова",
    academicPosition: "assocProfessor",
    researchInterests: ["Software Engineering", "Databases", "Cloud Computing"],
    officeRoom: "1205",
    email: "m_dimitrova@tugab.bg",
  },
  {
    id: 4,
    firstName: "Иван",
    middleName: "Николаев",
    lastName: "Петков",
    academicPosition: "chiefAssistant",
    researchInterests: ["Embedded Systems", "Microcontrollers", "Robotics"],
    officeRoom: "1302",
    email: "i_petkov@tugab.bg",
  },
  {
    id: 5,
    firstName: "Елена",
    middleName: "Тодорова",
    lastName: "Георгиева",
    academicPosition: "chiefAssistant",
    researchInterests: ["Web Development", "Human-Computer Interaction"],
    officeRoom: "1310",
    email: "e_georgieva@tugab.bg",
  },
  {
    id: 6,
    firstName: "Николай",
    middleName: "Димитров",
    lastName: "Колев",
    academicPosition: "assistant",
    researchInterests: ["Programming Languages", "Compilers"],
    officeRoom: "1408",
    email: "n_kolev@tugab.bg",
  },
  {
    id: 7,
    firstName: "Виктория",
    middleName: "Славова",
    lastName: "Пенева",
    academicPosition: "assistant",
    researchInterests: ["Data Science", "Statistical Analysis"],
    officeRoom: "1412",
    email: "v_peneva@tugab.bg",
  },
];
