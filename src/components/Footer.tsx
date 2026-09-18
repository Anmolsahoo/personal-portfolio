import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Link } from 'react-router-dom';
import { Sun, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050609] border-t border-white/[0.06] pt-16 pb-12 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff3700] to-[#ff7b00] flex items-center justify-center shadow-[0_0_15px_rgba(255,85,0,0.5)]">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {portfolioData.brand.logoText}
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              {portfolioData.brand.heroSubtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#ff5500] hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#ff5500] hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#ff5500] hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#ff5500] hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Anmol</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects & Architecture</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Social Media */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              CONNECT
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>LinkedIn Network</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Specializations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              CAPABILITIES
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>Full-Stack Development</li>
              <li>Generative AI Pipelines</li>
              <li>Distributed Microservices</li>
              <li>UI/UX Design Systems</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {portfolioData.brand.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed & Engineered by {portfolioData.brand.developerName}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
