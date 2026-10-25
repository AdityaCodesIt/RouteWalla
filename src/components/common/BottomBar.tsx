import React from 'react';

interface BottomBarProps {
  children: React.ReactNode;
  className?: string;
}

export const BottomBar: React.FC<BottomBarProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 bg-[#F4F1EA] border-t-2 border-[#0E0E0E] p-3 shadow-[0_-4px_0_0_#0E0E0E] ${className}`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {children}
      </div>
    </div>
  );
};
