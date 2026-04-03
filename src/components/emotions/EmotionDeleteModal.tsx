import { AlertTriangle, ShieldAlert } from 'lucide-react';
import type { Emotion } from '@/types/emotion';

interface EmotionDeleteModalProps {
  emotion: Emotion;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EmotionDeleteModal({ emotion, onConfirm, onCancel }: EmotionDeleteModalProps) {
  const childrenCount = emotion.children?.length || 0;
  const canDelete = childrenCount === 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <div className={`flex items-center gap-3 ${canDelete ? 'text-red-600' : 'text-amber-600'}`}>
          {canDelete ? <AlertTriangle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          <h2 className="text-lg font-bold">
            {canDelete ? 'Supprimer l\'émotion' : 'Suppression impossible'}
          </h2>
        </div>

        {canDelete ? (
          <div className="space-y-3">
            <p className="text-gray-700">
              Voulez-vous vraiment supprimer <strong>« {emotion.name} »</strong> ?
            </p>
            <p className="text-sm text-amber-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              Les entrées du tracker associées à cette émotion seront également supprimées.
            </p>
          </div>

        ) : (
          <div className="space-y-3">
            <p className="text-gray-700">
              L'émotion <strong>« {emotion.name} »</strong> ne peut pas être supprimée :
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>
                Elle contient {childrenCount} sous-émotion{childrenCount > 1 ? 's' : ''}. Supprimez-les d'abord.
              </li>
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            {canDelete ? 'Annuler' : 'Fermer'}
          </button>
          {canDelete && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
