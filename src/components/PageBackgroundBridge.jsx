import React from 'react';
import CampusBridgeGraphic from './CampusBridgeGraphic';

/**
 * PageBackgroundBridge
 * Ambient background layer providing the translucent glowing bridge artwork
 * across different pages of CampusBridge, matching the user's design image.
 */
export default function PageBackgroundBridge({ opacity = "opacity-15", position = "top" }) {
  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* Top warm coral ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#ff5722]/15 via-[#ff5722]/5 to-transparent blur-[120px] rounded-full"></div>
      
      {/* Top-Right Secondary Glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#ff7043]/10 blur-[140px] rounded-full"></div>

      {/* The Translucent Bridge Watermark Graphic */}
      <div className={`absolute left-1/2 -translate-x-1/2 w-[1200px] max-w-none ${position === 'top' ? 'top-12' : 'top-1/3'} ${opacity}`}>
        <CampusBridgeGraphic variant="watermark" />
      </div>

      {/* Subtle Dot Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ff5722 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      ></div>
    </div>
  );
}
