import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
        sessionStorage.getItem("isAdminLoggedIn") === "true"
    );

    const login = () => {
        sessionStorage.setItem("isAdminLoggedIn", "true");
        setIsAdminLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem("isAdminLoggedIn");
        setIsAdminLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
