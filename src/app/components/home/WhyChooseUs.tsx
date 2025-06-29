interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

interface WhyChooseUsProps {
  onLearnMore?: () => void;
}

export function WhyChooseUs({ onLearnMore }: WhyChooseUsProps) {
  const features: FeatureItem[] = [
    {
      icon: "🏆",
      title: "Trusted Expertise",
      description: "Licensed professionals with deep market knowledge and proven track record.",
      bgColor: "bg-primary/20"
    },
    {
      icon: "🌟",
      title: "Award-Winning Service",
      description: "Recognized for outstanding customer service and successful transactions.",
      bgColor: "bg-accent/20"
    },
    {
      icon: "👥",
      title: "Personalized Approach",
      description: "Tailored solutions that match your unique needs and preferences.",
      bgColor: "bg-success/20"
    },
    {
      icon: "📈",
      title: "Market Leadership",
      description: "Consistent top performer in local market with innovative strategies.",
      bgColor: "bg-warning/20"
    }
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">Why Choose Earth & Home?</h2>
          <p className="text-base-content/70 text-lg">Experience the difference with our dedicated service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="btn btn-primary btn-lg"
          >
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
}
