import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Settings,
  Key,
  CheckCircle2,
  Lock,
  Unlock,
  RefreshCw,
  Globe,
  ChevronDown,
  Minimize2
} from 'lucide-react';
import {
  ChatMessage,
  SupportedLanguage,
  sendChatMessage,
  getGroqApiKey,
  setGroqApiKey,
  containsCodeword
} from '../services/groqService';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSavedKey, setIsSavedKey] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial welcome message
  useEffect(() => {
    const existingKey = getGroqApiKey();
    if (existingKey) {
      setApiKeyInput(existingKey);
      setIsSavedKey(true);
    }

    const initialWelcome: Record<SupportedLanguage, string> = {
      en: `👋 Hello! I'm Anmol Sahoo's personal AI Assistant. Ask me about Anmol's projects, technical experience, freelance pricing, or contact info.\n\n💡 *Looking for a custom digital business roadmap? Ask about your business and provide your Client Access Code.*`,
      hi: `👋 नमस्ते! मैं अनमोल साहू का पर्सनल AI असिस्टेंट हूँ। आप मुझसे अनमोल के प्रोजेक्ट्स, अनुभव, फ्रीलांस पैकेज या संपर्क विवरण के बारे में पूछ सकते हैं।\n\n💡 *क्या आपको बिज़नेस रोडमैप चाहिए? अपने व्यवसाय के बारे में बताएं और अपना क्लाइंट एक्सेस कोड दर्ज करें।*`,
      or: `👋 ନମସ୍କାର! ମୁଁ ଅନମୋଲ ସାହୁଙ୍କ AI ଆସିଷ୍ଟାଣ୍ଟ। ଆପଣ ମୋତେ ଅନମୋଲଙ୍କ ପ୍ରୋଜେକ୍ଟ, ଅଭିଜ୍ଞତା, ଫ୍ରିଲାନ୍ସ ମୂଲ୍ୟ ବା ଯୋଗାଯୋଗ ବିଷୟରେ ପଚାରିପାରିବେ।\n\n💡 *ବ୍ୟବସାୟ ରୋଡ଼ମ୍ୟାପ ଆବଶ୍ୟକ? ନିଜ ବ୍ୟବସାୟ ବିଷୟରେ କୁହନ୍ତୁ ଏବଂ ନିଜର କ୍ଲାଏଣ୍ଟ ଆକ୍ସେସ୍ କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ।*`
    };

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        content: initialWelcome[language],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGroqApiKey(apiKeyInput);
    setIsSavedKey(!!apiKeyInput.trim());
    setShowSettings(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(messages, text, isUnlocked, language);
      
      if (result.unlockedNow) {
        setIsUnlocked(true);
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRoadmap: result.isRoadmap
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const quickPrompts: Record<SupportedLanguage, { label: string; query: string }[]> = {
    en: [
      { label: '💼 Projects Built', query: 'What projects has Anmol built?' },
      { label: '💰 Freelance Pricing', query: 'What are the freelance project packages?' },
      { label: '🗺️ Business Roadmap', query: 'How to build a business? Roadmap for my startup' },
      { label: '📞 Contact Anmol', query: 'How do I contact Anmol?' }
    ],
    hi: [
      { label: '💼 प्रोजेक्ट्स', query: 'अनमोल ने कौन से प्रोजेक्ट्स बनाए हैं?' },
      { label: '💰 प्राइसिंग पैकेज', query: 'फ्रीलांस प्रोजेक्ट के पैकेज और शुल्क क्या हैं?' },
      { label: '🗺️ बिज़नेस रोडमैप', query: 'नया बिज़नेस कैसे शुरू करें? रोडमैप बताएं' },
      { label: '📞 संपर्क करें', query: 'अनमोल से कैसे संपर्क करें?' }
    ],
    or: [
      { label: '💼 ପ୍ରୋଜେକ୍ଟସମୂହ', query: 'ଅନମୋଲ କେଉଁ କେଉଁ ପ୍ରୋଜେକ୍ଟ ନିର୍ମାଣ କରିଛନ୍ତି?' },
      { label: '💰 ପ୍ୟାକେଜ୍ ଓ ମୂଲ୍ୟ', query: 'ଫ୍ରିଲାନ୍ସ ପ୍ରୋଜେକ୍ଟ ପ୍ୟାକେଜ୍ କ’ଣ ଅଛି?' },
      { label: '🗺️ ବ୍ୟବସାୟ ରୋଡ଼ମ୍ୟାପ', query: 'ନୂଆ ବ୍ୟବସାୟ କିପରି ଆରମ୍ଭ କରିବି? ରୋଡ଼ମ୍ୟାପ ଦିଅନ୍ତୁ' },
      { label: '📞 ଯୋଗାଯୋଗ', query: 'ଅନମୋଲଙ୍କ ସହିତ କିପରି ଯୋଗାଯୋଗ କରିବି?' }
    ]
  };

  const placeholders: Record<SupportedLanguage, string> = {
    en: 'Ask about Anmol, projects, or roadmap...',
    hi: 'अनमोल, प्रोजेक्ट्स या रोडमैप के बारे में पूछें...',
    or: 'ଅନମୋଲ, ପ୍ରୋଜେକ୍ଟ ବା ରୋଡ଼ମ୍ୟାପ ବିଷୟରେ ପଚାରନ୍ତୁ...'
  };

  return (
    <aside aria-label="AI Assistant" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] hover:to-[#f0490f] text-white shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:shadow-[0_0_35px_rgba(255,85,0,0.7)] transition-all duration-300 hover:scale-105"
          title="Chat with Anmol's AI Assistant"
        >
          <Bot className="w-6 h-6" />
          
          {/* Animated ping dot */}
          <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#060709]"></span>
          </span>

          {/* Hover Tooltip on desktop */}
          <span className="hidden md:block absolute right-16 px-3 py-1.5 rounded-xl bg-[#0e121d] border border-white/10 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Ask Anmol AI & Roadmap
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0c0f18]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-100 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Chat Header */}
          <div className="bg-[#111625] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff5500] to-[#ff7722] flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,85,0,0.4)]">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111625]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-white">Anmol AI Assistant</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Groq AI Online</span>
                </div>
              </div>
            </div>

            {/* Right Header Controls: Language, Settings, Close */}
            <div className="flex items-center gap-1.5">
              
              {/* Language Selector */}
              <div className="flex items-center bg-[#181f33] p-0.5 rounded-lg border border-white/10 text-[10px]">
                {(['en', 'hi', 'or'] as SupportedLanguage[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-1.5 py-0.5 rounded font-bold uppercase transition-colors ${
                      language === l
                        ? 'bg-[#ff5500] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Settings (Groq API Key) */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showSettings || isSavedKey
                    ? 'text-[#ff7722] bg-white/[0.08]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
                title="Configure Groq API Key"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Drawer (Groq API Key Modal) */}
          {showSettings && (
            <div className="bg-[#121829] border-b border-white/10 p-3.5 text-xs animate-in slide-in-from-top duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#ff7722]" />
                  Groq API Key
                </span>
                <span className="text-[10px] text-gray-400">
                  {isSavedKey ? 'Key Configured' : 'Optional (Fallback Active)'}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Enter your Groq API key (`gsk_...`) for live ultra-fast LLaMA 3.3 responses. If empty, the built-in intelligent assistant handles all questions.
              </p>

              <form onSubmit={handleSaveApiKey} className="flex gap-2">
                <input
                  type="password"
                  placeholder="gsk_..."
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#0a0d16] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6715] text-white font-semibold text-xs transition-colors"
                >
                  Save
                </button>
              </form>
            </div>
          )}

          {/* Client Access Status Banner */}
          <div className="px-4 py-1.5 bg-[#0e1322] border-b border-white/[0.04] flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5">
              {isUnlocked ? (
                <>
                  <Unlock className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">VIP Client Access Verified</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span className="text-gray-400">Roadmap Protected • <strong className="text-amber-400">Client Code Required</strong></span>
                </>
              )}
            </div>
            <span className="text-gray-500 font-mono">
              {language === 'or' ? 'ଓଡ଼ିଆ' : language === 'hi' ? 'हिंदी' : 'English'}
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#ff5500] to-[#ff7722] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#ff5500] to-[#e63c00] text-white rounded-tr-xs shadow-md'
                      : msg.isRoadmap
                      ? 'bg-[#12192e] border border-emerald-500/40 text-gray-200 rounded-tl-xs shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'bg-[#141928] border border-white/[0.08] text-gray-200 rounded-tl-xs'
                  }`}
                >
                  {msg.content}
                  <div
                    className={`text-[9px] mt-1 text-right font-mono ${
                      msg.sender === 'user' ? 'text-orange-200' : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#ff5500] to-[#ff7722] flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#141928] border border-white/[0.08] px-3 py-2 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-gray-400 ml-1">Thinking with Groq...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 border-t border-white/[0.06] bg-[#0e121e] overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {quickPrompts[language].map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(qp.query)}
                className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-[#ff5500]/20 hover:text-[#ff7722] hover:border-[#ff5500]/40 border border-white/10 text-[10px] text-gray-300 whitespace-nowrap transition-all flex-shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0a0d16] border-t border-white/[0.08] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={placeholders[language]}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121624] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e63c00] hover:from-[#ff6715] disabled:opacity-40 text-white shadow-[0_0_12px_rgba(255,85,0,0.3)] transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </aside>
  );
};
