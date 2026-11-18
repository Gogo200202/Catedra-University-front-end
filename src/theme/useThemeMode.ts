import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.ts";

export function useThemeMode() {
  return useContext(ThemeContext);
}
