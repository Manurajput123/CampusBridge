import React from 'react';
import { Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CampusBridgeGraphic from './CampusBridgeGraphic';

export default function Footer({ setActiveTab }) {
  const { isLoggedIn } = useApp();
  return (
    <footer className="border-t border-slate-800 bg-[#070b14] text-slate-400 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-start">
          
          {/* Brand Column matching the user's design mock */}
          <div className="md:col-span-5 space-y-3">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-white font-bold text-lg cursor-pointer"
            >
              <CampusBridgeGraphic variant="logo" className="w-8 h-8" />
              <span>Campus<span className="text-[#ff5722]">Bridge</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Research verified disclosures on every fact. All events are managed by official campus hosts. Gate scanners are authorized per event.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#ff7043]">
              <Shield className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Verified Institution & Multi-Campus Access Network</span>
            </div>
          </div>

          {/* Links matching mock image */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <h4 className="font-bold text-white mb-2.5">Colleges</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab('explore')} className="hover:text-[#ff7043] transition">All Campuses</button></li>
                <li><button onClick={() => setActiveTab('compare')} className="hover:text-[#ff7043] transition">Side-by-Side</button></li>
                <li><button onClick={() => setActiveTab('spatial')} className="hover:text-[#ff7043] transition">3D Earth Gateway</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2.5">For Colleges</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab('admin')} className="hover:text-[#ff7043] transition">Admin Studio</button></li>
                <li><button onClick={() => setActiveTab('requests')} className="hover:text-[#ff7043] transition">Lab Passes</button></li>
                <li><button onClick={() => setActiveTab('scanner')} className="hover:text-[#ff7043] transition">Gate Scanner</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2.5">Events</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab('events')} className="hover:text-[#ff7043] transition">Hackathons</button></li>
                <li><button onClick={() => setActiveTab('notices')} className="hover:text-[#ff7043] transition">Bulletins</button></li>
                <li><button onClick={() => setActiveTab('passes')} className="hover:text-[#ff7043] transition">My Passes</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2.5">Platform</h4>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => setActiveTab(isLoggedIn ? 'spatial' : 'auth')}
                    className="hover:text-[#ff7043] transition"
                  >
                    {isLoggedIn ? '3D Campus Map' : 'Student Sign Up'}
                  </button>
                </li>
                <li><button onClick={() => setActiveTab('teams')} className="hover:text-[#ff7043] transition">Team Finder</button></li>
                <li><button onClick={() => setActiveTab('ai')} className="hover:text-[#ff7043] transition">AI Advisor</button></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 CampusBridge. One bridge between every campus.
          </div>
          <div className="flex items-center gap-3">
            <span>Western UP & NCR Education Corridor</span>
            <span>·</span>
            <span className="text-[#ff7043]">Private & Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
