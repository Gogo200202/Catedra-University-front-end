import axios from "axios";
import type { User } from "../context/UserContext.ts";

const api = axios.create({
  baseURL: "/api",
});

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
  role: User["role"];
  jwt: string;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return data;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
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
