import axios from "axios";
import type { UserRole } from "../context/UserContext.ts";

const api = axios.create({
  baseURL: "/api",
});

export interface AuthResponse {
  id: string;
  name: string;
  email: string | null;
  facultyNumber?: string | null;
  professorId?: string | null;
  photoUrl: string | null;
  role: UserRole;
  jwt: string;
}

export interface CreateAccountPayload {
  name: string;
  password: string;
  role: Extract<UserRole, "student" | "teacher">;
  email?: string;
  facultyNumber?: string;
  professorId?: string;
}

export interface CreatedAccount {
  id: string;
  name: string;
  email: string | null;
  facultyNumber: string | null;
  professorId: string | null;
  photoUrl: string | null;
  role: UserRole;
}

export async function loginUser(identifier: string, password: string, role: UserRole): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", { identifier, email: identifier, password, role });
  return data;
}

export async function loginProfessor(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/professors/auth", { email, password });
  return data;
}

export async function createAccount(token: string, payload: CreateAccountPayload): Promise<CreatedAccount> {
  const { data } = await api.post<CreatedAccount>("/auth/admin/accounts", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function fetchCurrentUser(token: string): Promise<AuthResponse> {
  const { data } = await api.get<AuthResponse>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export interface UpdateMePayload {
  name?: string;
  email?: string;
  photoUrl?: string;
  password?: string;
}

export async function updateCurrentUser(
  token: string,
  payload: UpdateMePayload,
): Promise<AuthResponse> {
  const { data } = await api.put<AuthResponse>("/auth/me", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
