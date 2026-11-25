import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export type ResearchLanguage = "bg" | "en";

export interface LocalizedResearchText {
  bg: string;
  en: string;
}

export interface LocalizedResearchParagraphs {
  bg: string[];
  en: string[];
}

export interface ResearchProject {
  _id: string;
  name: LocalizedResearchText;
  fundingOrganization: LocalizedResearchText;
  period: string;
  contractNumber: string;
  description: LocalizedResearchText;
  content: LocalizedResearchParagraphs;
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  _id: string;
  authors: string[];
  title: string;
  venue: string;
  year: number;
  content: LocalizedResearchParagraphs;
  publicationType?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  pdfFile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResearchResponse<T> {
  data: T[];
  pagination: ResearchPagination;
  years?: number[];
}

export type ResearchProjectPayload = Omit<ResearchProject, "_id" | "createdAt" | "updatedAt">;
export type PublicationPayload = Omit<Publication, "_id" | "createdAt" | "updatedAt">;

export interface ResearchListParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface PublicationListParams extends ResearchListParams {
  year?: number;
}

function authConfig(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function fetchResearchProjects(
  params: ResearchListParams = {},
): Promise<PaginatedResearchResponse<ResearchProject>> {
  const { data } = await api.get<PaginatedResearchResponse<ResearchProject>>("/research/projects", {
    params,
  });
  return data;
}

export async function fetchResearchProject(id: string): Promise<ResearchProject> {
  const { data } = await api.get<ResearchProject>(`/research/projects/${id}`);
  return data;
}

export async function createResearchProject(
  token: string,
  payload: ResearchProjectPayload,
): Promise<ResearchProject> {
  const { data } = await api.post<ResearchProject>("/research/projects", payload, authConfig(token));
  return data;
}

export async function updateResearchProject(
  token: string,
  id: string,
  payload: Partial<ResearchProjectPayload>,
): Promise<ResearchProject> {
  const { data } = await api.put<ResearchProject>(`/research/projects/${id}`, payload, authConfig(token));
  return data;
}

export async function deleteResearchProject(token: string, id: string): Promise<void> {
  await api.delete(`/research/projects/${id}`, authConfig(token));
}

export async function fetchPublications(
  params: PublicationListParams = {},
): Promise<PaginatedResearchResponse<Publication>> {
  const { data } = await api.get<PaginatedResearchResponse<Publication>>("/research/publications", {
    params,
  });
  return data;
}

export async function fetchPublication(id: string): Promise<Publication> {
  const { data } = await api.get<Publication>(`/research/publications/${id}`);
  return data;
}

export async function createPublication(
  token: string,
  payload: PublicationPayload,
): Promise<Publication> {
  const { data } = await api.post<Publication>("/research/publications", payload, authConfig(token));
  return data;
}

export async function updatePublication(
  token: string,
  id: string,
  payload: Partial<PublicationPayload>,
): Promise<Publication> {
  const { data } = await api.put<Publication>(`/research/publications/${id}`, payload, authConfig(token));
  return data;
}

export async function deletePublication(token: string, id: string): Promise<void> {
  await api.delete(`/research/publications/${id}`, authConfig(token));
}
