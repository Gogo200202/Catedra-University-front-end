import { createContext } from "react";
import type { Dictionary, Lang, TranslationKey } from "./translations.ts";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => undefined,
  t: (key: TranslationKey) => key as string,
});

export type { Dictionary, Lang, TranslationKey };
