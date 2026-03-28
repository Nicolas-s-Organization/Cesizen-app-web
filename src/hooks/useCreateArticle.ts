// hooks/useCreateArticle.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { createArticleFormSchema, type CreateArticleFormInput } from '@/schemas/articleSchema';
import { articleService } from '@/services/articleService';
import type { ArticleStatus } from '@/types/article';
import { useCategory } from './useCategory';

const initialForm: CreateArticleFormInput = {
    title: '',
    content: '',
    categoryId: '',
};

export function useCreateArticle() {
    const navigate = useNavigate();
    const { categories } = useCategory();
    const [formData, setFormData] = useState<CreateArticleFormInput>(initialForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState<ArticleStatus>('DRAFT');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [globalError, setGlobalError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (categories.length > 0 && !formData.categoryId) {
            setFormData(prev => ({ ...prev, categoryId: String(categories[0].id) }));
        }
    }, [categories]);


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
            setImagePreview(null);
        }
    };

    const handleImageRemove = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSubmit = async () => {

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
            const article = await articleService.create({ ...result.data, status });
            if (imageFile) {
                await articleService.uploadImage(article.id, imageFile);
            }
            navigate('/articles');
        } catch (e: any) {
            setGlobalError(e?.response?.data?.message || "Erreur lors de la création");
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
        categories
    };
}
