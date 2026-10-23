import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
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
  ExternalLink
} from 'lucide-react';
import QRPassModal from '../components/QRPassModal';

export default function StudentDashboardPage({ setActiveTab }) {
  const { passes, currentUser, showToast } = useApp();
  const [selectedPass, setSelectedPass] = useState(null);

  const myPasses = passes.filter(p => p.studentId === currentUser.id);

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    showToast('Pass token copied to clipboard!', 'info');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Student Identity & Passes
          </div>
          <h1 className="text-3xl font-extrabold text-white">My Event Passes & Credentials</h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified digital entry passes with cryptographic single-use QR tokens for inter-college hackathons and conclaves.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('events')}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
        >
          <span>Browse More Inter-College Events</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Student Profile Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/50"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
            <div className="text-xs text-indigo-300 font-medium">
              {currentUser.branch || 'Engineering Student'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Campus: <strong>{currentUser.collegeName}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-center">
            <span className="text-[10px] text-slate-400 block">Active Passes</span>
            <span className="text-base font-bold text-white">{myPasses.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-center">
            <span className="text-[10px] text-slate-400 block">Verified Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-center mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
            </span>
          </div>
        </div>
      </div>

      {/* Passes Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <QrCode className="w-5 h-5 text-indigo-400" />
          <span>Issued Passes ({myPasses.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myPasses.map(pass => (
            <div
              key={pass.token}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                    {pass.hostCollegeName}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 leading-snug">
                    {pass.eventTitle}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Issued to {pass.studentName} on {new Date(pass.registeredAt).toLocaleDateString()}
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pass.used ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                  {pass.used ? 'USED' : 'READY TO SCAN'}
                </span>
              </div>

              {/* QR Mini Preview and Details */}
              <div className="flex items-center gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="bg-white p-2 rounded-lg shrink-0">
                  <QRCodeSVG value={pass.token} size={70} level="M" />
                </div>
                <div className="min-w-0 flex-1 text-xs space-y-1">
                  <div className="font-mono text-[11px] font-bold text-indigo-300 truncate">
                    {pass.token}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Valid for 1 admission at venue entrance
                  </div>
                  {pass.used && (
                    <div className="text-rose-400 text-[10px] font-semibold">
                      Checked in: {new Date(pass.checkedInAt).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedPass(pass)}
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  View Full QR Pass
                </button>
                <button
                  onClick={() => handleCopy(pass.token)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  title="Copy Pass Token"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {myPasses.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
            <QrCode className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Event Passes Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't registered for any events yet. Check out the inter-college hackathons and claim your entry pass!
            </p>
            <button
              onClick={() => setActiveTab('events')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Explore Events
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPass && (
        <QRPassModal
          pass={selectedPass}
          onClose={() => setSelectedPass(null)}
        />
      )}

    </div>
  );
}
