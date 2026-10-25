import React from 'react';

/**
 * TransitSkeleton: Loading placeholders built in the RouteWala design language.
 * Uses flat hard 2px borders, dashed dividers, ticket-stub notches, and muted paper blocks.
 */

export const StopCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    role="status"
    aria-label="Loading stop data"
    className={`ticket-stub p-4 bg-white border-2 border-[#0E0E0E] shadow-hard motion-safe:animate-pulse ${className}`}
  >
    <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#0E0E0E]/20">
      <div className="flex items-center gap-3">
        {/* Number Token Skeleton */}
        <div className="w-10 h-10 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800]/50" />
        <div className="space-y-1.5">
          <div className="w-20 h-3 bg-[#15171A]/20 rounded-[2px]" />
          <div className="w-36 h-5 bg-[#15171A]/30 rounded-[2px]" />
        </div>
      </div>
      <div className="w-16 h-6 bg-[#15171A]/20 rounded-[4px] border border-[#0E0E0E]/30" />
    </div>

    <div className="mt-3 space-y-2">
      <div className="w-full h-4 bg-[#15171A]/15 rounded-[2px]" />
      <div className="w-3/4 h-3 bg-[#15171A]/10 rounded-[2px]" />
    </div>

    <div className="mt-3 pt-2.5 border-t border-[#0E0E0E]/10 flex items-center justify-between">
      <div className="w-24 h-4 bg-[#F6B800]/30 rounded-[2px]" />
      <div className="w-16 h-4 bg-[#15171A]/15 rounded-[2px]" />
    </div>
  </div>
);

export const MetricTileSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    role="status"
    aria-label="Loading metric"
    className={`p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] text-center motion-safe:animate-pulse shadow-hard-sm ${className}`}
  >
    <div className="w-16 h-2.5 mx-auto bg-[#0E0E0E]/20 rounded-[2px] mb-2" />
    <div className="w-12 h-6 mx-auto bg-[#0E0E0E]/40 rounded-[2px] mb-1" />
    <div className="w-20 h-2 mx-auto bg-[#0E0E0E]/15 rounded-[2px]" />
  </div>
);

export const MapSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    role="status"
    aria-label="Loading transit map"
    className={`relative w-full h-[320px] rounded-[6px] border-2 border-[#0E0E0E] bg-[#E8E4DA] overflow-hidden shadow-hard flex items-center justify-center ${className}`}
  >
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-15"
      style={{
        backgroundImage:
          'linear-gradient(#0E0E0E 1px, transparent 1px), linear-gradient(90deg, #0E0E0E 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />

    {/* Center Transit Board Loader */}
    <div className="relative z-10 p-4 bg-white border-2 border-[#0E0E0E] rounded-[4px] shadow-hard text-center motion-safe:animate-pulse">
      <div className="w-8 h-8 mx-auto mb-2 bg-[#F6B800] border-2 border-[#0E0E0E] rounded-[2px] flex items-center justify-center font-mono font-black text-sm">
        RW
      </div>
      <div className="font-mono text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">
        CALIBRATING MUMBAI MAP...
      </div>
      <div className="font-mono text-[10px] text-[#0E0E0E]/60 mt-1">
        LOCAL TILES LOADING
      </div>
    </div>
  </div>
);
