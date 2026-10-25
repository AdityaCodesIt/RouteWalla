import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MapPin, Navigation, Compass, Check } from 'lucide-react';
import { mumbaiPlacesDatabase, MumbaiPlaceSuggestion } from '../../data/mockStops';

interface MapPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: {
    name: string;
    address: string;
    area: string;
    landmark: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

export const MapPickerModal: React.FC<MapPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
}) => {
  // Selected hotspot location
  const [selectedPlace, setSelectedPlace] = useState<MumbaiPlaceSuggestion>(
    mumbaiPlacesDatabase[0]
  );
  // Custom pin relative coordinates (percentage 0-100)
  const [pinPos, setPinPos] = useState<{ x: number; y: number }>({ x: 50, y: 45 });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));
    setPinPos({ x, y });

    // Pick closest place from database based on y-position (North to South in Mumbai)
    const normalizedIndex = Math.floor((y / 100) * (mumbaiPlacesDatabase.length - 1));
    const matched = mumbaiPlacesDatabase[normalizedIndex] || mumbaiPlacesDatabase[0];
    setSelectedPlace(matched);
  };

  const handleSelectHotspot = (place: MumbaiPlaceSuggestion, x: number, y: number) => {
    setSelectedPlace(place);
    setPinPos({ x, y });
  };

  const handleConfirm = () => {
    onSelectLocation({
      name: selectedPlace.name,
      address: selectedPlace.address,
      area: selectedPlace.area,
      landmark: selectedPlace.landmark,
      coordinates: { lat: selectedPlace.lat, lng: selectedPlace.lng },
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Drop Pin on Mumbai Transit Map"
      subtitle="Click anywhere on the corridor map to pick coordinates and landmarks"
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="font-mono text-xs text-[#0E0E0E]/70 hidden sm:block">
            LAT: {selectedPlace.lat.toFixed(4)} · LNG: {selectedPlace.lng.toFixed(4)}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleConfirm}
              icon={<Check className="w-4 h-4" />}
            >
              Confirm Pin & Set Stop
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Hotspot Presets */}
        <div>
          <span className="font-mono text-xs font-bold text-[#0E0E0E]/70 uppercase block mb-2">
            Quick Landmark Hotspots:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { place: mumbaiPlacesDatabase[0], x: 62, y: 35, label: 'BKC' },
              { place: mumbaiPlacesDatabase[1], x: 42, y: 52, label: 'Dadar West' },
              { place: mumbaiPlacesDatabase[3], x: 38, y: 64, label: 'Lower Parel' },
              { place: mumbaiPlacesDatabase[7], x: 48, y: 72, label: 'Byculla' },
              { place: mumbaiPlacesDatabase[8], x: 50, y: 88, label: 'Colaba' },
              { place: mumbaiPlacesDatabase[5], x: 68, y: 22, label: 'Andheri East' },
            ].map((hotspot) => (
              <button
                key={hotspot.label}
                type="button"
                onClick={() => handleSelectHotspot(hotspot.place, hotspot.x, hotspot.y)}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-[3px] border-2 border-[#0E0E0E] transition-all cursor-pointer ${
                  selectedPlace.name === hotspot.place.name
                    ? 'bg-[#F6B800] text-[#0E0E0E] shadow-hard-sm'
                    : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
                }`}
              >
                {hotspot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Schematic Mumbai Map Canvas */}
        <div
          onClick={handleMapClick}
          className="relative w-full h-72 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] cursor-crosshair overflow-hidden select-none"
        >
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#0E0E0E 1px, transparent 1px), linear-gradient(90deg, #0E0E0E 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Mumbai Western & Central Coastlines / Arterials SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
            {/* Arabian Sea Coastline */}
            <path
              d="M 50 10 Q 110 90 90 150 T 130 250 L 140 280"
              stroke="#0E0E0E"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
            {/* Western Express Highway Spine */}
            <path
              d="M 180 10 L 170 90 Q 165 140 140 200 L 135 280"
              stroke="#0E0E0E"
              strokeWidth="4"
            />
            {/* Central Railway Line Spine */}
            <path
              d="M 230 10 L 210 110 Q 195 160 170 240 L 160 280"
              stroke="#0E0E0E"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          </svg>

          {/* Hotspot anchor dots */}
          <div className="absolute left-[62%] top-[35%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15171A] border-2 border-white pointer-events-none" />
          <div className="absolute left-[42%] top-[52%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15171A] border-2 border-white pointer-events-none" />
          <div className="absolute left-[38%] top-[64%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15171A] border-2 border-white pointer-events-none" />
          <div className="absolute left-[50%] top-[88%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15171A] border-2 border-white pointer-events-none" />

          {/* Dropped Interactive Pin */}
          <div
            className="absolute transition-all duration-100 ease-out -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center"
            style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
          >
            <div className="px-2 py-0.5 bg-[#15171A] text-white border border-[#0E0E0E] rounded-[2px] font-mono text-[10px] font-bold whitespace-nowrap shadow-hard-sm mb-1">
              {selectedPlace.area}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F6B800] border-2 border-[#0E0E0E] flex items-center justify-center shadow-hard-sm">
              <MapPin className="w-5 h-5 text-[#0E0E0E] fill-[#0E0E0E]" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0E0E0E] -mt-1" />
          </div>

          <div className="absolute bottom-2 left-2 bg-white/95 border border-[#0E0E0E] px-2 py-1 text-[10px] font-mono font-bold text-[#0E0E0E]">
            CLICK ANYWHERE TO RE-POSITION PIN
          </div>
        </div>

        {/* Selected Landmark Details Box */}
        <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] flex items-start gap-3">
          <div className="w-9 h-9 rounded-[4px] bg-[#F6B800] border-2 border-[#0E0E0E] flex items-center justify-center shrink-0 shadow-hard-sm">
            <Compass className="w-5 h-5 text-[#0E0E0E]" />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
              PINNED LOCATION PREVIEW
            </div>
            <h4 className="font-display font-extrabold text-sm text-[#0E0E0E]">
              {selectedPlace.name}
            </h4>
            <p className="font-body text-xs text-[#0E0E0E]/80 mt-0.5">
              {selectedPlace.address} · {selectedPlace.landmark} ({selectedPlace.area})
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
