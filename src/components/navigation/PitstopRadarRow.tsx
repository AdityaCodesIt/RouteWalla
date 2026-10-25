import React, { useState } from 'react';
import { useRoute } from '../../context/RouteContext';
import { mumbaiPitstopRadar, PitstopRadarOption } from '../../data/wishlistItems';
import {
  Droplets,
  Fuel,
  Coffee,
  Sparkles,
  Plus,
  Compass,
  Check,
} from 'lucide-react';

interface PitstopRadarRowProps {
  className?: string;
  showSimulatorButton?: boolean;
}

export const PitstopRadarRow: React.FC<PitstopRadarRowProps> = ({
  className = '',
  showSimulatorButton = true,
}) => {
  const { triggerMockOnTheWayPrompt, addStop, activeStopIndex } = useRoute();
  const [addedId, setAddedId] = useState<string | null>(null);

  const getRadarIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets className="w-3.5 h-3.5 text-[#3E7C7A]" />;
      case 'restroom':
        return <Droplets className="w-3.5 h-3.5 text-[#2E7D4F]" />;
      case 'fuel':
        return <Fuel className="w-3.5 h-3.5 text-[#D7372B]" />;
      case 'chai':
      default:
        return <Coffee className="w-3.5 h-3.5 text-[#E58A00]" />;
    }
  };

  const handleQuickAddRadar = (item: PitstopRadarOption) => {
    addStop({
      recipientName: item.title,
      address: `${item.landmark}, ${item.area}`,
      area: item.area,
      landmark: item.landmark,
      priority: 'low',
      type: 'drop',
      parcelCount: 0,
      codAmount: 0,
      etaMinutes: 10,
      distanceKm: 1.5,
      notes: `Pitstop radar: ${(item.type || 'radar').toUpperCase()} · ${item.distanceOffRouteMeters}m off corridor`,
      coordinates: { lat: 19.018, lng: 72.842 },
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div
      className={`bg-[#FFFFFF] border-2 border-[#0E0E0E] rounded-[6px] shadow-hard-sm p-3 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#F6B800]" />
          <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase">
            PIT-STOP RADAR ALONG ACTIVE CORRIDOR
          </span>
        </div>

        {/* Mock Simulator Button */}
        {showSimulatorButton && (
          <button
            type="button"
            onClick={() => triggerMockOnTheWayPrompt()}
            className="px-2.5 py-1 bg-[#15171A] hover:bg-black text-[#F6B800] border border-[#0E0E0E] rounded-[3px] font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-hard-sm active:translate-y-[1px]"
            title="Demo Simulator: Trigger On-the-way slide-in alert"
          >
            <Sparkles className="w-3 h-3 text-[#F6B800]" />
            <span>Simulate On-The-Way Alert</span>
          </button>
        )}
      </div>

      {/* Horizontal row of 4 pitstop categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {mumbaiPitstopRadar.map((item) => {
          const isJustAdded = addedId === item.id;
          return (
            <div
              key={item.id}
              className="p-2 bg-[#F4F1EA] border border-[#0E0E0E] rounded-[4px] flex items-center justify-between gap-1.5 transition-colors hover:bg-white"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-[#0E0E0E]/70">
                  {getRadarIcon(item.type)}
                  <span>{item.type}</span>
                </div>
                <div className="font-display font-bold text-xs text-[#0E0E0E] truncate">
                  {item.title}
                </div>
                <div className="font-mono text-[10px] text-[#2E7D4F] font-bold">
                  +{item.distanceOffRouteMeters}m · +{item.detourMinutes}m
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleQuickAddRadar(item)}
                className={`w-7 h-7 shrink-0 rounded-[3px] border border-[#0E0E0E] flex items-center justify-center transition-all cursor-pointer ${
                  isJustAdded
                    ? 'bg-[#2E7D4F] text-white'
                    : 'bg-white hover:bg-[#F6B800] text-[#0E0E0E]'
                }`}
                title={`Add ${item.title} as quick stop`}
              >
                {isJustAdded ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
