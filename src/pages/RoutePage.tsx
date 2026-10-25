import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoute } from '../context/RouteContext';
import { Button } from '../components/common/Button';
import { StopCard } from '../components/common/StopCard';
import { EmptyState } from '../components/common/EmptyState';
import { Chip } from '../components/common/Chip';
import { Toggle } from '../components/common/Toggle';
import { TransitLeafletMap } from '../components/route/TransitLeafletMap';
import { OnTheWayPromptBanner } from '../components/navigation/OnTheWayPromptBanner';
import { PitstopRadarRow } from '../components/navigation/PitstopRadarRow';
import { DeliveryStop, PriorityLevel } from '../data/mockStops';
import {
  Navigation,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Clock,
  Compass,
  Layers,
  ChevronUp,
  ChevronDown,
  GripVertical,
  CheckCircle2,
  Sliders,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
} from 'lucide-react';

export const RoutePage: React.FC = () => {
  const {
    stops,
    reorderStops,
    markStopComplete,
    setActiveStopIndex,
    resetToMockData,
    stats,
    t,
  } = useRoute();

  const navigate = useNavigate();

  // Mode Toggles
  const [priorityMode, setPriorityMode] = useState<'smart' | 'strict'>('smart');
  const [manualReorderMode, setManualReorderMode] = useState(false);
  const [mobileSheetExpanded, setMobileSheetExpanded] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState<string>(stops[0]?.id || '');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Calculate sorted stops based on selected Priority Mode
  const sequencedStops = useMemo(() => {
    if (manualReorderMode) {
      // In manual mode, respect the exact user-ordered stops
      return stops;
    }

    const priorityRank: Record<PriorityLevel, number> = {
      high: 1,
      medium: 2,
      low: 3,
    };

    if (priorityMode === 'strict') {
      // Strict: Forces ALL High priority deliveries first, then Medium, then Low, then North to South
      return [...stops].sort((a, b) => {
        if (priorityRank[a.priority] !== priorityRank[b.priority]) {
          return priorityRank[a.priority] - priorityRank[b.priority];
        }
        return b.coordinates.lat - a.coordinates.lat;
      }).map((s, idx) => ({
        ...s,
        order: idx + 1,
        etaMinutes: 10 + idx * 16,
        distanceKm: Number((1.8 + idx * 2.5).toFixed(1)),
      }));
    } else {
      // Smart: Optimizes along the corridor North to South, but ensures urgent pickups & high deadlines come early
      return [...stops].sort((a, b) => {
        // High priority still gets primary boost
        if (a.priority === 'high' && b.priority !== 'high') return -1;
        if (b.priority === 'high' && a.priority !== 'high') return 1;
        // Pickups before drops if in same priority tier
        if (a.type !== b.type) return a.type === 'pickup' ? -1 : 1;
        // Group geographically by latitude corridor
        return b.coordinates.lat - a.coordinates.lat;
      }).map((s, idx) => ({
        ...s,
        order: idx + 1,
        etaMinutes: 10 + idx * 13,
        distanceKm: Number((1.6 + idx * 2.1).toFixed(1)),
      }));
    }
  }, [stops, priorityMode, manualReorderMode]);

  // Selected stop reference
  const selectedStop = sequencedStops.find((s) => s.id === selectedStopId) || sequencedStops[0];

  // Dynamic km saved metric based on mode (e.g. smart saves 6.2 km, strict saves 4.4 km due to priority constraints)
  const savedKm = priorityMode === 'smart' ? '6.2 km' : '4.4 km';
  const totalKm = sequencedStops.reduce((acc, s) => Math.max(acc, s.distanceKm), 0);
  const totalMinutes = sequencedStops.reduce((acc, s) => Math.max(acc, s.etaMinutes), 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  // Late deadline evaluation helper
  const evaluateDeadlineRisk = (deadline?: string, etaMinutes: number = 0) => {
    if (!deadline || typeof deadline !== 'string') return { isRisk: false, text: '' };
    const match = deadline.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!match) return { isRisk: false, text: '' };
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2] || '0', 10);
    const period = match[3] ? match[3].toUpperCase() : h >= 12 ? 'PM' : 'AM';
    const isPM = period === 'PM';
    if (isPM && h !== 12) h += 12;
    if (!isPM && h === 12) h = 0;

    // Shift starts at 10:00 AM (0 min mark)
    const deadlineMinutesFromStart = (h - 10) * 60 + m;
    if (deadlineMinutesFromStart <= 0) {
      return { isRisk: true, text: `Overdue (deadline was ${deadline})` };
    }
    if (etaMinutes > deadlineMinutesFromStart) {
      const over = etaMinutes - deadlineMinutesFromStart;
      return { isRisk: true, text: `LATE RISK: +${over}m past deadline (${deadline})` };
    }
    if (deadlineMinutesFromStart - etaMinutes <= 15) {
      return { isRisk: true, text: `TIGHT BUFFER: ${deadlineMinutesFromStart - etaMinutes}m buffer before ${deadline}` };
    }
    return { isRisk: false, text: '' };
  };

  // Drag-and-drop reorder handlers for manual mode
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    reorderStops(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleStartDay = () => {
    setActiveStopIndex(0);
    navigate('/go');
  };

  if (stops.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 page-fade-in">
        <EmptyState
          title="No Stops in Active Route"
          description="Your route manifest is currently empty. Add delivery stops in Plan mode or load the 8-stop Mumbai demo day."
          actionLabel="Plan Deliveries"
          onAction={() => navigate('/plan')}
          secondaryActionLabel="Load Mumbai Demo Run"
          onSecondaryAction={() => {
            resetToMockData();
          }}
          illustrationType="clipboard"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
      {/* 1. TOP SUMMARY STRIP (METRICS & TOGGLE CONTROLS) */}
      <div className="bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-4 mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Headline & Saved Metric Badge */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono text-xs font-bold bg-[#15171A] text-white px-2.5 py-0.5 rounded-[2px] border border-[#0E0E0E]">
                {sequencedStops.length} STOPS · {stats.highPriorityCount} HIGH PRIORITY
              </span>

              {/* Saved vs Your Order Badge */}
              <span className="font-mono text-xs font-bold bg-[#2E7D4F] text-white px-2.5 py-0.5 rounded-[2px] border border-[#0E0E0E] flex items-center gap-1 shadow-hard-sm">
                <span>SAVED VS YOUR ORDER: {savedKm}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono font-bold text-[#0E0E0E] mt-2">
              <span className="text-base font-extrabold font-display">
                TOTAL: {totalKm} KM
              </span>
              <span>·</span>
              <span className="text-base font-extrabold font-display text-[#2E7D4F]">
                ~{formattedDuration}
              </span>
              <span>·</span>
              <span className="text-[#0E0E0E]/70">
                Avg. Stop: ~14 mins
              </span>
            </div>
          </div>

          {/* Right: Strict vs Smart Priority Toggle & Reorder Mode */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Priority Mode Selector Segmented Control */}
            <div className="flex items-center border-2 border-[#0E0E0E] rounded-[4px] bg-[#F4F1EA] p-0.5 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setPriorityMode('smart');
                  setManualReorderMode(false);
                }}
                className={`min-h-[36px] px-3 rounded-[3px] transition-all cursor-pointer ${
                  priorityMode === 'smart' && !manualReorderMode
                    ? 'bg-[#F6B800] text-[#0E0E0E] shadow-hard-sm'
                    : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
                }`}
              >
                Smart Priority
              </button>

              <button
                type="button"
                onClick={() => {
                  setPriorityMode('strict');
                  setManualReorderMode(false);
                }}
                className={`min-h-[36px] px-3 rounded-[3px] transition-all cursor-pointer ${
                  priorityMode === 'strict' && !manualReorderMode
                    ? 'bg-[#D7372B] text-white shadow-hard-sm'
                    : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
                }`}
              >
                Strict Priority
              </button>
            </div>

            {/* Reorder Manually Button */}
            <button
              type="button"
              onClick={() => setManualReorderMode(!manualReorderMode)}
              className={`min-h-[40px] px-3 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manualReorderMode
                  ? 'bg-[#15171A] text-white shadow-hard-sm'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
              }`}
            >
              <GripVertical className="w-4 h-4" />
              <span>{manualReorderMode ? 'Lock Order' : 'Reorder Manually'}</span>
            </button>

            {/* Primary Action Button: "Start Day" */}
            <Button
              variant="primary"
              size="md"
              onClick={handleStartDay}
              icon={<Navigation className="w-4 h-4 text-[#0E0E0E]" />}
              className="shadow-hard"
            >
              Start Day
            </Button>
          </div>
        </div>

        {/* Priority Mode Advisory Info */}
        <div className="mt-3 pt-3 border-t border-[#0E0E0E]/15 flex items-center justify-between text-[11px] font-body text-[#0E0E0E]/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F6B800] border border-[#0E0E0E]" />
            <span>
              {priorityMode === 'smart'
                ? 'Smart Priority active: Groups North-to-South drops along Mumbai arterials while honoring critical deadlines.'
                : 'Strict Priority active: Every urgent high-priority stop is serviced before standard deliveries regardless of distance.'}
            </span>
          </div>

          {manualReorderMode && (
            <span className="font-mono font-bold text-[#E58A00]">
              Manual reorder mode active: Drag cards below to set custom sequence.
            </span>
          )}
        </div>
      </div>

      {/* On-The-Way Slide-In Prompt Banner */}
      <OnTheWayPromptBanner className="mb-4" />

      {/* Pitstop Radar Row along Corridor */}
      <PitstopRadarRow className="mb-4" showSimulatorButton={true} />

      {/* 2. TWO-PANE LAYOUT: LIST (LEFT) & LEAFLET MAP (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: ORDER LIST & LATE WARNINGS (Desktop: full list; Mobile: hidden or toggled via sheet) */}
        <div className="hidden lg:block lg:col-span-5 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
          <div className="flex items-center justify-between border-b-2 border-[#0E0E0E] pb-2">
            <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase">
              DELIVERY SEQUENCE TIMELINE ({sequencedStops.length} STOPS)
            </span>
            <span className="font-mono text-[10px] text-[#2E7D4F] font-bold">
              ETA CALCULATED
            </span>
          </div>

          <div className="space-y-3">
            {sequencedStops.map((stop, idx) => {
              const risk = evaluateDeadlineRisk(stop.deadline, stop.etaMinutes);
              const isSelected = stop.id === selectedStopId;

              return (
                <div key={stop.id} className="relative">
                  {/* Dashed connector between stops */}
                  {idx > 0 && (
                    <div className="w-0.5 h-3 ml-7 dashed-route-v border-l-2 border-dashed border-[#0E0E0E]" />
                  )}

                  {/* Late Warning Flag Alert Box if Deadline at Risk */}
                  {risk.isRisk && (
                    <div className="mb-1.5 p-2 bg-[#D7372B]/10 border-2 border-[#D7372B] rounded-[4px] font-mono text-[11px] font-bold text-[#D7372B] flex items-center gap-1.5 shadow-hard-sm animate-pulse">
                      <AlertTriangle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span>{risk.text}</span>
                    </div>
                  )}

                  <StopCard
                    stop={stop}
                    isCurrent={idx === 0}
                    draggable={manualReorderMode}
                    dragIndex={idx}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onSelect={(s) => setSelectedStopId(s.id)}
                    onComplete={markStopComplete}
                    onNavigate={() => {
                      setActiveStopIndex(idx);
                      navigate('/go');
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Start Day Action Banner */}
          <div className="pt-4 sticky bottom-0 bg-[#F4F1EA] -mx-2 px-2 pb-2">
            <Button
              variant="primary"
              size="touch"
              fullWidth
              onClick={handleStartDay}
              icon={<Navigation className="w-5 h-5 text-[#0E0E0E] stroke-[2.5]" />}
            >
              Start Day (Driver Mode)
            </Button>
          </div>
        </div>

        {/* RIGHT PANE: LEAFLET MAP WITH GRAYSCALE TILES & YELLOW POLYLINE */}
        <div className="lg:col-span-7 h-[420px] lg:h-[calc(100vh-220px)] sticky top-20">
          <TransitLeafletMap
            stops={sequencedStops}
            activeStopId={selectedStopId}
            onSelectStop={(s) => setSelectedStopId(s.id)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 3. MOBILE COLLAPSIBLE BOTTOM SHEET */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#0E0E0E] shadow-[0_-6px_0_0_#0E0E0E] transition-all duration-200">
        {/* Drag handle / Toggle Header */}
        <div
          onClick={() => setMobileSheetExpanded(!mobileSheetExpanded)}
          className="p-3 bg-[#F4F1EA] border-b-2 border-[#0E0E0E] flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-[#F6B800] border-2 border-[#0E0E0E] font-mono font-bold text-xs flex items-center justify-center">
              {sequencedStops.length}
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#0E0E0E]">
                Route Order & Milestones
              </div>
              <div className="font-mono text-[10px] text-[#0E0E0E]/70">
                {totalKm} km · {formattedDuration} · saved {savedKm}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#0E0E0E]">
              {mobileSheetExpanded ? 'Collapse' : 'Expand Order'}
            </span>
            {mobileSheetExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Expanded Sheet Content */}
        {mobileSheetExpanded && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 font-body bg-[#F4F1EA]">
            {sequencedStops.map((stop, idx) => {
              const risk = evaluateDeadlineRisk(stop.deadline, stop.etaMinutes);
              return (
                <div key={stop.id} className="relative">
                  {risk.isRisk && (
                    <div className="mb-1 p-1.5 bg-[#D7372B]/10 border-2 border-[#D7372B] rounded-[4px] font-mono text-[10px] font-bold text-[#D7372B] flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                      <span>{risk.text}</span>
                    </div>
                  )}

                  <StopCard
                    stop={stop}
                    isCurrent={idx === 0}
                    draggable={manualReorderMode}
                    dragIndex={idx}
                    onSelect={(s) => {
                      setSelectedStopId(s.id);
                      setMobileSheetExpanded(false);
                    }}
                    onComplete={markStopComplete}
                    onNavigate={() => {
                      setActiveStopIndex(idx);
                      navigate('/go');
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Sticky Mobile Primary Button */}
        <div className="p-3 bg-white border-t border-[#0E0E0E]/15">
          <Button
            variant="primary"
            size="touch"
            fullWidth
            onClick={handleStartDay}
            icon={<Navigation className="w-5 h-5 text-[#0E0E0E]" />}
          >
            Start Day (Driver Mode)
          </Button>
        </div>
      </div>
    </div>
  );
};
