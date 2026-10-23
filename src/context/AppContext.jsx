import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COLLEGES,
  INITIAL_EVENTS,
  INITIAL_PASSES,
  INITIAL_ACCESS_REQUESTS,
  INITIAL_TEAMS,
  DEMO_USERS
} from '../data/mockData';

const AppContext = createContext();

const safeGetLocalStorage = (key, fallback) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') return fallback;
    return JSON.parse(saved);
  } catch (err) {
    console.warn(`Failed to parse ${key} from localStorage, using fallback`, err);
    return fallback;
  }
};

export function AppProvider({ children }) {
  // Current active demo user
  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      return (typeof window !== 'undefined' && localStorage.getItem('cb_current_user_id')) || DEMO_USERS[0].id;
    } catch (e) {
      return DEMO_USERS[0].id;
    }
  });

  const currentUser = DEMO_USERS.find(u => u.id === currentUserId) || DEMO_USERS[0];

  // Colleges
  const [colleges, setColleges] = useState(() => {
    return safeGetLocalStorage('cb_colleges', INITIAL_COLLEGES);
  });

  // Events
  const [events, setEvents] = useState(() => {
    return safeGetLocalStorage('cb_events', INITIAL_EVENTS);
  });

  // Passes
  const [passes, setPasses] = useState(() => {
    return safeGetLocalStorage('cb_passes', INITIAL_PASSES);
  });

  // Access Requests
  const [accessRequests, setAccessRequests] = useState(() => {
    return safeGetLocalStorage('cb_access_requests', INITIAL_ACCESS_REQUESTS);
  });

  // Teams
  const [teams, setTeams] = useState(() => {
    return safeGetLocalStorage('cb_teams', INITIAL_TEAMS);
  });

  // Compare List (up to 3 colleges)
  const [compareList, setCompareList] = useState(() => {
    return safeGetLocalStorage('cb_compare_list', ["col-meerut-1", "col-noida-1"]);
  });

  // Active Toast notification
  const [toast, setToast] = useState(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('cb_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('cb_colleges', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('cb_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('cb_passes', JSON.stringify(passes));
  }, [passes]);

  useEffect(() => {
    localStorage.setItem('cb_access_requests', JSON.stringify(accessRequests));
  }, [accessRequests]);

  useEffect(() => {
    localStorage.setItem('cb_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('cb_compare_list', JSON.stringify(compareList));
  }, [compareList]);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const switchUser = (userId) => {
    const target = DEMO_USERS.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      showToast(`Switched active view to: ${target.name} (${target.role === 'college_admin' ? 'College Admin' : target.role === 'super_admin' ? 'Super Admin' : 'Student'})`, 'success');
    }
  };

  // Compare functions
  const toggleCompare = (collegeId) => {
    if (compareList.includes(collegeId)) {
      setCompareList(prev => prev.filter(id => id !== collegeId));
      showToast('Removed from comparison', 'info');
    } else {
      if (compareList.length >= 3) {
        showToast('Maximum 3 colleges can be compared at a time.', 'warning');
        return;
      }
      setCompareList(prev => [...prev, collegeId]);
      showToast('Added to side-by-side comparison!', 'success');
    }
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // College Admin update function
  const updateCollege = (collegeId, updatedFields) => {
    setColleges(prev => prev.map(col => {
      if (col.id === collegeId) {
        return {
          ...col,
          ...updatedFields,
          lastCheckedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
      return col;
    }));
    showToast('College information successfully updated & synced!', 'success');
  };

  // Create Event with Target Campus selection
  const createEvent = (eventData) => {
    const newId = `evt-${Date.now()}`;
    const newEvent = {
      id: newId,
      hostCollegeId: currentUser.collegeId || "col-meerut-1",
      hostCollegeName: currentUser.collegeName || "Meerut Institute of Technology & Science",
      hostCity: "Meerut",
      ...eventData
    };

    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published! Broadcasted to selected campuses.`, 'success');
    return newEvent;
  };

  // Student Register for Event
  const registerForEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found' };

    // Check duplicate
    const existing = passes.find(p => p.eventId === eventId && p.studentId === currentUser.id);
    if (existing) {
      showToast(`You already have a valid pass for "${event.title}"! Check 'My Passes'.`, 'warning');
      return { success: false, message: 'Already registered', pass: existing };
    }

    // Check college eligibility
    if (event.targetScope === 'SELECTED_COLLEGES') {
      const isEligible = event.targetColleges.includes(currentUser.collegeId);
      if (!isEligible && currentUser.role === 'student') {
        showToast(`Your campus (${currentUser.collegeName}) is not in the targeted campus list for this private event.`, 'error');
        return { success: false, message: 'Campus not eligible' };
      }
    }

    // Generate Pass
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    const token = `CB-PASS-${randomHex}-${Date.now().toString(36).toUpperCase()}`;

    const newPass = {
      token,
      eventId: event.id,
      eventTitle: event.title,
      hostCollegeName: event.hostCollegeName,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentCollege: currentUser.collegeName,
      studentBranch: currentUser.branch || "Engineering",
      studentEmail: currentUser.email,
      registeredAt: new Date().toISOString(),
      used: false,
      checkedInAt: null,
      checkedInBy: null
    };

    setPasses(prev => [newPass, ...prev]);
    showToast(`Registered successfully for ${event.title}! QR Pass generated.`, 'success');
    return { success: true, pass: newPass };
  };

  // Check-In validation (DUPLICATE RESISTANT!)
  const checkInPass = (token) => {
    const trimmed = (token || '').trim();
    const pass = passes.find(p => p.token === trimmed);

    if (!pass) {
      return {
        success: false,
        status: 'INVALID',
        message: 'Invalid Pass Token! No registration record found in database.'
      };
    }

    if (pass.used) {
      return {
        success: false,
        status: 'ALREADY_USED',
        message: `REJECTED: Pass has already been used on ${new Date(pass.checkedInAt).toLocaleTimeString()} by ${pass.checkedInBy || 'Organizer'}. Duplicate entry forbidden!`,
        pass
      };
    }

    // Mark as used atomically
    const now = new Date().toISOString();
    const updatedPass = {
      ...pass,
      used: true,
      checkedInAt: now,
      checkedInBy: currentUser.name || "Event Organizer"
    };

    setPasses(prev => prev.map(p => p.token === trimmed ? updatedPass : p));
    showToast(`Pass verified! ${pass.studentName} checked in.`, 'success');

    return {
      success: true,
      status: 'VERIFIED',
      message: `Pass Verified! Welcome, ${pass.studentName} (${pass.studentCollege}).`,
      pass: updatedPass
    };
  };

  // Student Access Request to College
  const submitAccessRequest = ({ targetCollegeId, resourceId, resourceTitle, purpose }) => {
    const targetCol = colleges.find(c => c.id === targetCollegeId);
    const newReq = {
      id: `req-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentCollege: currentUser.collegeName,
      targetCollegeId,
      targetCollegeName: targetCol ? targetCol.name : "Target College",
      resourceId,
      resourceTitle,
      purpose,
      status: "pending",
      requestedAt: new Date().toISOString(),
      decisionAt: null,
      decisionRemarks: null,
      accessPassCode: null
    };

    setAccessRequests(prev => [newReq, ...prev]);
    showToast(`Access request for "${resourceTitle}" submitted to ${targetCol?.shortName || 'College Admin'}!`, 'success');
    return newReq;
  };

  // College Admin Decision
  const decideAccessRequest = (requestId, decision, remarks = '') => {
    setAccessRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const isApproved = decision === 'approved';
        const passCode = isApproved ? `PASS-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : null;
        return {
          ...req,
          status: decision,
          decisionAt: new Date().toISOString(),
          decisionRemarks: remarks || (isApproved ? 'Permission granted. Present your college ID at security reception.' : 'Request could not be accommodated at this time.'),
          accessPassCode: passCode
        };
      }
      return req;
    }));

    showToast(`Access request has been ${decision.toUpperCase()}!`, decision === 'approved' ? 'success' : 'info');
  };

  // Team creation and joining
  const createTeam = (teamData) => {
    const newTeam = {
      id: `team-${Date.now()}`,
      leaderName: currentUser.name,
      leaderCollege: currentUser.collegeName,
      contactEmail: currentUser.email,
      currentMembers: 1,
      members: [{ name: currentUser.name, role: "Team Lead", college: currentUser.collegeName }],
      ...teamData
    };
    setTeams(prev => [newTeam, ...prev]);
    showToast(`Team "${newTeam.title}" created! Visible to all students.`, 'success');
    return newTeam;
  };

  const joinTeam = (teamId, memberRole) => {
    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        if (team.currentMembers >= team.maxMembers) {
          showToast('This team is already full!', 'warning');
          return team;
        }
        const alreadyMember = team.members.some(m => m.name === currentUser.name);
        if (alreadyMember) {
          showToast('You are already a member of this team!', 'warning');
          return team;
        }
        showToast(`Joined ${team.title} as ${memberRole || 'Contributor'}!`, 'success');
        return {
          ...team,
          currentMembers: team.currentMembers + 1,
          members: [
            ...team.members,
            { name: currentUser.name, role: memberRole || "Developer", college: currentUser.collegeName }
          ]
        };
      }
      return team;
    }));
  };

  // Reset to demo data if user wants fresh state
  const resetDemoData = () => {
    localStorage.removeItem('cb_colleges');
    localStorage.removeItem('cb_events');
    localStorage.removeItem('cb_passes');
    localStorage.removeItem('cb_access_requests');
    localStorage.removeItem('cb_teams');
    localStorage.removeItem('cb_compare_list');
    setColleges(INITIAL_COLLEGES);
    setEvents(INITIAL_EVENTS);
    setPasses(INITIAL_PASSES);
    setAccessRequests(INITIAL_ACCESS_REQUESTS);
    setTeams(INITIAL_TEAMS);
    setCompareList(["col-meerut-1", "col-noida-1"]);
    showToast('Platform reset to initial demo dataset.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: DEMO_USERS,
        switchUser,
        colleges,
        updateCollege,
        events,
        createEvent,
        passes,
        registerForEvent,
        checkInPass,
        accessRequests,
        submitAccessRequest,
        decideAccessRequest,
        teams,
        createTeam,
        joinTeam,
        compareList,
        toggleCompare,
        clearCompare,
        resetDemoData,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
