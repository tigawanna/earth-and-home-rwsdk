import { company, mainNavigation } from "@/data/site-data";
import { LazyThemeSwitcher } from "@/components/client/LazyThemeSwitcher";

export function SiteHeader() {
  return (
    <header className="bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-content font-bold text-lg">{company.icon}</span>
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-base-content">{company.name}</h1>
                <p className="text-sm text-base-content/70">{company.tagline}</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainNavigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base-content hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Switcher */}
            <LazyThemeSwitcher />
            <a href="/login" className="btn btn-secondary">
              Log in
            </a>
          </div>

          {/* Mobile theme switcher only */}
          {/* <div className="lg:hidden">
            <LazyThemeSwitcher />
          </div> */}
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
