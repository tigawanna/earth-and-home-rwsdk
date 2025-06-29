import { db } from '@/db';
import type { Property as PrismaProperty, PropertyStatus, PropertyType } from '@generated/prisma';

// Search parameters interface
export interface PropertySearchParams {
  location?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  yearBuiltMin?: number;
  yearBuiltMax?: number;
  features?: string[];
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'createdAt' | 'squareFeet' | 'bedrooms';
  sortOrder?: 'asc' | 'desc';
}

// Transform Prisma Property to our UI Property type
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  city?: string;
  state?: string;
  zipCode?: string;
  price: number; // Display price (dollars)
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt?: number;
  imageUrl: string;
  images?: string[];
  features?: string[];
  isFeatured?: boolean;
  status?: 'for-sale' | 'sold' | 'pending' | 'off-market';
  createdAt?: Date;
  updatedAt?: Date;
}

// Transform Prisma property to UI property
function transformProperty(prismaProperty: PrismaProperty): Property {
  return {
    id: prismaProperty.id,
    title: prismaProperty.title,
    description: prismaProperty.description,
    location: prismaProperty.location,
    city: prismaProperty.city || undefined,
    state: prismaProperty.state || undefined,
    zipCode: prismaProperty.zipCode || undefined,
    price: Math.round(prismaProperty.price / 100), // Convert cents to dollars
    propertyType: prismaProperty.propertyType,
    bedrooms: prismaProperty.bedrooms,
    bathrooms: prismaProperty.bathrooms,
    squareFeet: prismaProperty.squareFeet,
    yearBuilt: prismaProperty.yearBuilt || undefined,
    imageUrl: prismaProperty.imageUrl || `https://picsum.photos/400/250?random=${prismaProperty.id.slice(-1)}`,
    images: prismaProperty.imagesJson ? JSON.parse(prismaProperty.imagesJson) : undefined,
    features: prismaProperty.featuresJson ? JSON.parse(prismaProperty.featuresJson) : undefined,
    isFeatured: prismaProperty.isFeatured,
    status: prismaProperty.status.toLowerCase().replace('_', '-') as Property['status'],
    createdAt: prismaProperty.createdAt,
    updatedAt: prismaProperty.updatedAt,
  };
}

// Mock data for development - will be removed when database is populated
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    location: 'Beverly Hills, CA',
    city: 'Beverly Hills',
    state: 'CA',
    zipCode: '90210',
    price: 850000,
    propertyType: 'VILLA' as PropertyType,
    description: 'Stunning 4-bedroom villa with panoramic city views, modern amenities, and elegant design.',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2500,
    yearBuilt: 2020,
    imageUrl: 'https://picsum.photos/400/250?random=1',
    features: ['Pool', 'Garage', 'Garden', 'City View'],
    isFeatured: true,
    status: 'for-sale'
  },
  {
    id: '2',
    title: 'Suburban Paradise',
    location: 'Portland, OR',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    price: 625000,
    propertyType: 'HOUSE' as PropertyType,
    description: 'Charming family home with spacious yard, updated kitchen, and quiet neighborhood.',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    yearBuilt: 2015,
    imageUrl: 'https://picsum.photos/400/250?random=2',
    features: ['Garage', 'Garden', 'Updated Kitchen'],
    isFeatured: true,
    status: 'for-sale'
  },
  {
    id: '3',
    title: 'Elegant Townhouse',
    location: 'Chicago, IL',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    price: 580000,
    propertyType: 'TOWNHOUSE' as PropertyType,
    description: 'Stylish townhouse in prime location with modern finishes and city conveniences.',
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1900,
    yearBuilt: 2018,
    imageUrl: 'https://picsum.photos/400/250?random=3',
    features: ['Garage', 'Modern Finishes'],
    isFeatured: true,
    status: 'for-sale'
  },
  {
    id: '4',
    title: 'Cozy Cottage',
    location: 'Austin, TX',
    city: 'Austin',
    state: 'TX',
    zipCode: '73301',
    price: 425000,
    propertyType: 'HOUSE' as PropertyType,
    description: 'Charming cottage with rustic charm and modern updates in a desirable neighborhood.',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    yearBuilt: 2010,
    imageUrl: 'https://picsum.photos/400/250?random=4',
    features: ['Garden', 'Rustic Charm'],
    isFeatured: false,
    status: 'for-sale'
  },
  {
    id: '5',
    title: 'Waterfront Condo',
    location: 'Miami, FL',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    price: 950000,
    propertyType: 'CONDO' as PropertyType,
    description: 'Luxurious waterfront condominium with breathtaking ocean views and premium amenities.',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    yearBuilt: 2022,
    imageUrl: 'https://picsum.photos/400/250?random=5',
    features: ['Ocean View', 'Premium Amenities', 'Waterfront'],
    isFeatured: false,
    status: 'for-sale'
  },
  {
    id: '6',
    title: 'Downtown Loft',
    location: 'New York, NY',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    price: 1200000,
    propertyType: 'APARTMENT' as PropertyType,
    description: 'Stunning loft apartment in the heart of downtown with exposed brick and high ceilings.',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1400,
    yearBuilt: 2005,
    imageUrl: 'https://picsum.photos/400/250?random=6',
    features: ['Exposed Brick', 'High Ceilings', 'Downtown Location'],
    isFeatured: false,
    status: 'for-sale'
  },
  {
    id: '7',
    title: 'Suburban Estate',
    location: 'Denver, CO',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    price: 775000,
    propertyType: 'HOUSE' as PropertyType,
    description: 'Spacious estate home with mountain views, large kitchen, and entertaining spaces.',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3200,
    yearBuilt: 2012,
    imageUrl: 'https://picsum.photos/400/250?random=7',
    features: ['Mountain View', 'Large Kitchen', 'Pool', 'Garage'],
    isFeatured: false,
    status: 'for-sale'
  },
  {
    id: '8',
    title: 'Beachfront Villa',
    location: 'San Diego, CA',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    price: 1850000,
    propertyType: 'VILLA' as PropertyType,
    description: 'Luxury beachfront villa with private beach access and stunning ocean views.',
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 2800,
    yearBuilt: 2019,
    imageUrl: 'https://picsum.photos/400/250?random=8',
    features: ['Beach Access', 'Ocean View', 'Pool', 'Garage', 'Garden'],
    isFeatured: true,
    status: 'for-sale'
  }
];

