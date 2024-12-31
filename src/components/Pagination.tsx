import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i;
    if (currentPage <= 2) return i;
    if (currentPage >= totalPages - 2) return totalPages - 5 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg sm:px-6">
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          Sayfa <span className="font-medium">{currentPage + 1}</span> / {' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF6000]/10 text-[#FF6000]"
          title="İlk sayfa"
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF6000]/10 text-[#FF6000]"
          title="Önceki sayfa"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentPage === page
                  ? 'bg-[#FF6000] text-white'
                  : 'text-[#FF6000] hover:bg-[#FF6000]/10'
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF6000]/10 text-[#FF6000]"
          title="Sonraki sayfa"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF6000]/10 text-[#FF6000]"
          title="Son sayfa"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};