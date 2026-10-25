import React from 'react';
import { DeliveryStop } from '../../data/mockStops';
import { Check, X } from 'lucide-react';

interface HorizontalProgressRailProps {
  stops: DeliveryStop[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  className?: string;
}

export const HorizontalProgressRail: React.FC<HorizontalProgressRailProps> = ({
  stops,
  activeIndex,
  onSelectIndex,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-x-auto py-1 px-1 flex items-center gap-1.5 no-scrollbar select-none ${className}`}>
      {stops.map((stop, idx) => {
        const isCurrent = idx === activeIndex;
        const isCompleted = stop.status === 'completed';
        const isSkipped = stop.status === 'skipped';
        const isHigh = stop.priority === 'high';

        let bgClass = 'bg-white text-[#0E0E0E] border-[#0E0E0E]/40';
        if (isCompleted) {
          bgClass = 'bg-[#2E7D4F] text-white border-[#0E0E0E]';
        } else if (isSkipped) {
          bgClass = 'bg-[#D7372B]/20 text-[#D7372B] border-[#D7372B]';
        } else if (isCurrent) {
          bgClass = 'bg-[#F6B800] text-[#0E0E0E] border-[#0E0E0E] ring-2 ring-[#0E0E0E] shadow-hard-sm scale-105';
        }

        return (
          <button
            key={stop.id}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`min-w-[42px] h-8 px-1.5 flex items-center justify-center gap-1 rounded-[3px] border-2 font-mono font-bold text-[11px] transition-all cursor-pointer shrink-0 ${bgClass}`}
            title={`#${stop.order} ${stop.recipientName} (${stop.area})`}
          >
            {isCompleted ? (
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            ) : isSkipped ? (
              <X className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <span>#{stop.order}</span>
            )}
            {isHigh && !isCompleted && !isSkipped && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7372B]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
