import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface CtaSectionProps {
  onOpenContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff5500]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#131724] to-[#0b0e16] border border-white/[0.1] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Text & Input (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Elevate Your Workflow?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Transform Your Work with Anmol Sahoo
              </h2>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
                Embark on a transformative journey of engineering excellence with Anmol Sahoo. Accelerate delivery, automate repetitive workloads, and create unforgettable digital experiences.
              </p>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="max-w-md pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email here"
                    className="flex-1 px-4 py-3 rounded-xl bg-[#090b11] border border-white/[0.12] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all flex-shrink-0"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {submitted ? (
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Thank you! We'll be in touch shortly.</span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                      Zero spam guarantee
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-gray-400" />
                      Instant onboarding
                    </span>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: 3D Perspective Mini Dashboard Mockup (Cols 8-12) */}
            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="relative rounded-2xl bg-[#0e121b] border border-white/[0.1] p-5 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5500]"></div>
                    <span className="text-xs font-bold text-white">ANMOL SAHOO</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
                </div>

                {/* Mini Stat rows */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#141824] border border-white/[0.05]">
                    <div className="text-[10px] text-gray-400">USERS</div>
                    <div className="text-base font-bold text-white">72,350</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141824] border border-white/[0.05]">
                    <div className="text-[10px] text-gray-400">CLICK RATE</div>
                    <div className="text-base font-bold text-[#ff7722]">56.8%</div>
                  </div>
                </div>

                {/* Mini chart bars */}
                <div className="h-16 flex items-end gap-1.5 pt-2 border-t border-white/[0.05]">
                  {[30, 45, 60, 40, 80, 55, 90, 70, 85].map((val, i) => (
                    <div
                      key={i}
                      style={{ height: `${val}%` }}
                      className={`flex-1 rounded-t-sm ${
                        i === 6 ? 'bg-[#ff5500] shadow-[0_0_10px_#ff5500]' : 'bg-[#212739]'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
