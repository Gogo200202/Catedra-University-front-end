import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext.ts";
import type { User } from "./UserContext.ts";
import { DEFAULT_PHOTO_URL } from "./UserContext.ts";
import { loginUser, registerUser, fetchCurrentUser } from "../api/authApi.ts";

const FIELD_PREFIX = "cst.user.";
const USER_FIELDS = ["id", "name", "email", "photoUrl", "role", "jwt"] as const;

function loadStoredUser(): User | null {
  try {
    const id = localStorage.getItem(`${FIELD_PREFIX}id`);
    const email = localStorage.getItem(`${FIELD_PREFIX}email`);
    const jwt = localStorage.getItem(`${FIELD_PREFIX}jwt`);
    if (!id || !email || !jwt) return null;
    const rawRole = localStorage.getItem(`${FIELD_PREFIX}role`);
    return {
      id,
      name: localStorage.getItem(`${FIELD_PREFIX}name`) ?? email.split("@")[0],
      email,
      photoUrl: localStorage.getItem(`${FIELD_PREFIX}photoUrl`) ?? DEFAULT_PHOTO_URL,
      role:
        rawRole === "admin" || rawRole === "teacher" || rawRole === "student"
          ? rawRole
          : "student",
      jwt,
    };
  } catch {
    return null;
  }
}

function toUser(res: { id: string; name: string; email: string; photoUrl: string | null; role: User["role"]; jwt: string }): User {
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    photoUrl: res.photoUrl ?? DEFAULT_PHOTO_URL,
    role: res.role,
    jwt: res.jwt,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser);

  useEffect(() => {
    const jwt = user?.jwt;
    if (!jwt) return;
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
        localStorage.setItem(`${FIELD_PREFIX}email`, user.email);
        if (user.photoUrl && user.photoUrl !== DEFAULT_PHOTO_URL) {
          localStorage.setItem(`${FIELD_PREFIX}photoUrl`, user.photoUrl);
        } else {
          localStorage.removeItem(`${FIELD_PREFIX}photoUrl`);
        }
        localStorage.setItem(`${FIELD_PREFIX}role`, user.role);
        localStorage.setItem(`${FIELD_PREFIX}jwt`, user.jwt);
      } else {
        USER_FIELDS.forEach((field) =>
          localStorage.removeItem(`${FIELD_PREFIX}${field}`),
        );
      }
    } catch {
      /* storage unavailable */
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser(email, password);
    setUser(toUser(res));
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await registerUser(name, email, password);
    setUser(toUser(res));
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((current) => (current ? { ...current, ...updates } : current));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      USER_FIELDS.forEach((field) =>
        localStorage.removeItem(`${FIELD_PREFIX}${field}`),
      );
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(
    () => ({ user, login, register, updateUser, logout }),
    [user, login, register, updateUser, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
