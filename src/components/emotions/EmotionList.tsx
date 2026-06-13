import type { Emotion } from '@/types/emotion';
import EmotionItem from './EmotionItem';

interface EmotionListProps {
  emotions: Emotion[];
  onEdit: (emotion: Emotion) => void;
  onDelete: (emotion: Emotion) => void;
  onAddChild: (parent: Emotion) => void;
}

export default function EmotionList({ emotions, onEdit, onDelete, onAddChild }: EmotionListProps) {
  if (emotions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">Aucune émotion pour le moment</p>
        <p className="text-sm mt-1">Commencez par en créer une !</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {emotions.map((emotion) => (
        <EmotionItem
          key={emotion.id}
          emotion={emotion}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  );
}
