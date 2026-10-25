import React, { useState, useRef } from 'react';
import { DeliveryStop } from '../../data/mockStops';
import { PriorityBadge } from './PriorityBadge';
import {
  Phone,
  CheckCircle2,
  Navigation,
  AlertCircle,
  GripVertical,
  Trash2,
  Edit3,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  Link as LinkIcon,
} from 'lucide-react';

interface StopCardProps {
  stop: DeliveryStop;
  isCurrent?: boolean;
  draggable?: boolean;
  dragIndex?: number;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onComplete?: (id: string) => void;
  onSkip?: (id: string) => void;
  onNavigate?: (stop: DeliveryStop) => void;
  onSelect?: (stop: DeliveryStop) => void;
  onEdit?: (stop: DeliveryStop) => void;
  onDelete?: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const StopCard: React.FC<StopCardProps> = ({
  stop,
  isCurrent = false,
  draggable = false,
  dragIndex = 0,
  onDragStart,
  onDragOver,
  onDragEnd,
  onComplete,
  onSkip,
  onNavigate,
  onSelect,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
}) => {
  const isCompleted = stop.status === 'completed';
  const isSkipped = stop.status === 'skipped';
  const isPickup = stop.type === 'pickup';

  const paddedOrder = String(stop.order).padStart(2, '0');

  // Swipe-to-delete touch state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    // Only allow swiping left (negative diff) up to -100px
    if (diff < 0 && diff > -120) {
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset < -80 && onDelete) {
      // Swiped far enough to trigger delete
      setSwipeOffset(-300);
      setTimeout(() => {
        onDelete(stop.id);
      }, 150);
    } else {
      setSwipeOffset(0);
    }
    setTouchStartX(null);
    setIsSwiping(false);
  };

