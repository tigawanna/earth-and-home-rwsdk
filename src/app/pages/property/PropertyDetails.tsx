import { PropertyService } from '@/app/services/PropertyService';
import { PropertyGallery } from '@/app/components/property/PropertyGallery';
import { PropertyInfo } from '@/app/components/property/PropertyInfo';
import { PropertyFeatures } from '@/app/components/property/PropertyFeatures';
import { ContactAgent } from '@/app/components/property/ContactAgent';
import { SimilarProperties } from '@/app/components/property/SimilarProperties';
import { PropertyNotFound } from '@/app/components/property/PropertyNotFound';

interface PropertyDetailsProps {
  params: { id: string };
}

export async function PropertyDetails({ params }: PropertyDetailsProps) {
  const property = await PropertyService.getPropertyById(params.id);

  if (!property) {
    return <PropertyNotFound />;
  }

  // Get similar properties (same type, similar price range)
  const similarProperties = await PropertyService.searchProperties({
    propertyType: property.propertyType,
    priceMin: Math.max(0, property.price - 100000),
    priceMax: property.price + 100000,
    limit: 4,
  });

  // Filter out the current property from similar properties
  const filteredSimilarProperties = similarProperties.properties.filter(p => p.id !== property.id);

  return (
    <>
      {/* Property Gallery */}
      <PropertyGallery property={property} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Information */}
            <PropertyInfo property={property} />
            
            {/* Property Features */}
            <PropertyFeatures property={property} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ContactAgent property={property} />
          </div>
        </div>
        
        {/* Similar Properties */}
        {filteredSimilarProperties.length > 0 && (
          <div className="mt-16">
            <SimilarProperties properties={filteredSimilarProperties} />
          </div>
        )}
      </div>
    </>
  );
}
