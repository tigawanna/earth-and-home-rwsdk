'use client';

import { useState } from 'react';
import { PropertyService, type PropertySearchParams } from '@/app/services/PropertyService';

interface PropertySearchProps {
  onSearch?: (searchParams: PropertySearchParams) => void;
  initialParams?: PropertySearchParams;
}

interface SearchFormParams {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
}

// Helper function to parse price range
function parsePriceRange(priceRange: string): { priceMin?: number; priceMax?: number } {
  switch (priceRange) {
    case 'Under $300K':
      return { priceMax: 300000 };
    case '$300K - $500K':
      return { priceMin: 300000, priceMax: 500000 };
    case '$500K - $750K':
      return { priceMin: 500000, priceMax: 750000 };
    case '$750K - $1M':
      return { priceMin: 750000, priceMax: 1000000 };
    case '$1M - $2M':
      return { priceMin: 1000000, priceMax: 2000000 };
    case 'Over $2M':
      return { priceMin: 2000000 };
    default:
      return {};
  }
}

// Helper function to parse bedroom/bathroom filters
function parseRoomFilter(filter: string): number | undefined {
  if (filter.endsWith('+')) {
    return parseInt(filter.replace('+', ''));
  }
  return undefined;
}

// Helper function to parse size filter
function parseSizeFilter(size: string): { minSquareFeet?: number; maxSquareFeet?: number } {
  switch (size) {
    case 'Under 1,000':
      return { maxSquareFeet: 1000 };
    case '1,000 - 1,500':
      return { minSquareFeet: 1000, maxSquareFeet: 1500 };
    case '1,500 - 2,000':
      return { minSquareFeet: 1500, maxSquareFeet: 2000 };
    case '2,000 - 3,000':
      return { minSquareFeet: 2000, maxSquareFeet: 3000 };
    case 'Over 3,000':
      return { minSquareFeet: 3000 };
    default:
      return {};
  }
}

