import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Calendar,
  MapPin,
  Building2,
  Trophy,
  Users,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  ArrowLeft,
  Share2,
  ShieldCheck,
  Radio,
  Sparkles,
  X
} from 'lucide-react';
import QRPassModal from '../components/QRPassModal';

export default function EventDetailPage({ eventId, setActiveTab, onBack }) {
  const { events, currentUser, passes, registerForEvent } = useApp();
  const event = events.find(e => e.id === eventId) || events[0];

  const [activePassModal, setActivePassModal] = useState(null);

  // Check if current user has pass
  const existingPass = passes.find(p => p.eventId === event.id && p.studentId === currentUser.id);

  // Check eligibility
  const isEligible = event.targetScope === 'ALL' || (event.targetColleges && event.targetColleges.includes(currentUser.collegeId));

  const handleRegister = () => {
    const res = registerForEvent(event.id);
    if (res.success && res.pass) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // confetti fallback
      }
      setActivePassModal(res.pass);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back and Close buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack || (() => setActiveTab('events'))}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events Feed
        </button>

        <button
          onClick={onBack || (() => setActiveTab('events'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition text-xs font-bold"
          title="Close Event View (X)"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </div>

      {/* Main Banner Header */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
        <div className="h-64 sm:h-80 relative overflow-hidden">
          <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 backdrop-blur-md text-purple-200 border border-purple-500/40">
                {event.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700">
                {event.mode}
              </span>
            </div>

            {event.targetScope === 'SELECTED_COLLEGES' ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 backdrop-blur-md text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                Targeted Campuses Only
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                Open To All Campuses
              </span>
            )}
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5" />
                Organized by {event.hostCollegeName} ({event.hostCity})
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{event.title}</h1>
            </div>

            {/* Quick Register / View Pass Button */}
            <div>
              {existingPass ? (
                <button
                  onClick={() => setActivePassModal(existingPass)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition"
                >
                  <QrCode className="w-4 h-4" />
                  View My QR Pass
                </button>
              ) : isEligible ? (
                <button
                  onClick={handleRegister}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  Register Now (Generate QR Pass)
                </button>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Restricted to invited partner colleges
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/60 p-4 text-center">
          <div>
            <div className="text-[11px] text-slate-400">Total Prize Pool</div>
            <div className="text-base font-bold text-amber-300">{event.prizePool}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Event Dates</div>
            <div className="text-base font-bold text-white">{event.date}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Registration Closes</div>
            <div className="text-base font-bold text-rose-300">{event.registrationDeadline}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Team Size</div>
            <div className="text-base font-bold text-white">{event.minTeamSize} - {event.maxTeamSize} Members</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About Event */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-bold text-white">About the Competition</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>Venue:</strong> {event.venue}</span>
            </div>
          </div>

          {/* Rounds */}
          {event.rounds && (
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold text-white">Competition Timeline & Rounds</h2>
              <div className="space-y-3">
                {event.rounds.map((rnd, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-500/30">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{rnd.round}</h4>
                        <span className="text-[11px] text-slate-400">{rnd.date}</span>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {rnd.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perks */}
          {event.perks && (
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold text-white">Participant Perks & Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.perks.map((perk, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Target Colleges & Team Finder shortcut */}
        <div className="space-y-6">
          
          {/* Target Campuses Box (Key Feature 2!) */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-300">
              <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Multi-Campus Broadcast</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The organizer ({event.hostCollegeName}) selected these target campuses for participation:
            </p>

            <div className="space-y-2">
              {event.targetScope === 'SELECTED_COLLEGES' ? (
                event.targetCollegeNames?.map((name, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{name}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                  Open broadcast to all colleges and universities in India.
                </div>
              )}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
              Only students with email domains from selected partner campuses can claim passes.
            </div>
          </div>

          {/* Need Teammates Box */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-300">
              <Users className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Find Teammates</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Don't have a team yet? Connect with students from Meerut, Noida, Ghaziabad, and Delhi to form a cross-campus hackathon squad.
            </p>
            <button
              onClick={() => setActiveTab('teams')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <Users className="w-4 h-4" />
              Explore Open Teams for this Event
            </button>
          </div>

        </div>
      </div>

      {/* QR Pass Modal */}
      {activePassModal && (
        <QRPassModal
          pass={activePassModal}
          onClose={() => setActivePassModal(null)}
        />
      )}

    </div>
  );
}
