import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Server, 
  BarChart3, 
  Brain, 
  Cpu, 
  GitBranch, 
  MapPin, 
  Globe, 
  Layers, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Atom, 
  HardDrive, 
  LineChart, 
  PieChart, 
  Table, 
  Box, 
  Package, 
  Flame, 
  TrendingUp, 
  Search, 
  Filter, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // 0-100
  tier: 'Expert' | 'Advanced' | 'Proficient';
  icon?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  categoryIcon: React.ReactNode;
  badge: string;
  skills: SkillItem[];
}

export const DashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'programming',
      title: 'Programming Languages',
      categoryIcon: <Terminal className="w-4 h-4 text-[#ff5500]" />,
      badge: 'Core Logic',
      skills: [
        { name: 'Python', level: 92, tier: 'Expert' },
        { name: 'SQL', level: 88, tier: 'Advanced' },
        { name: 'JavaScript', level: 86, tier: 'Advanced' },
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      categoryIcon: <Atom className="w-4 h-4 text-[#ff7722]" />,
      badge: 'UI Architecture',
      skills: [
        { name: 'React', level: 90, tier: 'Expert' },
        { name: 'HTML', level: 95, tier: 'Expert' },
        { name: 'CSS', level: 90, tier: 'Expert' },
        { name: 'Vite', level: 88, tier: 'Advanced' },
        { name: 'Axios', level: 86, tier: 'Advanced' },
      ]
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      categoryIcon: <Server className="w-4 h-4 text-[#ff5500]" />,
      badge: 'Distributed Systems',
      skills: [
        { name: 'Django', level: 88, tier: 'Advanced' },
        { name: 'Django REST Framework', level: 88, tier: 'Advanced' },
        { name: 'FastAPI', level: 86, tier: 'Advanced' },
        { name: 'Node.js', level: 82, tier: 'Proficient' },
        { name: 'REST APIs', level: 92, tier: 'Expert' },
      ]
    },
    {
      id: 'databases',
      title: 'Databases & Storage',
      categoryIcon: <Database className="w-4 h-4 text-[#ffaa00]" />,
      badge: 'Persistent Engines',
      skills: [
        { name: 'PostgreSQL', level: 88, tier: 'Advanced' },
        { name: 'MySQL', level: 85, tier: 'Advanced' },
        { name: 'MongoDB', level: 82, tier: 'Proficient' },
        { name: 'SQLite', level: 90, tier: 'Expert' },
      ]
    },
    {
      id: 'databi',
      title: 'Data & Business Intelligence',
      categoryIcon: <BarChart3 className="w-4 h-4 text-[#ff5500]" />,
      badge: 'Analytics & Insights',
      skills: [
        { name: 'Power BI', level: 85, tier: 'Advanced' },
        { name: 'Tableau', level: 82, tier: 'Proficient' },
        { name: 'Excel', level: 92, tier: 'Expert' },
        { name: 'Data Analytics', level: 88, tier: 'Advanced' },
      ]
    },
    {
      id: 'aiml',
      title: 'AI & Machine Learning',
      categoryIcon: <Brain className="w-4 h-4 text-[#ff6600]" />,
      badge: 'Generative Intelligence',
      skills: [
        { name: 'Machine Learning', level: 88, tier: 'Advanced' },
        { name: 'Deep Learning', level: 84, tier: 'Advanced' },
        { name: 'NLP', level: 85, tier: 'Advanced' },
        { name: 'Transformers', level: 86, tier: 'Advanced' },
        { name: 'RAG', level: 88, tier: 'Advanced' },
        { name: 'Generative AI', level: 90, tier: 'Expert' },
        { name: 'Scikit-learn', level: 88, tier: 'Advanced' },
        { name: 'XGBoost', level: 84, tier: 'Advanced' },
        { name: 'LightGBM', level: 82, tier: 'Proficient' },
      ]
    },
    {
      id: 'devops',
      title: 'DevOps & Tooling',
      categoryIcon: <GitBranch className="w-4 h-4 text-[#ff7722]" />,
      badge: 'CI/CD & Environments',
      skills: [
        { name: 'Git', level: 92, tier: 'Expert' },
        { name: 'GitHub', level: 92, tier: 'Expert' },
        { name: 'Docker', level: 84, tier: 'Advanced' },
        { name: 'pnpm', level: 86, tier: 'Advanced' },
        { name: 'npm', level: 90, tier: 'Expert' },
        { name: 'Pipenv', level: 85, tier: 'Advanced' },
      ]
    },
    {
      id: 'other',
      title: 'Other Technologies',
      categoryIcon: <Globe className="w-4 h-4 text-[#ffaa00]" />,
      badge: 'Geospatial & Services',
      skills: [
        { name: 'Leaflet', level: 86, tier: 'Advanced' },
        { name: 'OpenStreetMap', level: 85, tier: 'Advanced' },
        { name: 'Google Places API', level: 88, tier: 'Advanced' },
      ]
    }
  ];

  const filterTabs = [
    { label: 'All', id: 'All' },
    { label: 'Programming', id: 'programming' },
    { label: 'Frontend', id: 'frontend' },
    { label: 'Backend', id: 'backend' },
    { label: 'Databases', id: 'databases' },
    { label: 'Data & BI', id: 'databi' },
    { label: 'AI & ML', id: 'aiml' },
    { label: 'DevOps', id: 'devops' },
    { label: 'Other', id: 'other' },
  ];

  const filteredCategories = categories.filter((cat) => {
    const matchesTab = activeTab === 'All' || cat.id === activeTab;
    const matchesSearch = 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const totalSkillsCount = categories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Outer ambient glow behind dashboard */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ff5500]/30 via-[#ff8800]/20 to-[#ff3300]/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>

      {/* Main Dashboard Card Container */}
      <div className="relative rounded-2xl md:rounded-3xl bg-[#0b0d13]/95 border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden transition-all duration-500">
        
        {/* Top App Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#0e111a]/80 gap-3">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#ff3300] to-[#ff7700] flex items-center justify-center shadow-[0_0_10px_rgba(255,85,0,0.6)]">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="font-bold text-xs tracking-wider text-white">ANMOL SAHOO</span>
            </div>

            {/* Desktop Dashboard Category Tabs */}
            <div className="hidden md:flex items-center gap-1 overflow-x-auto py-0.5">
              {filterTabs.slice(0, 6).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white/[0.1] text-white font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              {filterTabs.length > 6 && (
                <button
                  onClick={() => setActiveTab(activeTab === 'aiml' ? 'All' : 'aiml')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                    activeTab === 'aiml' || activeTab === 'devops' || activeTab === 'other'
                      ? 'bg-[#ff5500]/20 text-[#ff7722]'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technology..."
                className="w-36 sm:w-44 px-3 py-1 text-xs rounded-full bg-[#141825] border border-white/[0.09] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
              />
            </div>
            <div className="flex items-center -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff3b00] to-[#ff7b00] border border-[#0e111a] flex items-center justify-center text-[10px] font-bold text-white">
                AS
              </div>
              <div className="w-6 h-6 rounded-full bg-[#181d2c] border border-[#0e111a] flex items-center justify-center text-[9px] font-mono font-bold text-gray-300">
                {totalSkillsCount}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-7 space-y-6">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Skills &amp; Technologies
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Tools and technologies I use to build modern, scalable and AI-powered solutions.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#ff5500]/10 text-[#ff7722] border border-[#ff5500]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse"></span>
                Production Ready
              </span>
            </div>
          </div>

          {/* 4 Summary Telemetry Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* KPI 1 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#121520]/80 border border-white/[0.06] hover:border-[#ff5500]/30 transition-all duration-300">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-[11px] uppercase tracking-wider">PROGRAMMING &amp; AI</span>
                <Brain className="w-3.5 h-3.5 text-[#ff7722]" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                12 Frameworks
              </div>
              <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ff5500] to-[#ffaa00] w-[90%] rounded-full"></div>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#121520]/80 border border-white/[0.06] hover:border-[#ff5500]/30 transition-all duration-300">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-[11px] uppercase tracking-wider">FULL-STACK SYSTEMS</span>
                <Server className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                10 Core Stacks
              </div>
              <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[88%] rounded-full"></div>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#121520]/80 border border-white/[0.06] hover:border-[#ff5500]/30 transition-all duration-300">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-[11px] uppercase tracking-wider">DATABASES &amp; BI</span>
                <Database className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                8 Data Engines
              </div>
              <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[85%] rounded-full"></div>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#121520]/80 border border-white/[0.06] hover:border-[#ff5500]/30 transition-all duration-300">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-[11px] uppercase tracking-wider">DEVOPS &amp; TOOLS</span>
                <GitBranch className="w-3.5 h-3.5 text-[#ff7722]" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                8 Toolchains
              </div>
              <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ff5500] to-rose-500 w-[92%] rounded-full"></div>
              </div>
            </div>

          </div>

          {/* Categories Grid (Clean Technical Skill Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-1">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#10131d]/90 border border-white/[0.07] hover:border-[#ff5500]/35 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-[#ff5500]/30 transition-colors">
                        {category.categoryIcon}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {category.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 border border-white/[0.05]">
                      {category.badge}
                    </span>
                  </div>

                  {/* Skills List in Category */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill.name)}
                        className="p-2.5 rounded-xl bg-[#141825]/80 hover:bg-[#181d2e] border border-white/[0.04] hover:border-[#ff5500]/30 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-gray-200 group-hover:text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]/70"></span>
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-400">
                              {skill.tier}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-[#ff7722]">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Subtle progress indicator */}
                        <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            style={{ width: `${skill.level}%` }}
                            className="h-full bg-gradient-to-r from-[#ff5500] to-[#ffaa00] rounded-full transition-all duration-500"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-gray-500">
                  <span>{category.skills.length} Competencies</span>
                  <span className="text-gray-400 font-mono text-[10px]">Verified Production</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="p-4 rounded-2xl bg-[#0f121b] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 38 technologies benchmarked against modern production standards</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-gray-300">Continuous Integration Ready</span>
              <span className="text-[#ff6a00] font-bold">100% SLA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
