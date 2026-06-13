import { Search } from 'lucide-react';
import type { ArticleFiltersType, ArticleStatus } from '@/types/article';
import type { Category } from '@/types/category'


interface ArticleFiltersProps {
    filters: ArticleFiltersType;
    onChange: (filters: ArticleFiltersType) => void;
    categories: Category[];
}

const ArticleFilters = ({ filters, onChange, categories }: ArticleFiltersProps) => {
    return (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4">
            <div className="flex items-end gap-4">

                {/* Recherche */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher par titre, auteur..."
                            value={filters.search ?? ''}
                            onChange={(e) => onChange({ ...filters, search: e.target.value })}
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-input-bg)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                    </div>
                </div>

                {/* Catégorie */}
                <div>
                    <select
                        value={filters.categoryId ?? ''}
                        onChange={(e) => onChange({ ...filters, categoryId: e.target.value || undefined })}
                        className="py-2 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-input-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Statut */}
                <div>
                    <select
                        value={filters.status ?? ''}
                        onChange={(e) => onChange({ ...filters, status: (e.target.value || undefined) as ArticleStatus | undefined })}
                        className="py-2 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-input-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="PUBLISHED">Publié</option>
                        <option value="DRAFT">Brouillon</option>
                        <option value="ARCHIVED">Archivé</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default ArticleFilters;
