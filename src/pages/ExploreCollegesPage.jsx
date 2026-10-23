import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import QRPassModal from '../components/QRPassModal';
import {
  Search,
  Filter,
  MapPin,
  Award,
  Layers,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  FileKey,
  QrCode,
  Ticket,
  X
} from 'lucide-react';

export default function ExploreCollegesPage({ setActiveTab, setSelectedCollegeId }) {
  const { colleges, compareList, toggleCompare, currentUser, passes, generateCollegeVisitPass } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [maxFee, setMaxFee] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  // Visit Pass Modal State
  const [bookingCollege, setBookingCollege] = useState(null);
  const [visitPurpose, setVisitPurpose] = useState('Campus Tour & Admission Counseling');
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [visitTimeSlot, setVisitTimeSlot] = useState('10:00 AM - 01:00 PM (Morning Window)');
  const [activeGeneratedPass, setActiveGeneratedPass] = useState(null);

  const handleGenerateVisitPassSubmit = (e) => {
    e.preventDefault();
    if (!bookingCollege) return;
    const result = generateCollegeVisitPass({
      targetCollegeId: bookingCollege.id,
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
      setBookingCollege(null);
      setActiveGeneratedPass(result.pass);
    }
  };

  // Unique cities from data
  const cities = useMemo(() => {
    const list = Array.from(new Set(colleges.map(c => c.city)));
    return ['ALL', ...list];
  }, [colleges]);

  // Filtered colleges list
  const filteredColleges = useMemo(() => {
    return colleges.filter(col => {
      // Search text
      const matchesSearch =
        col.name.toLowerCase().includes(search.toLowerCase()) ||
        col.city.toLowerCase().includes(search.toLowerCase()) ||
        col.state.toLowerCase().includes(search.toLowerCase()) ||
        col.courses.some(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.branch.toLowerCase().includes(search.toLowerCase()));

      // City
      const matchesCity = selectedCity === 'ALL' || col.city === selectedCity;

      // Course
      const matchesCourse = selectedCourse === 'ALL' || col.courses.some(c => c.branch.toLowerCase().includes(selectedCourse.toLowerCase()));

      // Fee
      let matchesFee = true;
      if (maxFee !== 'ALL') {
        const threshold = parseInt(maxFee, 10);
        matchesFee = col.courses.some(c => c.annualFee <= threshold);
      }

      // Type
      const matchesType = selectedType === 'ALL' || col.type.toLowerCase().includes(selectedType.toLowerCase());

      return matchesSearch && matchesCity && matchesCourse && matchesFee && matchesType;
    });
  }, [colleges, search, selectedCity, selectedCourse, maxFee, selectedType]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Regional Directory</div>
          <h1 className="text-3xl font-extrabold text-white">Explore & Discover Colleges</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse verified colleges in Western UP, NCR & Maharashtra. Compare fees, accreditations & admission status.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setActiveTab('compare')}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
          >
            <Layers className="w-4 h-4" />
            <span>Compare {compareList.length} Selected Colleges</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by college name, city (e.g. Meerut, Greater Noida), branch, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-400"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* City Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">City / Region</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white"
            >
              <option value="ALL" className="bg-slate-900">All Cities</option>
              {cities.filter(c => c !== 'ALL').map(c => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Course Branch Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Branch / Specialization</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white"
            >
              <option value="ALL" className="bg-slate-900">All Branches</option>
              <option value="CSE" className="bg-slate-900">Computer Science (CSE)</option>
              <option value="AI" className="bg-slate-900">Artificial Intelligence / Data Science</option>
              <option value="IT" className="bg-slate-900">Information Technology</option>
              <option value="MBA" className="bg-slate-900">MBA / Management</option>
              <option value="Mechanical" className="bg-slate-900">Mechanical Engineering</option>
            </select>
          </div>

          {/* Fee Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Max Annual Tuition Fee</label>
            <select
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white"
            >
              <option value="ALL" className="bg-slate-900">Any Fee Range</option>
              <option value="100000" className="bg-slate-900">Under ₹1.00 Lakh/yr</option>
              <option value="125000" className="bg-slate-900">Under ₹1.25 Lakh/yr</option>
              <option value="150000" className="bg-slate-900">Under ₹1.50 Lakh/yr</option>
              <option value="250000" className="bg-slate-900">Under ₹2.50 Lakh/yr</option>
            </select>
          </div>

          {/* Institution Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Institution Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white"
            >
              <option value="ALL" className="bg-slate-900">All Types</option>
              <option value="Autonomous" className="bg-slate-900">Autonomous Institute</option>
              <option value="Government" className="bg-slate-900">Government University</option>
              <option value="Private" className="bg-slate-900">Private College</option>
            </select>
          </div>
        </div>

        {/* Results summary & active count */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
          <span>Showing <strong>{filteredColleges.length}</strong> verified colleges</span>
          {(search || selectedCity !== 'ALL' || selectedCourse !== 'ALL' || maxFee !== 'ALL' || selectedType !== 'ALL') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCity('ALL');
                setSelectedCourse('ALL');
                setMaxFee('ALL');
                setSelectedType('ALL');
              }}
              className="text-indigo-400 hover:text-indigo-300 font-medium underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredColleges.map((col) => {
          const isComparing = compareList.includes(col.id);

          return (
            <div
              key={col.id}
              className="glass-card rounded-2xl border border-slate-800 hover:border-indigo-500/40 p-6 flex flex-col justify-between space-y-5"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={col.logo}
                      alt={col.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-800 p-0.5"
                    />
                    <div>
                      <h3 
                        onClick={() => {
                          setSelectedCollegeId(col.id);
                          setActiveTab('college-detail');
                        }}
                        className="text-lg font-bold text-white hover:text-indigo-300 cursor-pointer transition"
                      >
                        {col.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          {col.city}, {col.state}
                        </span>
                        <span>•</span>
                        <span className="text-indigo-300 font-medium">{col.accreditation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                    {col.claimed ? (
                      <span className="text-[10px] text-purple-300 font-medium">Claimed by Admin</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Not yet claimed</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {col.about}
                </p>

                {/* Popular Courses Pills */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Offered Programs:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {col.courses.slice(0, 3).map(c => (
                      <span key={c.id} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                        {c.branch} (₹{(c.annualFee / 1000).toFixed(0)}k/yr)
                      </span>
                    ))}
                    {col.courses.length > 3 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                        +{col.courses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-800/40 rounded-xl border border-slate-700/40 text-center">
                  <div>
                    <span className="block text-[10px] text-slate-400">Avg Placement</span>
                    <span className="text-xs font-bold text-white">{col.placementStats.avgPackage}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Highest Offer</span>
                    <span className="text-xs font-bold text-emerald-400">{col.placementStats.highestPackage}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Rating</span>
                    <span className="text-xs font-bold text-amber-300">★ {col.rating} ({col.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>Source:</span>
                  <a
                    href={col.sourceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline flex items-center gap-0.5"
                  >
                    Disclosure <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className="text-slate-400">· Checked: {col.lastCheckedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBookingCollege(col)}
                    className="px-2.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-[#ff7043] border border-orange-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                    title={`Generate Visit Pass for ${col.name}`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Visit Pass</span>
                  </button>

                  <button
                    onClick={() => toggleCompare(col.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${isComparing ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCollegeId(col.id);
                      setActiveTab('college-detail');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredColleges.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No colleges match your filter criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, city selection, or max fee slider to discover more campuses.
          </p>
        </div>
      )}

      {/* College Visit Pass Modal */}
      {bookingCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff5722]/20 border border-[#ff5722]/30 flex items-center justify-center text-[#ff7043]">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#ff7043] uppercase tracking-wider">Campus Gate Clearance</span>
                  <h3 className="text-lg font-bold text-white">Book Campus Visit at {bookingCollege.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setBookingCollege(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateVisitPassSubmit} className="space-y-4">
              <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div><strong>Visitor:</strong> {currentUser.name} ({currentUser.collegeName || 'Verified Affiliate'})</div>
                <div><strong>Gate / Destination:</strong> {bookingCollege.contact?.address || `${bookingCollege.city} Campus Gate 1`}</div>
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
                ⚡ Instant Issuance: Generating this pass gives you an encrypted QR code to present at {bookingCollege.name}'s gate security desk for instant authorization.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setBookingCollege(null)}
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
      {activeGeneratedPass && (
        <QRPassModal pass={activeGeneratedPass} onClose={() => setActiveGeneratedPass(null)} />
      )}

    </div>
  );
}
