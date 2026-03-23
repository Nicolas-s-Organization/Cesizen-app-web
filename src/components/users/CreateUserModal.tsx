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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-base font-semibold text-gray-800">Créer un utilisateur</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                </div>


                {globalError && (
                    <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-400 px-3 py-2 rounded-r-lg">
                        <p className="text-xs text-red-600">{globalError}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Prénom <span className="text-red-500">*</span></label>
                            <input type="text" name="firstname" placeholder="Marie"
                                value={formData.firstname} onChange={handleChange}
                                className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.firstname ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.firstname && <p className="text-xs text-red-500 mt-0.5">{errors.firstname}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Nom <span className="text-red-500">*</span></label>
                            <input type="text" name="lastname" placeholder="Dupont"
                                value={formData.lastname} onChange={handleChange}
                                className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lastname ? 'border-red-400' : 'border-gray-300'}`}
                            />
                            {errors.lastname && <p className="text-xs text-red-500 mt-0.5">{errors.lastname}</p>}
                        </div>
                    </div>

                    {/* Email seul */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" placeholder="marie.dupont@example.com"
                            value={formData.email} onChange={handleChange}
                            className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe <span className="text-red-500">*</span></label>
                        <input type="password" name="password" placeholder="••••••••"
                            value={formData.password} onChange={handleChange}
                            className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-0.5">{errors.password}</p>}
                    </div>

                    {/* Confirmer mot de passe */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Confirmer le mot de passe <span className="text-red-500">*</span></label>
                        <input type="password" name="confirmPassword" placeholder="••••••••"
                            value={formData.confirmPassword} onChange={handleChange}
                            className={`w-full px-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-0.5">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date de naissance</label>
                        <input type="date" name="birthdate"
                            value={formData.birthdate} onChange={handleChange}
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.birthdate && <p className="text-xs text-red-500 mt-0.5">{errors.birthdate}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Rôle <span className="text-red-500">*</span></label>
                        <select name="role" value={formData.role} onChange={handleChange}
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="USER">Utilisateur</option>
                            <option value="ADMIN">Administrateur</option>
                        </select>
                    </div>

                    <div className="flex gap-2 pt-8">
                        <button type="submit" disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                        >
                            {loading ? 'Création...' : "Créer l'utilisateur"}
                        </button>
                        <button type="button" onClick={onClose}
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
