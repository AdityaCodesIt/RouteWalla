import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoute } from '../context/RouteContext';
import { Button } from '../components/common/Button';
import { DayReplayMap } from '../components/summary/DayReplayMap';
import { EarningsCalculator } from '../components/summary/EarningsCalculator';
import { EmptyState } from '../components/common/EmptyState';
import {
  CheckCircle2,
  XCircle,
  Share2,
  RotateCcw,
  Clock,
  Navigation,
  IndianRupee,
  FileText,
  Printer,
  Calendar,
  AlertTriangle,
  Download,
  Building,
} from 'lucide-react';

export const SummaryPage: React.FC = () => {
  const {
    stops,
    completedStopIds,
    skippedStopIds,
    stats,
    riderPayPerStop,
    setRiderPayPerStop,
    codBonusPercent,
    setCodBonusPercent,
    fuelAllowancePerKm,
    setFuelAllowancePerKm,
    resetToMockData,
    t,
  } = useRoute();

  const navigate = useNavigate();
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  if (stops.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 page-fade-in">
        <EmptyState
          title="No Active Manifest to Summarize"
          description="You haven't planned or completed any stops yet today. Add delivery addresses or load the Mumbai demo day run to explore the summary."
          actionLabel="Plan New Manifest"
          onAction={() => navigate('/plan')}
          secondaryActionLabel="Load Mumbai Demo"
          onSecondaryAction={() => {
            resetToMockData();
            navigate('/route');
          }}
          illustrationType="clipboard"
        />
      </div>
    );
  }

  const completionRate = Math.round((completedStopIds.length / Math.max(stops.length, 1)) * 100);

  // Simulated timestamps for chronological timeline
  const getStopTimestamp = (idx: number) => {
    const baseHour = 9;
    const minutes = idx * 28 + 15;
    const hour = baseHour + Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
  };

  // WhatsApp formatted share text
  const handleCopyWhatsApp = () => {
    const text = `*ROUTWALA MUMBAI SHIFT REPORT* 📦
📅 Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
👤 Courier Run: Dadar - Byculla - Colaba Corridor

✅ *DELIVERY RECORD:*
• Completed: ${stats.completedCount} / ${stats.totalStops} (${completionRate}%)
• Failed/Returned: ${stats.failedCount}
• Total Distance: ${stats.totalKm} KM
• Shift Time: ~${Math.floor(stats.totalMinutes / 60)}h ${stats.totalMinutes % 60}m

💵 *CASH ON DELIVERY (COD):*
• Cash Collected to Hand Over: ₹${stats.collectedCodAmount.toLocaleString('en-IN')}

💰 *ESTIMATED PAYOUT:*
• Base + Incentive + Fuel: ₹${stats.estimatedEarnings.toLocaleString('en-IN')}

_Generated via RouteWala Transit Engine_`;

    navigator.clipboard.writeText(text);
    setCopyFeedback('WhatsApp Report Copied!');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  // Courier printable text receipt
  const handleCopyReceipt = () => {
    const divider = '========================================';
    const lines = [
      divider,
      '     ROUTWALA MUMBAI TRANSIT RECEIPT    ',
      divider,
      `DATE: ${new Date().toLocaleDateString('en-IN')} | DEPOT: MUMBAI CENTRAL`,
      `TOTAL DROPS: ${stats.totalStops} | COMPLETED: ${stats.completedCount} | FAILED: ${stats.failedCount}`,
      `TOTAL RUN: ${stats.totalKm} KM | TIME SAVED: ~${stats.timeSavedMinutes} MIN`,
      divider,
      'COD REMITTANCE DUE TO HUB:',
      `CASH IN HAND: Rs. ${stats.collectedCodAmount.toLocaleString('en-IN')}`,
      divider,
      'STOP TIMELINE LOG:',
      ...stops.map((s, idx) => {
        const isDone = completedStopIds.includes(s.id);
        const status = isDone ? '[DELIVERED]' : '[FAILED]';
        return `${String(idx + 1).padStart(2, '0')}. ${getStopTimestamp(idx)} ${status} ${s.recipientName} (${s.area}) COD: Rs.${s.codAmount || 0}`;
      }),
      divider,
      `ESTIMATED RIDER PAYOUT: Rs. ${stats.estimatedEarnings.toLocaleString('en-IN')}`,
      divider,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopyFeedback('Printable Slip Copied to Clipboard!');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  // Export JSON Backup
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
    a.download = `routewala-shift-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6 page-fade-in">
      {/* 1. TOP RECEIPT CARD */}
      <div className="ticket-stub p-5 sm:p-7 bg-white shadow-hard border-2 border-[#0E0E0E]">
        {/* Receipt Header */}
        <div className="text-center border-b-2 border-dashed border-[#0E0E0E] pb-5 mb-5">
          <div className="w-12 h-12 mx-auto mb-2.5 bg-[#F6B800] border-2 border-[#0E0E0E] rounded-[4px] flex items-center justify-center font-mono font-black text-xl shadow-hard-sm">
            RW
          </div>
          <div className="font-mono text-xs font-bold text-[#0E0E0E]/60 uppercase tracking-widest">
            MUMBAI COURIER TRANSIT RECEIPT & CLOSEOUT
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0E0E0E] mt-1">
            End of Shift Summary
          </h1>
          <div className="font-mono text-xs text-[#0E0E0E]/70 mt-1 flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span>·</span>
            <span>CORRIDOR: SOUTH-CENTRAL MUMBAI</span>
            <span>·</span>
            <span className="font-bold text-[#2E7D4F]">{completionRate}% SUCCESS RATE</span>
          </div>
        </div>

        {/* 4 Hero KPI Number Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {/* 1. Drops Completed vs Failed */}
          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] text-center">
            <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
              DELIVERIES
            </div>
            <div className="font-mono font-black text-2xl text-[#0E0E0E] mt-0.5">
              {stats.completedCount} / {stats.totalStops}
            </div>
            <div className="font-mono text-[10px] text-[#2E7D4F] font-bold">
              {stats.failedCount > 0 ? `${stats.failedCount} RETURNED` : '0 RETURNS'}
            </div>
          </div>

          {/* 2. Total COD Handover */}
          <div className="p-3 bg-[#FFF9E6] border-2 border-[#0E0E0E] rounded-[4px] text-center">
            <div className="font-mono text-[10px] font-bold text-[#E58A00] uppercase">
              COD TO HAND OVER
            </div>
            <div className="font-mono font-black text-2xl text-[#0E0E0E] mt-0.5 flex items-center justify-center">
              <span>₹</span>
              <span>{stats.collectedCodAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/70 font-bold">
              DEPOSIT AT DEPOT
            </div>
          </div>

          {/* 3. Distance Covered */}
          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] text-center">
            <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
              DISTANCE
            </div>
            <div className="font-mono font-black text-2xl text-[#0E0E0E] mt-0.5">
              {stats.totalKm} KM
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/60">ODOMETER TOTAL</div>
          </div>

          {/* 4. Time Saved */}
          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] text-center">
            <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
              TIME SAVED
            </div>
            <div className="font-mono font-black text-2xl text-[#2E7D4F] mt-0.5">
              ~{stats.timeSavedMinutes}m
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/60">VS STANDARD MAPS</div>
          </div>
        </div>

        {/* 2. RIDER EARNINGS CALCULATOR CARD */}
        <EarningsCalculator
          completedStopsCount={stats.completedCount}
          totalKm={stats.totalKm}
          collectedCodAmount={stats.collectedCodAmount}
          ratePerStop={riderPayPerStop}
          onUpdateRatePerStop={setRiderPayPerStop}
          codBonusPercent={codBonusPercent}
          onUpdateCodBonusPercent={setCodBonusPercent}
          fuelAllowancePerKm={fuelAllowancePerKm}
          onUpdateFuelAllowancePerKm={setFuelAllowancePerKm}
          className="mb-6"
        />

        {/* 3. INTERACTIVE DAY REPLAY MAP */}
        <div className="mb-6">
          <DayReplayMap stops={stops} completedStopIds={completedStopIds} />
        </div>

        {/* 4. CHRONOLOGICAL PER-STOP TIMELINE */}
        <div className="border-t-2 border-b-2 border-dashed border-[#0E0E0E]/30 py-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-xs font-black text-[#0E0E0E] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F6B800]" />
              <span>CHRONOLOGICAL DELIVERY TIMELINE</span>
            </div>
            <span className="font-mono text-[11px] text-[#0E0E0E]/70">
              {stops.length} STOPS RECORDED
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {stops.map((stop, idx) => {
              const isDone = completedStopIds.includes(stop.id);
              const isFailed = stop.status === 'skipped' || (stop.notes && stop.notes.includes('[Failed:'));
              const timestamp = getStopTimestamp(idx);

              return (
                <div
                  key={stop.id}
                  className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start sm:items-center gap-2.5">
                    {/* Number badge */}
                    <div className="w-7 h-7 rounded-[3px] bg-[#15171A] text-[#F6B800] border border-[#0E0E0E] flex items-center justify-center font-bold text-xs shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-[#0E0E0E] font-display">
                          {stop.recipientName}
                        </span>
                        <span className="text-[11px] text-[#0E0E0E]/70 font-mono">
                          ({stop.area})
                        </span>
                      </div>
                      <div className="text-[11px] text-[#0E0E0E]/80 truncate max-w-sm mt-0.5">
                        {stop.address}
                      </div>

                      {/* Failure note callout if failed */}
                      {isFailed && stop.notes && (
                        <div className="mt-1 text-[11px] font-bold text-[#D7372B] flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{stop.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side: Timestamp + COD + Status badge */}
                  <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    <span className="text-[#0E0E0E]/70 font-bold text-[11px]">
                      {timestamp}
                    </span>

                    {stop.codAmount && stop.codAmount > 0 ? (
                      <span className="px-2 py-0.5 rounded-[2px] bg-[#FFF9E6] border border-[#0E0E0E] text-[#0E0E0E] font-bold text-[10px]">
                        ₹{stop.codAmount} COD
                      </span>
                    ) : null}

                    <span
                      className={`px-2 py-1 rounded-[2px] border border-[#0E0E0E] font-bold text-[10px] uppercase flex items-center gap-1 ${
                        isDone
                          ? 'bg-[#2E7D4F] text-white'
                          : isFailed
                          ? 'bg-[#D7372B] text-white'
                          : 'bg-[#E58A00] text-[#0E0E0E]'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                          <span>DELIVERED</span>
                        </>
                      ) : isFailed ? (
                        <>
                          <XCircle className="w-3 h-3 stroke-[3]" />
                          <span>RETURNED</span>
                        </>
                      ) : (
                        <span>PENDING</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. MULTI-ACTION EXPORT & SHIFT CLOSEOUT BAR */}
        <div className="space-y-3">
          {copyFeedback && (
            <div className="p-2.5 bg-[#2E7D4F] text-white border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs font-bold text-center">
              ✓ {copyFeedback}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={handleCopyWhatsApp}
              icon={<Share2 className="w-4 h-4 stroke-[2.5]" />}
            >
              Share WhatsApp Report
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={handleCopyReceipt}
              icon={<Printer className="w-4 h-4" />}
            >
              Copy Printable Receipt
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={handleExportJSON}
              icon={<Download className="w-4 h-4" />}
            >
              Export Route JSON
            </Button>
          </div>

          <div className="pt-2 flex justify-center">
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                resetToMockData();
                navigate('/plan');
              }}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Manifest for Tomorrow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
