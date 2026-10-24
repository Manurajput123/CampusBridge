import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Calendar,
  Layers,
  QrCode,
  Globe,
  Sparkles,
  Users,
  BellRing,
  FileKey,
  RotateCcw,
  LogIn,
  LogOut,
  UserPlus,
  CheckCircle2,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Radio,
  User
} from 'lucide-react';
import CampusBridgeGraphic from './CampusBridgeGraphic';

export default function Navbar({ activeTab, setActiveTab, onSelectCollege, onOpenSpatialNavigator }) {
  const {
    isLoggedIn,
    currentUser,
    users,
    switchUser,
    logoutUser,
    notices,
    compareList,
    passes,
    accessRequests,
    resetDemoData
  } = useApp();

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  // Count pending access requests for the college admin's college
  const pendingRequestsForAdmin = accessRequests.filter(
    r => r.targetCollegeId === currentUser?.collegeId && r.status === 'pending'
  ).length;

  const myPassesCount = passes.filter(p => p.studentId === currentUser?.id).length;
  const isCollegeAdmin = currentUser?.role === 'college_admin';

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
        {/* Top Minimal Network Strip */}
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 px-4 py-1.5 border-b border-[#ff5722]/20 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-200">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
              <span className="font-medium">CampusBridge Multi-Campus Network Active</span>
              <span className="hidden md:inline text-slate-400">· Meerut, Greater Noida, Ghaziabad & Delhi</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetDemoData}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                title="Reset state to initial demo data"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Demo
              </button>
              <span className="text-slate-600">|</span>
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Active: <strong className="text-white uppercase">{currentUser?.name}</strong></span>
                    <span className="text-slate-400 text-[10px]">({isCollegeAdmin ? '🏛️ Admin' : '🎓 Student'})</span>
                  </span>
                  <button
                    onClick={logoutUser}
                    className="text-[10px] text-slate-400 hover:text-rose-300 underline transition ml-1"
                    title="Sign out of current account"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Guest Mode · <button onClick={() => setActiveTab('auth')} className="text-[#ff7043] font-bold hover:underline">Sign In</button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Navbar: Decongested, Clean, exactly 3 Major Pillars */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <CampusBridgeGraphic variant="logo" className="w-8 h-8 group-hover:scale-105 transition" />
            <div>
              <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                <span>Campus<span className="text-[#ff5722]">Bridge</span></span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#ff5722]/20 text-[#ff7043] border border-[#ff5722]/30">MVP</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 hidden sm:block">
                Inter-Campus Ecosystem
              </div>
            </div>
          </div>

          {/* =================================================================
              THE 3 CORE MAJOR PILLARS (NO CONGESTION, EXACTLY AS REQUESTED)
              1. Colleges & Compare (Search, Explore, Compare)
              2. Events & Broadcast (Cross-Campus Information Sharing)
              3. QR Pass & Scan (Student QR passes & Gate Scanner)
              ================================================================= */}
          <nav className="hidden sm:flex items-center gap-2 text-xs font-semibold">
            
            {/* PILLAR 1: Colleges & Compare */}
            <button
              onClick={() => setActiveTab(compareList.length > 0 && activeTab === 'explore' ? 'compare' : 'explore')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'explore' || activeTab === 'compare'
                  ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold border border-[#ff5722]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#ff7043]" />
              <span>Colleges</span>
              {compareList.length > 0 && (
                <span 
                  onClick={(e) => { e.stopPropagation(); setActiveTab('compare'); }}
                  className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#ff5722] text-white hover:scale-105 transition"
                  title="View Selected Colleges Comparison"
                >
                  Compare ({compareList.length})
                </span>
              )}
            </button>

            {/* PILLAR 2: Events & Broadcast (Selective Cross-Campus Sharing) */}
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'events' || activeTab === 'event-detail'
                  ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold border border-[#ff5722]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#ff7043]" />
              <span>Events & Broadcast</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            {/* PILLAR 3: QR Pass & Gate Scanner */}
            <button
              onClick={() => setActiveTab(isCollegeAdmin ? 'scanner' : 'passes')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'passes' || activeTab === 'scanner'
                  ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold border border-[#ff5722]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#ff7043]" />
              <span>QR Pass & Scan</span>
              {myPassesCount > 0 && !isCollegeAdmin && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                  {myPassesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Section: 3D Map + User Profile / Login Button + Side Hub Drawer Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick 3D Campus Map Button */}
            <button
              onClick={() => setActiveTab('spatial')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                activeTab === 'spatial'
                  ? 'bg-gradient-to-r from-[#ff5722] to-[#ff7043] text-white border-[#ff5722] shadow-md shadow-orange-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-[#ff5722]/50'
              }`}
              title="3D Earth & Regional Campus Map Corridor"
            >
              <Globe className="w-3.5 h-3.5 text-[#ff7043]" />
              <span className="hidden sm:inline">3D Map</span>
            </button>

            {!isLoggedIn ? (
              /* If NOT logged in: Show the Login / Sign Up Button */
              <button
                onClick={() => setActiveTab('auth')}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white text-xs font-bold transition shadow-md shadow-[#ff5722]/30 active:scale-95"
                title="Login or Sign Up to CampusBridge"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Login / Sign Up</span>
              </button>
            ) : (
              /* If LOGGED IN: NO Login/Sign Up button! Instead show User Profile Menu */
              <div className="relative">
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff5722]/50 text-white text-xs font-semibold transition group shadow-sm"
                  title="My Account & Profile Menu"
                >
                  <img
                    src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={currentUser?.name}
                    className="w-6 h-6 rounded-lg object-cover border border-[#ff5722]/50"
                  />
                  <div className="hidden sm:block text-left leading-tight">
                    <div className="font-bold text-white text-xs flex items-center gap-1">
                      <span>{currentUser?.name?.split(' ')[0]}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({isCollegeAdmin ? 'Admin' : 'Student'})
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
                </button>

                {/* Profile Dropdown */}
                {roleSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-xs">
                    <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60">
                      <p className="font-bold text-white text-sm">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5722]/20 text-[#ff7043] border border-[#ff5722]/30">
                        {isCollegeAdmin ? `🏛️ ${currentUser.collegeName} Admin` : `🎓 ${currentUser.collegeName || 'Student'}`}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('spatial');
                          setRoleSwitcherOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 transition"
                      >
                        <Globe className="w-4 h-4 text-[#ff7043]" />
                        <span>3D Spatial Campus Map</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab(isCollegeAdmin ? 'admin' : 'passes');
                          setRoleSwitcherOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 transition"
                      >
                        <QrCode className="w-4 h-4 text-[#ff7043]" />
                        <span>{isCollegeAdmin ? 'Admin Gate Scanner' : 'My QR Passes & Visits'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('explore');
                          setRoleSwitcherOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 transition"
                      >
                        <Building2 className="w-4 h-4 text-[#ff7043]" />
                        <span>Browse Colleges & Fees</span>
                      </button>
                    </div>

                    {/* Switch User Quick Links */}
                    <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/40">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Switch Demo Identity:</p>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            switchUser('admin-akgec');
                            setRoleSwitcherOpen(false);
                          }}
                          className="w-full text-left text-[11px] text-purple-300 hover:text-white py-0.5 transition flex items-center justify-between"
                        >
                          <span>Dr. Hemant (AKGEC Admin)</span>
                          <span className="text-[9px] text-slate-500">🏛️</span>
                        </button>
                        <button
                          onClick={() => {
                            switchUser('admin-kiet');
                            setRoleSwitcherOpen(false);
                          }}
                          className="w-full text-left text-[11px] text-purple-300 hover:text-white py-0.5 transition flex items-center justify-between"
                        >
                          <span>Dr. Manoj Goel (KIET Admin)</span>
                          <span className="text-[9px] text-slate-500">🏛️</span>
                        </button>
                        <button
                          onClick={() => {
                            switchUser('usr-student');
                            setRoleSwitcherOpen(false);
                          }}
                          className="w-full text-left text-[11px] text-indigo-300 hover:text-white py-0.5 transition flex items-center justify-between"
                        >
                          <span>Campus Student</span>
                          <span className="text-[9px] text-slate-500">🎓</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logoutUser();
                          setRoleSwitcherOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 flex items-center gap-2.5 font-semibold transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout / Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Side Menu Drawer Button: Opens Slide-Over Hub for Secondary Features */}
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff5722]/50 text-slate-200 hover:text-white text-xs font-bold transition shadow-sm group"
              title="Open Campus Hub & Side Features"
            >
              <Menu className="w-4 h-4 text-[#ff7043] group-hover:rotate-90 transition duration-300" />
              <span className="hidden md:inline">Campus Hub</span>
              {(notices?.length > 0 || pendingRequestsForAdmin > 0) && (
                <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* =====================================================================
          SLIDE-OVER SIDE DRAWER (ALL SECONDARY FEATURES ORGANIZED CLEANLY)
          ===================================================================== */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSideDrawerOpen(false)}
          ></div>

          {/* Slide-out Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff5722]/20 border border-[#ff5722]/30 flex items-center justify-center">
                    <CampusBridgeGraphic variant="logo" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">CampusBridge Hub</h3>
                    <p className="text-[11px] text-slate-400">Inter-Campus Network Features</p>
                  </div>
                </div>

                <button
                  onClick={() => setSideDrawerOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. Spatial 3D Earth Gateway (Featured Card) */}
                <div 
                  onClick={() => {
                    setActiveTab('spatial');
                    setSideDrawerOpen(false);
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-orange-950/60 via-slate-900 to-slate-900 border border-[#ff5722]/40 hover:border-[#ff5722] transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-200">
                      <Globe className="w-4 h-4 text-[#ff7043] group-hover:rotate-45 transition duration-300" />
                      <span>3D Earth Corridor Gateway</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5722] text-white">
                      Full-Page 3D
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Interactive space corridor: Earth ➔ India ➔ Uttar Pradesh ➔ Ghaziabad campus clusters & holographic bridge.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#ff7043]">
                    <span>Launch 3D Explorer</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                {/* Section: Core Navigation Quick Links */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    Major Pillars
                  </div>

                  <button
                    onClick={() => { setActiveTab('explore'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-[#ff7043]" />
                      <span>Colleges & Compare</span>
                    </span>
                    {compareList.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff5722] text-white">
                        {compareList.length} Selected
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => { setActiveTab('events'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#ff7043]" />
                      <span>Inter-College Events & Broadcast</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Targeted Invites
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('passes'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>My QR Event Passes</span>
                    </span>
                    {myPassesCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                        {myPassesCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => { setActiveTab('scanner'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>Gate Scanner (Organizer Entry)</span>
                    </span>
                  </button>
                </div>

                {/* Section: Secondary Inter-Campus Network Features */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    Multi-Campus Collaboration
                  </div>

                  <button
                    onClick={() => { setActiveTab('notices'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <BellRing className="w-4 h-4 text-indigo-400" />
                      <span>Campus Bulletins & Placement Circulars</span>
                    </span>
                    {notices?.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                        {notices.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => { setActiveTab('teams'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>Cross-College Team Finder</span>
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('ai'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>AI College Advisor</span>
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('requests'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <FileKey className="w-4 h-4 text-purple-400" />
                      <span>Campus Lab & Facility Permissions</span>
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('admin'); setSideDrawerOpen(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-purple-950/40 text-purple-300 hover:text-white transition text-xs font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>{isCollegeAdmin ? 'Admin Studio' : 'Register / Partner College'}</span>
                    </span>
                    {isCollegeAdmin && pendingRequestsForAdmin > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                        {pendingRequestsForAdmin}
                      </span>
                    )}
                  </button>
                </div>

                {/* Active Persona & Switcher */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Current Account Persona
                    </span>
                    <button
                      onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                      className="text-xs text-[#ff7043] hover:underline"
                    >
                      {roleSwitcherOpen ? 'Close' : 'Switch'}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#ff5722]/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{currentUser?.name}</div>
                      <div className="text-[11px] text-[#ff7043]">
                        {currentUser?.role === 'college_admin' ? `🏛️ Admin: ${currentUser.collegeName}` : `🎓 Student (${currentUser?.collegeName || 'Verified'})`}
                      </div>
                    </div>
                  </div>

                  {roleSwitcherOpen && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-800 max-h-48 overflow-y-auto">
                      {users.map(u => (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUser(u.id);
                            setRoleSwitcherOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition text-xs ${
                            u.id === currentUser?.id ? 'bg-[#ff5722]/20 border border-[#ff5722]/40 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-lg object-cover" />
                          <div className="flex-1 truncate">
                            <div>{u.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{u.role === 'college_admin' ? u.collegeName : 'Student'}</div>
                          </div>
                          {u.id === currentUser?.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7043]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => { setActiveTab('auth'); setSideDrawerOpen(false); }}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#ff7043]" />
                  <span>New Student Account</span>
                </button>

                <button
                  onClick={() => { logoutUser(); setSideDrawerOpen(false); }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
