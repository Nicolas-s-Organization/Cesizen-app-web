import type { Article } from '@/types/article';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
    articles: Article[];
    onDelete: (article: Article) => void;
    onEdit?: (article: Article) => void;
};

const statusConfig = {
    PUBLISHED: { label: 'Publié', className: 'bg-green-100 text-green-700' },
    DRAFT: { label: 'Brouillon', className: 'bg-yellow-100 text-yellow-700' },
    ARCHIVED: { label: 'Archivé', className: 'bg-gray-100 text-gray-500' },
};

const ArticleTable = ({ articles, onDelete, onEdit }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-border)]">
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Liste des articles
                </h2>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="border-b border-[var(--color-border)]">
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Titre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Catégorie</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Auteur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                    {articles.map((article) => (
                        <tr key={article.id} className="hover:bg-[var(--color-primary-light)] transition-colors">

                            {/* Titre */}
                            <td className="px-6 py-4">
                                <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                                    {article.title}
                                </span>
                            </td>

                            {/* Catégorie */}
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                    🏷 {article.category.name}
                                </span>
                            </td>

                            {/* Auteur */}
                            <td className="px-6 py-4 text-sm text-[var(--color-text-primary)]">
                                {article.user.firstname} {article.user.lastname}
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">
                                📅 {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                            </td>

                            {/* Statut */}
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[article.status].className}`}>
                                    {statusConfig[article.status].label}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <button
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                        onClick={() => onEdit?.(article)}
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        onClick={() => onDelete(article)}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}

                    {articles.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-sm text-[var(--color-text-muted)]">
                                Aucun article trouvé
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleTable;
