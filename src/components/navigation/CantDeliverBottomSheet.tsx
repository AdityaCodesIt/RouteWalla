import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Home, MapPinOff, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';

export type UndeliveredReason =
  | 'not_home'
  | 'wrong_address'
  | 'refused'
  | 'retry_later';

interface CantDeliverBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  stopName: string;
  stopNumber: number;
  onConfirmReason: (reason: string) => void;
}

export const CantDeliverBottomSheet: React.FC<CantDeliverBottomSheetProps> = ({
  isOpen,
  onClose,
  stopName,
  stopNumber,
  onConfirmReason,
}) => {
  const [selectedReason, setSelectedReason] = useState<UndeliveredReason>('not_home');
  const [customNote, setCustomNote] = useState('');

  const reasons = [
    {
      id: 'not_home' as UndeliveredReason,
      label: 'Customer Not Available / Door Locked',
      subtext: 'Called phone, door bell unanswered or security gate locked',
      icon: Home,
    },
    {
      id: 'wrong_address' as UndeliveredReason,
      label: 'Incorrect or Incomplete Address',
      subtext: 'Building number, galli name, or wing does not exist',
      icon: MapPinOff,
    },
    {
      id: 'refused' as UndeliveredReason,
      label: 'Customer Refused Parcel / Cancelled',
      subtext: 'COD refused, damaged box, or cancelled in app',
      icon: XCircle,
    },
    {
      id: 'retry_later' as UndeliveredReason,
      label: 'Customer Requested Retry Later',
      subtext: 'Rider asked to return after 4:00 PM today',
      icon: RotateCcw,
    },
  ];

  const handleConfirm = () => {
    const reasonObj = reasons.find((r) => r.id === selectedReason);
    const finalReason = customNote.trim()
      ? `${reasonObj?.label}: ${customNote.trim()}`
      : reasonObj?.label || 'Undelivered';
    onConfirmReason(finalReason);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Mark Stop #${stopNumber} Undelivered`}
      subtitle={`Choose dispatch failure reason for ${stopName}`}
      size="md"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="secondary" size="md" onClick={onClose}>
            Back to Drop
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleConfirm}
            icon={<AlertTriangle className="w-4 h-4" />}
          >
            Confirm & Skip Stop
          </Button>
        </div>
      }
    >
      <div className="space-y-3 font-body">
        <div className="font-mono text-xs font-bold text-[#0E0E0E]/70 uppercase">
          Select Incident Reason:
        </div>

        {reasons.map((r) => {
          const Icon = r.icon;
          const isSelected = selectedReason === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedReason(r.id)}
              className={`w-full p-3.5 rounded-[4px] border-2 border-[#0E0E0E] text-left transition-all cursor-pointer flex items-start gap-3 select-none ${
                isSelected
                  ? 'bg-[#FFF9E6] border-[#0E0E0E] ring-2 ring-[#0E0E0E] shadow-hard-sm'
                  : 'bg-white hover:bg-[#F4F1EA]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-[3px] border border-[#0E0E0E] flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'bg-[#D7372B] text-white' : 'bg-[#F4F1EA] text-[#0E0E0E]'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-sm text-[#0E0E0E]">
                  {r.label}
                </div>
                <div className="font-body text-xs text-[#0E0E0E]/70 mt-0.5">
                  {r.subtext}
                </div>
              </div>
            </button>
          );
        })}

        {/* Optional note */}
        <div className="pt-2">
          <label className="block font-display font-bold text-xs uppercase mb-1">
            Additional Rider Note (Optional)
          </label>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g. Neighbor said family is out until evening"
            className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#D7372B]"
          />
        </div>
      </div>
    </Modal>
  );
};
