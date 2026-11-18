import { useContext } from "react";
import { UserContext } from "./UserContext.ts";
import type { UserContextValue } from "./UserContext.ts";

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
