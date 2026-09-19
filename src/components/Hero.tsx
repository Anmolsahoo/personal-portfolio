import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { DashboardMockup } from './DashboardMockup';
import { ProfileCard } from './ProfileCard';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const navigate = useNavigate();
  const rotatingWords = [
    "Websites",
    "Mobile Apps",
    "CRM Tools",
    "SaaS Platforms",
    "AI Chatbots",
    "Business Automation"
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFade(true);
      }, 250);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleProfileContact = () => {
    navigate('/contact');
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Background Solar Flare & Glowing Horizon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1200px] h-[400px] sm:h-[550px] md:h-[650px] pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff5500]/20 via-[#ff3700]/10 to-transparent blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[520px] h-[160px] sm:h-[260px] bg-gradient-to-t from-[#ff7700] via-[#ff4400] to-transparent rounded-full blur-[70px] opacity-75 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Top Grid: Left Content & Right 3D Tilt ProfileCard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Content (Cols 1-7) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12151f]/90 border border-[#ff5500]/30 shadow-[0_0_15px_rgba(255,85,0,0.15)] hover:border-[#ff5500]/60 transition-all">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wider text-gray-200 uppercase font-mono">
                AVAILABLE FOR OPPORTUNITIES & FREELANCE • 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Full-Stack Developer crafting reliable web apps, business systems &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6db] to-[#ff6615]">
                scalable backend architectures.
              </span>
            </h1>

            {/* Rotating Word Pill */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-mono text-gray-400 pt-1">
              <span>Core Expertise:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#141825] border border-[#ff5500]/35 text-[#ff7722] font-semibold tracking-wide shadow-[0_0_12px_rgba(255,85,0,0.2)]">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#ff5500] animate-pulse" />
                <span className={`transition-all duration-300 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5'}`}>
                  {rotatingWords[wordIndex]}
                </span>
              </span>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
              Hi, I'm Anmol Sahoo. I build full-stack web applications, business software (CRMs, ERPs, Dashboards), and automated workflows with Python, Django, and React.
            </p>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#131622] hover:bg-[#1c2233] text-sm font-semibold text-white border border-white/[0.12] hover:border-white/[0.25] transition-all shadow-md group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-sm font-semibold text-white shadow-[0_0_25px_rgba(255,85,0,0.45)] hover:shadow-[0_0_35px_rgba(255,85,0,0.65)] transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Column: React-Bits 3D Interactive Tilt ProfileCard (Cols 8-12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ProfileCard
              avatarUrl="/anmol-profile-v2.jpg"
              miniAvatarUrl="/anmol-profile-v2.jpg"
              name="Anmol Sahoo"
              title="Software Engineer"
              handle="anmolsahoo"
              status="Available for Freelance"
              contactText="Connect"
              behindGlowColor="rgba(255, 85, 0, 0.65)"
              innerGradient="linear-gradient(145deg, rgba(255, 85, 0, 0.22) 0%, rgba(13, 16, 25, 0.95) 100%)"
              onContactClick={handleProfileContact}
              className="hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

        </div>

        {/* Dashboard Mockup with Radiant Horizon */}
        <div className="relative pt-6 sm:pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-24 bg-gradient-to-b from-[#ff5500]/40 to-transparent blur-3xl -z-10"></div>
          <DashboardMockup />
        </div>

      </div>
    </section>
  );
};
