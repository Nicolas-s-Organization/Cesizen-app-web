import api from './api';
import type { User , LoginResponse} from '../types/auth';
import type { LoginInput } from '../schemas/authSchema';

export const authService = {
    async login(payload: LoginInput): Promise<User> {
        const { data } = await api.post<LoginResponse>('/auth/login', {
            ...payload,
            client: 'web',
        });
        localStorage.setItem('accessToken', data.accessToken);
        // refreshToken cookie → géré automatiquement par le navigateur
        return data.user;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } catch {
            // échec ignoré : le token est purgé dans le finally
        }
        finally {
            localStorage.removeItem('accessToken');
        }
    },

    async me(): Promise<User> {
        const { data } = await api.get('/auth/me');
        return data;
    },
};
