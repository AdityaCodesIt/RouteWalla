import React from 'react';
import { Link } from 'react-router-dom';
import { useRoute } from '../context/RouteContext';
import { Button } from '../components/common/Button';
import { PriorityBadge } from '../components/common/PriorityBadge';
import {
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Compass,
  MapPin,
  Utensils,
  PhoneCall,
  CloudRain,
  Clock,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useRoute();

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative border-b-2 border-[#0E0E0E] bg-[#F4F1EA] py-12 md:py-20 px-4 md:px-8 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#0E0E0E 1px, transparent 1px), linear-gradient(90deg, #0E0E0E 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7">
              {/* Editorial Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#15171A] text-[#F6B800] border-2 border-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-wider mb-5 shadow-hard-sm">
                <Compass className="w-4 h-4 text-[#F6B800]" />
                <span>{t.heroBadge}</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0E0E0E] tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
                {t.heroHeadline}
              </h1>

              {/* Subtitle */}
              <p className="font-body text-base sm:text-lg text-[#0E0E0E]/80 leading-relaxed max-w-2xl mb-8">
                {t.heroSubtitle}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link to="/plan">
                  <Button
                    variant="primary"
                    size="touch"
                    icon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                  >
                    {t.planMyDay}
                  </Button>
                </Link>

                <Link to="/design">
                  <Button variant="secondary" size="touch">
                    {t.exploreDesign}
                  </Button>
                </Link>
              </div>

              {/* College Project Rigor Meta Strip */}
              <div className="mt-8 pt-6 border-t-2 border-[#0E0E0E]/20 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#0E0E0E]/70">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#2E7D4F] border border-[#0E0E0E]" />
                  <span>100% Client-Side LocalStorage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#F6B800] border border-[#0E0E0E]" />
                  <span>56px Touch Target Ergonomics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D7372B] border border-[#0E0E0E]" />
                  <span>Multilingual (EN / हिंदी / मराठी)</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Animated Dashed Route Line connecting 5 Mumbai Stop Pins */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFFFF] border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-5 relative">
                {/* Board Header */}
                <div className="flex items-center justify-between border-b-2 border-[#0E0E0E] pb-3 mb-4 bg-[#F4F1EA] -mx-5 -mt-5 p-3 rounded-t-[4px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#D7372B] border border-[#0E0E0E]" />
                    <span className="w-3 h-3 rounded-full bg-[#F6B800] border border-[#0E0E0E]" />
                    <span className="w-3 h-3 rounded-full bg-[#2E7D4F] border border-[#0E0E0E]" />
                    <span className="font-mono text-xs font-bold text-[#0E0E0E] ml-2">
                      MUMBAI SOUTH RUN #402
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-[#15171A] text-white px-2 py-0.5 border border-[#0E0E0E]">
                    LIVE
                  </span>
                </div>

                {/* Simulated Transit Map Visual with SVG Dashed Line */}
                <div className="relative py-2">
                  {/* Vertical Dashed SVG Route Line */}
                  <svg
                    className="absolute left-6 top-6 bottom-6 w-8 h-[calc(100%-48px)] pointer-events-none"
                    aria-hidden="true"
                  >
                    <line
                      x1="12"
                      y1="0"
                      x2="12"
                      y2="100%"
                      stroke="#0E0E0E"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* 5 Stops Along Corridor */}
                  <div className="space-y-4 relative z-10">
                    {[
                      {
                        num: '01',
                        name: 'Bandra Kurla Complex (BKC)',
                        type: 'High Priority Medical',
                        eta: '+12m',
                        tag: 'HIGH',
                        color: 'bg-[#D7372B]',
                        textColor: 'text-white',
                      },
                      {
                        num: '02',
                        name: 'Dadar Station East (Kabutar Khana)',
                        type: 'Parcels (2)',
                        eta: '+24m',
                        tag: 'MED',
                        color: 'bg-[#E58A00]',
                        textColor: 'text-[#0E0E0E]',
                      },
                      {
                        num: '⭐',
                        name: 'Ashok Vada Pav (Kirti College)',
                        type: 'On-the-way Pitstop (0 min detour)',
                        eta: '12:35 PM',
                        tag: 'SNACK',
                        color: 'bg-[#F6B800]',
                        textColor: 'text-[#0E0E0E]',
                        isWishlist: true,
                      },
                      {
                        num: '03',
                        name: 'Lower Parel (One World Center)',
                        type: 'Courier Reception',
                        eta: '+45m',
                        tag: 'HIGH',
                        color: 'bg-[#D7372B]',
                        textColor: 'text-white',
                      },
                      {
                        num: '04',
                        name: 'Colaba Causeway (Regal Cinema)',
                        type: 'Bulk Drop',
                        eta: '+70m',
                        tag: 'LOW',
                        color: 'bg-[#3E7C7A]',
                        textColor: 'text-white',
                      },
                    ].map((stop, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 p-2.5 rounded-[4px] border-2 border-[#0E0E0E] transition-transform ${
                          stop.isWishlist
                            ? 'bg-[#FFF9E6] border-dashed shadow-hard-sm ml-2'
                            : 'bg-white shadow-hard-sm'
                        }`}
                      >
                        {/* Stop Number Token */}
                        <div
                          className={`w-9 h-9 shrink-0 flex items-center justify-center font-mono font-bold text-sm border-2 border-[#0E0E0E] rounded-[3px] ${stop.color} ${stop.textColor}`}
                        >
                          {stop.num}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-display font-bold text-xs text-[#0E0E0E] truncate">
                              {stop.name}
                            </h4>
                            <span className="font-mono text-[10px] font-bold text-[#0E0E0E]/80 shrink-0">
                              {stop.eta}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-body text-[#0E0E0E]/70">
                            <span className="truncate">{stop.type}</span>
                            <span className="font-mono text-[10px] font-bold uppercase">
                              {stop.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metric on board */}
                <div className="mt-4 pt-3 border-t-2 border-[#0E0E0E] flex items-center justify-between font-mono text-xs font-bold text-[#0E0E0E]">
                  <span>TOTAL RUN: 18.2 KM</span>
                  <span className="text-[#2E7D4F]">SAVING ~42 MINS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (3 Mumbai-flavoured Scenarios) */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#0E0E0E] bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-12">
            <div className="font-mono text-xs font-bold text-[#D7372B] uppercase tracking-widest mb-2">
              GROUND REALITY RESEARCH
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E0E0E] tracking-tight mb-4">
              {t.problem.title}
            </h2>
            <p className="font-body text-base text-[#0E0E0E]/75 max-w-2xl">
              {t.problem.subtitle}
            </p>
          </div>

          {/* 3 Ticket-style Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="ticket-stub p-6 bg-[#FFFFFF] shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 mb-4 rounded-[4px] border-2 border-[#0E0E0E] bg-[#D7372B] text-white flex items-center justify-center font-mono font-bold shadow-hard-sm">
                  <CloudRain className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-1">
                  SCENARIO 01 · MONSOON
                </div>
                <h3 className="font-display font-bold text-xl text-[#0E0E0E] mb-3 leading-snug">
                  {t.problem.card1Title}
                </h3>
                <p className="font-body text-sm text-[#0E0E0E]/80 leading-relaxed">
                  {t.problem.card1Text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#0E0E0E]/20 font-mono text-xs font-bold text-[#D7372B]">
                RESULT: 35 MINS LOST TO PULL-OVERS
              </div>
            </div>

            {/* Card 2 */}
            <div className="ticket-stub p-6 bg-[#FFFFFF] shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 mb-4 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] flex items-center justify-center font-mono font-bold shadow-hard-sm">
                  <Utensils className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-1">
                  SCENARIO 02 · PITSTOP
                </div>
                <h3 className="font-display font-bold text-xl text-[#0E0E0E] mb-3 leading-snug">
                  {t.problem.card2Title}
                </h3>
                <p className="font-body text-sm text-[#0E0E0E]/80 leading-relaxed">
                  {t.problem.card2Text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#0E0E0E]/20 font-mono text-xs font-bold text-[#E58A00]">
                RESULT: SKIPPED MEALS & REFUEL FATIGUE
              </div>
            </div>

            {/* Card 3 */}
            <div className="ticket-stub p-6 bg-[#FFFFFF] shadow-hard flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 mb-4 rounded-[4px] border-2 border-[#0E0E0E] bg-[#15171A] text-white flex items-center justify-center font-mono font-bold shadow-hard-sm">
                  <PhoneCall className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase mb-1">
                  SCENARIO 03 · DISPATCH
                </div>
                <h3 className="font-display font-bold text-xl text-[#0E0E0E] mb-3 leading-snug">
                  {t.problem.card3Title}
                </h3>
                <p className="font-body text-sm text-[#0E0E0E]/80 leading-relaxed">
                  {t.problem.card3Text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#0E0E0E]/20 font-mono text-xs font-bold text-[#15171A]">
                RESULT: 40+ MANUAL TAPS PER RESEQUENCE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 tactile steps) */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#0E0E0E] bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-mono text-xs font-bold text-[#2E7D4F] uppercase tracking-widest mb-2">
              WORKFLOW ARCHITECTURE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E0E0E] tracking-tight mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="font-body text-base text-[#0E0E0E]/75 max-w-2xl">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: t.howItWorks.step1Title,
                desc: t.howItWorks.step1Desc,
                badge: 'WHATSAPP PASTE',
              },
              {
                step: '02',
                title: t.howItWorks.step2Title,
                desc: t.howItWorks.step2Desc,
                badge: 'HARD DEADLINES',
              },
              {
                step: '03',
                title: t.howItWorks.step3Title,
                desc: t.howItWorks.step3Desc,
                badge: 'CORRIDOR OPTIMIZER',
              },
              {
                step: '04',
                title: t.howItWorks.step4Title,
                desc: t.howItWorks.step4Desc,
                badge: '56PX DRIVER MODE',
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-extrabold text-2xl text-[#0E0E0E] bg-[#F6B800] border-2 border-[#0E0E0E] w-10 h-10 flex items-center justify-center rounded-[4px] shadow-hard-sm">
                      {st.step}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0E0E0E]/70 uppercase border border-[#0E0E0E]/30 px-2 py-0.5">
                      {st.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0E0E0E] mb-2 leading-snug">
                    {st.title}
                  </h3>
                  <p className="font-body text-sm text-[#0E0E0E]/75 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#0E0E0E]/10 flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0E0E0E]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E0E]" />
                  <span>Tactile action verified</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/plan">
              <Button variant="primary" size="touch" icon={<ArrowRight className="w-5 h-5" />}>
                Try It With 5 Real Stops
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GOOGLE MAPS VS ROUTEWALA COMPARISON TABLE */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#0E0E0E] bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase tracking-widest mb-2">
              FIELD BENCHMARKS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E0E0E] tracking-tight mb-3">
              {t.comparison.title}
            </h2>
            <p className="font-body text-base text-[#0E0E0E]/75 max-w-xl mx-auto">
              {t.comparison.subtitle}
            </p>
          </div>

          {/* Table Container */}
          <div className="border-2 border-[#0E0E0E] rounded-[6px] shadow-hard overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#15171A] text-white font-mono text-xs uppercase border-b-2 border-[#0E0E0E]">
                  <th className="p-4 border-r-2 border-[#0E0E0E] min-w-[200px]">
                    {t.comparison.featureCol}
                  </th>
                  <th className="p-4 border-r-2 border-[#0E0E0E] min-w-[220px] text-red-200">
                    {t.comparison.gmapsCol}
                  </th>
                  <th className="p-4 bg-[#F6B800] text-[#0E0E0E] font-bold min-w-[240px]">
                    {t.comparison.routewalaCol}
                  </th>
                </tr>
              </thead>
              <tbody className="font-body text-sm divide-y-2 divide-[#0E0E0E]/15">
                {[
                  {
                    feature: 'Multi-stop sequence optimization',
                    gmaps: 'Manual dragging only, no urgency logic',
                    gmapsOk: false,
                    rw: 'Automatic priority + geographic corridor sort',
                    rwOk: true,
                  },
                  {
                    feature: 'Rain & wet finger usability',
                    gmaps: 'Tiny 24px text search bars, typing needed',
                    gmapsOk: false,
                    rw: 'Massive 56px touch buttons & single-tap Next',
                    rwOk: true,
                  },
                  {
                    feature: 'Offline ticket stub manifest',
                    gmaps: 'Stalls when signal drops in Dadar subway',
                    gmapsOk: false,
                    rw: '100% offline manifest stored on device',
                    rwOk: true,
                  },
                  {
                    feature: 'On-the-way chai & snack wishlist',
                    gmaps: 'Adds separate route diversion with detour miles',
                    gmapsOk: false,
                    rw: 'Alerts you only if drop is ≤150m from tapri',
                    rwOk: true,
                  },
                  {
                    feature: 'Direct 1-tap customer call',
                    gmaps: 'Requires leaving map to open dialer or chat',
                    gmapsOk: false,
                    rw: 'Instant tel: button on every stop card',
                    rwOk: true,
                  },
                  {
                    feature: 'Glaring afternoon sunlight readability',
                    gmaps: 'Subtle gray on white, hard to see on bike stand',
                    gmapsOk: false,
                    rw: 'High contrast transit signage & bold black borders',
                    rwOk: true,
                  },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F1EA]/50'}>
                    <td className="p-4 border-r-2 border-[#0E0E0E] font-semibold text-[#0E0E0E]">
                      {row.feature}
                    </td>
                    <td className="p-4 border-r-2 border-[#0E0E0E] text-[#0E0E0E]/80">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-[#D7372B] shrink-0 mt-0.5" />
                        <span>{row.gmaps}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#0E0E0E] bg-[#FFFBEA]">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2E7D4F] stroke-[3] shrink-0 mt-0.5" />
                        <span>{row.rw}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. ON-THE-WAY WISHLIST FEATURE (Illustrated Hand-drawn Route Example) */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#0E0E0E] bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F6B800] text-[#0E0E0E] border-2 border-[#0E0E0E] font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-hard-sm">
                <Utensils className="w-4 h-4" />
                <span>ZERO DETOUR PITSTOPS</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E0E0E] tracking-tight mb-4 leading-tight">
                {t.wishlistSection.title}
              </h2>
              <p className="font-body text-base text-[#0E0E0E]/80 mb-6 leading-relaxed">
                {t.wishlistSection.desc}
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-white border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm flex items-center justify-between">
                  <span className="font-bold">Ashok Vada Pav (Kirti College)</span>
                  <span className="bg-[#2E7D4F] text-white px-2 py-0.5 font-bold">+0 km detour</span>
                </div>
                <div className="p-3 bg-white border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm flex items-center justify-between">
                  <span className="font-bold">Kyani & Co. (Metro Cinema)</span>
                  <span className="bg-[#2E7D4F] text-white px-2 py-0.5 font-bold">+100m on route</span>
                </div>
                <div className="p-3 bg-white border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm flex items-center justify-between">
                  <span className="font-bold">Shabbir Tyre Repair (Lower Parel)</span>
                  <span className="bg-[#2E7D4F] text-white px-2 py-0.5 font-bold">Under Pillar 42</span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/wishlist">
                  <Button variant="secondary" size="md">
                    Explore Pitstop Catalog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Technical Hand-Drawn Transit Style SVG Map */}
            <div className="lg:col-span-7">
              <div className="bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard p-6">
                <div className="flex items-center justify-between border-b-2 border-[#0E0E0E] pb-3 mb-4">
                  <span className="font-mono text-xs font-bold text-[#0E0E0E]">
                    ROUTE CORRIDOR: DADAR → LOWER PAREL → MARINE LINES
                  </span>
                  <span className="font-mono text-xs font-bold text-[#2E7D4F]">
                    ✓ OPTIMAL ALIGNMENT
                  </span>
                </div>

                {/* Hand-Drawn / Transit Signage SVG Schematic */}
                <div className="w-full overflow-hidden bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] p-4">
                  <svg
                    viewBox="0 0 600 320"
                    className="w-full h-auto text-[#0E0E0E]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Grid Lines */}
                    <path
                      d="M20 80 H580 M20 160 H580 M20 240 H580"
                      stroke="#0E0E0E"
                      strokeWidth="1"
                      strokeDasharray="4 8"
                      strokeOpacity="0.2"
                    />
                    <path
                      d="M120 20 V300 M240 20 V300 M380 20 V300 M500 20 V300"
                      stroke="#0E0E0E"
                      strokeWidth="1"
                      strokeDasharray="4 8"
                      strokeOpacity="0.2"
                    />

                    {/* Main Delivery Route Highway */}
                    <path
                      d="M 60 70 L 190 70 Q 220 70 230 100 L 250 160 Q 260 190 290 190 L 430 190 Q 460 190 470 220 L 490 260 L 540 260"
                      stroke="#0E0E0E"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Yellow Transit Center Line */}
                    <path
                      d="M 60 70 L 190 70 Q 220 70 230 100 L 250 160 Q 260 190 290 190 L 430 190 Q 460 190 470 220 L 490 260 L 540 260"
                      stroke="#F6B800"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Stop 1: Plaza Dadar West */}
                    <g transform="translate(60, 70)">
                      <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#D7372B" stroke="#0E0E0E" strokeWidth="2.5" />
                      <text x="0" y="5" fill="#FFFFFF" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        01
                      </text>
                      <text x="0" y="32" fill="#0E0E0E" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                        Plaza Dadar (High)
                      </text>
                    </g>

                    {/* Wishlist Detour Callout: Ashok Vada Pav */}
                    <g transform="translate(195, 60)">
                      <line x1="0" y1="10" x2="35" y2="-25" stroke="#E58A00" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="35" y="-48" width="165" height="42" rx="4" fill="#FFF9E6" stroke="#0E0E0E" strokeWidth="2" />
                      <circle cx="50" cy="-27" r="8" fill="#F6B800" stroke="#0E0E0E" strokeWidth="1.5" />
                      <text x="50" y="-23" fill="#0E0E0E" fontSize="9" fontWeight="bold" textAnchor="middle">★</text>
                      <text x="66" y="-32" fill="#0E0E0E" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                        Ashok Vada Pav
                      </text>
                      <text x="66" y="-17" fill="#2E7D4F" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        0 KM DETOUR (Kirti Col.)
                      </text>
                    </g>

                    {/* Stop 2: Matoshree Niwas */}
                    <g transform="translate(250, 160)">
                      <rect x="-16" y="-16" width="32" height="32" rx="4" fill="#E58A00" stroke="#0E0E0E" strokeWidth="2.5" />
                      <text x="0" y="5" fill="#0E0E0E" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        02
                      </text>
                      <text x="40" y="5" fill="#0E0E0E" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                        Bhavani Shankar Rd
                      </text>
                    </g>

                    {/* Wishlist Callout 2: Shabbir Tyre Repair */}
                    <g transform="translate(360, 190)">
                      <line x1="0" y1="0" x2="0" y2="40" stroke="#3E7C7A" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="-70" y="40" width="150" height="36" rx="4" fill="#EBF6F6" stroke="#0E0E0E" strokeWidth="2" />
                      <text x="-60" y="55" fill="#0E0E0E" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                        Shabbir Tyre (Pillar 42)
                      </text>
                      <text x="-60" y="68" fill="#3E7C7A" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        Puncture & Air Refill
                      </text>
                    </g>

                    {/* Stop 3: Lower Parel Tech Center */}
                    <g transform="translate(430, 190)">
                      <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#D7372B" stroke="#0E0E0E" strokeWidth="2.5" />
                      <text x="0" y="5" fill="#FFFFFF" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        03
                      </text>
                      <text x="0" y="-24" fill="#0E0E0E" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                        One World Center
                      </text>
                    </g>

                    {/* Stop 4: Colaba Final */}
                    <g transform="translate(540, 260)">
                      <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#3E7C7A" stroke="#0E0E0E" strokeWidth="2.5" />
                      <text x="0" y="5" fill="#FFFFFF" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        04
                      </text>
                      <text x="0" y="32" fill="#0E0E0E" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                        Colaba Market
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#0E0E0E]/70">
                  <span>★ Marked pitstops appear along normal transit corridor</span>
                  <span className="font-bold text-[#0E0E0E]">NO UNWANTED U-TURNS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ACCESSIBILITY & PRIVACY COMMITMENTS */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-b-2 border-[#0E0E0E] bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-[4px] border-2 border-[#0E0E0E] bg-[#2E7D4F] text-white flex items-center justify-center shadow-hard-sm">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0E0E0E] tracking-tight mb-2">
              {t.privacy.title}
            </h2>
            <p className="font-body text-sm sm:text-base text-[#0E0E0E]/70 max-w-lg mx-auto">
              {t.privacy.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border-2 border-[#0E0E0E] rounded-[6px] bg-[#F4F1EA] shadow-hard-sm">
              <div className="font-mono text-xs font-bold text-[#2E7D4F] mb-1">
                COMMITMENT 01
              </div>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] mb-2">
                Location Strictly Opt-In
              </h3>
              <p className="font-body text-xs text-[#0E0E0E]/80 leading-relaxed">
                {t.privacy.optInLoc}
              </p>
            </div>

            <div className="p-5 border-2 border-[#0E0E0E] rounded-[6px] bg-[#F4F1EA] shadow-hard-sm">
              <div className="font-mono text-xs font-bold text-[#2E7D4F] mb-1">
                COMMITMENT 02
              </div>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] mb-2">
                100% Local Storage First
              </h3>
              <p className="font-body text-xs text-[#0E0E0E]/80 leading-relaxed">
                {t.privacy.localOnly}
              </p>
            </div>

            <div className="p-5 border-2 border-[#0E0E0E] rounded-[6px] bg-[#F4F1EA] shadow-hard-sm">
              <div className="font-mono text-xs font-bold text-[#2E7D4F] mb-1">
                COMMITMENT 03
              </div>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] mb-2">
                Underground & Subway Ready
              </h3>
              <p className="font-body text-xs text-[#0E0E0E]/80 leading-relaxed">
                {t.privacy.offlineReady}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t-2 border-[#0E0E0E] bg-[#15171A] text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/20">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-[4px] border-2 border-white bg-[#F6B800] text-[#0E0E0E] font-display font-extrabold text-lg flex items-center justify-center">
                  RW
                </span>
                <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
                  RouteWala
                </span>
              </div>
              <p className="font-body text-sm text-white/70 max-w-sm mb-4">
                A multi-stop route planner engineered for Mumbai delivery workers, courier riders, and dhabawalas navigating the western and central corridors.
              </p>
              <div className="font-mono text-xs text-[#F6B800]">
                TRANSIT DIVISION · MUMBAI METROPOLITAN PROJECT
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="font-mono text-xs font-bold text-[#F6B800] uppercase tracking-wider mb-3">
                APPLICATION ROUTES
              </div>
              <ul className="space-y-2 font-display text-sm">
                <li>
                  <Link to="/plan" className="hover:text-[#F6B800] transition-colors">
                    Plan Stops (/plan)
                  </Link>
                </li>
                <li>
                  <Link to="/route" className="hover:text-[#F6B800] transition-colors">
                    Route Sequence Board (/route)
                  </Link>
                </li>
                <li>
                  <Link to="/go" className="hover:text-[#F6B800] transition-colors">
                    56px Driver Mode (/go)
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-[#F6B800] transition-colors">
                    On-the-Way Pitstops (/wishlist)
                  </Link>
                </li>
                <li>
                  <Link to="/summary" className="hover:text-[#F6B800] transition-colors">
                    Shift Report (/summary)
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <div className="font-mono text-xs font-bold text-[#F6B800] uppercase tracking-wider mb-3">
                DESIGN & ACCESSIBILITY
              </div>
              <ul className="space-y-2 font-display text-sm text-white/80">
                <li>
                  <Link to="/design" className="hover:text-[#F6B800] transition-colors">
                    Design System & Tokens (/design)
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:text-[#F6B800] transition-colors">
                    Preferences & Language (/settings)
                  </Link>
                </li>
                <li className="pt-2 text-xs font-mono text-white/60">
                  Colours: Asphalt #15171A, Taxi Yellow #F6B800, Paper #F4F1EA, Signal Red #D7372B.
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/60">
            <div>RouteWala Mumbai · Open Transit Architecture</div>
            <div>Built for courier riders with gloves and wet screens</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
