import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TechMarquee } from '../components/TechMarquee';
import { BentoGrid } from '../components/BentoGrid';
import { FeatureShowcase } from '../components/FeatureShowcase';
import { PricingPlans } from '../components/PricingPlans';
import { CtaSection } from '../components/CtaSection';
import { ContactModal } from '../components/ContactModal';

export const HomePage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenContact = (planName?: string) => {
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  return (
    <div>
      {/* Hero with Solar Flare & Dashboard Preview */}
      <Hero onOpenContact={() => handleOpenContact()} />

      {/* Partner / Technologies Marquee */}
      <TechMarquee />

      {/* Bento Grid Architecture */}
      <BentoGrid />

      {/* Alternating Feature Showcase */}
      <FeatureShowcase />

      {/* Pricing / Engagement Tiers */}
      <PricingPlans onSelectPlan={(plan) => handleOpenContact(plan)} />

      {/* Bottom CTA Banner */}
      <CtaSection onOpenContact={() => handleOpenContact()} />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
};
