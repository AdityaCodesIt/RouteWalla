import React, { useEffect, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';

interface UndoSnackbarProps {
  action: {
    type: 'completed' | 'skipped' | 'failed';
    stopId: string;
    stopName: string;
    prevIndex: number;
    failureReason?: string;
  } | null;
  onUndo: () => void;
  onDismiss: () => void;
}

export const UndoSnackbar: React.FC<UndoSnackbarProps> = ({
  action,
  onUndo,
  onDismiss,
}) => {
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    if (!action) return;
    setTimeLeft(6);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [action, onDismiss]);

  if (!action) return null;

  const actionText =
    action.type === 'completed'
      ? 'Marked as Delivered'
      : action.type === 'failed'
      ? `Undelivered (${action.failureReason || 'Skipped'})`
      : 'Skipped';

  return (
    <div className="fixed bottom-24 sm:bottom-28 left-4 right-4 max-w-md mx-auto z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="bg-[#15171A] text-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F6B800] shrink-0" />
          <div className="truncate text-xs font-mono">
            <span className="font-bold text-[#F6B800]">{action.stopName}:</span>{' '}
            <span className="text-white/80">{actionText}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onUndo}
            className="min-h-[38px] px-3 bg-[#F6B800] hover:bg-[#e0a700] text-[#0E0E0E] border border-[#0E0E0E] rounded-[3px] font-mono text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-hard-sm active:translate-y-[1px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>UNDO ({timeLeft}s)</span>
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
