// pages/EditArticlePage.tsx
import { Plus } from 'lucide-react';
import { useEditArticle } from '@/hooks/useEditArticle';
import ArticleContentForm from '@/components/articles/create/ArticleContentForm';
import ArticleImageUpload from '@/components/articles/create/ArticleImageUpload';
import ArticlePublicationSidebar from '@/components/articles/create/ArticlePublicationSidebar';
import ArticleCategorySelector from '@/components/articles/create/ArticleCategorySelector';

const EditArticlePage = () => {
    const {
        formData,
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
    } = useEditArticle();

    if (fetching) return <div className="p-8">Chargement de l'article...</div>;

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Modifier l'article</h1>
                    <p className="text-sm text-gray-500 mt-1">Modifiez les informations de l'article</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                    <Plus size={18} />
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
            </div>

            {globalError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {globalError}
                </div>
            )}

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <ArticleContentForm
                        title={formData.title}
                        content={formData.content}
                        onChange={handleChange}
                        errors={errors}
                    />
                    <ArticleImageUpload
                        imagePreview={imagePreview}
                        onImageChange={handleImageChange}
                        onImageRemove={handleImageRemove}
                    />
                </div>
                <div className="space-y-6">
                    <ArticlePublicationSidebar
                        status={status}
                        onStatusChange={setStatus}
                    />
                    <ArticleCategorySelector
                        categories={categories}
                        selectedCategoryId={formData.categoryId}
                        onChange={handleChange}
                        error={errors.categoryId}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditArticlePage;
