'use client';

interface InteractiveButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function InteractiveButton({ 
  href, 
  className = '', 
  children, 
  onClick 
}: InteractiveButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // You can add navigation logic here if needed
    // For now, we'll use the href as-is
  };

  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
