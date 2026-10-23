import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  MapPin,
  Building2,
  Navigation,
  Compass,
  ArrowRight,
  ArrowLeft,
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
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export default function InteractiveSpatialNavigator({
  isOpen,
  onClose,
  onSelectCollege,
  onRegisterCollegeInCity,
  setActiveTab
}) {
  const { colleges, events, switchUser, registerNewCollege, showToast } = useApp();

  // Navigation Depth Levels: 'EARTH' | 'COUNTRY' | 'STATE' | 'CITY'
  const [zoomLevel, setZoomLevel] = useState('EARTH');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedCity, setSelectedCity] = useState('Ghaziabad');

  // Country Region Filter in Earth View
  const [countryFilter, setCountryFilter] = useState('ALL'); // 'ALL' | 'ASIA' | 'NORTH_AMERICA' | 'EUROPE' | 'OCEANIA'

  // Perspective Lens: 'student' | 'college'
  const [lensMode, setLensMode] = useState('student');

  // Attractive Zoom / Radar Hyperspace Warp Animation State
  const [isWarping, setIsWarping] = useState(false);
  const [warpTargetName, setWarpTargetName] = useState('India');
  const [warpTargetCoords, setWarpTargetCoords] = useState('28.6139° N, 77.2090° E');

  // Quick "Make Your Own College Page" Modal
  const [showQuickCreateModal, setShowQuickCreateModal] = useState(false);
  const [quickColName, setQuickColName] = useState('Ghaziabad Institute of Advanced Technology');
  const [quickShortName, setQuickShortName] = useState('GIAT Ghaziabad');
  const [quickLocality, setQuickLocality] = useState('NH-24 Delhi-Meerut Expressway');
  const [quickAccreditation, setQuickAccreditation] = useState('NAAC A+ & NBA Approved');
  const [quickAnnualFee, setQuickAnnualFee] = useState('115000');
  const [quickAvgPkg, setQuickAvgPkg] = useState('₹7.2 LPA');
  const [quickAdminName, setQuickAdminName] = useState('Prof. S. Verma');
  const [quickAdminEmail, setQuickAdminEmail] = useState('dean@giatghaziabad.edu.in');

  if (isOpen === false) return null;

  // =========================================================================
  // GLOBAL EDUCATIONAL GEOGRAPHY (ALL MAJOR COUNTRIES AS REQUESTED!)
  // =========================================================================
  const GLOBAL_COUNTRIES = [
    {
      id: "in",
      name: "India",
      flag: "🇮🇳",
      continent: "ASIA",
      tagline: "World's Largest Engineering & University Ecosystem",
      activeCampuses: 54,
      latLon: "28.6139° N, 77.2090° E",
      flagship: true,
      states: [
        {
          name: "Uttar Pradesh",
          code: "UP",
          region: "Western UP & NCR Innovation Hub",
          tagline: "Flagship Inter-Campus Innovation Corridor",
          priority: true,
          cities: [
            {
              name: "Ghaziabad",
              district: "Delhi-NCR / Western UP",
              tag: "NH-24 Industrial & Tech Corridor",
              perks: [
                "Direct Namo Bharat RRTS high-speed transit to Meerut & Delhi",
                "Advanced Robotics, AI & Manufacturing Research Labs",
                "Cross-Campus Hackathons & Joint Placement Drives"
              ]
            },
            {
              name: "Greater Noida",
              district: "Gautam Buddha Nagar",
              tag: "Knowledge Park Academic Metropolis",
              perks: [
                "Apple iOS Academy & Mercedes Industrial Labs",
                "NIRF Top-Ranked Autonomous Institutions",
                "Tier-1 IT Placements (Avg ₹8.5+ LPA)"
              ]
            },
            {
              name: "Meerut",
              district: "Western UP Hub",
              tag: "Robotics & Incubation Hub",
              perks: [
                "Flagship North India Hackathon Host (MITS Meerut)",
                "Tier-3 Supercomputing & AI Compute Clusters",
                "Inter-Campus Student MoUs & Lab Passes"
              ]
            }
          ]
        },
        {
          name: "Delhi NCR",
          code: "DL",
          region: "National Capital Region",
          tagline: "Premier Govt & Autonomous Institutions",
          priority: false,
          cities: [
            {
              name: "New Delhi",
              district: "National Capital",
              tag: "Tier-1 Premier Institutions",
              perks: [
                "DTU Supercomputing Cluster",
                "High Placement Package Averages (₹18.5 LPA)",
                "Govt Technology Incubation Grants"
              ]
            }
          ]
        },
        {
          name: "Maharashtra",
          code: "MH",
          region: "Western Technical Hub",
          tagline: "Historic & Modern Tech Hubs",
          priority: false,
          cities: [
            {
              name: "Pune",
              district: "Oxford of the East",
              tag: "Automotive & IT Hub",
              perks: [
                "Established 1854 Engineering Legacy",
                "COEPSAT Space Technology Lab",
                "Automotive & IT Industry MoUs"
              ]
            }
          ]
        },
        {
          name: "Karnataka",
          code: "KA",
          region: "Silicon Valley of India",
          tagline: "Unicorn Startups & Deep-Tech Clusters",
          priority: false,
          cities: [
            {
              name: "Bengaluru",
              district: "Electronic City & Whitefield",
              tag: "Startup & AI Metropolis",
              perks: [
                "India's Unicorn Startup Capital",
                "Aerospace & AI Research Centers",
                "Global R&D Corporate Labs"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "us",
      name: "United States",
      flag: "🇺🇸",
      continent: "NORTH_AMERICA",
      tagline: "Silicon Valley & Global Research Corridor",
      activeCampuses: 28,
      latLon: "37.7749° N, 122.4194° W",
      flagship: false,
      states: [
        {
          name: "California",
          code: "CA",
          region: "Silicon Valley & Bay Area",
          tagline: "Venture Capital & AI Hub",
          priority: true,
          cities: [
            {
              name: "San Francisco / Silicon Valley",
              district: "Bay Area",
              tag: "Global Tech Innovation Capital",
              perks: [
                "Generative AI & LLM Engineering Hub",
                "Stanford & Berkeley Academic Network",
                "International Tech Hackathons"
              ]
            }
          ]
        },
        {
          name: "Massachusetts",
          code: "MA",
          region: "Cambridge Biotech & Robotics Corridor",
          tagline: "World Premier Science & AI District",
          priority: false,
          cities: [
            {
              name: "Boston / Cambridge",
              district: "Kendall Square",
              tag: "Deep-Tech & Robotics Metropolis",
              perks: [
                "MIT & Harvard Innovation Ecosystem",
                "Autonomous Robotics Research Labs",
                "Global Biotech Incubators"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "uk",
      name: "United Kingdom",
      flag: "🇬🇧",
      continent: "EUROPE",
      tagline: "Golden Research Triangle & FinTech Innovation",
      activeCampuses: 18,
      latLon: "51.5074° N, 0.1278° W",
      flagship: false,
      states: [
        {
          name: "England",
          code: "ENG",
          region: "London & Silicon Fen",
          tagline: "Centuries of Academic & Tech Leadership",
          priority: true,
          cities: [
            {
              name: "London",
              district: "Tech City / Silicon Roundabout",
              tag: "Global FinTech & AI Gateway",
              perks: [
                "Imperial College & UCL Innovation Hub",
                "Global Financial Tech Labs",
                "Pan-European Student Hackathon League"
              ]
            },
            {
              name: "Oxford & Cambridge",
              district: "Oxbridge Triangle",
              tag: "Deep Science Spin-outs",
              perks: [
                "Quantum Computing Clusters",
                "Inter-University Collaborative Colloquiums",
                "Advanced AI Research Fellowships"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "de",
      name: "Germany",
      flag: "🇩🇪",
      continent: "EUROPE",
      tagline: "Industry 4.0, Precision Engineering & TU9",
      activeCampuses: 16,
      latLon: "48.1351° N, 11.5820° E",
      flagship: false,
      states: [
        {
          name: "Bavaria",
          code: "BY",
          region: "Munich Technical Hub",
          tagline: "TUM & Automotive Powerhouse",
          priority: true,
          cities: [
            {
              name: "Munich",
              district: "Garching Tech Campus",
              tag: "Automotive & Quantum Corridor",
              perks: [
                "BMW & Siemens Advanced Research Clusters",
                "Industry 4.0 Smart Manufacturing Labs",
                "EU Cross-Campus Student Pass Network"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sg",
      name: "Singapore",
      flag: "🇸🇬",
      continent: "ASIA",
      tagline: "Smart Nation & Southeast Asian AI Gateway",
      activeCampuses: 12,
      latLon: "1.3521° N, 103.8198° E",
      flagship: false,
      states: [
        {
          name: "Central & West",
          code: "SG",
          region: "One-North & Kent Ridge",
          tagline: "NUS & NTU Global AI Corridor",
          priority: true,
          cities: [
            {
              name: "Kent Ridge & Jurong",
              district: "One-North Innovation Park",
              tag: "Asian FinTech & Deep-Tech Hub",
              perks: [
                "Biopolis & Fusionopolis R&D Clusters",
                "ASEAN Inter-University Hackathons",
                "Global Dual-Degree Research Fellowships"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ca",
      name: "Canada",
      flag: "🇨🇦",
      continent: "NORTH_AMERICA",
      tagline: "Quantum Valley & Northern AI Corridor",
      activeCampuses: 14,
      latLon: "43.6532° N, 79.3832° W",
      flagship: false,
      states: [
        {
          name: "Ontario",
          code: "ON",
          region: "Toronto-Waterloo Corridor",
          tagline: "Silicon Valley of the North",
          priority: true,
          cities: [
            {
              name: "Toronto / Waterloo",
              district: "Waterloo Quantum Valley",
              tag: "Quantum Computing & AI Hub",
              perks: [
                "Vector Institute for Artificial Intelligence",
                "Premier Co-op Placement Ecosystem",
                "Cross-Border Student Research Projects"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "jp",
      name: "Japan",
      flag: "🇯🇵",
      continent: "ASIA",
      tagline: "Robotics, High-Speed Transit & Supercomputing",
      activeCampuses: 10,
      latLon: "35.6762° N, 139.6503° E",
      flagship: false,
      states: [
        {
          name: "Kanto",
          code: "KT",
          region: "Greater Tokyo Metropolis",
          tagline: "Robotics & Quantum Hardware",
          priority: true,
          cities: [
            {
              name: "Tokyo",
              district: "Oookayama / Hongo",
              tag: "Humanoid Robotics & Supercomputing",
              perks: [
                "Fugaku Supercomputing Network Access",
                "Humanoid Robotics & Mechatronics Labs",
                "Shinkansen High-Speed Campus Transit"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "au",
      name: "Australia",
      flag: "🇦🇺",
      continent: "OCEANIA",
      tagline: "Group of Eight & Pacific Tech Network",
      activeCampuses: 12,
      latLon: "37.8136° S, 144.9631° E",
      flagship: false,
      states: [
        {
          name: "Victoria",
          code: "VIC",
          region: "Melbourne Academic Precinct",
          tagline: "Biomedical & Quantum Innovation",
          priority: true,
          cities: [
            {
              name: "Melbourne",
              district: "Parkville Innovation Precinct",
              tag: "Pacific Tech & Research Hub",
              perks: [
                "World Top-50 Engineering Faculties",
                "Asia-Pacific Inter-Collegiate Hackathons",
                "High Tech Incubator Ecosystem"
              ]
            }
          ]
        }
      ]
    }
  ];

  // Current active country object
  const currentCountryObj = GLOBAL_COUNTRIES.find(c => c.name.toLowerCase() === selectedCountry.toLowerCase()) || GLOBAL_COUNTRIES[0];
  
  // Current active state object
  const currentStateObj = currentCountryObj.states.find(s => s.name.toLowerCase() === selectedState.toLowerCase()) || currentCountryObj.states[0];

  // Colleges matching selected city
  const currentCityColleges = colleges.filter(c => 
    c.city.toLowerCase().includes(selectedCity.toLowerCase()) || 
    (selectedCountry !== 'India' && c.country?.toLowerCase() === selectedCountry.toLowerCase())
  );

  // Events matching selected city
  const currentCityEvents = events.filter(e => 
    e.hostCity?.toLowerCase().includes(selectedCity.toLowerCase()) ||
    e.targetColleges?.some(tc => tc.toLowerCase().includes(selectedCity.toLowerCase()))
  );

  // Filtered countries for the Earth selector
  const filteredCountries = countryFilter === 'ALL' 
    ? GLOBAL_COUNTRIES 
    : GLOBAL_COUNTRIES.filter(c => c.continent === countryFilter);

  // Trigger Attractive Warp Zoom Animation
  const handleSelectCountryWithWarp = (countryObj) => {
    setWarpTargetName(countryObj.name);
    setWarpTargetCoords(countryObj.latLon);
    setIsWarping(true);

    setTimeout(() => {
      setSelectedCountry(countryObj.name);
      if (countryObj.states.length > 0) {
        setSelectedState(countryObj.states[0].name);
        if (countryObj.states[0].cities.length > 0) {
          setSelectedCity(countryObj.states[0].cities[0].name);
        }
      }
      setIsWarping(false);
      setZoomLevel('COUNTRY');
    }, 650);
  };

  // Handle Quick College Creation right inside City View
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
        country: selectedCountry,
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

  const handleExitToDashboard = () => {
    if (onClose) onClose();
    if (setActiveTab) setActiveTab('home');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#070b14] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background warm coral ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff5722]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#ff7043]/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative w-full flex flex-col flex-1">
        
        {/* ===================================================================
            ATTRACTIVE HYPERSPACE / RADAR WARP ANIMATION OVERLAY
            =================================================================== */}
        {isWarping && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-xl animate-fade-in text-center p-6 pointer-events-none">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
              {/* Radial shockwave ripples */}
              <div className="absolute inset-0 rounded-full border-2 border-[#ff5722] animate-ping opacity-60"></div>
              <div className="absolute inset-4 rounded-full border border-orange-400 animate-ping opacity-40 delay-150"></div>
              <div className="absolute inset-8 rounded-full border-2 border-cyan-400 animate-spin-slow"></div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#ff5722] via-[#ff7043] to-amber-500 flex items-center justify-center text-4xl shadow-[0_0_60px_rgba(255,87,34,0.8)] animate-pulse">
                🌐
              </div>
            </div>

            <div className="mt-6 space-y-2 max-w-md animate-warp-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/20 border border-[#ff5722] text-[#ff7043] font-mono text-xs uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Radar Lock: {warpTargetName}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Warping Coordinates ➔ {warpTargetName}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                RADAR: {warpTargetCoords} · ALTITUDE: 10,000 KM ➔ 100 KM
              </p>
              <div className="text-[11px] text-[#ff7043] font-semibold flex items-center justify-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Establishing Inter-Campus Virtual Bridge Link...</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Header Ribbon */}
        <div className="w-full p-4 sm:px-8 sm:py-4 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff5722] via-[#ff7043] to-orange-600 flex items-center justify-center text-white shadow-lg shadow-[#ff5722]/40 shrink-0">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-black text-white tracking-wide">CampusBridge Full-Page Spatial Gateway</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5722]/20 text-[#ff7043] border border-[#ff5722]/40">
                  Global Campus Radar
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-lg">
                Earth ➔ Any Country ➔ State Corridor ➔ City Hub ➔ Student Discovery & College Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset to Earth */}
            <button
              onClick={() => setZoomLevel('EARTH')}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
              title="Reset Orbit to Outer Space Earth View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Earth Orbit</span>
            </button>

            {/* Switch to Full Dashboard */}
            <button
              onClick={handleExitToDashboard}
              className="px-3.5 py-1.5 rounded-xl bg-[#ff5722] hover:bg-[#ea580c] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#ff5722]/30"
              title="Open CampusBridge Full Platform Dashboard"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explore Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clickable Breadcrumbs Corridor */}
        <div className="bg-slate-900/90 px-4 sm:px-6 py-2 border-b border-slate-800 flex items-center justify-between gap-2 text-xs overflow-x-auto text-slate-400">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setZoomLevel('EARTH')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold transition ${zoomLevel === 'EARTH' ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/30' : 'hover:text-white'}`}
            >
              <span>🌍 Earth</span>
            </button>

            {zoomLevel !== 'EARTH' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <button
                  onClick={() => setZoomLevel('COUNTRY')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold transition ${zoomLevel === 'COUNTRY' ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/30' : 'hover:text-white'}`}
                >
                  <span>{currentCountryObj.flag} {currentCountryObj.name}</span>
                </button>
              </>
            )}

            {(zoomLevel === 'STATE' || zoomLevel === 'CITY') && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <button
                  onClick={() => setZoomLevel('STATE')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold transition ${zoomLevel === 'STATE' ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/30' : 'hover:text-white'}`}
                >
                  <span>📍 {selectedState}</span>
                </button>
              </>
            )}

            {zoomLevel === 'CITY' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="font-bold text-white bg-indigo-600/30 px-2 py-0.5 rounded border border-indigo-500/50">
                  🏢 {selectedCity} Hub
                </span>
              </>
            )}
          </div>

          {/* Perspective Lens Toggle */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
            <button
              onClick={() => setLensMode('student')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${lensMode === 'student' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Student</span>
            </button>
            <button
              onClick={() => setLensMode('college')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${lensMode === 'college' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-3 h-3" />
              <span>College Admin</span>
            </button>
          </div>
        </div>

        {/* Spatial Content Body (Full-Page Responsive Container) */}
        <div className="container mx-auto px-4 sm:px-8 py-6 max-w-7xl flex-1 flex flex-col justify-center space-y-6">
          
          {/* ===================================================================
              LEVEL 1: EARTH VIEW (GLOBAL COUNTRIES SELECTOR)
              =================================================================== */}
          {zoomLevel === 'EARTH' && (
            <div className="space-y-6 text-center py-2 animate-fade-in">
              
              {/* Rotating 3D Globe with Telemetry */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
                {/* Orbital atmospheric glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff5722]/35 via-orange-600/25 to-amber-400/30 blur-3xl animate-pulse pointer-events-none"></div>
                
                {/* Outer Dashed Orbit Ring */}
                <div className="absolute inset-[-14px] rounded-full border border-[#ff5722]/25 border-dashed animate-spin-slow pointer-events-none"></div>

                {/* Globe Sphere */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-[#070b14] border-2 border-[#ff5722]/50 shadow-[inset_0_0_50px_rgba(255,87,34,0.35)] flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Continental Grid Mesh Lines */}
                  <div className="absolute inset-0 rounded-full border border-[#ff5722]/20 scale-90 pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-full border border-orange-500/15 scale-75 pointer-events-none"></div>
                  <div className="absolute w-full h-[1px] bg-[#ff5722]/25 top-1/2 pointer-events-none"></div>
                  <div className="absolute h-full w-[1px] bg-indigo-500/25 left-1/2 pointer-events-none"></div>

                  {/* Pulsing Hotspot for India (Flagship Hub) */}
                  <div
                    onClick={() => handleSelectCountryWithWarp(GLOBAL_COUNTRIES[0])}
                    className="cursor-pointer group relative flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-indigo-950/90 border border-indigo-400 shadow-xl hover:scale-115 transition duration-300 z-10"
                    title="Click for Hyperspace Zoom into India Hub"
                  >
                    <span className="text-2xl sm:text-3xl">🇮🇳</span>
                    <span className="text-[11px] font-black text-white mt-0.5">India Hub</span>
                    <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      54+ Colleges
                    </span>
                    <span className="text-[9px] text-indigo-300 underline mt-0.5 group-hover:text-white">
                      Click to Enter ➔
                    </span>
                  </div>

                  <div className="absolute bottom-2 text-[9px] text-slate-500 font-mono tracking-wider pointer-events-none">
                    ORBIT RADAR: 8 GLOBAL HUBS
                  </div>
                </div>
              </div>

              {/* Headline */}
              <div className="max-w-lg mx-auto space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Select Any Country on Earth to Explore or Build Campuses
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Click on <strong>India 🇮🇳</strong> to enter the Western UP (Ghaziabad, Greater Noida, Meerut) corridor, or choose any other country worldwide.
                </p>
              </div>

              {/* Continent Filter Chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                {[
                  { id: 'ALL', label: 'All Countries (8)' },
                  { id: 'ASIA', label: 'Asia (3)' },
                  { id: 'NORTH_AMERICA', label: 'North America (2)' },
                  { id: 'EUROPE', label: 'Europe (2)' },
                  { id: 'OCEANIA', label: 'Oceania (1)' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCountryFilter(f.id)}
                    className={`px-3 py-1 rounded-xl font-semibold transition text-[11px] ${countryFilter === f.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Compact, De-congested Countries Grid (All Countries Available!) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-4xl mx-auto text-left">
                {filteredCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => handleSelectCountryWithWarp(country)}
                    className={`p-3.5 rounded-2xl border cursor-pointer hover:border-indigo-400 hover:scale-102 transition flex flex-col justify-between space-y-2 group ${country.flagship ? 'bg-indigo-950/30 border-indigo-500/60 shadow-lg ring-1 ring-indigo-500/40' : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl group-hover:scale-110 transition">{country.flag}</span>
                        {country.flagship ? (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            ★ Primary Hub
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {country.activeCampuses} Campuses
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-black text-white mt-1.5">{country.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{country.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-indigo-400 group-hover:text-indigo-300">
                      <span>Explore Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================
              LEVEL 2: COUNTRY VIEW (STATES & CORRIDORS)
              =================================================================== */}
          {zoomLevel === 'COUNTRY' && (
            <div className="space-y-5 animate-fade-in">
              {/* Back button & Country Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setZoomLevel('EARTH')}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
                    title="Return to Earth View"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Earth</span>
                  </button>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <span>{currentCountryObj.flag} {currentCountryObj.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        {currentCountryObj.states.length} State Corridors
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">{currentCountryObj.tagline}</p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
                  RADAR: {currentCountryObj.latLon}
                </span>
              </div>

              {/* State Corridors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {currentCountryObj.states.map((st) => (
                  <div
                    key={st.name}
                    onClick={() => {
                      setSelectedState(st.name);
                      if (st.cities.length > 0) setSelectedCity(st.cities[0].name);
                      setZoomLevel('STATE');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer hover:border-indigo-400 hover:scale-101 transition flex flex-col justify-between space-y-3 ${st.priority ? 'bg-indigo-950/30 border-indigo-500/70 shadow-lg ring-1 ring-indigo-500/40' : 'bg-slate-900/60 border-slate-800'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                          {st.code} State Hub
                        </span>
                        {st.priority && (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                            ★ Primary Corridor
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black text-white">{st.name}</h3>
                      <div className="text-xs text-indigo-300 font-semibold">{st.region}</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{st.tagline}</p>

                      <div className="mt-3 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[10px] text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>Cities: {st.cities.map(c => c.name).join(', ')}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400">
                      <span>Explore {st.cities.length} Cities</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              LEVEL 3: STATE LEVEL (WITH EXPLICIT "CAMPUSBRIDGE" VISUAL BRIDGE!)
              =================================================================== */}
          {zoomLevel === 'STATE' && (
            <div className="space-y-5 animate-fade-in">
              {/* Back Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setZoomLevel('COUNTRY')}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
                    title={`Back to ${currentCountryObj.name}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to {currentCountryObj.name}</span>
                  </button>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <span>📍 {currentStateObj.name}</span>
                      <span className="text-xs text-slate-400 font-normal">· {currentCountryObj.name}</span>
                    </h2>
                    <p className="text-xs text-slate-400">Select a city hub like <strong>Ghaziabad</strong> to view campus networks or make a college page.</p>
                  </div>
                </div>

                <button
                  onClick={() => setZoomLevel('EARTH')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 self-start sm:self-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Earth Orbit</span>
                </button>
              </div>

              {/* ===================================================================
                  THE "CAMPUSBRIDGE" VIRTUAL BRIDGE INFRASTRUCTURE VISUALIZER
                  (Directly Reflecting the User's Vision & Project Name!)
                  =================================================================== */}
              {selectedCountry === 'India' && selectedState === 'Uttar Pradesh' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/70 to-purple-950/70 border border-indigo-500/40 relative overflow-hidden shadow-xl">
                  {/* Glowing Energy Beam Moving Across Bridge Deck */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bridge-beam"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sm shadow-sm">
                        🌉
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                          <span>CampusBridge Regional Inter-College Highway</span>
                          <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-mono border border-indigo-500/30">
                            VIRTUAL BRIDGE ACTIVE
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Rapid Namo Bharat RRTS & Expressway Link: Sharing Hackathons, Labs & Pool Placements
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start sm:self-auto">
                      ⚡ Active Inter-Campus MoU Link
                    </span>
                  </div>

                  {/* Bridge Arch Graphic connecting the 3 Key Hubs */}
                  <div className="relative py-2 px-3">
                    {/* Bridge Suspension Line */}
                    <div className="absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-slate-800 rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent w-2/5 animate-bridge-beam rounded-full"></div>
                    </div>

                    {/* Bridge Nodes */}
                    <div className="relative flex items-center justify-between z-10">
                      {/* Node 1: Meerut */}
                      <button
                        onClick={() => { setSelectedCity('Meerut'); setZoomLevel('CITY'); }}
                        className="flex flex-col items-center group cursor-pointer text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:scale-110 group-hover:border-cyan-400 transition flex items-center justify-center text-xs shadow-md">
                          🏛️
                        </div>
                        <span className="text-[11px] font-bold text-white mt-1 group-hover:text-indigo-300">Meerut (MITS)</span>
                        <span className="text-[9px] text-slate-400">Incubation Node</span>
                      </button>

                      {/* Bridge Span 1 */}
                      <div className="text-[10px] font-mono text-indigo-300 bg-slate-950/90 px-2 py-0.5 rounded border border-indigo-500/30 shadow-sm flex items-center gap-1">
                        <span>⚡ 45 km</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-emerald-400 font-bold">22 mins</span>
                      </div>

                      {/* Node 2: Ghaziabad (Active Focal Hub) */}
                      <button
                        onClick={() => { setSelectedCity('Ghaziabad'); setZoomLevel('CITY'); }}
                        className="flex flex-col items-center group cursor-pointer text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-indigo-300 group-hover:scale-110 transition flex items-center justify-center text-sm shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                          🏢
                        </div>
                        <span className="text-[11px] font-black text-indigo-200 mt-1 group-hover:text-white">Ghaziabad (GEA)</span>
                        <span className="text-[9px] text-emerald-400 font-bold">★ Central Node</span>
                      </button>

                      {/* Bridge Span 2 */}
                      <div className="text-[10px] font-mono text-purple-300 bg-slate-950/90 px-2 py-0.5 rounded border border-purple-500/30 shadow-sm flex items-center gap-1">
                        <span>⚡ 25 km</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-emerald-400 font-bold">18 mins</span>
                      </div>

                      {/* Node 3: Greater Noida */}
                      <button
                        onClick={() => { setSelectedCity('Greater Noida'); setZoomLevel('CITY'); }}
                        className="flex flex-col items-center group cursor-pointer text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-purple-500 group-hover:scale-110 group-hover:border-purple-300 transition flex items-center justify-center text-xs shadow-md">
                          🎓
                        </div>
                        <span className="text-[11px] font-bold text-white mt-1 group-hover:text-purple-300">Gr. Noida (NIET)</span>
                        <span className="text-[9px] text-slate-400">Knowledge Park</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Cities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {currentStateObj.cities.map((city) => (
                  <div
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setZoomLevel('CITY');
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer hover:border-indigo-400 transition flex flex-col justify-between space-y-3 ${city.name === 'Ghaziabad' ? 'bg-indigo-950/30 border-indigo-500/80 ring-1 ring-indigo-500/40 shadow-xl' : 'bg-slate-900/60 border-slate-800'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">
                          {city.district}
                        </span>
                        {city.name === 'Ghaziabad' && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            ★ Primary Hub
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-white">{city.name}</h3>
                      <div className="text-xs text-indigo-300 font-medium">{city.tag}</div>

                      <div className="mt-2.5 space-y-1">
                        {city.perks.slice(0, 2).map((p, idx) => (
                          <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 shrink-0"></span>
                            <span className="line-clamp-1">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400">
                      <span>Enter {city.name} Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              LEVEL 4: CITY LEVEL (GHAZIABAD OR ANY CITY) - DUAL PATHWAY & QUICK BUILDER
              =================================================================== */}
          {zoomLevel === 'CITY' && (
            <div className="space-y-5 animate-fade-in">
              {/* Back Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setZoomLevel('STATE')}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
                    title={`Back to ${selectedState}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to {selectedState}</span>
                  </button>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <span>🏢 {selectedCity} Campus Hub</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                        {currentCityColleges.length} Verified
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">{selectedState}, {selectedCountry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => setZoomLevel('COUNTRY')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
                  >
                    <span>{currentCountryObj.name}</span>
                  </button>
                  <button
                    onClick={() => setZoomLevel('EARTH')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
                  >
                    <span>Earth Orbit</span>
                  </button>
                </div>
              </div>

              {/* DUAL PATHWAY: As a Student vs As a College (De-congested & Sharp!) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Pathway A: As a Student */}
                <div className={`p-4 rounded-2xl border space-y-2 transition ${lensMode === 'student' ? 'bg-indigo-950/40 border-indigo-500/50' : 'bg-slate-950/50 border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wide">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      <span>Are You a Student?</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      Student Access
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explore colleges in {selectedCity}, verify fee structures, view cross-college hackathons, or request access to high-end labs.
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => setLensMode('student')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${lensMode === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'}`}
                    >
                      Student Lens Active
                    </button>
                    <button
                      onClick={() => { onClose(); setActiveTab('explore'); }}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
                    >
                      Full Directory ➔
                    </button>
                  </div>
                </div>

                {/* Pathway B: As a College ("Make Your Own Page") */}
                <div className={`p-4 rounded-2xl border space-y-2 transition ${lensMode === 'college' ? 'bg-purple-950/40 border-purple-500/50' : 'bg-slate-950/50 border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wide">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>Are You a College Official?</span>
                    </div>
                    <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                      Make Your Page
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Make your own college page in {selectedCity}, add degree programs, broadcast event circulars, and approve external student passes.
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowQuickCreateModal(true)}
                      className="px-3.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Make College Page in {selectedCity}</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onRegisterCollegeInCity(selectedCity, selectedState);
                      }}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
                    >
                      Admin Studio
                    </button>
                  </div>
                </div>
              </div>

              {/* Verified Institutions in Selected City (De-congested Cards) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <h3 className="font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>Institutions in {selectedCity} ({currentCityColleges.length}):</span>
                  </h3>
                  <span className="text-slate-400 font-mono">Verified Infrastructure</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentCityColleges.map((col) => (
                    <div
                      key={col.id}
                      className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={col.logo}
                              alt={col.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-white leading-tight">{col.name}</h4>
                              <div className="text-[11px] text-indigo-300 font-medium">{col.accreditation} · {col.city}</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                            Verified
                          </span>
                        </div>

                        {/* Clean Data Badges (No congestion!) */}
                        <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                          <div>
                            <span className="text-[9px] text-slate-400 block">CSE Annual Fee</span>
                            <strong className="text-white">₹{col.courses[0]?.annualFee?.toLocaleString()}/yr</strong>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-400 block">Avg Package</span>
                            <strong className="text-emerald-400">{col.placementStats?.avgPackage}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCollege(col.id);
                          }}
                          className="flex-1 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
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
                          className="py-1.5 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 text-xs font-semibold border border-purple-500/40 transition"
                        >
                          Admin Studio
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* If no colleges registered in this city yet */}
                {currentCityColleges.length === 0 && (
                  <div className="p-6 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
                    <Building2 className="w-8 h-8 text-slate-600 mx-auto" />
                    <h4 className="text-sm font-bold text-white">No Campuses Registered in {selectedCity} Yet</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Be the first college representative in {selectedCity} to establish a custom page!
                    </p>
                    <button
                      onClick={() => setShowQuickCreateModal(true)}
                      className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md"
                    >
                      + Make College Page in {selectedCity}
                    </button>
                  </div>
                )}
              </div>

              {/* Shared Events & Labs in Selected City */}
              {currentCityEvents.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-indigo-300 font-bold uppercase tracking-wide flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Upcoming Events in {selectedCity}:</span>
                    </span>
                    <button onClick={() => { onClose(); setActiveTab('events'); }} className="text-indigo-400 hover:underline">
                      All Events ➔
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentCityEvents.map(evt => (
                      <div key={evt.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate">{evt.title}</div>
                          <div className="text-[10px] text-indigo-300 truncate">🏛️ {evt.hostCollegeName}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                          {evt.prizePool}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer tip & Quick Proceed */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CampusBridge Multi-Campus Radar: 8 Global Hubs & Western UP Transit Highway.</span>
          </div>

          <button
            onClick={handleExitToDashboard}
            className="text-[#ff7043] hover:text-white font-semibold flex items-center gap-1 transition"
          >
            <span>Proceed to Full Dashboard</span>
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
              Register your institution in <strong>{selectedCity}, {selectedState} ({selectedCountry})</strong>. Your custom college page will go live immediately on CampusBridge.
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
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
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
