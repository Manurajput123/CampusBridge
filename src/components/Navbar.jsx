import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Building2,
  Calendar,
  Layers,
  Users,
  QrCode,
  Sparkles,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  Menu,
  X,
  FileKey,
  BellRing,
  LogIn,
  LogOut,
  UserPlus,
  Globe
} from 'lucide-react';
import CampusBridgeGraphic from './CampusBridgeGraphic';

export default function Navbar({ activeTab, setActiveTab, onSelectCollege, onOpenSpatialNavigator }) {
  const {
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

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count pending access requests for the college admin's college
  const pendingRequestsForAdmin = accessRequests.filter(
    r => r.targetCollegeId === currentUser?.collegeId && r.status === 'pending'
  ).length;

  const myPassesCount = passes.filter(p => p.studentId === currentUser?.id).length;

  const isCollegeAdmin = currentUser?.role === 'college_admin';

  // Check if active tab is one of the secondary items in "More"
  const isMoreActive = ['compare', 'notices', 'ai', 'admin', 'requests', 'passes', 'scanner'].includes(activeTab);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-950 px-4 py-1.5 border-b border-[#ff5722]/20 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-200">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
            <span>CampusBridge Multi-Campus Network Active</span>
            <span className="hidden md:inline text-slate-400">· Meerut, Greater Noida, Ghaziabad & Delhi Campuses Connected</span>
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
            <span className="text-[11px] font-mono text-orange-300">
              Role: <strong className="text-white uppercase">{currentUser?.role?.replace('_', ' ') || 'STUDENT'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Centered within max-w-7xl so login bar is never pushed to the extreme corner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Orange Bridge Motif */}
        <div 
          onClick={() => { setActiveTab('home'); }} 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <CampusBridgeGraphic variant="logo" className="w-9 h-9 group-hover:scale-105 transition" />
          <div>
            <div className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
              <span>Campus<span className="text-[#ff5722]">Bridge</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#ff5722]/20 text-[#ff7043] border border-[#ff5722]/30">MVP</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 hidden sm:block">
              Connect Campuses · Compare · Grow
            </div>
          </div>
        </div>

        {/* Shortened & Un-congested Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          
          {/* 1. Spatial 3D Earth Gateway */}
          <button
            onClick={() => setActiveTab('spatial')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 font-bold shadow-sm ${
              activeTab === 'spatial'
                ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80'
            }`}
            title="Launch 3D Earth Corridor Navigator (Earth ➔ Country ➔ State ➔ City)"
          >
            <Globe className="w-3.5 h-3.5 text-[#ff7043]" />
            <span>3D Earth</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          {/* 2. Explore Colleges */}
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Colleges</span>
          </button>

          {/* 3. Inter-College Events */}
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </button>

          {/* 4. Team Finder */}
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'teams'
                ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold'
                : 'hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Teams</span>
          </button>

          {/* 5. Clean "More Hub" Dropdown to eliminate congestion */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                isMoreActive || moreMenuOpen
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>More</span>
              {(compareList.length > 0 || (notices && notices.length > 0) || myPassesCount > 0) && (
                <span className="w-2 h-2 rounded-full bg-[#ff5722]"></span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition duration-200 ${moreMenuOpen ? 'rotate-180 text-[#ff7043]' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {moreMenuOpen && (
              <div 
                className="absolute left-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl"
                onMouseLeave={() => setMoreMenuOpen(false)}
              >
                <div className="space-y-1">
                  {/* Compare Colleges */}
                  <button
                    onClick={() => { setActiveTab('compare'); setMoreMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                      activeTab === 'compare' ? 'bg-[#ff5722]/20 text-[#ff7043] font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#ff7043]" />
                      <span>Compare Colleges</span>
                    </span>
                    {compareList.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#ff5722] text-white">
                        {compareList.length}
                      </span>
                    )}
                  </button>

                  {/* Campus Bulletins */}
                  <button
                    onClick={() => { setActiveTab('notices'); setMoreMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                      activeTab === 'notices' ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BellRing className="w-4 h-4 text-indigo-400" />
                      <span>Campus Bulletins</span>
                    </span>
                    {notices?.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                        {notices.length}
                      </span>
                    )}
                  </button>

                  {/* AI Advisor */}
                  <button
                    onClick={() => { setActiveTab('ai'); setMoreMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition ${
                      activeTab === 'ai' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-amber-300/90 hover:bg-slate-800 hover:text-amber-200'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI Advisor</span>
                  </button>
                </div>

                <div className="my-1.5 border-t border-slate-800/80"></div>

                <div className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Inter-Campus Tools
                  </div>

                  {/* Student Passes */}
                  <button
                    onClick={() => { setActiveTab('passes'); setMoreMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                      activeTab === 'passes' ? 'bg-emerald-600/20 text-emerald-300 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>My Event Passes</span>
                    </span>
                    {myPassesCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                        {myPassesCount}
                      </span>
                    )}
                  </button>

                  {/* Campus Permissions */}
                  <button
                    onClick={() => { setActiveTab('requests'); setMoreMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition ${
                      activeTab === 'requests' ? 'bg-cyan-600/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <FileKey className="w-4 h-4 text-cyan-400" />
                    <span>Campus Permissions</span>
                  </button>

                  {/* Scanner */}
                  <button
                    onClick={() => { setActiveTab('scanner'); setMoreMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition ${
                      activeTab === 'scanner' ? 'bg-emerald-600/20 text-emerald-300 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>Gate Scanner</span>
                  </button>
                </div>

                <div className="my-1.5 border-t border-slate-800/80"></div>

                {/* College Admin Portal */}
                <button
                  onClick={() => { setActiveTab('admin'); setMoreMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                    activeTab === 'admin' ? 'bg-purple-600/30 text-purple-200 font-bold' : 'text-purple-300 hover:bg-purple-950/40 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>{isCollegeAdmin ? 'Admin Studio' : 'College Partner Portal'}</span>
                  </span>
                  {isCollegeAdmin && pendingRequestsForAdmin > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                      {pendingRequestsForAdmin}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Properly Spaced & Framed Login & Account Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Quick Login Link */}
          <button
            onClick={() => setActiveTab('auth')}
            className="text-xs text-slate-300 hover:text-white font-semibold px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 transition"
          >
            Log in
          </button>

          {/* Prominent Orange "Sign up free" CTA */}
          <button
            onClick={() => setActiveTab('auth')}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white text-xs font-bold transition shadow-md shadow-[#ff5722]/30 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Sign up free</span>
          </button>

          {/* Elegant User Account Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff5722]/50 transition shadow-sm text-left"
              title="Switch Account Persona"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name || 'User'}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#ff5722]/40"
              />
              <div className="hidden xl:block">
                <div className="text-xs font-bold text-white flex items-center gap-1 leading-none">
                  <span className="truncate max-w-[95px]">{currentUser?.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[9px] text-[#ff7043] truncate max-w-[95px] mt-0.5 font-medium">
                  {currentUser?.role === 'college_admin' ? '🏛️ Admin' : '🎓 Student'}
                </div>
              </div>
            </button>

            {/* Account Switcher Dropdown */}
            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Switch Account Persona</span>
                  <button
                    onClick={() => {
                      setActiveTab('auth');
                      setRoleMenuOpen(false);
                    }}
                    className="text-[#ff7043] hover:underline normal-case flex items-center gap-1"
                  >
                    <UserPlus className="w-3 h-3" /> New
                  </button>
                </div>

                <div className="space-y-1 mt-1 max-h-56 overflow-y-auto">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition ${
                        u.id === currentUser?.id
                          ? 'bg-[#ff5722]/15 border border-[#ff5722]/40 text-white'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white flex items-center justify-between">
                          <span className="truncate">{u.name}</span>
                          {u.id === currentUser?.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7043] shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {u.role === 'college_admin'
                            ? `🏛️ Admin: ${u.collegeName}`
                            : u.role === 'super_admin'
                            ? '👑 Platform Director'
                            : `🎓 Student (${u.collegeName || 'Verified'})`}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('auth');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#ff5722]/20 text-[#ff7043] hover:bg-[#ff5722] hover:text-white font-semibold text-left flex items-center justify-between transition"
                  >
                    <span>Create / Sign In Account</span>
                    <LogIn className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      logoutUser();
                      setRoleMenuOpen(false);
                    }}
                    className="w-full py-1 px-3 text-slate-400 hover:text-rose-400 text-left flex items-center gap-1.5 text-[11px] transition"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Reset / Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 animate-fade-in">
          {/* 3D Earth Gateway Mobile Trigger */}
          <button
            onClick={() => {
              setActiveTab('spatial');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-orange-200 bg-orange-950/60 border border-[#ff5722]/40 hover:bg-orange-900/60 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#ff5722]" />
              <span>3D Earth Gateway (Explore World & India)</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">3D</span>
          </button>

          <button
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-[#ff7043]" /> Explore Colleges
          </button>

          <button
            onClick={() => { setActiveTab('compare'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#ff7043]" /> Compare Colleges</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#ff5722] text-white font-bold">{compareList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#ff7043]" /> Inter-College Events
          </button>

          <button
            onClick={() => { setActiveTab('teams'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-[#ff7043]" /> Team Finder
          </button>

          <button
            onClick={() => { setActiveTab('ai'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-amber-300 hover:bg-slate-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> AI Advisor
          </button>

          <button
            onClick={() => { setActiveTab('notices'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><BellRing className="w-4 h-4 text-indigo-400" /> Campus Bulletins & Info</span>
            {notices?.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-600 font-bold">{notices.length}</span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('auth'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#ff7043] font-bold hover:bg-[#ff5722]/10 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4 text-[#ff5722]" /> Student Login / Sign Up
          </button>

          <button
            onClick={() => { setActiveTab('requests'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <FileKey className="w-4 h-4 text-cyan-400" /> Campus Permissions
          </button>

          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-purple-300 hover:bg-slate-800 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-purple-400" /> {isCollegeAdmin ? 'Admin Studio' : 'Register / Partner College'}
          </button>

          <button
            onClick={() => { setActiveTab('passes'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-emerald-400" /> My Passes
          </button>

          <button
            onClick={() => { setActiveTab('scanner'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-emerald-300 hover:bg-slate-800 flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-emerald-400" /> Gate Scanner
          </button>
        </div>
      )}
    </header>
  );
}
