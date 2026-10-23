import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  QrCode,
  Calendar,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Copy,
  ArrowRight,
  ShieldCheck,
  User,
  ExternalLink,
  Plus,
  Sparkles,
  Clock,
  MapPin,
  X,
  ScanLine,
  Send,
  AlertCircle,
  Check,
  RotateCcw
} from 'lucide-react';
import QRPassModal from '../components/QRPassModal';

export default function StudentDashboardPage({ setActiveTab }) {
  const { passes, currentUser, colleges, generateCollegeVisitPass, checkInPass, showToast } = useApp();

  const isCollegeAdmin = currentUser?.role === 'college_admin';

  // Active View Tab: 'passes' (Student QR view) | 'scanner' (Gate Scanner view)
  const [activeView, setActiveView] = useState(isCollegeAdmin ? 'scanner' : 'passes');

  // Filter for passes list: 'ALL' | 'COLLEGE_VISIT' | 'EVENT_PASS'
  const [passFilter, setPassFilter] = useState('ALL');
  const [selectedPassForModal, setSelectedPassForModal] = useState(null);

  // College Visit Pass Generator Modal State
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [targetColId, setTargetColId] = useState(colleges[0]?.id || 'col-gzb-akgec');
  const [visitPurpose, setVisitPurpose] = useState('Campus Tour & Admission Counseling');
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [visitTimeSlot, setVisitTimeSlot] = useState('10:00 AM - 01:00 PM (Morning Window)');

  // Scanner Terminal State
  const [inputToken, setInputToken] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanningAnim, setIsScanningAnim] = useState(false);

  // If user role changes, sync active view default
  useEffect(() => {
    if (isCollegeAdmin) {
      setActiveView('scanner');
    }
  }, [isCollegeAdmin]);

  // My Passes (filtered by student)
  const myPasses = passes.filter(p => p.studentId === currentUser?.id);
  const filteredMyPasses = myPasses.filter(p => {
    if (passFilter === 'COLLEGE_VISIT') return p.passType === 'COLLEGE_VISIT';
    if (passFilter === 'EVENT_PASS') return p.passType !== 'COLLEGE_VISIT';
    return true;
  });

  // Passes targeted for the admin's college (for gate security check)
  const adminCollegePasses = passes.filter(p => 
    p.targetCollegeId === currentUser?.collegeId || 
    p.hostCollegeName === currentUser?.collegeName
  );

  // Handle Generate College Visit Pass
  const handleGenerateVisitPassSubmit = (e) => {
    e.preventDefault();
    const result = generateCollegeVisitPass({
      targetCollegeId: targetColId,
      purpose: visitPurpose,
      visitDate: visitDate,
      timeSlot: visitTimeSlot
    });

    if (result.success && result.pass) {
      try {
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setShowGenerateModal(false);
      setSelectedPassForModal(result.pass);
    }
  };

  // Handle Gate Check-In Validation
  const handleValidateToken = (tokenToTest) => {
    const token = tokenToTest || inputToken;
    if (!token.trim()) {
      showToast('Please enter a pass token to scan.', 'warning');
      return;
    }

    setIsScanningAnim(true);
    setTimeout(() => {
      setIsScanningAnim(false);
      const res = checkInPass(token);
      setScanResult(res);

      if (res.success && !res.isMismatch) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      }
    }, 600);
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    showToast('Pass token copied to clipboard!', 'info');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      
      {/* Header with Role & View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ff5722]/15 text-[#ff7043] border border-[#ff5722]/30 uppercase tracking-wider mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital QR Credentials & Campus Gate System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            QR Passes & Gate Verification
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Students generate official QR passes for college visits and events. College gate personnel scan and approve entrance with real-time verification.
          </p>
        </div>

        {/* View Switcher Pill: Student Passes vs College Gate Scanner */}
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <button
            onClick={() => setActiveView('passes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'passes'
                ? 'bg-gradient-to-r from-[#ff5722] to-[#ff7043] text-white shadow-md shadow-[#ff5722]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student QR Passes ({myPasses.length})</span>
          </button>

          <button
            onClick={() => setActiveView('scanner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'scanner'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>College Gate Scanner</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          VIEW 1: STUDENT QR PASSES & CAMPUS VISIT GENERATOR
          ===================================================================== */}
      {activeView === 'passes' && (
        <div className="space-y-6">
          
          {/* Action Callout Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-[#ff5722]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff7043]">
                <Sparkles className="w-4 h-4" />
                <span>Instant College Visit Pass Generation</span>
              </div>
              <h2 className="text-xl font-black text-white">Need to visit an engineering campus in Ghaziabad or NCR?</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate an official QR visit pass for any partner college (e.g. <strong>AKGEC</strong>, <strong>KIET</strong>, <strong>ABES</strong>, <strong>MITS</strong>, <strong>NIET</strong>). Present your QR code at the campus security gate for immediate clearance.
              </p>
            </div>

            <button
              onClick={() => setShowGenerateModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white text-xs font-bold transition shadow-lg shadow-[#ff5722]/30 flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Generate College Visit QR Pass</span>
            </button>
          </div>

          {/* Student Profile & Pass Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setPassFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${passFilter === 'ALL' ? 'bg-[#ff5722] text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
              >
                All Passes ({myPasses.length})
              </button>
              <button
                onClick={() => setPassFilter('COLLEGE_VISIT')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${passFilter === 'COLLEGE_VISIT' ? 'bg-[#ff5722] text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
              >
                College Visits ({myPasses.filter(p => p.passType === 'COLLEGE_VISIT').length})
              </button>
              <button
                onClick={() => setPassFilter('EVENT_PASS')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${passFilter === 'EVENT_PASS' ? 'bg-[#ff5722] text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
              >
                Event Hackathons ({myPasses.filter(p => p.passType !== 'COLLEGE_VISIT').length})
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Showing credentials for: <strong className="text-white">{currentUser?.name}</strong> ({currentUser?.collegeName || 'Student'})
            </div>
          </div>

          {/* Passes Grid */}
          {filteredMyPasses.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-[#ff7043]">
                <QrCode className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">No passes found in this filter</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Generate an official College Visit Pass to explore partner labs and campuses, or register for an inter-college event.
              </p>
              <button
                onClick={() => setShowGenerateModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#ff5722] hover:bg-[#ea580c] text-white text-xs font-bold transition"
              >
                + Generate First Visit Pass
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyPasses.map(pass => {
                const isVisit = pass.passType === 'COLLEGE_VISIT';

                return (
                  <div
                    key={pass.token}
                    className={`glass-card p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
                      pass.used
                        ? 'border-slate-800 bg-slate-950/70 opacity-75'
                        : isVisit
                        ? 'border-[#ff5722]/40 hover:border-[#ff5722] shadow-lg shadow-[#ff5722]/5'
                        : 'border-purple-500/40 hover:border-purple-500'
                    }`}
                  >
                    <div>
                      {/* Top Type & Status */}
                      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          isVisit 
                            ? 'bg-orange-500/20 text-[#ff7043] border-orange-500/30' 
                            : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        }`}>
                          {isVisit ? 'Campus Visit Pass' : 'Event Pass'}
                        </span>

                        {pass.used ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                            Checked In
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 animate-pulse">
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Valid at Gate</span>
                          </span>
                        )}
                      </div>

                      {/* College / Event Title */}
                      <div className="mt-3 space-y-1">
                        <h3 className="text-base font-bold text-white leading-tight">
                          {isVisit ? pass.targetCollegeName : pass.eventTitle}
                        </h3>
                        <p className="text-xs text-slate-300 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-[#ff7043]" />
                          <span>{isVisit ? `${pass.targetCollegeCity} Campus` : pass.hostCollegeName}</span>
                        </p>
                      </div>

                      {/* Interactive QR Code Container */}
                      <div 
                        onClick={() => setSelectedPassForModal(pass)}
                        className="my-3 p-3 bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:scale-[1.02] transition shadow-md"
                        title="Click to view full pass"
                      >
                        <QRCodeSVG value={pass.token} size={135} level="H" />
                        <span className="text-[10px] font-mono font-bold text-slate-800 mt-1.5 tracking-wider">
                          {pass.token}
                        </span>
                      </div>

                      {/* Pass Details */}
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
                        {isVisit ? (
                          <>
                            <div className="flex justify-between items-center text-slate-300">
                              <span className="text-slate-400 text-[11px]">Gate:</span>
                              <span className="font-semibold text-right truncate max-w-[170px]" title={pass.gateLocation}>
                                {pass.gateLocation || 'Main Entrance'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300">
                              <span className="text-slate-400 text-[11px]">Purpose:</span>
                              <span className="text-amber-300 font-semibold text-right truncate max-w-[170px]">
                                {pass.purpose || 'Campus Visit'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300">
                              <span className="text-slate-400 text-[11px]">Visit Date:</span>
                              <span className="font-semibold text-white">{pass.visitDate}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between items-center text-slate-300">
                            <span className="text-slate-400 text-[11px]">Event Host:</span>
                            <span className="font-semibold text-right truncate max-w-[170px]">
                              {pass.hostCollegeName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedPassForModal(pass)}
                          className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition"
                        >
                          View Full Pass
                        </button>
                        <button
                          onClick={() => handleCopy(pass.token)}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                          title="Copy Token"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Fast Gate Test Button: Instantly simulates the college security scanning this pass! */}
                      <button
                        onClick={() => {
                          setActiveView('scanner');
                          setInputToken(pass.token);
                          handleValidateToken(pass.token);
                        }}
                        className="w-full py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 hover:text-white text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Simulate Scan at {isVisit ? pass.targetCollegeCity : 'Host'} Gate ➔</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* =====================================================================
          VIEW 2: COLLEGE GATE SCANNER & SECURITY TERMINAL
          Used by the person at the college gate to scan and verify student QR
          ===================================================================== */}
      {activeView === 'scanner' && (
        <div className="space-y-6">
          
          {/* Active Terminal Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Live Campus Gate Terminal</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Operating Gate Station for:{' '}
                  <strong className="text-emerald-300">
                    {currentUser?.role === 'college_admin' ? currentUser.collegeName : 'Verified Security Inspector Desk'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              Scanned Today:{' '}
              <span className="font-bold text-white">{passes.filter(p => p.used).length} Visitors</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Scanner Terminal (Input & Camera Viewfinder) */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6">
              
              <div>
                <h3 className="text-base font-bold text-white">Scan Visitor QR Code</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Align student's QR pass or paste/enter the pass token below to grant entrance clearance.
                </p>
              </div>

              {/* Animated Interactive Viewfinder */}
              <div className="relative h-56 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center shadow-inner">
                {/* Viewfinder Target Frame */}
                <div className="relative w-40 h-40 border-2 border-emerald-500/60 rounded-xl flex items-center justify-center p-2">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                  {/* Laser Scan Line */}
                  <div className={`absolute inset-x-2 h-0.5 bg-emerald-400 shadow-[0_0_12px_#10b981] ${isScanningAnim ? 'animate-bounce' : 'animate-pulse'}`}></div>

                  <QrCode className="w-16 h-16 text-slate-700/50" />
                </div>

                <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center gap-1.5">
                  <ScanLine className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>Optical Gate Reader Ready</span>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={(e) => { e.preventDefault(); handleValidateToken(); }} className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Enter or Paste Student Pass Token
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <QrCode className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. CB-VISIT-48912-AKGEC"
                      value={inputToken}
                      onChange={(e) => setInputToken(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isScanningAnim}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Scan at Gate</span>
                  </button>
                </div>
              </form>

              {/* Scan Result Feedback Alert */}
              {scanResult && (
                <div className={`p-4 rounded-2xl border animate-fade-in space-y-3 ${
                  scanResult.status === 'VERIFIED'
                    ? scanResult.isMismatch 
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' 
                      : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {scanResult.status === 'VERIFIED' ? (
                        scanResult.isMismatch ? (
                          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-xs font-bold">
                          {scanResult.status === 'VERIFIED'
                            ? scanResult.isMismatch 
                              ? 'Pass Verified with Campus Warning' 
                              : 'Gate Entry Approved'
                            : scanResult.status === 'ALREADY_USED'
                            ? 'Duplicate Scan Denied'
                            : 'Invalid Pass Token'}
                        </div>
                        <div className="text-[11px] text-slate-300">{scanResult.message}</div>
                      </div>
                    </div>
                  </div>

                  {/* Warning message if scanned at wrong college */}
                  {scanResult.mismatchWarning && (
                    <div className="p-2.5 rounded-xl bg-amber-900/40 border border-amber-500/40 text-[11px] text-amber-200 font-semibold">
                      {scanResult.mismatchWarning}
                    </div>
                  )}

                  {/* Pass Details preview */}
                  {scanResult.pass && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 text-slate-300">
                      <div><strong>Visitor:</strong> {scanResult.pass.studentName} ({scanResult.pass.studentCollege})</div>
                      <div><strong>Target Campus:</strong> {scanResult.pass.targetCollegeName || scanResult.pass.hostCollegeName}</div>
                      <div><strong>Purpose:</strong> {scanResult.pass.purpose || 'Event Participation'}</div>
                      <div><strong>Checked-In At:</strong> {new Date(scanResult.pass.checkedInAt).toLocaleTimeString()} by {scanResult.pass.checkedInBy}</div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right: Quick Gate Test Simulator & Incoming Visitors List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quick Scan Authorized Visitors</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">1-Click Test</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Click any student visitor pass below to instantly simulate scanning their QR code at the campus security gate:
                </p>

                {/* List of passes ready for scanning */}
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {passes.slice(0, 8).map(p => (
                    <div
                      key={p.token}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate">
                        <div className="font-bold text-white truncate">{p.studentName}</div>
                        <div className="text-[10px] text-emerald-300 truncate">
                          Visiting: {p.targetCollegeName ? p.targetCollegeName.split(' ')[0] : p.hostCollegeName?.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{p.token}</div>
                      </div>

                      <button
                        onClick={() => {
                          setInputToken(p.token);
                          handleValidateToken(p.token);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition flex items-center gap-1 ${
                          p.used 
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' 
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{p.used ? 'Re-scan' : 'Scan'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =====================================================================
          GENERATE COLLEGE VISIT PASS MODAL
          ===================================================================== */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#ff5722]/20 border border-[#ff5722]/40 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-[#ff5722]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Generate College Visit Pass</h2>
                  <p className="text-xs text-slate-400">Official campus entry clearance with QR token</p>
                </div>
              </div>

              <button
                onClick={() => setShowGenerateModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleGenerateVisitPassSubmit} className="space-y-4">
              
              {/* Target College Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select College to Visit <span className="text-[#ff7043]">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={targetColId}
                    onChange={(e) => setTargetColId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
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

              {/* Visit Purpose */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Purpose of Campus Visit <span className="text-[#ff7043]">*</span>
                </label>
                <select
                  value={visitPurpose}
                  onChange={(e) => setVisitPurpose(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ff5722]"
                >
                  <option value="Campus Tour & Admission Counseling">Campus Tour & Admission Counseling</option>
                  <option value="Advanced Robotics & Hardware Lab Exploration">Advanced Robotics & Hardware Lab Exploration</option>
                  <option value="Faculty Academic Consultation & Research">Faculty Academic Consultation & Research</option>
                  <option value="Digital Library & Journal Access Terminal">Digital Library & Journal Access Terminal</option>
                  <option value="Cross-Campus Hackathon & Project Coordination">Cross-Campus Hackathon & Project Coordination</option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Time Window
                  </label>
                  <select
                    value={visitTimeSlot}
                    onChange={(e) => setVisitTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="10:00 AM - 01:00 PM (Morning Window)">10:00 AM - 01:00 PM (Morning)</option>
                    <option value="02:00 PM - 05:00 PM (Afternoon Window)">02:00 PM - 05:00 PM (Afternoon)</option>
                    <option value="Full Day (10:00 AM - 05:00 PM)">Full Day (10:00 AM - 05:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Visitor Identity summary */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-[11px] text-slate-400 font-semibold block">Visitor Identity:</span>
                <div className="text-white font-bold">{currentUser?.name}</div>
                <div className="text-[11px] text-[#ff7043]">{currentUser?.collegeName} · {currentUser?.branch}</div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-[#ff5722]/30 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Generate Official QR Code 🚀</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Render Individual Pass Modal */}
      {selectedPassForModal && (
        <QRPassModal
          pass={selectedPassForModal}
          onClose={() => setSelectedPassForModal(null)}
        />
      )}

    </div>
  );
}
