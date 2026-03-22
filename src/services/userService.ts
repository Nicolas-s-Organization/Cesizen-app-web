import type { PaginatedUsers, UserFilters } from '@/types/user';
import type { User } from '../types/auth';
import api from './api'



export const userService = {

    async getAll(filters?: UserFilters): Promise<PaginatedUsers> {
        const response = await api.get('/users', { params: filters });
        return response.data; // { data: [], meta: {} }
    },

    async update(id: string, data: Partial<User>): Promise<User> {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    }

}
