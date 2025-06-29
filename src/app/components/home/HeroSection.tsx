
interface HeroSectionProps {
  stats?: {
    propertiesListed: number;
    happyFamilies: number;
    yearsExperience: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const defaultStats = {
    propertiesListed: 1200,
    happyFamilies: 500,
    yearsExperience: 15,
    ...stats
  };

  return (
    <section className="hero min-h-[600px] bg-gradient-to-br from-secondary/30  via-secondary/10 to-base-200">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
        <div className="min-h-[50vh] flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-base-content mb-4">
            Find Your Perfect <span className="text-primary">Dream Home</span>
          </h1>
          <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
            Discover exceptional properties with Earth & Home. From luxury estates to cozy family homes, 
            we connect you with the perfect place to call home.
          </p>
          </div>
          {/* Stats */}
          <div className="stats stats-vertical md:stats-horizontal shadow-lg mb-8">
            <div className="stat">
              <div className="stat-value text-primary">{defaultStats.propertiesListed.toLocaleString()}+</div>
              <div className="stat-title">Properties Listed</div>
            </div>
            <div className="stat">
              <div className="stat-value text-accent">{defaultStats.happyFamilies.toLocaleString()}+</div>
              <div className="stat-title">Happy Families</div>
            </div>
            <div className="stat">
              <div className="stat-value text-success">{defaultStats.yearsExperience}+</div>
              <div className="stat-title">Years Experience</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn btn-primary btn-lg"
            >
              🏠 Browse Properties
            </button>
            <button 
              className="btn btn-outline btn-lg"
            >
              🏡 Sell Your Home
            </button >
          </div>
        </div>
      </div>
    </section>
  );
}
