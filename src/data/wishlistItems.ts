export type ErrandCategory =
  | 'shop'
  | 'pharmacy'
  | 'atm'
  | 'food'
  | 'fuel'
  | 'restroom'
  | 'chai';

export interface WishlistItem {
  id: string;
  name: string; // Errand title e.g. "Buy shoes at Puma"
  category: ErrandCategory;
  landmark: string;
  area: string;
  distanceOffRouteMeters: number; // e.g. 400m
  detourMinutes: number; // e.g. +3 min
  detourBudgetMinutes: number; // Max allowed detour budget
  rating?: number;
  note: string;
  nearStopId?: string;
  isPinned: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const initialWishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    name: 'Buy running shoes at Puma Store',
    category: 'shop',
    landmark: 'Phoenix Palladium Ground Floor, Lower Parel',
    area: 'Lower Parel',
    distanceOffRouteMeters: 350,
    detourMinutes: 3,
    detourBudgetMinutes: 5,
    rating: 4.6,
    note: 'Pickup shoes ordered online with store collection',
    nearStopId: 'stop-3',
    isPinned: true,
    coordinates: { lat: 18.9953, lng: 72.8288 },
  },
  {
    id: 'wish-2',
    name: 'Pick up BP tablet at Wellness Forever',
    category: 'pharmacy',
    landmark: 'Opposite Plaza Cinema, Gokhale Road',
    area: 'Dadar West',
    distanceOffRouteMeters: 120,
    detourMinutes: 2,
    detourBudgetMinutes: 3,
    rating: 4.8,
    note: '24x7 chemist, stock verified via WhatsApp',
    nearStopId: 'stop-1',
    isPinned: true,
    coordinates: { lat: 19.0178, lng: 72.8428 },
  },
  {
    id: 'wish-3',
    name: 'Deposit COD Cash at SBI ATM',
    category: 'atm',
    landmark: 'Outside Dadar Station East Kabutar Khana',
    area: 'Dadar East',
    distanceOffRouteMeters: 150,
    detourMinutes: 2,
    detourBudgetMinutes: 4,
    rating: 4.5,
    note: 'Cash deposit machine active, avoid evening rush',
    nearStopId: 'stop-2',
    isPinned: false,
    coordinates: { lat: 19.0195, lng: 72.8475 },
  },
  {
    id: 'wish-4',
    name: 'Ashok Vada Pav (Kirti College)',
    category: 'food',
    landmark: 'Off Cadel Road, Near Kirti College',
    area: 'Dadar West',
    distanceOffRouteMeters: 80,
    detourMinutes: 2,
    detourBudgetMinutes: 5,
    rating: 4.9,
    note: 'Legendary crispy chura vada pav, ready in 2 mins',
    nearStopId: 'stop-1',
    isPinned: true,
    coordinates: { lat: 19.0182, lng: 72.8415 },
  },
  {
    id: 'wish-5',
    name: 'Quick Refuel at HP Auto Gas & Petrol',
    category: 'fuel',
    landmark: 'Senapati Bapat Marg, Near Lower Parel flyover',
    area: 'Lower Parel',
    distanceOffRouteMeters: 200,
    detourMinutes: 2,
    detourBudgetMinutes: 4,
    rating: 4.3,
    note: 'Free digital air pressure gauge available',
    nearStopId: 'stop-3',
    isPinned: false,
    coordinates: { lat: 18.9980, lng: 72.8310 },
  },
  {
    id: 'wish-6',
    name: 'BMC Clean Restroom & Water Refill',
    category: 'restroom',
    landmark: 'Opposite Dadar Central Platform 1 Gate',
    area: 'Dadar Central',
    distanceOffRouteMeters: 50,
    detourMinutes: 1,
    detourBudgetMinutes: 2,
    rating: 4.2,
    note: 'Filtered cold drinking water refill & clean facilities',
    nearStopId: 'stop-2',
    isPinned: true,
    coordinates: { lat: 19.0190, lng: 72.8460 },
  },
];

export interface PitstopRadarOption {
  id: string;
  type: 'water' | 'restroom' | 'fuel' | 'chai';
  title: string;
  landmark: string;
  distanceOffRouteMeters: number;
  detourMinutes: number;
  area: string;
}

export const mumbaiPitstopRadar: PitstopRadarOption[] = [
  {
    id: 'radar-water-1',
    type: 'water',
    title: 'BMC RO Water Chilled Point',
    landmark: 'Dadar West Station Bridge',
    distanceOffRouteMeters: 40,
    detourMinutes: 0,
    area: 'Dadar',
  },
  {
    id: 'radar-restroom-1',
    type: 'restroom',
    title: 'Public Restroom (Pay Rs 5)',
    landmark: 'Senapati Bapat Marg Pillar 38',
    distanceOffRouteMeters: 90,
    detourMinutes: 1,
    area: 'Lower Parel',
  },
  {
    id: 'radar-fuel-1',
    type: 'fuel',
    title: 'Bharat Petroleum 24/7 Pump',
    landmark: 'Nagpada Junction Corner',
    distanceOffRouteMeters: 180,
    detourMinutes: 2,
    area: 'Byculla',
  },
  {
    id: 'radar-chai-1',
    type: 'chai',
    title: 'Kyani & Co. Cutting Chai',
    landmark: 'Jer Mahal Estate, Metro Cinema',
    distanceOffRouteMeters: 100,
    detourMinutes: 1,
    area: 'Marine Lines',
  },
];
