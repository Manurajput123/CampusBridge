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
  BookOpen,
  MapPin,
  KeyRound
} from 'lucide-react';

export default function AuthPage({ setActiveTab }) {
  const { colleges, registerStudent, loginUser, switchUser, users, currentUser, showToast } = useApp();

  // Mode: 'student_signup' | 'student_login' | 'college_login'
  const [authMode, setAuthMode] = useState('student_signup');

  // Student Sign Up Form State
  const [stdName, setStdName] = useState('');
  const [stdEmail, setStdEmail] = useState('');
  const [stdPassword, setStdPassword] = useState('');
  const [stdCollegeId, setStdCollegeId] = useState(colleges[0]?.id || 'col-noida-1');
  const [stdBranch, setStdBranch] = useState('Computer Science & Engineering');
  const [stdYear, setStdYear] = useState('3rd Year');
  const [stdSkills, setStdSkills] = useState('React, Python, Tailwind');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleStudentSignUp = (e) => {
    e.preventDefault();
    if (!stdName.trim() || !stdEmail.trim()) {
      showToast('Please enter your full name and email.', 'warning');
      return;
    }

    registerStudent({
      name: stdName,
      email: stdEmail,
      password: stdPassword,
      collegeId: stdCollegeId,
      branch: stdBranch,
      year: stdYear,
      skills: stdSkills
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setActiveTab('explore');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      showToast('Please enter your email.', 'warning');
      return;
    }

    loginUser(loginEmail, loginPass);
    setActiveTab('explore');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5722]/15 border border-[#ff5722]/30 text-[#ff7043] text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-[#ff5722]" />
          <span>CampusBridge Single Identity Authentication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {authMode === 'student_signup' ? 'Create Student Account' : authMode === 'student_login' ? 'Student Sign In' : 'College Admin Authentication'}
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {authMode.startsWith('student')
            ? 'Access all verified colleges, register for inter-college hackathons, get single-use QR passes, and find teammates.'
            : 'Access the College Admin Studio to update fees, publish events, and dispatch invitations.'}
        </p>
      </div>

      {/* Auth Mode Toggle Bar */}
      <div className="flex items-center justify-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto shadow-lg">
        <button
          onClick={() => setAuthMode('student_signup')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${authMode === 'student_signup' ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30' : 'text-slate-400 hover:text-white'}`}
        >
          <User className="w-3.5 h-3.5" />
          Student Sign Up
        </button>

        <button
          onClick={() => setAuthMode('student_login')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${authMode === 'student_login' ? 'bg-[#ff5722] text-white shadow-md shadow-[#ff5722]/30' : 'text-slate-400 hover:text-white'}`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          Student Login
        </button>

        <button
          onClick={() => setAuthMode('college_login')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${authMode === 'college_login' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Building2 className="w-3.5 h-3.5" />
          College Admin
        </button>
      </div>

      {/* Main Form Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-xl mx-auto shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 1. Student Sign Up Form */}
        {authMode === 'student_signup' && (
          <form onSubmit={handleStudentSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={stdName}
                  onChange={(e) => setStdName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="aman@niet.co.in"
                    value={stdEmail}
                    onChange={(e) => setStdEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={stdPassword}
                    onChange={(e) => setStdPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Select Registered College */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Enrolled College / University <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={stdCollegeId}
                  onChange={(e) => setStdCollegeId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  required
                >
                  {colleges.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900">
                      {c.name} ({c.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Engineering Branch</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, AI, IT"
                  value={stdBranch}
                  onChange={(e) => setStdBranch(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Year</label>
                <select
                  value={stdYear}
                  onChange={(e) => setStdYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                >
                  <option value="1st Year" className="bg-slate-900">1st Year</option>
                  <option value="2nd Year" className="bg-slate-900">2nd Year</option>
                  <option value="3rd Year" className="bg-slate-900">3rd Year</option>
                  <option value="4th Year" className="bg-slate-900">4th Year</option>
                  <option value="Postgraduate" className="bg-slate-900">Postgraduate / Masters</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Skills / Technical Interests (comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Python, Machine Learning, UI/UX"
                value={stdSkills}
                onChange={(e) => setStdSkills(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ea580c] text-white font-bold text-xs shadow-lg shadow-[#ff5722]/30 transition flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Complete Student Sign Up & Launch Profile
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('student_login')}
                className="text-xs text-slate-400 hover:text-indigo-400"
              >
                Already have an account? <strong>Sign In</strong>
              </button>
            </div>
          </form>
        )}

        {/* 2. Student Sign In Form */}
        {authMode === 'student_login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Student Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="e.g. student@college.edu.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ff5722] hover:bg-[#ea580c] text-white font-bold text-xs shadow-lg shadow-[#ff5722]/30 transition flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              Sign In to Student Dashboard
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('student_signup')}
                className="text-xs text-slate-400 hover:text-indigo-400"
              >
                Don't have an account? <strong>Sign Up Now</strong>
              </button>
            </div>
          </form>
        )}

        {/* 3. College Admin Login Form */}
        {authMode === 'college_login' && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 leading-relaxed">
              Institutional administrators can manage their college profile, edit degree fees, publish events, and dispatch invitations to partner campuses.
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Quick Login as Registered College Admin:
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    switchUser('admin-meerut');
                    setActiveTab('admin');
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition"
                >
                  <div>
                    <div className="text-xs font-bold text-white">Dr. R.K. Sharma</div>
                    <div className="text-[11px] text-purple-300">Dean · Meerut Institute of Technology (MITS)</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    switchUser('admin-noida');
                    setActiveTab('admin');
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition"
                >
                  <div>
                    <div className="text-xs font-bold text-white">Prof. Sunita Mehra</div>
                    <div className="text-[11px] text-indigo-300">Director · NIET Greater Noida</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveTab('admin')}
                className="text-xs text-purple-300 hover:underline"
              >
                Want to Register a New College or Claim Authority? Click here.
              </button>
            </div>
          </div>
        )}

        {/* Quick Demo Student Switcher Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-[11px] text-slate-400 font-semibold mb-2 text-center">
            Or test with verified demo student accounts:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                switchUser('usr-student');
                setActiveTab('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              🎓 Student Delegate (NIET Noida)
            </button>
            <button
              onClick={() => {
                switchUser('usr-rahul');
                setActiveTab('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              🎓 Rahul Verma (MITS Meerut)
            </button>
            <button
              onClick={() => {
                switchUser('usr-priya');
                setActiveTab('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              🎓 Priya Singh (GEA Ghaziabad)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
