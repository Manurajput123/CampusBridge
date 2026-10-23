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
  AlertCircle
} from 'lucide-react';

export default function CollegeAdminPage({ setActiveTab }) {
  const {
    currentUser,
    colleges,
    updateCollege,
    events,
    createEvent,
    passes,
    accessRequests,
    decideAccessRequest,
    showToast
  } = useApp();

  // Find college this admin manages
  const myCollege = colleges.find(c => c.id === currentUser.collegeId) || colleges[0];

  const [activeTab, setActiveAdminTab] = useState('create_event'); // 'create_event' | 'edit_college' | 'attendees' | 'requests'

  // Edit college info state
  const [editedFee, setEditedFee] = useState(myCollege.courses[0]?.annualFee || 115000);
  const [editedHostelFee, setEditedHostelFee] = useState(myCollege.admissionDetails?.hostelFeePerYear || 75000);
  const [editedDeadline, setEditedDeadline] = useState(myCollege.admissionDetails?.applicationDeadline || 'July 31, 2026');

  // New Event creation form state (Feature 2!)
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState('Hackathon');
  const [eventDate, setEventDate] = useState('December 12-13, 2026');
  const [eventVenue, setEventVenue] = useState(`${myCollege.name} Innovation Arena`);
  const [eventPrize, setEventPrize] = useState('₹1,50,000 Cash + Certificates');
  const [eventDesc, setEventDesc] = useState('');
  const [targetScope, setTargetScope] = useState('SELECTED_COLLEGES'); // 'SELECTED_COLLEGES' | 'ALL'
  const [selectedTargetColleges, setSelectedTargetColleges] = useState([
    "col-noida-1",
    "col-gzb-1"
  ]);

  const handleCollegeUpdate = (e) => {
    e.preventDefault();
    const updatedCourses = myCollege.courses.map((crs, idx) => {
      if (idx === 0) {
        return { ...crs, annualFee: parseInt(editedFee, 10) };
      }
      return crs;
    });

    updateCollege(myCollege.id, {
      courses: updatedCourses,
      admissionDetails: {
        ...myCollege.admissionDetails,
        applicationDeadline: editedDeadline,
        hostelFeePerYear: parseInt(editedHostelFee, 10)
      }
    });
  };

  const toggleTargetCollege = (id) => {
    if (selectedTargetColleges.includes(id)) {
      setSelectedTargetColleges(prev => prev.filter(cId => cId !== id));
    } else {
      setSelectedTargetColleges(prev => [...prev, id]);
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDesc.trim()) {
      showToast('Please fill out event title and description.', 'warning');
      return;
    }

    if (targetScope === 'SELECTED_COLLEGES' && selectedTargetColleges.length === 0) {
      showToast('Please select at least one target college or choose "Open to All".', 'warning');
      return;
    }

    const targetNames = colleges
      .filter(c => selectedTargetColleges.includes(c.id))
      .map(c => c.name);

    createEvent({
      title: eventTitle,
      category: eventCategory,
      mode: 'Offline / Campus Arena',
      bannerImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
      date: eventDate,
      registrationDeadline: 'December 01, 2026',
      venue: eventVenue,
      prizePool: eventPrize,
      maxTeamSize: 4,
      minTeamSize: 2,
      description: eventDesc,
      targetScope,
      targetColleges: targetScope === 'ALL' ? ['ALL'] : selectedTargetColleges,
      targetCollegeNames: targetScope === 'ALL' ? ['All Campuses'] : targetNames,
      eligibilityText: targetScope === 'ALL' ? 'Open to all colleges' : `Invited campuses: ${targetNames.join(', ')}`,
      rounds: [
        { round: 'Online Preliminary PPT Submission', date: 'Dec 05, 2026', status: 'Screening' },
        { round: 'Grand Finale at Host Campus', date: eventDate, status: 'Finals' }
      ],
      perks: ['Free accommodation & meals', 'Industry mentorship', 'Merit certificates']
    });

    // Reset form
    setEventTitle('');
    setEventDesc('');
    showToast('Cross-campus event broadcasted successfully!', 'success');
  };

  // Attendees for events hosted by this college
  const myHostedEvents = events.filter(e => e.hostCollegeId === myCollege.id);
  const myHostedEventIds = myHostedEvents.map(e => e.id);
  const myAttendees = passes.filter(p => myHostedEventIds.includes(p.eventId));

  // Access requests for this college
  const myRequests = accessRequests.filter(r => r.targetCollegeId === myCollege.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* College Admin Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <img
            src={myCollege.logo}
            alt={myCollege.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40 bg-slate-900"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Official College Admin
              </span>
              <span className="text-xs text-slate-400">Authenticated via CampusBridge</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">{myCollege.name}</h1>
            <p className="text-xs text-slate-300">
              Admin: <strong>{currentUser.name}</strong> ({currentUser.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('scanner')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition"
          >
            <QrCode className="w-4 h-4" />
            Launch Gate Scanner
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveAdminTab('create_event')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${activeTab === 'create_event' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <Radio className="w-4 h-4" />
          Broadcast Cross-College Event
        </button>

        <button
          onClick={() => setActiveAdminTab('requests')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition relative ${activeTab === 'requests' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <FileKey className="w-4 h-4" />
          Student Access Approvals
          {myRequests.filter(r => r.status === 'pending').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
              {myRequests.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('attendees')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${activeTab === 'attendees' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <Users className="w-4 h-4" />
          Attendees & Check-ins ({myAttendees.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('edit_college')}
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition ${activeTab === 'edit_college' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <Building2 className="w-4 h-4" />
          Edit College Info & Fees
        </button>
      </div>

      {/* Tab 1: Broadcast Event (KEY FEATURE 2!) */}
      {activeTab === 'create_event' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-6">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                Multi-Campus Distribution System
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Broadcast Event to Target Campuses</h2>
              <p className="text-xs text-slate-400 mt-1">
                As college admin, you can selectively invite students from specific regional colleges (e.g. Noida, Ghaziabad, Delhi) or broadcast to all.
              </p>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Western UP Inter-College CodeSprint 2026"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Category</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  >
                    <option value="Hackathon" className="bg-slate-900">Hackathon</option>
                    <option value="Robotics & Hardware" className="bg-slate-900">Robotics & Hardware</option>
                    <option value="Symposium & Pitch" className="bg-slate-900">Startup Symposium & Pitch</option>
                    <option value="Coding Contest" className="bg-slate-900">Competitive Coding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Total Prize Pool</label>
                  <input
                    type="text"
                    value={eventPrize}
                    onChange={(e) => setEventPrize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Event Dates</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Campus Venue</label>
                  <input
                    type="text"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              {/* KEY FEATURE 2: TARGET COLLEGES SELECTION! */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Radio className="w-4 h-4 text-purple-400" />
                      Select Target Campuses (Cross-College Targeting)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Choose which partner colleges will receive this event in their feed.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetScope('SELECTED_COLLEGES')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${targetScope === 'SELECTED_COLLEGES' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Selected Campuses
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetScope('ALL')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${targetScope === 'ALL' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      All Colleges
                    </button>
                  </div>
                </div>

                {targetScope === 'SELECTED_COLLEGES' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-purple-500/20">
                    {colleges.map(col => {
                      const isSelected = selectedTargetColleges.includes(col.id);
                      return (
                        <label
                          key={col.id}
                          className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition ${isSelected ? 'bg-purple-900/40 border-purple-500/60 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleTargetCollege(col.id)}
                            className="rounded bg-slate-800 text-purple-600 focus:ring-0"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{col.shortName}</div>
                            <div className="text-[10px] text-slate-400">{col.city}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Description *</label>
                <textarea
                  rows="3"
                  placeholder="Details regarding problem tracks, submission guidelines, and prizes..."
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
              >
                <Radio className="w-4 h-4" />
                Publish & Broadcast to Selected Campuses
              </button>
            </form>
          </div>

          {/* Right sidebar info */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Why Target Specific Campuses?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Colleges in Western UP & NCR (e.g. Meerut, Greater Noida, Ghaziabad) often organize joint hardware hackathons, robotic leagues, or research symposiums where travel proximity matters.
              </p>
              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="text-white font-semibold">How it works:</div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span>Select partner colleges in Noida, Meerut, etc.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Students from those campuses see an invited banner.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>Single-use QR passes prevent unauthorized walk-ins.</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Events Currently Hosted</h4>
              <div className="space-y-2">
                {myHostedEvents.map(evt => (
                  <div key={evt.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                    <div className="font-semibold text-white">{evt.title}</div>
                    <div className="text-[11px] text-purple-300 mt-0.5">{evt.date} · {evt.prizePool}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Access & Permission Requests (KEY FEATURE 3!) */}
      {activeTab === 'requests' && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">Student Access & Resource Permissions</h2>
              <p className="text-xs text-slate-400 mt-1">
                Review and approve student requests for specialized research labs, maker workshops, or digital libraries at {myCollege.name}.
              </p>
            </div>
            <span className="text-xs text-slate-400">
              Total Requests: <strong>{myRequests.length}</strong>
            </span>
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
                  <strong>Purpose stated:</strong> {req.purpose}
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
                      onClick={() => decideAccessRequest(req.id, 'rejected', 'Declined by administration.')}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject Request
                    </button>
                    <button
                      onClick={() => decideAccessRequest(req.id, 'approved', 'Approved for research and hardware project work. Please bring college ID.')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve & Issue Access Pass
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

      {/* Tab 3: Attendees & Pass Holders */}
      {activeTab === 'attendees' && (
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">Registered Attendees & Verification Records</h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time check-in status of students across all events hosted by {myCollege.name}.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              Scan Passes
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
                          VALID / PENDING SCAN
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

      {/* Tab 4: Edit College Info */}
      {activeTab === 'edit_college' && (
        <div className="glass-panel p-6 rounded-2xl max-w-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Update College Data & Public Profile</h2>
            <p className="text-xs text-slate-400 mt-1">
              Changes reflect immediately on the Explore Colleges, College Profile, and Comparison tables.
            </p>
          </div>

          <form onSubmit={handleCollegeUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                B.Tech Computer Science Annual Tuition (₹)
              </label>
              <input
                type="number"
                value={editedFee}
                onChange={(e) => setEditedFee(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hostel & Mess Annual Cost (₹)
              </label>
              <input
                type="number"
                value={editedHostelFee}
                onChange={(e) => setEditedHostelFee(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current Admission Deadline
              </label>
              <input
                type="text"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-600/30"
            >
              <Save className="w-4 h-4" />
              Save Updates & Audit Timestamp
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
