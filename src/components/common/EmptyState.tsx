import React from 'react';
import { Button } from './Button';
import { Plus } from 'lucide-react';
import {
  EmptyClipboardIllustration,
  EmptyScooterIllustration,
  OfflineModeIllustration,
} from './TransitIllustrations';

export type EmptyStateIllustrationType = 'clipboard' | 'scooter' | 'offline' | 'custom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
  illustrationType?: EmptyStateIllustrationType;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  icon,
  illustrationType = 'clipboard',
  className = '',
}) => {
  const renderVisual = () => {
    if (icon) {
      return (
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-[6px] border-2 border-[#0E0E0E] bg-[#F6B800] shadow-hard-sm">
          {icon}
        </div>
      );
    }

    switch (illustrationType) {
      case 'scooter':
        return <EmptyScooterIllustration className="mx-auto mb-2" size={130} />;
      case 'offline':
        return <OfflineModeIllustration className="mx-auto mb-2" size={130} />;
      case 'clipboard':
      default:
        return <EmptyClipboardIllustration className="mx-auto mb-2" size={130} />;
    }
  };

  return (
    <div
      role="region"
      aria-label={title}
      className={`p-6 sm:p-8 my-6 text-center border-2 border-dashed border-[#0E0E0E] rounded-[6px] bg-white shadow-hard ${className}`}
    >
      {renderVisual()}

      <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase tracking-widest mb-1 mt-2">
        TRANSIT MANIFEST NOTICE
      </div>

      <h3 className="font-display font-black text-xl sm:text-2xl text-[#0E0E0E] mb-2 leading-tight">
        {title}
      </h3>

      <p className="font-body text-sm sm:text-base text-[#0E0E0E]/80 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
        {actionLabel && onAction && (
          <Button
            variant="primary"
            size="touch"
            onClick={onAction}
            icon={<Plus className="w-5 h-5 stroke-[2.5]" />}
            className="w-full sm:w-auto"
          >
            {actionLabel}
          </Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="secondary"
            size="touch"
            onClick={onSecondaryAction}
            className="w-full sm:w-auto"
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
