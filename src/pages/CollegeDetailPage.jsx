import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import QRPassModal from '../components/QRPassModal';
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
  Send,
  X,
  QrCode,
  Ticket
} from 'lucide-react';

export default function CollegeDetailPage({ collegeId, setActiveTab, onBack }) {
  const {
    colleges,
    compareList,
    toggleCompare,
    submitAccessRequest,
    currentUser,
    showToast,
    passes,
    generateCollegeVisitPass
  } = useApp();
  const college = colleges.find(c => c.id === collegeId) || colleges[0];

  const [activeSubTab, setActiveSubTab] = useState('courses'); // 'courses' | 'admissions' | 'placements' | 'resources' | 'facilities'
  const [requestModalResource, setRequestModalResource] = useState(null);
  const [requestPurpose, setRequestPurpose] = useState('');

  // Campus Visit QR Pass State
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitPurpose, setVisitPurpose] = useState('Campus Tour & Admission Counseling');
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [visitTimeSlot, setVisitTimeSlot] = useState('10:00 AM - 01:00 PM (Morning Window)');
  const [activeQRPass, setActiveQRPass] = useState(null);

  // Check if student already has a visit pass for this college
  const existingPass = (passes || []).find(
    p => p.studentId === currentUser?.id && p.targetCollegeId === college.id && !p.used
  );

  const isComparing = compareList.includes(college.id);

  const handleGenerateVisitPassSubmit = (e) => {
    e.preventDefault();
    const result = generateCollegeVisitPass({
      targetCollegeId: college.id,
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
      setShowVisitModal(false);
      setActiveQRPass(result.pass);
    }
  };

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
      
      {/* Back and Close buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack || (() => setActiveTab('explore'))}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore Colleges
        </button>

        <button
          onClick={onBack || (() => setActiveTab('explore'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition text-xs font-bold"
          title="Close College View (X)"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </div>

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

            <div className="flex flex-wrap items-center gap-2.5">
              {existingPass ? (
                <button
                  onClick={() => setActiveQRPass(existingPass)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
                >
                  <Ticket className="w-4 h-4" />
                  <span>My Active Pass 🎟️</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#e64a19] hover:brightness-110 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-500/30 transition transform active:scale-95"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Book Campus Visit (Get QR Pass) 🎟️</span>
                </button>
              )}

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

      {/* Active Campus Pass Banner (if student already holds one) */}
      {existingPass && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">You hold a confirmed Campus Visit Pass for {college.name}!</p>
              <p className="text-slate-300 text-xs mt-0.5">
                Pass Token: <span className="font-mono text-emerald-300 font-bold">{existingPass.token}</span> • Visit Date: {existingPass.visitDate} • Slot: {existingPass.timeSlot}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveQRPass(existingPass)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition transform active:scale-95 whitespace-nowrap"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Gate QR Code</span>
          </button>
        </div>
      )}

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

      {/* College Visit Pass Generation Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff5722]/20 border border-[#ff5722]/30 flex items-center justify-center text-[#ff7043]">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#ff7043] uppercase tracking-wider">Campus Gate Clearance</span>
                  <h3 className="text-lg font-bold text-white">Book Campus Visit at {college.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setShowVisitModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateVisitPassSubmit} className="space-y-4">
              <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div><strong>Visitor:</strong> {currentUser.name} ({currentUser.collegeName || 'Verified Affiliate'})</div>
                <div><strong>Gate / Destination:</strong> {college.contact?.address || `${college.city} Campus Gate 1`}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Visit Purpose <span className="text-[#ff7043]">*</span>
                </label>
                <select
                  value={visitPurpose}
                  onChange={(e) => setVisitPurpose(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white focus:outline-none"
                  required
                >
                  <option value="Campus Tour & Admission Counseling" className="bg-slate-900">Campus Tour & Admission Counseling</option>
                  <option value="Lab & Robotics Center Inspection" className="bg-slate-900">Lab & Robotics Center Inspection</option>
                  <option value="Inter-College Academic Collaboration" className="bg-slate-900">Inter-College Academic Collaboration</option>
                  <option value="Faculty & Department Meeting" className="bg-slate-900">Faculty & Department Meeting</option>
                  <option value="Hackathon / Tech Fest Registration Inquiry" className="bg-slate-900">Hackathon / Tech Fest Registration Inquiry</option>
                  <option value="Placement Cell Interaction" className="bg-slate-900">Placement Cell Interaction</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Scheduled Visit Date <span className="text-[#ff7043]">*</span>
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Arrival Time Slot <span className="text-[#ff7043]">*</span>
                  </label>
                  <select
                    value={visitTimeSlot}
                    onChange={(e) => setVisitTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs text-white focus:outline-none"
                  >
                    <option value="09:00 AM - 12:00 PM (Morning Slot)" className="bg-slate-900">09:00 AM - 12:00 PM (Morning Slot)</option>
                    <option value="12:00 PM - 03:00 PM (Midday Slot)" className="bg-slate-900">12:00 PM - 03:00 PM (Midday Slot)</option>
                    <option value="03:00 PM - 06:00 PM (Evening Slot)" className="bg-slate-900">03:00 PM - 06:00 PM (Evening Slot)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-200">
                ⚡ Instant Issuance: Generating this pass gives you an encrypted QR code to present at {college.name}'s gate security desk for instant authorization.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowVisitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#e64a19] hover:brightness-110 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-500/30"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Generate Visit QR Pass</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Pass Viewer Modal */}
      {activeQRPass && (
        <QRPassModal pass={activeQRPass} onClose={() => setActiveQRPass(null)} />
      )}

    </div>
  );
}
