import { FooterCompanyInfo } from './FooterCompanyInfo';
import { FooterQuickLinks } from './FooterQuickLinks';
import { FooterServices } from './FooterServices';
import { FooterContactInfo } from './FooterContactInfo';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterCompanyInfo />
          <FooterQuickLinks />
          <FooterServices />
          <FooterContactInfo />
        </div>
        
        <div className="border-t border-neutral-content/20 mt-8 pt-6 text-center text-sm text-neutral-content/60">
          <p>&copy; {currentYear} Earth & Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
