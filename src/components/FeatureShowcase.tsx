import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Check, 
  ChevronRight, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  Activity, 
  LineChart as LineChartIcon,
  Shield,
  Zap,
  Flame
} from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#07090f]/70 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Powerful Features
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Explore the frontier of software engineering with Anmol Sahoo. Modern architectures that redefine the boundaries of what's possible in scalable web systems.
          </p>
        </div>

        {/* Alternating Feature Rows */}
        <div className="space-y-24 sm:space-y-32">
          
          {/* Feature Row 1: Top Management */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Text & Points (Cols 1-6) */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Top Management, to help you see the bigger picture
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Coordinate complex multi-tenant architectures and streamline deployments. Our state orchestrator monitors latency and thread bottlenecks automatically.
              </p>

              <div>
                <a
                  href="#features"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff6715] hover:text-[#ff8a43] transition-colors group"
                >
                  <span>See Doc</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Checkbox List */}
              <div className="space-y-3 pt-4 border-t border-white/[0.07]">
                {[
                  "Customizable layouts for efficient coding",
                  "Font preferences to match your style",
                  "Create multiple profiles for versatility"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#ff4400] to-[#ff7700] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Graphic Mockup (Cols 7-12) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-[#121622] to-[#0a0d14] p-6 sm:p-8 border border-white/[0.1] shadow-2xl overflow-hidden group">
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5500]/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Floating Card 1: Sessions */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161b2b]/90 border border-white/[0.08] mb-4 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center text-[#ff6715]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Active Sessions</div>
                      <div className="text-xs text-gray-400">Continuous thread sync</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live
                  </span>
                </div>

                {/* Floating Card 2: Live Chat */}
                <div className="p-4 rounded-2xl bg-[#161b2b]/90 border border-white/[0.08] mb-4 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-[#ff7722]" />
                    <span className="text-xs font-semibold text-white">AI Agent Stream</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-[#0e111a] text-xs text-gray-300 border border-white/[0.05]">
                      Refactored state machine for zero-overhead rendering.
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#ff5500]/15 text-xs text-[#ffa066] border border-[#ff5500]/25 ml-4">
                      All unit tests passed. Ready for deployment.
                    </div>
                  </div>
                </div>

                {/* Metallic 3D Ribbon Art graphic simulation */}
                <div className="h-32 sm:h-40 w-full rounded-2xl bg-gradient-to-r from-[#171a25] via-[#212739] to-[#121520] border border-white/[0.06] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ff5500]/20 to-transparent"></div>
                  <div className="flex items-center gap-3 relative z-10">
                    <Flame className="w-8 h-8 text-[#ff5500] animate-bounce" />
                    <span className="text-sm font-bold text-white tracking-widest uppercase">
                      Hyper-Engineered Performance
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Feature Row 2: Fast-reading charts on the go (Reversed) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Visual Graphic Mockup (Cols 1-6 on Desktop) */}
            <div className="lg:col-span-6 lg:order-1 order-2 relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-[#121622] to-[#0a0d14] p-6 sm:p-8 border border-white/[0.1] shadow-2xl overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff5500]/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* "Charts always ON!" Top Card */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#161b2b]/90 border border-white/[0.08] mb-5 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <LineChartIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Charts always ON!</div>
                      <div className="text-xs text-gray-400">Instantaneous GPU vector rendering</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ff5500]/20 text-[#ff7722] border border-[#ff5500]/30 font-mono">
                    29.4%
                  </span>
                </div>

                {/* Interactive Wave Chart Simulation */}
                <div className="p-5 rounded-2xl bg-[#0f121b] border border-white/[0.06] space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Peak Latency Spectrum</span>
                    <span className="text-emerald-400 font-mono">1.2ms avg</span>
                  </div>

                  <svg viewBox="0 0 400 120" className="w-full h-24 sm:h-28 overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff5500" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ff5500" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,90 Q 60,30 120,70 T 240,40 T 360,20 L 400,35 L 400,120 L 0,120 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M 0,90 Q 60,30 120,70 T 240,40 T 360,20 L 400,35"
                      fill="none"
                      stroke="#ff5500"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="360" cy="20" r="4" fill="#ffaa00" />
                  </svg>
                </div>

              </div>
            </div>

            {/* Text & Points (Cols 7-12 on Desktop) */}
            <div className="lg:col-span-6 lg:order-2 order-1 space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Helping you with fast-reading charts on the go
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Stay updated anywhere. Whether on mobile, tablet, or high-density monitors, our charts offer microsecond responsiveness without dropping frames.
              </p>

              <div>
                <a
                  href="#features"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff6715] hover:text-[#ff8a43] transition-colors group"
                >
                  <span>See Doc</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Checkbox List */}
              <div className="space-y-3 pt-4 border-t border-white/[0.07]">
                {[
                  "Customizable layouts for efficient coding",
                  "Font preferences to match your style",
                  "Create multiple profiles for versatility"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#ff4400] to-[#ff7700] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
