import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  MapPin,
  Building2,
  Navigation,
  Compass,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Users,
  ShieldCheck,
  Plus,
  X,
  RotateCcw,
  GraduationCap,
  Clock,
  Zap,
  Award,
  Radio,
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function InteractiveSpatialNavigator({
  isOpen,
  onClose,
  onSelectCollege,
  onRegisterCollegeInCity,
  setActiveTab
}) {
  const { colleges, events, switchUser, registerNewCollege, showToast } = useApp();

  // Navigation Depth Levels: 'EARTH' | 'INDIA' | 'STATE' | 'CITY'
  const [zoomLevel, setZoomLevel] = useState('EARTH');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedCity, setSelectedCity] = useState('Ghaziabad');

  // Perspective Lens: 'student' | 'college'
  const [lensMode, setLensMode] = useState('student');

  // Quick "Make Your Own College Page in Ghaziabad" Modal inside Navigator
  const [showQuickCreateModal, setShowQuickCreateModal] = useState(false);
  const [quickColName, setQuickColName] = useState('Ghaziabad Institute of Advanced Technology');
  const [quickShortName, setQuickShortName] = useState('GIAT Ghaziabad');
  const [quickLocality, setQuickLocality] = useState('NH-24 Delhi-Meerut Expressway');
  const [quickAccreditation, setQuickAccreditation] = useState('NAAC A+ & NBA Approved');
  const [quickAnnualFee, setQuickAnnualFee] = useState('115000');
  const [quickAvgPkg, setQuickAvgPkg] = useState('₹7.2 LPA');
  const [quickAdminName, setQuickAdminName] = useState('Prof. Sudhir Sharma');
  const [quickAdminEmail, setQuickAdminEmail] = useState('dean@giatghaziabad.edu.in');

  if (!isOpen) return null;

  // Regional Geography Dataset
  const GEOGRAPHY_DATA = {
    India: {
      flag: "🇮🇳",
      tagline: "World's Largest Engineering & University Ecosystem",
      totalCollegesCount: colleges.length,
      states: [
        {
          name: "Uttar Pradesh",
          code: "UP",
          region: "Northern India & Western UP Corridor",
          activeHubs: ["Ghaziabad", "Greater Noida", "Meerut", "Lucknow"],
          stats: "4 Premier Campuses Active · 150+ Degree Programs",
          highlight: "Top Inter-Campus Innovation Corridor (Meerut - Ghaziabad - Noida)",
          priority: true
        },
        {
          name: "Delhi NCR",
          code: "DL",
          region: "National Capital Region",
          activeHubs: ["New Delhi", "Dwarka", "Bawana"],
          stats: "Premier Govt & Autonomous Universities (DTU, IIIT)",
          highlight: "Highest Research Output & Average Placement Packages",
          priority: false
        },
        {
          name: "Maharashtra",
          code: "MH",
          region: "Western Technical Hub",
          activeHubs: ["Pune", "Mumbai"],
          stats: "COEP Tech Pune & Historical Engineering Hubs",
          highlight: "Asia's Third Oldest Engineering Heritage",
          priority: false
        }
      ]
    }
  };

  // Cities per State
  const CITIES_DATA = {
    "Uttar Pradesh": [
      {
        name: "Ghaziabad",
        district: "Delhi-NCR / Western UP",
        tag: "NH-24 Industrial & Tech Education Cluster",
        collegesInCity: colleges.filter(c => c.city.toLowerCase().includes('ghaziabad')),
        perks: [
          "Direct RRTS & NH-24 connection to Delhi & Meerut",
          "Heavy Robotics & Industrial Manufacturing Labs",
          "Active Cross-Campus Hackathons & Placement Drives"
        ]
      },
      {
        name: "Greater Noida",
        district: "Gautam Buddha Nagar",
        tag: "Knowledge Park Academic Metropolis",
        collegesInCity: colleges.filter(c => c.city.toLowerCase().includes('noida')),
        perks: [
          "Apple iOS Academy & Mercedes Industrial Center",
          "Autonomous NIRF Top-Ranked Campuses",
          "High Tech Placement Averages (₹8.5+ LPA)"
        ]
      },
      {
        name: "Meerut",
        district: "Western Uttar Pradesh",
        tag: "Robotics, AI & Incubation Corridor",
        collegesInCity: colleges.filter(c => c.city.toLowerCase().includes('meerut')),
        perks: [
          "Flagship North India Hackathon Host (MITS Meerut)",
          "Tier-3 Supercomputing Research Labs",
          "Inter-Campus Student MoUs & Resource Sharing"
        ]
      }
    ],
    "Delhi NCR": [
      {
        name: "New Delhi",
        district: "National Capital",
        tag: "Tier-1 Premier Institutions",
        collegesInCity: colleges.filter(c => c.city.toLowerCase().includes('delhi')),
        perks: [
          "DTU Supercomputing Cluster",
          "Top Placement Tier (₹18.5 LPA Avg)",
          "Government Research Grants"
        ]
      }
    ],
    "Maharashtra": [
      {
        name: "Pune",
        district: "Oxford of the East",
        tag: "Historic & Modern Tech Hub",
        collegesInCity: colleges.filter(c => c.city.toLowerCase().includes('pune')),
        perks: [
          "Established 1854 Engineering Legacy",
          "COEPSAT Space Technology Lab",
          "Automotive & IT Hub"
        ]
      }
    ]
  };

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    setZoomLevel('CITY');
  };

  const currentCityColleges = colleges.filter(c => c.city.toLowerCase().includes(selectedCity.toLowerCase()));
  const currentCityEvents = events.filter(e => 
    e.hostCity?.toLowerCase().includes(selectedCity.toLowerCase()) || 
    e.targetColleges?.some(tc => tc.toLowerCase().includes(selectedCity.toLowerCase()))
  );

  // Handle Quick College Creation right inside Ghaziabad
  const handleQuickCreateCollege = (e) => {
    e.preventDefault();
    if (!quickColName.trim()) {
      showToast('Please enter your college name', 'error');
      return;
    }

    const created = registerNewCollege({
      college: {
        name: quickColName,
        shortName: quickShortName || quickColName,
        city: selectedCity,
        state: selectedState,
        address: `${quickLocality}, ${selectedCity}, ${selectedState}`,
        accreditation: quickAccreditation,
        defaultFee: parseInt(quickAnnualFee, 10) || 120000,
        avgPackage: quickAvgPkg,
        highestPackage: "₹34.0 LPA",
        about: `${quickColName} is an officially registered institution in ${selectedCity}, ${selectedState}, offering state-of-the-art engineering labs and participating in CampusBridge multi-campus events.`
      },
      admin: {
        name: quickAdminName,
        email: quickAdminEmail,
        designation: "College Dean / Inter-College Coordinator"
      }
    });

    setShowQuickCreateModal(false);
    onClose();
    if (created && created.college) {
      onSelectCollege(created.college.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#090d1a] border border-indigo-500/40 rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.25)] overflow-hidden my-auto flex flex-col max-h-[94vh]">
        
        {/* Top Floating Cyber Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40 shrink-0">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-white tracking-wide">CampusBridge Spatial Earth Gateway</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  Interactive 3D Radar
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Earth ➔ India 🇮🇳 ➔ Uttar Pradesh 📍 ➔ Ghaziabad 🏢 ➔ Student Choice & "Make Your Own Page"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset to Earth */}
            <button
              onClick={() => setZoomLevel('EARTH')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
              title="Reset Orbit to Outer Space Earth View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Orbit View</span>
            </button>

            {/* Skip to Dashboard / Close */}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-xs font-bold transition flex items-center gap-1"
              title="Close Gateway and Explore Platform"
            >
              <span className="hidden sm:inline">Explore Full Platform</span>
              <X className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Breadcrumbs Corridor */}
        <div className="bg-slate-900/90 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex items-center justify-between gap-3 text-xs overflow-x-auto text-slate-400">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setZoomLevel('EARTH')}
              className={`flex items-center gap-1.5 font-bold transition ${zoomLevel === 'EARTH' ? 'text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30' : 'hover:text-white'}`}
            >
              <span>🌍 Planet Earth</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

            <button
              onClick={() => setZoomLevel('INDIA')}
              className={`flex items-center gap-1.5 font-bold transition ${zoomLevel === 'INDIA' ? 'text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30' : 'hover:text-white'}`}
            >
              <span>🇮🇳 India</span>
            </button>

            {(zoomLevel === 'STATE' || zoomLevel === 'CITY') && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <button
                  onClick={() => setZoomLevel('STATE')}
                  className={`font-bold transition ${zoomLevel === 'STATE' ? 'text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30' : 'hover:text-white'}`}
                >
                  <span>📍 {selectedState}</span>
                </button>
              </>
            )}

            {zoomLevel === 'CITY' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span className="font-bold text-white bg-indigo-600/30 px-2 py-0.5 rounded border border-indigo-500/50 flex items-center gap-1">
                  🏢 {selectedCity} Hub
                </span>
              </>
            )}
          </div>

          {/* Perspective Lens Switcher (Idea Contribution) */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <span className="text-[10px] text-slate-400 px-1 font-mono uppercase">Lens:</span>
            <button
              onClick={() => setLensMode('student')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${lensMode === 'student' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Student</span>
            </button>
            <button
              onClick={() => setLensMode('college')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${lensMode === 'college' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-3 h-3" />
              <span>College Admin</span>
            </button>
          </div>
        </div>

        {/* Spatial Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* ===================================================================
              LEVEL 1: EARTH VIEW
              =================================================================== */}
          {zoomLevel === 'EARTH' && (
            <div className="space-y-8 text-center py-4">
              
              {/* Rotating Holographic Earth Visualization with India Pulsing Target */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
                {/* Orbital atmospheric glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600/35 via-purple-600/25 to-cyan-400/30 blur-2xl animate-pulse pointer-events-none"></div>
                
                {/* Outer Coordinate Ring */}
                <div className="absolute inset-[-12px] rounded-full border border-indigo-500/20 border-dashed animate-spin-slow pointer-events-none"></div>

                {/* Globe sphere */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-slate-950 via-indigo-950/80 to-[#050814] border-2 border-indigo-500/50 shadow-[inset_0_0_50px_rgba(99,102,241,0.4)] flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Continental Grid Mesh Lines */}
                  <div className="absolute inset-0 rounded-full border border-indigo-500/25 scale-90 pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-full border border-purple-500/20 scale-75 pointer-events-none"></div>
                  <div className="absolute w-full h-[1px] bg-indigo-500/30 top-1/2 pointer-events-none"></div>
                  <div className="absolute h-full w-[1px] bg-indigo-500/30 left-1/2 pointer-events-none"></div>
                  <div className="absolute w-full h-[1px] bg-indigo-500/20 top-1/4 pointer-events-none"></div>
                  <div className="absolute w-full h-[1px] bg-indigo-500/20 top-3/4 pointer-events-none"></div>

                  {/* Lat/Lon crosshair animation */}
                  <div className="absolute top-4 left-6 text-[9px] font-mono text-indigo-400/70 tracking-widest pointer-events-none">
                    ORBIT ALT: 640 KM
                  </div>
                  <div className="absolute top-4 right-6 text-[9px] font-mono text-cyan-400/70 tracking-widest pointer-events-none">
                    FOV: 120°
                  </div>

                  {/* Pulsing Hotspot for India (Clickable) */}
                  <div
                    onClick={() => setZoomLevel('INDIA')}
                    className="cursor-pointer group relative flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-indigo-950/85 border border-indigo-400 shadow-2xl hover:scale-115 transition duration-300 z-10"
                    title="Click to Zoom into India"
                  >
                    <span className="text-3xl sm:text-4xl group-hover:scale-110 transition">🇮🇳</span>
                    <span className="text-xs font-black text-white mt-1">India Hub</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      54+ Colleges Connected
                    </span>
                    <span className="text-[9px] text-indigo-300 underline mt-1 group-hover:text-white">
                      Click to Enter Corridor ➔
                    </span>
                  </div>

                  <div className="absolute bottom-3 text-[10px] text-slate-400 font-mono tracking-wider pointer-events-none">
                    RADAR: LAT 28.6139° N, LON 77.2090° E
                  </div>
                </div>
              </div>

              {/* Headline & Mission statement */}
              <div className="max-w-xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Choose Your Educational Jurisdiction & Campus Corridor</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Start from Earth ➔ Zoom into India & Your City
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {lensMode === 'student' ? (
                    <>As a <strong>Student</strong>, navigate to <strong>Uttar Pradesh ➔ Ghaziabad</strong> to discover colleges, transparent fees, inter-college hackathons, and single-pass lab permissions.</>
                  ) : (
                    <>As a <strong>College Representative</strong>, navigate to your city (Ghaziabad, Noida, Meerut) to <strong>make your own page</strong>, broadcast invitations, and verify external students.</>
                  )}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setZoomLevel('INDIA')}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition inline-flex items-center gap-2"
                  >
                    <span>Zoom In to India 🇮🇳</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedState('Uttar Pradesh');
                      setSelectedCity('Ghaziabad');
                      setZoomLevel('CITY');
                    }}
                    className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition inline-flex items-center gap-2"
                  >
                    <span>Direct Jump to Ghaziabad Hub 🏢</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                </div>
              </div>

              {/* Contributed Innovation Highlights Grid (Idea Contribution) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-4xl mx-auto text-left">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                    <Navigation className="w-4 h-4" />
                    <span>Namo Bharat RRTS Radar</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Live transit travel times: Meerut ➔ Ghaziabad in 22 mins, enabling cross-college attendance.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                    <span>Make Your Own Page</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    College administrators in Ghaziabad can claim or create custom verified portals in 60 seconds.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Shared Campus Labs</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Access high-end hardware, supercomputers, and robotics suites across Western UP institutions.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================
              LEVEL 2: INDIA LEVEL (SELECT STATE: UP, DELHI, MAHARASHTRA)
              =================================================================== */}
          {zoomLevel === 'INDIA' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Level 02: Country View</span>
                    <span className="text-xs text-slate-500">· 🇮🇳 Republic of India</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-0.5">Select Your State / Educational Zone</h2>
                  <p className="text-xs text-slate-400">
                    Select <strong>Uttar Pradesh (UP)</strong> to access the Ghaziabad, Greater Noida, and Meerut campus networks.
                  </p>
                </div>

                <button
                  onClick={() => setZoomLevel('EARTH')}
                  className="self-start text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to Earth Orbit</span>
                </button>
              </div>

              {/* State Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {GEOGRAPHY_DATA.India.states.map((st) => (
                  <div
                    key={st.name}
                    onClick={() => {
                      setSelectedState(st.name);
                      setZoomLevel('STATE');
                    }}
                    className={`glass-card p-6 rounded-2xl border cursor-pointer hover:scale-102 transition flex flex-col justify-between space-y-4 ${st.name === 'Uttar Pradesh' ? 'border-indigo-500/80 bg-indigo-950/30 shadow-xl ring-1 ring-indigo-500/50' : 'border-slate-800 hover:border-slate-700'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-bold text-white px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                          {st.code} State Hub
                        </span>
                        {st.name === 'Uttar Pradesh' && (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            ★ Primary Active Corridor
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-black text-white">{st.name}</h3>
                      <div className="text-xs text-indigo-300 font-semibold mt-0.5">{st.region}</div>
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{st.stats}</p>

                      <div className="mt-4 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Hubs: {st.activeHubs.join(', ')}</span>
                      </div>

                      <div className="mt-2 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-200">
                        {st.highlight}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400">
                      <span>Explore Cities in {st.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              LEVEL 3: STATE LEVEL (SELECT CITY: GHAZIABAD, NOIDA, MEERUT)
              =================================================================== */}
          {zoomLevel === 'STATE' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Level 03: State Clusters</span>
                    <span className="text-xs text-slate-500">· {selectedState}, India</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-0.5">Select a City / District in {selectedState}</h2>
                  <p className="text-xs text-slate-400">
                    Choose <strong>Ghaziabad</strong>, <strong>Greater Noida</strong>, or <strong>Meerut</strong> to view specific engineering institutes and resources.
                  </p>
                </div>

                <button
                  onClick={() => setZoomLevel('INDIA')}
                  className="self-start text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to States</span>
                </button>
              </div>

              {/* Transit Corridor Visualizer for UP (Contributed Idea) */}
              {selectedState === 'Uttar Pradesh' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/50 to-slate-900 border border-indigo-500/30 flex items-center justify-between flex-wrap gap-3 text-xs shadow-lg">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold">
                    <Navigation className="w-4 h-4 text-indigo-400 animate-pulse" />
                    <span>Namo Bharat RRTS & Expressway Corridor Transit:</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-white flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">Meerut (MITS)</span>
                    <span className="text-indigo-400 font-bold">⚡ 45km (22 mins) ➔</span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-600 font-black shadow-md border border-indigo-400">Ghaziabad (GEA)</span>
                    <span className="text-indigo-400 font-bold">⚡ 25km (18 mins) ➔</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">Greater Noida (NIET)</span>
                  </div>
                </div>
              )}

              {/* Cities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CITIES_DATA[selectedState]?.map((city) => (
                  <div
                    key={city.name}
                    onClick={() => handleCitySelect(city.name)}
                    className={`glass-card p-6 rounded-2xl border cursor-pointer hover:border-indigo-400 transition flex flex-col justify-between space-y-4 ${city.name === 'Ghaziabad' ? 'border-indigo-500/80 bg-indigo-950/30 ring-1 ring-indigo-500/50 shadow-xl' : 'border-slate-800 hover:border-slate-700'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                          {city.district}
                        </span>
                        <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {city.collegesInCity.length} College{city.collegesInCity.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white">{city.name}</h3>
                      <div className="text-xs text-indigo-300 font-semibold mt-0.5">{city.tag}</div>

                      <div className="mt-3.5 space-y-2">
                        {city.perks.map((p, idx) => (
                          <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 shrink-0"></span>
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400">
                      <span>Enter {city.name} Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              LEVEL 4: CITY LEVEL (GHAZIABAD) - DUAL PATHWAY: STUDENT VS COLLEGE
              =================================================================== */}
          {zoomLevel === 'CITY' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Level 04: Local Campus Hub</span>
                    <span className="text-xs text-slate-500">· {selectedState}, India</span>
                  </div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                    <span>Campuses in {selectedCity}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                      {currentCityColleges.length} Verified Institutions
                    </span>
                  </h2>
                </div>

                <button
                  onClick={() => setZoomLevel('STATE')}
                  className="self-start text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to Cities</span>
                </button>
              </div>

              {/* ACTION CALLOUT: Student Choice vs College Choice (The User's Core Vision!) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
                {/* Pathway A: As a Student */}
                <div className={`p-4 rounded-2xl border space-y-3 transition ${lensMode === 'student' ? 'bg-indigo-950/40 border-indigo-500/50' : 'bg-slate-950/50 border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wide">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      <span>Path 1: Are You a Student?</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      Student Access
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explore colleges in {selectedCity}, verify annual fee structures, view cross-college hackathons, or request access to high-end laboratory equipment with a digital pass.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setLensMode('student')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${lensMode === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
                    >
                      <span>Activate Student View</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        setActiveTab('explore');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                    >
                      Browse All Directory
                    </button>
                  </div>
                </div>

                {/* Pathway B: As a College Representative ("Make Your Own Page in Ghaziabad!") */}
                <div className={`p-4 rounded-2xl border space-y-3 transition ${lensMode === 'college' ? 'bg-purple-950/40 border-purple-500/50' : 'bg-slate-950/50 border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wide">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>Path 2: Are You a College Official?</span>
                    </div>
                    <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                      College Authority
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Is your institute located in {selectedCity}? Make your own custom college page, add your degree programs, broadcast event invitations, and manage external student access.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowQuickCreateModal(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Make Your College Page in {selectedCity}</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onRegisterCollegeInCity(selectedCity, selectedState);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                    >
                      Admin Studio
                    </button>
                  </div>
                </div>
              </div>

              {/* Verified Institutions in Selected City */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>Verified Institutions Located in {selectedCity}:</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Showing {currentCityColleges.length} Campus{currentCityColleges.length !== 1 ? 'es' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCityColleges.map((col) => (
                    <div
                      key={col.id}
                      className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 flex flex-col justify-between space-y-4 transition"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={col.logo}
                              alt={col.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-sm"
                            />
                            <div>
                              <h4 className="text-base font-bold text-white leading-tight">{col.name}</h4>
                              <div className="text-xs text-indigo-300 font-medium">{col.accreditation} · {col.city}</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                            Verified
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-2">
                          {col.about}
                        </p>

                        <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">CSE Annual Fee</span>
                            <strong className="text-white">₹{col.courses[0]?.annualFee?.toLocaleString()}/yr</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Avg Placement</span>
                            <strong className="text-emerald-400">{col.placementStats?.avgPackage}</strong>
                          </div>
                        </div>

                        {/* Facilities Chip */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {col.facilities?.slice(0, 2).map((fac, fIdx) => (
                            <span key={fIdx} className="text-[10px] text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                              ✓ {fac}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCollege(col.id);
                          }}
                          className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-md"
                        >
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>Explore as Student</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            onClose();
                            setActiveTab('admin');
                          }}
                          className="py-2 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 hover:text-white text-xs font-semibold border border-purple-500/40 transition flex items-center gap-1"
                          title="Manage Authority as Official"
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Manage Page</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* If no colleges in city */}
                {currentCityColleges.length === 0 && (
                  <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
                    <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
                    <h4 className="text-base font-bold text-white">No Registered Campuses in {selectedCity} Yet</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Be the pioneer to establish and claim an official college page in {selectedCity}!
                    </p>
                    <button
                      onClick={() => setShowQuickCreateModal(true)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg"
                    >
                      + Make Your College Page in {selectedCity}
                    </button>
                  </div>
                )}
              </div>

              {/* Shared Inter-College Events & Labs in Selected City (Contributed Idea) */}
              {currentCityEvents.length > 0 && (
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wide">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span>Upcoming Inter-College Events in {selectedCity} Hub:</span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        setActiveTab('events');
                      }}
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      View All Events ➔
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCityEvents.map(evt => (
                      <div key={evt.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                        <div className="font-bold text-white flex items-center justify-between">
                          <span className="truncate">{evt.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                            {evt.prizePool}
                          </span>
                        </div>
                        <div className="text-[11px] text-indigo-300">🏛️ {evt.hostCollegeName} · {evt.hostCity}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{evt.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer tip */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Spatial Gateway: Earth ➔ India ➔ UP ➔ Ghaziabad ➔ Discover & Make College Pages.</span>
          </div>

          <button
            onClick={onClose}
            className="text-indigo-400 hover:text-white font-semibold flex items-center gap-1 transition"
          >
            <span>Proceed to Full Site</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* ===================================================================
          QUICK "MAKE YOUR OWN COLLEGE PAGE" MODAL (INLINE BUILDER)
          =================================================================== */}
      {showQuickCreateModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-purple-500/50 rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Building2 className="w-5 h-5 text-purple-400" />
                <span>Make Your College Page in {selectedCity}</span>
              </div>
              <button
                onClick={() => setShowQuickCreateModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Register your institution in <strong>{selectedCity}, {selectedState}</strong>. Your custom college page will go live instantly on CampusBridge with your degree courses and event broadcasting privileges.
            </p>

            <form onSubmit={handleQuickCreateCollege} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Official College Name</label>
                <input
                  type="text"
                  required
                  value={quickColName}
                  onChange={(e) => setQuickColName(e.target.value)}
                  placeholder="e.g. Ghaziabad Institute of Advanced Technology"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Short Name / Code</label>
                  <input
                    type="text"
                    required
                    value={quickShortName}
                    onChange={(e) => setQuickShortName(e.target.value)}
                    placeholder="e.g. GIAT Ghaziabad"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Campus Locality</label>
                  <input
                    type="text"
                    value={quickLocality}
                    onChange={(e) => setQuickLocality(e.target.value)}
                    placeholder="e.g. NH-24 / Raj Nagar"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">B.Tech Annual Fee (₹)</label>
                  <input
                    type="number"
                    value={quickAnnualFee}
                    onChange={(e) => setQuickAnnualFee(e.target.value)}
                    placeholder="115000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Average Placement Package</label>
                  <input
                    type="text"
                    value={quickAvgPkg}
                    onChange={(e) => setQuickAvgPkg(e.target.value)}
                    placeholder="₹7.2 LPA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                  Designated College Admin Profile:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={quickAdminName}
                    onChange={(e) => setQuickAdminName(e.target.value)}
                    placeholder="Official Name"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-[11px]"
                  />
                  <input
                    type="email"
                    value={quickAdminEmail}
                    onChange={(e) => setQuickAdminEmail(e.target.value)}
                    placeholder="Official Email"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuickCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish & Open College Page</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
