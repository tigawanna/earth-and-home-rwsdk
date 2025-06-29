export function FooterQuickLinks() {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/buy', label: 'Buy' },
    { href: '/sell', label: 'Sell' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <div>
      <h4 className="font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <a 
              href={link.href} 
              className="text-neutral-content/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
