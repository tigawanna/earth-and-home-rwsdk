import { quickLinks } from '@/data/site-data';

export function FooterQuickLinks() {
  return (
    <div>
      <h4 className="font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-base-content/70 hover:text-primary  transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
