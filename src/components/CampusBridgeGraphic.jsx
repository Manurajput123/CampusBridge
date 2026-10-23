import React from 'react';

/**
 * CampusBridgeGraphic
 * Renders the iconic suspension bridge between campus towers matching the user's design.
 * Variants:
 *  - 'hero': Full color detailed illustration for the Hero banner.
 *  - 'watermark': Translucent, glowing ambient background backdrop for pages.
 *  - 'logo': Compact icon badge for navbar & branding.
 */
export default function CampusBridgeGraphic({ variant = 'hero', className = '', opacity = 1 }) {
  if (variant === 'logo') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className || "w-10 h-10"}
      >
        <circle cx="20" cy="20" r="18" fill="#ff5722" fillOpacity="0.15" stroke="#ff5722" strokeWidth="1.5" />
        {/* Bridge Arch & Tower */}
        <path d="M8 26 L15 14 L20 18 L25 14 L32 26" stroke="#ff5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="7" y1="26" x2="33" y2="26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="14" x2="15" y2="26" stroke="#ff8a65" strokeWidth="1.5" />
        <line x1="25" y1="14" x2="25" y2="26" stroke="#ff8a65" strokeWidth="1.5" />
        <line x1="20" y1="18" x2="20" y2="26" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
      </svg>
    );
  }

  if (variant === 'watermark') {
    return (
      <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1000 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-15"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Subtle Ambient Radial Light */}
          <circle cx="500" cy="180" r="280" fill="#ff5722" fillOpacity="0.08" />

          {/* Far Left City Skyline */}
          <rect x="20" y="160" width="55" height="130" rx="3" fill="#1e293b" fillOpacity="0.35" />
          <rect x="85" y="130" width="75" height="160" rx="3" fill="#1e293b" fillOpacity="0.45" />
          <rect x="170" y="175" width="60" height="115" rx="3" fill="#1e293b" fillOpacity="0.3" />

          {/* Far Right City Skyline */}
          <rect x="770" y="175" width="60" height="115" rx="3" fill="#1e293b" fillOpacity="0.3" />
          <rect x="840" y="130" width="75" height="160" rx="3" fill="#1e293b" fillOpacity="0.45" />
          <rect x="925" y="160" width="55" height="130" rx="3" fill="#1e293b" fillOpacity="0.35" />

          {/* Campus Tower Left */}
          <rect x="245" y="140" width="85" height="150" rx="4" fill="#0f172a" stroke="#ff5722" strokeOpacity="0.3" strokeWidth="1" />
          {/* Windows Left Tower */}
          <g fill="#38bdf8" fillOpacity="0.25">
            <rect x="258" y="155" width="10" height="12" rx="2" />
            <rect x="275" y="155" width="10" height="12" rx="2" />
            <rect x="292" y="155" width="10" height="12" rx="2" fill="#ff5722" fillOpacity="0.4" />
            <rect x="309" y="155" width="10" height="12" rx="2" />
            <rect x="258" y="178" width="10" height="12" rx="2" fill="#ff5722" fillOpacity="0.4" />
            <rect x="275" y="178" width="10" height="12" rx="2" />
            <rect x="292" y="178" width="10" height="12" rx="2" />
            <rect x="309" y="178" width="10" height="12" rx="2" />
            <rect x="258" y="201" width="10" height="12" rx="2" />
            <rect x="275" y="201" width="10" height="12" rx="2" fill="#ff5722" fillOpacity="0.4" />
            <rect x="292" y="201" width="10" height="12" rx="2" />
            <rect x="309" y="201" width="10" height="12" rx="2" />
          </g>

          {/* Campus Tower Right */}
          <rect x="670" y="140" width="85" height="150" rx="4" fill="#0f172a" stroke="#ff5722" strokeOpacity="0.3" strokeWidth="1" />
          {/* Windows Right Tower */}
          <g fill="#38bdf8" fillOpacity="0.25">
            <rect x="683" y="155" width="10" height="12" rx="2" />
            <rect x="700" y="155" width="10" height="12" rx="2" fill="#ff5722" fillOpacity="0.4" />
            <rect x="717" y="155" width="10" height="12" rx="2" />
            <rect x="734" y="155" width="10" height="12" rx="2" />
            <rect x="683" y="178" width="10" height="12" rx="2" />
            <rect x="700" y="178" width="10" height="12" rx="2" />
            <rect x="717" y="178" width="10" height="12" rx="2" fill="#ff5722" fillOpacity="0.4" />
            <rect x="734" y="178" width="10" height="12" rx="2" />
            <rect x="683" y="201" width="10" height="12" rx="2" fill="#ff5722" fillOpacity="0.4" />
            <rect x="700" y="201" width="10" height="12" rx="2" />
            <rect x="717" y="201" width="10" height="12" rx="2" />
            <rect x="734" y="201" width="10" height="12" rx="2" />
          </g>

          {/* Road Deck Line */}
          <line x1="20" y1="240" x2="980" y2="240" stroke="#cbd5e1" strokeWidth="3" strokeOpacity="0.5" />
          <line x1="20" y1="244" x2="980" y2="244" stroke="#ff5722" strokeWidth="2" strokeDasharray="10 6" strokeOpacity="0.6" />

          {/* Golden Gate Suspension Tower 1 */}
          <g stroke="#ff5722" strokeWidth="2.5">
            <line x1="395" y1="50" x2="395" y2="240" />
            <line x1="415" y1="50" x2="415" y2="240" />
            <path d="M395 50 L405 32 L415 50" fill="#ff5722" fillOpacity="0.6" />
            <line x1="395" y1="95" x2="415" y2="95" />
            <line x1="395" y1="140" x2="415" y2="140" />
            <line x1="395" y1="185" x2="415" y2="185" />
            {/* Cross bracing */}
            <line x1="395" y1="95" x2="415" y2="140" strokeOpacity="0.4" />
            <line x1="415" y1="95" x2="395" y2="140" strokeOpacity="0.4" />
            <line x1="395" y1="140" x2="415" y2="185" strokeOpacity="0.4" />
            <line x1="415" y1="140" x2="395" y2="185" strokeOpacity="0.4" />
          </g>

          {/* Golden Gate Suspension Tower 2 */}
          <g stroke="#ff5722" strokeWidth="2.5">
            <line x1="585" y1="50" x2="585" y2="240" />
            <line x1="605" y1="50" x2="605" y2="240" />
            <path d="M585 50 L595 32 L605 50" fill="#ff5722" fillOpacity="0.6" />
            <line x1="585" y1="95" x2="605" y2="95" />
            <line x1="585" y1="140" x2="605" y2="140" />
            <line x1="585" y1="185" x2="605" y2="185" />
            {/* Cross bracing */}
            <line x1="585" y1="95" x2="605" y2="140" strokeOpacity="0.4" />
            <line x1="605" y1="95" x2="585" y2="140" strokeOpacity="0.4" />
            <line x1="585" y1="140" x2="605" y2="185" strokeOpacity="0.4" />
            <line x1="605" y1="140" x2="585" y2="185" strokeOpacity="0.4" />
          </g>

          {/* Main Suspension Cables */}
          <path d="M330 240 Q365 140 405 32" stroke="#ff5722" strokeWidth="3.5" fill="none" />
          <path d="M405 32 Q500 180 595 32" stroke="#ff5722" strokeWidth="3.5" fill="none" />
          <path d="M595 32 Q635 140 670 240" stroke="#ff5722" strokeWidth="3.5" fill="none" />

          {/* Vertical Drop Cables */}
          <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.45">
            <line x1="430" y1="72" x2="430" y2="240" />
            <line x1="450" y1="108" x2="450" y2="240" />
            <line x1="470" y1="135" x2="470" y2="240" />
            <line x1="490" y1="150" x2="490" y2="240" />
            <line x1="510" y1="150" x2="510" y2="240" />
            <line x1="530" y1="135" x2="530" y2="240" />
            <line x1="550" y1="108" x2="550" y2="240" />
            <line x1="570" y1="72" x2="570" y2="240" />

            <line x1="355" y1="180" x2="355" y2="240" />
            <line x1="375" y1="110" x2="375" y2="240" />
            <line x1="625" y1="110" x2="625" y2="240" />
            <line x1="645" y1="180" x2="645" y2="240" />
          </g>
        </svg>
      </div>
    );
  }

  // DEFAULT 'hero' VARIANT (Matches the exact illustration on the right of the user's design image)
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background warm radial light glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none"></div>

      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_15px_35px_rgba(255,87,34,0.2)]"
      >
        {/* Left Campus Tower / Silhouette */}
        <rect x="25" y="130" width="85" height="140" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
        {/* Left Building Windows */}
        <g fill="#94a3b8" fillOpacity="0.4">
          <rect x="38" y="145" width="10" height="12" rx="1.5" fill="#38bdf8" fillOpacity="0.6" />
          <rect x="54" y="145" width="10" height="12" rx="1.5" />
          <rect x="70" y="145" width="10" height="12" rx="1.5" fill="#ff5722" fillOpacity="0.8" />
          <rect x="86" y="145" width="10" height="12" rx="1.5" />

          <rect x="38" y="165" width="10" height="12" rx="1.5" />
          <rect x="54" y="165" width="10" height="12" rx="1.5" fill="#ffffff" fillOpacity="0.7" />
          <rect x="70" y="165" width="10" height="12" rx="1.5" />
          <rect x="86" y="165" width="10" height="12" rx="1.5" fill="#38bdf8" fillOpacity="0.6" />

          <rect x="38" y="185" width="10" height="12" rx="1.5" fill="#ff5722" fillOpacity="0.7" />
          <rect x="54" y="185" width="10" height="12" rx="1.5" />
          <rect x="70" y="185" width="10" height="12" rx="1.5" fill="#ffffff" fillOpacity="0.8" />
          <rect x="86" y="185" width="10" height="12" rx="1.5" />

          <rect x="38" y="205" width="10" height="12" rx="1.5" />
          <rect x="54" y="205" width="10" height="12" rx="1.5" fill="#38bdf8" fillOpacity="0.6" />
          <rect x="70" y="205" width="10" height="12" rx="1.5" />
          <rect x="86" y="205" width="10" height="12" rx="1.5" />
        </g>

        {/* Right Campus Tower / Silhouette */}
        <rect x="430" y="130" width="85" height="140" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
        {/* Right Building Windows */}
        <g fill="#94a3b8" fillOpacity="0.4">
          <rect x="443" y="145" width="10" height="12" rx="1.5" />
          <rect x="459" y="145" width="10" height="12" rx="1.5" fill="#38bdf8" fillOpacity="0.7" />
          <rect x="475" y="145" width="10" height="12" rx="1.5" />
          <rect x="491" y="145" width="10" height="12" rx="1.5" fill="#ff5722" fillOpacity="0.8" />

          <rect x="443" y="165" width="10" height="12" rx="1.5" fill="#ff5722" fillOpacity="0.8" />
          <rect x="459" y="165" width="10" height="12" rx="1.5" />
          <rect x="475" y="165" width="10" height="12" rx="1.5" fill="#ffffff" fillOpacity="0.7" />
          <rect x="491" y="165" width="10" height="12" rx="1.5" />

          <rect x="443" y="185" width="10" height="12" rx="1.5" />
          <rect x="459" y="185" width="10" height="12" rx="1.5" fill="#38bdf8" fillOpacity="0.6" />
          <rect x="475" y="185" width="10" height="12" rx="1.5" />
          <rect x="491" y="185" width="10" height="12" rx="1.5" fill="#ffffff" fillOpacity="0.7" />

          <rect x="443" y="205" width="10" height="12" rx="1.5" fill="#38bdf8" fillOpacity="0.6" />
          <rect x="459" y="205" width="10" height="12" rx="1.5" />
          <rect x="475" y="205" width="10" height="12" rx="1.5" fill="#ff5722" fillOpacity="0.8" />
          <rect x="491" y="205" width="10" height="12" rx="1.5" />
        </g>

        {/* Bridge Road Deck */}
        <line x1="20" y1="220" x2="520" y2="220" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
        <line x1="20" y1="225" x2="520" y2="225" stroke="#ff5722" strokeWidth="2.5" strokeDasharray="8 6" strokeLinecap="round" />

        {/* Suspension Tower Left */}
        <g stroke="#ff5722" strokeWidth="3">
          <line x1="180" y1="50" x2="180" y2="220" />
          <line x1="202" y1="50" x2="202" y2="220" />
          <path d="M180 50 L191 32 L202 50" fill="#ff5722" />
          <line x1="180" y1="95" x2="202" y2="95" strokeWidth="2" />
          <line x1="180" y1="140" x2="202" y2="140" strokeWidth="2" />
          <line x1="180" y1="180" x2="202" y2="180" strokeWidth="2" />
          {/* Internal X-truss */}
          <line x1="180" y1="95" x2="202" y2="140" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="202" y1="95" x2="180" y2="140" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="180" y1="140" x2="202" y2="180" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="202" y1="140" x2="180" y2="180" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        {/* Suspension Tower Right */}
        <g stroke="#ff5722" strokeWidth="3">
          <line x1="338" y1="50" x2="338" y2="220" />
          <line x1="360" y1="50" x2="360" y2="220" />
          <path d="M338 50 L349 32 L360 50" fill="#ff5722" />
          <line x1="338" y1="95" x2="360" y2="95" strokeWidth="2" />
          <line x1="338" y1="140" x2="360" y2="140" strokeWidth="2" />
          <line x1="338" y1="180" x2="360" y2="180" strokeWidth="2" />
          {/* Internal X-truss */}
          <line x1="338" y1="95" x2="360" y2="140" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="360" y1="95" x2="338" y2="140" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="338" y1="140" x2="360" y2="180" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="360" y1="140" x2="338" y2="180" stroke="#ff8a65" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        {/* Main Suspension Cables (Vibrant Orange Arcs) */}
        <path d="M110 220 Q145 125 191 32" stroke="#ff5722" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M191 32 Q270 165 349 32" stroke="#ff5722" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M349 32 Q395 125 430 220" stroke="#ff5722" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* White Vertical Drop Cables */}
        <g stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.85">
          <line x1="215" y1="68" x2="215" y2="220" />
          <line x1="230" y1="98" x2="230" y2="220" />
          <line x1="245" y1="120" x2="245" y2="220" />
          <line x1="260" y1="135" x2="260" y2="220" />
          <line x1="275" y1="140" x2="275" y2="220" stroke="#ff5722" strokeWidth="2" />
          <line x1="290" y1="135" x2="290" y2="220" />
          <line x1="305" y1="120" x2="305" y2="220" />
          <line x1="320" y1="98" x2="320" y2="220" />
          <line x1="335" y1="68" x2="335" y2="220" />

          <line x1="135" y1="175" x2="135" y2="220" strokeOpacity="0.6" />
          <line x1="155" y1="115" x2="155" y2="220" strokeOpacity="0.6" />
          <line x1="385" y1="115" x2="385" y2="220" strokeOpacity="0.6" />
          <line x1="405" y1="175" x2="405" y2="220" strokeOpacity="0.6" />
        </g>

        {/* Dynamic Energy Signal traveling across the bridge */}
        <circle cx="275" cy="140" r="4" fill="#ffffff" className="animate-ping" />
        <circle cx="275" cy="220" r="3" fill="#ff5722" className="animate-pulse" />
      </svg>
    </div>
  );
}