export function PropertySearch({ onSearch, initialParams }: PropertySearchProps) {
  const [searchParams, setSearchParams] = useState<SearchFormParams>({
    location: initialParams?.location || '',
    propertyType: initialParams?.propertyType || 'Any Type',
    priceRange: 'Any Price', // We'll need to reverse engineer this from initialParams if needed
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    size: 'Size (sq ft)'
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [moreFilters, setMoreFilters] = useState({
    yearBuilt: 'Any Year',
    features: {
      pool: false,
      garage: false,
      garden: false
    },
    status: 'For Sale'
  });

  const handleInputChange = (field: keyof SearchFormParams, value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const handleMoreFiltersChange = (field: string, value: any) => {
    setMoreFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setMoreFilters(prev => ({
      ...prev,
      features: { ...prev.features, [feature]: checked }
    }));
  };

  const handleSearch = () => {
    // Convert form params to PropertySearchParams
    const priceRange = parsePriceRange(searchParams.priceRange);
    const sizeRange = parseSizeFilter(searchParams.size);
    const bedroomsFilter = parseRoomFilter(searchParams.bedrooms);
    const bathroomsFilter = parseRoomFilter(searchParams.bathrooms);

    // Get selected features
    const selectedFeatures = Object.entries(moreFilters.features)
      .filter(([_, checked]) => checked)
      .map(([feature, _]) => feature.charAt(0).toUpperCase() + feature.slice(1));

    const searchQuery: PropertySearchParams = {
      location: searchParams.location || undefined,
      propertyType: searchParams.propertyType !== 'Any Type' ? searchParams.propertyType : undefined,
      ...priceRange,
      bedrooms: bedroomsFilter,
      bathrooms: bathroomsFilter,
      ...sizeRange,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
      status: moreFilters.status.toLowerCase().replace(' ', '-'),
      page: 1,
      limit: 20
    };

    // Create URL params and navigate
    const urlParams = PropertyService.searchParamsToURLParams(searchQuery);
    
    // Navigate to listings page with search params
    if (typeof window !== 'undefined') {
      window.location.href = `/listings?${urlParams.toString()}`;
    }

    // Also call the onSearch callback if provided
    onSearch?.(searchQuery);
  };

  return (
    <section className="bg-gradient-to-b from-base-200/50 to-base-300/30 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-lg lg:text-xl text-base-content/80 max-w-2xl mx-auto">
            Use our advanced search to discover properties that match your exact requirements
          </p>
        </div>

        <div className="card bg-base-100 shadow-2xl border border-base-300/20">
          <div className="card-body p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              
              {/* Location Input */}
              <div className="lg:col-span-1">
                <label className="input input-bordered flex items-center gap-2 h-12 lg:h-14 focus-within:input-primary transition-colors">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    className="grow text-sm lg:text-base"
                    placeholder="Enter city, neighborhood, or ZIP code"
                    value={searchParams.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </label>
              </div>

              {/* Property Type Select */}
              <div>
                <select 
                  className="select select-bordered w-full h-12 lg:h-14 focus:select-primary transition-colors text-sm lg:text-base"
                  value={searchParams.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                >
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Land</option>
                </select>
              </div>

              {/* Price Range Select */}
              <div>
                <select 
                  className="select select-bordered w-full h-12 lg:h-14 focus:select-primary transition-colors text-sm lg:text-base"
                  value={searchParams.priceRange}
                  onChange={(e) => handleInputChange('priceRange', e.target.value)}
                >
                  <option>Any Price</option>
                  <option>Under $300K</option>
                  <option>$300K - $500K</option>
                  <option>$500K - $750K</option>
                  <option>$750K - $1M</option>
                  <option>$1M - $2M</option>
                  <option>Over $2M</option>
                </select>
              </div>

              {/* Search Button */}
              <div>
                <button 
                  className="btn btn-primary w-full h-12 lg:h-14 text-sm lg:text-lg hover:btn-primary-focus transition-all duration-200 hover:scale-105"
                  onClick={handleSearch}
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Secondary Filters Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              
              {/* Bedrooms Select */}
              <div>
                <select 
                  className="select select-bordered w-full h-10 lg:h-12 focus:select-primary transition-colors text-sm"
                  value={searchParams.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                >
                  <option>Bedrooms</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                </select>
              </div>

              {/* Bathrooms Select */}
              <div>
                <select 
                  className="select select-bordered w-full h-10 lg:h-12 focus:select-primary transition-colors text-sm"
                  value={searchParams.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                >
                  <option>Bathrooms</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                </select>
              </div>

              {/* Size Select */}
              <div>
                <select 
                  className="select select-bordered w-full h-10 lg:h-12 focus:select-primary transition-colors text-sm"
                  value={searchParams.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                >
                  <option>Size (sq ft)</option>
                  <option>Under 1,000</option>
                  <option>1,000 - 1,500</option>
                  <option>1,500 - 2,000</option>
                  <option>2,000 - 3,000</option>
                  <option>Over 3,000</option>
                </select>
              </div>

              {/* More Filters Button */}
              <div>
                <button 
                  className="btn btn-outline w-full h-10 lg:h-12 hover:btn-primary hover:text-primary-content transition-all duration-200 text-sm"
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  More Filters
                </button>
              </div>
            </div>

            {/* Expandable More Filters Section */}
            {showMoreFilters && (
              <div className="mt-6 pt-6 border-t border-base-300 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Year Built</span>
                    </label>
                    <select 
                      className="select select-bordered w-full text-sm"
                      value={moreFilters.yearBuilt}
                      onChange={(e) => handleMoreFiltersChange('yearBuilt', e.target.value)}
                    >
                      <option>Any Year</option>
                      <option>2020+</option>
                      <option>2010-2020</option>
                      <option>2000-2010</option>
                      <option>1990-2000</option>
                      <option>Before 1990</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Property Features</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="label cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm checkbox-primary"
                          checked={moreFilters.features.pool}
                          onChange={(e) => handleFeatureChange('pool', e.target.checked)}
                        />
                        <span className="label-text ml-2 text-sm">Pool</span>
                      </label>
                      <label className="label cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm checkbox-primary"
                          checked={moreFilters.features.garage}
                          onChange={(e) => handleFeatureChange('garage', e.target.checked)}
                        />
                        <span className="label-text ml-2 text-sm">Garage</span>
                      </label>
                      <label className="label cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm checkbox-primary"
                          checked={moreFilters.features.garden}
                          onChange={(e) => handleFeatureChange('garden', e.target.checked)}
                        />
                        <span className="label-text ml-2 text-sm">Garden</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Listing Status</span>
                    </label>
                    <select 
                      className="select select-bordered w-full text-sm"
                      value={moreFilters.status}
                      onChange={(e) => handleMoreFiltersChange('status', e.target.value)}
                    >
                      <option>For Sale</option>
                      <option>New Listing</option>
                      <option>Price Reduced</option>
                      <option>Open House</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
