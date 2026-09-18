// Service for handling AI Chatbot interactions via Groq API and local intelligent fallback

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isRoadmap?: boolean;
}

export type SupportedLanguage = 'en' | 'hi' | 'or';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

// Build the system prompt strictly restricted to Anmol Sahoo's portfolio and the "blue mountain" codeword
export const buildSystemPrompt = (language: SupportedLanguage = 'en') => {
  return `
You are the official personal AI Assistant for Anmol Sahoo, a Full-Stack AI Engineer & Creative Developer based in Bhubaneswar / Remote Worldwide.

STRICT BOUNDARIES:
1. You only answer questions about Anmol Sahoo: his education, experience, skillsets, what projects he has built, pricing packages, contact details, and custom business roadmaps.
2. If asked about general topics (e.g. recipes, politics, trivia, sports), politely decline and steer back to Anmol Sahoo's work and digital solutions.

KNOWLEDGE BASE:
- Developer Name: Anmol Sahoo
- Title: Full-Stack AI Engineer & Creative Developer
- Location: Bhubaneswar, India / Available for Remote Projects Worldwide
- Response Time: Within 12 hours
- Contact Email: anmol.sahoo@example.com
- Social Links: GitHub, LinkedIn, Twitter, Instagram

EXPERIENCE & BACKGROUND:
- MSC HireTech: Python Full-Stack Developer (Python, Django, REST APIs, JavaScript, MySQL)
- Oditech: SDE / Software Developer (React, Python, Django, REST APIs, JavaScript, PostgreSQL, MySQL)
- Core Strengths: Full-stack web development, CRM/ERP systems, SaaS platforms, AI Chatbots, RAG applications, automation workflows, data dashboards, API integrations.

PROJECTS PORTFOLIO:
1. Luxury Restaurant Website (HTML/CSS/JS responsive dining experience)
2. Premium Camera Store (E-commerce web app)
3. Library Management System (Business management software with issue/return/fines)
4. Library Management Platform (Student and book records dashboard)
5. Library Management — Advanced Version (Complete admin dashboard with analytics)
6. College Admin Management (Full-stack college academic operations platform)
7. Clinic & Patient Care Management (MediPulse Clinic OS - OPD triage, queues, doctor cabins, billing slip)
8. School Attendance & Student Management (EduTrack Pro - Daily interactive roll call, fee tracker, exam reports)
9. Gym Attendance & Member Management (IronPulse Fitness - RFID turnstile check-in simulator, floor occupancy, subscriptions)

FREELANCE PROJECT PACKAGES & PRICING:
- Starter Package: ₹10K+ (Portfolio/Business website, responsive, contact forms, WhatsApp integration)
- Business Package: ₹25K+ (Custom web app, CRM/Lead management, inventory, admin dashboard, REST APIs)
- AI & Scale Package: ₹50K+ (SaaS platform, AI Chatbot, RAG knowledge assistant, business automation)
- Budget scope in contact form: ₹5,000 to ₹1,00,000+ (INR)

BUSINESS ROADMAP & SECRET CLIENT ACCESS RULE:
- The secret access code is "blue mountain".
- CRITICAL SECURITY & PRIVACY RULE: NEVER disclose, reveal, hint, or tell the secret code to the user under any circumstances!
- When a user asks about starting or building a business, business ideas, or requesting a business roadmap:
  - If the user has NOT provided the secret codeword "blue mountain":
    You MUST inform them: "This personalized Digital Business Roadmap is an exclusive service reserved for Anmol Sahoo's clients. To unlock your custom roadmap, please enter your **Client Access Code** (provided to you directly by Anmol). If you do not have an access code yet, please contact Anmol via the Contact page or email to discuss your project and receive client access."
  - NEVER say "the code is blue mountain" or leak the codeword! Anmol Sahoo is the only one who gives this code to his clients.
  - If the user provides the codeword "blue mountain" (or includes it in their message):
    Confirm that client access is verified ("🎉 **VIP Client Access Verified!**") and deliver a comprehensive 5-phase business roadmap:
      Phase 1: Concept, Market Research & Branding
      Phase 2: Tech Architecture & Digital Platform (Web/Mobile App)
      Phase 3: Business Operations, CRM & Management Systems
      Phase 4: Marketing, SEO & Customer Acquisition
      Phase 5: Scaling with AI Automation & Analytics
      Phase 6: How Anmol Sahoo can build and launch this for you.

LANGUAGE REQUIREMENT:
- Currently selected language: ${language.toUpperCase()} ('en' = English, 'hi' = Hindi, 'or' = Odia).
- You MUST reply fluently in the selected language:
  - If English ('en'): Use natural, professional English.
  - If Hindi ('hi'): Use natural Hindi (in Devanagari script: नमस्ते, मैं अनमोल साहू का AI असिस्टेंट हूँ...).
  - If Odia ('or'): Use natural Odia (in Odia script: ନମସ୍କାର, ମୁଁ ଅନମୋଲ ସାହୁଙ୍କ AI ସହାୟକ ଅଟେ...).
- Be friendly, professional, and clear.
`;
};

