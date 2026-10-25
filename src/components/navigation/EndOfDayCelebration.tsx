import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { DeliveryStop } from '../../data/mockStops';
import { CheckCircle2, RotateCcw, Share2, Award, ArrowRight, IndianRupee } from 'lucide-react';

interface EndOfDayCelebrationProps {
  stops: DeliveryStop[];
  completedCount: number;
  totalKm: number;
  timeSavedMinutes: number;
  totalCodAmount: number;
  onReset: () => void;
}

export const EndOfDayCelebration: React.FC<EndOfDayCelebrationProps> = ({
  stops,
  completedCount,
  totalKm,
  timeSavedMinutes,
  totalCodAmount,
  onReset,
}) => {
  const navigate = useNavigate();
  const rate = Math.round((completedCount / Math.max(stops.length, 1)) * 100);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="ticket-stub p-6 bg-white border-2 border-[#0E0E0E] shadow-hard text-center">
        {/* Stamp Icon */}
        <div className="w-16 h-16 mx-auto mb-3 bg-[#2E7D4F] text-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase tracking-widest">
          SHIFT RUN COMPLETE · TRANSIT LOGGED
        </div>

        <h1 className="font-display font-extrabold text-2xl text-[#0E0E0E] mt-1 mb-1">
          Manifest Cleared!
        </h1>

        <p className="font-body text-xs text-[#0E0E0E]/75 mb-6 max-w-xs mx-auto">
          All parcels accounted for across the Mumbai corridor. Your on-time delivery record has been preserved.
        </p>

        {/* Shift Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
            <div className="font-mono text-[9px] font-bold text-[#0E0E0E]/60 uppercase">
              DELIVERY SUCCESS
            </div>
            <div className="font-mono font-extrabold text-xl text-[#0E0E0E] mt-0.5">
              {completedCount} / {stops.length}
            </div>
            <div className="font-mono text-[10px] text-[#2E7D4F] font-bold">
              {rate}% ON TIME
            </div>
          </div>

          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
            <div className="font-mono text-[9px] font-bold text-[#0E0E0E]/60 uppercase">
              TIME SAVED
            </div>
            <div className="font-mono font-extrabold text-xl text-[#2E7D4F] mt-0.5">
              ~{timeSavedMinutes}m
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/60">
              VS GOOGLE MAPS
            </div>
          </div>

          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
            <div className="font-mono text-[9px] font-bold text-[#0E0E0E]/60 uppercase">
              DISTANCE RUN
            </div>
            <div className="font-mono font-extrabold text-xl text-[#0E0E0E] mt-0.5">
              {totalKm} KM
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/60">
              OPTIMAL ROUTE
            </div>
          </div>

          <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
            <div className="font-mono text-[9px] font-bold text-[#0E0E0E]/60 uppercase">
              COD COLLECTED
            </div>
            <div className="font-mono font-extrabold text-xl text-[#0E0E0E] mt-0.5 flex items-center">
              <IndianRupee className="w-4 h-4 text-[#E58A00]" />
              <span>{totalCodAmount}</span>
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/60">
              READY FOR REMITTANCE
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <Button
            variant="primary"
            size="touch"
            fullWidth
            onClick={() => navigate('/summary')}
            icon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
          >
            View Full Shift Receipt
          </Button>

          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => {
              onReset();
              navigate('/plan');
            }}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Start New Run Tomorrow
          </Button>
        </div>
      </div>
    </div>
  );
};
