'use client';

import { PropertyService, type PropertySearchParams } from '@/app/services/PropertyService';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: PropertySearchParams;
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const navigateToPage = (page: number) => {
    const newParams = { ...searchParams, page };
    const urlParams = PropertyService.searchParamsToURLParams(newParams);
    window.location.href = `/listings?${urlParams.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          className="btn btn-outline"
          onClick={() => navigateToPage(currentPage - 1)}
        >
          ‹ Previous
        </button>
      );
    }

    // First page + ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="btn btn-outline"
          onClick={() => navigateToPage(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="btn btn-disabled">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`btn ${i === currentPage ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => navigateToPage(i)}
        >
          {i}
        </button>
      );
    }

    // Last page + ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="btn btn-disabled">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className="btn btn-outline"
          onClick={() => navigateToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          className="btn btn-outline"
          onClick={() => navigateToPage(currentPage + 1)}
        >
          Next ›
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-12">
      <div className="join">
        {renderPageNumbers()}
      </div>
    </div>
  );
}
