import type { User } from '../../types/auth';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2 } from 'lucide-react';


type Props = {
    users: User[];
    onUpdate: (id: string, data: Partial<User>) => Promise<void>;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
};

const getInitials = (firstname: string, lastname: string) => `${firstname[0]}${lastname[0]}`.toUpperCase();


const UsersTable = ({ users, onEdit, onUpdate, onDelete }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-border)]">
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Liste des utilisateurs
                </h2>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="border-b border-[var(--color-border)]">
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Inscrit le</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-[var(--color-primary-light)] transition-colors">

                            {/* Avatar + Nom */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                                        {getInitials(user.firstname, user.lastname)}
                                    </div>
                                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                        {user.firstname} {user.lastname.toUpperCase()}
                                    </span>
                                </div>
                            </td>

                            {/* Email */}
                            <td className="px-6 py-4 text-sm text-[var(--color-primary-text)]">
                                {user.email}
                            </td>

                            {/* Rôle */}
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                  ${user.role === 'ADMIN'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-50 text-blue-600'}`}>
                                    👤 {user.role === 'ADMIN' ? 'Administrateur' : 'Utilisateur'}
                                </span>
                            </td>

                            {/* Statut */}
                            <td className="px-6 py-4 w-32">
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={user.isActive}
                                        onCheckedChange={() => onUpdate(user.id, { isActive: !user.isActive })}
                                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                                    />
                                    <span className={`text-xs font-medium ${user.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                        {user.isActive ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>
                            </td>

                            {/* Inscrit le */}
                            <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">
                                {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                            </td>


                            {/* Actions */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        onClick={() => onDelete(user)}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
