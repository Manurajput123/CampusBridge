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
  Plus,
  BellRing,
  LogIn,
  Globe,
  Navigation,
  Check,
  FileText
} from 'lucide-react';
import CampusBridgeGraphic from '../components/CampusBridgeGraphic';

export default function HomePage({ setActiveTab, setSelectedCollegeId, setSelectedEventId, onOpenSpatialNavigator }) {
  const { colleges, events, passes, currentUser, switchUser, toggleCompare, compareList, isLoggedIn } = useApp();
  
  // Filter form state matching the design mock image
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedMaxFee, setSelectedMaxFee] = useState('All');

  // Filter colleges based on selections
  const filteredColleges = colleges.filter(c => {
    if (selectedCity !== 'All' && !c.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (selectedCourse !== 'All' && !c.courses.some(crs => crs.name.toLowerCase().includes(selectedCourse.toLowerCase()) || crs.branch?.toLowerCase().includes(selectedCourse.toLowerCase()))) return false;
    if (selectedMaxFee !== 'All') {
      const maxFeeNum = parseInt(selectedMaxFee, 10);
      const minColFee = Math.min(...c.courses.map(crs => crs.annualFee || 999999));
      if (minColFee > maxFeeNum) return false;
    }
    return true;
  });

  const displayColleges = (filteredColleges.length > 0 ? filteredColleges : colleges).slice(0, 5);
  const featuredEvents = events.slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('explore');
  };

  return (
    <div className="space-y-16 pb-16 relative">
      
      {/* ===================================================================
          HERO SECTION (FAITHFUL TO USER'S ATTACHED DESIGN IMAGE)
          =================================================================== */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#0b1120]">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & Interactive 3-Dropdown Filter Box */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Pill Tag */}
              <div className="text-[#ff5722] text-xs font-bold tracking-widest uppercase font-mono flex items-center gap-2">
                <span>COLLEGES • EVENTS • ONE PASS</span>
              </div>

              {/* Main Headline: "One bridge between every campus." */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                One <span className="text-[#ff5722] inline-block relative">
                  bridge
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#ff5722]/40 rounded-full"></span>
                </span> between every campus.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Search colleges with a source on every fact. Join events at other campuses with a QR pass.
              </p>

              {/* 3-Dropdown Filter Box matching the design image */}
              <form 
                onSubmit={handleSearchSubmit}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3 max-w-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* City Select */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">CITY</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                    >
                      <option value="All">All Cities</option>
                      <option value="Ghaziabad">Ghaziabad</option>
                      <option value="Noida">Greater Noida</option>
                      <option value="Meerut">Meerut</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>

                  {/* Course Select */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">DEGREE / COURSE</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                    >
                      <option value="All">All Degrees</option>
                      <option value="Computer Science">B.Tech CSE</option>
                      <option value="Artificial Intelligence">AI & Machine Learning</option>
                      <option value="Information Technology">Information Tech</option>
                      <option value="Business">MBA Management</option>
                    </select>
                  </div>

                  {/* Max Fee Select */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">MAX FEE PER YEAR</label>
                    <select
                      value={selectedMaxFee}
                      onChange={(e) => setSelectedMaxFee(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-[#ff5722] focus:outline-none"
                    >
                      <option value="All">Any Budget</option>
                      <option value="100000">Under ₹1,00,000</option>
                      <option value="125000">Under ₹1,25,000</option>
                      <option value="150000">Under ₹1,50,000</option>
                    </select>
                  </div>
                </div>

                {/* Big Orange CTA Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#ff5722] hover:bg-[#ea580c] text-white font-bold text-sm transition shadow-lg shadow-[#ff5722]/30 flex items-center justify-center gap-2"
                >
                  <span>See {displayColleges.length} match results</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Action Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => onOpenSpatialNavigator?.()}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-[#ff5722]" />
                  <span>3D Earth Gateway</span>
                </button>

                <button
                  onClick={() => setActiveTab('notices')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <BellRing className="w-3.5 h-3.5 text-[#ff7043]" />
                  <span>Campus Bulletins</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>For Colleges</span>
                </button>

                <button
                  onClick={() => setActiveTab(isLoggedIn ? 'spatial' : 'auth')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#ff5722]/20 hover:bg-[#ff5722]/30 text-[#ff7043] border border-[#ff5722]/40 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {isLoggedIn ? (
                    <>
                      <Globe className="w-3.5 h-3.5 text-[#ff7043]" />
                      <span>3D Campus Map</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Student Sign Up</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right Column: Exact Bridge & Campus Buildings Artwork from Design Image */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <CampusBridgeGraphic variant="hero" className="w-full max-w-lg drop-shadow-[0_20px_50px_rgba(255,87,34,0.15)]" />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          3 CORE TRUST PILLARS (DIRECTLY FROM THE USER'S DESIGN IMAGE)
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5722]"></span>
              <span>A source on every fact</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Public mandatory disclosures verified on fees, accredited seats, and placement CTCs directly from college portals.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5722]"></span>
              <span>Clear rules about campus pass</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent lab permissions, cross-campus event access, and dean-approved student visitor authorization.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5722]"></span>
              <span>Passes that work once</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cryptographically signed single-entry QR scan passes that reject duplicates at the security gate.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          COLLEGES MATCH SEARCH RESULTS (FROM THE USER'S DESIGN IMAGE)
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[#ff5722] text-xs font-bold uppercase tracking-wider font-mono">COLLEGES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {displayColleges.length} colleges match your search.
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Sample results for demo; all data based on public disclosures / mandatory disclosures published by partner college official web pages.
          </p>
        </div>

        {/* 5 Colleges Grid Matching the Visual Cards in the Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayColleges.map((col) => {
            const firstCourse = col.courses[0];
            const isComparing = compareList.includes(col.id);

            return (
              <div
                key={col.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-[#ff5722]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition shadow-md group"
              >
                <div>
                  {/* Top Row: College Name & Type Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 
                        onClick={() => {
                          setSelectedCollegeId(col.id);
                          setActiveTab('college-detail');
                        }}
                        className="text-base font-black text-white group-hover:text-[#ff7043] cursor-pointer transition leading-snug"
                      >
                        {col.shortName || col.name}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#ff5722]" />
                        <span>{col.city}, India</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                      {col.accreditation?.split('&')[0] || 'AFFILIATED'}
                    </span>
                  </div>

                  {/* Fee Highlight */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">B.Tech CSE Fee</span>
                    <div className="text-xl font-black text-white mt-0.5">
                      ₹{firstCourse?.annualFee?.toLocaleString() || '1,10,000'} <span className="text-xs text-slate-400 font-normal">/ year</span>
                    </div>
                  </div>

                  {/* Verified Checklist */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Verified {firstCourse?.branch || 'CSE'} Branch curriculum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Placement data on official disclosure ({col.placementStats?.avgPackage || '₹6.8 LPA'} avg)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Source & Action Row */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                    <span className="text-emerald-400 font-semibold">● Verified</span> by official disclosure
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCompare(col.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                        isComparing 
                          ? 'bg-[#ff5722] text-white border-[#ff5722]' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      {isComparing ? 'Comparing' : 'Compare'}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCollegeId(col.id);
                        setActiveTab('college-detail');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#ff5722]/15 hover:bg-[#ff5722] text-[#ff7043] hover:text-white border border-[#ff5722]/30 text-[11px] font-bold transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          EVENTS & QR PASS SECTION (FROM THE USER'S DESIGN IMAGE)
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <span className="text-[#ff5722] text-xs font-bold uppercase tracking-wider font-mono">EVENTS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Register for an event, then try the pass.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Event List with Orange Register Buttons */}
          <div className="lg:col-span-7 space-y-3">
            {featuredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="text-[10px] font-mono text-[#ff5722] uppercase tracking-wider">
                    {evt.category} · {evt.hostCity}
                  </div>
                  <h4 
                    onClick={() => {
                      setSelectedEventId(evt.id);
                      setActiveTab('event-detail');
                    }}
                    className="text-base font-bold text-white hover:text-[#ff7043] cursor-pointer transition truncate"
                  >
                    {evt.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    Hosted by {evt.hostCollegeName}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedEventId(evt.id);
                    setActiveTab('event-detail');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#ff5722] hover:bg-[#ea580c] text-white text-xs font-bold shrink-0 shadow-md shadow-[#ff5722]/20 transition"
                >
                  Register
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: "YOUR EVENT PASS" Dark Mockup Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090d1a] border border-slate-800 flex flex-col justify-between min-h-[200px] shadow-2xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#ff5722] uppercase tracking-wider block">YOUR EVENT PASS</span>
              <h4 className="text-base font-bold text-white">Single-Use Entrance QR Pass</h4>
              <p className="text-xs text-slate-400">
                Register for any multi-campus hackathon to generate an instant digital security pass.
              </p>
            </div>

            <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-mono">STATUS</span>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Ready For Check-In
                </div>
                <div className="text-[11px] text-white font-medium">Valid at Meerut & Ghaziabad Gates</div>
              </div>

              <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10 text-slate-900" />
              </div>
            </div>

            <button
              onClick={() => setActiveTab('passes')}
              className="text-xs font-bold text-[#ff7043] hover:underline flex items-center gap-1 self-start"
            >
              <span>View My Passes in Student Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          STUDENT STAT CALLOUT: "[X] of [Y] students find it hard to compare..."
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-md">
            <span className="text-[#ff5722] text-xs font-bold uppercase tracking-wider font-mono">STUDENT CHALLENGE</span>
            <h3 className="text-2xl font-black text-white">
              87% of students find it hard to compare colleges and events across campuses.
            </h3>
          </div>
          <div className="text-xs text-slate-300 max-w-md leading-relaxed">
            CampusBridge replaces scattered brochures with verified mandatory public disclosures, transparent annual fees, and cross-campus laboratory sharing.
          </div>
        </div>
      </section>

      {/* ===================================================================
          SIGNATURE VIBRANT ORANGE BANNER (EXACTLY MATCHING THE USER'S DESIGN IMAGE)
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#ff5722] via-[#ff6433] to-[#f4511e] p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black/20 px-2.5 py-1 rounded-md text-white inline-block">
                FOR COLLEGES
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Publish an event once. <br />Reach every campus.
              </h2>

              <p className="text-sm sm:text-base text-orange-100 max-w-lg leading-relaxed">
                Invite students from other colleges and manage registrations. Check people in with QR scan and see real attendance in real-time.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-xl transition"
                >
                  Claim your college
                </button>

                <button
                  onClick={() => setActiveTab(isLoggedIn ? 'spatial' : 'auth')}
                  className="px-5 py-3 rounded-xl bg-transparent hover:bg-black/10 text-white font-bold text-xs border border-white/60 transition"
                >
                  {isLoggedIn ? 'Explore 3D Campus Corridor ➔' : 'Join the inter-campus network'}
                </button>
              </div>
            </div>

            {/* Right Card: Dark Box "FOR EVENT PARTNERS" */}
            <div className="lg:col-span-5 bg-[#090d1a] border border-black/40 rounded-2xl p-6 text-xs space-y-3.5 shadow-2xl">
              <span className="text-xs font-bold text-[#ff7043] uppercase tracking-wider block font-mono">
                FOR EVENT PARTNERS:
              </span>

              <div className="space-y-2.5 text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Verified event badge on college profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Easy single-use QR pass management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Instant sign-up, fast turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5722] shrink-0" />
                  <span>Free for non-registered external attendance</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Official institutional partnerships available for Western UP, Delhi NCR & Maharashtra.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================
          COMING NEXT ROADMAP (FROM THE USER'S DESIGN IMAGE)
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6 space-y-4">
        <div>
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">COMING NEXT</span>
          <p className="text-xs text-slate-400">Active development roadmap for cross-campus education.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <h5 className="text-xs font-bold text-white">Broader degree catalog</h5>
            <p className="text-[11px] text-slate-400">Medical, Pharmacy, Law and Polytechnic courses.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <h5 className="text-xs font-bold text-white">Partner web apps</h5>
            <p className="text-[11px] text-slate-400">Direct integration with existing college ERPs.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <h5 className="text-xs font-bold text-white">Flexible contracts</h5>
            <p className="text-[11px] text-slate-400">Custom inter-college MoUs and resource pooling.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1">
            <h5 className="text-xs font-bold text-white">Campus visit passes</h5>
            <p className="text-[11px] text-slate-400">Prospective student open-day campus passes.</p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SPATIAL 3D GATEWAY BANNER (TO ACCESS FULL-PAGE EARTH CORRIDOR)
          =================================================================== */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-[#ff5722]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-lg">
            <span className="text-[10px] font-bold text-[#ff5722] uppercase tracking-wider px-2 py-0.5 rounded bg-[#ff5722]/10 border border-[#ff5722]/20">
              3D Spatial Gateway Active
            </span>
            <h3 className="text-xl font-bold text-white">Explore from Earth down to Ghaziabad</h3>
            <p className="text-xs text-slate-300">
              Experience the full-page 3D globe navigator across 8 countries, Namo Bharat RRTS transit corridor, and make your own college page.
            </p>
          </div>

          <button
            onClick={() => onOpenSpatialNavigator?.()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ea580c] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#ff5722]/30 flex items-center gap-2 shrink-0 transition"
          >
            <Globe className="w-4 h-4" />
            <span>Launch Full-Page 3D Gateway</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
