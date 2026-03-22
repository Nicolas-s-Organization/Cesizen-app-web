import { useState } from 'react';

import { useUsers } from '../../hooks/useUser';
import UsersFilters from '@/components/users/UsersFilters';
import UsersTable from '../../components/users/UserTable';
import Pagination from '@/components/users/Pagination';
import CreateUserModal from '@/components/users/CreateUserModal';
import { Plus } from 'lucide-react';

const UserPage = () => {
  const { users, meta, loading, error, filters, setFilters, updateUser, deleteUser, fetchUsers } = useUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 space-y-4">
      <button
        onClick={() => setShowCreateModal(true)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        <Plus size={18} />
        Créer un utilisateur
      </button>
      <UsersFilters filters={filters} onChange={setFilters} />
      <UsersTable users={users} onUpdate={updateUser} onDelete={deleteUser} />
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
    </div>
  );
}

export default UserPage;