  return (
    <div className="relative overflow-hidden rounded-[6px]">
      {/* Background delete reveal action for swipe-to-delete */}
      <div className="absolute inset-0 bg-[#D7372B] border-2 border-[#0E0E0E] rounded-[6px] flex items-center justify-end px-6 text-white font-mono font-bold text-xs gap-2">
        <Trash2 className="w-5 h-5" />
        <span>SWIPE TO REMOVE</span>
      </div>

      {/* Front ticket card */}
      <div
        ref={cardRef}
        draggable={draggable}
        onDragStart={(e) => onDragStart?.(e, dragIndex)}
        onDragOver={(e) => onDragOver?.(e, dragIndex)}
        onDragEnd={onDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isSwiping ? 'none' : 'transform 0.2s ease-out',
        }}
        onClick={() => onSelect?.(stop)}
        className={`ticket-stub relative p-4 transition-all duration-200 select-none ${
          isCurrent
            ? 'ring-3 ring-[#F6B800] ring-offset-2 shadow-hard bg-white'
            : isCompleted
            ? 'opacity-65 bg-[#F4F1EA] shadow-hard-sm'
            : 'bg-white shadow-hard hover:translate-y-[-2px] hover:shadow-hard-lg'
        }`}
      >
        {/* Top Bar: Reorder Handle + Big Mono Stop Number + Type Badge + Priority */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#0E0E0E]/20 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            {/* Drag Handle on Desktop / Reorder Arrows */}
            {draggable && (
              <div
                className="cursor-grab active:cursor-grabbing p-1 text-[#0E0E0E]/60 hover:text-[#0E0E0E] touch-none"
                title="Drag to reorder stop"
              >
                <GripVertical className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}

            {/* Big Mono Stop Number */}
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-[4px] border-2 border-[#0E0E0E] font-mono font-bold text-lg tracking-tighter ${
                isCurrent
                  ? 'bg-[#F6B800] text-[#0E0E0E]'
                  : isCompleted
                  ? 'bg-[#2E7D4F] text-white'
                  : 'bg-[#15171A] text-white'
              }`}
            >
              {paddedOrder}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Pickup vs Drop Type Badge */}
                <span
                  className={`px-1.5 py-0.5 rounded-[2px] border border-[#0E0E0E] text-[10px] font-mono font-extrabold uppercase flex items-center gap-1 ${
                    isPickup
                      ? 'bg-[#E58A00] text-[#0E0E0E]'
                      : 'bg-[#15171A] text-white'
                  }`}
                >
                  {isPickup ? (
                    <>
                      <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                      <span>PICKUP</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-3 h-3 stroke-[3]" />
                      <span>DROP</span>
                    </>
                  )}
                </span>

                {/* Next Tag */}
                {isCurrent && (
                  <span className="bg-[#F6B800] text-[#0E0E0E] px-1.5 py-0.5 text-[10px] font-mono font-bold border border-[#0E0E0E]">
                    NEXT
                  </span>
                )}

                {/* Paired Stop Indicator */}
                {stop.pairedStopId && (
                  <span className="bg-[#3E7C7A] text-white px-1.5 py-0.5 text-[10px] font-mono font-bold border border-[#0E0E0E] flex items-center gap-1">
                    <LinkIcon className="w-2.5 h-2.5" />
                    <span>PAIRED</span>
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-base text-[#0E0E0E] leading-tight mt-0.5">
                {stop.recipientName}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <PriorityBadge priority={stop.priority} size="sm" />
            {stop.deadline && (
              <span className="font-mono text-[11px] font-bold text-[#D7372B]">
                by {stop.deadline}
              </span>
            )}
          </div>
        </div>

        {/* Main Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <p className="font-medium text-[#0E0E0E] leading-snug">{stop.address}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-[#0E0E0E]/80">
              <span className="font-semibold text-[#0E0E0E]">{stop.area}</span>
              <span>·</span>
              <span className="text-[#0E0E0E]/70 truncate max-w-[200px]">
                {stop.landmark}
              </span>
            </div>
          </div>

          {/* Metrics in Mono: ETA, Parcels & COD Amount */}
          <div className="flex items-center justify-between md:justify-end gap-3 font-mono text-xs border-t md:border-t-0 border-[#0E0E0E]/10 pt-2 md:pt-0">
            {stop.codAmount && stop.codAmount > 0 ? (
              <div className="text-left md:text-right px-2 py-1 bg-[#FFF9E6] border border-[#0E0E0E] rounded-[3px]">
                <div className="text-[9px] text-[#0E0E0E]/70 uppercase font-bold">CASH ON DROP</div>
                <div className="font-bold text-[#0E0E0E] text-xs flex items-center gap-0.5">
                  <IndianRupee className="w-3 h-3 text-[#E58A00]" />
                  <span>{stop.codAmount}</span>
                </div>
              </div>
            ) : null}

            <div className="text-right">
              <div className="text-[10px] text-[#0E0E0E]/60 uppercase font-bold">Parcels</div>
              <div className="font-bold text-[#0E0E0E] text-sm tabular-nums">
                {stop.parcelCount} PKG
              </div>
            </div>
          </div>
        </div>

        {/* Notes callout if any */}
        {stop.notes && (
          <div className="mb-3 px-2.5 py-1.5 bg-[#F4F1EA] border border-[#0E0E0E]/30 text-xs text-[#0E0E0E]/90 flex items-start gap-1.5 font-body">
            <AlertCircle className="w-3.5 h-3.5 text-[#E58A00] shrink-0 mt-0.5" />
            <span>{stop.notes}</span>
          </div>
        )}

        {/* Bottom Actions Row (min 44px hitboxes for one-handed rider ergonomics) */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-[#0E0E0E]/10">
          <div className="flex items-center gap-2">
            {stop.phone && (
              <a
                href={`tel:${stop.phone.replace(/\s+/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                className="min-h-[44px] min-w-[44px] px-3 py-2 flex items-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E] bg-white text-[#0E0E0E] text-xs font-mono font-bold hover:bg-[#F4F1EA] active:bg-[#E8E4DA] transition-colors"
                title={`Call ${stop.recipientName}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#2E7D4F]" />
                <span className="hidden sm:inline">{stop.phone}</span>
                <span className="sm:hidden">CALL</span>
              </a>
            )}

            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(stop);
                }}
                className="min-h-[44px] px-3 py-2 flex items-center gap-1 rounded-[4px] border-2 border-[#0E0E0E] bg-white hover:bg-[#F4F1EA] text-[#0E0E0E] text-xs font-mono font-bold transition-colors cursor-pointer"
                title="Edit Stop Details"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>EDIT</span>
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(stop.id);
                }}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[4px] border-2 border-[#0E0E0E] bg-white hover:bg-[#D7372B] hover:text-white text-[#0E0E0E] transition-colors cursor-pointer"
                title="Delete Stop"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Accessible move up / down buttons for non-drag reordering */}
            {onMoveUp && !isFirst && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp(dragIndex);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-[3px] border border-[#0E0E0E] bg-[#F4F1EA] hover:bg-[#E8E4DA] text-xs font-mono font-bold"
                title="Move stop earlier"
              >
                ↑
              </button>
            )}
            {onMoveDown && !isLast && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown(dragIndex);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-[3px] border border-[#0E0E0E] bg-[#F4F1EA] hover:bg-[#E8E4DA] text-xs font-mono font-bold"
                title="Move stop later"
              >
                ↓
              </button>
            )}

            {onNavigate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(stop);
                }}
                className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E] bg-[#15171A] text-white text-xs font-mono font-bold hover:bg-black transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#F6B800]" />
                <span>NAV</span>
              </button>
            )}

            {isCompleted ? (
              <span className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 rounded-[4px] border-2 border-[#2E7D4F] bg-[#2E7D4F]/10 text-[#2E7D4F] text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>DONE</span>
              </span>
            ) : (
              onComplete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onComplete(stop.id);
                  }}
                  className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] text-xs font-mono font-bold shadow-hard-sm hover:bg-[#e0a700] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DONE</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Ticket Stamp if Completed or Skipped */}
        {isCompleted && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-[-12deg] border-4 border-[#2E7D4F] text-[#2E7D4F] px-4 py-1.5 font-display font-extrabold text-lg tracking-wider opacity-80 uppercase">
            DELIVERED
          </div>
        )}
        {isSkipped && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-[-12deg] border-4 border-[#D7372B] text-[#D7372B] px-4 py-1.5 font-display font-extrabold text-lg tracking-wider opacity-80 uppercase">
            SKIPPED
          </div>
        )}
      </div>
    </div>
  );
};
