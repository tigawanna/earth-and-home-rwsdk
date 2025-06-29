"use client";

import { useState, useEffect } from 'react';
import { PropertySearchParams } from '@/app/services/PropertyService';
import { IoSearchOutline, IoFilterOutline, IoClose } from 'react-icons/io5';

interface InteractivePropertySearchProps {
  onSearch?: (params: PropertySearchParams) => void;
  className?: string;
}

export function InteractivePropertySearch({ onSearch, className = '' }: InteractivePropertySearchProps) {
  const [filters, setFilters] = useState<PropertySearchParams>(() => {
    // Initialize from URL params if available
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        location: urlParams.get('location') || '',
        propertyType: urlParams.get('propertyType') || '',
        priceMin: urlParams.get('priceMin') ? Number(urlParams.get('priceMin')) : undefined,
        priceMax: urlParams.get('priceMax') ? Number(urlParams.get('priceMax')) : undefined,
        bedrooms: urlParams.get('bedrooms') ? Number(urlParams.get('bedrooms')) : undefined,
        bathrooms: urlParams.get('bathrooms') ? Number(urlParams.get('bathrooms')) : undefined,
        minSquareFeet: urlParams.get('minSquareFeet') ? Number(urlParams.get('minSquareFeet')) : undefined,
        maxSquareFeet: urlParams.get('maxSquareFeet') ? Number(urlParams.get('maxSquareFeet')) : undefined,
      };
    }
    return {};
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);

  useEffect(() => {
    // Check if any filters are active
    const hasActiveFilters = Object.values(filters).some(value => 
      value !== undefined && value !== '' && value !== 0
    );
    setHasFilters(hasActiveFilters);
  }, [filters]);

  const handleFilterChange = (key: keyof PropertySearchParams, value: string | number | undefined) => {
    const newFilters = {
      ...filters,
      [key]: value === '' || value === 0 ? undefined : value,
    };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    // Create URL params
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 0) {
        params.set(key, String(value));
      }
    });

    // Update URL without page reload
    const newUrl = params.toString() ? `/listings?${params.toString()}` : '/listings';
    window.history.pushState({}, '', newUrl);

    // Call callback if provided
    if (onSearch) {
      onSearch(filters);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      propertyType: '',
      priceMin: undefined,
      priceMax: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      minSquareFeet: undefined,
      maxSquareFeet: undefined,
    };
    setFilters(clearedFilters);
    window.history.pushState({}, '', '/listings');
    if (onSearch) {
      onSearch(clearedFilters);
    }
  };

  return (
    <div className={`card bg-base-100 shadow-lg border border-base-200 ${className}`}>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Search Properties</h2>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm"
            >
              <IoClose className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="City, State, ZIP"
                className="input input-bordered w-full"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Property Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.propertyType || ''}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                <option value="">Any Type</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="CONDO">Condo</option>
                <option value="TOWNHOUSE">Townhouse</option>
                <option value="VILLA">Villa</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Min Price</span>
              </label>
              <input
                type="number"
                placeholder="Min Price"
                className="input input-bordered w-full"
                value={filters.priceMin || ''}
                onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Max Price</span>
              </label>
              <input
                type="number"
                placeholder="Max Price"
                className="input input-bordered w-full"
                value={filters.priceMax || ''}
                onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="btn btn-ghost btn-sm"
            >
              <IoFilterOutline className="w-4 h-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
            </button>

            <button
              onClick={handleSearch}
              className="btn btn-primary"
            >
              <IoSearchOutline className="w-5 h-5" />
              Search Properties
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Bedrooms</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={filters.bedrooms || ''}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Bathrooms</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={filters.bathrooms || ''}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Min Sq Ft</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Min Square Feet"
                    className="input input-bordered w-full"
                    value={filters.minSquareFeet || ''}
                    onChange={(e) => handleFilterChange('minSquareFeet', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Max Sq Ft</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Max Square Feet"
                    className="input input-bordered w-full"
                    value={filters.maxSquareFeet || ''}
                    onChange={(e) => handleFilterChange('maxSquareFeet', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
