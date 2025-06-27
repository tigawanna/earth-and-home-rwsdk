import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";
import { env } from "cloudflare:workers";

export default defineScript(async () => {
  await setupDb(env);

  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.$executeRawUnsafe(`\
    DELETE FROM PropertyFavorite;
    DELETE FROM Property;
    DELETE FROM User;
    DELETE FROM sqlite_sequence;
  `);

  // Create a sample user (property lister)
  const user = await db.user.create({
    data: {
      id: "1",
      username: "admin",
    },
  });

  console.log("👤 Created user:", user.username);

  // Create sample properties
  const properties = [
    {
      title: "Modern Luxury Villa",
      description: "Stunning 4-bedroom villa with panoramic city views, modern amenities, and elegant design. Features include a gourmet kitchen, spacious living areas, and a beautiful outdoor terrace.",
      location: "Beverly Hills, CA",
      price: 85000000, // $850,000 in cents
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2500,
      imageUrl: "https://picsum.photos/400/250?random=1",
      isFeatured: true,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Suburban Paradise",
      description: "Charming family home with spacious yard, updated kitchen, and quiet neighborhood. Perfect for families with children, featuring a large backyard and excellent school district.",
      location: "Portland, OR",
      price: 62500000, // $625,000 in cents
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2200,
      imageUrl: "https://picsum.photos/400/250?random=2",
      isFeatured: true,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Elegant Townhouse",
      description: "Stylish townhouse in prime location with modern finishes and city conveniences. Walking distance to restaurants, shopping, and public transportation.",
      location: "Chicago, IL",
      price: 58000000, // $580,000 in cents
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 1900,
      imageUrl: "https://picsum.photos/400/250?random=3",
      isFeatured: true,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Cozy Cottage",
      description: "Charming cottage with rustic charm and modern updates in a desirable neighborhood. Features original hardwood floors and a renovated kitchen.",
      location: "Austin, TX",
      price: 42500000, // $425,000 in cents
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1600,
      imageUrl: "https://picsum.photos/400/250?random=4",
      isFeatured: false,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Waterfront Condo",
      description: "Luxurious waterfront condominium with breathtaking ocean views and premium amenities. Building features include pool, gym, and 24-hour concierge.",
      location: "Miami, FL",
      price: 95000000, // $950,000 in cents
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1800,
      imageUrl: "https://picsum.photos/400/250?random=5",
      isFeatured: false,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Mountain Retreat",
      description: "Peaceful mountain cabin with stunning views and modern amenities. Perfect for weekend getaways or year-round living in nature.",
      location: "Aspen, CO",
      price: 72000000, // $720,000 in cents
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1400,
      imageUrl: "https://picsum.photos/400/250?random=6",
      isFeatured: false,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Downtown Loft",
      description: "Spacious urban loft with high ceilings, exposed brick, and modern fixtures. Located in the heart of the arts district.",
      location: "Seattle, WA",
      price: 54000000, // $540,000 in cents
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1300,
      imageUrl: "https://picsum.photos/400/250?random=7",
      isFeatured: false,
      status: "FOR_SALE" as const,
      listerId: user.id
    },
    {
      title: "Historic Mansion",
      description: "Beautifully restored historic mansion with original details and modern conveniences. Grand staircase, formal dining room, and library.",
      location: "Savannah, GA",
      price: 125000000, // $1,250,000 in cents
      bedrooms: 6,
      bathrooms: 4,
      squareFeet: 4200,
      imageUrl: "https://picsum.photos/400/250?random=8",
      isFeatured: false,
      status: "FOR_SALE" as const,
      listerId: user.id
    }
  ];

  console.log("🏠 Creating properties...");

  for (const property of properties) {
    const created = await db.property.create({
      data: property
    });
    console.log(`✅ Created property: ${created.title} in ${created.location}`);
  }

  // Add some sold properties for stats
  const soldProperty = await db.property.create({
    data: {
      title: "Sold Family Home",
      description: "Recently sold beautiful family home in excellent condition.",
      location: "Phoenix, AZ",
      price: 45000000, // $450,000 in cents
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      imageUrl: "https://picsum.photos/400/250?random=9",
      isFeatured: false,
      status: "SOLD",
      listerId: user.id
    }
  });

  console.log(`✅ Created sold property: ${soldProperty.title}`);

  const totalProperties = await db.property.count();
  const featuredProperties = await db.property.count({ where: { isFeatured: true } });
  const soldProperties = await db.property.count({ where: { status: "SOLD" } });

  console.log("\n📊 Database Statistics:");
  console.log(`Total Properties: ${totalProperties}`);
  console.log(`Featured Properties: ${featuredProperties}`);
  console.log(`Sold Properties: ${soldProperties}`);
  console.log("\n🎉 Seeding completed successfully!");
});
