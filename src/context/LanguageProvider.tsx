import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { translations } from "../data/translations";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.tr;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio_lang");
    if (saved === "tr" || saved === "en") {
      return saved;
    }
    // Default to Turkish if browser language or default is TR, otherwise EN
    return navigator.language.startsWith("tr") ? "tr" : "tr"; 
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const t = translations[language];

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
