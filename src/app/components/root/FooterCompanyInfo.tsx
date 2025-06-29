import { company } from '@/data/site-data';

export function FooterCompanyInfo() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-content font-bold">{company.icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">{company.name}</h3>
          <p className="text-sm ">{company.tagline}</p>
        </div>
      </div>
      <p className="text-sm mb-4">
        {company.description}
      </p>
    </div>
  );
}
