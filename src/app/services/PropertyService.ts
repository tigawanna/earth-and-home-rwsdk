import { db } from '@/db';
import type { Property as PrismaProperty, PropertyStatus } from '@generated/prisma';

// Transform Prisma Property to our UI Property type
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // Display price (dollars)
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
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
    location: prismaProperty.location,
    price: Math.round(prismaProperty.price / 100), // Convert cents to dollars
    description: prismaProperty.description,
    bedrooms: prismaProperty.bedrooms,
    bathrooms: prismaProperty.bathrooms,
    squareFeet: prismaProperty.squareFeet,
    imageUrl: prismaProperty.imageUrl || `https://picsum.photos/400/250?random=${prismaProperty.id.slice(-1)}`,
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
    price: 850000,
    description: 'Stunning 4-bedroom villa with panoramic city views, modern amenities, and elegant design.',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2500,
    imageUrl: 'https://picsum.photos/400/250?random=1',
    isFeatured: true,
    status: 'for-sale'
  },
  {
    id: '2',
    title: 'Suburban Paradise',
    location: 'Portland, OR',
    price: 625000,
    description: 'Charming family home with spacious yard, updated kitchen, and quiet neighborhood.',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    imageUrl: 'https://picsum.photos/400/250?random=2',
    isFeatured: true,
    status: 'for-sale'
  },
  {
    id: '3',
    title: 'Elegant Townhouse',
    location: 'Chicago, IL',
    price: 580000,
    description: 'Stylish townhouse in prime location with modern finishes and city conveniences.',
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1900,
    imageUrl: 'https://picsum.photos/400/250?random=3',
    isFeatured: true,
    status: 'for-sale'
  },
  {
    id: '4',
    title: 'Cozy Cottage',
    location: 'Austin, TX',
    price: 425000,
    description: 'Charming cottage with rustic charm and modern updates in a desirable neighborhood.',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    imageUrl: 'https://picsum.photos/400/250?random=4',
    isFeatured: false,
    status: 'for-sale'
  },
  {
    id: '5',
    title: 'Waterfront Condo',
    location: 'Miami, FL',
    price: 950000,
    description: 'Luxurious waterfront condominium with breathtaking ocean views and premium amenities.',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    imageUrl: 'https://picsum.photos/400/250?random=5',
    isFeatured: false,
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

  // Search properties
  static async searchProperties(query: string): Promise<Property[]> {
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
}
