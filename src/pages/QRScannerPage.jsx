import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  User,
  Building2,
  Calendar,
  Clock,
  RotateCcw
} from 'lucide-react';

export default function QRScannerPage() {
  const { passes, checkInPass, currentUser } = useApp();

  const [inputToken, setInputToken] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleScanSubmit = (e) => {
    e?.preventDefault();
    if (!inputToken.trim()) return;

    const result = checkInPass(inputToken);
    setScanResult(result);

    if (result.success) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  const handleQuickTest = (token) => {
    setInputToken(token);
    const result = checkInPass(token);
    setScanResult(result);

    if (result.success) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Organizer Gate Scanner & Check-in Verification</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Event Pass Scanner</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Verify digital passes at the event entrance. Protect against duplicate scans and counterfeit badges.
        </p>
      </div>

      {/* Main Scanner Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <form onSubmit={handleScanSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Scan QR Code or Enter Pass Token
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <QrCode className="w-5 h-5 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. CB-PASS-78492-X or paste full token..."
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white font-mono placeholder-slate-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                Validate Check-in
              </button>
            </div>
          </div>
        </form>

        {/* Scan Result Feedback Panel */}
        {scanResult && (
          <div className="animate-fade-in pt-4 border-t border-slate-800">
            {scanResult.success ? (
              /* Success Card */
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Pass Authenticated</span>
                    <h3 className="text-xl font-black text-white">CHECK-IN SUCCESSFUL</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-emerald-900/30 p-4 rounded-xl border border-emerald-500/20">
                  <div>
                    <span className="text-emerald-400 block text-[11px]">Attendee</span>
                    <strong className="text-white text-sm">{scanResult.pass.studentName}</strong>
                    <div className="text-emerald-300">{scanResult.pass.studentCollege}</div>
                  </div>
                  <div>
                    <span className="text-emerald-400 block text-[11px]">Event Title</span>
                    <strong className="text-white text-sm">{scanResult.pass.eventTitle}</strong>
                    <div className="text-emerald-300">Checked in at: {new Date(scanResult.pass.checkedInAt).toLocaleTimeString()}</div>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Pass has now been marked as used. Any subsequent attempt will be rejected.</span>
                </div>
              </div>
            ) : (
              /* Rejection / Error Card */
              <div className={`p-6 rounded-2xl border text-white space-y-4 ${scanResult.status === 'ALREADY_USED' ? 'bg-rose-950/70 border-rose-500/50' : 'bg-amber-950/70 border-amber-500/50'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Security Violation / Rejection</span>
                    <h3 className="text-xl font-black text-white">ENTRY REJECTED</h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-rose-200">
                  {scanResult.message}
                </p>

                {scanResult.pass && (
                  <div className="bg-rose-900/30 p-3.5 rounded-xl border border-rose-500/30 text-xs space-y-1 text-rose-200">
                    <div><strong>Original Holder:</strong> {scanResult.pass.studentName} ({scanResult.pass.studentCollege})</div>
                    <div><strong>Initial Check-in Time:</strong> {new Date(scanResult.pass.checkedInAt).toLocaleString()}</div>
                    <div><strong>Checked-in By Organizer:</strong> {scanResult.pass.checkedInBy || 'Gate Admin'}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 1-Click Demo Testing Buttons for Presentation */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Quick Test Pass Tokens (Click to test instant validation & duplicate rejection):</span>
            <span className="text-[11px] text-slate-500">Live Hackathon Tester</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {passes.slice(0, 4).map(p => (
              <button
                key={p.token}
                onClick={() => handleQuickTest(p.token)}
                className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition ${p.used ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500' : 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500'}`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{p.studentName}</span>
                    <span className="font-mono text-[10px] text-slate-400">({p.token})</span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">{p.eventTitle}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{p.studentCollege}</div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${p.used ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {p.used ? 'USED (Will Reject)' : 'VALID (Ready)'}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
