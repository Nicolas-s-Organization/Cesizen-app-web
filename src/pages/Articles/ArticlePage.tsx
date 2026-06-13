// pages/ArticlesPage.tsx
import { useArticles } from '@/hooks/useArticle';
import { useCategory } from '@/hooks/useCategory';
import { Plus } from 'lucide-react';
import ArticleFilters from '@/components/articles/ArticleFilters';
import ArticleTable from '@/components/articles/ArticleTable';
import Pagination from '@/components/common/Pagination';
import { useNavigate } from 'react-router';
import { useDeleteArticle } from '@/hooks/useDeleteArticle';
import DeleteArticleModal from '@/components/articles/DeleteArticleModal';




const ArticlesPage = () => {
  const { categories } = useCategory()
  const { articles, meta, loading, error, filters, setFilters, refetch } = useArticles();
  const { articleToDelete, setArticleToDelete, confirmDelete, loading: deleteLoading } = useDeleteArticle(refetch);
  const navigate = useNavigate();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
          <p className="text-sm text-gray-500 mt-1">Créez et gérez les contenus informatifs de la plateforme</p>
        </div>
        <button
          onClick={() => navigate('/articles/create')}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus size={18} />
          Nouvel article
        </button>
      </div>

      {/* Filters */}
      <ArticleFilters
        filters={filters}
        onChange={setFilters}
        categories={categories}
      />
      {/* Table */}

      {loading ? (
        <div className="text-center py-10 text-sm text-gray-400">Chargement...</div>
      ) : (
        <ArticleTable
          articles={articles}
          onEdit={(article) => navigate(`/articles/${article.id}/edit`)}
          onDelete={(article) => setArticleToDelete(article)}
        />
      )}
      {meta && (
        <div className="flex justify-center pt-2">
          <Pagination
            meta={meta}
            currentPage={filters.page || 1}
            onPageChange={(page) => setFilters(f => ({ ...f, page }))}
          />
        </div>
      )}

      <DeleteArticleModal
        isOpen={!!articleToDelete}
        articleTitle={articleToDelete?.title ?? ''}
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onClose={() => setArticleToDelete(null)}
      />
    </div>
  );
};

export default ArticlesPage;
