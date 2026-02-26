import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Try to get language from localStorage or default to 'en'
        return localStorage.getItem("preferredLanguage") || "en";
    });

    useEffect(() => {
        localStorage.setItem("preferredLanguage", language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "tr" : "en"));
    };

    /**
     * Translation helper
     * Usage: t('navbar.home')
     */
    const t = (path) => {
        const keys = path.split(".");
        let result = translations[language];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path; // Return path if key not found
            }
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
