import type { Category } from '@/types/category';

interface Props {
    categories: Category[];
    selectedCategoryId: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const ArticleCategorySelector = ({ categories, selectedCategoryId, onChange, error }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Catégorie</h2>
            <div className="space-y-2">
                {categories.map((cat) => (
                    <label
                        key={cat.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer border transition ${
                            selectedCategoryId === String(cat.id)
                                ? 'border-green-500 bg-green-50'
                                : 'border-transparent hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="radio"
                            name="categoryId"
                            value={cat.id}
                            checked={selectedCategoryId === String(cat.id)}
                            onChange={onChange}
                            className="hidden"
                        />
                        <span className="text-sm text-gray-700">{cat.name}</span>
                    </label>
                ))}
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default ArticleCategorySelector;
