import React from 'react';
import { 
  Terminal, 
  Code2, 
  Server, 
  Zap, 
  Atom, 
  Layers, 
  Database, 
  HardDrive, 
  BarChart3, 
  PieChart, 
  Brain, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  Bot, 
  GitBranch, 
  Github, 
  Box, 
  Globe, 
  Table, 
  Flame, 
  Package, 
  CheckCircle2, 
  Workflow
} from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff7722] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Command Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built With Modern Technology
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed max-w-2xl mx-auto">
            From scalable web applications to AI-powered solutions, I use the right tools to build practical products for businesses.
          </p>
        </div>

        {/* Bento Grid Layout (Preserving 3-Card + Bottom-Card Composition) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          
          {/* CARD 1 — CORE DEVELOPMENT (Top Left) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0f17]/95 border border-white/[0.08] hover:border-[#ff5500]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5500]/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-[#141824] border border-white/[0.06] text-[#ff5500]">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06]">
                  Backend & Web
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                CORE DEVELOPMENT
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                Building reliable web applications and backend systems with modern development technologies.
              </p>
            </div>

            {/* Skills Pills */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {[
                { name: 'Python', icon: <Terminal className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'JavaScript', icon: <Code2 className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'Django', icon: <Server className="w-3.5 h-3.5 text-[#ff7722]" /> },
                { name: 'FastAPI', icon: <Zap className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'React', icon: <Atom className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'Node.js', icon: <Layers className="w-3.5 h-3.5 text-[#ff7722]" /> },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#131724] border border-white/[0.06] hover:border-[#ff5500]/40 transition-all group/item cursor-default"
                >
                  <div className="p-1 rounded-md bg-white/[0.04]">
                    {tech.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-200 group-hover/item:text-white">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 2 — DATA & DATABASE (Top Middle) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0f17]/95 border border-white/[0.08] hover:border-[#ff5500]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffaa00]/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-[#141824] border border-white/[0.06] text-[#ffaa00]">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06]">
                  Data & BI
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                DATA &amp; DATABASE
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                Working with data, databases, analytics and scalable data-driven applications.
              </p>
            </div>

            {/* Skills Pills */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {[
                { name: 'SQL', icon: <Database className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'PostgreSQL', icon: <Database className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'MySQL', icon: <HardDrive className="w-3.5 h-3.5 text-[#ff7722]" /> },
                { name: 'MongoDB', icon: <HardDrive className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'Power BI', icon: <BarChart3 className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'Tableau', icon: <PieChart className="w-3.5 h-3.5 text-[#ff7722]" /> },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#131724] border border-white/[0.06] hover:border-[#ffaa00]/40 transition-all group/item cursor-default"
                >
                  <div className="p-1 rounded-md bg-white/[0.04]">
                    {tech.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-200 group-hover/item:text-white">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 3 — AI & AUTOMATION (Right Column, Visually Prominent Spans 2 Rows) */}
          <div className="lg:row-span-2 p-6 sm:p-8 rounded-3xl bg-[#0c0f17]/95 border border-[#ff5500]/30 shadow-[0_0_35px_-5px_rgba(255,85,0,0.2)] transition-all flex flex-col justify-between relative overflow-hidden group">
            
            {/* Radiant Spotlight Beam from Top */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none">
              <div className="w-20 h-6 mx-auto bg-[#ff5500] rounded-b-full shadow-[0_0_35px_#ff5500] opacity-80"></div>
              <div className="w-full h-full bg-gradient-to-b from-[#ff5500]/50 via-[#ff7700]/15 to-transparent blur-md [clip-path:polygon(35%_0%,65%_0%,100%_100%,0%_100%)]"></div>
            </div>

            {/* Header Content */}
            <div className="relative z-10 pt-16 text-center">
              {/* Animated AI Icon */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-[#1b2030] to-[#0e111a] border border-[#ff5500]/40 shadow-[0_0_25px_rgba(255,85,0,0.35)] mb-5 group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-8 h-8 text-[#ff6a00] animate-pulse" />
                <div className="absolute inset-0 rounded-2xl bg-[#ff5500] opacity-15 blur-md"></div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                AI &amp; AUTOMATION
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs mx-auto mb-6">
                Building practical AI-powered solutions, intelligent automation and conversational experiences.
              </p>
            </div>

            {/* AI Technologies Visual Pills Grid */}
            <div className="relative z-10 space-y-2 pt-2">
              {[
                { name: 'Machine Learning', icon: <Brain className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'Deep Learning', icon: <Cpu className="w-3.5 h-3.5 text-[#ff7722]" /> },
                { name: 'NLP', icon: <MessageSquare className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'Generative AI', icon: <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'RAG', icon: <Zap className="w-3.5 h-3.5 text-[#ff7722]" /> },
                { name: 'Transformers', icon: <Cpu className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'AI Chatbots', icon: <Bot className="w-3.5 h-3.5 text-[#ff5500]" /> },
              ].map((aiTech) => (
                <div
                  key={aiTech.name}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#131724]/90 border border-white/[0.06] hover:border-[#ff5500]/40 hover:bg-[#181d2e] transition-all group/item"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1 rounded-md bg-white/[0.04]">
                      {aiTech.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-200 group-hover/item:text-white">
                      {aiTech.name}
                    </span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]/70 group-hover/item:bg-[#ff5500]"></span>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] text-center">
              <span className="text-[11px] font-mono text-gray-500 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#ff7722]" />
                Automated Workflows &amp; LLM Orchestration
              </span>
            </div>
          </div>

          {/* BOTTOM CARD — TOOLS & ENGINEERING (Spans 2 Columns) */}
          <div className="md:col-span-2 p-6 sm:p-7 rounded-3xl bg-[#0c0f17]/95 border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between group relative overflow-hidden shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <GitBranch className="w-4 h-4 text-[#ff7722]" />
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    TOOLS &amp; ENGINEERING
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Modern tools and engineering practices for building, deploying and maintaining applications.
                </p>
              </div>

              <span className="self-start sm:self-center text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06] whitespace-nowrap">
                8 Core Tools
              </span>
            </div>

            {/* Compact Technology Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { name: 'Git', icon: <GitBranch className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'GitHub', icon: <Github className="w-3.5 h-3.5 text-gray-300" /> },
                { name: 'Docker', icon: <Box className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'REST API', icon: <Globe className="w-3.5 h-3.5 text-[#ff7722]" /> },
                { name: 'Excel', icon: <Table className="w-3.5 h-3.5 text-emerald-400" /> },
                { name: 'Vite', icon: <Flame className="w-3.5 h-3.5 text-[#ffaa00]" /> },
                { name: 'npm', icon: <Package className="w-3.5 h-3.5 text-[#ff5500]" /> },
                { name: 'pnpm', icon: <Package className="w-3.5 h-3.5 text-[#ff7722]" /> },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#131724] border border-white/[0.06] hover:border-[#ff5500]/40 transition-all text-xs font-semibold text-gray-200 hover:text-white cursor-default group/tag"
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-gray-500">
              <span>Environment Isolation &amp; Automated Builds</span>
              <span className="text-gray-400 font-mono">Zero Overhead</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
