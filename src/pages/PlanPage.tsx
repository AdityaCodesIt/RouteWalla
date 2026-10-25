import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoute } from '../context/RouteContext';
import { Button } from '../components/common/Button';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { StopCard } from '../components/common/StopCard';
import { EmptyState } from '../components/common/EmptyState';
import { MapPickerModal } from '../components/plan/MapPickerModal';
import { PasteListModal } from '../components/plan/PasteListModal';
import { EditStopBottomSheet } from '../components/plan/EditStopBottomSheet';
import {
  DeliveryStop,
  PriorityLevel,
  StopType,
  mumbaiPlacesDatabase,
  MumbaiPlaceSuggestion,
  quickAddLandmarks,
} from '../data/mockStops';
import {
  Plus,
  ArrowRight,
  Sparkles,
  MapPin,
  Clipboard,
  Building,
  Navigation,
  Clock,
  Phone,
  IndianRupee,
  AlertCircle,
  RotateCcw,
  Search,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Compass,
} from 'lucide-react';

export const PlanPage: React.FC = () => {
  const {
    stops,
    addStop,
    addMultipleStops,
    removeStop,
    updateStop,
    reorderStops,
    loadDemoDay,
    optimizeRoute,
    stats,
    t,
  } = useRoute();

  const navigate = useNavigate();

  // Form State
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Dadar West');
  const [landmark, setLandmark] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [type, setType] = useState<StopType>('drop');
  const [deadline, setDeadline] = useState('');
  const [codAmount, setCodAmount] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [parcels, setParcels] = useState(1);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 19.0178,
    lng: 72.8428,
  });

  // Autocomplete state
  const [addressQuery, setAddressQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Modals state
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [editingStop, setEditingStop] = useState<DeliveryStop | null>(null);
  const [demoLoadedNotification, setDemoLoadedNotification] = useState(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Filter autocomplete suggestions based on query
  const suggestions = mumbaiPlacesDatabase.filter((place) => {
    if (!addressQuery.trim()) return false;
    const q = addressQuery.toLowerCase();
    return (
      place.name.toLowerCase().includes(q) ||
      place.address.toLowerCase().includes(q) ||
      place.area.toLowerCase().includes(q) ||
      place.landmark.toLowerCase().includes(q)
    );
  });

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (place: MumbaiPlaceSuggestion) => {
    setAddress(place.address);
    setAddressQuery(place.name);
    setArea(place.area);
    setLandmark(place.landmark);
    setCoords({ lat: place.lat, lng: place.lng });
    if (!recipient.trim()) {
      setRecipient(place.name);
    }
    setShowSuggestions(false);
  };

  const handleMapPinSelected = (loc: {
    name: string;
    address: string;
    area: string;
    landmark: string;
    coordinates: { lat: number; lng: number };
  }) => {
    setAddress(loc.address);
    setAddressQuery(loc.name);
    setArea(loc.area);
    setLandmark(loc.landmark);
    setCoords(loc.coordinates);
    if (!recipient.trim()) {
      setRecipient(loc.name);
    }
  };

  const handleAddStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !address.trim()) return;

    addStop({
      recipientName: recipient.trim(),
      phone: phone.trim() || '+91 98200 ' + Math.floor(10000 + Math.random() * 90000),
      address: address.trim(),
      area: area.trim() || 'Mumbai Central',
      landmark: landmark.trim() || 'Near local junction',
      priority,
      type,
      parcelCount: Number(parcels) || 1,
      deadline: deadline.trim() || undefined,
      codAmount: typeof codAmount === 'number' && codAmount > 0 ? codAmount : 0,
      notes: notes.trim() || undefined,
      etaMinutes: 20 + stops.length * 12,
      distanceKm: Number((2.5 + stops.length * 2.1).toFixed(1)),
      coordinates: coords,
    });

    // Reset Form
    setRecipient('');
    setPhone('');
    setAddress('');
    setAddressQuery('');
    setLandmark('');
    setDeadline('');
    setCodAmount('');
    setNotes('');
  };

  const handleQuickAdd = (lm: typeof quickAddLandmarks[0]) => {
    addStop({
      recipientName: `Drop at ${lm.name}`,
      phone: '+91 98200 ' + Math.floor(10000 + Math.random() * 90000),
      address: `Courier Bay, ${lm.name}`,
      area: lm.area,
      landmark: `Main delivery reception point`,
      priority: 'medium',
      type: 'drop',
      parcelCount: 1,
      codAmount: 0,
      etaMinutes: 25,
      distanceKm: 3.5,
      coordinates: { lat: lm.lat, lng: lm.lng },
    });
  };

  const handleLoadDemoDay = () => {
    loadDemoDay();
    setDemoLoadedNotification(true);
    setTimeout(() => setDemoLoadedNotification(false), 2500);
  };

  // Drag and Drop handlers
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

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderStops(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < stops.length - 1) {
      reorderStops(index, index + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 pb-28 md:pb-12">
      {/* 1. TOP HEADER & COUNTER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#0E0E0E] pb-5 mb-6">
        <div>
          {/* Manifest Count Badge */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 bg-[#15171A] text-white font-mono text-xs font-bold uppercase rounded-[2px] border border-[#0E0E0E]">
              {stops.length} STOPS · {stats.highPriorityCount} HIGH
            </span>

            {demoLoadedNotification && (
              <span className="px-2 py-0.5 bg-[#2E7D4F] text-white font-mono text-xs font-bold rounded-[2px] animate-in fade-in">
                ✓ 8 Mumbai Stops Loaded!
              </span>
            )}
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0E0E0E]">
            Multi-Stop Manifest & Input
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#0E0E0E]/75 mt-0.5">
            Type with Mumbai autocomplete, drop a map pin, or paste a WhatsApp list. Reorder and set priorities before dispatching.
          </p>
        </div>

        {/* Action Buttons: Try Demo Day & Paste List & Drop Pin */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            onClick={handleLoadDemoDay}
            icon={<Sparkles className="w-4 h-4 text-[#0E0E0E]" />}
          >
            Try Demo Day (8 Stops)
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsPasteModalOpen(true)}
            icon={<Clipboard className="w-4 h-4" />}
          >
            Paste List
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsMapPickerOpen(true)}
            icon={<MapPin className="w-4 h-4 text-[#D7372B]" />}
          >
            Drop Pin
          </Button>
        </div>
      </div>

      {/* 2. QUICK ADD MUMBAI HUBS STRIP */}
      <div className="mb-6">
        <div className="font-mono text-[11px] font-bold text-[#0E0E0E]/70 uppercase mb-2 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-[#0E0E0E]" />
          <span>Quick Add Popular Mumbai Hubs:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickAddLandmarks.map((lm) => (
            <button
              key={lm.name}
              type="button"
              onClick={() => handleQuickAdd(lm)}
              className="px-2.5 py-1 bg-white hover:bg-[#F6B800] border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs font-bold text-[#0E0E0E] shadow-hard-sm active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>{lm.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. TWO-PANE LAYOUT: INPUT FORM (LEFT) & DRAGGABLE STOPCARDS LIST (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANE: INPUT FORM */}
        <div className="lg:col-span-5 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-5">
          <div className="flex items-center justify-between border-b-2 border-[#0E0E0E] pb-3 mb-4">
            <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase">
              ADD SINGLE STOP
            </span>
            <span className="font-mono text-[11px] text-[#0E0E0E]/60">
              Corridor: South-Central Run
            </span>
          </div>

          <form onSubmit={handleAddStopSubmit} className="space-y-4">
            {/* Pickup vs Drop Type Selector */}
            <div>
              <label className="block font-display font-bold text-xs uppercase mb-1">
                Stop Type *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('drop')}
                  className={`h-11 px-3 rounded-[4px] border-2 border-[#0E0E0E] font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    type === 'drop'
                      ? 'bg-[#15171A] text-white shadow-hard-sm'
                      : 'bg-[#F4F1EA] text-[#0E0E0E] hover:bg-white'
                  }`}
                >
                  <ArrowDownRight className="w-4 h-4 text-[#F6B800]" />
                  <span>DROP / DELIVER</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('pickup')}
                  className={`h-11 px-3 rounded-[4px] border-2 border-[#0E0E0E] font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    type === 'pickup'
                      ? 'bg-[#E58A00] text-[#0E0E0E] shadow-hard-sm'
                      : 'bg-[#F4F1EA] text-[#0E0E0E] hover:bg-white'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>PICKUP / RETURN</span>
                </button>
              </div>
            </div>

            {/* Recipient / Business Name */}
            <div>
              <label className="block font-display font-bold text-xs uppercase mb-1">
                Recipient / Firm Name *
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Dr. Suresh Mehta / WeWork Reception"
                className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
              />
            </div>

            {/* Address with Mock Autocomplete */}
            <div className="relative" ref={autocompleteRef}>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-display font-bold text-xs uppercase">
                  Address / Search Location *
                </label>
                <button
                  type="button"
                  onClick={() => setIsMapPickerOpen(true)}
                  className="font-mono text-[11px] font-bold text-[#E58A00] hover:underline flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Drop Pin on Map</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={addressQuery}
                  onChange={(e) => {
                    setAddressQuery(e.target.value);
                    setAddress(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Type landmark or street (e.g. Dadar Portuguese, BKC Jio, Lower Parel)"
                  className="w-full h-11 pl-9 pr-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
                <Search className="w-4 h-4 text-[#0E0E0E]/50 absolute left-3 top-3.5" />
              </div>

              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-lg z-30 max-h-56 overflow-y-auto">
                  <div className="p-2 bg-[#15171A] text-white font-mono text-[10px] font-bold uppercase">
                    MUMBAI LOCALITY AUTOCOMPLETE ({suggestions.length} MATCHES)
                  </div>
                  {suggestions.map((place) => (
                    <div
                      key={place.name}
                      onClick={() => handleSelectSuggestion(place)}
                      className="p-2.5 hover:bg-[#F6B800] hover:text-[#0E0E0E] border-b border-[#0E0E0E]/15 last:border-b-0 cursor-pointer transition-colors"
                    >
                      <div className="font-display font-bold text-xs">{place.name}</div>
                      <div className="font-body text-[11px] text-[#0E0E0E]/70">
                        {place.address} · {place.landmark} ({place.area})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Area & Landmark */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-display font-bold text-xs uppercase mb-1">
                  Area / Zone *
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Dadar West"
                  className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
              </div>

              <div>
                <label className="block font-display font-bold text-xs uppercase mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opp. Plaza Cinema"
                  className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
              </div>
            </div>

            {/* Priority Selector (3 Big Segmented Buttons) */}
            <div>
              <label className="block font-display font-bold text-xs uppercase mb-1.5">
                Priority Tier (3 Big Segmented Buttons) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`min-h-[50px] p-2 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    priority === 'high'
                      ? 'bg-[#D7372B] text-white shadow-hard-sm ring-2 ring-[#0E0E0E]'
                      : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
                  }`}
                >
                  <span className="font-extrabold">HIGH</span>
                  <span className="text-[10px] opacity-90 font-normal">Urgent</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`min-h-[50px] p-2 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    priority === 'medium'
                      ? 'bg-[#E58A00] text-[#0E0E0E] shadow-hard-sm ring-2 ring-[#0E0E0E]'
                      : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
                  }`}
                >
                  <span className="font-extrabold">MEDIUM</span>
                  <span className="text-[10px] opacity-90 font-normal">Scheduled</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`min-h-[50px] p-2 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    priority === 'low'
                      ? 'bg-[#3E7C7A] text-white shadow-hard-sm ring-2 ring-[#0E0E0E]'
                      : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
                  }`}
                >
                  <span className="font-extrabold">LOW</span>
                  <span className="text-[10px] opacity-90 font-normal">Flexible</span>
                </button>
              </div>
            </div>

            {/* Optional Fields: Deadline Time Picker & Customer Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-display font-bold text-xs uppercase mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deadline Time</span>
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. 01:30 PM"
                  className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
              </div>

              <div>
                <label className="block font-display font-bold text-xs uppercase mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 XXXXX"
                  className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
              </div>
            </div>

            {/* Optional COD Amount & Parcel Count */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-display font-bold text-xs uppercase mb-1 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>COD Amount (₹)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={codAmount}
                  onChange={(e) => setCodAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0 (Prepaid)"
                  className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
              </div>

              <div>
                <label className="block font-display font-bold text-xs uppercase mb-1">
                  Parcel Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={parcels}
                  onChange={(e) => setParcels(Number(e.target.value))}
                  className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
                />
              </div>
            </div>

            {/* Note / Special Instructions */}
            <div>
              <label className="block font-display font-bold text-xs uppercase mb-1">
                Rider Delivery Instructions
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ring bell twice / 3rd floor no elevator"
                className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F6B800]"
              />
            </div>

            {/* Add Stop Button (56px touch target) */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="touch"
                icon={<Plus className="w-5 h-5 stroke-[2.5]" />}
              >
                Add Stop to Sequence
              </Button>
            </div>
          </form>
        </div>

        {/* RIGHT PANE: DRAGGABLE STOPCARDS LIST */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#0E0E0E] pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-[#0E0E0E] uppercase block">
                MANIFEST SEQUENCE ({stops.length} STOPS)
              </span>
              <span className="font-body text-xs text-[#0E0E0E]/70">
                Drag handle to reorder, swipe left to delete, or tap to edit details.
              </span>
            </div>

            <button
              type="button"
              onClick={handleLoadDemoDay}
              className="font-mono text-xs font-bold text-[#0E0E0E] hover:text-[#E58A00] underline cursor-pointer"
            >
              Reset to Demo Day
            </button>
          </div>

          {stops.length === 0 ? (
            <EmptyState
              title="Manifest is Empty"
              description="Add stops using the form on the left, paste a WhatsApp list, or load the 8-stop Mumbai demo day."
              actionLabel="Load 8 Mumbai Stops"
              onAction={handleLoadDemoDay}
              illustrationType="clipboard"
            />
          ) : (
            <div className="space-y-3">
              {stops.map((stop, idx) => (
                <StopCard
                  key={stop.id}
                  stop={stop}
                  draggable
                  dragIndex={idx}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  isFirst={idx === 0}
                  isLast={idx === stops.length - 1}
                  onEdit={(s) => setEditingStop(s)}
                  onDelete={(id) => removeStop(id)}
                  onSelect={(s) => setEditingStop(s)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t-2 border-[#0E0E0E] p-3 shadow-[0_-4px_0_0_#0E0E0E]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]">
              {stops.length} STOPS READY · {stats.highPriorityCount} HIGH PRIORITY
            </div>
            <div className="font-mono text-[11px] text-[#0E0E0E]/70">
              {stops.length < 2
                ? 'Add at least 2 stops to unlock route optimization'
                : `Corridor run ~${stats.totalKm} KM · ~${stats.totalMinutes} mins`}
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="touch"
              disabled={stops.length < 2}
              onClick={() => {
                optimizeRoute();
                navigate('/route');
              }}
              icon={<Sparkles className="w-5 h-5 text-[#0E0E0E] stroke-[2.5]" />}
              fullWidth
            >
              {stops.length < 2
                ? 'Add 2+ Stops to Optimise'
                : 'Optimise Route Sequence'}
            </Button>
          </div>
        </div>
      </div>

      {/* Modals & Bottom Sheets */}
      <MapPickerModal
        isOpen={isMapPickerOpen}
        onClose={() => setIsMapPickerOpen(false)}
        onSelectLocation={handleMapPinSelected}
      />

      <PasteListModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onImport={(newStops) => addMultipleStops(newStops)}
      />

      <EditStopBottomSheet
        stop={editingStop}
        isOpen={Boolean(editingStop)}
        onClose={() => setEditingStop(null)}
        onSave={updateStop}
        onDelete={removeStop}
        allStops={stops}
      />
    </div>
  );
};
