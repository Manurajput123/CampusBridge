import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  CheckCircle,
  Copy,
  AlertTriangle,
  ShieldCheck,
  Download,
  Calendar,
  MapPin,
  Building2,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QRPassModal({ pass, onClose }) {
  const { showToast } = useApp();
  if (!pass) return null;

  const isVisitPass = pass.passType === 'COLLEGE_VISIT';

  const copyToken = () => {
    navigator.clipboard.writeText(pass.token);
    showToast('Pass token copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Header Banner */}
        <div className={`p-4 text-white flex items-center justify-between ${
          pass.used 
            ? 'bg-slate-800' 
            : isVisitPass 
            ? 'bg-gradient-to-r from-[#ff5722] to-[#ff7043]' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span className="font-bold text-xs tracking-wider uppercase">
              {isVisitPass ? 'Campus Visit Authorization Pass' : 'Inter-College Event Pass'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="px-6 pt-4 pb-2 text-center">
          {pass.used ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>ALREADY CHECKED IN (USED)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>VALID · READY FOR GATE SCANNING</span>
            </div>
          )}
        </div>

        {/* Pass Card Body */}
        <div className="p-6 pt-2 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-black text-white leading-snug">
              {isVisitPass ? pass.targetCollegeName : pass.eventTitle}
            </h3>
            <p className="text-xs text-[#ff7043] mt-1 flex items-center justify-center gap-1 font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isVisitPass ? `Campus Gate: ${pass.gateLocation || 'Main Entrance'}` : `Organized by ${pass.hostCollegeName}`}</span>
            </p>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl my-2">
            <QRCodeSVG
              value={pass.token}
              size={175}
              level="H"
              includeMargin={true}
            />
            <p className="text-xs font-mono font-bold text-slate-900 mt-2 tracking-wider">
              {pass.token}
            </p>
          </div>

          {/* Details Box */}
          <div className="bg-slate-950/70 rounded-2xl p-3.5 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3 text-[#ff7043]" /> Visitor / Student
              </span>
              <span className="font-bold text-white">{pass.studentName}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">Home College</span>
              <span className="font-medium text-slate-200 text-right truncate max-w-[200px]" title={pass.studentCollege}>
                {pass.studentCollege}
              </span>
            </div>

            {isVisitPass && (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Purpose
                  </span>
                  <span className="font-semibold text-amber-300 text-right truncate max-w-[200px]">
                    {pass.purpose || 'Campus Tour'}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Date & Window
                  </span>
                  <span className="text-slate-300 font-medium">
                    {pass.visitDate} · {pass.timeSlot || '10 AM - 1 PM'}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Generated On</span>
              <span className="text-slate-400 font-mono text-[11px]">
                {new Date(pass.registeredAt).toLocaleDateString()}
              </span>
            </div>

            {pass.used && (
              <div className="mt-2 pt-2 border-t border-rose-500/30 text-rose-300 text-[11px] font-medium">
                Scanned & checked in at: {new Date(pass.checkedInAt).toLocaleString()} by {pass.checkedInBy || 'Gate Security'}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={copyToken}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Token</span>
            </button>
            <button
              onClick={() => {
                showToast('Pass saved! Present this QR code at campus gate.', 'success');
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff7043] hover:brightness-110 text-white text-xs font-bold transition shadow-lg shadow-[#ff5722]/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Pass</span>
            </button>
          </div>
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Show this QR code to the security personnel at the college gate for instant verification.
        </div>
      </div>
    </div>
  );
}
