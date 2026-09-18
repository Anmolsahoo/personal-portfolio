import React from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, ExternalLink, Github, Code2, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d1019] border border-white/[0.12] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Media Banner */}
        <div className={`relative h-44 sm:h-52 w-full rounded-2xl mb-6 overflow-hidden flex items-center justify-center bg-gradient-to-br ${project.gradient} border border-white/[0.08]`}>
          <div className="p-4 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 text-white flex items-center gap-3">
            <Code2 className="w-8 h-8 text-[#ff7722]" />
            <div>
              <div className="text-lg font-bold">{project.title}</div>
              <div className="text-xs text-gray-300">{project.category} Architecture</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ff5500]/20 text-[#ff7722] border border-[#ff5500]/30">
              {project.category}
            </span>
            <span className="text-xs text-gray-500 font-mono">ID: {project.id}</span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack List */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono px-3 py-1 rounded-lg bg-[#161b29] text-gray-200 border border-white/[0.08]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 hover:text-white text-xs sm:text-sm font-semibold border border-white/[0.1] transition-colors"
            >
              Close
            </button>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] text-white text-xs sm:text-sm font-semibold shadow-md group"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
