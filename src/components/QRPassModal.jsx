import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, CheckCircle, Copy, AlertTriangle, ShieldCheck, Download, Calendar, MapPin, Building2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QRPassModal({ pass, onClose }) {
  const { showToast } = useApp();
  if (!pass) return null;

  const copyToken = () => {
    navigator.clipboard.writeText(pass.token);
    showToast('Pass token copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top Header Banner */}
        <div className={`p-4 text-white flex items-center justify-between ${pass.used ? 'bg-gradient-to-r from-slate-700 to-slate-800' : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600'}`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-200" />
            <span className="font-semibold text-sm tracking-wide uppercase">Official CampusBridge Event Pass</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="px-6 pt-4 pb-2 text-center">
          {pass.used ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              ALREADY CHECKED IN (USED)
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" />
              VALID · READY FOR SCANNING
            </div>
          )}
        </div>

        {/* Pass Card Body */}
        <div className="p-6 pt-2 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white leading-snug">{pass.eventTitle}</h3>
            <p className="text-xs text-indigo-300 mt-1 flex items-center justify-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              Organized by {pass.hostCollegeName}
            </p>
          </div>

          {/* QR Code container */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner my-2">
            <QRCodeSVG
              value={pass.token}
              size={180}
              level="H"
              includeMargin={true}
            />
            <p className="text-[11px] font-mono font-bold text-slate-800 mt-2 tracking-wider">
              {pass.token}
            </p>
          </div>

          {/* Attendee Details */}
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60 text-xs space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
              <span className="text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3" /> Attendee
              </span>
              <span className="font-semibold text-white">{pass.studentName}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
              <span className="text-slate-400">Campus</span>
              <span className="font-medium text-slate-200 text-right truncate max-w-[200px]" title={pass.studentCollege}>
                {pass.studentCollege}
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
              <span className="text-slate-400">Branch</span>
              <span className="text-slate-300">{pass.studentBranch}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Pass Issued</span>
              <span className="text-slate-400">
                {new Date(pass.registeredAt).toLocaleDateString()}
              </span>
            </div>

            {pass.used && (
              <div className="mt-2 pt-2 border-t border-rose-500/20 text-rose-300 text-[11px]">
                Scanned & checked in at: {new Date(pass.checkedInAt).toLocaleString()}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={copyToken}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Token
            </button>
            <button
              onClick={() => {
                showToast('Pass image downloaded to your device!', 'success');
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-lg shadow-indigo-600/30"
            >
              <Download className="w-3.5 h-3.5" />
              Save Pass
            </button>
          </div>
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Present this QR pass at the entrance. Pass is single-use and non-transferable.
        </div>
      </div>
    </div>
  );
}
