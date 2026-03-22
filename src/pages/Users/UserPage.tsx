// src/pages/Users.tsx
import { useUsers } from '../../hooks/useUser';
import UsersTable from '../../components/users/UserTable';
import UsersFilters from '@/components/users/UsersFilters';
import Pagination from '@/components/users/Pagination';

const UserPage = () => {
  const { users, meta, loading, error, filters, setFilters, updateUser, deleteUser } = useUsers();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

return (
    <div className="p-8 space-y-4">
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
    </div>
  );
}

export default UserPage;
