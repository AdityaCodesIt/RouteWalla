import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'asphalt';
  size?: 'sm' | 'md' | 'lg' | 'touch';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'touch',
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  // Size classes: 'touch' guarantees minimum 56px height for one-handed glove/rain use
  const sizeClasses = {
    sm: 'h-9 px-3 text-xs tracking-wider uppercase font-mono',
    md: 'h-11 px-4 text-sm font-semibold',
    lg: 'h-14 px-6 text-base font-bold',
    touch: 'min-h-[56px] px-6 text-base font-bold tracking-tight',
  }[size];

  // Variant classes following transit signage brief
  const variantClasses = {
    primary:
      'bg-[#F6B800] text-[#0E0E0E] hover:bg-[#e0a700] active:bg-[#c99500] border-2 border-[#0E0E0E] shadow-hard hover:shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    secondary:
      'bg-[#FFFFFF] text-[#0E0E0E] hover:bg-[#F4F1EA] active:bg-[#E8E4DA] border-2 border-[#0E0E0E] shadow-hard hover:shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    danger:
      'bg-[#D7372B] text-white hover:bg-[#c02b20] active:bg-[#a5231a] border-2 border-[#0E0E0E] shadow-hard hover:shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    asphalt:
      'bg-[#15171A] text-white hover:bg-[#25292E] active:bg-[#000000] border-2 border-[#0E0E0E] shadow-hard hover:shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    ghost:
      'bg-transparent text-[#0E0E0E] hover:bg-[#0E0E0E]/10 active:bg-[#0E0E0E]/15 border-2 border-transparent',
  }[variant];

  const disabledClasses = disabled
    ? 'opacity-40 cursor-not-allowed shadow-none translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0'
    : 'cursor-pointer';

  return (
    <button
      className={`inline-flex items-center justify-center gap-2.5 rounded-[6px] font-display transition-all duration-75 select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#F6B800] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${disabledClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
};
