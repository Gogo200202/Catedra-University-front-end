import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext.ts";
import type { User } from "./UserContext.ts";
import { DEFAULT_PHOTO_URL } from "./UserContext.ts";

const FIELD_PREFIX = "cst.user.";
const USER_FIELDS = ["id", "name", "email", "photoUrl", "role"] as const;

function loadStoredUser(): User | null {
  try {
    const id = localStorage.getItem(`${FIELD_PREFIX}id`);
    const email = localStorage.getItem(`${FIELD_PREFIX}email`);
    if (!id || !email) return null;
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
    };
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(`${FIELD_PREFIX}id`, user.id);
        localStorage.setItem(`${FIELD_PREFIX}name`, user.name);
        localStorage.setItem(`${FIELD_PREFIX}email`, user.email);
        if (user.photoUrl) {
          localStorage.setItem(`${FIELD_PREFIX}photoUrl`, user.photoUrl);
        } else {
          localStorage.removeItem(`${FIELD_PREFIX}photoUrl`);
        }
        localStorage.setItem(`${FIELD_PREFIX}role`, user.role);
      } else {
        USER_FIELDS.forEach((field) =>
          localStorage.removeItem(`${FIELD_PREFIX}${field}`),
        );
      }
    } catch {
      /* storage unavailable */
    }
  }, [user]);

  const login = useCallback((email: string) => {
    setUser({
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      photoUrl: DEFAULT_PHOTO_URL,
      role: "student",
    });
  }, []);

  const register = useCallback((name: string, email: string) => {
    setUser({
      id: crypto.randomUUID(),
      name,
      email,
      photoUrl: DEFAULT_PHOTO_URL,
      role: "student",
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((current) => (current ? { ...current, ...updates } : current));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      sessionStorage.clear();
      localStorage.clear();
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
