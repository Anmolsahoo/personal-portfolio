import React, { useState } from 'react';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import { 
  Sparkles, 
  Code2, 
  ArrowRight,
  UtensilsCrossed,
  Camera,
  BookOpen,
  Library,
  LayoutDashboard,
  GraduationCap,
  Stethoscope,
  Dumbbell,
  School
} from 'lucide-react';

interface ProjectsGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

const getProjectIcon = (id: string) => {
  switch (id) {
    case 'luxury-restaurant':
      return UtensilsCrossed;
    case 'premium-camera-store':
      return Camera;
    case 'library-management-system-1':
      return BookOpen;
    case 'library-management-platform':
      return Library;
    case 'library-management-advanced':
      return LayoutDashboard;
    case 'college-admin-management':
      return GraduationCap;
    case 'clinic-management-system':
      return Stethoscope;
    case 'school-attendance-management':
      return School;
    case 'gym-attendance-management':
      return Dumbbell;
    default:
      return Code2;
  }
};

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Websites',
    'E-Commerce',
    'Business Software',
    'Management Systems',
    'Dashboards',
  ];

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => 
        (p.filterCategories && p.filterCategories.includes(activeCategory)) ||
        p.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  return (
    <section id="projects" className="py-24 sm:py-32 relative bg-[#07090e]/80 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demonstration Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Selected Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Real-world web applications, business systems and digital experiences built with modern technologies.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#ff5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                    : 'bg-[#11141d] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => {
            const ProjectIcon = getProjectIcon(project.id);

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-[#ff5500]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(255,85,0,0.25)] overflow-hidden"
              >
                {/* Project Preview */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl bg-[#141824] border border-white/[0.06] mb-5 overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`} />
                  
                  {/* Live Badge */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE DEMO</span>
                  </div>

                  {/* Icon & Category */}
                  <div className="relative z-10 text-center p-4">
                    <div className="inline-flex p-3 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 mb-2 group-hover:scale-110 group-hover:border-[#ff5500]/40 transition-all duration-300">
                      <ProjectIcon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#ff7722] border border-[#ff5500]/25">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#ff7722] transition-colors mb-2.5">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#161a28] text-gray-300 border border-white/[0.05]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                      >
                        View Details
                      </button>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-white text-xs font-semibold shadow-[0_0_15px_rgba(255,85,0,0.35)] hover:shadow-[0_0_20px_rgba(255,85,0,0.5)] transition-all duration-200 group/btn"
                      >
                        <span>View Live</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
