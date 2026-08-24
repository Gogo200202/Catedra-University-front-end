import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext.ts";
import type { User } from "./UserContext.ts";

const STORAGE_KEY = "cst.user";

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadStoredUser);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* storage unavailable */
    }
  }, [user]);

  const login = useCallback((email: string) => {
    setUser({
      name: email.split("@")[0],
      email,
      photoUrl: null,
      role: "student",
    });
  }, []);

  const register = useCallback((name: string, email: string) => {
    setUser({ name, email, photoUrl: null, role: "student" });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((current) => (current ? { ...current, ...updates } : current));
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, login, register, updateUser, logout }),
    [user, login, register, updateUser, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
