import { company, mainNavigation } from '@/data/site-data';
import { LazyThemeSwitcher } from '@/components/client/LazyThemeSwitcher';

export function MobileMenu() {
  return (
    <aside className="min-h-full w-80 bg-base-200 text-base-content">
      {/* Mobile menu header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-content font-bold">{company.icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold">{company.name}</h3>
            <p className="text-sm text-base-content/70">{company.tagline}</p>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="p-4">
        <ul className="menu space-y-2">
          {mainNavigation.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href}
                className="text-base-content hover:text-primary active:bg-primary/10"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile actions */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <LazyThemeSwitcher />
          </div>
          
          <div className="space-y-2">
            <a href="/search" className="btn btn-ghost btn-sm w-full justify-start">
              🔍 Search Properties
            </a>
            
            <a href="/login" className="btn btn-secondary btn-sm w-full">
              Log in
            </a>
            
            <a href="/list-property" className="btn btn-accent btn-sm w-full">
              List Your Property
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