// Service functions using Prisma
export class PropertyService {
  // Get featured properties from database
  static async getFeaturedProperties(): Promise<Property[]> {
    try {
      const properties = await db.property.findMany({
        where: { 
          isFeatured: true,
          status: 'FOR_SALE'
        },
        take: 3,
        orderBy: { createdAt: 'desc' }
      });
      
      return properties.map(transformProperty);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      // Fallback to mock data
      return mockProperties.filter(p => p.isFeatured);
    }
  }

  // Get all properties with pagination
  static async getAllProperties(limit: number = 20, offset: number = 0): Promise<Property[]> {
    try {
      const properties = await db.property.findMany({
        where: { status: 'FOR_SALE' },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
      
      return properties.map(transformProperty);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to mock data
      return mockProperties.slice(offset, offset + limit);
    }
  }

  // Get property by ID
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      const property = await db.property.findUnique({
        where: { id }
      });
      
      return property ? transformProperty(property) : null;
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      // Fallback to mock data
      return mockProperties.find(p => p.id === id) || null;
    }
  }

  // Search properties (legacy - simple text search)
  static async searchPropertiesSimple(query: string): Promise<Property[]> {
    try {
      const properties = await db.property.findMany({
        where: {
          AND: [
            { status: 'FOR_SALE' },
            {
              OR: [
                { title: { contains: query } },
                { description: { contains: query } },
                { location: { contains: query } }
              ]
            }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });
      
      return properties.map(transformProperty);
    } catch (error) {
      console.error('Error searching properties:', error);
      // Fallback to mock data search
      return mockProperties.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  // Get properties by price range
  static async getPropertiesByPriceRange(minPrice: number, maxPrice: number): Promise<Property[]> {
    try {
      const properties = await db.property.findMany({
        where: {
          status: 'FOR_SALE',
          price: {
            gte: minPrice * 100, // Convert to cents
            lte: maxPrice * 100  // Convert to cents
          }
        },
        orderBy: { price: 'asc' }
      });
      
      return properties.map(transformProperty);
    } catch (error) {
      console.error('Error fetching properties by price range:', error);
      // Fallback to mock data
      return mockProperties.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
  }

  // Get statistics for hero section
  static async getStats(): Promise<{ propertiesListed: number; happyFamilies: number; yearsExperience: number }> {
    try {
      const totalProperties = await db.property.count();
      const soldProperties = await db.property.count({
        where: { status: 'SOLD' }
      });
      
      return {
        propertiesListed: totalProperties,
        happyFamilies: soldProperties,
        yearsExperience: 15 // This could be calculated based on earliest property date
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to default stats
      return {
        propertiesListed: 1200,
        happyFamilies: 500,
        yearsExperience: 15
      };
    }
  }

  // Create a new property (for admin/agent use)
  static async createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> & { listerId: string }): Promise<Property> {
    const property = await db.property.create({
      data: {
        title: propertyData.title,
        description: propertyData.description,
        location: propertyData.location,
        price: propertyData.price * 100, // Convert to cents
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        squareFeet: propertyData.squareFeet,
        imageUrl: propertyData.imageUrl,
        isFeatured: propertyData.isFeatured || false,
        status: (propertyData.status?.toUpperCase().replace('-', '_') as PropertyStatus) || 'FOR_SALE',
        listerId: propertyData.listerId
      }
    });
    
    return transformProperty(property);
  }

  // Advanced search properties with filters
  static async searchProperties(params: PropertySearchParams): Promise<{
    properties: Property[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      location,
      propertyType,
      priceMin,
      priceMax,
      bedrooms,
      bathrooms,
      minSquareFeet,
      maxSquareFeet,
      yearBuiltMin,
      yearBuiltMax,
      features = [],
      status = 'for-sale',
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params;

    try {
      // Build where clause
      const where: any = {
        status: status.toUpperCase().replace('-', '_') as PropertyStatus
      };

      // Location filtering (search in location, city, state, zipCode)
      if (location && location.trim() !== '') {
        where.OR = [
          { location: { contains: location, mode: 'insensitive' } },
          { city: { contains: location, mode: 'insensitive' } },
          { state: { contains: location, mode: 'insensitive' } },
          { zipCode: { contains: location, mode: 'insensitive' } }
        ];
      }

      // Property type filtering
      if (propertyType && propertyType !== 'Any Type') {
        where.propertyType = propertyType.toUpperCase() as PropertyType;
      }

      // Price filtering (convert to cents)
      if (priceMin !== undefined) {
        where.price = { ...where.price, gte: priceMin * 100 };
      }
      if (priceMax !== undefined) {
        where.price = { ...where.price, lte: priceMax * 100 };
      }

      // Bedroom filtering
      if (bedrooms !== undefined && bedrooms > 0) {
        where.bedrooms = { gte: bedrooms };
      }

      // Bathroom filtering
      if (bathrooms !== undefined && bathrooms > 0) {
        where.bathrooms = { gte: bathrooms };
      }

      // Square feet filtering
      if (minSquareFeet !== undefined) {
        where.squareFeet = { ...where.squareFeet, gte: minSquareFeet };
      }
      if (maxSquareFeet !== undefined) {
        where.squareFeet = { ...where.squareFeet, lte: maxSquareFeet };
      }

      // Year built filtering
      if (yearBuiltMin !== undefined) {
        where.yearBuilt = { ...where.yearBuilt, gte: yearBuiltMin };
      }
      if (yearBuiltMax !== undefined) {
        where.yearBuilt = { ...where.yearBuilt, lte: yearBuiltMax };
      }

      // Features filtering (check if JSON contains all requested features)
      if (features.length > 0) {
        // For SQLite with JSON, we'll need to filter in memory
        // In production, consider using a proper search engine or separate feature table
      }

      // Build orderBy clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const skip = (page - 1) * limit;

      // Get total count
      const total = await db.property.count({ where });

      // Get properties
      const properties = await db.property.findMany({
        where,
        orderBy,
        take: limit,
        skip
      });

      let filteredProperties = properties.map(transformProperty);

      // Client-side feature filtering (since SQLite JSON querying is limited)
      if (features.length > 0) {
        filteredProperties = filteredProperties.filter(property => {
          const propertyFeatures = property.features || [];
          return features.every(feature => 
            propertyFeatures.some(pf => 
              pf.toLowerCase().includes(feature.toLowerCase())
            )
          );
        });
      }

      const totalPages = Math.ceil(total / limit);

      return {
        properties: filteredProperties,
        total,
        page,
        totalPages
      };
    } catch (error) {
      console.error('Error searching properties:', error);
      
      // Fallback to mock data with client-side filtering
      let filteredProperties = mockProperties.filter(p => {
        // Status filter
        if (p.status !== status) return false;
        
        // Location filter
        if (location && location.trim() !== '') {
          const searchTerm = location.toLowerCase();
          const matchesLocation = 
            p.location.toLowerCase().includes(searchTerm) ||
            p.city?.toLowerCase().includes(searchTerm) ||
            p.state?.toLowerCase().includes(searchTerm) ||
            p.zipCode?.toLowerCase().includes(searchTerm);
          if (!matchesLocation) return false;
        }
        
        // Property type filter
        if (propertyType && propertyType !== 'Any Type') {
          if (p.propertyType !== propertyType.toUpperCase()) return false;
        }
        
        // Price filters
        if (priceMin !== undefined && p.price < priceMin) return false;
        if (priceMax !== undefined && p.price > priceMax) return false;
        
        // Bedroom filter
        if (bedrooms !== undefined && bedrooms > 0 && p.bedrooms < bedrooms) return false;
        
        // Bathroom filter
        if (bathrooms !== undefined && bathrooms > 0 && p.bathrooms < bathrooms) return false;
        
        // Square feet filters
        if (minSquareFeet !== undefined && p.squareFeet < minSquareFeet) return false;
        if (maxSquareFeet !== undefined && p.squareFeet > maxSquareFeet) return false;
        
        // Year built filters
        if (yearBuiltMin !== undefined && (!p.yearBuilt || p.yearBuilt < yearBuiltMin)) return false;
        if (yearBuiltMax !== undefined && (!p.yearBuilt || p.yearBuilt > yearBuiltMax)) return false;
        
        // Features filter
        if (features.length > 0) {
          const propertyFeatures = p.features || [];
          const hasAllFeatures = features.every(feature => 
            propertyFeatures.some(pf => 
              pf.toLowerCase().includes(feature.toLowerCase())
            )
          );
          if (!hasAllFeatures) return false;
        }
        
        return true;
      });

      // Sort filtered properties
      filteredProperties.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'squareFeet':
            aValue = a.squareFeet;
            bValue = b.squareFeet;
            break;
          case 'bedrooms':
            aValue = a.bedrooms;
            bValue = b.bedrooms;
            break;
          case 'createdAt':
          default:
            aValue = a.createdAt?.getTime() || 0;
            bValue = b.createdAt?.getTime() || 0;
            break;
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      const total = filteredProperties.length;
      const skip = (page - 1) * limit;
      const paginatedProperties = filteredProperties.slice(skip, skip + limit);
      const totalPages = Math.ceil(total / limit);

      return {
        properties: paginatedProperties,
        total,
        page,
        totalPages
      };
    }
  }

  // Helper function to parse URL search params
  static parseSearchParams(searchParams: URLSearchParams): PropertySearchParams {
    const params: PropertySearchParams = {};
    
    const location = searchParams.get('location');
    if (location) params.location = location;
    
    const propertyType = searchParams.get('propertyType');
    if (propertyType) params.propertyType = propertyType;
    
    const priceMin = searchParams.get('priceMin');
    if (priceMin) params.priceMin = parseInt(priceMin);
    
    const priceMax = searchParams.get('priceMax');
    if (priceMax) params.priceMax = parseInt(priceMax);
    
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) params.bedrooms = parseInt(bedrooms);
    
    const bathrooms = searchParams.get('bathrooms');
    if (bathrooms) params.bathrooms = parseInt(bathrooms);
    
    const minSquareFeet = searchParams.get('minSquareFeet');
    if (minSquareFeet) params.minSquareFeet = parseInt(minSquareFeet);
    
    const maxSquareFeet = searchParams.get('maxSquareFeet');
    if (maxSquareFeet) params.maxSquareFeet = parseInt(maxSquareFeet);
    
    const yearBuiltMin = searchParams.get('yearBuiltMin');
    if (yearBuiltMin) params.yearBuiltMin = parseInt(yearBuiltMin);
    
    const yearBuiltMax = searchParams.get('yearBuiltMax');
    if (yearBuiltMax) params.yearBuiltMax = parseInt(yearBuiltMax);
    
    const features = searchParams.get('features');
    if (features) params.features = features.split(',');
    
    const status = searchParams.get('status');
    if (status) params.status = status;
    
    const page = searchParams.get('page');
    if (page) params.page = parseInt(page);
    
    const limit = searchParams.get('limit');
    if (limit) params.limit = parseInt(limit);
    
    const sortBy = searchParams.get('sortBy');
    if (sortBy) params.sortBy = sortBy as PropertySearchParams['sortBy'];
    
    const sortOrder = searchParams.get('sortOrder');
    if (sortOrder) params.sortOrder = sortOrder as PropertySearchParams['sortOrder'];
    
    return params;
  }

  // Helper function to convert search params to URL search params
  static searchParamsToURLParams(params: PropertySearchParams): URLSearchParams {
    const urlParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          urlParams.set(key, value.join(','));
        } else {
          urlParams.set(key, value.toString());
        }
      }
    });
    
    return urlParams;
  }
}
