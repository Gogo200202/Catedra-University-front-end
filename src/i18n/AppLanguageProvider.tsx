import { useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext.ts";
import { dictionaries } from "./translations.ts";
import type { Lang } from "./translations.ts";

export function AppLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: keyof (typeof dictionaries)["en"]) => dictionaries[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
