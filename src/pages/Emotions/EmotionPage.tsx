import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import type { Emotion } from '@/types/emotion';
import { useEmotions } from '@/hooks/useEmotion';
import EmotionList from '@/components/emotions/EmotionList';
import EmotionFormModal from '@/components/emotions/EmotionFormModal';
import EmotionDeleteModal from '@/components/emotions/EmotionDeleteModal';


export default function EmotionsPage() {
  const {
    emotions, loading, errors, globalError,
    clearErrors, createEmotion, updateEmotion, deleteEmotion,
  } = useEmotions();

  const [formModal, setFormModal] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    parent: Emotion | null;
    emotion: Emotion | null;
  }>({ open: false, mode: 'create', parent: null, emotion: null });

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    emotion: Emotion | null;
  }>({ open: false, emotion: null });

  const closeFormModal = () => {
    clearErrors();
    setFormModal({ open: false, mode: 'create', parent: null, emotion: null });
  };

  const handleFormConfirm = async (name: string) => {
    let result;
    if (formModal.mode === 'edit' && formModal.emotion) {
      result = await updateEmotion(formModal.emotion.id, { name });
    } else {
      result = await createEmotion({
        name,
        level: formModal.parent ? 2 : 1,
        parentId: formModal.parent?.id || undefined,
      });
    }
    if (result) closeFormModal();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.emotion) return;
    await deleteEmotion(deleteModal.emotion.id);
    setDeleteModal({ open: false, emotion: null });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration des émotions</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez les émotions disponibles</p>
        </div>
        <button
          onClick={() => setFormModal({ open: true, mode: 'create', parent: null, emotion: null })}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus className="w-4 h-4" />
          Nouvelle émotion (niveau 1)
        </button>
      </div>

      {globalError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {globalError}
        </div>
      )}

      <EmotionList
        emotions={emotions}
        onEdit={(emotion) => setFormModal({ open: true, mode: 'edit', parent: null, emotion })}
        onDelete={(emotion) => setDeleteModal({ open: true, emotion })}
        onAddChild={(parent) => setFormModal({ open: true, mode: 'create', parent, emotion: null })}
      />

      {formModal.open && (
        <EmotionFormModal
          mode={formModal.mode}
          parentEmotion={formModal.parent}
          initialName={formModal.emotion?.name || ''}
          errors={errors}
          onConfirm={handleFormConfirm}
          onCancel={closeFormModal}
        />
      )}

      {deleteModal.open && deleteModal.emotion && (
        <EmotionDeleteModal
          emotion={deleteModal.emotion}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ open: false, emotion: null })}
        />
      )}
    </div>
  );
}
