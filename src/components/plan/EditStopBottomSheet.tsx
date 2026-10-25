import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { DeliveryStop, PriorityLevel, StopType } from '../../data/mockStops';
import { PriorityBadge } from '../common/PriorityBadge';
import {
  Trash2,
  Check,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Phone,
  IndianRupee,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';

interface EditStopBottomSheetProps {
  stop: DeliveryStop | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<DeliveryStop>) => void;
  onDelete: (id: string) => void;
  allStops: DeliveryStop[];
}

export const EditStopBottomSheet: React.FC<EditStopBottomSheetProps> = ({
  stop,
  isOpen,
  onClose,
  onSave,
  onDelete,
  allStops,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<StopType>('drop');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [phone, setPhone] = useState('');
  const [deadline, setDeadline] = useState('');
  const [codAmount, setCodAmount] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [pairedStopId, setPairedStopId] = useState<string>('');

  useEffect(() => {
    if (stop) {
      setName(stop.recipientName);
      setType(stop.type || 'drop');
      setPriority(stop.priority);
      setAddress(stop.address);
      setArea(stop.area);
      setLandmark(stop.landmark);
      setPhone(stop.phone || '');
      setDeadline(stop.deadline || '');
      setCodAmount(stop.codAmount || 0);
      setNotes(stop.notes || '');
      setPairedStopId(stop.pairedStopId || '');
    }
  }, [stop]);

  if (!stop) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(stop.id, {
      recipientName: name.trim(),
      type,
      priority,
      address: address.trim(),
      area: area.trim(),
      landmark: landmark.trim(),
      phone: phone.trim() || undefined,
      deadline: deadline.trim() || undefined,
      codAmount: Number(codAmount) || 0,
      notes: notes.trim() || undefined,
      pairedStopId: pairedStopId || undefined,
    });
    onClose();
  };

  const otherStops = allStops.filter((s) => s.id !== stop.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Stop #${stop.order}`}
      subtitle="Modify courier details, priority tier, or payment requirements"
      size="md"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button
            variant="danger"
            size="md"
            onClick={() => {
              onDelete(stop.id);
              onClose();
            }}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Delete Stop
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleFormSubmit}
              icon={<Check className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Type Selector (Pickup vs Drop) */}
        <div>
          <label className="block font-display font-bold text-xs uppercase mb-1.5">
            Stop Manifest Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('drop')}
              className={`h-11 px-3 rounded-[4px] border-2 border-[#0E0E0E] font-display font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                type === 'drop'
                  ? 'bg-[#15171A] text-white shadow-hard-sm'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
              }`}
            >
              <ArrowDownRight className="w-4 h-4 text-[#F6B800]" />
              <span>DELIVERY / DROP</span>
            </button>

            <button
              type="button"
              onClick={() => setType('pickup')}
              className={`h-11 px-3 rounded-[4px] border-2 border-[#0E0E0E] font-display font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                type === 'pickup'
                  ? 'bg-[#E58A00] text-[#0E0E0E] shadow-hard-sm'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>PICKUP / RETURN</span>
            </button>
          </div>
        </div>

        {/* Priority Selector (3 Big Segmented Buttons) */}
        <div>
          <label className="block font-display font-bold text-xs uppercase mb-1.5">
            Priority Tier (3 Distinct Buttons)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`min-h-[46px] p-2 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                priority === 'high'
                  ? 'bg-[#D7372B] text-white shadow-hard-sm ring-2 ring-[#0E0E0E]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
              }`}
            >
              <span>HIGH</span>
              <span className="text-[10px] opacity-80 font-normal">Urgent</span>
            </button>

            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`min-h-[46px] p-2 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                priority === 'medium'
                  ? 'bg-[#E58A00] text-[#0E0E0E] shadow-hard-sm ring-2 ring-[#0E0E0E]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
              }`}
            >
              <span>MEDIUM</span>
              <span className="text-[10px] opacity-80 font-normal">Scheduled</span>
            </button>

            <button
              type="button"
              onClick={() => setPriority('low')}
              className={`min-h-[46px] p-2 rounded-[4px] border-2 border-[#0E0E0E] font-mono text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                priority === 'low'
                  ? 'bg-[#3E7C7A] text-white shadow-hard-sm ring-2 ring-[#0E0E0E]'
                  : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
              }`}
            >
              <span>LOW</span>
              <span className="text-[10px] opacity-80 font-normal">Flexible</span>
            </button>
          </div>
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block font-display font-bold text-xs uppercase mb-1">
            Recipient / Contact Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-display font-bold text-xs uppercase mb-1">
            Address *
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white"
          />
        </div>

        {/* Area & Landmark */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-display font-bold text-xs uppercase mb-1">
              Area
            </label>
            <input
              type="text"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white"
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
              className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white"
            />
          </div>
        </div>

        {/* Deadline & Phone */}
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
              className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-sm bg-white"
            />
          </div>

          <div>
            <label className="block font-display font-bold text-xs uppercase mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98200 XXXXX"
              className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-sm bg-white"
            />
          </div>
        </div>

        {/* COD Amount & Paired Stop */}
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
              onChange={(e) => setCodAmount(Number(e.target.value))}
              placeholder="0 (Prepaid)"
              className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-mono text-sm bg-white"
            />
          </div>

          <div>
            <label className="block font-display font-bold text-xs uppercase mb-1 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Pair with Stop</span>
            </label>
            <select
              value={pairedStopId}
              onChange={(e) => setPairedStopId(e.target.value)}
              className="w-full h-11 px-2 border-2 border-[#0E0E0E] rounded-[4px] font-body text-xs bg-white"
            >
              <option value="">None (Independent)</option>
              {otherStops.map((os) => (
                <option key={os.id} value={os.id}>
                  #{os.order} {os.recipientName} ({((os.type) || 'drop').toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-display font-bold text-xs uppercase mb-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Delivery Instructions / Notes</span>
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Ring bell twice, leave with security guard"
            className="w-full h-11 px-3 border-2 border-[#0E0E0E] rounded-[4px] font-body text-sm bg-white"
          />
        </div>
      </form>
    </Modal>
  );
};
