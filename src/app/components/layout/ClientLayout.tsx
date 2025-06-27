"use client";
import { ThemeProvider } from "next-themes";
interface ClientLayoutProps {
  children?: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="w-full h-full flex flex-col items-center justify-center">{children}</div>
    </ThemeProvider>
  );
}
