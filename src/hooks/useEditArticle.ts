// hooks/useEditArticle.ts
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createArticleFormSchema, type CreateArticleFormInput } from '@/schemas/articleSchema';
import { articleService } from '@/services/articleService';
import type { ArticleStatus } from '@/types/article';
import { useCategory } from './useCategory';

export function useEditArticle() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { categories } = useCategory();
    const [formData, setFormData] = useState<CreateArticleFormInput>({ title: '', content: '', categoryId: '' });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState<ArticleStatus>('DRAFT');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [globalError, setGlobalError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImagePath, setExistingImagePath] = useState<string | null>(null);

    // Charger l'article existant
    useEffect(() => {
        if (!id) return;
        const fetchArticle = async () => {
            setFetching(true);
            try {
                const article = await articleService.getById(id);
                setFormData({
                    title: article.title,
                    content: article.content,
                    categoryId: article.category.id,
                });
                setStatus(article.status);
                if (article.imagePath) {
                    setExistingImagePath(article.imagePath);
                    setImagePreview(article.imagePath);
                }
            } catch {
                setGlobalError("Erreur lors du chargement de l'article");
            } finally {
                setFetching(false);
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (file: File | null) => {
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(existingImagePath);
        }
    };

    const handleImageRemove = () => {
        setImageFile(null);
        setImagePreview(null);
        setExistingImagePath(null);
    };

    const handleSubmit = async () => {
        if (!id) return;
        setErrors({});
        setGlobalError('');

        const result = createArticleFormSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                if (!fieldErrors[field]) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        try {
            await articleService.update(id, { ...result.data, status });
            if (imageFile) {
                await articleService.uploadImage(id, imageFile);
            }
            navigate('/articles');
        } catch (e: any) {
            setGlobalError(e?.response?.data?.message || "Erreur lors de la modification");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        imageFile,
        status,
        setStatus,
        handleChange,
        imagePreview,
        handleImageChange,
        handleImageRemove,
        handleSubmit,
        errors,
        globalError,
        loading,
        fetching,
        categories,
    };
}
