import type { Category } from '@/types/category'
import api from './api'


const categoryService = {
    async getAll(): Promise<Category[]> {
        const response =  await api.get('/categories');
        return response.data;
    },

}

export default categoryService