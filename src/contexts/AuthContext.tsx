// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import type { User, AuthContextType } from '../types/auth';
import type { LoginInput } from '../schemas/authSchema';


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Au refresh de la page → on vérifie si la session est encore valide
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authService.me();
                setUser(user);
            } catch (_) {
                // Token absent ou invalide → pas connecté
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (payload: LoginInput) => {
        console.log("Entrée login");
        const user = await authService.login(payload);
        setUser(user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


