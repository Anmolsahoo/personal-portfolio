import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { ClinicDemoPage } from './pages/demos/ClinicDemoPage';
import { SchoolDemoPage } from './pages/demos/SchoolDemoPage';
import { GymDemoPage } from './pages/demos/GymDemoPage';
import { ChatBot } from './components/ChatBot';

function AppContent() {
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demos');

  return (
    <div className={`min-h-screen ${isDemo ? 'bg-slate-50 text-slate-900' : 'bg-[#060709] text-gray-100'} selection:bg-[#ff5500]/30 selection:text-white flex flex-col justify-between relative overflow-x-hidden`}>
      
      {/* Top Navigation for Portfolio Pages */}
      {!isDemo && <Navbar />}

      {/* Dynamic Route Pages */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Interactive Management System Demos */}
          <Route path="/demos/clinic" element={<ClinicDemoPage />} />
          <Route path="/demos/school" element={<SchoolDemoPage />} />
          <Route path="/demos/gym" element={<GymDemoPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Multi-column Footer for Portfolio Pages */}
      {!isDemo && <Footer />}

      {/* Floating Groq-Powered AI Assistant with 'blue mountain' roadmap gate */}
      <ChatBot />

    </div>
  );
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
