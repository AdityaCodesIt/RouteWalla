import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Empty Delivery Manifest Clipboard Illustration
 * Handcrafted in Mumbai Transit Signage aesthetic:
 * Asphalt #15171A, Taxi Yellow #F6B800, Paper #F4F1EA, Ink #0E0E0E, Signal Red #D7372B.
 */
export const EmptyClipboardIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 140,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    aria-hidden="true"
  >
    {/* Hard Offset Shadow */}
    <rect x="36" y="24" width="96" height="120" rx="4" fill="#0E0E0E" />

    {/* Clipboard Base (Paper tinted) */}
    <rect
      x="32"
      y="20"
      width="96"
      height="120"
      rx="4"
      fill="#F4F1EA"
      stroke="#0E0E0E"
      strokeWidth="2.5"
    />

    {/* Top Clip (Taxi Yellow with metal bolts) */}
    <rect
      x="60"
      y="12"
      width="40"
      height="16"
      rx="2"
      fill="#F6B800"
      stroke="#0E0E0E"
      strokeWidth="2"
    />
    <circle cx="68" cy="20" r="2" fill="#0E0E0E" />
    <circle cx="92" cy="20" r="2" fill="#0E0E0E" />

    {/* Ticket Stub Cut-out Notches on Sides */}
    <circle cx="32" cy="70" r="6" fill="#FFFFFF" stroke="#0E0E0E" strokeWidth="2" />
    <circle cx="128" cy="70" r="6" fill="#FFFFFF" stroke="#0E0E0E" strokeWidth="2" />

    {/* Dashed Route Line on Sheet */}
    <path
      d="M48 48 L112 48"
      stroke="#0E0E0E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M48 64 L96 64"
      stroke="#0E0E0E"
      strokeWidth="2"
      strokeOpacity="0.4"
      strokeLinecap="round"
    />
    <path
      d="M48 78 L104 78"
      stroke="#0E0E0E"
      strokeWidth="2"
      strokeOpacity="0.4"
      strokeLinecap="round"
    />
    <path
      d="M48 92 L88 92"
      stroke="#0E0E0E"
      strokeWidth="2"
      strokeOpacity="0.4"
      strokeLinecap="round"
    />

    {/* Transit Stamp / Checkpoint Square Token */}
    <rect
      x="84"
      y="102"
      width="28"
      height="24"
      rx="2"
      fill="#F6B800"
      stroke="#0E0E0E"
      strokeWidth="2"
    />
    <text
      x="98"
      y="118"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="900"
      fontSize="11"
      fill="#0E0E0E"
    >
      00
    </text>

    {/* Dashed Connector Ribbon */}
    <path
      d="M48 114 L76 114"
      stroke="#E58A00"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="3 3"
    />
  </svg>
);

/**
 * Empty Wishlist / Errand Scooter Illustration
 */
