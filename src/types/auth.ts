import type { LoginInput } from '../schemas/authSchema'

export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    birthdate : string;
    descirption?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (payload: LoginInput) => Promise<void>;
    logout: () => Promise<void>;
}