import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { StopCard } from '../components/common/StopCard';
import { Chip } from '../components/common/Chip';
import { Toggle } from '../components/common/Toggle';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { DeliveryStop } from '../data/mockStops';
import {
  Palette,
  Type,
  Layers,
  Component,
  Plus,
  ArrowRight,
  Trash2,
  CheckCircle,
} from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleState1, setToggleState1] = useState(true);
  const [toggleState2, setToggleState2] = useState(false);
  const [activeChip, setActiveChip] = useState('all');

  // Sample stop for card demo
  const sampleStop: DeliveryStop = {
    id: 'demo-stop',
    order: 3,
    recipientName: 'Kunal Singhania (TechFin Corp)',
    phone: '+91 98334 11209',
    address: 'Tower 4, 11th Floor, One World Center, Senapati Bapat Marg',
    area: 'Lower Parel',
    landmark: 'Opposite High Street Phoenix entrance',
    priority: 'high',
    type: 'drop',
    deadline: '01:45 PM',
    parcelCount: 3,
    codAmount: 1250,
    status: 'pending',
    etaMinutes: 38,
    distanceKm: 7.2,
    notes: 'ID proof needed at security reception gate 3',
    coordinates: { lat: 18.9953, lng: 72.8288 },
  };

  const [completedDemo, setCompletedDemo] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Page Header */}
      <div className="border-b-2 border-[#0E0E0E] pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0E0E0E]/70 uppercase tracking-wider mb-2">
          <Component className="w-4 h-4 text-[#F6B800]" />
          <span>ROUTWALA DESIGN SPECIFICATION</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E0E0E]">
          Design System & Token Library
        </h1>
        <p className="font-body text-base text-[#0E0E0E]/80 max-w-2xl mt-1">
          A Mumbai transit-signage inspired UI system: asphalt #15171A, taxi yellow #F6B800, paper #F4F1EA, 2px borders, 4px hard offset shadows, ticket-stub notches, and min 56px touch ergonomics.
        </p>
      </div>

      {/* 1. COLOR TOKENS */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-[#0E0E0E]" />
          <h2 className="font-display font-bold text-2xl text-[#0E0E0E]">
            01. Color Palette Tokens
          </h2>
        </div>
        <p className="font-body text-sm text-[#0E0E0E]/70 mb-6">
          High-contrast daylight readable transit colors adhering to WCAG AA contrast standards.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { name: 'Asphalt', hex: '#15171A', bg: 'bg-[#15171A]', text: 'text-white', role: 'Road & Dark UI' },
            { name: 'Taxi Yellow', hex: '#F6B800', bg: 'bg-[#F6B800]', text: 'text-[#0E0E0E]', role: 'Primary Accent & CTAs' },
            { name: 'Paper Canvas', hex: '#F4F1EA', bg: 'bg-[#F4F1EA]', text: 'text-[#0E0E0E]', role: 'App Background' },
            { name: 'Ink Black', hex: '#0E0E0E', bg: 'bg-[#0E0E0E]', text: 'text-white', role: 'Borders & Typography' },
            { name: 'Signal Red', hex: '#D7372B', bg: 'bg-[#D7372B]', text: 'text-white', role: 'High Priority Urgency' },
            { name: 'Amber Transit', hex: '#E58A00', bg: 'bg-[#E58A00]', text: 'text-[#0E0E0E]', role: 'Medium Scheduled Run' },
            { name: 'Slate Teal', hex: '#3E7C7A', bg: 'bg-[#3E7C7A]', text: 'text-white', role: 'Low Priority Flexible' },
            { name: 'Success Green', hex: '#2E7D4F', bg: 'bg-[#2E7D4F]', text: 'text-white', role: 'Delivered & Optimal' },
          ].map((c) => (
            <div
              key={c.name}
              className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard-sm overflow-hidden bg-white"
            >
              <div className={`h-20 ${c.bg} flex items-center justify-center p-2`}>
                <span className={`font-mono font-bold text-xs ${c.text}`}>{c.hex}</span>
              </div>
              <div className="p-2.5">
                <div className="font-display font-bold text-xs text-[#0E0E0E]">{c.name}</div>
                <div className="font-body text-[10px] text-[#0E0E0E]/60 mt-0.5">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TYPOGRAPHY TOKENS */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-[#0E0E0E]" />
          <h2 className="font-display font-bold text-2xl text-[#0E0E0E]">
            02. Typographic Scale
          </h2>
        </div>

        <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6 space-y-6">
          <div className="border-b-2 border-dashed border-[#0E0E0E]/20 pb-4">
            <span className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase">
              DISPLAY FACE: Bricolage Grotesque (Bold, Tight, Signage Impact)
            </span>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E0E0E] mt-1">
              DADAR CENTRAL → LOWER PAREL CORRIDOR
            </div>
          </div>

          <div className="border-b-2 border-dashed border-[#0E0E0E]/20 pb-4">
            <span className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase">
              BODY FACE: Instrument Sans (15px–16px, 1.5 line height, high readability)
            </span>
            <p className="font-body text-base text-[#0E0E0E]/80 mt-1 max-w-2xl">
              Turn 15 chaotic WhatsApp delivery addresses into a sequenced, prioritized run. With on-the-way chai and vada pav stops that never add dead kilometers.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase">
              MONO METRIC FACE: IBM Plex Mono (Tabular numerals, stop numbers, ETAs)
            </span>
            <div className="font-mono font-bold text-lg text-[#0E0E0E] mt-1 flex flex-wrap gap-6">
              <span>STOP: #04</span>
              <span>ETA: +38m</span>
              <span>DIST: 7.2 KM</span>
              <span>TEL: +91 98334 11209</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHAPE LANGUAGE & SHADOW MOTIF */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#0E0E0E]" />
          <h2 className="font-display font-bold text-2xl text-[#0E0E0E]">
            03. Shape Language, Notches & Shadows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-2">
              HARD OFFSET SHADOW
            </div>
            <div className="font-display font-bold text-lg mb-2">4px 4px 0 #0E0E0E</div>
            <p className="font-body text-xs text-[#0E0E0E]/70">
              No soft fuzzy blurs or glassmorphism. Flat tactile ink stamp shadows inspired by Indian railway timetables.
            </p>
          </div>

          <div className="ticket-stub p-5 shadow-hard bg-white">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-2">
              TICKET-STUB NOTCHES
            </div>
            <div className="font-display font-bold text-lg mb-2">Circular Side Cutouts</div>
            <p className="font-body text-xs text-[#0E0E0E]/70">
              Semi-circle punch holes on left and right borders echoing conductor bus tickets and parcel manifests.
            </p>
          </div>

          <div className="p-5 border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-2">
              DASHED ROUTE CONNECTOR
            </div>
            <div className="w-full h-2 my-3 dashed-route-h" />
            <p className="font-body text-xs text-[#0E0E0E]/70">
              6px dashed transit track connecting milestones without solid wall dividers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMPONENT LIBRARY DEMO */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-4">
          <Component className="w-5 h-5 text-[#0E0E0E]" />
          <h2 className="font-display font-bold text-2xl text-[#0E0E0E]">
            04. Component Library Sandbox
          </h2>
        </div>

        {/* Buttons */}
        <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6 mb-8">
          <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-4">
            BUTTON VARIANTS (Min 56px touch target default)
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" icon={<Plus className="w-5 h-5" />}>
              Primary Yellow (56px)
            </Button>
            <Button variant="secondary" icon={<ArrowRight className="w-5 h-5" />}>
              Secondary Outline
            </Button>
            <Button variant="danger" icon={<Trash2 className="w-5 h-5" />}>
              Danger Action
            </Button>
            <Button variant="asphalt">Asphalt Dark</Button>
            <Button variant="primary" size="sm">
              Small (36px)
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </div>

        {/* Priority Badges with Distinct Geometric Shapes */}
        <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6 mb-8">
          <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-2">
            PRIORITY BADGES (Distinct Geometric Shapes, not just color!)
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70 mb-4">
            Accessible for color-blind riders: High has an octagonal chamfered shield; Med has an inset transit token cut; Low has a rounded parallelogram.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <PriorityBadge priority="high" size="lg" />
              <PriorityBadge priority="high" size="md" />
              <PriorityBadge priority="high" size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <PriorityBadge priority="medium" size="lg" />
              <PriorityBadge priority="medium" size="md" />
              <PriorityBadge priority="medium" size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <PriorityBadge priority="low" size="lg" />
              <PriorityBadge priority="low" size="md" />
              <PriorityBadge priority="low" size="sm" />
            </div>
          </div>
        </div>

        {/* StopCard Demo */}
        <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase">
              STOPCARD COMPONENT (Interactive ticket-stub)
            </div>
            <button
              onClick={() => setCompletedDemo(!completedDemo)}
              className="font-mono text-xs font-bold underline cursor-pointer"
            >
              Toggle Delivered Stamp ({completedDemo ? 'Completed' : 'Pending'})
            </button>
          </div>

          <div className="max-w-xl">
            <StopCard
              stop={{
                ...sampleStop,
                status: completedDemo ? 'completed' : 'pending',
              }}
              isCurrent={!completedDemo}
              onComplete={() => setCompletedDemo(true)}
            />
          </div>
        </div>

        {/* Interactive Chips & Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Chips */}
          <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-4">
              INTERACTIVE CHIPS (Category filter buttons)
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip
                label="All Drops"
                count={14}
                active={activeChip === 'all'}
                onClick={() => setActiveChip('all')}
              />
              <Chip
                label="Urgent High"
                count={3}
                active={activeChip === 'high'}
                onClick={() => setActiveChip('high')}
              />
              <Chip
                label="Chai Pitstops"
                count={4}
                active={activeChip === 'pitstops'}
                onClick={() => setActiveChip('pitstops')}
              />
              <Chip
                label="Dadar Corridor"
                count={6}
                active={activeChip === 'dadar'}
                onClick={() => setActiveChip('dadar')}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-2">
              TOGGLE SWITCHES
            </div>
            <div className="space-y-2">
              <Toggle
                id="toggle-demo-1"
                checked={toggleState1}
                onChange={setToggleState1}
                label="High-Contrast Sunlight Mode"
                sublabel="Maximizes border weight and turns backgrounds pure white for midday riding"
              />
              <Toggle
                id="toggle-demo-2"
                checked={toggleState2}
                onChange={setToggleState2}
                label="Audio Milestone Alert"
                sublabel="Chimes when approaching within 200m of a pinned pitstop"
              />
            </div>
          </div>
        </div>

        {/* Modal / BottomSheet Trigger */}
        <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6 mb-8">
          <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-2">
            MODAL & MOBILE BOTTOM SHEET
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70 mb-4">
            Slides up from bottom on mobile with grab handle; centers as dialog on desktop.
          </p>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open Sample Transit Dialog
          </Button>

          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Express Reordering"
            subtitle="Corridor optimization will shift Stop #03 to First"
            footer={
              <>
                <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={() => setModalOpen(false)}>
                  Confirm Reorder
                </Button>
              </>
            }
          >
            <p className="text-sm text-[#0E0E0E]/80 mb-3">
              RouteWala detected an urgent prescription medicine at <strong>Kothari Heights, Dadar West</strong> that has a 11:30 AM deadline.
            </p>
            <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs">
              ESTIMATED TIME SAVED: 18 MINUTES
            </div>
          </Modal>
        </div>

        {/* Empty State Demo */}
        <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard bg-white p-6">
          <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-4">
            EMPTY STATE COMPONENT
          </div>
          <EmptyState
            title="No Pending Deliveries in Manifest"
            description="Add your first delivery parcel or import from WhatsApp to begin sequencing your day."
            actionLabel="Add First Stop"
            onAction={() => alert('Quick Add triggered!')}
          />
        </div>
      </section>
    </div>
  );
};
