import type { Article, ArticleFiltersType, PaginatedArticles } from '@/types/article';
import type { CreateArticleInput, UpdateArticleInput } from '@/schemas/articleSchema';
import api from './api';

export const articleService = {

    async getAll(filters?: ArticleFiltersType): Promise<PaginatedArticles> {
        const response = await api.get('/articles', { params: filters });
        return response.data;
    },

    async getById(id: string): Promise<Article> {
        const response = await api.get(`/articles/${id}`);
        return response.data;
    },

    async create(data: CreateArticleInput): Promise<Article> {
        const response = await api.post('/articles', data);
        return response.data;
    },

    async update(id: string, data: UpdateArticleInput): Promise<Article> {
        const response = await api.put(`/articles/${id}`, data);
        return response.data;
    },

    async uploadImage(id: string, file: File): Promise<Article> {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.patch(`/articles/${id}/image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/articles/${id}`);
    },

};
