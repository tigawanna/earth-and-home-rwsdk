// Company Information
export const company = {
  name: "Earth & Home",
  tagline: "Real Estate Excellence",
  description: "Your trusted partner in finding the perfect home. We connect dreams with reality through exceptional real estate services.",
  icon: "🏡",
  license: "Licensed Real Estate Professionals",
};

// Contact Information
export const contact = {
  phone: "(555) 123-4567",
  email: "info@earthandhome.com",
  address: {
    street: "123 Real Estate Blvd",
    suite: "Suite 100",
    city: "City",
    state: "ST",
    zip: "12345",
    full: "123 Real Estate Blvd,\nSuite 100, City, ST 12345",
  },
};

// Navigation Links
export const mainNavigation = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Quick Links for Footer
export const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About Us" },
];

// Services
export const services = [
  { href: "/residential", label: "Residential Sales" },
  { href: "/commercial", label: "Commercial Properties" },
  { href: "/management", label: "Property Management" },
  { href: "/investment", label: "Investment Consulting" },
  { href: "/analysis", label: "Market Analysis" },
];

// Contact Info for Display
export const contactInfo = [
  { icon: "📞", text: contact.phone },
  { icon: "✉️", text: contact.email },
  {
    icon: "📍",
    text: contact.address.full,
  },
];
