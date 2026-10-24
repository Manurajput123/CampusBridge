import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Calendar,
  Radio,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  FileKey,
  DollarSign,
  Save,
  QrCode,
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  Sparkles,
  MapPin,
  Trash2,
  Send,
  ExternalLink,
  Mail,
  Phone,
  Layers,
  Award,
  ChevronRight,
  UserCheck,
  BellRing
} from 'lucide-react';

export default function CollegeAdminPage({ setActiveTab, presetCity = 'Ghaziabad', presetState = 'Uttar Pradesh' }) {
  const {
    currentUser,
    users,
    switchUser,
    colleges,
    registerNewCollege,
    claimCollege,
    updateCollege,
    addCourseToCollege,
    removeCourseFromCollege,
    events,
    createEvent,
    invitations,
    passes,
    accessRequests,
    decideAccessRequest,
    showToast
  } = useApp();

  const isCollegeAdmin = currentUser.role === 'college_admin';

  // State for non-admin onboarding wizard (Register New College / Claim College)
  const [onboardingMode, setOnboardingMode] = useState('register'); // 'register' | 'claim'
  
  // Registration form state for new college
  const [newColName, setNewColName] = useState('');
  const [newColShortName, setNewColShortName] = useState('');
  const [newColCity, setNewColCity] = useState(presetCity || 'Ghaziabad');
  const [newColState, setNewColState] = useState(presetState || 'Uttar Pradesh');

  React.useEffect(() => {
    if (presetCity) setNewColCity(presetCity);
    if (presetState) setNewColState(presetState);
    if (presetCity) setOnboardingMode('register');
  }, [presetCity, presetState]);
  const [newColType, setNewColType] = useState('Autonomous Institute');
  const [newColFounded, setNewColFounded] = useState('2010');
  const [newColAccreditation, setNewColAccreditation] = useState('NAAC A++ & NBA Tier-1');
  const [newColCampusSize, setNewColCampusSize] = useState('42 Acres');
  const [newColTagLine, setNewColTagLine] = useState('Empowering Future Tech Leaders & Researchers');
  const [newColDefaultFee, setNewColDefaultFee] = useState('130000');
  const [newColHostelFee, setNewColHostelFee] = useState('85000');
  const [newColDeadline, setNewColDeadline] = useState('August 15, 2026');
  const [newColAvgPackage, setNewColAvgPackage] = useState('₹8.0 LPA');
  const [newColHighestPackage, setNewColHighestPackage] = useState('₹42.0 LPA');
  const [newColWebsite, setNewColWebsite] = useState('https://campusbridge.in');
  const [newColPhone, setNewColPhone] = useState('+91 120 400 6000');
  const [newColAbout, setNewColAbout] = useState('');

  // Admin persona details for registration
  const [adminName, setAdminName] = useState('Prof. Rajesh Khanna');
  const [adminEmail, setAdminEmail] = useState('dean.events@college.edu.in');
  const [adminDesignation, setAdminDesignation] = useState('Dean of Academic Affairs & Inter-College Events');

  // Claim college modal state
  const [selectedColToClaim, setSelectedColToClaim] = useState('');
  const [claimAdminName, setClaimAdminName] = useState('Dr. Authorized Official');
  const [claimAdminEmail, setClaimAdminEmail] = useState('admin.official@college.edu.in');

  // Admin Studio Sub-tabs (when logged in as admin)
  const [studioTab, setStudioTab] = useState('events'); // 'events' | 'invitations' | 'courses' | 'requests' | 'attendees'

  // Current admin's college
  const myCollege = colleges.find(c => c.id === currentUser.collegeId) || colleges[0];

  // Course Adder State
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newProgName, setNewProgName] = useState('B.Tech Cyber Security & Forensics');
  const [newProgBranch, setNewProgBranch] = useState('Cyber Security');
  const [newProgDuration, setNewProgDuration] = useState('4 Years');
  const [newProgFee, setNewProgFee] = useState('135000');
  const [newProgSeats, setNewProgSeats] = useState('120');
  const [newProgEligibility, setNewProgEligibility] = useState('10+2 with PCM (Min 60%) + JEE Main');
  const [newProgAvgPkg, setNewProgAvgPkg] = useState('₹7.8 LPA');
  const [newProgHighPkg, setNewProgHighPkg] = useState('₹32.0 LPA');

  // Edit College General Info State
  const [editColTagLine, setEditColTagLine] = useState(myCollege?.tagLine || '');
  const [editColHostelFee, setEditColHostelFee] = useState(myCollege?.admissionDetails?.hostelFeePerYear || 75000);
  const [editColDeadline, setEditColDeadline] = useState(myCollege?.admissionDetails?.applicationDeadline || 'July 31, 2026');
  const [editColPhone, setEditColPhone] = useState(myCollege?.contact?.phone || '');
  const [editColWebsite, setEditColWebsite] = useState(myCollege?.contact?.website || '');
  const [editColAvgPkg, setEditColAvgPkg] = useState(myCollege?.placementStats?.avgPackage || '₹7.0 LPA');
  const [editColHighestPkg, setEditColHighestPkg] = useState(myCollege?.placementStats?.highestPackage || '₹35.0 LPA');

  // Event Creation State
  const [evtTitle, setEvtTitle] = useState('');
  const [evtCategory, setEvtCategory] = useState('Hackathon');
  const [evtDate, setEvtDate] = useState('December 15-16, 2026');
  const [evtVenue, setEvtVenue] = useState(`${myCollege?.name || 'Campus'} Auditorium & Innovation Hall`);
  const [evtPrize, setEvtPrize] = useState('₹2,00,000 Cash Pool + Cloud Credits');
  const [evtDesc, setEvtDesc] = useState('');
  const [targetScope, setTargetScope] = useState('SELECTED_COLLEGES'); // 'SELECTED_COLLEGES' | 'ALL'
  const [selectedCollegesToInvite, setSelectedCollegesToInvite] = useState([
    "col-noida-1",
    "col-gzb-1"
  ]);

  // Handle Register New College
  const handleRegisterNewCollegeSubmit = (e) => {
    e.preventDefault();
    if (!newColName.trim()) {
      showToast('Please enter your college full name.', 'warning');
      return;
    }

    registerNewCollege({
      college: {
        name: newColName,
        shortName: newColShortName || newColName,
        city: newColCity,
        state: newColState,
        type: newColType,
        founded: newColFounded,
        accreditation: newColAccreditation,
        campusSize: newColCampusSize,
        tagLine: newColTagLine,
        defaultFee: newColDefaultFee,
        hostelFee: newColHostelFee,
        deadline: newColDeadline,
        avgPackage: newColAvgPackage,
        highestPackage: newColHighestPackage,
        website: newColWebsite,
        phone: newColPhone,
        about: newColAbout
      },
      admin: {
        name: adminName,
        email: adminEmail,
        designation: adminDesignation
      }
    });
  };

  // Handle Claim Existing College
  const handleClaimCollegeSubmit = (e) => {
    e.preventDefault();
    if (!selectedColToClaim) {
      showToast('Please select a college to claim.', 'warning');
      return;
    }

    claimCollege(selectedColToClaim, {
      name: claimAdminName,
      email: claimAdminEmail,
      designation: "Authorized Dean of Student Affairs"
    });
  };

  // Handle Add New Course
  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    if (!newProgName.trim()) {
      showToast('Please enter program name.', 'warning');
      return;
    }

    addCourseToCollege(myCollege.id, {
      name: newProgName,
      branch: newProgBranch,
      duration: newProgDuration,
      annualFee: newProgFee,
      totalSeats: newProgSeats,
      eligibility: newProgEligibility,
      averagePackage: newProgAvgPkg,
      highestPackage: newProgHighPkg
    });

    setShowAddCourseModal(false);
    setNewProgName('');
  };

  // Handle Save College General Details
  const handleSaveCollegeDetails = (e) => {
    e.preventDefault();
    updateCollege(myCollege.id, {
      tagLine: editColTagLine,
      contact: {
        ...myCollege.contact,
        phone: editColPhone,
        website: editColWebsite
      },
      admissionDetails: {
        ...myCollege.admissionDetails,
        applicationDeadline: editColDeadline,
        hostelFeePerYear: parseInt(editColHostelFee, 10)
      },
      placementStats: {
        ...myCollege.placementStats,
        avgPackage: editColAvgPkg,
        highestPackage: editColHighestPkg
      }
    });
  };

  // Toggle Invite College
  const toggleInviteCollege = (id) => {
    if (selectedCollegesToInvite.includes(id)) {
      setSelectedCollegesToInvite(prev => prev.filter(cId => cId !== id));
    } else {
      setSelectedCollegesToInvite(prev => [...prev, id]);
    }
  };

  // Regional Quick Preset selectors
  const applyRegionPreset = (regionType) => {
    if (regionType === 'ALL') {
      setSelectedCollegesToInvite(colleges.filter(c => c.id !== myCollege.id).map(c => c.id));
      setTargetScope('SELECTED_COLLEGES');
      showToast(`Selected all ${colleges.length - 1} registered partner campuses!`, 'info');
      return;
    }

    if (regionType === 'NCR') {
      const ncrIds = colleges
        .filter(c => c.id !== myCollege.id && ['Greater Noida', 'Noida', 'Ghaziabad', 'New Delhi', 'Delhi'].includes(c.city))
        .map(c => c.id);
      setSelectedCollegesToInvite(ncrIds);
      setTargetScope('SELECTED_COLLEGES');
      showToast(`Invited ${ncrIds.length} NCR regional campuses (Noida, Ghaziabad, Delhi)!`, 'info');
      return;
    }

    if (regionType === 'WESTERN_UP') {
      const wupIds = colleges
        .filter(c => c.id !== myCollege.id && ['Meerut', 'Greater Noida', 'Noida', 'Ghaziabad'].includes(c.city))
        .map(c => c.id);
      setSelectedCollegesToInvite(wupIds);
      setTargetScope('SELECTED_COLLEGES');
      showToast(`Invited ${wupIds.length} Western UP partner campuses!`, 'info');
      return;
    }
  };

  // Handle Event Creation
  const handlePublishEvent = (e) => {
    e.preventDefault();
    if (!evtTitle.trim() || !evtDesc.trim()) {
      showToast('Please provide event title and description.', 'warning');
      return;
    }

    if (targetScope === 'SELECTED_COLLEGES' && selectedCollegesToInvite.length === 0) {
      showToast('Please select at least one college to invite or choose "Open to All".', 'warning');
      return;
    }

    const targetNames = colleges
      .filter(c => selectedCollegesToInvite.includes(c.id))
      .map(c => c.name);

    createEvent({
      title: evtTitle,
      category: evtCategory,
      mode: 'Offline / Campus Arena',
      bannerImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
      date: evtDate,
      registrationDeadline: 'December 05, 2026',
      venue: evtVenue,
      prizePool: evtPrize,
      maxTeamSize: 4,
      minTeamSize: 2,
      description: evtDesc,
      targetScope,
      targetColleges: targetScope === 'ALL' ? ['ALL'] : selectedCollegesToInvite,
      targetCollegeNames: targetScope === 'ALL' ? ['All Campuses'] : targetNames,
      eligibilityText: targetScope === 'ALL' ? 'Open to all Indian colleges' : `Invited partner colleges: ${targetNames.join(', ')}`,
      rounds: [
        { round: 'Online Preliminary Idea Submission', date: 'Dec 08, 2026', status: 'Upcoming' },
        { round: `36-Hour Hackathon at ${myCollege.shortName}`, date: evtDate, status: 'Grand Finale' }
      ],
      perks: ['Free accommodation & mess meals', 'Direct corporate mentorship', 'Verified pass certificates']
    });

    setEvtTitle('');
    setEvtDesc('');
    setStudioTab('invitations');
  };

  // Attendees for my college's hosted events
  const myHostedEvents = events.filter(e => e.hostCollegeId === myCollege?.id);
  const myHostedEventIds = myHostedEvents.map(e => e.id);
  const myAttendees = passes.filter(p => myHostedEventIds.includes(p.eventId));

  // Access requests for my college
  const myRequests = accessRequests.filter(r => r.targetCollegeId === myCollege?.id);

  // Invitations sent by my college
  const mySentInvitations = invitations.filter(inv => inv.fromCollegeId === myCollege?.id);

  /* =========================================================================
     VIEW 1: NON-ADMIN ONBOARDING / COLLEGE REGISTRATION / CLAIM PORTAL
     ========================================================================= */
  if (!isCollegeAdmin) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-5xl space-y-10">
        
        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>CampusBridge Institution Network & Partner Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Register Your College or <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">
              Claim Institutional Administration
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join the inter-college ecosystem. When colleges log in and register on CampusBridge, they can publish hackathons, manage course fees, and selectively invite partner colleges across Meerut, Noida, Delhi & beyond!
          </p>
        </div>

        {/* Quick Demo Switcher Callout */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Fast Hackathon Demo: Want to test an existing registered college admin immediately?</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchUser('admin-meerut')}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition"
            >
              🏛️ Switch to Meerut Admin
            </button>
            <button
              onClick={() => switchUser('admin-noida')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
            >
              🏛️ Switch to Noida Admin
            </button>
          </div>
        </div>

        {/* Action Tabs: Register Brand New vs Claim Existing */}
        <div className="flex items-center justify-center gap-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setOnboardingMode('register')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${onboardingMode === 'register' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <Plus className="w-4 h-4" />
            Register Brand New College
          </button>

          <button
            onClick={() => setOnboardingMode('claim')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${onboardingMode === 'claim' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            Claim Existing College Authority
          </button>
        </div>

        {/* Tab A: Register Brand New College Form */}
        {onboardingMode === 'register' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-400" />
                Register New Institution on CampusBridge
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your college details. Once submitted, your campus will be instantly listed in the directory, and you will be logged in as its verified administrator.
              </p>
            </div>

            <form onSubmit={handleRegisterNewCollegeSubmit} className="space-y-6">
              
              {/* College Primary Info */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                  1. College Identity & Infrastructure
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full College Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lucknow Institute of Technology & Management"
                      value={newColName}
                      onChange={(e) => setNewColName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Short Name / Acronym <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. LITM Lucknow"
                      value={newColShortName}
                      onChange={(e) => setNewColShortName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
                    <input
                      type="text"
                      value={newColCity}
                      onChange={(e) => setNewColCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                    <input
                      type="text"
                      value={newColState}
                      onChange={(e) => setNewColState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Institution Type</label>
                    <select
                      value={newColType}
                      onChange={(e) => setNewColType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    >
                      <option value="Autonomous Institute" className="bg-slate-900">Autonomous Institute</option>
                      <option value="Private University" className="bg-slate-900">Private University</option>
                      <option value="Government University" className="bg-slate-900">Government University</option>
                      <option value="Affiliated College" className="bg-slate-900">Affiliated College</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Accreditation</label>
                    <input
                      type="text"
                      value={newColAccreditation}
                      onChange={(e) => setNewColAccreditation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Campus Size</label>
                    <input
                      type="text"
                      value={newColCampusSize}
                      onChange={(e) => setNewColCampusSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Established Year</label>
                    <input
                      type="number"
                      value={newColFounded}
                      onChange={(e) => setNewColFounded(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Academics & Fees */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  2. Academic Fees, Cutoffs & Placements
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      B.Tech CSE Annual Tuition (₹) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={newColDefaultFee}
                      onChange={(e) => setNewColDefaultFee(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hostel & Mess / Year (₹)</label>
                    <input
                      type="number"
                      value={newColHostelFee}
                      onChange={(e) => setNewColHostelFee(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Application Deadline</label>
                    <input
                      type="text"
                      value={newColDeadline}
                      onChange={(e) => setNewColDeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Average Placement Package</label>
                    <input
                      type="text"
                      value={newColAvgPackage}
                      onChange={(e) => setNewColAvgPackage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Highest Placement Package</label>
                    <input
                      type="text"
                      value={newColHighestPackage}
                      onChange={(e) => setNewColHighestPackage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Administrator Identity Credentials */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  3. College Admin Authentication Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Admin Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Official Institutional Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Designation</label>
                    <input
                      type="text"
                      value={adminDesignation}
                      onChange={(e) => setAdminDesignation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  Complete Registration & Login to College Admin Studio
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab B: Claim Existing College */}
        {onboardingMode === 'claim' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Claim Authority for an Unclaimed Campus
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                If your college is already listed in the CampusBridge registry but not yet claimed by an official admin, you can verify your identity and take control.
              </p>
            </div>

            <form onSubmit={handleClaimCollegeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select College to Claim <span className="text-rose-400">*</span>
                </label>
                <select
                  value={selectedColToClaim}
                  onChange={(e) => setSelectedColToClaim(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  required
                >
                  <option value="" className="bg-slate-900">-- Select from registered colleges --</option>
                  {colleges.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900">
                      {c.name} ({c.city}) — {c.claimed ? 'Claimed' : 'AVAILABLE TO CLAIM'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Representative Name</label>
                  <input
                    type="text"
                    value={claimAdminName}
                    onChange={(e) => setClaimAdminName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official College Email</label>
                  <input
                    type="email"
                    value={claimAdminEmail}
                    onChange={(e) => setClaimAdminEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Claim Authority & Launch Admin Studio
              </button>
            </form>
          </div>
        )}

      </div>
    );
  }

  /* =========================================================================
     VIEW 2: ADVANCED COLLEGE ADMIN STUDIO (LOGGED IN AS COLLEGE ADMIN)
     ========================================================================= */
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* College Admin Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <img
            src={myCollege.logo}
            alt={myCollege.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500/40 bg-slate-900 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Verified College Admin Portal
              </span>
              <span className="text-[11px] text-slate-400">ID: {myCollege.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">{myCollege.name}</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Admin: <strong>{currentUser.name}</strong> ({currentUser.email}) · {currentUser.designation || 'Director of Events'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab('scanner')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition"
          >
            <QrCode className="w-4 h-4" />
            Gate Scanner
          </button>

          <button
            onClick={() => switchUser('usr-student')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            Switch to Student
          </button>
        </div>
      </div>

      {/* Modern Studio Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setStudioTab('events')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${studioTab === 'events' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Radio className="w-4 h-4" />
          Broadcast Cross-College Event
        </button>

        <button
          onClick={() => setStudioTab('invitations')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${studioTab === 'invitations' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Send className="w-4 h-4" />
          Sent Invitations & Partner Campuses ({mySentInvitations.length})
        </button>

        <button
          onClick={() => setStudioTab('courses')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${studioTab === 'courses' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <GraduationCap className="w-4 h-4" />
          Manage Degree Programs & Fees ({myCollege.courses.length})
        </button>

        <button
          onClick={() => setStudioTab('requests')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition relative ${studioTab === 'requests' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <FileKey className="w-4 h-4" />
          Student Lab Permissions
          {myRequests.filter(r => r.status === 'pending').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
              {myRequests.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setStudioTab('attendees')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${studioTab === 'attendees' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Users className="w-4 h-4" />
          Attendees & Tickets ({myAttendees.length})
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className="px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 text-indigo-300 hover:text-white bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/30 transition whitespace-nowrap"
        >
          <BellRing className="w-4 h-4 text-indigo-400" />
          Dispatch Info to Selected Colleges
        </button>
      </div>

      {/* =====================================================================
          TAB 1: EVENT BROADCAST & MULTI-CAMPUS INVITATION MATRIX
          ===================================================================== */}
      {studioTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                Multi-Campus Distribution System
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">Broadcast Event & Send Inter-College Invites</h2>
              <p className="text-xs text-slate-400 mt-1">
                Publish hackathons or symposiums and dispatch targeted invites directly to partner colleges in Meerut, Noida, Ghaziabad, Delhi or Nationwide.
              </p>
            </div>

            <form onSubmit={handlePublishEvent} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Event Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. NCR Grand AI & Robotics Hackathon 2026"
                  value={evtTitle}
                  onChange={(e) => setEvtTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={evtCategory}
                    onChange={(e) => setEvtCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  >
                    <option value="Hackathon" className="bg-slate-900">Hackathon</option>
                    <option value="Robotics & Hardware" className="bg-slate-900">Robotics & Hardware</option>
                    <option value="Symposium & Pitch" className="bg-slate-900">Startup Pitch / Conclave</option>
                    <option value="Coding Contest" className="bg-slate-900">Competitive Coding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Total Prize Pool</label>
                  <input
                    type="text"
                    value={evtPrize}
                    onChange={(e) => setEvtPrize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Dates</label>
                  <input
                    type="text"
                    value={evtDate}
                    onChange={(e) => setEvtDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Venue / Arena</label>
                <input
                  type="text"
                  value={evtVenue}
                  onChange={(e) => setEvtVenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              {/* KEY REQUIREMENT: DYNAMIC CROSS-COLLEGE INVITATION MATRIX */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Radio className="w-4 h-4 text-purple-400" />
                      Cross-College Invitation Matrix ({selectedCollegesToInvite.length} Selected)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      When other colleges log in or register on CampusBridge, they appear here. Choose who to invite!
                    </p>
                  </div>

                  {/* Regional Quick Presets */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyRegionPreset('WESTERN_UP')}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700"
                    >
                      Western UP Campuses
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRegionPreset('NCR')}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700"
                    >
                      NCR Campuses
                    </button>
                    <button
                      type="button"
                      onClick={() => applyRegionPreset('ALL')}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    >
                      Select All
                    </button>
                  </div>
                </div>

                {/* College Checkbox Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-purple-500/20 max-h-60 overflow-y-auto pr-1">
                  {colleges.filter(c => c.id !== myCollege.id).map(col => {
                    const isSelected = selectedCollegesToInvite.includes(col.id);
                    return (
                      <label
                        key={col.id}
                        className={`p-3 rounded-xl border text-xs flex items-center gap-3 cursor-pointer transition ${isSelected ? 'bg-purple-900/40 border-purple-500/70 text-white shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleInviteCollege(col.id)}
                          className="rounded bg-slate-800 text-purple-600 focus:ring-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold truncate text-white">{col.shortName}</div>
                          <div className="text-[10px] text-slate-400 truncate">{col.city}, {col.state} · {col.type}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Event Brief & Problem Themes <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows="3"
                  placeholder="Detail the event structure, problem statements, and requirements..."
                  value={evtDesc}
                  onChange={(e) => setEvtDesc(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30"
              >
                <Send className="w-4 h-4" />
                Publish Event & Dispatch Official Invites to Selected Campuses
              </button>
            </form>
          </div>

          {/* Right Sidebar: Invitation Protocol Guide */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl space-y-4 border border-purple-500/30">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400" />
                How CampusBridge Invitations Work
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you dispatch an invitation to a partner college (e.g. Meerut inviting Noida & Ghaziabad):
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                  <span>Partner College Admin receives an official notification.</span>
                </div>
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                  <span>Students of the invited campus see "✅ Invited Partner Campus" badge.</span>
                </div>
                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                  <span>Single-use QR tickets are minted to prevent duplicate walk-ins.</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Events Currently Hosted by {myCollege.shortName}</h4>
              <div className="space-y-2">
                {myHostedEvents.map(evt => (
                  <div key={evt.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                    <div className="font-bold text-white">{evt.title}</div>
                    <div className="text-[11px] text-purple-300 mt-0.5">{evt.date} · {evt.prizePool}</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Invited: {evt.targetScope === 'ALL' ? 'All Campuses' : evt.targetCollegeNames?.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =====================================================================
          TAB 2: SENT INVITATIONS & PARTNER CAMPUSES RELATIONS
          ===================================================================== */}
      {studioTab === 'invitations' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-400" />
                Dispatched Campus Invitations & Partnership Status
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time tracking of inter-college invitations dispatched from {myCollege.name}.
              </p>
            </div>
            <button
              onClick={() => setStudioTab('events')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Send New Campus Invites
            </button>
          </div>

          <div className="space-y-3">
            {mySentInvitations.map(inv => (
              <div key={inv.id} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                      Target Partner Campus
                    </span>
                    <h3 className="text-sm font-bold text-white">{inv.toCollegeName}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Invited to: <strong className="text-indigo-300">{inv.eventTitle}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Student Registrations</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {inv.studentsRegisteredCount || 0} Registered
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {inv.status || 'INVITATION_DELIVERED'}
                  </span>
                </div>
              </div>
            ))}

            {mySentInvitations.length === 0 && (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
                <Send className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Invitations Dispatched Yet</h4>
                <p className="text-xs text-slate-400">Publish a targeted event to send official invites to partner colleges.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: MANAGE DEGREE PROGRAMS & EDIT COLLEGE DETAILS
          ===================================================================== */}
      {studioTab === 'courses' && (
        <div className="space-y-8">
          
          {/* Section 1: Degree Programs Catalog */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  Offered Degree Programs & Tuition Fees
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add, update or remove degree programs for {myCollege.name}. Changes immediately reflect on Explore and Compare pages.
                </p>
              </div>

              <button
                onClick={() => setShowAddCourseModal(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                Add New Degree Program
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCollege.courses.map(crs => (
                <div key={crs.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                        {crs.duration} · {crs.branch}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">{crs.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Annual Tuition</span>
                      <span className="text-base font-black text-white">₹{crs.annualFee?.toLocaleString()}<span className="text-xs font-normal text-slate-400">/yr</span></span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Seats:</span>
                      <strong>{crs.totalSeats} Seats</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Avg Placement:</span>
                      <strong className="text-indigo-300">{crs.averagePackage}</strong>
                    </div>
                    <div className="pt-1 text-[11px] text-slate-400">
                      Eligibility: {crs.eligibility}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => removeCourseFromCollege(myCollege.id, crs.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove Program
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Edit College Public Info & Disclosure */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-400" />
                Update Public Profile, Cutoffs & Contact
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Edit institution contact details, hostel expenses, and placement figures.
              </p>
            </div>

            <form onSubmit={handleSaveCollegeDetails} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Campus Tagline</label>
                  <input
                    type="text"
                    value={editColTagLine}
                    onChange={(e) => setEditColTagLine(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hostel & Mess Annual Cost (₹)</label>
                  <input
                    type="number"
                    value={editColHostelFee}
                    onChange={(e) => setEditColHostelFee(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Admission Deadline</label>
                  <input
                    type="text"
                    value={editColDeadline}
                    onChange={(e) => setEditColDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Average Salary Package</label>
                  <input
                    type="text"
                    value={editColAvgPkg}
                    onChange={(e) => setEditColAvgPkg(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Highest Salary Package</label>
                  <input
                    type="text"
                    value={editColHighestPkg}
                    onChange={(e) => setEditColHighestPkg(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Website</label>
                  <input
                    type="text"
                    value={editColWebsite}
                    onChange={(e) => setEditColWebsite(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={editColPhone}
                    onChange={(e) => setEditColPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-purple-600/30"
                >
                  <Save className="w-4 h-4" />
                  Save Changes & Audit Timestamp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: STUDENT ACCESS & RESOURCE REQUESTS
          ===================================================================== */}
      {studioTab === 'requests' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileKey className="w-5 h-5 text-indigo-400" />
                Cross-Campus Lab & Research Access Requests
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Review and approve student requests for specialized research labs, maker workshops, or digital libraries at {myCollege.name}.
              </p>
            </div>
            <span className="text-xs text-slate-400">Total: <strong>{myRequests.length}</strong></span>
          </div>

          <div className="space-y-4">
            {myRequests.map(req => (
              <div key={req.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{req.studentName}</span>
                      <span className="text-xs text-slate-400">from {req.studentCollege}</span>
                    </div>
                    <h3 className="text-sm font-bold text-indigo-300 mt-0.5">
                      Requested: {req.resourceTitle}
                    </h3>
                  </div>

                  <span className={`self-start px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${req.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : req.status === 'rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                    {req.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>Stated Purpose:</strong> {req.purpose}
                </div>

                {req.decisionRemarks && (
                  <div className="text-xs text-slate-400 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                    <strong>Admin Note:</strong> {req.decisionRemarks}
                    {req.accessPassCode && (
                      <span className="ml-2 font-mono text-emerald-400 font-bold">Pass Code: {req.accessPassCode}</span>
                    )}
                  </div>
                )}

                {req.status === 'pending' && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => decideAccessRequest(req.id, 'rejected', 'Declined by administration due to schedule conflict.')}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                    <button
                      onClick={() => decideAccessRequest(req.id, 'approved', 'Permission approved. Report to lab supervisor with college ID.')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve Access Pass
                    </button>
                  </div>
                )}
              </div>
            ))}

            {myRequests.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs">
                No active access requests for {myCollege.name}.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: ATTENDEES & VERIFICATION LOGS
          ===================================================================== */}
      {studioTab === 'attendees' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Registered Attendees Across Hosted Events
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time check-in and QR ticket records of students attending {myCollege.name} events.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              Open Gate Scanner
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Attendee Name</th>
                  <th className="p-3">Home Campus</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Token</th>
                  <th className="p-3">Check-in Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {myAttendees.map(pass => (
                  <tr key={pass.token} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-semibold text-white">
                      <div>{pass.studentName}</div>
                      <div className="text-[10px] text-slate-400">{pass.studentEmail}</div>
                    </td>
                    <td className="p-3">{pass.studentCollege}</td>
                    <td className="p-3 font-medium text-purple-300">{pass.eventTitle}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-300">{pass.token}</td>
                    <td className="p-3">
                      {pass.used ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          CHECKED IN ({new Date(pass.checkedInAt).toLocaleTimeString()})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          READY TO SCAN
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD COURSE MODAL
          ===================================================================== */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Academics Expansion</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Add Degree Program to {myCollege.shortName}</h3>
              </div>
              <button onClick={() => setShowAddCourseModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddCourseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Program Name *</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Artificial Intelligence & Robotics"
                  value={newProgName}
                  onChange={(e) => setNewProgName(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Major</label>
                  <input
                    type="text"
                    value={newProgBranch}
                    onChange={(e) => setNewProgBranch(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newProgDuration}
                    onChange={(e) => setNewProgDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Tuition (₹) *</label>
                  <input
                    type="number"
                    value={newProgFee}
                    onChange={(e) => setNewProgFee(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Approved Seats</label>
                  <input
                    type="number"
                    value={newProgSeats}
                    onChange={(e) => setNewProgSeats(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Admission Eligibility</label>
                <input
                  type="text"
                  value={newProgEligibility}
                  onChange={(e) => setNewProgEligibility(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
                >
                  Add Program & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
