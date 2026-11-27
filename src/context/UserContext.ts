import { createContext } from "react";

export type UserRole = "admin" | "teacher" | "student";

export const DEFAULT_PHOTO_URL = "no photo implemented for now";

export interface User {
  id: string;
  name: string;
  email: string | null;
  facultyNumber?: string | null;
  professorId?: string | null;
  photoUrl: string | null;
  role: UserRole;
  jwt: string;
}

export interface UserContextValue {
  user: User | null;
  login: (identifier: string, password: string, role: UserRole) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);
