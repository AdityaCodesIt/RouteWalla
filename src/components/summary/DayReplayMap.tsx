import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DeliveryStop } from '../../data/mockStops';
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, XCircle, Clock, Bike } from 'lucide-react';

interface DayReplayMapProps {
  stops: DeliveryStop[];
  completedStopIds: string[];
  className?: string;
}

export const DayReplayMap: React.FC<DayReplayMapProps> = ({
  stops,
  completedStopIds,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const courierMarkerRef = useRef<L.Marker | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0); // Index from 0 to stops.length - 1
  const [speed, setSpeed] = useState<number>(1); // 1x, 2x, 4x

  const totalSteps = Math.max(stops.length, 1);
  const activeStop = stops[currentStep] || stops[0];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [19.0178, 72.8428],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Draw Polylines and Stop Pins
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    if (stops.length === 0) return;

    const latLngs: L.LatLngExpression[] = stops.map((s) => [
      s.coordinates.lat,
      s.coordinates.lng,
    ]);

    // 1. Black outer casing polyline
    L.polyline(latLngs, {
      color: '#0E0E0E',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(layerGroup);

    // 2. Traveled path vs remaining path
    const traveledLatLngs = latLngs.slice(0, currentStep + 1);
    if (traveledLatLngs.length > 1) {
      // Completed solid route segment
      L.polyline(traveledLatLngs, {
        color: '#2E7D4F',
        weight: 4,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(layerGroup);
    }

    // Remaining segment in dashed taxi yellow
    const remainingLatLngs = latLngs.slice(currentStep);
    if (remainingLatLngs.length > 1) {
      L.polyline(remainingLatLngs, {
        color: '#F6B800',
        weight: 3.5,
        opacity: 0.9,
        dashArray: '6, 6',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(layerGroup);
    }

    // 3. Stop pins
    stops.forEach((stop, idx) => {
      const isPastOrCurrent = idx <= currentStep;
      const isCompleted = completedStopIds.includes(stop.id);
      const isFailed = stop.status === 'skipped' || (stop.notes && stop.notes.includes('[Failed:'));

      let pinBg = '#FFFFFF';
      let pinText = '#0E0E0E';

      if (isCompleted) {
        pinBg = '#2E7D4F';
        pinText = '#FFFFFF';
      } else if (isFailed) {
        pinBg = '#D7372B';
        pinText = '#FFFFFF';
      } else if (idx === currentStep) {
        pinBg = '#F6B800';
        pinText = '#0E0E0E';
      }

      const isCurrentActive = idx === currentStep;
      const pinHtml = `
        <div class="transit-map-pin ${isCurrentActive ? 'active-pin' : ''}" style="background-color: ${pinBg}; color: ${pinText}; border-width: ${isCurrentActive ? '3px' : '2px'};">
          ${String(stop.order || idx + 1).padStart(2, '0')}
        </div>
      `;

      const icon = L.divIcon({
        html: pinHtml,
        className: 'transit-pin-wrapper',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([stop.coordinates.lat, stop.coordinates.lng], { icon })
        .on('click', () => {
          setCurrentStep(idx);
          setIsPlaying(false);
        })
        .addTo(layerGroup);
    });

    // 4. Moving Courier Bike Marker
    if (activeStop) {
      const courierHtml = `
        <div class="replay-courier-pin" title="Courier at Stop ${activeStop.order}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E0E0E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18.5" cy="17.5" r="3.5"/>
            <circle cx="5.5" cy="17.5" r="3.5"/>
            <circle cx="15" cy="5" r="1"/>
            <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
          </svg>
        </div>
      `;

      const courierIcon = L.divIcon({
        html: courierHtml,
        className: 'courier-icon-wrapper',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([activeStop.coordinates.lat, activeStop.coordinates.lng], {
        icon: courierIcon,
        zIndexOffset: 1000,
      }).addTo(layerGroup);

      courierMarkerRef.current = marker;

      // Pan gently to follow active stop
      map.panTo([activeStop.coordinates.lat, activeStop.coordinates.lng], {
        animate: true,
        duration: 0.4,
      });
    }

    // Fit bounds on first render
    if (latLngs.length > 0 && currentStep === 0 && !isPlaying) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [36, 36] });
    }
  }, [stops, completedStopIds, currentStep]);

  // Animation Playback Interval
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = Math.max(2200 / speed, 500);

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= stops.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speed, stops.length]);

  const handleTogglePlay = () => {
    if (currentStep >= stops.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleResetReplay = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleSpeedChange = () => {
    if (speed === 1) setSpeed(2);
    else if (speed === 2) setSpeed(4);
    else setSpeed(1);
  };

  // Replay timestamp calculation
  const getSimulatedTime = (idx: number) => {
    const baseHour = 9;
    const minutes = idx * 28 + 15;
    const hour = baseHour + Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
  };

  return (
    <div className={`p-4 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard ${className}`}>
      {/* Replay Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b-2 border-dashed border-[#0E0E0E]/20 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[4px] bg-[#F6B800] border-2 border-[#0E0E0E] flex items-center justify-center shadow-hard-sm">
            <Bike className="w-4 h-4 text-[#0E0E0E] stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-lg text-[#0E0E0E] leading-tight">
              Day Replay & Route Tracing
            </h3>
            <p className="font-mono text-[11px] text-[#0E0E0E]/70">
              Interactive timeline of your Mumbai dispatch path
            </p>
          </div>
        </div>

        {/* Speed button & Step counter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSpeedChange}
            className="px-2 py-1 rounded-[3px] border border-[#0E0E0E] bg-[#F4F1EA] hover:bg-white font-mono text-xs font-extrabold text-[#0E0E0E] shadow-hard-sm cursor-pointer flex items-center gap-1"
            title="Change Playback Speed"
          >
            <FastForward className="w-3 h-3" />
            <span>{speed}x SPEED</span>
          </button>

          <div className="font-mono text-xs font-black bg-[#15171A] text-[#F6B800] px-2.5 py-1 rounded-[3px] border border-[#0E0E0E]">
            STOP {currentStep + 1} / {totalSteps}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[280px] sm:h-[340px] rounded-[4px] overflow-hidden border-2 border-[#0E0E0E] shadow-hard-sm mb-3">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Active Stop Toast in Bottom Left */}
        {activeStop && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:right-auto sm:max-w-xs z-[1000] p-2.5 bg-white border-2 border-[#0E0E0E] rounded-[4px] shadow-hard text-xs font-mono">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#E58A00] uppercase tracking-wider text-[10px]">
                REPLAY TIME: {getSimulatedTime(currentStep)}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded-[2px] font-bold text-[9px] uppercase ${
                  completedStopIds.includes(activeStop.id)
                    ? 'bg-[#2E7D4F] text-white'
                    : 'bg-[#D7372B] text-white'
                }`}
              >
                {completedStopIds.includes(activeStop.id) ? 'DELIVERED' : 'PENDING'}
              </span>
            </div>
            <div className="font-display font-bold text-sm text-[#0E0E0E] truncate">
              #{activeStop.order}. {activeStop.recipientName}
            </div>
            <div className="text-[11px] text-[#0E0E0E]/70 truncate mt-0.5">
              {activeStop.landmark} ({activeStop.area})
            </div>
            {activeStop.codAmount && activeStop.codAmount > 0 ? (
              <div className="mt-1 font-bold text-[#2E7D4F] text-[10px]">
                COLLECTED COD: ₹{activeStop.codAmount}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Playback Controls & Scrubber */}
      <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
        {/* Scrubber slider */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#0E0E0E]/70 mb-1">
            <span>START: DADAR DISPATCH</span>
            <span>DESTINATION: COLABA DOCK</span>
          </div>
          <input
            type="range"
            min={0}
            max={totalSteps - 1}
            value={currentStep}
            onChange={(e) => {
              setCurrentStep(Number(e.target.value));
              setIsPlaying(false);
            }}
            aria-label="Route Replay Scrubber"
            className="w-full h-2.5 bg-white rounded-lg appearance-none cursor-pointer border-2 border-[#0E0E0E] accent-[#F6B800]"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="px-4 py-2 min-h-[44px] rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] hover:bg-[#e0a700] active:translate-x-[1px] active:translate-y-[1px] font-display font-black text-xs uppercase shadow-hard-sm cursor-pointer flex items-center gap-1.5"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 stroke-[3]" />
                  <span>PAUSE REPLAY</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 stroke-[3]" />
                  <span>{currentStep >= totalSteps - 1 ? 'REPLAY FROM START' : 'PLAY REPLAY'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetReplay}
              className="p-2 min-h-[44px] min-w-[44px] rounded-[4px] border-2 border-[#0E0E0E] bg-white text-[#0E0E0E] hover:bg-gray-100 font-mono text-xs font-bold shadow-hard-sm cursor-pointer flex items-center justify-center"
              title="Reset to Stop 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="font-mono text-xs font-bold text-[#0E0E0E]">
            {completedStopIds.length} OF {totalSteps} COMPLETED
          </div>
        </div>
      </div>
    </div>
  );
};
