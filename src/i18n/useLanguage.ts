import { useContext } from "react";
import { LanguageContext } from "./LanguageContext.ts";

export function useLanguage() {
  return useContext(LanguageContext);
}
