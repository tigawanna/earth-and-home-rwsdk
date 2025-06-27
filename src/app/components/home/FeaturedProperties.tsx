import { PropertyCard, type Property } from '../property/PropertyCard';
import { InteractiveButton } from '../client/InteractiveButton';

interface FeaturedPropertiesProps {
  properties: Property[];
  onViewAllProperties?: () => void;
  onViewDetails?: (property: Property) => void;
  onContact?: (property: Property) => void;
}

export function FeaturedProperties({ 
  properties, 
  onViewAllProperties,
  onViewDetails,
  onContact 
}: FeaturedPropertiesProps) {
  // Show only first 3 properties for featured section
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">Featured Properties</h2>
          <p className="text-base-content/70 text-lg">Discover our handpicked selection of exceptional homes</p>
        </div>

        {featuredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-base-content mb-2">No Properties Available</h3>
            <p className="text-base-content/70">Check back soon for new listings!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onViewDetails}
                  onContact={onContact}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <InteractiveButton 
                href="/properties"
                className="btn btn-outline btn-lg"
              >
                View All Properties
              </InteractiveButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
