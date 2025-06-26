import type { LayoutProps } from "rwsdk/router";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header  className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <nav  className="space-x-4">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        {requestInfo && <span>Path: {new URL(requestInfo.request.url).pathname}</span>}
      </header>
      <main className="flex-1">{children}</main>
      <footer>&copy; {new Date().getFullYear()}</footer>
    </div>
  );
}
