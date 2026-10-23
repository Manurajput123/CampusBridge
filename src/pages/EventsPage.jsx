import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  MapPin,
  Building2,
  Radio,
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  Plus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function EventsPage({ setActiveTab, setSelectedEventId }) {
  const { events, currentUser, passes } = useApp();
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [onlyMyCampus, setOnlyMyCampus] = useState(false);

  const isCollegeAdmin = currentUser.role === 'college_admin';

  const filteredEvents = events.filter(evt => {
    if (filterCategory !== 'ALL' && evt.category !== filterCategory) return false;

    if (onlyMyCampus && currentUser.role === 'student') {
      if (evt.targetScope === 'SELECTED_COLLEGES') {
        return evt.targetColleges.includes(currentUser.collegeId);
      }
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
            Feature 02: Multi-Campus Ecosystem
          </div>
          <h1 className="text-3xl font-extrabold text-white">Inter-College Events & Hackathons</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse cross-campus competitions broadcasted by regional colleges with target-campus invitations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isCollegeAdmin ? (
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast New Event</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('passes')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>My Registered Passes</span>
            </button>
          )}
        </div>
      </div>

      {/* Target Audience Highlight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-slate-900 border border-purple-500/30 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Target-Campus Event Filtering Active</div>
            <div className="text-[11px] text-slate-300">
              Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.collegeName || 'All Campuses'})
            </div>
          </div>
        </div>

        {currentUser.role === 'student' && (
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-700">
            <input
              type="checkbox"
              checked={onlyMyCampus}
              onChange={(e) => setOnlyMyCampus(e.target.checked)}
              className="rounded bg-slate-800 text-indigo-600 focus:ring-0"
            />
            <span>Show Only Events Targeting My College</span>
          </label>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setFilterCategory('ALL')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition ${filterCategory === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          All Events ({events.length})
        </button>
        <button
          onClick={() => setFilterCategory('Hackathon')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition ${filterCategory === 'Hackathon' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Hackathons
        </button>
        <button
          onClick={() => setFilterCategory('Robotics & Hardware')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition ${filterCategory === 'Robotics & Hardware' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Robotics & Hardware
        </button>
        <button
          onClick={() => setFilterCategory('Symposium & Pitch')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition ${filterCategory === 'Symposium & Pitch' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Conclaves & Pitches
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(evt => {
          const isEligible = evt.targetScope === 'ALL' || (evt.targetColleges && evt.targetColleges.includes(currentUser.collegeId));
          const hasPass = passes.some(p => p.eventId === evt.id && p.studentId === currentUser.id);

          return (
            <div
              key={evt.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 flex flex-col justify-between"
            >
              <div>
                {/* Banner */}
                <div className="h-44 relative overflow-hidden bg-slate-800">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-purple-300 border border-purple-500/30">
                    {evt.category}
                  </div>

                  {/* Target Scope Badge */}
                  {evt.targetScope === 'SELECTED_COLLEGES' ? (
                    <div className="absolute top-3 right-3 bg-amber-500/25 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Radio className="w-3 h-3 text-amber-400" />
                      Targeted Campuses
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      Open to All
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] text-slate-300 font-medium">{evt.hostCollegeName}</span>
                    <h3 className="text-base font-bold text-white leading-tight mt-0.5">{evt.title}</h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Targeted Colleges Box */}
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1.5">
                    <div className="font-semibold text-slate-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Invited Campuses:</span>
                    </div>
                    {evt.targetScope === 'SELECTED_COLLEGES' ? (
                      <div className="flex flex-wrap gap-1">
                        {evt.targetCollegeNames?.map((colName, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                            {colName}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">All universities & affiliated colleges welcome.</span>
                    )}
                  </div>

                  {/* Details stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Prize Pool</span>
                      <span className="font-bold text-amber-300">{evt.prizePool}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Event Date</span>
                      <span className="font-semibold text-white">{evt.date}</span>
                    </div>
                  </div>

                  {/* Student Eligibility Indicator */}
                  {currentUser.role === 'student' && (
                    <div className={`p-2 rounded-xl text-[11px] flex items-center gap-2 ${isEligible ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20' : 'bg-rose-950/40 text-rose-300 border border-rose-500/20'}`}>
                      {isEligible ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Eligible to register from {currentUser.collegeName}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>Restricted to selected campuses only</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setSelectedEventId(evt.id);
                    setActiveTab('event-detail');
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-lg shadow-purple-600/30"
                >
                  <span>{hasPass ? 'View Pass & Details' : 'View Event & Register'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
