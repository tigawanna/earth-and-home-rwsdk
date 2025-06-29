'use client';

import { Property } from '@/app/services/PropertyService';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <figure className="relative overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.isFeatured && (
          <div className="badge badge-accent absolute top-4 left-4">
            Featured
          </div>
        )}
        <div className="badge badge-primary absolute top-4 right-4">
          {property.status?.replace('-', ' ').toUpperCase()}
        </div>
      </figure>
      
      <div className="card-body p-6">
        <h3 className="card-title text-lg font-bold text-base-content mb-2">
          {property.title}
        </h3>
        
        <p className="text-base-content/70 mb-3">
          📍 {property.location}
        </p>
        
        <div className="text-2xl font-bold text-primary mb-3">
          ${property.price.toLocaleString()}
        </div>
        
        <div className="flex justify-between text-sm text-base-content/70 mb-4">
          <span>🛏️ {property.bedrooms} beds</span>
          <span>🚿 {property.bathrooms} baths</span>
          <span>📐 {property.squareFeet.toLocaleString()} sq ft</span>
        </div>
        
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.slice(0, 3).map((feature) => (
              <span key={feature} className="badge badge-outline badge-sm">
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="badge badge-outline badge-sm">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => window.location.href = `/property/${property.id}`}
          >
            View Details
          </button>
          <button className="btn btn-outline btn-sm">
            ❤️ Save
          </button>
        </div>
      </div>
    </div>
  );
}
