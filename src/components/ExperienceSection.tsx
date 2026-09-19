import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, Building2, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative bg-[#07090f]/70 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold mb-3 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Real-world software engineering experience building business software, web applications, and dependable backend architectures.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Glowing Track */}
          <div className="absolute top-6 bottom-6 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-[#ff5500] via-[#ff7700]/40 to-transparent"></div>

          <div className="space-y-8 sm:space-y-10 pl-12 sm:pl-16">
            {portfolioData.about.experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Node Marker */}
                <div className="absolute -left-12 sm:-left-16 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-[#08090d] border-2 border-[#ff5500] flex items-center justify-center shadow-[0_0_15px_#ff5500] group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-[#ff5500]"></div>
                </div>

                {/* Experience Card */}
                <div className="rounded-3xl bg-[#0c0f16]/95 border border-white/[0.08] hover:border-[#ff5500]/50 hover:shadow-[0_0_35px_-5px_rgba(255,85,0,0.2)] p-6 sm:p-8 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#ff5500]/15 border border-[#ff5500]/30 flex items-center justify-center text-[#ff7722]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.company}
                        </h3>
                        <p className="text-sm font-semibold text-[#ff7722]">
                          {exp.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Highlights / Responsibilities */}
                  <div className="space-y-2 mb-6 text-xs sm:text-sm text-gray-400">
                    {exp.company === 'Oditech' ? (
                      <>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#ff7722] flex-shrink-0 mt-0.5" />
                          <span>Engineered full-stack business solutions with React frontends, Python/Django backends, and relational database schemas.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#ff7722] flex-shrink-0 mt-0.5" />
                          <span>Built REST APIs, automated data workflows, and integrated third-party business services.</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#ff7722] flex-shrink-0 mt-0.5" />
                          <span>Developed full-stack web applications and client portals using Python, Django, REST APIs, and MySQL.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#ff7722] flex-shrink-0 mt-0.5" />
                          <span>Created responsive UI modules with JavaScript and handled database query optimizations.</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300 text-xs font-mono font-medium hover:border-[#ff5500]/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121520] hover:bg-[#181d2c] border border-white/[0.1] text-xs sm:text-sm font-semibold text-white transition-all group"
            >
              <span>Read Full Background & Skills</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

