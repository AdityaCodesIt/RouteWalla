import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Sheet / Dialog Container */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${sizeClasses} bg-[#FFFFFF] border-2 border-[#0E0E0E] rounded-t-[10px] sm:rounded-[6px] shadow-hard-lg max-h-[90vh] flex flex-col z-10 animate-in fade-in slide-in-from-bottom-4 duration-150`}
      >
        {/* Mobile drag affordance bar */}
        <div className="sm:hidden w-12 h-1.5 bg-[#0E0E0E]/30 rounded-full mx-auto my-2" />

        {/* Modal Header */}
        <div className="flex items-start justify-between p-4 border-b-2 border-[#0E0E0E] bg-[#F4F1EA]">
          <div>
            <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase tracking-widest">
              TRANSIT DISPATCH DIALOG
            </div>
            <h2 className="font-display font-extrabold text-xl text-[#0E0E0E] leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="font-body text-xs text-[#0E0E0E]/70 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[4px] border-2 border-[#0E0E0E] bg-white text-[#0E0E0E] hover:bg-[#F6B800] active:translate-y-[1px] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-body">{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 border-t-2 border-[#0E0E0E] bg-[#F4F1EA] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
