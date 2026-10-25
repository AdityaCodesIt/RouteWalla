import React, { useState } from 'react';
import { IndianRupee, Calculator, Fuel, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

interface EarningsCalculatorProps {
  completedStopsCount: number;
  totalKm: number;
  collectedCodAmount: number;
  ratePerStop: number;
  onUpdateRatePerStop: (val: number) => void;
  codBonusPercent: number;
  onUpdateCodBonusPercent: (val: number) => void;
  fuelAllowancePerKm: number;
  onUpdateFuelAllowancePerKm: (val: number) => void;
  className?: string;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({
  completedStopsCount,
  totalKm,
  collectedCodAmount,
  ratePerStop,
  onUpdateRatePerStop,
  codBonusPercent,
  onUpdateCodBonusPercent,
  fuelAllowancePerKm,
  onUpdateFuelAllowancePerKm,
  className = '',
}) => {
  const [isEditingRates, setIsEditingRates] = useState<boolean>(false);

  // Computed values
  const basePay = completedStopsCount * ratePerStop;
  const codIncentive = Math.round((collectedCodAmount * codBonusPercent) / 100);
  const fuelAllowance = Math.round(totalKm * fuelAllowancePerKm);
  const grandTotal = basePay + codIncentive + fuelAllowance;

  // Preset quick adjustments
  const applyPreset = (rate: number, codPct: number, fuelRate: number) => {
    onUpdateRatePerStop(rate);
    onUpdateCodBonusPercent(codPct);
    onUpdateFuelAllowancePerKm(fuelRate);
  };

  return (
    <div className={`p-4 sm:p-5 bg-white border-2 border-[#0E0E0E] rounded-[6px] shadow-hard ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-dashed border-[#0E0E0E]/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[4px] bg-[#2E7D4F] text-white border-2 border-[#0E0E0E] flex items-center justify-center shadow-hard-sm">
            <IndianRupee className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-lg text-[#0E0E0E] leading-tight">
              Shift Earnings & Fuel Allowance
            </h3>
            <p className="font-mono text-[11px] text-[#0E0E0E]/70">
              Transparent Mumbai rider payout breakdown
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsEditingRates(!isEditingRates)}
          className="px-2.5 py-1 rounded-[3px] border border-[#0E0E0E] bg-[#F4F1EA] hover:bg-white text-[#0E0E0E] font-mono text-xs font-bold shadow-hard-sm cursor-pointer flex items-center gap-1"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{isEditingRates ? 'DONE' : 'ADJUST RATES'}</span>
        </button>
      </div>

      {/* Hero Grand Total Fare Meter */}
      <div className="p-4 bg-[#F6B800] border-2 border-[#0E0E0E] rounded-[4px] shadow-hard-sm mb-4 text-[#0E0E0E]">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0E0E0E]/80">
              ESTIMATED SHIFT TAKE-HOME
            </div>
            <div className="font-mono font-black text-3xl sm:text-4xl tracking-tight flex items-center mt-0.5">
              <span>₹</span>
              <span>{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-[11px] font-extrabold bg-[#15171A] text-[#F6B800] px-2 py-0.5 rounded-[2px] border border-[#0E0E0E] inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>₹{(totalKm > 0 ? (grandTotal / totalKm).toFixed(1) : '0')}/KM</span>
            </div>
            <div className="font-mono text-[10px] text-[#0E0E0E]/80 mt-1">
              {completedStopsCount} of {completedStopsCount} stops credited
            </div>
          </div>
        </div>
      </div>

      {/* 3 Component Breakdown Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* 1. Base Pay */}
        <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
          <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
            BASE STOP PAY
          </div>
          <div className="font-mono font-extrabold text-xl text-[#0E0E0E] mt-0.5">
            ₹{basePay.toLocaleString('en-IN')}
          </div>
          <div className="font-mono text-[10px] text-[#0E0E0E]/70 mt-1">
            {completedStopsCount} stops × ₹{ratePerStop}
          </div>
        </div>

        {/* 2. COD Handling Incentive */}
        <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
          <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
            COD INCENTIVE ({codBonusPercent}%)
          </div>
          <div className="font-mono font-extrabold text-xl text-[#2E7D4F] mt-0.5">
            +₹{codIncentive.toLocaleString('en-IN')}
          </div>
          <div className="font-mono text-[10px] text-[#0E0E0E]/70 mt-1">
            On ₹{collectedCodAmount.toLocaleString('en-IN')} cash
          </div>
        </div>

        {/* 3. Fuel / EV Allowance */}
        <div className="p-3 bg-[#F4F1EA] border-2 border-[#0E0E0E] rounded-[4px]">
          <div className="font-mono text-[10px] font-bold text-[#0E0E0E]/60 uppercase">
            FUEL / KM ALLOWANCE
          </div>
          <div className="font-mono font-extrabold text-xl text-[#E58A00] mt-0.5">
            +₹{fuelAllowance.toLocaleString('en-IN')}
          </div>
          <div className="font-mono text-[10px] text-[#0E0E0E]/70 mt-1">
            {totalKm} km × ₹{fuelAllowancePerKm}/km
          </div>
        </div>
      </div>

      {/* Editable Rate Inputs (Toggleable) */}
      {isEditingRates && (
        <div className="p-3.5 bg-[#FFF9E6] border-2 border-[#0E0E0E] rounded-[4px] space-y-3 mb-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#0E0E0E]">
              CONFIG RIDER CONTRACT RATES:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset(45, 2, 4)}
                className="px-2 py-0.5 rounded-[2px] bg-white border border-[#0E0E0E] text-[10px] font-mono font-bold hover:bg-[#F4F1EA]"
              >
                Standard (₹45)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(60, 3, 5)}
                className="px-2 py-0.5 rounded-[2px] bg-white border border-[#0E0E0E] text-[10px] font-mono font-bold hover:bg-[#F4F1EA]"
              >
                Express (₹60)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div>
              <label htmlFor="rate-per-stop" className="block text-[10px] font-bold text-[#0E0E0E]/70 mb-1">
                PER-STOP PAY (₹)
              </label>
              <input
                id="rate-per-stop"
                type="number"
                min={20}
                max={150}
                value={ratePerStop}
                onChange={(e) => onUpdateRatePerStop(Number(e.target.value))}
                className="w-full p-2 bg-white border-2 border-[#0E0E0E] rounded-[3px] font-bold"
              />
            </div>

            <div>
              <label htmlFor="cod-bonus" className="block text-[10px] font-bold text-[#0E0E0E]/70 mb-1">
                COD COMMISSION (%)
              </label>
              <input
                id="cod-bonus"
                type="number"
                min={0}
                max={10}
                step={0.5}
                value={codBonusPercent}
                onChange={(e) => onUpdateCodBonusPercent(Number(e.target.value))}
                className="w-full p-2 bg-white border-2 border-[#0E0E0E] rounded-[3px] font-bold"
              />
            </div>

            <div>
              <label htmlFor="fuel-rate" className="block text-[10px] font-bold text-[#0E0E0E]/70 mb-1">
                FUEL ALLOWANCE (₹/KM)
              </label>
              <input
                id="fuel-rate"
                type="number"
                min={0}
                max={15}
                step={0.5}
                value={fuelAllowancePerKm}
                onChange={(e) => onUpdateFuelAllowancePerKm(Number(e.target.value))}
                className="w-full p-2 bg-white border-2 border-[#0E0E0E] rounded-[3px] font-bold"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
