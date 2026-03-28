// components/articles/create/ArticleImageUpload.tsx
import { useRef } from 'react';
import { ImageIcon, Upload } from 'lucide-react';

interface Props {
    imagePreview: string | null;
    onImageChange: (file: File | null) => void;
    onImageRemove: () => void;
}

const ArticleImageUpload = ({ imagePreview, onImageChange, onImageRemove }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Image à la une</h2>

            {imagePreview ? (
                <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    <button
                        onClick={onImageRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition"
                >
                    <ImageIcon size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-sm font-medium text-gray-700">Cliquez pour télécharger une image</p>
                    <p className="text-xs text-gray-400 mt-1">ou glissez-déposez une image ici</p>
                    <p className="text-xs text-green-600 mt-1">PNG, JPG jusqu'à 5MB</p>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="mt-3 flex items-center gap-1 mx-auto text-sm text-green-700 border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-50 transition"
                    >
                        <Upload size={14} />
                        Parcourir les fichiers
                    </button>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
            />
        </div>
    );
};

export default ArticleImageUpload;
