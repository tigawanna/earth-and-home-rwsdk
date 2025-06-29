"use client";

import { useState } from 'react';
import type { Property } from '@/app/services/PropertyService';
import { IoChevronBackOutline, IoChevronForwardOutline, IoClose } from 'react-icons/io5';

interface PropertyGalleryProps {
  property: Property;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get all images (fallback to main image if no gallery)
  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.imageUrl];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Gallery Section */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={images[selectedImage]}
            alt={property.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openModal(selectedImage)}
          />
          
          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>
          
          {/* Navigation Arrows (only show if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <IoChevronBackOutline className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Next image"
              >
                <IoChevronForwardOutline className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Grid (only show if multiple images) */}
        {images.length > 1 && (
          <div className="p-4 bg-base-200">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-base-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Close gallery"
            >
              <IoClose className="w-8 h-8" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  aria-label="Previous image"
                >
                  <IoChevronBackOutline className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  aria-label="Next image"
                >
                  <IoChevronForwardOutline className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Full Size Image */}
            <img
              src={images[selectedImage]}
              alt={property.title}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
