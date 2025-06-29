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

export function PropertyOverlay({ property }: { property: Property }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
      <div className="absolute bottom-8 left-8 text-white">
        <div className="badge badge-accent mb-2">Featured</div>
        <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
        <p className="text-lg mb-2">📍 {property.location}</p>
        <p className="text-3xl font-bold text-accent">${property.price.toLocaleString()}</p>
        <div className="flex gap-4 mt-2 text-sm">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📐 {property.squareFeet.toLocaleString()} sq ft</span>
        </div>
      </div>
    </div>
  );
}
