import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileKey,
  ShieldCheck,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Lock,
  Plus
} from 'lucide-react';

export default function AccessRequestsPage({ setActiveTab, setSelectedCollegeId }) {
  const {
    currentUser,
    accessRequests,
    decideAccessRequest,
    colleges
  } = useApp();

  const isCollegeAdmin = currentUser.role === 'college_admin';

  // Filter requests depending on role
  const relevantRequests = isCollegeAdmin
    ? accessRequests.filter(r => r.targetCollegeId === currentUser.collegeId)
    : accessRequests.filter(r => r.studentId === currentUser.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Feature 03: Permission & Access Control
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {isCollegeAdmin ? 'Student Access Approvals' : 'My Campus Resource Passes'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isCollegeAdmin
              ? `Review and grant permission for high-spec labs, maker spaces, and digital libraries at ${currentUser.collegeName}.`
              : 'Track permission requests submitted to regional partner colleges for research labs, maker facilities, and equipment.'}
          </p>
        </div>

        {!isCollegeAdmin && (
          <button
            onClick={() => setActiveTab('explore')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Request New Lab/Campus Access</span>
          </button>
        )}
      </div>

      {/* Overview Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/50 border border-indigo-500/20 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Secure Inter-College Permission Pipeline</div>
            <div className="text-[11px] text-slate-300">
              Colleges retain absolute sovereignty over restricted resources; students receive single-auth digital pass codes upon approval.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Approved: <strong className="text-emerald-400">{relevantRequests.filter(r => r.status === 'approved').length}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Pending: <strong className="text-amber-400">{relevantRequests.filter(r => r.status === 'pending').length}</strong>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {relevantRequests.map(req => {
          const isPending = req.status === 'pending';
          const isApproved = req.status === 'approved';
          const isRejected = req.status === 'rejected';

          return (
            <div
              key={req.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isApproved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : isRejected ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                    {isApproved ? <CheckCircle2 className="w-5 h-5" /> : isRejected ? <XCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                      {req.targetCollegeName}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{req.resourceTitle}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Requested by <strong>{req.studentName}</strong> ({req.studentCollege}) on {new Date(req.requestedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isApproved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : isRejected ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                    {req.status}
                  </span>
                  {req.accessPassCode && (
                    <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      Pass Code: {req.accessPassCode}
                    </span>
                  )}
                </div>
              </div>

              {/* Purpose & Remarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                  <div className="text-slate-400 font-semibold mb-1">Student Purpose:</div>
                  <p>{req.purpose}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                  <div className="text-slate-400 font-semibold mb-1">College Admin Remarks:</div>
                  <p className={req.decisionRemarks ? 'text-white' : 'text-slate-500 italic'}>
                    {req.decisionRemarks || 'Awaiting administration decision.'}
                  </p>
                </div>
              </div>

              {/* Admin Actions */}
              {isCollegeAdmin && isPending && (
                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => decideAccessRequest(req.id, 'rejected', 'Declined due to lab schedule conflict.')}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                  <button
                    onClick={() => decideAccessRequest(req.id, 'approved', 'Permission approved. Report to lab supervisor with student ID.')}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve Access Pass
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {relevantRequests.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
            <FileKey className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Permission Requests</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Explore colleges to submit access requests for advanced research labs, computing clusters, and workshops.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
