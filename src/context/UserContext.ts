import { createContext } from "react";

export type UserRole = "admin" | "teacher" | "student";

export const DEFAULT_PHOTO_URL = "no photo implemented for now";

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
  role: UserRole;
  jwt: string;
}

export interface UserContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);
