import type { Property } from '@/app/services/PropertyService';
import { PropertyCard } from '@/app/components/listings/PropertyCard';

interface SimilarPropertiesProps {
  properties: Property[];
}

export function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-base-content">Similar Properties</h2>
        <p className="text-base-content/70 mt-2">
          You might also be interested in these properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="text-center">
        <a href="/listings" className="btn btn-outline">
          View All Properties
        </a>
      </div>
    </div>
  );
}
