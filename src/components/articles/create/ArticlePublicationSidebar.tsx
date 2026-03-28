// components/articles/create/ArticlePublicationSidebar.tsx
import type { ArticleStatus } from '@/types/article';

interface Props {
    status: ArticleStatus;
    onStatusChange: (status: ArticleStatus) => void;
}

const ArticlePublicationSidebar = ({ status, onStatusChange }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Publication</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value as ArticleStatus)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            >
                <option value="DRAFT">Brouillon</option>
                <option value="PUBLISHED">Publié</option>
            </select>
            <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                    <span>Auteur</span>
                    <span className="font-medium text-gray-800">Admin CESI</span>
                </div>
                <div className="flex justify-between">
                    <span>Date de publication</span>
                    <span className="font-medium text-gray-800">
                        {new Date().toLocaleDateString('fr-FR')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ArticlePublicationSidebar;
