import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BellRing,
  Building2,
  Send,
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  User,
  ExternalLink,
  Plus,
  Radio,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function InterCollegeNoticesPage({ setActiveTab }) {
  const { notices, createNotice, colleges, currentUser, showToast } = useApp();

  const isCollegeAdmin = currentUser.role === 'college_admin';

  // Sub-tabs: 'my_campus_inbound' | 'all_regional' | 'dispatch_new'
  const [activeTab, setActiveTabLocal] = useState('my_campus_inbound');

  // Dispatch Form State (Feature: College sending information to other selected colleges)
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Pool Campus Placement');
  const [noticeSummary, setNoticeSummary] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeDeadline, setNoticeDeadline] = useState('November 20, 2026');
  const [noticeContactPerson, setNoticeContactPerson] = useState(currentUser.name || 'Dean of Academic Relations');
  const [noticeContactEmail, setNoticeContactEmail] = useState(currentUser.email || 'relations@college.edu.in');
  const [targetScope, setTargetScope] = useState('SELECTED_COLLEGES');
  const [selectedColleges, setSelectedColleges] = useState([
    "col-meerut-1",
    "col-noida-1"
  ]);

  // Filter notices for current user's campus
  const myCampusNotices = notices.filter(n => {
    if (n.targetScope === 'ALL') return true;
    if (currentUser.collegeId && n.targetColleges?.includes(currentUser.collegeId)) return true;
    return false;
  });

  const toggleTargetCollege = (id) => {
    if (selectedColleges.includes(id)) {
      setSelectedColleges(prev => prev.filter(cId => cId !== id));
    } else {
      setSelectedColleges(prev => [...prev, id]);
    }
  };

  const handleDispatchNotice = (e) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      showToast('Please provide a circular title and information content.', 'warning');
      return;
    }

    if (targetScope === 'SELECTED_COLLEGES' && selectedColleges.length === 0) {
      showToast('Please select at least one recipient college.', 'warning');
      return;
    }

    createNotice({
      title: noticeTitle,
      category: noticeCategory,
      summary: noticeSummary || noticeTitle,
      content: noticeContent,
      deadline: noticeDeadline,
      contactPerson: noticeContactPerson,
      contactEmail: noticeContactEmail,
      targetScope,
      targetColleges: targetScope === 'ALL' ? ['ALL'] : selectedColleges
    });

    setNoticeTitle('');
    setNoticeSummary('');
    setNoticeContent('');
    setActiveTabLocal('all_regional');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Inter-College Information & Circular Network
          </div>
          <h1 className="text-3xl font-extrabold text-white">Cross-Campus Bulletins & Information Sharing</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Colleges can directly dispatch official academic circulars, pooled placement announcements, and shared research lab access notifications to selected partner campuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCollegeAdmin && (
            <button
              onClick={() => setActiveTabLocal('dispatch_new')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition"
            >
              <Send className="w-4 h-4" />
              Dispatch New Information to Colleges
            </button>
          )}
        </div>
      </div>

      {/* Recipient College Persona Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <BellRing className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Direct Campus-to-Campus Communication Channel</div>
            <div className="text-[11px] text-slate-400">
              Active Persona: <strong className="text-white">{currentUser.name}</strong> ({currentUser.collegeName || 'All Campuses'})
            </div>
          </div>
        </div>

        <div className="text-[11px] text-indigo-300 font-semibold bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-500/30">
          Showing circulars received by {currentUser.collegeName?.split(' ')[0] || 'Your Campus'}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTabLocal('my_campus_inbound')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${activeTab === 'my_campus_inbound' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <BellRing className="w-4 h-4" />
          Received by My Campus ({myCampusNotices.length})
        </button>

        <button
          onClick={() => setActiveTabLocal('all_regional')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${activeTab === 'all_regional' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Radio className="w-4 h-4" />
          All Regional Inter-College Circulars ({notices.length})
        </button>

        <button
          onClick={() => setActiveTabLocal('dispatch_new')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${activeTab === 'dispatch_new' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-purple-300 hover:text-white'}`}
        >
          <Send className="w-4 h-4" />
          Send Information to Selected Colleges
        </button>
      </div>

      {/* TAB 1: Bulletins Received by My Campus */}
      {activeTab === 'my_campus_inbound' && (
        <div className="space-y-4">
          {myCampusNotices.map(notice => (
            <div key={notice.id} className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-wide">
                        {notice.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Dispatched by <strong>{notice.hostCollegeName}</strong> ({notice.hostCity})
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">{notice.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Circular
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <p className="font-medium text-white mb-2">{notice.summary}</p>
                <p className="text-slate-300 whitespace-pre-line">{notice.content}</p>
              </div>

              {/* Recipient Campuses Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-400 text-[11px]">Officially Sent To:</span>
                  {notice.targetCollegeNames?.map((colName, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-semibold">
                      🏛️ {colName}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-400">Action Deadline: <strong className="text-amber-300">{notice.deadline}</strong></span>
                  <a
                    href={`mailto:${notice.contactEmail}`}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Contact {notice.contactPerson?.split(' ')[0] || 'Official'}
                  </a>
                </div>
              </div>
            </div>
          ))}

          {myCampusNotices.length === 0 && (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
              <BellRing className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Circulars for {currentUser.collegeName}</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Check the "All Regional Inter-College Circulars" tab to browse communications from other campuses.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: All Regional Circulars */}
      {activeTab === 'all_regional' && (
        <div className="space-y-4">
          {notices.map(notice => (
            <div key={notice.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      From: <strong>{notice.hostCollegeName}</strong> ({notice.hostCity})
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{notice.title}</h3>
                </div>
                <span className="text-[11px] text-slate-500">Published: {notice.datePublished}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {notice.summary}
              </p>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400">Recipients:</span>
                  {notice.targetCollegeNames?.map((col, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {col}
                    </span>
                  ))}
                </div>
                <div className="text-slate-400">
                  POC: {notice.contactPerson} ({notice.contactEmail})
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DISPATCH NEW CIRCULAR TO SELECTED COLLEGES */}
      {activeTab === 'dispatch_new' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
              Institutional Information Broadcasting
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Dispatch Information / Circular to Selected Colleges
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select specific partner colleges (e.g. Noida, Ghaziabad, Meerut, Delhi) to send joint placement drives, research facility sharing, or academic notices.
            </p>
          </div>

          <form onSubmit={handleDispatchNotice} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Circular Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Joint Placement Pool Drive: TCS Digital & Infosys Specialized 2026"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                >
                  <option value="Pool Campus Placement" className="bg-slate-900">Pool Campus Placement</option>
                  <option value="Shared Research Facility" className="bg-slate-900">Shared Research Lab & Supercomputing</option>
                  <option value="Academic MoU & Collaboration" className="bg-slate-900">Academic MoU & Faculty Exchange</option>
                  <option value="Inter-College Workshop" className="bg-slate-900">Workshop & Masterclass Circular</option>
                  <option value="General Campus Notice" className="bg-slate-900">General Inter-College Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Response / Registration Deadline</label>
                <input
                  type="text"
                  value={noticeDeadline}
                  onChange={(e) => setNoticeDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>
            </div>

            {/* Target Colleges Selection Matrix */}
            <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    Select Target Recipient Colleges ({selectedColleges.length} Selected)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Only these selected colleges will receive this information bulletin in their official inbox.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pt-2">
                {colleges.filter(c => c.id !== currentUser.collegeId).map(col => {
                  const isChecked = selectedColleges.includes(col.id);
                  return (
                    <label
                      key={col.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition ${isChecked ? 'bg-purple-900/40 border-purple-500/70 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTargetCollege(col.id)}
                        className="rounded bg-slate-800 text-purple-600 focus:ring-0"
                      />
                      <span className="truncate">{col.name} ({col.city})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Official Name</label>
                <input
                  type="text"
                  value={noticeContactPerson}
                  onChange={(e) => setNoticeContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Official Contact Email</label>
                <input
                  type="email"
                  value={noticeContactEmail}
                  onChange={(e) => setNoticeContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">One-line Executive Summary</label>
              <input
                type="text"
                placeholder="Brief snapshot of the opportunity or shared facility..."
                value={noticeSummary}
                onChange={(e) => setNoticeSummary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Information Content *</label>
              <textarea
                rows="4"
                placeholder="Provide complete instructions, eligibility criteria, required documents, or lab reservation instructions..."
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                className="w-full p-3 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-purple-600/30 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Dispatch Official Circular to Selected Colleges
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
