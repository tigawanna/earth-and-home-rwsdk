import { PropertyOverlay } from '../home/PropertyOverlay';
import { CarouselNavButtons } from './CarouselControls';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  isFeatured?: boolean;
}

export function CarouselSlide({ 
  property, 
  index, 
  isActive, 
  onNext, 
  onPrev 
}: { 
  property: Property; 
  index: number; 
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div 
      id={`slide${index}`}
      className={`carousel-item relative w-full h-full ${isActive ? 'block' : 'hidden'}`}
    >
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-full object-cover"
      />
      <PropertyOverlay property={property} />
      <CarouselNavButtons onNext={onNext} onPrev={onPrev} />
    </div>
  );
}
