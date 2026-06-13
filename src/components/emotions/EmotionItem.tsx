import { useState } from 'react';
import { ChevronDown, ChevronRight, Pencil, Trash2, Plus } from 'lucide-react';
import type { Emotion } from '@/types/emotion';
import EmotionChildItem from './EmotionChildItem';

interface EmotionItemProps {
    emotion: Emotion;
    onEdit: (emotion: Emotion) => void;
    onDelete: (emotion: Emotion) => void;
    onAddChild: (parent: Emotion) => void;
}

export default function EmotionItem({ emotion, onEdit, onDelete, onAddChild }: EmotionItemProps) {
    const [open, setOpen] = useState(false);
    const children = emotion.children || [];

    return (
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-4">
                    {open ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {emotion.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{emotion.name}</p>
                        <p className="text-sm text-gray-400">
                            Niveau 1 - {children.length} émotion{children.length > 1 ? 's' : ''} niveau 2
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => onEdit(emotion)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Modifier
                    </button>
                    <button
                        onClick={() => onDelete(emotion)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Supprimer
                    </button>
                </div>
            </div>

            {/* Children */}
            {open && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                    {/* Sub header */}
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-700">Émotions de niveau 2</p>
                        <button
                            onClick={() => onAddChild(emotion)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Ajouter
                        </button>
                    </div>

                    {children.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Aucune sous-émotion</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {children.map((child) => (
                                <EmotionChildItem
                                    key={child.id}
                                    emotion={child}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
