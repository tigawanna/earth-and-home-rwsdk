import type { Property } from '@/app/services/PropertyService';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

interface PropertyFeaturesProps {
  property: Property;
}

export function PropertyFeatures({ property }: PropertyFeaturesProps) {
  if (!property.features || property.features.length === 0) {
    return null;
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body">
        <h2 className="text-xl font-semibold text-base-content mb-4">Property Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <IoCheckmarkCircleOutline className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-base-content">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