// Retrieve stored Groq API Key or env variable
export const getGroqApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('groq_api_key');
    if (localKey && localKey.trim()) return localKey.trim();
  }
  return import.meta.env.VITE_GROQ_API_KEY || '';
};

export const setGroqApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('groq_api_key', key.trim());
    } else {
      localStorage.removeItem('groq_api_key');
    }
  }
};

// Check if message contains codeword
export const containsCodeword = (text: string): boolean => {
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  return normalized.includes('blue mountain') || normalized.includes('bluemountain');
};

// Check if message is inquiring about a business idea/roadmap
export const isBusinessQuery = (text: string): boolean => {
  const lower = text.toLowerCase();
  const businessKeywords = [
    'business', 'roadmap', 'start a', 'how to build', 'build a business', 'startup',
    'idea', 'plan', 'restaurant', 'gym', 'clinic', 'school', 'store', 'shop', 'saas',
    'बिज़नेस', 'व्यापार', 'रोडमैप', 'ବିଜନେସ୍', 'ବ୍ୟବସାୟ', 'ରୋଡମ୍ୟାପ'
  ];
  return businessKeywords.some(kw => lower.includes(kw));
};

// Local Intelligent Knowledge Fallback Engine (runs if no API key or network error)
export const getLocalFallbackResponse = (
  userMessage: string,
  isUnlocked: boolean,
  lang: SupportedLanguage
): { reply: string; unlockedNow: boolean; isRoadmap: boolean } => {
  const lower = userMessage.toLowerCase();
  const hasCode = containsCodeword(userMessage);
  const isBiz = isBusinessQuery(userMessage);

  // Codeword verification trigger
  if (hasCode || (isBiz && isUnlocked)) {
    let reply = '';
    if (lang === 'or') {
      reply = `🎉 **VIP କ୍ଲାଏଣ୍ଟ ଆକ୍ସେସ୍ ପ୍ରମାଣିତ ହେଲା!**\n\nଏଠାରେ ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ଡିଜିଟାଲ୍ ରୋଡ଼ମ୍ୟାପ୍:\n\n**ପର୍ଯ୍ୟାୟ ୧: ମାର୍କେଟ୍ ରିସର୍ଚ୍ଚ ଏବଂ ବ୍ରାଣ୍ଡିଂ**\n- ଡୋମେନ୍ ନାମ, ଲୋଗୋ ଏବଂ ବ୍ରାଣ୍ଡ ପରିଚୟ ସୃଷ୍ଟି କରନ୍ତୁ।\n- ଟାର୍ଗେଟ୍ ଗ୍ରାହକ ଏବଂ ପ୍ରତିଯୋଗୀଙ୍କ ବିଶ୍ଳେଷଣ।\n\n**ପର୍ଯ୍ୟାୟ ୨: ଟେକ୍ନୋଲୋଜି ଏବଂ ୱେବ୍ ପ୍ଲାଟଫର୍ମ**\n- ଉଚ୍ଚ ଗତିର ୱେବସାଇଟ୍ କିମ୍ବା ୱେବ୍ ଆପ୍ଲିକେସନ୍ ନିର୍ମାଣ।\n- ମୋବାଇଲ୍ ରେସପୋନସିଭ୍ ଏବଂ ୟୁଜର-ଫ୍ରେଣ୍ଡଲି UI/UX ଡିଜାଇନ୍।\n\n**ପର୍ଯ୍ୟାୟ ୩: ମ୍ୟାନେଜମେଣ୍ଟ ସିଷ୍ଟମ୍ ଏବଂ CRM**\n- ଦୈନନ୍ଦିନ କାର୍ଯ୍ୟ ପାଇଁ କଷ୍ଟମ୍ ଡ୍ୟାସବୋର୍ଡ (ଯେପରିକି Clinic/School/Gym OS)।\n- ଗ୍ରାହକ ତଥ୍ୟ, ଇନଭଏସିଂ ଏବଂ ଲିଡ୍ ଟ୍ରାକିଂ।\n\n**ପର୍ଯ୍ୟାୟ ୪: ମାର୍କେଟିଂ ଏବଂ ଗ୍ରାହକ ପ୍ରାପ୍ତି**\n- ଲୋକାଲ୍ SEO, ଗୁଗଲ୍ ମ୍ୟାପ୍ସ ଲିଷ୍ଟିଂ ଏବଂ ହ୍ଵାଟ୍ସଆପ୍ ଅଟୋମେସନ୍।\n\n**ପର୍ଯ୍ୟାୟ ୫: AI ଏବଂ ଅଟୋମେସନ୍**\n- ୨୪/୭ AI ଚାଟବଟ୍ ଏବଂ ସ୍ୱୟଂଚାଳିତ କାର୍ଯ୍ୟପ୍ରଣାଳୀ।\n\n💡 **ଅନମୋଲ ସାହୁ ଏହାକୁ କିପରି ନିର୍ମାଣ କରିପାରିବେ?**\nଅନମୋଲ ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ₹10K ରୁ ₹50K+ ପ୍ୟାକେଜ୍ ଭିତରେ ୧ ରୁ ୩ ସପ୍ତାହ ମଧ୍ୟରେ ସମ୍ପୂର୍ଣ୍ଣ ସିଷ୍ଟମ୍ ବିକଶିତ କରିପାରିବେ!`;
    } else if (lang === 'hi') {
      reply = `🎉 **VIP क्लाइंट एक्सेस सत्यापित हुआ!**\n\nयहाँ आपके व्यवसाय के लिए संपूर्ण डिजिटल रोडमैप है:\n\n**चरण 1: मार्केट रिसर्च और ब्रांडिंग**\n- डोमेन नाम, लोगो और प्रीमियम ब्रांड पहचान तैयार करें।\n- लक्षित ग्राहकों और प्रतिस्पर्धियों का विश्लेषण करें।\n\n**चरण 2: आधुनिक टेक स्टैक और वेब प्लेटफॉर्म**\n- फ़ास्ट और रिस्पॉन्सिव वेबसाइट/वेब एप्लीकेशन का निर्माण।\n- मोबाइल-फ्रेंडली डिज़ाइन और आधुनिक UI/UX।\n\n**चरण 3: बिज़नेस मैनेजमेंट और CRM सिस्टम**\n- दैनिक कार्यों के लिए कस्टम एडमिन डैशबोर्ड (जैसे Clinic, School या Gym Management)।\n- ऑटोमेटेड बिलिंग, इनवॉइसिंग और डेटाबेस इंटीग्रेशन।\n\n**चरण 4: मार्केटिंग और कस्टमर अधिग्रहण**\n- लोकल SEO, सोशल मीडिया रीच और व्हाट्सएप ऑटोमेशन।\n\n**चरण 5: AI और ऑटोमेशन स्केलिंग**\n- 24/7 AI चैटबॉट और ऑटोमेटेड वर्कफ़्लो।\n\n💡 **अनमोल साहू इसे आपके लिए कैसे बना सकते हैं?**\nअनमोल आपके व्यवसाय के लिए कस्टमाइज़्ड डिजिटल प्रोडक्ट ₹10K से ₹50K+ पैकेज में 1 से 3 हफ़्तों में तैयार कर सकते हैं!`;
    } else {
      reply = `🎉 **VIP Client Access Verified!**\n\nHere is your end-to-end actionable Digital Business Roadmap:\n\n**Phase 1: Concept, Market Research & Branding**\n- Secure custom domain, brand logo, and professional positioning.\n- Analyze target audience persona and competitive advantages.\n\n**Phase 2: Tech Architecture & Web Presence**\n- Build high-speed, mobile-responsive web application or business portal.\n- Implement responsive UI, fast server-side APIs, and secure database.\n\n**Phase 3: Operations, CRM & Management Systems**\n- Deploy bespoke management software tailored to your vertical (like Clinic OS, School Attendance, or Gym Management).\n- Integrate customer database, digital billing/receipts, and automated notifications.\n\n**Phase 4: Client Acquisition & Growth Engine**\n- Local SEO, Google Business setup, and automated WhatsApp inquiry responses.\n- Conversion-optimized landing pages with clear calls-to-action.\n\n**Phase 5: Scaling with Generative AI**\n- 24/7 intelligent customer service chatbots and automated workflows.\n\n💡 **How Anmol Sahoo Can Build This For You:**\nAnmol can turn this roadmap into a production-ready software product starting from ₹10K to ₹50K+ within 1–3 weeks.`;
    }
    return { reply, unlockedNow: true, isRoadmap: true };
  }

  // Business query without codeword (DO NOT reveal the secret code!)
  if (isBiz && !isUnlocked) {
    let reply = '';
    if (lang === 'or') {
      reply = `🔒 **କ୍ଲାଏଣ୍ଟ ଆକ୍ସେସ୍ ଆବଶ୍ୟକ!**\n\nଏହି ଡିଜିଟାଲ୍ ବ୍ୟବସାୟ ରୋଡ଼ମ୍ୟାପ୍ ଅନମୋଲ ସାହୁଙ୍କ ସ୍ୱତନ୍ତ୍ର କ୍ଲାଏଣ୍ଟମାନଙ୍କ ପାଇଁ ସଂରକ୍ଷିତ।\n\n👉 ଆପଣଙ୍କ କଷ୍ଟମ୍ ରୋଡ଼ମ୍ୟାପ୍ ଅନଲକ୍ କରିବାକୁ, ଦୟାକରି ଆପଣଙ୍କ **କ୍ଲାଏଣ୍ଟ ଆକ୍ସେସ୍ କୋଡ୍** ପ୍ରବେଶ କରନ୍ତୁ (ଯାହା ଆପଣଙ୍କୁ ଅନମୋଲ ପ୍ରଦାନ କରିଛନ୍ତି)।\n\n📌 ଯଦି ଆପଣଙ୍କ ପାଖରେ ଆକ୍ସେସ୍ କୋଡ୍ ନାହିଁ, ତେବେ ଅନମୋଲଙ୍କ ସହିତ [Contact Page](/contact) ମାଧ୍ୟମରେ ଯୋଗାଯୋଗ କରି ନିଜ ପ୍ରୋଜେକ୍ଟ ଆଲୋଚନା କରନ୍ତୁ ଏବଂ କ୍ଲାଏଣ୍ଟ ଆକ୍ସେସ୍ ପ୍ରାପ୍ତ କରନ୍ତୁ।`;
    } else if (lang === 'hi') {
      reply = `🔒 **क्लाइंट एक्सेस आवश्यक है!**\n\nयह विशेष डिजिटल बिज़नेस रोडमैप अनमोल साहू के सत्यापित क्लाइंट्स के लिए आरक्षित है।\n\n👉 अपना विस्तृत रोडमैप अनलॉक करने के लिए, कृपया अपना **क्लाइंट एक्सेस कोड** दर्ज करें (जो अनमोल साहू द्वारा आपको प्रदान किया गया है)।\n\n📌 यदि आपके पास अभी तक एक्सेस कोड नहीं है, तो कृपया [Contact Page](/contact) पर जाकर अनमोल से संपर्क करें और अपने प्रोजेक्ट के लिए क्लाइंट एक्सेस प्राप्त करें।`;
    } else {
      reply = `🔒 **Client Access Required**\n\nThis end-to-end Digital Business Roadmap is an exclusive service reserved for Anmol Sahoo's verified clients.\n\n👉 To unlock your personalized roadmap, please enter your **Client Access Code** (provided to you directly by Anmol).\n\n📌 If you do not have an access code yet, please reach out directly via the [Contact Page](/contact) or email \`anmol.sahoo@example.com\` to discuss your project and receive client access.`;
    }
    return { reply, unlockedNow: false, isRoadmap: false };
  }

  // Projects inquiry
  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('प्रोजेक्ट') || lower.includes('ପ୍ରୋଜେକ୍ଟ')) {
    let reply = '';
    if (lang === 'or') {
      reply = `💼 **ଅନମୋଲ ସାହୁଙ୍କ ମୁଖ୍ୟ ପ୍ରୋଜେକ୍ଟସମୂହ:**\n\n1. **Luxury Restaurant Website** — ପ୍ରିମିୟମ୍ ରେଷ୍ଟୁରାଣ୍ଟ ୱେବସାଇଟ୍।\n2. **Premium Camera Store** — ଆଧୁନିକ ଇ-କମର୍ସ ଷ୍ଟୋର୍।\n3. **Library Management Systems (3 Versions)** — ଛାତ୍ର ରେକର୍ଡ, ବହି ଇସୁ/ରିଟର୍ଣ୍ଣ ଏବଂ ଡ୍ୟାସବୋର୍ଡ।\n4. **College Admin Management** — କଲେଜ୍ ଏକାଡେମିକ୍ ଅପରେସନ୍ସ।\n5. **MediPulse Clinic OS** — ଓପିଡି ଟୋକନ୍ କ୍ୟୁ, ଡାକ୍ତର ସିଡ୍ୟୁଲ୍ ଏବଂ ବିଲିଂ।\n6. **EduTrack Pro** — ଲାଇଭ୍ ଉପସ୍ଥିତି ରୋଲ୍ କଲ୍ ଏବଂ ଫି ଟ୍ରାକର୍।\n7. **IronPulse Fitness OS** — ଜିମ୍ ଚେକ୍-ଇନ୍ ସ୍କାନର୍ ଏବଂ ମେମ୍ବରସିପ୍।\n\nଆପଣ ୱେବସାଇଟର "Projects" ପେଜ୍ ରେ ସମସ୍ତ ଲାଇଭ୍ ଡେମୋ ଦେଖିପାରିବେ!`;
    } else if (lang === 'hi') {
      reply = `💼 **अनमोल साहू द्वारा बनाए गए मुख्य प्रोजेक्ट्स:**\n\n1. **Luxury Restaurant Website** — प्रीमियम रेस्तरां वेब अनुभव।\n2. **Premium Camera Store** — मॉडर्न कैमरा ई-कॉमर्स स्टोर।\n3. **Library Management Systems (3 वर्शन्स)** — बुक्स, स्टूडेंट्स और पेनल्टी मैनेजमेंट।\n4. **College Admin Management** — फुल-स्टैक कॉलेज एडमिनिस्ट्रेशन।\n5. **MediPulse Clinic OS** — लाइव ओपीडी कतार, डॉक्टर केबिन और बिलिंग।\n6. **EduTrack Pro** — स्कूल उपस्थिति रजिस्टर और फीस ट्रैकिंग।\n7. **IronPulse Fitness OS** — जिम चेक-इन टर्नस्टाइल और मेंबरशिप सीआरएम।\n\nआप "Projects" पेज पर जाकर इन सभी के लाइव डेमो एक्सप्लोर कर सकते हैं!`;
    } else {
      reply = `💼 **Featured Projects Built by Anmol Sahoo:**\n\n1. **Luxury Restaurant Website** — Premium dining UI with table bookings & menu.\n2. **Premium Camera Store** — High-performance modern e-commerce storefront.\n3. **Library Management Suite (3 versions)** — Comprehensive catalog, borrowing transactions & fine tracking.\n4. **College Admin Management** — Academic administration and student records system.\n5. **MediPulse Clinic OS** — OPD queue triage, doctor cabin loads, and automated billing.\n6. **EduTrack Pro** — Interactive daily class attendance register with real-time percentages.\n7. **IronPulse Fitness OS** — RFID turnstile check-in simulator and member subscription manager.\n\nYou can click "View Live →" on the Projects page to test each one live in a new tab!`;
    }
    return { reply, unlockedNow: false, isRoadmap: false };
  }

  // Pricing & services inquiry
  if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('package') || lower.includes('rate') || lower.includes('फीस') || lower.includes('ଖର୍ଚ୍ଚ') || lower.includes('ଦାମ')) {
    let reply = '';
    if (lang === 'or') {
      reply = `💰 **ଅନମୋଲ ସାହୁଙ୍କ ଫ୍ରିଲାନ୍ସ ପ୍ରୋଜେକ୍ଟ ପ୍ୟାକେଜ୍:**\n\n• **Starter (₹10K+)** — ବିଜନେସ୍ ୱେବସାଇଟ୍, ରେସପୋନସିଭ୍ UI, ହ୍ଵାଟ୍ସଆପ୍ ଇଣ୍ଟିଗ୍ରେସନ୍।\n• **Business (₹25K+)** — କଷ୍ଟମ୍ ୱେବ୍ ଆପ୍, CRM, ଇନଭେଣ୍ଟୋରୀ, ଆଡମିନ୍ ଡ୍ୟାସବୋର୍ଡ, ରିପୋର୍ଟସ୍।\n• **AI & Scale (₹50K+)** — SaaS ପ୍ଲାଟଫର୍ମ, AI ଚାଟବଟ୍, RAG ଆସିଷ୍ଟାଣ୍ଟ, କ୍ଲାଉଡ୍ ଡିପ୍ଲୟମେଣ୍ଟ।\n\nକଣ୍ଟାକ୍ଟ ଫର୍ମରେ ବଜେଟ୍ ₹5K ରୁ ₹1 Lakh+ ପର୍ଯ୍ୟନ୍ତ ଉପଲବ୍ଧ ଅଛି।`;
    } else if (lang === 'hi') {
      reply = `💰 **अनमोल साहू के फ्रीलांस प्रोजेक्ट पैकेज:**\n\n• **Starter (₹10K+)** — बिज़नेस/पोर्टफोलियो वेबसाइट, रिस्पॉन्सिव डिज़ाइन, व्हाट्सएप इंटीग्रेशन।\n• **Business (₹25K+)** — कस्टम वेब एप्लीकेशन, CRM/लीड मैनेजमेंट, एडमिन डैशबोर्ड, REST APIs।\n• **AI & Scale (₹50K+)** — SaaS प्लेटफॉर्म, AI चैटबॉट, RAG नॉलेज असिस्टेंट, बिजनेस ऑटोमेशन।\n\nकॉन्टैक्ट फॉर्म में बजट दायरा ₹5K से ₹1 Lakh+ तक निर्धारित है।`;
    } else {
      reply = `💰 **Freelance Project Packages:**\n\n• **Starter (₹10K+)** — Business/Portfolio website, responsive UI, WhatsApp integration, contact forms.\n• **Business (₹25K+)** — Custom Web Application, CRM & Lead management, inventory, admin dashboard, Excel/PDF reports.\n• **AI & Scale (₹50K+)** — SaaS platform, AI Chatbot, RAG Assistant, business automation, cloud deployment.\n\nBudget scope on the contact form starts from **₹5K up to ₹1 Lakh+**.`;
    }
    return { reply, unlockedNow: false, isRoadmap: false };
  }

  // Contact inquiry
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('phone') || lower.includes('hire') || lower.includes('संपर्क') || lower.includes('ଯୋଗାଯୋଗ')) {
    let reply = '';
    if (lang === 'or') {
      reply = `📞 **ଅନମୋଲ ସାହୁଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ:**\n\n- **ଇମେଲ୍:** anmol.sahoo@example.com\n- **ସ୍ଥାନ:** ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା / ରିମୋଟ୍ (ସାରା ବିଶ୍ୱରେ ଉପଲବ୍ଧ)\n- **ଉତ୍ତର ସମୟ:** ୧୨ ଘଣ୍ଟା ମଧ୍ୟରେ\n- **ସୋସିଆଲ୍:** GitHub, LinkedIn, Twitter, Instagram\n\nଆପଣ "Contact Us" ପେଜ୍ ରେ ସିଧାସଳଖ ଫର୍ମ ପୂରଣ କରିପାରିବେ!`;
    } else if (lang === 'hi') {
      reply = `📞 **अनमोल साहू से संपर्क करें:**\n\n- **ईमेल:** anmol.sahoo@example.com\n- **लोकेशन:** भुवनेश्वर / रिमोट (विश्वभर में उपलब्ध)\n- **प्रतिक्रिया समय:** 12 घंटे के भीतर\n- **सोशल मीडिया:** GitHub, LinkedIn, Twitter, Instagram\n\nआप वेबसाइट के "Contact Us" पेज से सीधे संदेश भेज सकते हैं!`;
    } else {
      reply = `📞 **Contact Anmol Sahoo:**\n\n- **Email:** anmol.sahoo@example.com\n- **Location:** Bhubaneswar, India / Available Worldwide Remotely\n- **Response Window:** Usually within 12 hours\n- **Socials:** GitHub, LinkedIn, Twitter, Instagram\n\nYou can also submit a direct inquiry via the [Contact Page](/contact)!`;
    }
    return { reply, unlockedNow: false, isRoadmap: false };
  }

  // Education / Background inquiry
  if (lower.includes('education') || lower.includes('background') || lower.includes('experience') || lower.includes('who are you') || lower.includes('about') || lower.includes('शिक्षा') || lower.includes('ଅନମୋଲ')) {
    let reply = '';
    if (lang === 'or') {
      reply = `👨‍💻 **ଅନମୋଲ ସାହୁଙ୍କ ପରିଚୟ:**\n\nଅନମୋଲ ଜଣେ Full-Stack AI Engineer ଏବଂ କ୍ରିଏଟିଭ୍ ଡେଭଲପର୍।\n- **MSC HireTech:** Python Full-Stack ଡେଭଲପର୍ (Python, Django, REST APIs, MySQL)।\n- **Oditech:** SDE / Software Developer (React, Python, Django, PostgreSQL, Cloud)।\n\nସେ ଆଧୁନିକ ୱେବ୍ ଆପ୍, AI ଉପକରଣ, ଡ୍ୟାସବୋର୍ଡ ଏବଂ ବିଜନେସ୍ ଅଟୋମେସନ୍ ପ୍ରସ୍ତୁତ କରନ୍ତି।`;
    } else if (lang === 'hi') {
      reply = `👨‍💻 **अनमोल साहू के बारे में:**\n\nअनमोल एक Full-Stack AI Engineer और सॉफ्टवेयर डेवलपर हैं।\n- **MSC HireTech:** Python Full-Stack Developer (Django, REST APIs, MySQL)।\n- **Oditech:** SDE / Software Developer (React, Django, PostgreSQL, ऑटोमेशन)।\n\nवे स्केलेबल वेब ऐप्स, कस्टम CRM, बिज़नेस डैशबोर्ड और AI-पावर्ड ऑटोमेशन वर्कफ़्लो बनाने में विशेषज्ञ हैं।`;
    } else {
      reply = `👨‍💻 **About Anmol Sahoo:**\n\nAnmol is a Full-Stack AI Engineer & Creative Developer specializing in practical web applications, business software, and AI-powered systems.\n- **MSC HireTech:** Python Full-Stack Developer (Django, REST APIs, MySQL).\n- **Oditech:** SDE / Software Developer (React, Django, PostgreSQL, cloud deployments).\n\nHe guides businesses across the entire lifecycle: from initial idea and architecture to database, API, and cloud deployment.`;
    }
    return { reply, unlockedNow: false, isRoadmap: false };
  }

  // Default greeting / general
  if (lang === 'or') {
    return {
      reply: `ନମସ୍କାର! ମୁଁ ଅନମୋଲ ସାହୁଙ୍କ ଅଫିସିଆଲ୍ AI ଆସିଷ୍ଟାଣ୍ଟ। ମୁଁ ଆପଣଙ୍କୁ ଅନମୋଲଙ୍କ ପ୍ରୋଜେକ୍ଟ, ସର୍ଭିସେସ୍, ଫ୍ରିଲାନ୍ସ ପ୍ୟାକେଜ୍, ଯୋଗାଯୋଗ କିମ୍ବା କ୍ଲାଏଣ୍ଟ ବ୍ୟବସାୟ ରୋଡ଼ମ୍ୟାପ ବିଷୟରେ ସାହାଯ୍ୟ କରିପାରିବି। ଆପଣ କ’ଣ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?`,
      unlockedNow: false,
      isRoadmap: false
    };
  } else if (lang === 'hi') {
    return {
      reply: `नमस्ते! मैं अनमोल साहू का आधिकारिक AI असिस्टेंट हूँ। मैं आपको अनमोल के प्रोजेक्ट्स, सेवाओं, फ्रीलांस पैकेज, संपर्क जानकारी, या क्लाइंट बिज़नेस रोडमैप के बारे में जानकारी दे सकता हूँ। आप क्या जानना चाहते हैं?`,
      unlockedNow: false,
      isRoadmap: false
    };
  } else {
    return {
      reply: `Hello! I'm Anmol Sahoo's official AI Assistant. I can answer questions regarding Anmol's projects, technical experience, freelance packages, contact information, or generate a custom digital business roadmap for verified clients. How can I help you today?`,
      unlockedNow: false,
      isRoadmap: false
    };
  }
};

