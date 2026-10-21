import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`edusync-pagination ${className}`} aria-label="Pagination Navigation">
      <button
        type="button"
        className="edusync-pagination__btn edusync-pagination__btn--prev"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src="/icons/minus.svg" alt="Previous" style={{ transform: 'rotate(90deg)' }} width={12} height={12} />
        <span>Previous</span>
      </button>

      <div className="edusync-pagination__pages">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              className={`edusync-pagination__page-num ${
                isActive ? 'edusync-pagination__page-num--active' : ''
              }`}
              onClick={() => onPageChange(p)}
              aria-current={isActive ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="edusync-pagination__btn edusync-pagination__btn--next"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Next</span>
        <img src="/icons/minus.svg" alt="Next" style={{ transform: 'rotate(-90deg)' }} width={12} height={12} />
      </button>
    </nav>
  );
};
