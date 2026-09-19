import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TechMarquee } from '../components/TechMarquee';
import { BentoGrid } from '../components/BentoGrid';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { PricingPlans } from '../components/PricingPlans';
import { CtaSection } from '../components/CtaSection';
import { ContactModal } from '../components/ContactModal';
import { ProjectModal } from '../components/ProjectModal';
import { ProjectItem } from '../data/portfolioData';

export const HomePage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenContact = (planName?: string) => {
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  return (
    <div>
      {/* Hero with Profile & Skills Dashboard */}
      <Hero onOpenContact={() => handleOpenContact()} />

      {/* Proven Tech Stack Marquee */}
      <TechMarquee />

      {/* Technical Architecture Bento Grid */}
      <BentoGrid />

      {/* Real Professional Experience Timeline */}
      <ExperienceSection />

      {/* Featured Projects & In-Browser Interactive Demos */}
      <ProjectsGrid onSelectProject={(project) => setSelectedProject(project)} />

      {/* Freelance & Project Delivery Packages */}
      <PricingPlans onSelectPlan={(plan) => handleOpenContact(plan)} />

      {/* Bottom CTA Banner */}
      <CtaSection onOpenContact={() => handleOpenContact()} />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultPlan={selectedPlan}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
