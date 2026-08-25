import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export interface LocalizedText {
  bg: string;
  en: string;
}

export interface NewsArticle {
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  authors: string[];
}

export interface NewsIssue {
  _id: string;
  newspaperName: LocalizedText;
  issueDate: string;
  articles: NewsArticle[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse {
  data: NewsIssue[];
  pagination: Pagination;
}

export async function fetchNewsIssues(page = 1, limit = 5): Promise<PaginatedResponse> {
  const { data } = await api.get<PaginatedResponse>("/news", {
    params: { page, limit },
  });
  return data;
}

export async function fetchNewsIssue(id: string): Promise<NewsIssue> {
  const { data } = await api.get<NewsIssue>(`/news/${id}`);
  return data;
}
