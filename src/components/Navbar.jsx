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
  ShieldAlert,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  Menu,
  X,
  FileKey
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onSelectCollege }) {
  const {
    currentUser,
    users,
    switchUser,
    compareList,
    passes,
    accessRequests,
    resetDemoData
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count pending access requests for the college admin's college
  const pendingRequestsForAdmin = accessRequests.filter(
    r => r.targetCollegeId === currentUser.collegeId && r.status === 'pending'
  ).length;

  const myPassesCount = passes.filter(p => p.studentId === currentUser.id).length;

  const isCollegeAdmin = currentUser.role === 'college_admin';
  const isSuperAdmin = currentUser.role === 'super_admin';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-slate-900/60 px-4 py-1.5 border-b border-indigo-500/20 text-xs flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
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
            <span className="text-[11px] font-mono text-indigo-300">
              Role: <strong className="text-white uppercase">{currentUser.role.replace('_', ' ')}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('home'); }} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              <span>Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Bridge</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">MVP</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide">Connect Campuses · Compare · Grow</div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'explore' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
          >
            <Building2 className="w-4 h-4" />
            Explore Colleges
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 relative ${activeTab === 'compare' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
          >
            <Layers className="w-4 h-4" />
            Compare
            {compareList.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                {compareList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'events' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
          >
            <Calendar className="w-4 h-4" />
            Inter-College Events
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'teams' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
          >
            <Users className="w-4 h-4" />
            Team Finder
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 text-amber-300 ${activeTab === 'ai' ? 'bg-amber-500/20 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
          >
            <Sparkles className="w-4 h-4" />
            AI Advisor
          </button>

          {/* College Admin Portal / Partner Onboarding (Always Accessible) */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-purple-600/30 text-purple-200 font-bold border border-purple-500/40' : 'text-purple-300 hover:text-white hover:bg-purple-950/50'}`}
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>{isCollegeAdmin ? 'Admin Studio' : 'College Partner Portal'}</span>
            {isCollegeAdmin && pendingRequestsForAdmin > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                {pendingRequestsForAdmin}
              </span>
            )}
          </button>

          {/* Access Requests & Permissions */}
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'requests' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
          >
            <FileKey className="w-4 h-4" />
            {isCollegeAdmin ? 'Student Access Approvals' : 'Campus Permissions'}
          </button>

          {/* Student Passes */}
          {!isCollegeAdmin && (
            <button
              onClick={() => setActiveTab('passes')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'passes' ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'hover:text-white hover:bg-slate-800/60'}`}
            >
              <QrCode className="w-4 h-4" />
              My Passes
              {myPassesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                  {myPassesCount}
                </span>
              )}
            </button>
          )}

          {/* Scanner Page for Organizers */}
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'scanner' ? 'bg-emerald-600/20 text-emerald-300 font-semibold' : 'hover:text-emerald-300 hover:bg-slate-800/60'}`}
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            Gate Scanner
          </button>
        </nav>

        {/* Right Section: User Persona Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-indigo-500/50 transition shadow-sm text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
              />
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span className="truncate max-w-[110px]">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[10px] text-indigo-300 truncate max-w-[130px]">
                  {currentUser.role === 'college_admin' ? '🏛️ Admin: ' + (currentUser.collegeName?.split(' ')[0] || 'College') : '🎓 Student'}
                </div>
              </div>
            </button>

            {/* Dropdown menu */}
            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Demo Persona (Fast Role Testing)
                </div>

                <div className="space-y-1 mt-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition ${u.id === currentUser.id ? 'bg-indigo-600/20 border border-indigo-500/40 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
                    >
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white flex items-center justify-between">
                          <span className="truncate">{u.name}</span>
                          {u.id === currentUser.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {u.role === 'college_admin' ? `🏛️ Admin: ${u.collegeName}` : u.role === 'super_admin' ? '👑 Platform Director' : `🎓 Student (${u.collegeName})`}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 px-3 py-1 text-[10px] text-slate-400">
                  Tip: Switch to <strong>Dr. R.K. Sharma</strong> to test Meerut college admin event broadcasting & approvals!
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-indigo-400" /> Explore Colleges
          </button>
          <button
            onClick={() => { setActiveTab('compare'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-400" /> Compare Colleges</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-600">{compareList.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('events'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-indigo-400" /> Inter-College Events
          </button>
          <button
            onClick={() => { setActiveTab('teams'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-indigo-400" /> Team Finder
          </button>
          <button
            onClick={() => { setActiveTab('ai'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-amber-300 hover:bg-slate-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> AI Advisor
          </button>
          <button
            onClick={() => { setActiveTab('requests'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <FileKey className="w-4 h-4 text-indigo-400" /> Campus Permissions
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-purple-300 hover:bg-slate-800 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" /> {isCollegeAdmin ? 'Admin Studio' : 'Register / Partner College'}
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
