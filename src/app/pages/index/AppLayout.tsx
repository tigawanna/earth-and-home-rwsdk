import type { LayoutProps } from "rwsdk/router";
import { TopContactBar } from "@/components/root/header/TopContactBar";
import { SiteHeader } from "@/components/root/header/SiteHeader";
import { SiteFooter } from "@/components/root/footer/SiteFooter";
import { MobileMenu } from "@/components/root/MobileMenu";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer content - main app */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        <div className="hidden lg:block">
          <TopContactBar />
        </div>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>

      {/* Drawer side - mobile menu (only visible on mobile) */}
      <div className="drawer-side lg:hidden">
        <label
          htmlFor="mobile-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <MobileMenu />
      </div>
    </div>
  );
}
