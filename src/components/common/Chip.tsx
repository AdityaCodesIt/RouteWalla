import React from 'react';

interface ChipProps {
  label: string;
  active?: boolean;
  count?: number | string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  count,
  icon,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] border-2 border-[#0E0E0E] text-xs font-mono font-bold transition-all cursor-pointer select-none ${
        active
          ? 'bg-[#F6B800] text-[#0E0E0E] shadow-hard-sm translate-y-[-1px]'
          : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA] shadow-none'
      } ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.2 rounded-[2px] text-[10px] tabular-nums ${
            active ? 'bg-[#0E0E0E] text-white' : 'bg-[#E8E4DA] text-[#0E0E0E]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
