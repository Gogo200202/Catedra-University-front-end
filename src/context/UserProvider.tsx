import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext.ts";
import type { User } from "./UserContext.ts";
import { DEFAULT_PHOTO_URL } from "./UserContext.ts";
import { loginProfessor, loginUser, fetchCurrentUser } from "../api/authApi.ts";
import type { AuthResponse } from "../api/authApi.ts";

const FIELD_PREFIX = "cst.user.";
const USER_FIELDS = ["id", "name", "email", "facultyNumber", "professorId", "photoUrl", "role", "jwt"] as const;

function loadStoredUser(): User | null {
  try {
    const id = localStorage.getItem(`${FIELD_PREFIX}id`);
    const jwt = localStorage.getItem(`${FIELD_PREFIX}jwt`);
    if (!id || !jwt) return null;
    const email = localStorage.getItem(`${FIELD_PREFIX}email`);
    const facultyNumber = localStorage.getItem(`${FIELD_PREFIX}facultyNumber`);
    const rawRole = localStorage.getItem(`${FIELD_PREFIX}role`);
    return {
      id,
      name: localStorage.getItem(`${FIELD_PREFIX}name`) ?? email?.split("@")[0] ?? facultyNumber ?? id,
      email,
      facultyNumber,
      professorId: localStorage.getItem(`${FIELD_PREFIX}professorId`),
      photoUrl: localStorage.getItem(`${FIELD_PREFIX}photoUrl`) ?? DEFAULT_PHOTO_URL,
      role: rawRole === "admin" || rawRole === "teacher" || rawRole === "student" ? rawRole : "student",
      jwt,
    };
  } catch {
    return null;
  }
}

function toUser(res: AuthResponse): User {
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    facultyNumber: res.facultyNumber ?? null,
    professorId: res.professorId ?? null,
    photoUrl: res.photoUrl ?? DEFAULT_PHOTO_URL,
    role: res.role,
    jwt: res.jwt,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser);

  useEffect(() => {
    const jwt = user?.jwt;
    if (!jwt || jwt === "local-admin") return;
    let cancelled = false;
    fetchCurrentUser(jwt)
      .then((res) => {
        if (!cancelled) setUser(toUser(res));
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(`${FIELD_PREFIX}id`, user.id);
        localStorage.setItem(`${FIELD_PREFIX}name`, user.name);
        localStorage.setItem(`${FIELD_PREFIX}role`, user.role);
        localStorage.setItem(`${FIELD_PREFIX}jwt`, user.jwt);
        for (const field of ["email", "facultyNumber", "professorId", "photoUrl"] as const) {
          const value = field === "photoUrl" && user.photoUrl === DEFAULT_PHOTO_URL ? null : user[field];
          if (value) localStorage.setItem(`${FIELD_PREFIX}${field}`, value);
          else localStorage.removeItem(`${FIELD_PREFIX}${field}`);
        }
      } else {
        USER_FIELDS.forEach((field) => localStorage.removeItem(`${FIELD_PREFIX}${field}`));
      }
    } catch {
      /* storage unavailable */
    }
  }, [user]);

  const login = useCallback(async (identifier: string, password: string, role: User["role"]) => {
    try {
      const res = role === "teacher"
        ? await loginProfessor(identifier, password)
        : await loginUser(identifier, password, role);
      if (res.role !== role) throw new Error("The selected account role does not match the authenticated account");
      setUser(toUser(res));
    } catch (error) {
      if (role !== "admin" || identifier !== "admin" || password !== "admin") throw error;
      // Temporary local admin session until the backend exposes role-aware admin login.
      setUser({
        id: "local-admin",
        name: "admin",
        email: null,
        facultyNumber: null,
        professorId: null,
        photoUrl: DEFAULT_PHOTO_URL,
        role: "admin",
        jwt: "local-admin",
      });
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((current) => (current ? { ...current, ...updates } : current));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      USER_FIELDS.forEach((field) => localStorage.removeItem(`${FIELD_PREFIX}${field}`));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(() => ({ user, login, updateUser, logout }), [user, login, updateUser, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
