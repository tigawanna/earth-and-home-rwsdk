'use client';

import { lazy, Suspense } from 'react';

// Lazy load the ThemeSwitcher component
const ThemeSwitcher = lazy(() => 
  import('./ThemeSwitcher').then(module => ({ default: module.ThemeSwitcher }))
);

// Fallback component with same dimensions to prevent layout shift
function ThemeSwitcherFallback() {
  return <div className="w-6 h-6" />;
}

export function LazyThemeSwitcher() {
  return (
    <Suspense fallback={<ThemeSwitcherFallback />}>
      <ThemeSwitcher />
    </Suspense>
  );
}
