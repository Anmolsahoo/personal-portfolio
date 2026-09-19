export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  filterCategories: string[];
  description: string;
  tags: string[];
  gradient: string;
  liveUrl: string;
  featured?: boolean;
  link?: string;
  github?: string;
  metrics?: string;
  accentColor?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  popular?: boolean;
  features: string[];
}

export interface Milestone {
  year: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export const portfolioData = {
  brand: {
    name: "Anmol Sahoo",
    logoText: "ANMOL SAHOO",
    tagline: "Full-Stack Developer & Software Engineer",
    developerName: "Anmol Sahoo",
    role: "Full-Stack Developer & Software Engineer",
    statusBadge: "Available for Opportunities • 2026",
    heroHeadline: "Building reliable web systems, business software & scalable backends.",
    heroSubtitle: "Full-Stack Developer with experience building production web applications, internal business software (CRMs, ERPs, Dashboards), and AI-integrated workflows using Python, Django, and React.",
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Explore Projects",
  },
  
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  about: {
    heading: "About Me",
    mainIntro: "I'm a Full-Stack Developer focused on building practical web applications, business software, AI-powered tools and scalable backend systems.",
    aboutText: [
      "I work across the development lifecycle — from understanding requirements and designing solutions to backend development, database integration, API development, frontend implementation and deployment.",
      "My professional experience includes building real-world business applications, CRM and lead-management systems, inventory platforms, dashboards, automation workflows and AI-powered solutions."
    ],
    highlight: {
      tag: "From Idea → Development → Deployment",
      text: "I help turn business requirements into practical, scalable digital products."
    },
    experience: [
      {
        company: "MSC HireTech",
        role: "Python Full-Stack Developer",
        description: "Worked on full-stack web development and business-oriented applications using Python, Django, REST APIs, JavaScript and database technologies.",
        tags: ["Python", "Django", "REST API", "JavaScript", "MySQL"]
      },
      {
        company: "Oditech",
        role: "SDE / Software Developer",
        description: "Working on modern software products and business applications, contributing to frontend, backend, database, API integration, automation and production-oriented development.",
        tags: ["React", "Python", "Django", "REST API", "JavaScript", "MySQL", "PostgreSQL"]
      }
    ],
    whatIBuild: [
      "Business Websites",
      "Web Applications",
      "CRM & Lead Management",
      "Inventory Management",
      "SaaS Platforms",
      "AI Chatbots",
      "RAG Applications",
      "Business Automation",
      "Data Dashboards",
      "API Integrations"
    ]
  },

  pricingPlans: [
    {
      id: "starter",
      name: "Starter Website",
      subtitle: "Professional web presence for businesses and creators requiring speed and responsiveness.",
      price: "₹10K+",
      features: [
        "Business / Portfolio Website",
        "Fully responsive layout",
        "Contact & enquiry forms",
        "WhatsApp / social integration",
        "Basic admin panel",
        "Production deployment support",
      ]
    },
    {
      id: "business",
      name: "Custom Web Application",
      subtitle: "Custom operational software designed for daily business workflows and data management.",
      price: "₹25K+",
      popular: true,
      features: [
        "Custom Web Application (React + Python/Django)",
        "CRM & Lead Tracking",
        "Inventory & Asset Management",
        "Role-based Admin Dashboard",
        "REST API integrations",
        "Automated Excel / PDF reports",
        "Notification & webhook integration",
        "Deployment, testing & support",
      ]
    },
    {
      id: "ai-scale",
      name: "Full-Stack & AI Systems",
      subtitle: "For businesses looking for advanced automation, intelligent chatbots, and custom SaaS platforms.",
      price: "₹50K+",
      features: [
        "Full-Stack SaaS Platform Development",
        "AI Chatbot & Knowledge Assistant (RAG)",
        "Workflow Automation & Data Pipelines",
        "Advanced Multi-tenant Database Schema",
        "Custom Third-party API Integrations",
        "Cloud Deployment & Monitoring",
        "Post-launch technical support",
      ]
    }
  ],

  projects: [
    {
      id: "clinic-management-system",
      title: "Clinic & Patient Care Management",
      category: "Healthcare Software",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "A multi-specialty OPD clinic operating system featuring live token queue triage, patient medical records, doctor cabin schedules, and instant billing generation.",
      tags: ["React", "Healthcare", "Patient Queue", "Billing", "Dashboard"],
      gradient: "from-teal-500/30 via-emerald-500/15 to-transparent",
      accentColor: "#10b981",
      liveUrl: "/demos/clinic",
      github: "https://github.com/Anmolsahoo",
      featured: true
    },
    {
      id: "school-attendance-management",
      title: "School Attendance & Student System",
      category: "EdTech Software",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "An academic management platform featuring interactive daily class attendance registers with real-time percentage recalculation, student directories, and fee status tracking.",
      tags: ["React", "Attendance Sheet", "Student Records", "Fee Tracker", "Analytics"],
      gradient: "from-blue-500/30 via-indigo-500/15 to-transparent",
      accentColor: "#3b82f6",
      liveUrl: "/demos/school",
      github: "https://github.com/Anmolsahoo",
      featured: true
    },
    {
      id: "gym-attendance-management",
      title: "Gym Attendance & Membership System",
      category: "Fitness & Club Management",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "A high-performance fitness center management suite with RFID turnstile check-in simulator, live floor occupancy tracker, subscription tier manager, and renewal workflows.",
      tags: ["React", "Check-In Scanner", "Membership CRM", "Billing", "Real-Time"],
      gradient: "from-amber-500/30 via-orange-500/15 to-transparent",
      accentColor: "#ff5500",
      liveUrl: "/demos/gym",
      github: "https://github.com/Anmolsahoo",
      featured: true
    },
    {
      id: "library-management-system-1",
      title: "Full-Stack Library & Records Portal",
      category: "Business Management Software",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "A full library management platform for managing student accounts, catalogue indexing, issue/return transactions, automated fine calculations, reports, and analytics.",
      tags: ["React", "JavaScript", "Database", "Dashboard", "REST API"],
      gradient: "from-emerald-500/30 via-teal-500/15 to-transparent",
      accentColor: "#10b981",
      liveUrl: "https://library-1pu491ier-anmolsahoos-projects.vercel.app/",
      github: "https://github.com/Anmolsahoo",
      featured: true
    },
    {
      id: "college-admin-management",
      title: "College Admin & Academic Operations",
      category: "Full-Stack Application",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "A production-style college administration application demonstrating student lifecycle management, academic departments, recordkeeping, and administrative workflows.",
      tags: ["Full-Stack", "Python", "Django", "Database", "REST API"],
      gradient: "from-violet-500/30 via-indigo-500/15 to-transparent",
      accentColor: "#8b5cf6",
      liveUrl: "https://library-2-molm.onrender.com/",
      github: "https://github.com/Anmolsahoo",
      featured: true
    },
    {
      id: "luxury-restaurant",
      title: "Luxury Restaurant Experience",
      category: "Business Website",
      filterCategories: ["Websites"],
      description: "A responsive restaurant website featuring interactive menu exploration, chef stories, reservations, customer testimonials, and contact forms.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive UI"],
      gradient: "from-amber-500/30 via-orange-500/15 to-transparent",
      accentColor: "#ff5500",
      liveUrl: "https://6a3cb2d220e0516f0142ec7d--chipper-nasturtium-be85c1.netlify.app/",
      github: "https://github.com/Anmolsahoo",
      featured: true
    },
    {
      id: "premium-camera-store",
      title: "Camera & Optics E-Commerce",
      category: "E-Commerce Website",
      filterCategories: ["E-Commerce", "Websites"],
      description: "A sleek e-commerce interface showcasing cameras, lenses, and gear with category filters, product details, brand spotlights, and a responsive checkout preview.",
      tags: ["React", "JavaScript", "Responsive UI", "E-Commerce UI"],
      gradient: "from-blue-500/30 via-indigo-500/15 to-transparent",
      accentColor: "#3b82f6",
      liveUrl: "https://6a3d03477ce79400da070805--glittery-souffle-62965a.netlify.app/",
      github: "https://github.com/Anmolsahoo",
      featured: true
    }
  ],

  contact: {
    email: "bitunanmolsahoo@gmail.com",
    location: "Bhubaneswar, Odisha, India / Remote Worldwide",
    availability: "Available for full-time software engineering roles, technical consulting & freelance development",
    responseTime: "Usually responds within 12 hours",
    faqs: [
      {
        q: "What types of projects do you build?",
        a: "I build end-to-end full-stack web applications, business management software (CRMs, inventory systems, operational portals), REST APIs with Python/Django/FastAPI, modern React frontends, and AI-assisted automation tools."
      },
      {
        q: "What is your typical turnaround time?",
        a: "For prototypes and MVPs, delivery is typically 1–2 weeks. For larger web platforms, milestones are structured in clear weekly sprints with continuous staging access."
      },
      {
        q: "How do you handle communication and collaboration?",
        a: "I communicate transparently via GitHub, email, Slack, Discord, and scheduled video calls, sharing staging deployments so you can test features as they are built."
      }
    ]
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com/Anmolsahoo", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
  ]
};
