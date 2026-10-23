import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Building2,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  KeyRound,
  X,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export default function AuthPage({ setActiveTab }) {
  const { colleges, registerStudent, loginUser, switchUser, users, currentUser, showToast } = useApp();

  // Unified Form State (All in ONE single place)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Student Details for New Registrations
  const [fullName, setFullName] = useState('');
  const [collegeId, setCollegeId] = useState(colleges[0]?.id || 'col-gzb-akgec');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('3rd Year');

  // Manual override toggle: "I want to create a new profile / Update profile"
  const [forceNewProfileFields, setForceNewProfileFields] = useState(false);

  // Check if email already belongs to an existing user
  const matchedUser = users.find(
    u => u.email?.toLowerCase().trim() === email.toLowerCase().trim()
  );

  const isExistingAccount = Boolean(matchedUser);

  // Handle Unified Submit
  const handleUnifiedSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast('Please enter your email address.', 'warning');
      return;
    }

    // 1. If Account Exists -> Log in directly
    if (isExistingAccount) {
      loginUser(email, password);
      try {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      } catch (err) {}
      setActiveTab(matchedUser.role === 'college_admin' ? 'admin' : 'explore');
      return;
    }

    // 2. If New Student -> Complete Instant Profile Creation
    if (!fullName.trim()) {
      showToast('Please enter your full name to complete registration.', 'warning');
      return;
    }

    registerStudent({
      name: fullName,
      email: email,
      password: password,
      collegeId: collegeId,
      branch: branch,
      year: year,
      skills: 'React, Problem Solving, Computer Science'
    });

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    setActiveTab('explore');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2 relative">
        <button
          onClick={() => setActiveTab('home')}
          className="absolute right-0 top-0 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#ff5722]/50 hover:bg-slate-800 transition flex items-center gap-1.5 text-xs font-bold shadow-md"
          title="Close Authentication (Exit to Home)"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Close</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5722]/15 border border-[#ff5722]/30 text-[#ff7043] text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-[#ff5722]" />
          <span>CampusBridge Unified Identity Access</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Login & Sign Up
        </h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Sign in to your existing account or auto-create a verified student profile in one seamless step. No separate pages.
        </p>
      </div>

      {/* Main Unified Box (Everything in ONE place) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-xl mx-auto shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5722]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Quick Close 'X' Button on Card */}
        <button
          onClick={() => setActiveTab('home')}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition z-10"
          title="Close (Exit to Home)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Cue Pill */}
        <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
          <span className="text-slate-400 font-medium">Single-Step Authentication:</span>
          {isExistingAccount ? (
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Existing User Recognized</span>
            </span>
          ) : email.trim() ? (
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
              <span>New Student Registration</span>
            </span>
          ) : (
            <span className="text-slate-500 text-[11px]">Enter your email to begin</span>
          )}
        </div>

        {/* The Unified Form */}
        <form onSubmit={handleUnifiedSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              College or Personal Email <span className="text-[#ff7043]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="yourname@college.edu.in or personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                required
              />
            </div>
            {isExistingAccount && (
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Found account for <strong>{matchedUser.name}</strong> ({matchedUser.role === 'college_admin' ? 'Admin: ' + matchedUser.collegeName : 'Student'}).</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password <span className="text-[#ff7043]">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                required
              />
            </div>
          </div>

          {/* Inline Profile Details: Always accessible in the same place */}
          {(!isExistingAccount || forceNewProfileFields) && (
            <div className="pt-2 space-y-4 border-t border-slate-800/80 animate-fade-in">
              <div className="text-[11px] text-[#ff7043] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Profile Details:</span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-[#ff7043]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                    required={!isExistingAccount}
                  />
                </div>
              </div>

              {/* Select Registered College (Includes Ghaziabad & Regional Campuses) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Your Enrolled College <span className="text-[#ff7043]">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                  >
                    {colleges.map(c => (
                      <option key={c.id} value={c.id} className="bg-slate-900">
                        {c.name} ({c.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Engineering Branch</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science, AI, IT"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Single Unified Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-[#ff5722]/30 transition flex items-center justify-center gap-2 mt-2 active:scale-95"
          >
            {isExistingAccount ? (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Your Account ➔</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Sign Up & Enter CampusBridge 🚀</span>
              </>
            )}
          </button>

          {/* Toggle for existing user who wants to update details */}
          {isExistingAccount && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setForceNewProfileFields(!forceNewProfileFields)}
                className="text-[11px] text-slate-400 hover:text-white underline"
              >
                {forceNewProfileFields ? 'Hide profile details' : 'Edit profile info before sign in'}
              </button>
            </div>
          )}
        </form>

        {/* Section B: Institutional Admin One-Click Login (Same Place) */}
        <div className="pt-4 border-t border-slate-800 space-y-2.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Institutional Admin Quick Access:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                switchUser('admin-akgec');
                setActiveTab('admin');
              }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 text-left transition flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-purple-300">Dr. Hemant Ahuja</div>
                <div className="text-[10px] text-slate-400">Dean · AKGEC Ghaziabad</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => {
                switchUser('admin-kiet');
                setActiveTab('admin');
              }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 text-left transition flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-purple-300">Dr. Manoj Goel</div>
                <div className="text-[10px] text-slate-400">Director · KIET Ghaziabad</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => {
                switchUser('admin-meerut');
                setActiveTab('admin');
              }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition"
            >
              <div>
                <div className="text-xs font-bold text-white">Dr. R.K. Sharma</div>
                <div className="text-[10px] text-slate-400">Dean · MITS Meerut</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                switchUser('admin-noida');
                setActiveTab('admin');
              }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition"
            >
              <div>
                <div className="text-xs font-bold text-white">Prof. Sunita Mehra</div>
                <div className="text-[10px] text-slate-400">Director · NIET Noida</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Section C: Verified Demo Students (Same Place) */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-semibold mb-2 text-center">
            Or test instantly with pre-verified student profiles:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                switchUser('usr-student');
                setActiveTab('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-[#ff5722]/40 transition"
            >
              🎓 Student Delegate (NIET Noida)
            </button>
            <button
              type="button"
              onClick={() => {
                switchUser('usr-priya');
                setActiveTab('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-[#ff5722]/40 transition"
            >
              🎓 Priya Singh (GEA Ghaziabad)
            </button>
            <button
              type="button"
              onClick={() => {
                switchUser('usr-rahul');
                setActiveTab('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-[#ff5722]/40 transition"
            >
              🎓 Rahul Verma (MITS Meerut)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
