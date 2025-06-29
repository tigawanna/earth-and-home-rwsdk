import type { LayoutProps } from "rwsdk/router";
import { TopContactBar } from "@/components/root/TopContactBar";
import { SiteHeader } from "@/components/root/SiteHeader";
import { SiteFooter } from "@/components/root/SiteFooter";

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
