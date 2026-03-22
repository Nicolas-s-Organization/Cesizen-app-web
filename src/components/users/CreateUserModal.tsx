import { X } from 'lucide-react';
import { useCreateUser } from '../../hooks/useCreateUser';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserCreated: () => void;
}

export default function CreateUserModal({ isOpen, onClose, onUserCreated }: CreateUserModalProps) {
    const { formData, handleChange, handleSubmit, errors, globalError, loading } = useCreateUser({
        onSuccess: onUserCreated,
        onClose
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Créer un utilisateur</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Prénom <span className="text-red-500">*</span>
                            </label>
                            <input type="text" name="firstname" placeholder="Ex: Marie"
                                value={formData.firstname} onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.prenom ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.firstname && <p className="text-xs text-red-500 mt-1">{errors.firstname}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input type="text" name="lastname" placeholder="Ex: Dupont"
                                value={formData.lastname} onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.nom ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.lastname && <p className="text-xs text-red-500 mt-1">{errors.lastname}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" placeholder="marie.dupont@example.com"
                            value={formData.email} onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe <span className="text-red-500">*</span>
                        </label>
                        <input type="password" name="password" placeholder="••••••••"
                            value={formData.password} onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmer le mot de passe <span className="text-red-500">*</span>
                        </label>
                        <input type="password" name="confirmPassword" placeholder="••••••••"
                            value={formData.confirmPassword} onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date de naissance
                        </label>
                        <input type="date" name="birthdate"
                            value={formData.birthdate} onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.dateNaissance ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.birthdate && <p className="text-xs text-red-500 mt-1">{errors.birthdate}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rôle <span className="text-red-500">*</span>
                        </label>
                        <select name="role" value={formData.role} onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="USER">Utilisateur</option>
                            <option value="ADMIN">Administrateur</option>
                        </select>
                    </div>

                    <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <span>⚠️</span>
                        <p className="text-sm text-yellow-800">
                            Un email de bienvenue sera envoyé à l'utilisateur avec ses identifiants de connexion.
                        </p>
                    </div>

                    {globalError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600">{globalError}</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
                        >
                            {loading ? 'Création...' : "Créer l'utilisateur"}
                        </button>
                        <button type="button" onClick={onClose}
                            className="flex-1 text-gray-700 hover:bg-gray-100 py-2.5 rounded-lg font-medium transition border border-gray-200"
                        >
                            Annuler
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
