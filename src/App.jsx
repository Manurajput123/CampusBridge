import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

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

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCollegeId, setSelectedCollegeId] = useState('col-meerut-1');
  const [selectedEventId, setSelectedEventId] = useState('evt-hackathon-meerut');

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectCollege={(id) => {
          setSelectedCollegeId(id);
          setActiveTab('college-detail');
        }}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            setSelectedCollegeId={setSelectedCollegeId}
            setSelectedEventId={setSelectedEventId}
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

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

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
