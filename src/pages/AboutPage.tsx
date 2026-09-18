import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Building2, 
  Globe, 
  Laptop, 
  Workflow, 
  Package, 
  Layers, 
  Bot, 
  Cpu, 
  Zap, 
  BarChart3, 
  Webhook 
} from 'lucide-react';

const professionalExperiences = [
  {
    company: 'MSC HireTech',
    role: 'Python Full-Stack Developer',
    description: 'Worked on full-stack web development and business-oriented applications using Python, Django, REST APIs, JavaScript and database technologies.',
    tags: ['Python', 'Django', 'REST API', 'JavaScript', 'MySQL'],
  },
  {
    company: 'Oditech',
    role: 'SDE / Software Developer',
    description: 'Working on modern software products and business applications, contributing to frontend, backend, database, API integration, automation and production-oriented development.',
    tags: ['React', 'Python', 'Django', 'REST API', 'JavaScript', 'MySQL', 'PostgreSQL'],
  },
];

const whatIBuild = [
  { title: 'Business Websites', icon: Globe },
  { title: 'Web Applications', icon: Laptop },
  { title: 'CRM & Lead Management', icon: Workflow },
  { title: 'Inventory Management', icon: Package },
  { title: 'SaaS Platforms', icon: Layers },
  { title: 'AI Chatbots', icon: Bot },
  { title: 'RAG Applications', icon: Sparkles },
  { title: 'Business Automation', icon: Zap },
  { title: 'Data Dashboards', icon: BarChart3 },
  { title: 'API Integrations', icon: Webhook },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 sm:pt-36 sm:pb-32 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff5500]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        
        {/* Section 1: About Me Header, Intro, Description & Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading, Intro, and Description (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff7722] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              About Me
            </h1>

            <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed">
              I'm a Full-Stack Developer focused on building practical web applications, business software, AI-powered tools and scalable backend systems.
            </p>

            <div className="space-y-4 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-white/[0.08] pt-6">
              <p>
                I work across the development lifecycle — from understanding requirements and designing solutions to backend development, database integration, API development, frontend implementation and deployment.
              </p>
              <p>
                My professional experience includes building real-world business applications, CRM and lead-management systems, inventory platforms, dashboards, automation workflows and AI-powered solutions.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all group"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#131622] hover:bg-[#1c2233] text-white text-xs sm:text-sm font-medium border border-white/[0.1] transition-all"
              >
                <span>View Projects</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Professional Highlight Card (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Highlight Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#161a27] via-[#10131e] to-[#0c0f17] p-7 sm:p-9 border-2 border-[#ff5500]/40 shadow-[0_0_35px_-5px_rgba(255,85,0,0.25)] overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/15 border border-[#ff5500]/30 text-[#ff7722] text-xs font-semibold mb-5 uppercase tracking-wide">
                <span>From Idea → Development → Deployment</span>
              </div>
              
              <p className="text-lg sm:text-xl font-bold text-white leading-snug mb-4">
                "I help turn business requirements into practical, scalable digital products."
              </p>

              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for Freelance & Custom Development</span>
              </div>
            </div>

          </div>

        </div>

        {/* Section 2: Professional Experience (Clean Two-Company Timeline) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold mb-3 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Track</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Professional Experience
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Proven engineering track record in building business applications, web architectures, and reliable backends.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Continuous Vertical Glowing Rail */}
            <div className="absolute top-4 bottom-4 left-4 sm:left-6 w-0.5 bg-gradient-to-b from-[#ff5500] via-[#ff7700]/50 to-transparent" />

            <div className="space-y-8 sm:space-y-10 pl-12 sm:pl-16">
              {professionalExperiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Timeline Marker Node */}
                  <div className="absolute -left-12 sm:-left-16 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-[#08090d] border-2 border-[#ff5500] flex items-center justify-center shadow-[0_0_15px_#ff5500]">
                    <div className="w-2 h-2 rounded-full bg-[#ff5500]" />
                  </div>

                  {/* Company Experience Card */}
                  <div className="rounded-3xl bg-[#0c0f16]/95 border border-white/[0.08] hover:border-[#ff5500]/50 hover:shadow-[0_0_35px_-5px_rgba(255,85,0,0.2)] p-7 sm:p-8 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 border border-[#ff5500]/30 flex items-center justify-center text-[#ff7722]">
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

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Technology Tags */}
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2.5 block">
                        Technologies:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#141824] border border-white/[0.06] text-gray-200 hover:border-[#ff5500]/40 hover:text-white transition-colors"
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
          </div>
        </div>

        {/* Section 3: What I Build */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              What I Build
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Interactive systems, digital tools, and scalable software solutions designed for real business needs:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {whatIBuild.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0d1018] border border-white/[0.08] hover:border-[#ff5500]/50 hover:bg-[#121522] hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/25 flex items-center justify-center text-[#ff7722] mb-3 group-hover:scale-110 group-hover:bg-[#ff5500] group-hover:text-white transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#ff7722] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#141825] via-[#10131d] to-[#0a0d14] border border-white/[0.1] p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Let's turn your business requirements into practical, scalable digital products.
            </p>
            <div className="pt-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-white text-sm font-semibold shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:shadow-[0_0_35px_rgba(255,85,0,0.7)] transition-all group"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
