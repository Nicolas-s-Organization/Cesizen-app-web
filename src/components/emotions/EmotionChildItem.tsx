import { Pencil, Trash2 } from 'lucide-react';
import type { Emotion } from '@/types/emotion';

interface EmotionChildItemProps {
  emotion: Emotion;
  onEdit: (emotion: Emotion) => void;
  onDelete: (emotion: Emotion) => void;
}

export default function EmotionChildItem({ emotion, onEdit, onDelete }: EmotionChildItemProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-700">{emotion.name}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(emotion)}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(emotion)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