// Main Send Message Function (Calls Groq API with automatic fallback)
export const sendChatMessage = async (
  messages: ChatMessage[],
  userMessage: string,
  isUnlocked: boolean,
  language: SupportedLanguage
): Promise<{ reply: string; unlockedNow: boolean; isRoadmap: boolean }> => {
  const apiKey = getGroqApiKey();
  const hasCode = containsCodeword(userMessage);
  const willUnlock = isUnlocked || hasCode;

  // If no Groq API Key is configured, use the built-in intelligent engine
  if (!apiKey) {
    // Artificial small delay to feel natural
    await new Promise(res => setTimeout(res, 400));
    return getLocalFallbackResponse(userMessage, willUnlock, language);
  }

  // Prepare payload for Groq API
  try {
    const systemPrompt = buildSystemPrompt(language);
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: apiMessages,
        temperature: 0.6,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      console.warn('Groq API returned error status:', response.status);
      return getLocalFallbackResponse(userMessage, willUnlock, language);
    }

    const data = await response.json();
    const replyContent = data.choices?.[0]?.message?.content;

    if (!replyContent) {
      return getLocalFallbackResponse(userMessage, willUnlock, language);
    }

    const isRoadmap = willUnlock && isBusinessQuery(userMessage);

    return {
      reply: replyContent,
      unlockedNow: hasCode,
      isRoadmap
    };
  } catch (err) {
    console.error('Groq API request failed, falling back to local engine:', err);
    return getLocalFallbackResponse(userMessage, willUnlock, language);
  }
};
