import { Property } from '@/app/services/PropertyService';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-2xl font-bold text-base-content mb-2">
          No Properties Found
        </h3>
        <p className="text-base-content/70 mb-6">
          Try adjusting your search criteria to find more properties.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/listings'}
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
