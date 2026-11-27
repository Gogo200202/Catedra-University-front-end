import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export interface EducationSemester {
  classes: string[];
}

export type EducationStudy = Record<string, EducationSemester>;

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

export async function fetchEducation(): Promise<EducationDocument> {
  const { data } = await api.get<EducationDocument>("/education");
  return data;
}
