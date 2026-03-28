// hooks/useDeleteArticle.ts
import { useState } from 'react';
import { articleService } from '@/services/articleService';
import type { Article } from '@/types/article';

export const useDeleteArticle = (onSuccess: () => void | Promise<void>) => {
    const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
    const [loading, setLoading] = useState(false);

    const confirmDelete = async () => {
        if (!articleToDelete) return;
        setLoading(true);
        try {
            await articleService.delete(articleToDelete.id);
            setArticleToDelete(null);
            await onSuccess();
        } catch {
            console.error('Erreur lors de la suppression');
        } finally {
            setLoading(false);
        }
    };

    return {
        articleToDelete,
        setArticleToDelete,
        confirmDelete,
        loading,
    };
};
