import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingPlansProps {
  onSelectPlan: (planName: string) => void;
}

interface ProjectPackage {
  id: string;
  title: string;
  price: string;
  description: string;
  buttonText: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  bottomNote: string;
}

const packages: ProjectPackage[] = [
  {
    id: 'starter',
    title: 'Starter',
    price: '₹10K+',
    description: 'Perfect for small businesses that need a professional digital presence.',
    buttonText: 'Start a Project →',
    features: [
      'Business / Portfolio Website',
      'Responsive design',
      'Contact & enquiry forms',
      'WhatsApp integration',
      'Basic admin functionality',
      'Deployment support',
    ],
    bottomNote: 'Final price depends on project scope',
  },
  {
    id: 'business',
    title: 'Business',
    price: '₹25K+',
    description: 'For businesses that need custom software to manage their daily operations.',
    buttonText: 'Discuss Your Project →',
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      'Custom Web Application',
      'CRM / Lead Management',
      'Inventory Management',
      'Admin Dashboard',
      'REST API integration',
      'Excel / PDF reports',
      'WhatsApp / notification integration',
      'Deployment & basic support',
    ],
    bottomNote: 'Final price depends on project scope',
  },
  {
    id: 'ai-scale',
    title: 'AI & Scale',
    price: '₹50K+',
    description: 'For businesses looking for advanced automation, SaaS products and AI-powered solutions.',
    buttonText: 'Build With Me →',
    features: [
      'SaaS Platform Development',
      'AI Chatbot',
      'RAG / AI Knowledge Assistant',
      'Business Automation',
      'Advanced CRM / workflows',
      'AI & API integrations',
      'Cloud deployment',
      'Post-launch support',
    ],
    bottomNote: 'Final price depends on project scope',
  },
];

const servicesOffered = [
  'Websites',
  'Web Applications',
  'Mobile Apps',
  'CRM Systems',
  'SaaS Platforms',
  'Inventory Systems',
  'Business Automation',
  'AI Chatbots',
  'RAG Applications',
  'Data Dashboards',
  'API Integrations',
];

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PROJECT-BASED PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Freelance Project Packages
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Choose a starting package for your next digital product. Every project can be customized around your business requirements.
          </p>

          {/* Services To Communicate Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {servicesOffered.map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#11141d]/90 border border-white/[0.08] text-gray-300 hover:border-[#ff5500]/40 hover:text-white transition-colors"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#161a27] to-[#0d1017] border-2 border-[#ff5500] shadow-[0_0_40px_-5px_rgba(255,85,0,0.35)] scale-100 md:-translate-y-2'
                    : 'bg-[#0c0f16]/90 border border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(255,85,0,0.6)]">
                    {plan.badge || 'MOST POPULAR'}
                  </div>
                )}

                <div>
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Starting Price
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectPlan(plan.title)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 mb-8 flex items-center justify-center gap-2 group ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-white shadow-[0_0_20px_rgba(255,85,0,0.4)]'
                        : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.1]'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>

                  {/* Features List */}
                  <div className="space-y-3.5 pt-4 border-t border-white/[0.08]">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center text-[#ff7722] mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-300 leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] text-[11px] text-gray-500 text-center">
                  {plan.bottomNote}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
