import { ThemeSwitcher } from "@/components/client/ThemeSwitcher";
import { InteractiveButton } from "@/components/client/InteractiveButton";
import { company, mainNavigation } from "@/data/site-data";

export function SiteHeader() {
  return (
    <header className="bg-base-100 shadow-sm border-b border-base-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-content font-bold text-lg">{company.icon}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-base-content">{company.name}</h1>
              <p className="text-sm text-base-content/70">{company.tagline}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {mainNavigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base-content hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 px-4">
            {/* Theme Switcher */}
            <ThemeSwitcher />
            <a href="/login" className="btn btn-secondary">
              Log in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
