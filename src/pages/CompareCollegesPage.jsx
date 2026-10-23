import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Building2,
  Trash2,
  Plus,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Award,
  ArrowRight,
  TrendingUp,
  DollarSign,
  GraduationCap
} from 'lucide-react';

export default function CompareCollegesPage({ setActiveTab, setSelectedCollegeId }) {
  const { colleges, compareList, toggleCompare, clearCompare } = useApp();
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedColleges = colleges.filter(c => compareList.includes(c.id));
  const availableColleges = colleges.filter(c => !compareList.includes(c.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Feature 01: Side-by-Side Analysis</div>
          <h1 className="text-3xl font-extrabold text-white">Compare Colleges & Programs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate up to 3 colleges side-by-side on fees, placement track record, accreditations, and cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              Clear Comparison ({compareList.length})
            </button>
          )}

          {compareList.length < 3 && (
            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              Add College ({compareList.length}/3)
            </button>
          )}
        </div>
      </div>

      {/* College Quick Selector Dropdown / Tray */}
      {selectorOpen && (
        <div className="glass-panel p-4 rounded-2xl border border-indigo-500/30 space-y-3 animate-fade-in">
          <div className="text-xs font-semibold text-white flex items-center justify-between">
            <span>Select a college to add to side-by-side comparison:</span>
            <button onClick={() => setSelectorOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {availableColleges.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  toggleCompare(c.id);
                  if (compareList.length + 1 >= 3) setSelectorOpen(false);
                }}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center gap-2.5 transition"
              >
                <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{c.city} · {c.accreditation}</div>
                </div>
                <Plus className="w-4 h-4 text-indigo-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* When no colleges in compare */}
      {selectedColleges.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
          <Layers className="w-12 h-12 text-indigo-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Colleges Selected for Comparison</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Choose 2 or 3 colleges from our regional directory (e.g., Meerut, Noida, Delhi) to see a comprehensive side-by-side metric comparison.
          </p>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            Explore & Select Colleges <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Comparison Grid */
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[750px] space-y-6">
            
            {/* College Cards Header Row */}
            <div className={`grid gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {/* Metric Label Column */}
              <div className="p-4 flex flex-col justify-end text-xs font-bold text-slate-400 uppercase tracking-wider">
                Comparison Metric
              </div>

              {/* College Cards */}
              {selectedColleges.map(c => (
                <div key={c.id} className="glass-card p-5 rounded-2xl border border-slate-800 relative flex flex-col justify-between">
                  <button
                    onClick={() => toggleCompare(c.id)}
                    className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Remove from comparison"
                  >
                    ✕
                  </button>

                  <div>
                    <img src={c.logo} alt={c.name} className="w-12 h-12 rounded-xl object-cover mb-3 border border-slate-700" />
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">{c.city}, {c.state}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-2">{c.name}</h3>
                    <div className="text-[11px] text-slate-300 mt-1 font-medium">{c.accreditation}</div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCollegeId(c.id);
                      setActiveTab('college-detail');
                    }}
                    className="mt-4 w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1"
                  >
                    <span>Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Metric Rows */}
            <div className="glass-panel rounded-2xl border border-slate-800 divide-y divide-slate-800 text-xs">
              
              {/* 1. CSE B.Tech Annual Fee */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-indigo-400" />
                  <span>B.Tech CSE Annual Fee</span>
                </div>
                {selectedColleges.map(c => {
                  const cse = c.courses.find(crs => crs.branch === 'CSE') || c.courses[0];
                  return (
                    <div key={c.id} className="font-bold text-white">
                      ₹{cse?.annualFee?.toLocaleString()} <span className="text-slate-400 font-normal">/year</span>
                    </div>
                  );
                })}
              </div>

              {/* 2. Average Placement Package */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Average Package</span>
                </div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="font-bold text-indigo-300 text-sm">
                    {c.placementStats.avgPackage}
                  </div>
                ))}
              </div>

              {/* 3. Highest Placement Package */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300">Highest Salary Package</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="font-bold text-emerald-400 text-sm">
                    {c.placementStats.highestPackage}
                  </div>
                ))}
              </div>

              {/* 4. Placement Rate */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300">Placement Success Rate</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="font-semibold text-slate-200">
                    {c.placementStats.placementRate}
                  </div>
                ))}
              </div>

              {/* 5. Accepted Entrance Exams */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300">Accepted Entrance Exams</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="text-slate-300">
                    {c.admissionDetails.entranceExams.join(', ')}
                  </div>
                ))}
              </div>

              {/* 6. Hostel & Mess Cost */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300">Hostel & Mess per Year</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="text-slate-200">
                    ₹{c.admissionDetails.hostelFeePerYear.toLocaleString()}
                  </div>
                ))}
              </div>

              {/* 7. Campus Size */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300">Campus Infrastructure Size</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="text-slate-300">
                    {c.campusSize}
                  </div>
                ))}
              </div>

              {/* 8. Top Recruiters */}
              <div className={`grid p-4 items-start gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-300">Key Recruiting Companies</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="flex flex-wrap gap-1">
                    {c.placementStats.topRecruiters.slice(0, 4).map(r => (
                      <span key={r} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {r}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              {/* 9. Transparency & Last Checked Date */}
              <div className={`grid p-4 items-center gap-4 ${selectedColleges.length === 1 ? 'grid-cols-2' : selectedColleges.length === 2 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                <div className="font-semibold text-slate-400">Data Verification Date</div>
                {selectedColleges.map(c => (
                  <div key={c.id} className="text-[11px] text-slate-400">
                    Last audited on {c.lastCheckedDate}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
