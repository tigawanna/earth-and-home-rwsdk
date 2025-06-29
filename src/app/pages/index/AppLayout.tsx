import type { LayoutProps } from "rwsdk/router";
import { TopContactBar } from "@/app/components/root/header/TopContactBar";
import { SiteHeader } from "@/app/components/root/header/SiteHeader";
import { SiteFooter } from "@/app/components/root/footer/SiteFooter";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="min-h-screen bg-base-100">
      <TopContactBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
