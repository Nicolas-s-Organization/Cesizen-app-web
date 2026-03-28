import { Plus } from 'lucide-react';
import { useCreateArticle } from '@/hooks/useCreateArticle';
import ArticleContentForm from '@/components/articles/create/ArticleContentForm';
import ArticleImageUpload from '@/components/articles/create/ArticleImageUpload';
import ArticlePublicationSidebar from '@/components/articles/create/ArticlePublicationSidebar';
import ArticleCategorySelector from '@/components/articles/create/ArticleCategorySelector';

const CreateArticlePage = () => {
    const {
        formData,
        status,
        setStatus,
        handleChange,
        handleSubmit,
        imagePreview,
        handleImageChange,
        handleImageRemove,
        errors,
        globalError,
        loading,
        categories
    } = useCreateArticle();

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Créer un article</h1>
                    <p className="text-sm text-gray-500 mt-1">Rédigez un nouvel article pour la plateforme</p>
                </div>
                <button
                    onClick={() => handleSubmit()}
                    disabled={loading}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                    <Plus size={18} />
                    {loading ? 'Création...' : "Créer l'article"}
                </button>
            </div>

            {globalError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{globalError}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Colonne gauche */}
                <div className="lg:col-span-2 space-y-6">
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

                {/* Colonne droite */}
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

export default CreateArticlePage;
