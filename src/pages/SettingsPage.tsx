import React, { useState } from 'react';
import { useRoute } from '../context/RouteContext';
import { Button } from '../components/common/Button';
import { Toggle } from '../components/common/Toggle';
import { Modal } from '../components/common/Modal';
import { Language } from '../i18n/translations';
import {
  Sliders,
  Globe,
  Sun,
  Bike,
  Volume2,
  RotateCcw,
  ShieldCheck,
  Check,
  Type,
  MapPin,
  Trash2,
  Download,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    language,
    setLanguage,
    highContrast,
    toggleHighContrast,
    textSize,
    setTextSize,
    blockBackgroundTracking,
    setBlockBackgroundTracking,
    resetToMockData,
    clearAllData,
    vehicle,
    stops,
    stats,
    t,
  } = useRoute();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  const handleResetToDemo = () => {
    resetToMockData();
    showNotification('Sample 5-stop Mumbai manifest restored!');
  };

  const handleConfirmClearAll = () => {
    clearAllData();
    setShowClearConfirmModal(false);
    showNotification('All saved routes, stops, and wishlist items cleared.');
  };

  const handleExportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      summaryStats: stats,
      manifest: stops,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `routewala-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Route backup exported successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 space-y-6 page-fade-in">
      {/* Header */}
      <div className="border-b-2 border-[#0E0E0E] pb-6 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0E0E0E]/60 uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4 text-[#F6B800]" />
          <span>ROUTWALA CONFIGURATION</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0E0E0E]">
          Settings & Rider Preferences
        </h1>
        <p className="font-body text-sm text-[#0E0E0E]/75 mt-1">
          Configure language, daylight legibility on bike mounts, location privacy, and local data storage.
        </p>

        {feedbackNotice && (
          <div className="mt-4 p-2.5 bg-[#2E7D4F] text-white border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs font-bold text-center">
            ✓ {feedbackNotice}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* 1. Language Toggle */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E] mb-1">
            <Globe className="w-5 h-5 text-[#0E0E0E]" />
            <span>Application Language / भाषा</span>
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70 mb-4">
            Select interface language for all stop cards, instructions, and driver mode prompts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { code: 'en' as Language, label: 'English', sub: 'Mumbai Courier' },
              { code: 'hi' as Language, label: 'हिंदी', sub: 'देवनागरी लिपि' },
              { code: 'mr' as Language, label: 'मराठी', sub: 'महाराष्ट्र भाषा' },
            ].map((lng) => (
              <button
                key={lng.code}
                type="button"
                onClick={() => setLanguage(lng.code)}
                className={`p-3.5 rounded-[4px] border-2 border-[#0E0E0E] text-left transition-all cursor-pointer ${
                  language === lng.code
                    ? 'bg-[#F6B800] text-[#0E0E0E] shadow-hard-sm font-bold'
                    : 'bg-[#F4F1EA] text-[#0E0E0E] hover:bg-white'
                }`}
              >
                <div className="font-display font-extrabold text-base">{lng.label}</div>
                <div className="font-mono text-[10px] text-[#0E0E0E]/70 mt-0.5">{lng.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Bike Mount Text Size Accessibility */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E] mb-1">
            <Type className="w-5 h-5 text-[#0E0E0E]" />
            <span>Bike Mount Text Size / फॉन्ट आकार</span>
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70 mb-4">
            Enlarges stop names, landmarks, and street numbers for quick glanceability while mounted on bike handlebars.
          </p>

          <div className="grid grid-cols-3 gap-3 font-mono">
            {[
              { id: 'normal' as const, label: 'Standard', preview: '14px', badge: 'DEFAULT' },
              { id: 'large' as const, label: 'Large (+15%)', preview: '16px', badge: 'RECOMMENDED' },
              { id: 'xlarge' as const, label: 'Extra Large (+25%)', preview: '18px', badge: 'BIKE MOUNT' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setTextSize(s.id)}
                className={`p-3 rounded-[4px] border-2 border-[#0E0E0E] text-left transition-all cursor-pointer ${
                  textSize === s.id
                    ? 'bg-[#F6B800] text-[#0E0E0E] shadow-hard-sm font-bold'
                    : 'bg-[#F4F1EA] text-[#0E0E0E] hover:bg-white'
                }`}
              >
                <div className="font-bold text-sm">{s.label}</div>
                <div className="text-[10px] text-[#0E0E0E]/70 mt-1 font-mono">
                  Scale: {s.preview}
                </div>
                <div className="mt-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-[2px] bg-white border border-[#0E0E0E] inline-block">
                  {s.badge}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Daylight & Sunlight High Contrast */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E] mb-1">
            <Sun className="w-5 h-5 text-[#0E0E0E]" />
            <span>High Contrast & Daylight Accessibility</span>
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70 mb-4">
            Engineered for direct midday Mumbai sunlight. Replaces warm tinted paper with pure stark white and enforces heavy 3px ink borders.
          </p>

          <Toggle
            id="contrast-toggle-setting"
            checked={highContrast}
            onChange={toggleHighContrast}
            label="Enable Midday High Contrast Mode"
            sublabel="Maximum contrast against screen reflections and harsh sun glare"
          />
        </div>

        {/* 4. LOCATION PERMISSION EXPLAINER & NO BACKGROUND TRACKING TOGGLE */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E]">
            <MapPin className="w-5 h-5 text-[#E58A00]" />
            <span>Location Permissions & Privacy Architecture</span>
          </div>

          <div className="p-3.5 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] space-y-2 text-xs font-body">
            <div className="flex items-center gap-2 font-display font-bold text-sm text-[#0E0E0E]">
              <Lock className="w-4 h-4 text-[#2E7D4F]" />
              <span>Zero Background Tracking Guarantee</span>
            </div>
            <p className="text-[#0E0E0E]/80 leading-relaxed">
              RouteWala never runs continuous background GPS beacons or sells courier telematics. Your current location is only queried when you explicitly tap <strong>"Navigate"</strong> or <strong>"Detect My Landmark"</strong>. All stop addresses and client phone numbers remain isolated in your browser’s encrypted localStorage.
            </p>
          </div>

          <Toggle
            id="block-bg-tracking-toggle"
            checked={blockBackgroundTracking}
            onChange={setBlockBackgroundTracking}
            label="Enforce 'No Background Tracking' Mode"
            sublabel="Blocks any background telemetry or wake-lock pings to save phone battery during 8-hour shifts"
          />
        </div>

        {/* 5. Vehicle Profile */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E] mb-1">
            <Bike className="w-5 h-5 text-[#0E0E0E]" />
            <span>Vehicle Profile & Road Restrictions</span>
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70 mb-4">
            Customizes routing constraints for Mumbai flyovers, toll bridges (Bandra-Worli Sea Link prohibits 2-wheelers), and chawl alleyways.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {[
              { id: 'motorcycle', title: 'Motorcycle', detail: 'Splendor / Pulsar' },
              { id: 'scooter', title: 'Scooter', detail: 'Activa / Jupiter' },
              { id: 'ev', title: 'Electric EV', detail: 'Chetak / Ather' },
              { id: 'bicycle', title: 'Cycle / Dabba', detail: 'Bicycle Courier' },
            ].map((v) => (
              <div
                key={v.id}
                className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm"
              >
                <div className="text-[#0E0E0E] font-bold">{v.title}</div>
                <div className="text-[10px] text-[#0E0E0E]/60 font-normal">{v.detail}</div>
                <div className="mt-2 text-[10px] text-[#2E7D4F] font-bold">ACTIVE</div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Audio & Offline Cache */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E]">
            <Volume2 className="w-5 h-5 text-[#0E0E0E]" />
            <span>Audio Chimes & Local Storage</span>
          </div>

          <Toggle
            id="audio-toggle"
            checked={soundEnabled}
            onChange={setSoundEnabled}
            label="Audio Ping on 200m Stop Proximity"
            sublabel="Plays gentle double-tone chime when nearing customer gate"
          />

          <div className="border-t border-[#0E0E0E]/20 pt-4">
            <Toggle
              id="cache-toggle"
              checked={offlineCacheEnabled}
              onChange={setOfflineCacheEnabled}
              label="Keep Full Route Manifest in LocalStorage"
              sublabel="Guarantees operation in parking lots and building basements without network"
            />
          </div>
        </div>

        {/* 7. DATA MANAGEMENT & RESETS */}
        <div className="p-5 sm:p-6 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-[#0E0E0E]">
            <RotateCcw className="w-5 h-5 text-[#0E0E0E]" />
            <span>Data Management & Backup</span>
          </div>
          <p className="font-body text-xs text-[#0E0E0E]/70">
            Export a copy of your run or reset state for new delivery runs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={handleExportJSON}
              icon={<Download className="w-4 h-4" />}
            >
              Export JSON Backup
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={handleResetToDemo}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Mumbai Demo
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={() => setShowClearConfirmModal(true)}
              icon={<Trash2 className="w-4 h-4" />}
            >
              Clear All Data
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Clear All */}
      <Modal
        isOpen={showClearConfirmModal}
        onClose={() => setShowClearConfirmModal(false)}
        title="Clear All Stored Manifests?"
      >
        <div className="space-y-4 font-body">
          <div className="p-3 bg-[#FFF9E6] border-2 border-[#0E0E0E] rounded-[4px] flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#D7372B] shrink-0 mt-0.5" />
            <div className="text-xs text-[#0E0E0E] leading-relaxed">
              This will permanently delete all planned delivery stops, completion histories, wishlist errands, and custom rates from your device.
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowClearConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleConfirmClearAll}
              icon={<Trash2 className="w-4 h-4" />}
            >
              Yes, Clear Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
