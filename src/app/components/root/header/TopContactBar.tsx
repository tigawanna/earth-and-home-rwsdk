import { contact, company } from '@/data/site-data';

export function TopContactBar() {
  return (
    <div className="bg-primary text-primary-content py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            📞 {contact.phone}
          </span>
          <span className="flex items-center gap-2">
            ✉️ {contact.email}
          </span>
        </div>
        <span>{company.license}</span>
      </div>
    </div>
  );
}
