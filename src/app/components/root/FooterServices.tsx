export function FooterServices() {
  const services = [
    { href: '/residential', label: 'Residential Sales' },
    { href: '/commercial', label: 'Commercial Properties' },
    { href: '/management', label: 'Property Management' },
    { href: '/investment', label: 'Investment Consulting' },
    { href: '/analysis', label: 'Market Analysis' },
  ];

  return (
    <div>
      <h4 className="font-semibold mb-4">Services</h4>
      <ul className="space-y-2 text-sm">
        {services.map((service) => (
          <li key={service.href}>
            <a 
              href={service.href} 
              className="text-neutral-content/80 hover:text-primary transition-colors"
            >
              {service.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
