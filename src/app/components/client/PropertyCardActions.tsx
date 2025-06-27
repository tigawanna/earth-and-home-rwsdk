'use client';

import type { Property } from '@/components/property/PropertyCard';

interface PropertyCardActionsProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
  onContact?: (property: Property) => void;
}

export function PropertyCardActions({ property, onViewDetails, onContact }: PropertyCardActionsProps) {
  const handleViewDetails = () => {
    onViewDetails?.(property);
  };

  const handleContact = () => {
    onContact?.(property);
  };

  return (
    <div className="card-actions justify-between mt-4">
      <button 
        className="btn btn-primary btn-sm"
        onClick={handleViewDetails}
      >
        View Details
      </button>
      <button 
        className="btn btn-outline btn-sm"
        onClick={handleContact}
      >
        Contact
      </button>
    </div>
  );
}
