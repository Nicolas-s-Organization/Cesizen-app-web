import { X } from 'lucide-react';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import type { User } from '@/types/auth';

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({ user, isOpen, onClose, onSuccess }: EditUserModalProps) {
  const { formData, handleChange, handleSubmit, errors, globalError, loading } = useUpdateUser({
    user,
    onSuccess,
    onClose,
  });

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">

        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-base font-semibold text-gray-800">Modifier l'utilisateur</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {globalError && (
          <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-400 px-3 py-2 rounded-r-lg">
            <p className="text-xs text-red-600">{globalError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Prénom</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname ?? ''}
                onChange={handleChange}
                className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.firstname ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.firstname && <p className="text-xs text-red-500 mt-0.5">{errors.firstname}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nom</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname ?? ''}
                onChange={handleChange}
                className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lastname ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.lastname && <p className="text-xs text-red-500 mt-0.5">{errors.lastname}</p>}
            </div>
          </div>

          {/* Email modifiable */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email ?? ''}
              onChange={handleChange}
              className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
          </div>

          {/* Date de naissance */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date de naissance</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate ?? ''}
              onChange={handleChange}
              className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.birthdate ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.birthdate && <p className="text-xs text-red-500 mt-0.5">{errors.birthdate}</p>}
          </div>

          {/* Rôle */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Rôle</label>
            <select
              name="role"
              value={formData.role ?? ''}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
            {errors.role && <p className="text-xs text-red-500 mt-0.5">{errors.role}</p>}
          </div>

          <div className="flex gap-2 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? 'Modification...' : "Modifier l'utilisateur"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-gray-700 hover:bg-gray-100 py-2 rounded-lg text-sm font-medium transition border border-gray-200"
            >
              Annuler
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
