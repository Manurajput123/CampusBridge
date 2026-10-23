import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Users,
  QrCode,
  Radio,
  ExternalLink,
  Award,
  GraduationCap,
  Plus
} from 'lucide-react';

export default function HomePage({ setActiveTab, setSelectedCollegeId, setSelectedEventId }) {
  const { colleges, events, passes, currentUser, switchUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('explore');
  };

  const featuredColleges = colleges.slice(0, 3);
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 animate-fade-in shadow-sm">
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>CampusBridge Multi-Campus Inter-College Ecosystem</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
            Discover Colleges. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Compare Opportunities.
            </span> <br />
            Connect Campuses.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            A centralized platform for verified college discovery, multi-campus event broadcasting, college-approved student lab & resource access, and inter-college team collaboration.
          </p>

          {/* Quick Search Box */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-700/50">
              <Search className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Search colleges in Meerut, Noida, Ghaziabad, Delhi or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Explore Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
            <span>Popular:</span>
            <button onClick={() => setActiveTab('explore')} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              📍 Meerut Engineering
            </button>
            <button onClick={() => setActiveTab('explore')} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              📍 Greater Noida B.Tech
            </button>
            <button onClick={() => setActiveTab('explore')} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              🎓 AI & Data Science
            </button>
            <button onClick={() => setActiveTab('compare')} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60 transition">
              ⚖️ Side-by-Side Compare
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Features Breakdown (From the PPT!) */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Core Platform Pillars</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Three Groundbreaking Features</h2>
          <p className="text-sm text-slate-400 mt-2">Engineered specifically for Indian colleges and students to eliminate the information silos between neighboring campuses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 relative group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-indigo-400 tracking-wider uppercase mb-1">Feature 01</div>
            <h3 className="text-lg font-bold text-white mb-2">College Discovery & Comparison</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Explore colleges across Meerut, Noida, Ghaziabad, Delhi with verified fee structures, eligibility criteria, cutoffs, and placements. Compare up to 3 colleges side-by-side.
            </p>
            <button
              onClick={() => setActiveTab('compare')}
              className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 transition"
            >
              Try Side-by-Side Comparison <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 relative group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
              <Radio className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-1">Feature 02</div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-Campus Event Broadcasting</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Colleges can host hackathons and symposia targeting selected partner colleges (e.g., Meerut college broadcasting its hackathon specifically to Noida & Ghaziabad campuses).
            </p>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 flex items-center gap-1 transition"
            >
              View Targeted Events Feed <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 relative group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-emerald-400 tracking-wider uppercase mb-1">Feature 03</div>
            <h3 className="text-lg font-bold text-white mb-2">Student Access & QR Check-in</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Students can request permissions for high-end research labs, maker workshops, or digital libraries at other colleges. Admin approves or rejects. Single-scan duplicate-proof QR check-in!
            </p>
            <button
              onClick={() => setActiveTab('requests')}
              className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 transition"
            >
              View Campus Permissions <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Top Regional Campuses</h2>
            <p className="text-xs text-slate-400 mt-1">Institutions with verified student portals & active cross-campus programs</p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View all colleges <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredColleges.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                setSelectedCollegeId(col.id);
                setActiveTab('college-detail');
              }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 cursor-pointer flex flex-col"
            >
              <div className="h-44 relative overflow-hidden bg-slate-800">
                <img
                  src={col.bannerImage}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white border border-slate-700 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-400" />
                  {col.city}, {col.state}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs text-indigo-300 font-semibold">{col.accreditation}</span>
                  <h3 className="text-base font-bold text-white leading-tight mt-0.5">{col.name}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {col.about}
                </p>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Avg Package</span>
                    <span className="font-bold text-white">{col.placementStats.avgPackage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Annual Fees</span>
                    <span className="font-bold text-white">₹{col.courses[0]?.annualFee?.toLocaleString()}/yr</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-slate-400">
                    {col.courses.length} Degree Programs
                  </span>
                  <span className="font-semibold text-indigo-400 flex items-center gap-1 hover:translate-x-1 transition">
                    Explore Profile <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Targeted Events */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Inter-College Events & Hackathons</h2>
            <p className="text-xs text-slate-400 mt-1">Events with cross-campus participation and verified entry tokens</p>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            All Events <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => {
                setSelectedEventId(evt.id);
                setActiveTab('event-detail');
              }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 cursor-pointer flex flex-col"
            >
              <div className="h-40 relative overflow-hidden bg-slate-800">
                <img
                  src={evt.bannerImage}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-purple-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-purple-200 border border-purple-500/30">
                  {evt.category}
                </div>
                {evt.targetScope === 'SELECTED_COLLEGES' ? (
                  <div className="absolute top-3 right-3 bg-amber-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    Targeted Campuses
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                    Open To All
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] text-purple-300 font-semibold">{evt.hostCollegeName}</span>
                  <h3 className="text-base font-bold text-white leading-tight mt-0.5">{evt.title}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Prize Pool</span>
                    <span className="font-bold text-amber-300">{evt.prizePool}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white">{evt.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    Max Team: {evt.maxTeamSize} Members
                  </span>
                  <span className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    Details & Pass <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Switcher Quick Callout Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Interactive Hackathon Demo Switcher
            </span>
            <h3 className="text-xl font-bold text-white">Experience Both Perspectives in 1 Click</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Switch from <strong>Aarav Sharma</strong> (Student exploring colleges & requesting passes) to <strong>Dr. R.K. Sharma</strong> (Meerut Admin broadcasting events & approving access requests), then test the Gate Scanner!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                switchUser('admin-meerut');
                setActiveTab('admin');
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Switch to Meerut Admin
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-semibold text-xs transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Register Your College
            </button>
            <button
              onClick={() => {
                switchUser('usr-aarav');
                setActiveTab('explore');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Switch to Student View
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
