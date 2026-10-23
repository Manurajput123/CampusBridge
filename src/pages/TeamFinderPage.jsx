import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  UserPlus,
  Plus,
  Search,
  Building2,
  Calendar,
  CheckCircle2,
  Send,
  Sparkles,
  Tag
} from 'lucide-react';

export default function TeamFinderPage() {
  const { teams, createTeam, joinTeam, events, currentUser, showToast } = useApp();

  const [searchSkill, setSearchSkill] = useState('');
  const [filterEvent, setFilterEvent] = useState('ALL');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Team state
  const [teamTitle, setTeamTitle] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [teamDesc, setTeamDesc] = useState('');
  const [neededRolesInput, setNeededRolesInput] = useState('React Dev, Python AI Engineer');
  const [maxMembers, setMaxMembers] = useState(4);

  // Join Role prompt state
  const [joinModalTeam, setJoinModalTeam] = useState(null);
  const [myJoinRole, setMyJoinRole] = useState('Frontend Developer');

  const filteredTeams = teams.filter(t => {
    if (filterEvent !== 'ALL' && t.eventId !== filterEvent) return false;
    if (searchSkill.trim()) {
      const q = searchSkill.toLowerCase();
      const hasSkill = t.neededRoles.some(r => r.toLowerCase().includes(q)) ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      if (!hasSkill) return false;
    }
    return true;
  });

  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    if (!teamTitle.trim() || !teamDesc.trim()) {
      showToast('Please enter team title and description.', 'warning');
      return;
    }

    const eventObj = events.find(e => e.id === selectedEventId) || events[0];
    const rolesArray = neededRolesInput.split(',').map(r => r.trim()).filter(Boolean);

    createTeam({
      title: teamTitle,
      eventId: eventObj.id,
      eventTitle: eventObj.title,
      description: teamDesc,
      neededRoles: rolesArray.length > 0 ? rolesArray : ['Developer', 'Designer'],
      maxMembers: parseInt(maxMembers, 10)
    });

    setCreateModalOpen(false);
    setTeamTitle('');
    setTeamDesc('');
  };

  const handleConfirmJoin = (e) => {
    e.preventDefault();
    if (joinModalTeam) {
      joinTeam(joinModalTeam.id, myJoinRole);
      setJoinModalTeam(null);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Student Collaboration Network
          </div>
          <h1 className="text-3xl font-extrabold text-white">Inter-College Team Finder</h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect across campuses. Form multidisciplinary hackathon teams with students from Meerut, Noida, Ghaziabad, and Delhi.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Post Team Recruitment</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by required skill (e.g. React, Python, ML, Figma, Docker)..."
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-400"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-white"
          >
            <option value="ALL" className="bg-slate-900">All Competitions</option>
            {events.map(evt => (
              <option key={evt.id} value={evt.id} className="bg-slate-900">{evt.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => {
          const isFull = team.currentMembers >= team.maxMembers;
          const isMember = team.members.some(m => m.name === currentUser.name);

          return (
            <div
              key={team.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                      {team.eventTitle}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{team.title}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isFull ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {team.currentMembers} / {team.maxMembers} Members
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Lead: <strong>{team.leaderName}</strong> ({team.leaderCollege})</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {team.description}
                </p>

                {/* Needed Roles */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-indigo-400" />
                    <span>Needed Skills:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {team.neededRoles.map((role, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-semibold">
                        + {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Members List */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="font-semibold text-slate-400">Current Members:</div>
                  {team.members.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300">
                      <span>• {m.name} ({m.college})</span>
                      <span className="text-slate-500">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800">
                {isMember ? (
                  <div className="w-full py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    You are in this team
                  </div>
                ) : isFull ? (
                  <div className="w-full py-2 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold text-center">
                    Team is Full
                  </div>
                ) : (
                  <button
                    onClick={() => setJoinModalTeam(team)}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Request to Join Team
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Team Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">CampusBridge Collaboration</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Create Cross-College Hackathon Squad</h3>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Team Title *</label>
                <input
                  type="text"
                  placeholder="e.g. AI Visionaries, DroneMakers NCR..."
                  value={teamTitle}
                  onChange={(e) => setTeamTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Competition / Hackathon</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                >
                  {events.map(evt => (
                    <option key={evt.id} value={evt.id} className="bg-slate-900">{evt.title} ({evt.hostCity})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Needed Roles & Skills (comma separated) *</label>
                <input
                  type="text"
                  placeholder="FastAPI Backend, UI/UX Designer, ML Specialist"
                  value={neededRolesInput}
                  onChange={(e) => setNeededRolesInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Idea / Summary *</label>
                <textarea
                  rows="3"
                  placeholder="What are you aiming to build, and what type of teammate would thrive in your team?"
                  value={teamDesc}
                  onChange={(e) => setTeamDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Publish Squad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Team Role Dialog */}
      {joinModalTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Join {joinModalTeam.title}</h3>
            <p className="text-xs text-slate-400">
              You are applying as <strong>{currentUser.name}</strong> from {currentUser.collegeName}.
            </p>

            <form onSubmit={handleConfirmJoin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Role in Team</label>
                <select
                  value={myJoinRole}
                  onChange={(e) => setMyJoinRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs text-white"
                >
                  {joinModalTeam.neededRoles.map((r, i) => (
                    <option key={i} value={r} className="bg-slate-900">{r}</option>
                  ))}
                  <option value="General Developer" className="bg-slate-900">General Developer</option>
                  <option value="Presenter & Researcher" className="bg-slate-900">Presenter & Pitch Lead</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setJoinModalTeam(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Confirm Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
