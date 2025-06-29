// Navigation buttons for carousel
export function CarouselNavButtons({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white hover:bg-white/20"
      >
        ❮
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white hover:bg-white/20"
      >
        ❯
      </button>
    </>
  );
}

// Carousel indicators/dots
export function CarouselIndicators({ 
  total, 
  current, 
  onChange 
}: { 
  total: number; 
  current: number; 
  onChange: (index: number) => void; 
}) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-3 h-3 rounded-full transition-colors ${
            index === current ? 'bg-accent' : 'bg-white/50 hover:bg-white/75'
          }`}
        />
      ))}
    </div>
  );
}
