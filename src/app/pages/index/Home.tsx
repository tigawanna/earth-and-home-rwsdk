import { RequestInfo } from "rwsdk/worker";
import { HeroSection } from "@/components/home/HeroSection";
import { PropertySearch } from "@/components/home/PropertySearch";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { UserStatus } from "@/components/home/UserStatus";
import { mockProperties } from "@/app/services/PropertyService";


export function Home({ ctx }: RequestInfo) {
  // In the future, these will be async calls to Prisma
  // For now, using mock data
  const featuredProperties = mockProperties.filter(p => p.isFeatured);

  // const handlePropertySearch = (searchParams: any) => {
  //   // TODO: Implement search functionality
  //   console.log('Search params:', searchParams);
  // };

  return (
    <div>
      <HeroSection 
        stats={{
          propertiesListed: 1200,
          happyFamilies: 500,
          yearsExperience: 15
        }}
        featuredProperties={featuredProperties}
      />

      <PropertySearch  />

      <FeaturedProperties
        properties={featuredProperties}
      />

      <WhyChooseUs />

      <UserStatus 
        user={ctx.user}
      />
    </div>
  );
}
