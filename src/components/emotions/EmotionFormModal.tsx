// components/emotions/EmotionFormModal.tsx
import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';

interface EmotionFormModalProps {
    mode: 'create' | 'edit';
    parentEmotion?: { id: string; name: string } | null;
    initialName?: string;
    errors?: Record<string, string>;
    onConfirm: (name: string) => void;
    onCancel: () => void;
}

export default function EmotionFormModal({ mode, parentEmotion, initialName = '', errors, onConfirm, onCancel }: EmotionFormModalProps) {
    const [name, setName] = useState(initialName);
    const level = parentEmotion ? 2 : 1;
    const isEdit = mode === 'edit';

    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset volontaire du champ quand initialName change
    useEffect(() => setName(initialName), [initialName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) onConfirm(name.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">
                        {isEdit ? 'Modifier l\'émotion' : `Ajouter une émotion (Niveau ${level})`}
                    </h2>
                    <button onClick={onCancel} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nom de l'émotion *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={level === 1 ? 'Ex: Gratitude' : 'Ex: Frustration'}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            autoFocus
                        />
                        {errors?.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {!isEdit && level === 1 && (
                        <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
                            <Info className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-yellow-800">
                                Vous pourrez ajouter des émotions de niveau 2 après la création
                            </p>
                        </div>
                    )}

                    {!isEdit && level === 2 && (
                        <p className="text-sm text-gray-500">
                            Sera ajoutée sous : <span className="font-medium text-gray-700">{parentEmotion?.name}</span>
                        </p>
                    )}
                    {errors?.global && (
                        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                            <Info className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-red-700">{errors.global}</p>
                        </div>
                    )}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={!name.trim() || (isEdit && name.trim() === initialName)}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                        >
                            {isEdit ? 'Enregistrer' : 'Créer l\'émotion'}
                        </button>
                        <button type="button" onClick={onCancel} className="px-6 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
