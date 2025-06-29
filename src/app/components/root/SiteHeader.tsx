import { ThemeSwitcher } from '../client/ThemeSwitcher';
import { InteractiveButton } from '../client/InteractiveButton';

export function SiteHeader() {
  return (
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
  );
}
