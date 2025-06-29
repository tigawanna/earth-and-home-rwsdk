'use client';

import { useState, useEffect } from 'react';
import { PropertyOverlay } from '../home/PropertyOverlay';
import { CarouselIndicators } from './CarouselControls';
import { CarouselSlide } from './CarouselSlide';

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

interface HeroSectionCarousselProps {
  properties: Property[];
}

export function HeroSectionCaroussel({ properties }: HeroSectionCarousselProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter featured properties or fallback to first few
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 3) || properties.slice(0, 3);
  const firstProperty = featuredProperties[0];

  // Auto-scroll effect
  useEffect(() => {
    if (!mounted || featuredProperties.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % featuredProperties.length
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [mounted, featuredProperties.length, isPaused]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProperties.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + featuredProperties.length) % featuredProperties.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // SSR: Show only first image
  if (!mounted || !firstProperty) {
    return <StaticHeroImage property={firstProperty} />;
  }

  // Client: Show full carousel
  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel w-full h-full">
        {featuredProperties.map((property, index) => (
          <CarouselSlide
            key={property.id}
            property={property}
            index={index}
            isActive={index === currentIndex}
            onNext={goToNext}
            onPrev={goToPrev}
          />
        ))}
      </div>
      
      <CarouselIndicators
        total={featuredProperties.length}
        current={currentIndex}
        onChange={goToSlide}
      />
    </div>
  );
}

// Static image component for SSR
function StaticHeroImage({ property }: { property?: Property }) {
  if (!property) return null;

  return (
    <div className="relative w-full h-full">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-full object-cover"
      />
      <PropertyOverlay property={property} />
    </div>
  );
}
