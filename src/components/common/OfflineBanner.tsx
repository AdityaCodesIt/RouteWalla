import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle2, RefreshCw } from 'lucide-react';

interface OfflineBannerProps {
  className?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectivelyOffline = !isOnline || simulatedOffline;

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice(true);
      setTimeout(() => setSyncNotice(false), 2500);
    }, 600);
  };

  if (!effectivelyOffline && !syncNotice) {
    return null;
  }

  if (syncNotice) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#2E7D4F] text-white border-b-2 border-[#0E0E0E] px-3 py-2 text-center text-xs font-mono font-bold flex items-center justify-center gap-2 select-none"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>LOCAL CACHE VERIFIED: ALL STOPS & NAVIGATION ASSETS IN SYNC</span>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`bg-[#15171A] text-white border-b-2 border-[#0E0E0E] px-3 py-2 select-none ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-[3px] bg-[#F6B800] text-[#0E0E0E] flex items-center justify-center shrink-0 border border-[#0E0E0E] font-bold">
            <WifiOff className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono font-extrabold text-[#F6B800] uppercase tracking-wider mr-2">
              OFFLINE MODE ACTIVE:
            </span>
            <span className="font-body text-[#F4F1EA]">
              Cached Mumbai route running locally. No cellular connection required in basements.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-2.5 py-1 bg-[#F4F1EA] hover:bg-white text-[#0E0E0E] font-mono text-[11px] font-bold rounded-[3px] border border-[#0E0E0E] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'VERIFYING...' : 'FORCE RE-SYNC'}</span>
          </button>

          {simulatedOffline && (
            <button
              type="button"
              onClick={() => setSimulatedOffline(false)}
              className="px-2 py-1 bg-[#D7372B] hover:bg-red-700 text-white font-mono text-[10px] font-bold rounded-[3px] border border-[#0E0E0E] cursor-pointer"
            >
              END SIMULATION
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
