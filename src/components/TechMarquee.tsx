import React from 'react';
import { 
  Terminal, 
  Atom, 
  Zap, 
  Server, 
  Database, 
  Box, 
  Brain, 
  Cpu, 
  Sparkles, 
  BarChart3, 
  Layers, 
  Code2, 
  HardDrive, 
  GitBranch, 
  PieChart, 
  TrendingUp, 
  Flame, 
  MapPin, 
  Globe 
} from 'lucide-react';

interface SkillMarqueeItem {
  name: string;
  icon: React.ReactNode;
}

export const TechMarquee: React.FC = () => {
  const skillsList: SkillMarqueeItem[] = [
    { name: "Python", icon: <Terminal className="w-4 h-4 text-[#ff5500]" /> },
    { name: "React", icon: <Atom className="w-4 h-4 text-[#ff7722]" /> },
    { name: "FastAPI", icon: <Zap className="w-4 h-4 text-[#ffaa00]" /> },
    { name: "Django", icon: <Server className="w-4 h-4 text-[#ff5500]" /> },
    { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-[#ff7722]" /> },
    { name: "Docker", icon: <Box className="w-4 h-4 text-[#ffaa00]" /> },
    { name: "Machine Learning", icon: <Brain className="w-4 h-4 text-[#ff5500]" /> },
    { name: "Transformers", icon: <Cpu className="w-4 h-4 text-[#ff7722]" /> },
    { name: "RAG & GenAI", icon: <Sparkles className="w-4 h-4 text-[#ffaa00]" /> },
    { name: "Power BI", icon: <BarChart3 className="w-4 h-4 text-[#ff5500]" /> },
    { name: "Node.js", icon: <Layers className="w-4 h-4 text-[#ff7722]" /> },
    { name: "SQL", icon: <Database className="w-4 h-4 text-[#ffaa00]" /> },
    { name: "JavaScript", icon: <Code2 className="w-4 h-4 text-[#ff5500]" /> },
    { name: "MongoDB", icon: <HardDrive className="w-4 h-4 text-[#ff7722]" /> },
    { name: "Git & GitHub", icon: <GitBranch className="w-4 h-4 text-[#ffaa00]" /> },
    { name: "Tableau", icon: <PieChart className="w-4 h-4 text-[#ff5500]" /> },
    { name: "Scikit-learn", icon: <TrendingUp className="w-4 h-4 text-[#ff7722]" /> },
    { name: "Vite", icon: <Flame className="w-4 h-4 text-[#ffaa00]" /> },
    { name: "Google Places API", icon: <MapPin className="w-4 h-4 text-[#ff5500]" /> },
    { name: "Leaflet", icon: <Globe className="w-4 h-4 text-[#ff7722]" /> },
  ];

  // Repeat items for infinite seamless scroll
  const marqueeItems = [...skillsList, ...skillsList, ...skillsList];

  return (
    <section className="py-12 sm:py-16 relative border-y border-white/[0.06] bg-[#07090e]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-7">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400">
          PROVEN EXPERTISE ACROSS MODERN TECH STACKS
        </p>
      </div>

      {/* Marquee Wrapper with side fade gradients */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#060709] to-transparent z-10 pointer-events-none"></div>
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#060709] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="flex animate-marquee gap-8 sm:gap-12 whitespace-nowrap will-change-transform">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors cursor-pointer group px-3 py-1.5"
            >
              <div className="p-2 rounded-xl bg-white/[0.03] group-hover:bg-white/[0.08] border border-white/[0.06] group-hover:border-[#ff5500]/40 transition-all shadow-sm">
                {item.icon}
              </div>
              <span className="text-sm sm:text-base font-bold tracking-tight text-gray-300 group-hover:text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
