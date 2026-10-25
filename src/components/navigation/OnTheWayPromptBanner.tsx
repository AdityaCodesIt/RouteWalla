import React from 'react';
import { useRoute } from '../../context/RouteContext';
import {
  ShoppingBag,
  Pill,
  CreditCard,
  Utensils,
  Fuel,
  Droplets,
  Coffee,
  Plus,
  X,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const getCategoryIcon = (category: string = 'shop', className: string = 'w-4 h-4') => {
  switch ((category || 'shop').toLowerCase()) {
    case 'shop':
      return <ShoppingBag className={className} />;
    case 'pharmacy':
      return <Pill className={className} />;
    case 'atm':
      return <CreditCard className={className} />;
    case 'food':
    case 'snack':
      return <Utensils className={className} />;
    case 'fuel':
      return <Fuel className={className} />;
    case 'restroom':
    case 'facility':
      return <Droplets className={className} />;
    case 'chai':
    default:
      return <Coffee className={className} />;
  }
};

interface OnTheWayPromptBannerProps {
  className?: string;
}

export const OnTheWayPromptBanner: React.FC<OnTheWayPromptBannerProps> = ({
  className = '',
}) => {
  const {
    activeOnTheWayPrompt,
    dismissOnTheWayPrompt,
    addPromptAsNextStop,
    triggerMockOnTheWayPrompt,
  } = useRoute();

  if (!activeOnTheWayPrompt) {
    return null;
  }

  const { name, category, distanceMeters, detourMinutes, landmark, area } =
    activeOnTheWayPrompt;

  return (
    <div
      className={`bg-[#FFFFFF] border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-3 animate-in fade-in slide-in-from-top-4 duration-200 select-none ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Icon & Notification Text */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] flex items-center justify-center shrink-0 shadow-hard-sm">
            {getCategoryIcon(category, 'w-5 h-5 text-[#0E0E0E] stroke-[2.5]')}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[#E58A00] uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3 h-3" />
                ON-THE-WAY DETECTED
              </span>
              <span className="font-mono text-[10px] font-bold bg-[#15171A] text-white px-1.5 py-0.2 rounded">
                +{detourMinutes} MIN
              </span>
            </div>

            <div className="font-display font-extrabold text-sm text-[#0E0E0E] leading-snug truncate">
              {name}
            </div>

            <div className="font-mono text-xs text-[#0E0E0E]/80 truncate">
              {distanceMeters} m off current corridor · {landmark}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={dismissOnTheWayPrompt}
            className="min-h-[42px] px-3 rounded-[4px] border-2 border-[#0E0E0E] bg-white text-[#0E0E0E] hover:bg-[#F4F1EA] active:bg-[#E8E4DA] font-mono text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Not Now</span>
          </button>

          <button
            type="button"
            onClick={() => addPromptAsNextStop(activeOnTheWayPrompt)}
            className="min-h-[42px] px-4 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] hover:bg-[#e0a700] active:translate-x-[1px] active:translate-y-[1px] font-display font-black text-xs uppercase shadow-hard-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Stop</span>
          </button>
        </div>
      </div>
    </div>
  );
};
