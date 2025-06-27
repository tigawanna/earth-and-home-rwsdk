import type { LayoutProps } from "rwsdk/router";
import { ThemeSwitcher } from "@/components/client/ThemeSwitcher";
import { InteractiveButton } from "@/components/client/InteractiveButton";
import { NewsletterSignup } from "@/components/client/NewsletterSignup";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-content py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              📞 (555) 123-4567
            </span>
            <span className="flex items-center gap-2">
              ✉️ info@earthandhome.com
            </span>
          </div>
          <span>Licensed Real Estate Professionals</span>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-base-100 shadow-sm border-b border-base-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-content font-bold text-lg">🏡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-base-content">Earth & Home</h1>
                <p className="text-sm text-base-content/70">Real Estate Excellence</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-base-content hover:text-primary transition-colors">Home</a>
              <a href="/properties" className="text-base-content hover:text-primary transition-colors">Properties</a>
              <a href="/buy" className="text-base-content hover:text-primary transition-colors">Buy</a>
              <a href="/sell" className="text-base-content hover:text-primary transition-colors">Sell</a>
              <a href="/about" className="text-base-content hover:text-primary transition-colors">About</a>
              <a href="/contact" className="text-base-content hover:text-primary transition-colors">Contact</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Switcher */}
              <ThemeSwitcher />
              
              <InteractiveButton 
                href="/search"
                className="btn btn-ghost"
              >
                🔍 Search
              </InteractiveButton>
              <InteractiveButton 
                href="/list-property"
                className="btn btn-accent"
              >
                List Property
              </InteractiveButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
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

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-neutral-content/80 hover:text-primary transition-colors">Home</a></li>
                <li><a href="/properties" className="text-neutral-content/80 hover:text-primary transition-colors">Properties</a></li>
                <li><a href="/buy" className="text-neutral-content/80 hover:text-primary transition-colors">Buy</a></li>
                <li><a href="/sell" className="text-neutral-content/80 hover:text-primary transition-colors">Sell</a></li>
                <li><a href="/about" className="text-neutral-content/80 hover:text-primary transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/residential" className="text-neutral-content/80 hover:text-primary transition-colors">Residential Sales</a></li>
                <li><a href="/commercial" className="text-neutral-content/80 hover:text-primary transition-colors">Commercial Properties</a></li>
                <li><a href="/management" className="text-neutral-content/80 hover:text-primary transition-colors">Property Management</a></li>
                <li><a href="/investment" className="text-neutral-content/80 hover:text-primary transition-colors">Investment Consulting</a></li>
                <li><a href="/analysis" className="text-neutral-content/80 hover:text-primary transition-colors">Market Analysis</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span className="text-neutral-content/80">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span className="text-neutral-content/80">info@earthandhome.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="text-neutral-content/80">123 Real Estate Blvd,<br />Suite 100, City, ST 12345</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="font-medium mb-2">Newsletter</h5>
                <NewsletterSignup />
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-content/20 mt-8 pt-6 text-center text-sm text-neutral-content/60">
            <p>&copy; {new Date().getFullYear()} Earth & Home. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
