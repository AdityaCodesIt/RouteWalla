import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DeliveryStop } from '../../data/mockStops';

interface TransitLeafletMapProps {
  stops: DeliveryStop[];
  activeStopId?: string;
  onSelectStop?: (stop: DeliveryStop) => void;
  className?: string;
}

export const TransitLeafletMap: React.FC<TransitLeafletMapProps> = ({
  stops,
  activeStopId,
  onSelectStop,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Leaflet map centered on Mumbai
      const map = L.map(mapContainerRef.current, {
        center: [19.0178, 72.8428], // Dadar / Central Mumbai
        zoom: 12,
        zoomControl: false, // Custom position or cleaner look
        attributionControl: false,
      });

      // Add Zoom Control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // OpenStreetMap Grayscale Styled Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Layer group for pins and route polylines
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Pins and Polyline whenever stops or activeStopId change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    if (stops.length === 0) return;

    // Collect coordinates for route line and bounds
    const latLngs: L.LatLngExpression[] = stops.map((s) => [
      s.coordinates.lat,
      s.coordinates.lng,
    ]);

    // 1. Draw Route Polyline: Black casing + Vibrant Taxi Yellow center
    if (latLngs.length > 1) {
      // Outer black casing line
      L.polyline(latLngs, {
        color: '#0E0E0E',
        weight: 7,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(layerGroup);

      // Inner Taxi Yellow line
      L.polyline(latLngs, {
        color: '#F6B800',
        weight: 4,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: '8, 6',
      }).addTo(layerGroup);
    }

    // 2. Draw Numbered Square Pins in IBM Plex Mono
    stops.forEach((stop, idx) => {
      const orderNumber = String(stop.order || idx + 1).padStart(2, '0');
      const isActive = stop.id === activeStopId;

      // Color mapping following transit signage brief
      let bgClass = 'bg-[#15171A] text-white';
      if (stop.priority === 'high') {
        bgClass = 'bg-[#D7372B] text-white'; // Signal Red
      } else if (stop.priority === 'medium') {
        bgClass = 'bg-[#E58A00] text-[#0E0E0E]'; // Amber
      } else {
        bgClass = 'bg-[#3E7C7A] text-white'; // Slate-teal
      }

      if (isActive) {
        bgClass = 'bg-[#F6B800] text-[#0E0E0E]';
      }

      const customIcon = L.divIcon({
        className: 'custom-pin-container',
        html: `
          <div class="transit-map-pin ${bgClass} ${isActive ? 'active-pin' : ''}">
            <span>${orderNumber}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([stop.coordinates.lat, stop.coordinates.lng], {
        icon: customIcon,
        title: `#${stop.order} ${stop.recipientName}`,
      }).addTo(layerGroup);

      // Transit ticket-styled Popup
      const isLateRisk = stop.priority === 'high' && stop.etaMinutes > 35;
      const popupHtml = `
        <div class="p-3 bg-white font-body text-xs min-w-[200px]">
          <div class="flex items-center justify-between pb-1.5 mb-2 border-b border-[#0E0E0E]/20">
            <span class="font-mono font-bold text-[10px] uppercase text-[#0E0E0E]/70">
              STOP #${stop.order || 1} · ${(stop.type || 'drop').toUpperCase()}
            </span>
            <span class="font-mono font-bold text-[10px] px-1.5 py-0.2 rounded bg-[#0E0E0E] text-white uppercase">
              ${(stop.priority || 'medium').toUpperCase()}
            </span>
          </div>
          <h4 class="font-display font-extrabold text-sm text-[#0E0E0E] leading-tight mb-1">
            ${stop.recipientName}
          </h4>
          <p class="text-[#0E0E0E]/80 mb-2 leading-snug">
            ${stop.address}
          </p>
          <div class="font-mono text-[11px] flex items-center justify-between pt-1 border-t border-[#0E0E0E]/10">
            <span class="font-bold text-[#0E0E0E]">ETA: +${stop.etaMinutes}m</span>
            ${stop.deadline ? `<span class="text-[#D7372B] font-bold">by ${stop.deadline}</span>` : ''}
          </div>
          ${
            isLateRisk
              ? `<div class="mt-2 p-1 bg-[#D7372B]/10 border border-[#D7372B] text-[#D7372B] font-mono font-bold text-[10px]">
                  ⚠ DEADLINE RISK: High traffic corridor
                </div>`
              : ''
          }
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectStop?.(stop);
      });
    });

    // Fit map bounds to view all stops with comfortable padding
    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: 15,
      });
    }
  }, [stops, activeStopId, onSelectStop]);

  return (
    <div className={`relative w-full h-full min-h-[350px] ${className}`}>
      <div
        ref={mapContainerRef}
        className="w-full h-full border-2 border-[#0E0E0E] rounded-[6px] shadow-hard z-10"
        style={{ minHeight: '100%' }}
      />
      {/* Brand Transit Compass Badge overlay */}
      <div className="absolute bottom-3 left-3 z-20 bg-white border-2 border-[#0E0E0E] rounded-[4px] px-2.5 py-1 text-[10px] font-mono font-bold shadow-hard-sm pointer-events-none">
        MUMBAI TRANSIT RADAR · OSM GRAYSCALE
      </div>
    </div>
  );
};
