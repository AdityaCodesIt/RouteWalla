import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  sublabel?: string;
  id?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  sublabel,
  id = 'transit-toggle',
  className = '',
}) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center justify-between gap-4 cursor-pointer select-none py-2 ${className}`}
    >
      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && <span className="font-display font-bold text-sm text-[#0E0E0E]">{label}</span>}
          {sublabel && (
            <span className="font-body text-xs text-[#0E0E0E]/70">{sublabel}</span>
          )}
        </div>
      )}

      <div className="relative shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-14 h-8 rounded-[4px] border-2 border-[#0E0E0E] transition-colors ${
            checked ? 'bg-[#F6B800] shadow-hard-sm' : 'bg-[#E8E4DA]'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-[2px] border-2 border-[#0E0E0E] bg-white transition-transform duration-100 ease-out mt-[2px] ml-[2px] flex items-center justify-center font-mono text-[9px] font-bold ${
              checked ? 'translate-x-6 bg-[#0E0E0E] text-white' : 'translate-x-0 text-[#0E0E0E]'
            }`}
          >
            {checked ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>
    </label>
  );
};
