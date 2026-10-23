import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Layers,
  FileKey,
  ExternalLink,
  Award,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Share2,
  Mail,
  Phone,
  ShieldAlert,
  Send
} from 'lucide-react';

export default function CollegeDetailPage({ collegeId, setActiveTab, onBack }) {
  const { colleges, compareList, toggleCompare, submitAccessRequest, currentUser, showToast } = useApp();
  const college = colleges.find(c => c.id === collegeId) || colleges[0];

  const [activeSubTab, setActiveSubTab] = useState('courses'); // 'courses' | 'admissions' | 'placements' | 'resources' | 'facilities'
  const [requestModalResource, setRequestModalResource] = useState(null);
  const [requestPurpose, setRequestPurpose] = useState('');

  const isComparing = compareList.includes(college.id);

  const handleAccessRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestPurpose.trim()) {
      showToast('Please describe your purpose for requesting campus access.', 'warning');
      return;
    }

    submitAccessRequest({
      targetCollegeId: college.id,
      resourceId: requestModalResource.id,
      resourceTitle: requestModalResource.title,
      purpose: requestPurpose
    });

    setRequestModalResource(null);
    setRequestPurpose('');
    setActiveTab('requests');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={onBack || (() => setActiveTab('explore'))}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explore Colleges
      </button>

      {/* Hero Banner Header */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
        <div className="h-64 sm:h-80 relative overflow-hidden">
          <img
            src={college.bannerImage}
            alt={college.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          {/* Quick Badges on Top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                {college.city}, {college.state}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Campus
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleCompare(college.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-md ${isComparing ? 'bg-indigo-600 text-white' : 'bg-slate-900/80 text-slate-200 border border-slate-700'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                {isComparing ? 'In Comparison' : 'Compare College'}
              </button>
            </div>
          </div>

          {/* Bottom Banner Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={college.logo}
                alt={college.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/50 bg-slate-900 shadow-xl"
              />
              <div>
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">{college.accreditation}</div>
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{college.name}</h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{college.tagLine}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={college.contact.website}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 backdrop-blur-md transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Official Website
              </a>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-800 border-t border-slate-800 bg-slate-900/60 p-4 text-center">
          <div>
            <div className="text-[11px] text-slate-400">Average Placement</div>
            <div className="text-base font-bold text-indigo-300">{college.placementStats.avgPackage}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Highest Package</div>
            <div className="text-base font-bold text-emerald-400">{college.placementStats.highestPackage}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Campus Size</div>
            <div className="text-base font-bold text-white">{college.campusSize}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Established</div>
            <div className="text-base font-bold text-white">{college.founded}</div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeSubTab === 'courses' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <GraduationCap className="w-4 h-4" />
          Courses & Fees ({college.courses.length})
        </button>

        <button
          onClick={() => setActiveSubTab('admissions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeSubTab === 'admissions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Calendar className="w-4 h-4" />
          Admission 2026-27 & Cutoffs
        </button>

        <button
          onClick={() => setActiveSubTab('placements')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeSubTab === 'placements' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Briefcase className="w-4 h-4" />
          Placements & Recruiters
        </button>

        <button
          onClick={() => setActiveSubTab('resources')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeSubTab === 'resources' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <FileKey className="w-4 h-4" />
          Restricted Labs & Permissions
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold">
            {college.restrictedResources?.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('facilities')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeSubTab === 'facilities' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Building2 className="w-4 h-4" />
          Campus Facilities
        </button>
      </div>

      {/* Tab 1: Courses & Fees */}
      {activeSubTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Degree Programs & Fee Structure</h2>
            <span className="text-xs text-slate-400">Verified official fee notifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {college.courses.map(course => (
              <div key={course.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {course.duration}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{course.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Annual Tuition</span>
                    <span className="text-base font-extrabold text-white">₹{course.annualFee.toLocaleString()}<span className="text-xs font-normal text-slate-400">/yr</span></span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Intake / Approved Seats:</span>
                    <span className="font-semibold text-white">{course.totalSeats} Seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Branch Package:</span>
                    <span className="font-semibold text-indigo-300">{course.averagePackage}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Eligibility:</span>
                    <span className="text-slate-200">{course.eligibility}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Admission 2026-27 & Cutoffs */}
      {activeSubTab === 'admissions' && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Admission Schedule & Process</h2>
              <p className="text-xs text-slate-400 mt-0.5">{college.admissionDetails.status}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Application Deadline</span>
              <span className="text-sm font-bold text-amber-300">{college.admissionDetails.applicationDeadline}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Accepted Entrance Examinations</h3>
              <div className="flex flex-wrap gap-2">
                {college.admissionDetails.entranceExams.map(exam => (
                  <span key={exam} className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                    ✓ {exam}
                  </span>
                ))}
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-white">Hostel & Accommodation Costs:</div>
                <div className="flex justify-between text-slate-300">
                  <span>Standard 2-Seater AC / Non-AC with Mess:</span>
                  <span className="font-bold text-white">₹{college.admissionDetails.hostelFeePerYear.toLocaleString()}/year</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Official Disclosure & Contact</h3>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>{college.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>{college.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{college.contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Placements & Recruiters */}
      {activeSubTab === 'placements' && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Placement Statistics & Top Recruiters</h2>
            <p className="text-xs text-slate-400 mt-0.5">Audited placement performance for recent batches</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">Average Salary</div>
              <div className="text-2xl font-black text-indigo-400 mt-1">{college.placementStats.avgPackage}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">Highest Salary</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{college.placementStats.highestPackage}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400">Overall Placement Rate</div>
              <div className="text-2xl font-black text-purple-400 mt-1">{college.placementStats.placementRate}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3">Top Visiting Recruiters</h3>
            <div className="flex flex-wrap gap-2.5">
              {college.placementStats.topRecruiters.map(rec => (
                <span key={rec} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
                  💼 {rec}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Restricted Resources & Permission Requests (KEY FEATURE 3) */}
      {activeSubTab === 'resources' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-950/60 to-slate-900 p-6 rounded-2xl border border-purple-500/30">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-white">Cross-Campus Access & Resource Request System</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Students from partner colleges can request verified access to {college.name}'s specialized facilities, supercomputing clusters, hardware maker labs, or digital library subscriptions. Requests are reviewed and approved directly by the college administration.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {college.restrictedResources?.map(res => (
              <div key={res.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {res.category}
                    </span>
                    <span className="text-[11px] text-slate-400">Requires Approval</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{res.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{res.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Target Role: {res.requiredRole}</span>
                  <button
                    onClick={() => setRequestModalResource(res)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
                  >
                    <FileKey className="w-3.5 h-3.5" />
                    Request Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Campus Facilities */}
      {activeSubTab === 'facilities' && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-white">Campus Infrastructure & Student Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {college.facilities.map((fac, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>{fac}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Access Request Modal */}
      {requestModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">CampusBridge Access Request</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{requestModalResource.title}</h3>
                <p className="text-xs text-slate-400">Requesting permission at {college.name}</p>
              </div>
              <button
                onClick={() => setRequestModalResource(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
              <div><strong>Applicant:</strong> {currentUser.name} ({currentUser.collegeName})</div>
              <div><strong>Email:</strong> {currentUser.email}</div>
            </div>

            <form onSubmit={handleAccessRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Purpose / Project Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Explain why your team needs access to this resource (e.g., Hackathon hardware testing, research paper data generation, 3D printing)..."
                  value={requestPurpose}
                  onChange={(e) => setRequestPurpose(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white placeholder-slate-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRequestModalResource(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Request to College Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
