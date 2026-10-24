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

export const INITIAL_NOTICES = [
  {
    id: "not-1",
    title: "Joint Pooled Campus Placement Drive: Microsoft & Deloitte 2026",
    category: "Pool Campus Placement",
    hostCollegeId: "col-noida-1",
    hostCollegeName: "Noida Institute of Engineering & Technology",
    hostCity: "Greater Noida",
    targetScope: "SELECTED_COLLEGES",
    targetColleges: ["col-meerut-1", "col-gzb-1", "col-noida-1"],
    targetCollegeNames: [
      "Meerut Institute of Technology & Science",
      "Ghaziabad Engineering & Tech Academy",
      "Noida Institute of Engineering & Technology"
    ],
    summary: "NIET is extending pooled placement drive invitations to eligible B.Tech CSE/IT 2026 batch students of MITS Meerut and GEA Ghaziabad. CTC package: ₹14 LPA - ₹44 LPA.",
    content: "NIET Career Advancement Cell officially invites student nominations from partner colleges in Meerut and Ghaziabad. Eligible branches: B.Tech CSE, IT, AI & Data Science with minimum 70% aggregate marks throughout. Registration deadline for student list submission is November 10, 2026. Online coding test will be conducted on November 18, 2026.",
    deadline: "November 10, 2026",
    contactPerson: "Dr. Alok Verma (Director of Corporate Relations, NIET)",
    contactEmail: "placements@niet.co.in",
    datePublished: "October 22, 2026",
    status: "ACTIVE"
  },
  {
    id: "not-2",
    title: "Shared Research Access: NVIDIA A100 Supercomputing Cluster",
    category: "Shared Research Facility",
    hostCollegeId: "col-delhi-1",
    hostCollegeName: "Delhi Technological University (DTU)",
    hostCity: "New Delhi",
    targetScope: "SELECTED_COLLEGES",
    targetColleges: ["col-meerut-1", "col-noida-1", "col-gzb-1"],
    targetCollegeNames: [
      "Meerut Institute of Technology & Science",
      "Noida Institute of Engineering & Technology",
      "Ghaziabad Engineering & Tech Academy"
    ],
    summary: "DTU opens high-performance compute nodes for validated inter-university research scholars in Generative AI, Molecular Modeling & Quantum simulations.",
    content: "Under the NCR Technical Consortium, faculty and student project leads from partner engineering colleges can apply for remote compute slots on our 8x NVIDIA A100 (80GB) cluster. Allocation will be made on a peer-reviewed project basis with up to 100 GPU compute hours per validated team.",
    deadline: "December 01, 2026",
    contactPerson: "Prof. S.K. Garg (Dean of Research & Sponsored Projects, DTU)",
    contactEmail: "supercompute@dtu.ac.in",
    datePublished: "October 21, 2026",
    status: "ACTIVE"
  },
  {
    id: "not-3",
    title: "Regional Faculty & Student Exchange Proposal for Robotics Labs",
    category: "Academic MoU & Collaboration",
    hostCollegeId: "col-meerut-1",
    hostCollegeName: "Meerut Institute of Technology & Science",
    hostCity: "Meerut",
    targetScope: "SELECTED_COLLEGES",
    targetColleges: ["col-noida-1", "col-gzb-1"],
    targetCollegeNames: [
      "Noida Institute of Engineering & Technology",
      "Ghaziabad Engineering & Tech Academy"
    ],
    summary: "MITS Meerut proposes reciprocal laboratory usage and joint mentorship for students participating in national hardware robotics competitions.",
    content: "MITS Meerut welcomes collaborative engagement with robotics societies at NIET Greater Noida and GEA Ghaziabad. We offer reciprocal access to our KUKA 6-axis industrial manipulator setup in exchange for telemetry and embedded sensors calibration facilities.",
    deadline: "November 25, 2026",
    contactPerson: "Dr. R.K. Sharma (Dean of Student Affairs, MITS Meerut)",
    contactEmail: "dean.academics@mitsmeerut.ac.in",
    datePublished: "October 20, 2026",
    status: "ACTIVE"
  }
];

