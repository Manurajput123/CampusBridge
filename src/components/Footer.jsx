import React from 'react';
import { GraduationCap, Heart, Shield, Sparkles, Github, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>CampusBridge</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A centralized platform for verified college discovery, multi-campus event broadcasting, access permissions, and student collaboration across India.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Verified Institution & Student Network</span>
            </div>
          </div>

          {/* Feature 1 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Feature 1: Discovery & Compare</h4>
            <ul className="text-xs space-y-2">
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-indigo-400 transition">
                  Search Meerut, Noida, Delhi Colleges
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-indigo-400 transition">
                  Side-by-Side 3-Way Comparison
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-indigo-400 transition">
                  AI Admission & Fee Guidance
                </button>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Feature 2: Admin & Events</h4>
            <ul className="text-xs space-y-2">
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-indigo-400 transition">
                  College Admin Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-indigo-400 transition">
                  Targeted Campus Event Broadcast
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('scanner')} className="hover:text-indigo-400 transition">
                  Duplicate-Resistant QR Gate Scanner
                </button>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Feature 3: Student Access & Teams</h4>
            <ul className="text-xs space-y-2">
              <li>
                <button onClick={() => setActiveTab('requests')} className="hover:text-indigo-400 transition">
                  Campus Lab & Resource Permissions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('teams')} className="hover:text-indigo-400 transition">
                  Inter-College Team Finder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('passes')} className="hover:text-indigo-400 transition">
                  Student Event Passes & QR Code
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            Built with React 18, Vite, Tailwind CSS, QR Verification & Local-First State.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
              CampusBridge 2026 Hackathon Release
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
