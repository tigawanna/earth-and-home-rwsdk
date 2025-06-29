
import { HeroSectionCaroussel } from './HeroSectionCaroussel';

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

interface HeroSectionProps {
  stats?: {
    propertiesListed: number;
    happyFamilies: number;
    yearsExperience: number;
  };
  featuredProperties?: Property[];
}

export function HeroSection({ stats, featuredProperties = [] }: HeroSectionProps) {
  const defaultStats = {
    propertiesListed: 1200,
    happyFamilies: 500,
    yearsExperience: 15,
    ...stats
  };

  return (
    <section className="hero min-h-[700px] bg-gradient-to-br from-secondary/30 via-secondary/10 to-base-200 py-16">
      <div className="hero-content max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
          
          {/* Left side - Text content and stats */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-base-content mb-6 leading-tight">
              Find Your Perfect <span className="text-primary">Dream Home</span>
            </h1>
            <p className="text-xl text-base-content/80 mb-8 leading-relaxed max-w-lg">
              Discover exceptional properties with Earth & Home. From luxury estates to cozy family homes, 
              we connect you with the perfect place to call home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="btn btn-primary btn-lg">
                🔍 Browse Properties
              </button>
              <button className="btn btn-outline btn-lg">
                🏡 Sell Your Home
              </button>
            </div>

            {/* Stats section - shown at bottom on mobile, integrated on desktop */}
            <div className="lg:hidden mb-8">
              <div className="stats stats-vertical shadow-lg bg-base-100/80 w-full max-w-sm mx-auto">
                <div className="stat text-center py-4">
                  <div className="stat-value text-primary text-2xl">{defaultStats.propertiesListed.toLocaleString()}+</div>
                  <div className="stat-title text-sm">Properties Listed</div>
                </div>
                <div className="stat text-center py-4">
                  <div className="stat-value text-accent text-2xl">{defaultStats.happyFamilies.toLocaleString()}+</div>
                  <div className="stat-title text-sm">Happy Families</div>
                </div>
                <div className="stat text-center py-4">
                  <div className="stat-value text-success text-2xl">{defaultStats.yearsExperience}+</div>
                  <div className="stat-title text-sm">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Desktop stats - integrated with text */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{defaultStats.propertiesListed.toLocaleString()}+</div>
                  <div className="text-sm text-base-content/70">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{defaultStats.happyFamilies.toLocaleString()}+</div>
                  <div className="text-sm text-base-content/70">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{defaultStats.yearsExperience}+</div>
                  <div className="text-sm text-base-content/70">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Featured Properties Card */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="card bg-base-100 shadow-2xl border border-base-300/20 overflow-hidden">
              <div className="card-body p-0">
                <div className="h-[450px] lg:h-[500px]">
                  <HeroSectionCaroussel properties={featuredProperties} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
