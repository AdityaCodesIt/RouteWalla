import React from 'react';
import { PriorityLevel } from '../../data/mockStops';
import { AlertTriangle, Clock, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  showLabel = true,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] py-0.5 px-2 font-mono font-bold tracking-tight',
    md: 'text-xs py-1 px-2.5 font-mono font-bold tracking-tight',
    lg: 'text-sm py-1.5 px-3 font-mono font-bold tracking-tight',
  }[size];

  if (priority === 'high') {
    // DISTINCT SHAPE: Chamfered octagonal shield with double-slash hazard icon
    return (
      <span
        title="Urgent Delivery: Time Critical"
        className={`inline-flex items-center gap-1.5 bg-[#D7372B] text-white border-2 border-[#0E0E0E] shadow-hard-sm [clip-path:polygon(8px_0%,calc(100%-8px)_0%,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0%_calc(100%-8px),0%_8px)] ${sizeStyles} ${className}`}
      >
        <AlertTriangle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
        {showLabel && <span>HIGH (URGENT)</span>}
      </span>
    );
  }

  if (priority === 'medium') {
    // DISTINCT SHAPE: Hard rectangle with inset side cut-notches (Transit Token style)
    return (
      <span
        title="Standard Delivery: Scheduled Run"
        className={`inline-flex items-center gap-1.5 bg-[#E58A00] text-[#0E0E0E] border-2 border-[#0E0E0E] rounded-[2px] shadow-hard-sm ${sizeStyles} ${className}`}
      >
        <Clock className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
        {showLabel && <span>MED (TIMED)</span>}
      </span>
    );
  }

  // Low Priority:
  // DISTINCT SHAPE: Skewed parallelogram transit tag with low chevron
  return (
    <span
      title="Flexible Delivery: Anytime Today"
      className={`inline-flex items-center gap-1.5 bg-[#3E7C7A] text-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard-sm ${sizeStyles} ${className}`}
    >
      <ArrowDown className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
      {showLabel && <span>LOW (FLEX)</span>}
    </span>
  );
};
