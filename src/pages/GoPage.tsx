import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoute } from '../context/RouteContext';
import { Button } from '../components/common/Button';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { TransitLeafletMap } from '../components/route/TransitLeafletMap';
import { HorizontalProgressRail } from '../components/navigation/HorizontalProgressRail';
import { CantDeliverBottomSheet } from '../components/navigation/CantDeliverBottomSheet';
import { EndOfDayCelebration } from '../components/navigation/EndOfDayCelebration';
import { UndoSnackbar } from '../components/navigation/UndoSnackbar';
import { OnTheWayPromptBanner } from '../components/navigation/OnTheWayPromptBanner';
import { PitstopRadarRow } from '../components/navigation/PitstopRadarRow';
import {
  Phone,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Navigation,
  Compass,
  AlertTriangle,
  Utensils,
  Sun,
  Eye,
  IndianRupee,
  Clock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export const GoPage: React.FC = () => {
  const {
    stops,
    activeStopIndex,
    setActiveStopIndex,
    markStopComplete,
    markStopFailed,
    undoLastAction,
    lastAction,
    wishlist,
    highContrast,
    toggleHighContrast,
    resetToMockData,
    stats,
    t,
  } = useRoute();

  const navigate = useNavigate();

  // State for modals and animations
  const [isCantDeliverOpen, setIsCantDeliverOpen] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [navModalOpen, setNavModalOpen] = useState(false);

  // Sync undo snackbar with lastAction from context
  useEffect(() => {
    if (lastAction) {
      setShowUndo(true);
    }
  }, [lastAction]);

  const currentStop = stops[activeStopIndex] || stops[0];
  const isAllDone = stops.length > 0 && stops.every((s) => s.status === 'completed' || s.status === 'skipped');
  const isPickup = currentStop?.type === 'pickup';

  // Check if any pitstop is near current stop
  const nearbyPitstop = wishlist.find((w) => w.nearStopId === currentStop?.id);

  // Trigger haptic vibration if supported on device
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate([40, 30, 60]);
      } catch {
        // Ignore if restricted by browser permissions
      }
    }
  };

  const handleMarkDelivered = () => {
    if (!currentStop) return;
    triggerHaptic();

    // Trigger card slide animation
    setIsSliding(true);
    setTimeout(() => {
      markStopComplete(currentStop.id);
      setIsSliding(false);
    }, 180);
  };

  const handleConfirmCantDeliver = (reason: string) => {
    if (!currentStop) return;
    triggerHaptic();

    setIsSliding(true);
    setTimeout(() => {
      markStopFailed(currentStop.id, reason);
      setIsSliding(false);
    }, 180);
  };

  const handleUndo = () => {
    undoLastAction();
    setShowUndo(false);
  };

  // Google Maps External URL
  const googleMapsUrl = currentStop
    ? `https://www.google.com/maps/dir/?api=1&destination=${currentStop.coordinates.lat},${currentStop.coordinates.lng}`
    : '#';

  // 1. END OF DAY CELEBRATION STATE
  if (isAllDone || !currentStop) {
    return (
      <div className="min-h-screen bg-[#F4F1EA]">
        <EndOfDayCelebration
          stops={stops}
          completedCount={stats.completedCount}
          totalKm={stats.totalKm}
          timeSavedMinutes={stats.timeSavedMinutes}
          totalCodAmount={stats.totalCodAmount}
          onReset={resetToMockData}
        />
        {/* Undo Snackbar on celebration screen in case user completed by mistake */}
        {showUndo && lastAction && (
          <UndoSnackbar
            action={lastAction}
            onUndo={handleUndo}
            onDismiss={() => setShowUndo(false)}
          />
        )}
      </div>
    );
  }

  const paddedOrder = String(currentStop.order).padStart(2, '0');

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] select-none">
      {/* 1. TOP HUD STRIP & PROGRESS TICKER RAIL */}
      <div className="bg-[#15171A] text-white border-b-2 border-[#0E0E0E] px-3 pt-2.5 pb-2 shrink-0">
        <div className="max-w-4xl mx-auto">
          {/* Top Info Bar */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => navigate('/route')}
              className="flex items-center gap-1 font-mono text-xs font-bold text-[#F6B800] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>EXIT TO ROUTE BOARD</span>
            </button>

            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F] animate-pulse" />
              <span>
                STOP {activeStopIndex + 1} OF {stops.length}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleHighContrast}
              title="Toggle High Contrast for Glaring Sun"
              className="w-8 h-8 rounded border border-white/30 flex items-center justify-center text-[#F6B800] cursor-pointer"
            >
              {highContrast ? <Eye className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* Thin Horizontal Progress Rail of Small Tickets */}
          <HorizontalProgressRail
            stops={stops}
            activeIndex={activeStopIndex}
            onSelectIndex={(idx) => setActiveStopIndex(idx)}
          />
        </div>
      </div>

      {/* 2. LARGE "NEXT STOP" CARD AT TOP (BIKE HANDLEBAR OPTIMIZED) */}
      <div className="max-w-4xl mx-auto w-full px-3 pt-3">
        {/* On The Way Errand Slide-In Banner */}
        <OnTheWayPromptBanner className="mb-3" />

        <div
          className={`ticket-stub p-4 sm:p-5 bg-white border-2 border-[#0E0E0E] shadow-hard transition-all duration-200 ${
            isSliding ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          {/* Top Bar: Stop number token + Pickup/Drop badge + Priority badge + ETA */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#0E0E0E]/20 pb-3 mb-3">
            <div className="flex items-center gap-3">
              {/* Big IBM Plex Mono Stop Number */}
              <div className="w-14 h-14 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] font-mono font-black text-2xl flex items-center justify-center shadow-hard-sm">
                {paddedOrder}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11px] font-bold text-[#0E0E0E]/70 uppercase tracking-wider">
                    TARGET STOP
                  </span>

                  {/* Pickup vs Drop Indicator */}
                  <span
                    className={`px-1.5 py-0.5 rounded-[2px] border border-[#0E0E0E] font-mono font-extrabold text-[10px] uppercase flex items-center gap-1 ${
                      isPickup ? 'bg-[#E58A00] text-[#0E0E0E]' : 'bg-[#15171A] text-white'
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
                </div>

                <h2 className="font-display font-black text-xl sm:text-2xl text-[#0E0E0E] leading-tight mt-0.5 truncate max-w-[240px] sm:max-w-md">
                  {currentStop.recipientName}
                </h2>
              </div>
            </div>

            {/* Priority & Distance/ETA */}
            <div className="flex flex-col items-end gap-1">
              <PriorityBadge priority={currentStop.priority} size="md" />
              <div className="font-mono font-extrabold text-sm sm:text-base text-[#0E0E0E] tabular-nums mt-0.5">
                {currentStop.distanceKm} KM · +{currentStop.etaMinutes}m
              </div>
            </div>
          </div>

          {/* Location & Landmark Clue */}
          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] mb-3">
            <p className="font-body font-bold text-sm sm:text-base text-[#0E0E0E] leading-snug">
              {currentStop.address}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs font-mono font-bold text-[#0E0E0E]">
              <span className="text-[#E58A00]">LANDMARK:</span>
              <span className="truncate">{currentStop.landmark} ({currentStop.area})</span>
            </div>
          </div>

          {/* Optional COD / Notes Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            {currentStop.codAmount && currentStop.codAmount > 0 ? (
              <div className="px-2.5 py-1 bg-[#FFF9E6] border-2 border-[#0E0E0E] rounded-[3px] font-mono text-xs font-extrabold text-[#0E0E0E] flex items-center gap-1">
                <span className="text-[#E58A00]">COLLECT COD:</span>
                <IndianRupee className="w-3.5 h-3.5" />
                <span>{currentStop.codAmount}</span>
              </div>
            ) : (
              <span className="font-mono text-[11px] font-bold text-[#2E7D4F] bg-[#2E7D4F]/10 px-2 py-0.5 border border-[#2E7D4F] rounded-[2px]">
                ✓ PREPAID / NO CASH
              </span>
            )}

            {currentStop.deadline && (
              <div className="font-mono text-xs font-bold text-[#D7372B] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Deliver by {currentStop.deadline}</span>
              </div>
            )}
          </div>

          {/* Quick Action Buttons Row (min 48px - 56px touch hitboxes for thumb accessibility on bike) */}
          <div className="grid grid-cols-3 gap-2">
            {/* 1. Call Button */}
            {currentStop.phone ? (
              <a
                href={`tel:${currentStop.phone.replace(/\s+/g, '')}`}
                className="min-h-[50px] px-2 flex items-center justify-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E] bg-white text-[#0E0E0E] hover:bg-[#F4F1EA] active:bg-[#E8E4DA] font-display font-bold text-xs uppercase shadow-hard-sm"
              >
                <Phone className="w-4 h-4 text-[#2E7D4F]" />
                <span>Call</span>
              </a>
            ) : (
              <button
                disabled
                className="min-h-[50px] px-2 flex items-center justify-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E]/30 bg-gray-100 text-[#0E0E0E]/40 font-display font-bold text-xs uppercase"
              >
                <Phone className="w-4 h-4" />
                <span>No Tel</span>
              </button>
            )}

            {/* 2. Open in Google Maps */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[50px] px-2 flex items-center justify-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E] bg-white text-[#0E0E0E] hover:bg-[#F4F1EA] active:bg-[#E8E4DA] font-display font-bold text-xs uppercase shadow-hard-sm"
            >
              <ExternalLink className="w-4 h-4 text-[#3E7C7A]" />
              <span>G-Maps</span>
            </a>

            {/* 3. In-App Navigate (HUD Guidance) */}
            <button
              type="button"
              onClick={() => setNavModalOpen(true)}
              className="min-h-[50px] px-2 flex items-center justify-center gap-1.5 rounded-[4px] border-2 border-[#0E0E0E] bg-[#15171A] text-white hover:bg-black font-display font-bold text-xs uppercase shadow-hard-sm"
            >
              <Navigation className="w-4 h-4 text-[#F6B800]" />
              <span>Navigate</span>
            </button>
          </div>
        </div>

        {/* Nearby Pitstop Callout if Available */}
        {nearbyPitstop && (
          <div className="mt-2.5 p-2.5 bg-[#FFF9E6] border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#E58A00]" />
              <span className="font-bold text-[#0E0E0E]">
                150M PITSTOP: {nearbyPitstop.name}
              </span>
            </div>
            <span className="bg-[#2E7D4F] text-white px-2 py-0.5 font-bold text-[10px]">
              0 KM DETOUR
            </span>
          </div>
        )}

        {/* Pit-stop Quick Radar (Water, Restroom, Chai, Fuel) */}
        <PitstopRadarRow className="mt-3" showSimulatorButton={true} />
      </div>

      {/* 3. MAP TAKES THE MIDDLE */}
      <div className="max-w-4xl mx-auto w-full px-3 py-3 flex-1 min-h-[260px] sm:min-h-[340px]">
        <div className="w-full h-full min-h-[260px] sm:min-h-[340px] rounded-[6px] overflow-hidden border-2 border-[#0E0E0E] shadow-hard">
          <TransitLeafletMap
            stops={stops}
            activeStopId={currentStop.id}
            onSelectStop={(s) => {
              const idx = stops.findIndex((item) => item.id === s.id);
              if (idx !== -1) setActiveStopIndex(idx);
            }}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 4. BOTTOM TWO GIANT BUTTONS (HANDLEBAR OPERABLE) */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#0E0E0E] p-3 shadow-[0_-4px_0_0_#0E0E0E]">
        <div className="max-w-md mx-auto space-y-2">
          {/* Giant Primary Button: "Delivered / Next" (72px Tall, Full Width, Taxi Yellow) */}
          <button
            type="button"
            onClick={handleMarkDelivered}
            className="w-full h-[72px] px-6 rounded-[6px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] font-display font-black text-xl tracking-tight shadow-hard hover:bg-[#e0a700] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-3 transition-all cursor-pointer select-none"
          >
            <CheckCircle2 className="w-7 h-7 stroke-[3]" />
            <span>DELIVERED / NEXT STOP</span>
          </button>

          {/* Secondary Giant Button: "Can't deliver" */}
          <button
            type="button"
            onClick={() => setIsCantDeliverOpen(true)}
            className="w-full h-12 px-4 rounded-[6px] border-2 border-[#0E0E0E] bg-[#FFFFFF] text-[#0E0E0E] hover:bg-[#F4F1EA] active:bg-[#E8E4DA] font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
          >
            <XCircle className="w-5 h-5 text-[#D7372B]" />
            <span>CAN’T DELIVER (CHOOSE REASON)</span>
          </button>
        </div>
      </div>

      {/* 5. UNDO SNACKBAR */}
      {showUndo && lastAction && (
        <UndoSnackbar
          action={lastAction}
          onUndo={handleUndo}
          onDismiss={() => setShowUndo(false)}
        />
      )}

      {/* 6. CAN'T DELIVER BOTTOM SHEET */}
      <CantDeliverBottomSheet
        isOpen={isCantDeliverOpen}
        onClose={() => setIsCantDeliverOpen(false)}
        stopName={currentStop.recipientName}
        stopNumber={currentStop.order}
        onConfirmReason={handleConfirmCantDeliver}
      />

      {/* 7. NAVIGATION HUD GUIDANCE MODAL */}
      {navModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard-lg max-w-sm w-full p-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b-2 border-[#0E0E0E] pb-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#F6B800]" />
                RIDER RADAR GUIDANCE
              </span>
              <span className="font-mono text-xs font-bold bg-[#F6B800] text-[#0E0E0E] px-1.5 py-0.5 border border-[#0E0E0E]">
                LIVE
              </span>
            </div>

            <div className="space-y-3 font-body text-xs">
              <div className="p-3 bg-[#F4F1EA] border border-[#0E0E0E] rounded-[4px]">
                <div className="font-mono text-[10px] text-[#0E0E0E]/60 uppercase">
                  CURRENT CORRIDOR LEG:
                </div>
                <div className="font-display font-bold text-sm text-[#0E0E0E] mt-0.5">
                  Heading to {currentStop.landmark}
                </div>
                <div className="font-mono text-xs text-[#2E7D4F] font-bold mt-1">
                  Straight on main road · ~{currentStop.etaMinutes} mins
                </div>
              </div>

              <div className="p-3 bg-[#FFF9E6] border border-[#0E0E0E] rounded-[4px]">
                <div className="font-mono text-[10px] text-[#0E0E0E]/60 uppercase">
                  TRAFFIC HINT:
                </div>
                <div className="text-[#0E0E0E] font-medium mt-0.5">
                  Keep left before the flyover signal to avoid auto-rickshaw queue.
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 bg-[#F6B800] hover:bg-[#e0a700] text-[#0E0E0E] border-2 border-[#0E0E0E] rounded-[4px] font-display font-bold text-xs uppercase shadow-hard-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Google Maps GPS</span>
                </a>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setNavModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
