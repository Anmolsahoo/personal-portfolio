import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, Send, Sparkles, CheckCircle2, Calendar, Mail, User, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, defaultPlan }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(defaultPlan || 'Full Stack Application');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0c0f17] border border-white/[0.12] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Thank you for reaching out! I will review your project requirements and connect within 12-24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5500]"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ff7722]">
                Book a Consultation
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Let's Build Something Exceptional</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Have an upcoming product, full-stack app, or AI integration in mind? Let's discuss your timeline and technical roadmap.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#131724] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#131724] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Project Category / Plan</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#131724] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff5500]"
                >
                  <option value="Basic plan ($49/mo)">Basic plan ($49/mo)</option>
                  <option value="Business plan ($79/mo)">Business plan ($79/mo)</option>
                  <option value="Enterprise plan ($90/mo)">Enterprise plan ($90/mo)</option>
                  <option value="Custom Full Stack Web App">Custom Full Stack Web App</option>
                  <option value="AI & LLM Integration">AI & LLM Integration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Message / Notes</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share any key goals, timelines, or specifications..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#131724] border border-white/[0.08] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message & Book Call</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
