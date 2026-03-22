import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types/auth';
import type { UserFilters, UserMeta } from '@/types/user';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [meta, setMeta] = useState<UserMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFiltersState] = useState<UserFilters>({ page: 1, limit: 10 });
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const setFilters = (updater: UserFilters | ((prev: UserFilters) => UserFilters)) => {
        setFiltersState(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            const { page: _p1, ...prevRest } = prev;
            const { page: _p2, ...nextRest } = next;
            if (JSON.stringify(prevRest) !== JSON.stringify(nextRest)) {
                return { ...next, page: 1 };
            }
            return next;
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search || '');
        }, 400);
        return () => clearTimeout(timer);
    }, [filters.search]);

    const fetchUsers = async (f: UserFilters) => {
        setLoading(true);
        try {
            const result = await userService.getAll(f);
            setUsers(result.data);
            setMeta(result.meta);
        } catch {
            setError('Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers({ ...filters, search: debouncedSearch });
    }, [debouncedSearch, filters.role, filters.isActive, filters.page]);


    const updateUser = async (id: string, data: Partial<User>) => {
        try {
            const updated = await userService.update(id, data);
            setUsers(prev => prev.map(u => u.id === id ? updated : u));
        } catch {
            setError('Erreur lors de la mise à jour');
        }
    };

    const deleteUser = async (id: string) => {
        try {
            await userService.delete(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch {
            setError('Erreur lors de la suppression');
        }
    };

    return { users, meta, loading, error, filters, setFilters, updateUser, deleteUser };
};
