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
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Notification Toast */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
