export function FooterCompanyInfo() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-content font-bold">🏡</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">Earth & Home</h3>
          <p className="text-sm text-neutral-content/70">Real Estate Excellence</p>
        </div>
      </div>
      <p className="text-sm text-neutral-content/80 mb-4">
        Your trusted partner in finding the perfect home. We connect dreams with reality through exceptional real estate services.
      </p>
    </div>
  );
}
