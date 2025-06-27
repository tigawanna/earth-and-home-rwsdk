import { PropertyCardActions } from '@/components/client/PropertyCardActions';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  isFeatured?: boolean;
  status?: 'for-sale' | 'sold' | 'pending' | 'off-market';
}

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
  onContact?: (property: Property) => void;
}

export function PropertyCard({ property, onViewDetails, onContact }: PropertyCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
      <figure className="relative">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        {property.isFeatured && (
          <div className="badge badge-accent absolute top-4 left-4">Featured</div>
        )}
        <div className="badge badge-primary absolute top-4 right-4">
          ${property.price.toLocaleString()}
        </div>
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2 text-sm text-base-content/60 mb-2">
          📍 {property.location}
        </div>
        <h3 className="card-title">{property.title}</h3>
        <p className="text-base-content/80 text-sm line-clamp-2">
          {property.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-base-content/70 mt-4">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📐 {property.squareFeet.toLocaleString()} sq ft</span>
        </div>
        <PropertyCardActions
          property={property}
          onViewDetails={onViewDetails}
          onContact={onContact}
        />
      </div>
    </div>
  );
}
