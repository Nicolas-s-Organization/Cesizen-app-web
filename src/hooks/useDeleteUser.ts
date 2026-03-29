import { useState } from 'react';
import { userService } from '@/services/userService';
import type { User } from '@/types/auth';

export function useDeleteUser(onSuccess: () => void) {
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setLoading(true);
    try {
      await userService.delete(userToDelete.id);
      setUserToDelete(null);
      onSuccess();
    } catch {
      console.error('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  return { userToDelete, setUserToDelete, confirmDelete, loading };
}
