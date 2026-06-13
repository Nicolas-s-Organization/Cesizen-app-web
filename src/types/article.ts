import type { Category } from '@/types/category'

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Article {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
  };
  category: Category
}

export interface ArticleFiltersType {
  search?: string;
  categoryId?: string;
  status?: ArticleStatus | '';
  page?: number;
  limit?: number;
}

export interface PaginatedArticles {
  data: Article[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