export const EmptyScooterIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 140,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    aria-hidden="true"
  >
    {/* Ground Shadow */}
    <ellipse cx="80" cy="136" rx="56" ry="6" fill="#0E0E0E" fillOpacity="0.15" />

    {/* Rear Wheel */}
    <circle cx="44" cy="116" r="18" fill="#15171A" stroke="#0E0E0E" strokeWidth="2.5" />
    <circle cx="44" cy="116" r="8" fill="#F4F1EA" stroke="#0E0E0E" strokeWidth="2" />

    {/* Front Wheel */}
    <circle cx="118" cy="116" r="18" fill="#15171A" stroke="#0E0E0E" strokeWidth="2.5" />
    <circle cx="118" cy="116" r="8" fill="#F4F1EA" stroke="#0E0E0E" strokeWidth="2" />

    {/* Delivery Rear Crate (Taxi Yellow) */}
    <rect x="26" y="60" width="36" height="34" rx="3" fill="#0E0E0E" />
    <rect
      x="24"
      y="58"
      width="36"
      height="34"
      rx="3"
      fill="#F6B800"
      stroke="#0E0E0E"
      strokeWidth="2.5"
    />
    <path d="M28 75 L56 75" stroke="#0E0E0E" strokeWidth="2" strokeDasharray="3 2" />
    <text
      x="42"
      y="88"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="900"
      fontSize="9"
      fill="#0E0E0E"
    >
      EMPTY
    </text>

    {/* Scooter Body Frame */}
    <path
      d="M44 116 L68 116 L76 96 L104 96 L112 70 L118 64"
      stroke="#0E0E0E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Handlebar & Headlamp */}
    <rect
      x="112"
      y="54"
      width="14"
      height="10"
      rx="2"
      fill="#F6B800"
      stroke="#0E0E0E"
      strokeWidth="2"
    />
    <circle cx="124" cy="59" r="3" fill="#FFFFFF" stroke="#0E0E0E" strokeWidth="1.5" />

    {/* Heart Errand Bubble floating above crate */}
    <g transform="translate(68, 28)">
      <rect x="2" y="2" width="34" height="26" rx="3" fill="#0E0E0E" />
      <rect
        x="0"
        y="0"
        width="34"
        height="26"
        rx="3"
        fill="#FFFFFF"
        stroke="#0E0E0E"
        strokeWidth="2"
      />
      <path
        d="M17 19 L13 14 C10.5 11.5 12 8 15 8 C16.2 8 16.8 8.8 17 9.2 C17.2 8.8 17.8 8 19 8 C22 8 23.5 11.5 21 14 Z"
        fill="#D7372B"
        stroke="#0E0E0E"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

/**
 * Shift Complete Celebration Seal
 */
export const ShiftCompleteIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 140,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    aria-hidden="true"
  >
    {/* Shadow */}
    <circle cx="82" cy="82" r="54" fill="#0E0E0E" />

    {/* Main Outer Seal */}
    <circle
      cx="80"
      cy="80"
      r="54"
      fill="#2E7D4F"
      stroke="#0E0E0E"
      strokeWidth="3"
    />

    {/* Inner Dashed Ring */}
    <circle
      cx="80"
      cy="80"
      r="44"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeDasharray="6 4"
    />

    {/* Big Checkmark */}
    <path
      d="M58 80 L72 94 L104 62"
      stroke="#F6B800"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M58 80 L72 94 L104 62"
      stroke="#0E0E0E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Top Text Pill */}
    <rect
      x="54"
      y="38"
      width="52"
      height="16"
      rx="2"
      fill="#15171A"
      stroke="#0E0E0E"
      strokeWidth="1.5"
    />
    <text
      x="80"
      y="49"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="900"
      fontSize="8"
      fill="#F6B800"
    >
      MUMBAI 100%
    </text>
  </svg>
);

/**
 * Offline Mode Signal Tower Illustration
 */
export const OfflineModeIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 140,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    aria-hidden="true"
  >
    {/* Shadow */}
    <rect x="36" y="32" width="88" height="96" rx="4" fill="#0E0E0E" />

    {/* Container box */}
    <rect
      x="32"
      y="28"
      width="88"
      height="96"
      rx="4"
      fill="#F4F1EA"
      stroke="#0E0E0E"
      strokeWidth="2.5"
    />

    {/* Radio Tower Mast */}
    <path
      d="M80 44 L64 104 M80 44 L96 104 M68 84 L92 84 M72 68 L88 68"
      stroke="#0E0E0E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Top Beacon Ball */}
    <circle cx="80" cy="44" r="5" fill="#E58A00" stroke="#0E0E0E" strokeWidth="2" />

    {/* Disconnected Cross Slash */}
    <circle cx="106" cy="46" r="14" fill="#D7372B" stroke="#0E0E0E" strokeWidth="2" />
    <path
      d="M98 38 L114 54 M114 38 L98 54"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Offline Storage Cache Badge */}
    <rect
      x="44"
      y="108"
      width="64"
      height="18"
      rx="2"
      fill="#F6B800"
      stroke="#0E0E0E"
      strokeWidth="2"
    />
    <text
      x="76"
      y="121"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="900"
      fontSize="9"
      fill="#0E0E0E"
    >
      LOCAL CACHE
    </text>
  </svg>
);
