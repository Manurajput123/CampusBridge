import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { X } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import ExploreCollegesPage from './pages/ExploreCollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import CompareCollegesPage from './pages/CompareCollegesPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CollegeAdminPage from './pages/CollegeAdminPage';
import AccessRequestsPage from './pages/AccessRequestsPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import QRScannerPage from './pages/QRScannerPage';
import TeamFinderPage from './pages/TeamFinderPage';
import AIAdvisorPage from './pages/AIAdvisorPage';
import AuthPage from './pages/AuthPage';
import InterCollegeNoticesPage from './pages/InterCollegeNoticesPage';
import InteractiveSpatialNavigator from './components/InteractiveSpatialNavigator';
import PageBackgroundBridge from './components/PageBackgroundBridge';

function MainApp() {
  const { isLoggedIn } = useApp();
  // Starting page is directly the full-page 3D Earth Gateway!
  const [activeTab, setActiveTab] = useState('spatial');
  const [selectedCollegeId, setSelectedCollegeId] = useState('col-meerut-1');
  const [selectedEventId, setSelectedEventId] = useState('evt-hackathon-meerut');
  const [spatialPresetCity, setSpatialPresetCity] = useState('Ghaziabad');
  const [spatialPresetState, setSpatialPresetState] = useState('Uttar Pradesh');

  // If user is already logged in, never trap them on the login/sign up page
  useEffect(() => {
    if (isLoggedIn && activeTab === 'auth') {
      setActiveTab('spatial');
    }
  }, [isLoggedIn, activeTab]);

  // Friendly title for current view
  const getPageTitle = (tab) => {
    switch (tab) {
      case 'explore': return 'Explore & Search Colleges';
      case 'college-detail': return 'College Details & Campus Profile';
      case 'compare': return 'Side-by-Side College Comparison';
      case 'events': return 'Inter-College Events & Broadcasts';
      case 'event-detail': return 'Event Information & Pass Booking';
      case 'admin': return 'College Admin Studio & Partner Portal';
      case 'requests': return 'Campus Lab & Facility Permissions';
      case 'passes': return 'Student Event QR Passes';
      case 'scanner': return 'Gate QR Scanner';
      case 'teams': return 'Cross-College Team Finder';
      case 'ai': return 'AI College Advisor';
      case 'auth': return 'Student & College Admin Authentication';
      case 'notices': return 'Campus Bulletins & Placement Circulars';
      case 'spatial': return '3D Earth Spatial Corridor (World ➔ India ➔ Ghaziabad)';
      default: return 'Active Page';
    }
  };

  // Close current page and return cleanly to Home (or parent)
  const handleCloseCurrentPage = () => {
    if (activeTab === 'college-detail') {
      setActiveTab('explore');
    } else if (activeTab === 'event-detail') {
      setActiveTab('events');
    } else {
      setActiveTab('home');
    }
  };

  // Keyboard shortcut: Press Escape to close active page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeTab !== 'home') {
        handleCloseCurrentPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 relative">
      {/* Light Visible Bridge Background across different pages matching design */}
      <PageBackgroundBridge />

      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSpatialNavigator={() => setActiveTab('spatial')}
        onSelectCollege={(id) => {
          setSelectedCollegeId(id);
          setActiveTab('college-detail');
        }}
      />

      {/* Universal Page Close & Breadcrumb Strip (Appears on ANY page opened except Home) */}
      {activeTab !== 'home' && activeTab !== 'spatial' && (
        <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 sticky top-16 z-30 backdrop-blur-md animate-fade-in shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveTab('home')}
                className="text-slate-400 hover:text-white transition flex items-center gap-1 font-medium hover:underline"
              >
                <span>Home</span>
              </button>
              <span className="text-slate-600">/</span>
              <span className="text-[#ff7043] font-bold tracking-wide">
                {getPageTitle(activeTab)}
              </span>
            </div>

            {/* Prominent "✕ Close Page" Button */}
            <button
              onClick={handleCloseCurrentPage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-rose-950/70 text-slate-300 hover:text-rose-200 border border-slate-800 hover:border-rose-500/50 text-xs font-bold transition group shadow-sm active:scale-95"
              title="Close this page and return to Home (or press Esc)"
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 group-hover:bg-rose-500/30 text-slate-400 group-hover:text-rose-400 flex items-center justify-center text-[10px] font-black">
                ✕
              </span>
              <span>Close Page</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right "✕ Close Page" Button (Quick one-click escape) */}
      {activeTab !== 'home' && activeTab !== 'spatial' && (
        <button
          onClick={handleCloseCurrentPage}
          className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-[#ff5722] text-white text-xs font-bold border border-slate-700/80 hover:border-[#ff5722] shadow-2xl flex items-center gap-2 backdrop-blur-lg transition group active:scale-95 animate-fade-in"
          title="Close current page and return to Home (Esc)"
        >
          <div className="w-5 h-5 rounded-full bg-slate-800 group-hover:bg-white/20 flex items-center justify-center text-xs font-black">
            ✕
          </div>
          <span>Close Page</span>
        </button>
      )}

      {/* Main Page Router */}
      <main className="flex-1">
        {/* Dedicated Full-Page 3D Spatial Gateway */}
        {activeTab === 'spatial' && (
          <InteractiveSpatialNavigator
            onSelectCollege={(id) => {
              setSelectedCollegeId(id);
              setActiveTab('college-detail');
            }}
            onRegisterCollegeInCity={(city, state) => {
              setSpatialPresetCity(city || 'Ghaziabad');
              setSpatialPresetState(state || 'Uttar Pradesh');
              setActiveTab('admin');
            }}
            setActiveTab={setActiveTab}
            onClose={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            setSelectedCollegeId={setSelectedCollegeId}
            setSelectedEventId={setSelectedEventId}
            onOpenSpatialNavigator={() => setActiveTab('spatial')}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreCollegesPage
            setActiveTab={setActiveTab}
            setSelectedCollegeId={setSelectedCollegeId}
          />
        )}

        {activeTab === 'college-detail' && (
          <CollegeDetailPage
            collegeId={selectedCollegeId}
            setActiveTab={setActiveTab}
            onBack={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'compare' && (
          <CompareCollegesPage
            setActiveTab={setActiveTab}
            setSelectedCollegeId={setSelectedCollegeId}
          />
        )}

        {activeTab === 'events' && (
          <EventsPage
            setActiveTab={setActiveTab}
            setSelectedEventId={setSelectedEventId}
          />
        )}

        {activeTab === 'event-detail' && (
          <EventDetailPage
            eventId={selectedEventId}
            setActiveTab={setActiveTab}
            onBack={() => setActiveTab('events')}
          />
        )}

        {activeTab === 'admin' && (
          <CollegeAdminPage
            setActiveTab={setActiveTab}
            presetCity={spatialPresetCity}
            presetState={spatialPresetState}
          />
        )}

        {activeTab === 'requests' && (
          <AccessRequestsPage
            setActiveTab={setActiveTab}
            setSelectedCollegeId={setSelectedCollegeId}
          />
        )}

        {activeTab === 'passes' && (
          <StudentDashboardPage
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'scanner' && (
          <QRScannerPage />
        )}

        {activeTab === 'teams' && (
          <TeamFinderPage />
        )}

        {activeTab === 'ai' && (
          <AIAdvisorPage
            setActiveTab={setActiveTab}
            setSelectedCollegeId={setSelectedCollegeId}
          />
        )}

        {activeTab === 'auth' && (
          <AuthPage
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'notices' && (
          <InterCollegeNoticesPage
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Global Footer (hidden on full-page spatial navigator to keep 100% immersive cosmic canvas) */}
      {activeTab !== 'spatial' && <Footer setActiveTab={setActiveTab} />}

      {/* Global Notification Toast */}
      <Toast />
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CampusBridge Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h1 className="text-xl font-bold">Something went wrong</h1>
            <p className="text-xs text-slate-400">
              {this.state.error?.message || "An unexpected error occurred while rendering."}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  try { localStorage.clear(); } catch(e){}
                  window.location.reload();
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Clear Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </ErrorBoundary>
  );
}
