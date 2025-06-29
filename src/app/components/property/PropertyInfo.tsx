import type { Property } from '@/app/services/PropertyService';
import { IoBedOutline, IoCarOutline, IoSquareOutline, IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPropertyType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace('_', ' ');
  };

  const formatSquareFeet = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'for-sale':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'sold':
        return 'badge-error';
      case 'off-market':
        return 'badge-neutral';
      default:
        return 'badge-primary';
    }
  };

  const formatStatus = (status?: string) => {
    if (!status) return 'Available';
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-base-content mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-base-content/70">
              <IoLocationOutline className="w-5 h-5" />
              <span className="text-lg">{property.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-2">
              {formatPrice(property.price)}
            </div>
            <div className={`badge ${getStatusColor(property.status)}`}>
              {formatStatus(property.status)}
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-base-200 rounded-lg mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <IoBedOutline className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-base-content">{property.bedrooms}</div>
            <div className="text-sm text-base-content/70">
              {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <IoCarOutline className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-base-content">{property.bathrooms}</div>
            <div className="text-sm text-base-content/70">
              {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <IoSquareOutline className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-base-content">
              {formatSquareFeet(property.squareFeet)}
            </div>
            <div className="text-sm text-base-content/70">Sq Ft</div>
          </div>
          
          {property.yearBuilt && (
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <IoCalendarOutline className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-base-content">{property.yearBuilt}</div>
              <div className="text-sm text-base-content/70">Year Built</div>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-base-content">Property Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-base-content/70">Property Type:</span>
                <span className="font-medium">{formatPropertyType(property.propertyType)}</span>
              </div>
              {property.city && (
                <div className="flex justify-between">
                  <span className="text-base-content/70">City:</span>
                  <span className="font-medium">{property.city}</span>
                </div>
              )}
              {property.state && (
                <div className="flex justify-between">
                  <span className="text-base-content/70">State:</span>
                  <span className="font-medium">{property.state}</span>
                </div>
              )}
              {property.zipCode && (
                <div className="flex justify-between">
                  <span className="text-base-content/70">ZIP Code:</span>
                  <span className="font-medium">{property.zipCode}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-base-content/70">Bedrooms:</span>
                <span className="font-medium">{property.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Bathrooms:</span>
                <span className="font-medium">{property.bathrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Square Feet:</span>
                <span className="font-medium">{formatSquareFeet(property.squareFeet)}</span>
              </div>
              {property.yearBuilt && (
                <div className="flex justify-between">
                  <span className="text-base-content/70">Year Built:</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-base-content">Description</h2>
          <p className="text-base-content/80 leading-relaxed">{property.description}</p>
        </div>
      </div>
    </div>
  );
}
