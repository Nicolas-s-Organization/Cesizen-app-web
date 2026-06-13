import { AlertTriangle, Trash2, X } from 'lucide-react';

interface Props {
  userName: string;
  isOpen: boolean;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteUserModal = ({ userName, isOpen, loading, onConfirm, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Supprimer l'utilisateur</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg mb-6">
          <Trash2 size={24} className="text-red-500 shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              Êtes-vous sûr de vouloir supprimer l'utilisateur
              <span className="font-semibold"> « {userName} »</span> ?
            </p>
            <p className="text-xs text-gray-500 mt-1">Cette action est irréversible.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg mb-6">
          <AlertTriangle size={16} className="text-amber-600 shrink-0" />
          <p className="text-xs text-amber-700">
            Les articles associés à cet utilisateur seront également supprimés.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
