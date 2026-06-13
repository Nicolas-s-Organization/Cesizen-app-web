import { useState, useEffect } from 'react';
import { articleService } from '@/services/articleService';
import type { Article, ArticleFiltersType, PaginatedArticles } from '@/types/article';

export const useArticles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [meta, setMeta] = useState<PaginatedArticles['meta'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFiltersState] = useState<ArticleFiltersType>({ page: 1, limit: 10 });
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const setFilters = (updater: ArticleFiltersType | ((prev: ArticleFiltersType) => ArticleFiltersType)) => {
        setFiltersState(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            const { page: _p1, ...prevRest } = prev;
            const { page: _p2, ...nextRest } = next;
            if (JSON.stringify(prevRest) !== JSON.stringify(nextRest)) {
                return { ...next, page: 1 };
            }
            return next;
        });
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search || '');
        }, 400);
        return () => clearTimeout(timer);
    }, [filters.search]);

    const fetchArticles = async (query: ArticleFiltersType) => {
        setLoading(true);
        try {
            const result = await articleService.getAll(query);
            setArticles(result.data);
            setMeta(result.meta);
        } catch {
            setError('Erreur lors du chargement des articles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles({ ...filters, search: debouncedSearch });
    }, [debouncedSearch, filters.categoryId, filters.status, filters.page]);

    // const deleteArticle = async (id: string) => {
    //     try {
    //         await articleService.delete(id);
    //         setArticles(prev => prev.filter(a => a.id !== id));
    //     } catch {
    //         setError('Erreur lors de la suppression');
    //     }
    // };

    const refetch = () => fetchArticles(filters);

    return { articles, meta, loading, error, filters, setFilters, refetch };
};
