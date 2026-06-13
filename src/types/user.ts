import type { User } from "./auth";
import type {PaginationMeta} from "./pagination" 

export type UserFilters = {
    search?: string;
    role?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
}


// export interface UserMeta {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
// }


export interface PaginatedUsers {
    data: User[];
    meta: PaginationMeta;
}