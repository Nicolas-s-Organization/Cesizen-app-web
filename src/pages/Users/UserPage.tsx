import { useState } from 'react';

import { useUsers } from '../../hooks/useUser';
import UsersFilters from '@/components/users/UsersFilters';
import UsersTable from '../../components/users/UserTable';
import Pagination from '@/components/common/Pagination';
import CreateUserModal from '@/components/users/CreateUserModal';
import { Plus } from 'lucide-react';
import EditUserModal from '@/components/users/EditUserModal';
import type { User } from '@/types/auth';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import DeleteUserModal from '@/components/users/DeleteUserModal';

const UserPage = () => {
  const { users, meta, loading, error, filters, setFilters, updateUser, deleteUser, fetchUsers } = useUsers();
  const { userToDelete, setUserToDelete, confirmDelete, loading: deleteLoading } = useDeleteUser(() => fetchUsers(filters));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h1>
          <p className="text-sm text-gray-500 mt-1">Créez et gérez les comptes utilisateurs et administrateurs</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus size={18} />
          Créer un utilisateur
        </button>
      </div>
      <UsersFilters filters={filters} onChange={setFilters} />
      <UsersTable
        users={users}
        onUpdate={updateUser}
        onDelete={(user) => setUserToDelete(user)}
        onEdit={(user) => setEditingUser(user)}
      />
      {meta && (
        <div className="flex justify-center pt-2">
          <Pagination
            meta={meta}
            currentPage={filters.page || 1}
            onPageChange={(page) => setFilters(f => ({ ...f, page }))}
          />
        </div>
      )}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onUserCreated={() => {
          setShowCreateModal(false);
          fetchUsers(filters); // recharge la liste
        }}
      />
      <EditUserModal
        isOpen={!!editingUser}
        user={editingUser!}
        onClose={() => setEditingUser(null)}
        onSuccess={() => {
          setEditingUser(null);
          fetchUsers(filters);
        }}
      />
      <DeleteUserModal
        isOpen={!!userToDelete}
        userName={userToDelete ? `${userToDelete.firstname} ${userToDelete.lastname}` : ''}
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onClose={() => setUserToDelete(null)}
      />
    </div>
  );
}

export default UserPage;
