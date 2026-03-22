import type { UserMeta } from '@/types/user';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  meta: UserMeta;
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination = ({ meta, onPageChange, currentPage }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">
        <span className="font-medium text-foreground">{meta.total}</span> résultat{meta.total > 1 ? 's' : ''}
      </span>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-md text-sm font-medium transition-colors
              ${page === currentPage
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground'
              }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage >= meta.totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-md hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
