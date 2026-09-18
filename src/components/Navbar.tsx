import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090d]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff3700] to-[#ff7b00] shadow-[0_0_15px_rgba(255,85,0,0.6)] group-hover:scale-105 transition-transform duration-300">
                <Sun className="w-4 h-4 text-white" />
                <div className="absolute inset-0 rounded-full bg-[#ff5500] blur-sm -z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                {portfolioData.brand.logoText}
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] ml-1"></span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#11141d]/75 border border-white/[0.08] backdrop-blur-md">
              {portfolioData.navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                      active
                        ? 'bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-white shadow-[0_0_12px_rgba(255,85,0,0.4)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/contact"
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs lg:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff3b00] hover:from-[#ff6715] hover:to-[#ff4d15] shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:shadow-[0_0_28px_rgba(255,85,0,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{portfolioData.brand.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                to="/contact"
                className="px-3 py-1.5 text-xs font-semibold text-white rounded-full bg-[#ff5500] shadow-[0_0_12px_rgba(255,85,0,0.4)]"
              >
                Contact
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#11141d] border border-white/10 text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Slide-out Menu */}
        <div
          className={`absolute top-0 right-0 w-3/4 max-w-xs h-full bg-[#0d0f15] border-l border-white/10 p-6 flex flex-col justify-between transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-[#ff5500]" />
                <span className="font-bold text-white">{portfolioData.brand.logoText}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {portfolioData.navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                      active
                        ? 'bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-white font-semibold'
                        : 'text-gray-200 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff3b00] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{portfolioData.brand.ctaPrimary}</span>
            </Link>
            <div className="text-center text-xs text-gray-500">
              {portfolioData.brand.role}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