export function AppProvider({ children }) {
  // Users list (persisted so new college admins & students stay registered)
  const [users, setUsers] = useState(() => {
    const loaded = safeGetLocalStorage('cb_users', DEMO_USERS);
    // Sanitize any previous session with dummy name "Aarav"
    const sanitized = loaded.map(u => {
      if (u.id === 'usr-aarav' || u.name?.includes('Aarav')) {
        return {
          ...u,
          id: 'usr-student',
          name: 'Campus Student',
          email: 'student@campusbridge.edu'
        };
      }
      return u;
    });

    // Merge any new demo users (e.g. AKGEC & KIET Deans)
    const existingUserIds = new Set(sanitized.map(u => u.id));
    for (const demoU of DEMO_USERS) {
      if (!existingUserIds.has(demoU.id)) {
        sanitized.push(demoU);
        existingUserIds.add(demoU.id);
      }
    }
    return sanitized;
  });

  // Current active user ID
  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      const stored = (typeof window !== 'undefined' && localStorage.getItem('cb_current_user_id'));
      if (stored === 'usr-aarav') return 'usr-student';
      return stored || DEMO_USERS[0].id;
    } catch (e) {
      return DEMO_USERS[0].id;
    }
  });

  // Logged-in session tracking (avoids displaying login bar after authenticating)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const stored = typeof window !== 'undefined' && localStorage.getItem('cb_is_logged_in');
      if (stored !== null) return stored === 'true';
      return true; // Default session active for smooth initial exploration
    } catch (e) {
      return true;
    }
  });

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || DEMO_USERS[0];

  // Colleges: Merges fresh default colleges with any user-created colleges from localStorage
  const [colleges, setColleges] = useState(() => {
    const loaded = safeGetLocalStorage('cb_colleges', INITIAL_COLLEGES);
    const existingIds = new Set(loaded.map(c => c.id));
    const merged = [...loaded];
    for (const initCol of INITIAL_COLLEGES) {
      if (!existingIds.has(initCol.id)) {
        merged.push(initCol);
        existingIds.add(initCol.id);
      }
    }
    return merged;
  });

  // Events
  const [events, setEvents] = useState(() => {
    return safeGetLocalStorage('cb_events', INITIAL_EVENTS);
  });

  // Cross-Campus Information Bulletins / Notices
  const [notices, setNotices] = useState(() => {
    return safeGetLocalStorage('cb_notices', INITIAL_NOTICES);
  });

  // Cross-Campus Formal Event Invitations
  const [invitations, setInvitations] = useState(() => {
    return safeGetLocalStorage('cb_invitations', [
      {
        id: "inv-1",
        fromCollegeId: "col-meerut-1",
        fromCollegeName: "Meerut Institute of Technology & Science",
        toCollegeId: "col-noida-1",
        toCollegeName: "Noida Institute of Engineering & Technology",
        eventId: "evt-hackathon-meerut",
        eventTitle: "North India Inter-College Hackathon 2026",
        sentAt: "2026-10-21T09:00:00Z",
        status: "ACCEPTED",
        studentsRegisteredCount: 4
      },
      {
        id: "inv-2",
        fromCollegeId: "col-meerut-1",
        fromCollegeName: "Meerut Institute of Technology & Science",
        toCollegeId: "col-gzb-1",
        toCollegeName: "Ghaziabad Engineering & Tech Academy",
        eventId: "evt-hackathon-meerut",
        eventTitle: "North India Inter-College Hackathon 2026",
        sentAt: "2026-10-21T09:00:00Z",
        status: "ACCEPTED",
        studentsRegisteredCount: 2
      }
    ]);
  });

  // Passes: Merges fresh initial passes with user generated passes
  const [passes, setPasses] = useState(() => {
    const loaded = safeGetLocalStorage('cb_passes', INITIAL_PASSES);
    const existingTokens = new Set(loaded.map(p => p.token));
    const merged = [...loaded];
    for (const initP of INITIAL_PASSES) {
      if (!existingTokens.has(initP.token)) {
        merged.push(initP);
        existingTokens.add(initP.token);
      }
    }
    return merged;
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
    try {
      localStorage.setItem('cb_is_logged_in', String(isLoggedIn));
      localStorage.setItem('cb_current_user_id', currentUserId);
      localStorage.setItem('cb_users', JSON.stringify(users));
      localStorage.setItem('cb_colleges', JSON.stringify(colleges));
      localStorage.setItem('cb_events', JSON.stringify(events));
      localStorage.setItem('cb_notices', JSON.stringify(notices));
      localStorage.setItem('cb_invitations', JSON.stringify(invitations));
      localStorage.setItem('cb_passes', JSON.stringify(passes));
      localStorage.setItem('cb_access_requests', JSON.stringify(accessRequests));
      localStorage.setItem('cb_teams', JSON.stringify(teams));
      localStorage.setItem('cb_compare_list', JSON.stringify(compareList));
    } catch (err) {
      console.warn("Storage sync error", err);
    }
  }, [isLoggedIn, currentUserId, users, colleges, events, notices, invitations, passes, accessRequests, teams, compareList]);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const switchUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      setIsLoggedIn(true);
      showToast(`Switched active view to: ${target.name} (${target.role === 'college_admin' ? '🏛️ ' + target.collegeName + ' Admin' : target.role === 'super_admin' ? '👑 Super Admin' : '🎓 Student'})`, 'success');
    }
  };

  // 1. STUDENT REGISTRATION & SIGN UP
  const registerStudent = ({ name, email, password, collegeId, branch, year, skills }) => {
    const col = colleges.find(c => c.id === collegeId) || colleges[0];
    const newStudentId = `usr-std-${Date.now()}`;
    const skillsArray = typeof skills === 'string'
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : (skills || ['Web Development', 'Python']);

    const newStudentUser = {
      id: newStudentId,
      name: name || "Student",
      email: email,
      password: password || "password123",
      role: "student",
      collegeId: col.id,
      collegeName: col.name,
      branch: `${branch || 'Computer Science'} (${year || '3rd Year'})`,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      skills: skillsArray.length > 0 ? skillsArray : ["React.js", "Python", "Problem Solving"],
      bio: `Enrolled student at ${col.shortName || col.name}. Actively exploring regional hackathons and inter-college projects.`
    };

    setUsers(prev => [newStudentUser, ...prev]);
    setCurrentUserId(newStudentId);
    setIsLoggedIn(true);
    showToast(`🎉 Student account created successfully! Welcome, ${name}.`, 'success');
    return newStudentUser;
  };

  // 2. USER LOGIN
  const loginUser = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      setCurrentUserId(found.id);
      setIsLoggedIn(true);
      showToast(`Welcome back, ${found.name}! Signed in as ${found.role === 'college_admin' ? 'College Admin' : 'Student'}.`, 'success');
      return { success: true, user: found };
    }

    // Auto-create student if not found for seamless hackathon testing
    const defaultStudent = registerStudent({
      name: email.split('@')[0],
      email: email,
      password: password,
      collegeId: colleges[0].id,
      branch: "Computer Science",
      year: "3rd Year",
      skills: "React, Python"
    });
    setIsLoggedIn(true);
    return { success: true, user: defaultStudent };
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed out of CampusBridge. Switched to Guest mode.', 'info');
  };

  // 3. REGISTER NEW COLLEGE (Self-Onboarding)
  const registerNewCollege = ({ college, admin }) => {
    const colId = `col-${Date.now()}`;
    const adminId = `admin-${Date.now()}`;

    const newAdminUser = {
      id: adminId,
      name: admin.name || "Dean / Event Coordinator",
      email: admin.email || `admin@${college.shortName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`,
      role: "college_admin",
      collegeId: colId,
      collegeName: college.name,
      designation: admin.designation || "Director of Student Affairs & Events",
      avatar: admin.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    };

    const initialCourses = college.courses && college.courses.length > 0 ? college.courses : [
      {
        id: `c-${Date.now()}-1`,
        name: "B.Tech Computer Science & Engineering",
        branch: "CSE",
        duration: "4 Years",
        annualFee: parseInt(college.defaultFee, 10) || 125000,
        totalSeats: 180,
        eligibility: "10+2 with PCM (Min 60%) + JEE Main / CUET",
        averagePackage: "₹7.8 LPA",
        highestPackage: "₹36.0 LPA"
      },
      {
        id: `c-${Date.now()}-2`,
        name: "B.Tech Artificial Intelligence & Data Science",
        branch: "AI & DS",
        duration: "4 Years",
        annualFee: (parseInt(college.defaultFee, 10) || 125000) + 10000,
        totalSeats: 120,
        eligibility: "10+2 with PCM (Min 60%) + JEE Main",
        averagePackage: "₹8.2 LPA",
        highestPackage: "₹40.0 LPA"
      }
    ];

    const newCollegeObj = {
      id: colId,
      name: college.name,
      shortName: college.shortName || college.name,
      city: college.city || "Greater Noida",
      state: college.state || "Uttar Pradesh",
      founded: parseInt(college.founded, 10) || 2012,
      type: college.type || "Autonomous / Private University",
      rating: 4.5,
      reviewsCount: 150,
      accreditation: college.accreditation || "NAAC A+ & NBA Accredited",
      campusSize: college.campusSize || "35 Acres Green Campus",
      claimed: true,
      claimedByAdminId: adminId,
      verified: true,
      tagLine: college.tagLine || "Pioneering Technical Excellence, Research & Innovation",
      bannerImage: college.bannerImage || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      logo: college.logo || "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=160&q=80",
      about: college.about || `${college.name} is a premier technical institution delivering high-impact engineering education, research incubators, and corporate partnerships across India.`,
      contact: {
        email: admin.email || `contact@${college.shortName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`,
        phone: college.phone || "+91 120 450 7800",
        website: college.website || "https://campusbridge.in",
        address: college.address || `${college.city}, ${college.state || 'India'}`
      },
      courses: initialCourses,
      admissionDetails: {
        status: "Admissions Open 2026-27",
        applicationDeadline: college.deadline || "August 15, 2026",
        entranceExams: ["JEE Main", "State Entrance", "CUET-UG"],
        hostelFeePerYear: parseInt(college.hostelFee, 10) || 80000,
        brochureUrl: "#brochure"
      },
      placementStats: {
        avgPackage: college.avgPackage || "₹7.8 LPA",
        highestPackage: college.highestPackage || "₹38.0 LPA",
        placementRate: "91%",
        topRecruiters: ["Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Cognizant", "Deloitte"]
      },
      facilities: [
        "High-Performance Computing Cluster",
        "Robotics & IoT Innovation Hub",
        "Air-Conditioned Central Library",
        "High-Speed 1Gbps Campus Wi-Fi",
        "Hostel Complex & Sports Arena"
      ],
      restrictedResources: [
        {
          id: `res-${colId}-1`,
          title: "Hardware MakerSpace & Prototyping Lab",
          category: "Hardware & 3D Printing",
          description: "Access to laser cutters, CNC milling, and 3D printing for verified inter-college project teams.",
          requiredRole: "Partner Campus Students"
        }
      ],
      sourceLink: "https://campusbridge.in/partner-disclosure",
      lastCheckedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setColleges(prev => [newCollegeObj, ...prev]);
    setUsers(prev => [newAdminUser, ...prev]);
    setCurrentUserId(adminId);
    showToast(`🎉 "${newCollegeObj.name}" successfully registered and verified on CampusBridge!`, 'success');
    return { college: newCollegeObj, admin: newAdminUser };
  };

  // 4. CLAIM COLLEGE
  const claimCollege = (collegeId, adminData) => {
    const targetCol = colleges.find(c => c.id === collegeId);
    if (!targetCol) return;

    const adminId = `admin-claim-${Date.now()}`;
    const newAdmin = {
      id: adminId,
      name: adminData.name || "Authorized College Official",
      email: adminData.email || "admin@" + targetCol.shortName.toLowerCase().replace(/[^a-z0-9]/g, '') + ".edu.in",
      role: "college_admin",
      collegeId: collegeId,
      collegeName: targetCol.name,
      designation: adminData.designation || "Director / Dean of Academics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
    };

    setColleges(prev => prev.map(c => c.id === collegeId ? { ...c, claimed: true, claimedByAdminId: adminId } : c));
    setUsers(prev => [newAdmin, ...prev]);
    setCurrentUserId(adminId);
    showToast(`Authority claimed for ${targetCol.name}! You are now the official admin.`, 'success');
  };

  // 5. CROSS-COLLEGE DIRECT INFORMATION / CIRCULAR BROADCAST SYSTEM
  // (Feature: Option for college to give information directly to other selected colleges)
  const createNotice = (noticeData) => {
    const newId = `not-${Date.now()}`;
    const hostColId = currentUser.collegeId || "col-meerut-1";
    const hostCol = colleges.find(c => c.id === hostColId);

    const targetNames = colleges
      .filter(c => noticeData.targetColleges?.includes(c.id))
      .map(c => c.name);

    const newNotice = {
      id: newId,
      hostCollegeId: hostColId,
      hostCollegeName: hostCol ? hostCol.name : currentUser.collegeName,
      hostCity: hostCol ? hostCol.city : "Meerut",
      targetCollegeNames: noticeData.targetScope === 'ALL' ? ['All Partner Colleges'] : targetNames,
      datePublished: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "ACTIVE",
      ...noticeData
    };

    setNotices(prev => [newNotice, ...prev]);
    showToast(`📢 Information circular dispatched to ${newNotice.targetCollegeNames.length} selected partner colleges!`, 'success');
    return newNotice;
  };

  // 6. ADD & REMOVE COURSES
  const addCourseToCollege = (collegeId, courseData) => {
    const newCourseObj = {
      id: `c-${Date.now()}`,
      name: courseData.name || "B.Tech Specialized",
      branch: courseData.branch || "CSE Specialization",
      duration: courseData.duration || "4 Years",
      annualFee: parseInt(courseData.annualFee, 10) || 120000,
      totalSeats: parseInt(courseData.totalSeats, 10) || 120,
      eligibility: courseData.eligibility || "10+2 with PCM (Min 60%) + Entrance Score",
      averagePackage: courseData.averagePackage || "₹7.0 LPA",
      highestPackage: courseData.highestPackage || "₹30.0 LPA"
    };

    setColleges(prev => prev.map(col => {
      if (col.id === collegeId) {
        return {
          ...col,
          courses: [...col.courses, newCourseObj],
          lastCheckedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
      return col;
    }));

    showToast(`Added program "${newCourseObj.name}" to college catalog!`, 'success');
  };

  const removeCourseFromCollege = (collegeId, courseId) => {
    setColleges(prev => prev.map(col => {
      if (col.id === collegeId) {
        return {
          ...col,
          courses: col.courses.filter(c => c.id !== courseId)
        };
      }
      return col;
    }));
    showToast("Program removed from catalog.", "info");
  };

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
    showToast('College information successfully updated & synced across CampusBridge!', 'success');
  };

  // 7. CREATE EVENT & INVITATIONS
  const createEvent = (eventData) => {
    const newId = `evt-${Date.now()}`;
    const hostColId = currentUser.collegeId || "col-meerut-1";
    const hostCol = colleges.find(c => c.id === hostColId);

    const newEvent = {
      id: newId,
      hostCollegeId: hostColId,
      hostCollegeName: hostCol ? hostCol.name : currentUser.collegeName,
      hostCity: hostCol ? hostCol.city : "Meerut",
      ...eventData
    };

    if (newEvent.targetScope === 'SELECTED_COLLEGES' && newEvent.targetColleges?.length > 0) {
      const newInvites = newEvent.targetColleges.map((targetId, idx) => {
        const targetCol = colleges.find(c => c.id === targetId);
        return {
          id: `inv-${Date.now()}-${idx}`,
          fromCollegeId: hostColId,
          fromCollegeName: hostCol ? hostCol.name : currentUser.collegeName,
          toCollegeId: targetId,
          toCollegeName: targetCol ? targetCol.name : "Partner Campus",
          eventId: newId,
          eventTitle: newEvent.title,
          sentAt: new Date().toISOString(),
          status: "INVITATION_DELIVERED",
          studentsRegisteredCount: 0
        };
      });

      setInvitations(prev => [...newInvites, ...prev]);
    }

    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published! Official invitations sent to selected partner campuses.`, 'success');
    return newEvent;
  };

  // 8. EVENT REGISTRATION & QR PASSES
  const registerForEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found' };

    const existing = passes.find(p => p.eventId === eventId && p.studentId === currentUser.id);
    if (existing) {
      showToast(`You already have a valid pass for "${event.title}"! Check 'My Passes'.`, 'warning');
      return { success: false, message: 'Already registered', pass: existing };
    }

    if (event.targetScope === 'SELECTED_COLLEGES') {
      const isEligible = event.targetColleges.includes(currentUser.collegeId);
      if (!isEligible && currentUser.role === 'student') {
        showToast(`Your campus (${currentUser.collegeName}) is not in the targeted campus list for this private event.`, 'error');
        return { success: false, message: 'Campus not eligible' };
      }
    }

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

    setInvitations(prev => prev.map(inv => {
      if (inv.eventId === eventId && inv.toCollegeId === currentUser.collegeId) {
        return { ...inv, studentsRegisteredCount: (inv.studentsRegisteredCount || 0) + 1 };
      }
      return inv;
    }));

    showToast(`Registered successfully for ${event.title}! QR Pass generated.`, 'success');
    return { success: true, pass: newPass };
  };

  // 9. CHECK IN PASS
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
        message: `REJECTED: Pass has already been used on ${new Date(pass.checkedInAt).toLocaleTimeString()} by ${pass.checkedInBy || 'Security Desk'}. Duplicate entry forbidden!`,
        pass
      };
    }

    // Role & College Verification Check
    const isAdmin = currentUser.role === 'college_admin';
    const adminCollegeId = currentUser.collegeId;
    const passCollegeId = pass.targetCollegeId || (pass.eventId ? events.find(e => e.id === pass.eventId)?.hostCollegeId : null);

    const isMismatch = isAdmin && adminCollegeId && passCollegeId && adminCollegeId !== passCollegeId;

    const now = new Date().toISOString();
    const updatedPass = {
      ...pass,
      used: true,
      checkedInAt: now,
      checkedInBy: currentUser.name || "Campus Gate Security"
    };

    setPasses(prev => prev.map(p => p.token === trimmed ? updatedPass : p));
    
    if (isMismatch) {
      showToast(`⚠️ Warning: Pass belongs to ${pass.targetCollegeName || 'another college'}, scanned at ${currentUser.collegeName}!`, 'warning');
    } else {
      showToast(`Gate Entry Approved! ${pass.studentName} checked in.`, 'success');
    }

    return {
      success: true,
      status: 'VERIFIED',
      isMismatch,
      mismatchWarning: isMismatch 
        ? `⚠️ Campus Mismatch Warning: This pass was issued for ${pass.targetCollegeName || 'another campus'}, but is being scanned at ${currentUser.collegeName}!`
        : null,
      message: `Pass Verified! Entry cleared for ${pass.studentName} (${pass.studentCollege}).`,
      pass: updatedPass
    };
  };

  // 10. GENERATE COLLEGE VISIT PASS (Student requests a campus visit pass for any college)
  const generateCollegeVisitPass = ({ targetCollegeId, purpose, visitDate, timeSlot }) => {
    const targetCol = colleges.find(c => c.id === targetCollegeId) || colleges[0];
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    const shortCode = (targetCol.shortName || targetCol.name).split(' ')[0].toUpperCase();
    const token = `CB-VISIT-${randomHex}-${shortCode}`;

    const newVisitPass = {
      token,
      passType: 'COLLEGE_VISIT',
      targetCollegeId: targetCol.id,
      targetCollegeName: targetCol.name,
      targetCollegeCity: targetCol.city,
      gateLocation: targetCol.contact?.address || `${targetCol.city} Campus Main Gate 1`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentCollege: currentUser.collegeName || 'Verified Affiliate Campus',
      studentEmail: currentUser.email,
      studentBranch: currentUser.branch || 'Engineering',
      purpose: purpose || 'Campus Tour & Admission Counseling',
      visitDate: visitDate || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '10:00 AM - 01:00 PM',
      registeredAt: new Date().toISOString(),
      used: false,
      checkedInAt: null,
      checkedInBy: null
    };

    setPasses(prev => [newVisitPass, ...prev]);
    showToast(`🎟️ Official Visit Pass generated for ${targetCol.name}!`, 'success');
    return { success: true, pass: newVisitPass };
  };

  // 11. ACCESS REQUESTS
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

  // 11. COMPARE
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

  // 12. TEAMS
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

  // 13. RESET TO FRESH DEMO
  const resetDemoData = () => {
    try {
      localStorage.clear();
    } catch(e) {}
    setIsLoggedIn(true);
    setUsers(DEMO_USERS);
    setCurrentUserId(DEMO_USERS[0].id);
    setColleges(INITIAL_COLLEGES);
    setEvents(INITIAL_EVENTS);
    setNotices(INITIAL_NOTICES);
    setInvitations([]);
    setPasses(INITIAL_PASSES);
    setAccessRequests(INITIAL_ACCESS_REQUESTS);
    setTeams(INITIAL_TEAMS);
    setCompareList(["col-meerut-1", "col-noida-1"]);
    showToast('Platform reset to initial demo dataset.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        users,
        switchUser,
        registerStudent,
        loginUser,
        logoutUser,
        colleges,
        registerNewCollege,
        claimCollege,
        updateCollege,
        addCourseToCollege,
        removeCourseFromCollege,
        events,
        createEvent,
        notices,
        createNotice,
        invitations,
        passes,
        registerForEvent,
        generateCollegeVisitPass,
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
