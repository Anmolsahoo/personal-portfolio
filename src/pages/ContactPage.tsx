import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  User, 
  HelpCircle, 
  ChevronDown, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full Stack Application');
  const [budget, setBudget] = useState('₹5K – ₹10K');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="pt-28 pb-24 sm:pt-36 sm:pb-32 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#ff5500]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 text-[#ff7722] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Channel</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Contact Anmol Sahoo
          </h1>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Have an upcoming build, full-stack architecture, or AI integration in mind? Let's discuss your timeline and roadmap.
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info & FAQs (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Availability Status Card */}
            <div className="p-6 rounded-3xl bg-[#0e111a] border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  Current Status
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Available for Opportunities</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {portfolioData.contact.availability}
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="p-6 rounded-3xl bg-[#0e111a] border border-white/[0.08] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 border border-[#ff5500]/30 flex items-center justify-center text-[#ff7722]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email Address</div>
                  <a href={`mailto:${portfolioData.contact.email}`} className="text-sm font-semibold text-white hover:text-[#ff7722] transition-colors">
                    {portfolioData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 border border-[#ff5500]/30 flex items-center justify-center text-[#ff7722]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Location</div>
                  <div className="text-sm font-semibold text-white">
                    {portfolioData.contact.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 border border-[#ff5500]/30 flex items-center justify-center text-[#ff7722]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Response Window</div>
                  <div className="text-sm font-semibold text-white">
                    {portfolioData.contact.responseTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-3xl bg-[#0e111a] border border-white/[0.08]">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Connect on Social Networks
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#ff5500] hover:text-white border border-white/[0.06] flex items-center justify-center text-gray-300 transition-all text-xs font-medium gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#ff5500] hover:text-white border border-white/[0.06] flex items-center justify-center text-gray-300 transition-all text-xs font-medium gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#ff5500] hover:text-white border border-white/[0.06] flex items-center justify-center text-gray-300 transition-all text-xs font-medium gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Frequently Asked Questions
              </div>
              {portfolioData.contact.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0e111a] border border-white/[0.08] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-[#ff7722] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-xs text-gray-400 leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-b from-[#121624] to-[#0a0d15] border border-white/[0.1] p-7 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5500]/10 rounded-full blur-3xl pointer-events-none"></div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-sm text-gray-300 max-w-sm mx-auto">
                    Thank you for reaching out, {name || 'there'}. I have received your note and will reply directly to {email} shortly.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Send a Direct Message</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-8">
                    Fill out the form below with your goals and specifications to kickstart a conversation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-[#0d1019] border border-white/[0.1] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#0d1019] border border-white/[0.1] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Project Category
                        </label>
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0d1019] border border-white/[0.1] text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff5500] transition-colors"
                        >
                          <option value="Full Stack Application">Full Stack Application</option>
                          <option value="AI & LLM Integration">AI & LLM Integration</option>
                          <option value="UI/UX Architecture">UI/UX Architecture</option>
                          <option value="Technical Consulting / Code Review">Technical Consulting</option>
                          <option value="Full-Time Role Inquiry">Full-Time Role Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">
                          Target Budget / Scope
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0d1019] border border-white/[0.1] text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff5500] transition-colors"
                        >
                          <option value="₹5K – ₹10K">₹5,000 – ₹10,000 (₹5K – ₹10K)</option>
                          <option value="₹10K – ₹25K">₹10,000 – ₹25,000 (₹10K – ₹25K)</option>
                          <option value="₹25K – ₹50K">₹25,000 – ₹50,000 (₹25K – ₹50K)</option>
                          <option value="₹50K – ₹75K">₹50,000 – ₹75,000 (₹50K – ₹75K)</option>
                          <option value="₹75K – ₹1 Lakh">₹75,000 – ₹1,00,000 (₹75K – ₹1 Lakh)</option>
                          <option value="₹1 Lakh+">₹1,00,000+ (₹1 Lakh+)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">
                        Project Overview & Key Goals
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your product, tech stack, desired timeline, or any specific challenges you're facing..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0d1019] border border-white/[0.1] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,85,0,0.4)] hover:shadow-[0_0_35px_rgba(255,85,0,0.6)] transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry & Schedule Call</span>
                    </button>

                    <p className="text-[11px] text-gray-500 text-center">
                      Protected by direct cryptographic transport. No spam guaranteed.
                    </p>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
