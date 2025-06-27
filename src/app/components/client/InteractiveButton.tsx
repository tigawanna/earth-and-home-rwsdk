'use client';

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function InteractiveButton({ 
  children, 
  className = '', 
  href, 
  onClick, 
  type = 'button' 
}: InteractiveButtonProps) {
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
