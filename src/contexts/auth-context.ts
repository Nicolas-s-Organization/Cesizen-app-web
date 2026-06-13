import { createContext } from 'react';
import type { AuthContextType } from '../types/auth';

// Le contexte est isolé du composant AuthProvider pour respecter
// react-refresh/only-export-components (un fichier = des composants uniquement).
export const AuthContext = createContext<AuthContextType | null>(null);
