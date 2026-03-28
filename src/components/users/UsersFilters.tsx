import { Search } from 'lucide-react';
import type { UserFilters } from "@/types/user";


type Props = {
    filters: UserFilters;
    onChange: (filters: UserFilters) => void;
};

const UsersFilters = ({ filters, onChange }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-border)] px-6 py-4 flex gap-6 items-center mb-8">
            <div className="flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email..."
                        value={filters.search || ''}
                        onChange={(e) => onChange({ ...filters, search: e.target.value })}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <select
                value={filters.role || ''}
                onChange={(e) => onChange({ ...filters, role: e.target.value || undefined })}
                className="px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Tous les rôles</option>
                <option value="ADMIN">Administrateur</option>
                <option value="USER">Utilisateur</option>
            </select>

            <select
                value={filters.isActive === undefined ? '' : String(filters.isActive)}
                onChange={(e) => onChange({
                    ...filters,
                    isActive: e.target.value === '' ? undefined : e.target.value === 'true'
                })}
                className="px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Tous les statuts</option>
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
            </select>
        </div>
    );
};


export default UsersFilters;
