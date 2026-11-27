import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export interface LocalizedEducationClass {
  en: string;
  bg: string;
}

export type EducationClass = LocalizedEducationClass | string;

export interface EducationSemester {
  classes: EducationClass[];
}

export interface EducationStudy {
  name?: {
    en?: string;
    bg?: string;
  };
  semesters?: Record<string, EducationSemester>;
  [key: string]: unknown;
}

export interface EducationDegree {
  degree?: Record<string, EducationStudy>;
}

export interface EducationDocument {
  _id?: string;
  Bachelor?: EducationDegree;
  Master?: EducationDegree;
  Doctorate?: EducationDegree;
  createdAt?: string;
  updatedAt?: string;
}

function isEducationSemester(value: unknown): value is EducationSemester {
  return typeof value === "object" && value !== null && "classes" in value && Array.isArray(value.classes);
}

export function getStudySemesters(study: EducationStudy | undefined): Record<string, EducationSemester> {
  if (!study) return {};
  if (study.semesters && typeof study.semesters === "object") return study.semesters;
  const entries: [string, EducationSemester][] = [];
  for (const [key, value] of Object.entries(study)) {
    if (isEducationSemester(value)) entries.push([key, value]);
  }
  return Object.fromEntries(entries);
}

export function getEducationStudyName(study: EducationStudy, fallbackName: string, lang: "bg" | "en"): string {
  return study.name?.[lang] || study.name?.en || study.name?.bg || fallbackName;
}

export function getEducationClassName(course: EducationClass, lang: "bg" | "en"): string {
  if (typeof course === "string") return course;
  return course[lang] || course.en || course.bg || "";
}

export async function fetchEducation(): Promise<EducationDocument> {
  const { data } = await api.get<EducationDocument>("/education");
  return data;
}
