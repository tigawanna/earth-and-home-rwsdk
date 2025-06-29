'use client';

import { PropertyService, type PropertySearchParams } from '@/app/services/PropertyService';

interface SearchResultsProps {
  total: number;
  page: number;
  searchParams: PropertySearchParams;
}

export function SearchResults({ total, page, searchParams }: SearchResultsProps) {
  const itemsPerPage = searchParams.limit || 20;
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    const newParams = { 
      ...searchParams, 
      sortBy: sortBy as PropertySearchParams['sortBy'], 
      sortOrder: sortOrder as PropertySearchParams['sortOrder'], 
      page: 1 
    };
    const urlParams = PropertyService.searchParamsToURLParams(newParams);
    window.location.href = `/listings?${urlParams.toString()}`;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchParams.location) count++;
    if (searchParams.propertyType && searchParams.propertyType !== 'Any Type') count++;
    if (searchParams.priceMin || searchParams.priceMax) count++;
    if (searchParams.bedrooms) count++;
    if (searchParams.bathrooms) count++;
    if (searchParams.minSquareFeet || searchParams.maxSquareFeet) count++;
    if (searchParams.features && searchParams.features.length > 0) count++;
    return count;
  };

  const clearAllFilters = () => {
    window.location.href = '/listings';
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-6 bg-base-200/50 rounded-box">
      {/* Results Info */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div>
          <p className="text-lg font-semibold text-base-content">
            {total.toLocaleString()} Properties Found
          </p>
          {total > 0 && (
            <p className="text-sm text-base-content/70">
              Showing {startItem.toLocaleString()} - {endItem.toLocaleString()} of {total.toLocaleString()} results
            </p>
          )}
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-base-content/70">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
            </span>
            <button
              className="btn btn-ghost btn-xs"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-base-content/70">Sort by:</span>
        <select
          className="select select-bordered select-sm"
          value={`${searchParams.sortBy || 'createdAt'}-${searchParams.sortOrder || 'desc'}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            handleSortChange(sortBy, sortOrder);
          }}
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="squareFeet-desc">Size: Largest First</option>
          <option value="squareFeet-asc">Size: Smallest First</option>
          <option value="bedrooms-desc">Most Bedrooms</option>
          <option value="bedrooms-asc">Fewest Bedrooms</option>
        </select>

        {/* View Toggle (for future grid/list view) */}
        <div className="join">
          <button className="btn btn-active btn-sm join-item">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>
          <button className="btn btn-sm join-item">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
