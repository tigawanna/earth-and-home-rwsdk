'use client';

export function ThemeSwitcher() {
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" value="earth-dark" />
      <div className="swap-off fill-current w-6 h-6">☀️</div>
      <div className="swap-on fill-current w-6 h-6">🌙</div>
    </label>
  );
}
