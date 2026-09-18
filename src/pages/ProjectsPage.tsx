import React, { useState } from 'react';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import { ProjectModal } from '../components/ProjectModal';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
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

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Websites',
    'E-Commerce',
    'Business Software',
    'Management Systems',
    'Dashboards',
  ];

  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (project.filterCategories && project.filterCategories.includes(activeCategory)) ||
      project.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesQuery = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pt-28 pb-24 sm:pt-36 sm:pb-32 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#ff5500]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demonstration Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Selected Projects
          </h1>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Real-world web applications, business systems and digital experiences built with modern technologies.
          </p>

          {/* Search Input */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by technology or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#11141e] border border-white/[0.1] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
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

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#0c0f16] rounded-3xl border border-white/[0.06] p-8 max-w-xl mx-auto">
            <p className="text-gray-400 text-sm">No projects found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs text-[#ff7722] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => {
              const ProjectIcon = getProjectIcon(project.id);

              return (
                <div
                  key={project.id}
                  className="group relative rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-[#ff5500]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(255,85,0,0.25)] overflow-hidden"
                >
                  {/* Project Image / Visual Preview */}
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
                      {/* Tech Tags */}
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

                      {/* Action Buttons: View Details & View Live -> */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
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
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#141724] to-[#0c0f16] border border-white/[0.1] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Have a project in mind?</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              I can build these types of software applications tailored to your business requirements.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,85,0,0.4)] flex-shrink-0 transition-all flex items-center gap-2 group"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
