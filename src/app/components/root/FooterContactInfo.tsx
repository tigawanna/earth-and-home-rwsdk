import { NewsletterSignup } from '../client/NewsletterSignup';

export function FooterContactInfo() {
  const contactInfo = [
    { icon: '📞', text: '(555) 123-4567' },
    { icon: '✉️', text: 'info@earthandhome.com' },
    { 
      icon: '📍', 
      text: '123 Real Estate Blvd,\nSuite 100, City, ST 12345' 
    },
  ];

  return (
    <div>
      <h4 className="font-semibold mb-4">Contact Info</h4>
      <div className="space-y-3 text-sm">
        {contactInfo.map((contact, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{contact.icon}</span>
            <span
              className="text-base-content/70  hover:text-primary "
              style={{ whiteSpace: "pre-line" }}>
              {contact.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h5 className="font-medium mb-2">Newsletter</h5>
        <NewsletterSignup />
      </div>
    </div>
  );
}
