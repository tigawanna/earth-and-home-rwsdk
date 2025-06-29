"use client";
import { ThemeProvider } from "next-themes";
interface ThemeProviderWrapperProps {
  children?: React.ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="w-full h-full flex flex-col items-center justify-center">{children}</div>
    </ThemeProvider>
  );
}
