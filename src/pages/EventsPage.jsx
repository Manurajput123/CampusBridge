import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Building2,
  Radio,
  CheckCircle2,
  ArrowRight,
  Plus,
  AlertCircle,
  Lock,
  Sparkles,
  Users,
  Trophy,
  Filter,
  X,
  Send,
  ShieldCheck,
  Check,
  MapPin
} from 'lucide-react';

export default function EventsPage({ setActiveTab, setSelectedEventId }) {
  const { events, currentUser, passes, colleges, createEvent, showToast } = useApp();

  // Filters
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [onlyMyCampus, setOnlyMyCampus] = useState(false);

  // Interactive Perspective Switcher (Simulate being student of College B, C, or D)
  const [simulatedCollegeId, setSimulatedCollegeId] = useState(
    currentUser?.collegeId || colleges[0]?.id || 'col-noida-1'
  );

  // Broadcast Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [hostColId, setHostColId] = useState(colleges[0]?.id || 'col-meerut-1');
  const [evtTitle, setEvtTitle] = useState('');
  const [evtCategory, setEvtCategory] = useState('Hackathon');
  const [evtPrize, setEvtPrize] = useState('₹1,50,000');
  const [evtDate, setEvtDate] = useState('Nov 28 - 29, 2026');
  const [evtVenue, setEvtVenue] = useState('Main Campus Innovation & Robotics Lab');
  const [evtDesc, setEvtDesc] = useState('');
  
  // The Core USP: Target Scope and Selected Colleges
  // Mode: 'SELECTED_COLLEGES' | 'ALL'
  const [targetScope, setTargetScope] = useState('SELECTED_COLLEGES');
  
  // Default to College B (NIET Noida) & College C (GEA Ghaziabad), excluding College D (DTU Delhi)
  const defaultInvited = colleges.filter(c => c.id !== 'col-delhi-1' && c.id !== hostColId).map(c => c.id);
  const [selectedCollegesToInvite, setSelectedCollegesToInvite] = useState(defaultInvited);

  // Colleges excluding the host college
  const availableTargetColleges = colleges.filter(c => c.id !== hostColId);

  // Toggle individual college in invite list
  const toggleCollegeSelection = (id) => {
    setSelectedCollegesToInvite(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Quick Preset: Invite College B & C Only (Exclude College D)
  const applyPresetBC = () => {
    // Select Noida (B) and Ghaziabad (C), explicitly exclude Delhi (D)
    const preset = colleges
      .filter(c => (c.city === 'Greater Noida' || c.city === 'Ghaziabad') && c.id !== hostColId)
      .map(c => c.id);
    setSelectedCollegesToInvite(preset);
    setTargetScope('SELECTED_COLLEGES');
    showToast('Applied Preset: Invited College B & C only. Excluded College D!', 'info');
  };

  // Quick Preset: Select All Registered Campuses
  const applyPresetAll = () => {
    setSelectedCollegesToInvite(availableTargetColleges.map(c => c.id));
    setTargetScope('ALL');
  };

  // Handle Event Broadcast Submission
  const handlePublishBroadcast = (e) => {
    e.preventDefault();
    if (!evtTitle.trim() || !evtDesc.trim()) {
      showToast('Please provide an event title and description.', 'warning');
      return;
    }

    if (targetScope === 'SELECTED_COLLEGES' && selectedCollegesToInvite.length === 0) {
      showToast('Please select at least one college to invite or choose "Open to All".', 'warning');
      return;
    }

    const hostCollegeObj = colleges.find(c => c.id === hostColId);
    const targetNames = colleges
      .filter(c => selectedCollegesToInvite.includes(c.id))
      .map(c => c.name);

    const newEvt = createEvent({
      title: evtTitle,
      category: evtCategory,
      mode: 'Offline / Campus Arena',
      bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      date: evtDate,
      registrationDeadline: 'Nov 20, 2026',
      venue: `${evtVenue} · ${hostCollegeObj?.name || 'Host Campus'}`,
      prizePool: evtPrize,
      maxTeamSize: 4,
      minTeamSize: 2,
      description: evtDesc,
      targetScope: targetScope,
      targetColleges: targetScope === 'ALL' ? ['ALL'] : selectedCollegesToInvite,
      targetCollegeNames: targetScope === 'ALL' ? ['All Registered Campuses'] : targetNames,
      eligibilityText: targetScope === 'ALL' 
        ? 'Open to all Indian colleges' 
        : `Invited partner colleges: ${targetNames.join(', ')}`,
      rounds: [
        { round: 'Online Preliminary Idea Submission', date: 'Nov 22, 2026', status: 'Upcoming' },
        { round: `36-Hour Hackathon at ${hostCollegeObj?.shortName || 'Host Campus'}`, date: evtDate, status: 'Grand Finale' }
      ],
      perks: ['Free accommodation & mess meals', 'Direct corporate mentorship', 'Verified pass certificates']
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setShowBroadcastModal(false);
    setEvtTitle('');
    setEvtDesc('');
    showToast(`🚀 Event broadcast dispatched to ${targetScope === 'ALL' ? 'all' : targetNames.length} selected colleges!`, 'success');
  };

  // Simulated College Info
  const simulatedCollege = colleges.find(c => c.id === simulatedCollegeId) || colleges[0];

  // Filter events
  const filteredEvents = events.filter(evt => {
    if (filterCategory !== 'ALL' && evt.category !== filterCategory) return false;

    if (onlyMyCampus) {
      if (evt.targetScope === 'SELECTED_COLLEGES') {
        return evt.targetColleges?.includes(simulatedCollegeId);
      }
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5722]/15 text-[#ff7043] border border-[#ff5722]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Targeted Cross-Campus Event Broadcast</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Inter-College Events & Broadcasts
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Registered colleges organize hackathons and conclaves, choosing exactly which partner campuses receive the event broadcast and registration passes.
          </p>
        </div>

        {/* Action Button: Broadcast New Event to Selected Colleges */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#ff5722]/30 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Broadcast Event (Select Campuses)</span>
          </button>

          <button
            onClick={() => setActiveTab('passes')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-800 transition"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>My QR Passes</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          CORE DEMONSTRATION & PERSPECTIVE SIMULATOR (THE USER'S MAIN IDEA)
          College A invites College B & C, and explicitly excludes College D.
          ===================================================================== */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-[#ff5722]/30 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Core Ecosystem Feature: Selective College Visibility</span>
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              When a registered college (e.g. <strong>MITS Meerut</strong>) creates an event, they select only their chosen partner campuses (e.g. <strong>NIET Greater Noida [B]</strong> and <strong>GEA Ghaziabad [C]</strong>). Students from uninvited campuses (e.g. <strong>DTU Delhi [D]</strong>) are locked out and cannot register.
            </p>
          </div>

          {/* Interactive Simulation Switcher */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Simulate viewing as student of:</span>
            </div>

            <select
              value={simulatedCollegeId}
              onChange={(e) => {
                setSimulatedCollegeId(e.target.value);
                showToast(`Switched perspective to: ${colleges.find(c => c.id === e.target.value)?.name}`, 'info');
              }}
              className="bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-1 focus:ring-[#ff5722] outline-none"
            >
              {colleges.map(c => (
                <option key={c.id} value={c.id}>
                  {c.shortName || c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick status callout for the currently simulated college */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-400">Current Simulated Campus:</span>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              🏛️ {simulatedCollege?.name} ({simulatedCollege?.city})
            </span>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyMyCampus}
              onChange={(e) => setOnlyMyCampus(e.target.checked)}
              className="rounded bg-slate-800 text-[#ff5722] focus:ring-0"
            />
            <span>Show ONLY events that invited my campus</span>
          </label>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setFilterCategory('ALL')}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${filterCategory === 'ALL' ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30' : 'text-slate-400 hover:text-white'}`}
        >
          All Broadcasts ({events.length})
        </button>
        <button
          onClick={() => setFilterCategory('Hackathon')}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${filterCategory === 'Hackathon' ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30' : 'text-slate-400 hover:text-white'}`}
        >
          Hackathons
        </button>
        <button
          onClick={() => setFilterCategory('Robotics & Hardware')}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${filterCategory === 'Robotics & Hardware' ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30' : 'text-slate-400 hover:text-white'}`}
        >
          Robotics & Hardware
        </button>
        <button
          onClick={() => setFilterCategory('Symposium & Pitch')}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${filterCategory === 'Symposium & Pitch' ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30' : 'text-slate-400 hover:text-white'}`}
        >
          Conclaves & Pitches
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(evt => {
          // Check if simulated college is invited
          const isEligible = evt.targetScope === 'ALL' || (evt.targetColleges && evt.targetColleges.includes(simulatedCollegeId));
          const hasPass = passes.some(p => p.eventId === evt.id && p.studentId === currentUser?.id);
          
          // Excluded colleges calculation
          const excludedColleges = colleges.filter(c => 
            c.id !== evt.hostCollegeId && 
            evt.targetScope === 'SELECTED_COLLEGES' && 
            !evt.targetColleges?.includes(c.id)
          );

          return (
            <div
              key={evt.id}
              className={`glass-card rounded-2xl overflow-hidden border transition flex flex-col justify-between ${
                isEligible 
                  ? 'border-slate-800 hover:border-[#ff5722]/60 hover:shadow-xl hover:shadow-[#ff5722]/10' 
                  : 'border-rose-900/40 opacity-80 bg-slate-950/80'
              }`}
            >
              <div>
                {/* Banner */}
                <div className="h-44 relative overflow-hidden bg-slate-800">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-orange-300 border border-[#ff5722]/30">
                    {evt.category}
                  </div>

                  {/* Target Scope Badge */}
                  {evt.targetScope === 'SELECTED_COLLEGES' ? (
                    <div className="absolute top-3 right-3 bg-amber-500/25 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-md">
                      <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                      <span>Targeted Broadcast</span>
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
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] space-y-2">
                    <div className="font-semibold text-slate-200 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-orange-300">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Invited Partner Campuses:</span>
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {evt.targetScope === 'SELECTED_COLLEGES' ? `${evt.targetColleges?.length || 0} Colleges` : 'All'}
                      </span>
                    </div>

                    {evt.targetScope === 'SELECTED_COLLEGES' ? (
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap gap-1">
                          {evt.targetCollegeNames?.map((colName, idx) => (
                            <span 
                              key={idx} 
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border flex items-center gap-1 ${
                                colName.toLowerCase().includes(simulatedCollege.name.toLowerCase()) || simulatedCollege.name.toLowerCase().includes(colName.toLowerCase())
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-sm'
                                  : 'bg-slate-800 text-slate-200 border-slate-700'
                              }`}
                            >
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>{colName}</span>
                            </span>
                          ))}
                        </div>

                        {/* List of explicitly excluded colleges for this targeted event */}
                        {excludedColleges.length > 0 && (
                          <div className="text-[10px] text-slate-500 pt-1 flex items-center gap-1 flex-wrap">
                            <span className="text-rose-400/80 font-semibold">Excluded:</span>
                            {excludedColleges.map((ex, i) => (
                              <span key={i} className="line-through text-slate-500">
                                {ex.shortName || ex.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">All registered colleges & universities in the network welcome.</span>
                    )}
                  </div>

                  {/* Details stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Prize Pool</span>
                      <span className="font-bold text-amber-300">{evt.prizePool}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Event Date</span>
                      <span className="font-semibold text-white">{evt.date}</span>
                    </div>
                  </div>

                  {/* Student Eligibility Indicator Based on Simulated College */}
                  <div className={`p-2.5 rounded-xl text-[11px] flex items-center gap-2 border ${
                    isEligible 
                      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30' 
                      : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                  }`}>
                    {isEligible ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <strong>Eligible to register:</strong> {simulatedCollege?.shortName || simulatedCollege?.name} is on the guest list!
                        </div>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-rose-400 shrink-0" />
                        <div>
                          <strong>Restricted Event:</strong> {simulatedCollege?.shortName || simulatedCollege?.name} was NOT selected by the host college.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setSelectedEventId(evt.id);
                    setActiveTab('event-detail');
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg ${
                    isEligible
                      ? 'bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white shadow-[#ff5722]/30'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {isEligible ? (
                    <>
                      <span>{hasPass ? 'View QR Pass' : 'Register & Get QR Pass'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      <span>View Invite Restrictions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          BROADCAST EVENT MODAL: ALLOWS SELECTING EXACT PARTNER COLLEGES
          ===================================================================== */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ff5722]/20 border border-[#ff5722]/40 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-[#ff5722] animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Broadcast Inter-College Event</h2>
                  <p className="text-xs text-slate-400">Target specific registered campuses or open to all</p>
                </div>
              </div>

              <button
                onClick={() => setShowBroadcastModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePublishBroadcast} className="space-y-5">
              
              {/* Host College Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Organizing (Host) College <span className="text-[#ff7043]">*</span>
                </label>
                <select
                  value={hostColId}
                  onChange={(e) => {
                    setHostColId(e.target.value);
                    // Remove new host from invited list
                    setSelectedCollegesToInvite(prev => prev.filter(id => id !== e.target.value));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-medium focus:ring-1 focus:ring-[#ff5722]"
                >
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.city}, {c.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Event Title <span className="text-[#ff7043]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smart City Innovation Hackathon"
                    value={evtTitle}
                    onChange={(e) => setEvtTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-[#ff5722]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={evtCategory}
                    onChange={(e) => setEvtCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-medium focus:ring-1 focus:ring-[#ff5722]"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Robotics & Hardware">Robotics & Hardware</option>
                    <option value="Symposium & Pitch">Symposium & Pitch</option>
                    <option value="Coding Sprint">Coding Sprint</option>
                  </select>
                </div>
              </div>

              {/* Prize & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Prize Pool
                  </label>
                  <input
                    type="text"
                    value={evtPrize}
                    onChange={(e) => setEvtPrize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={evtDate}
                    onChange={(e) => setEvtDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Event Description <span className="text-[#ff7043]">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain event tracks, eligibility criteria, and problem statements..."
                  value={evtDesc}
                  onChange={(e) => setEvtDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500"
                  required
                ></textarea>
              </div>

              {/* =============================================================
                  THE CORE USP: TARGET AUDIENCE & SELECTIVE COLLEGE CHECKLIST
                  ============================================================= */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#ff7043]" />
                      <span>Targeted College Audience (Inter-Campus Dispatch)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Choose which registered colleges will receive this broadcast
                    </p>
                  </div>

                  {/* Preset Button: B & C only, Exclude D */}
                  <button
                    type="button"
                    onClick={applyPresetBC}
                    className="px-2.5 py-1 rounded-lg bg-[#ff5722]/20 hover:bg-[#ff5722]/30 text-[#ff7043] text-[10px] font-bold border border-[#ff5722]/30 transition"
                  >
                    🎯 Preset: Invite B & C (Exclude D)
                  </button>
                </div>

                {/* Scope Radio Mode */}
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="scope"
                      value="SELECTED_COLLEGES"
                      checked={targetScope === 'SELECTED_COLLEGES'}
                      onChange={() => setTargetScope('SELECTED_COLLEGES')}
                      className="text-[#ff5722] focus:ring-0"
                    />
                    <span className="font-semibold text-white">Selected Partner Campuses Only</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="scope"
                      value="ALL"
                      checked={targetScope === 'ALL'}
                      onChange={() => setTargetScope('ALL')}
                      className="text-[#ff5722] focus:ring-0"
                    />
                    <span>Open to All Registered Colleges</span>
                  </label>
                </div>

                {/* College Checklist (When Selective Broadcast is enabled) */}
                {targetScope === 'SELECTED_COLLEGES' && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">
                      Select which registered partner colleges receive information & entry passes:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                      {availableTargetColleges.map(col => {
                        const isChecked = selectedCollegesToInvite.includes(col.id);
                        return (
                          <div
                            key={col.id}
                            onClick={() => toggleCollegeSelection(col.id)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                              isChecked
                                ? 'bg-[#ff5722]/15 border-[#ff5722]/60 text-white'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="truncate mr-2">
                              <div className="font-bold truncate">{col.shortName || col.name}</div>
                              <div className="text-[10px] text-slate-400">{col.city}, {col.state}</div>
                            </div>

                            <div className="shrink-0">
                              {isChecked ? (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                  Invited ✅
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-500">
                                  Excluded ⛔
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Live Summary Preview */}
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                      <strong>Broadcast Dispatch Summary:</strong> Event will be sent to{' '}
                      <span className="text-emerald-400 font-bold">{selectedCollegesToInvite.length} colleges</span>.
                      Students of excluded campuses ({availableTargetColleges.length - selectedCollegesToInvite.length} colleges) will be restricted from registering.
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-[#ff5722]/30 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Targeted Event Broadcast 🚀</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
