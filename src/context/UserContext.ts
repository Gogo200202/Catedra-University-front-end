import { createContext } from "react";

export type UserRole = "admin" | "teacher" | "student";

export interface User {
  name: string;
  email: string;
  photoUrl: string | null;
  role: UserRole;
}

export interface UserContextValue {
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);
