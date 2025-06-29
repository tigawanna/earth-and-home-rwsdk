import { services } from '../../../data/site-data';

export function FooterServices() {
  return (
    <div>
      <h4 className="font-semibold mb-4">Services</h4>
      <ul className="space-y-2 text-sm">
        {services.map((service) => (
          <li key={service.href}>
            <a
              href={service.href}
              className="text-base-content/70  hover:text-primary transition-colors">
              {service.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
