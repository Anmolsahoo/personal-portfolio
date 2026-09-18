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
    tagline: "Full-Stack AI Engineer & Creative Technologist",
    developerName: "Anmol Sahoo",
    role: "Full-Stack AI Engineer & Creative Developer",
    statusBadge: "Whats New: 2026 Portfolio v2.0",
    heroHeadline: "Intelligent Solutions Powered by AI.",
    heroSubtitle: "Gain clarity and harness the power of modern engineering with Anmol Sahoo. Crafting intuitive dashboards, scalable distributed backends, and high-impact AI architectures.",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Explore Projects",
  },
  
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact Us", href: "/contact" },
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

  stats: {
    totalUsers: "72,350",
    totalUsersGrowth: "+25.4%",
    revenue: "29.4%",
    avgClickRate: "56.8%",
    purchases: "92,313",
    monthlyExpenses: [
      { month: "Jan", value: 35 },
      { month: "Feb", value: 28 },
      { month: "Mar", value: 55 },
      { month: "Apr", value: 40 },
      { month: "May", value: 85, highlighted: true },
      { month: "Jun", value: 45 },
      { month: "Jul", value: 65 },
      { month: "Aug", value: 30 },
      { month: "Sep", value: 75, highlighted: true },
      { month: "Oct", value: 50 },
      { month: "Nov", value: 60 },
      { month: "Dec", value: 90, highlighted: true },
    ],
    importers: [
      { name: "Huse", users: "12 users", status: "Active" },
      { name: "Pento", users: "3 users", status: "Active" },
      { name: "Border", users: "Users", status: "Connected" },
    ]
  },

  partners: [
    { name: "Trace", icon: "Boxes" },
    { name: "Volume", icon: "Disc" },
    { name: "Clues", icon: "Compass" },
    { name: "Rise", icon: "TrendingUp" },
    { name: "Cloud", icon: "CloudLightning" },
    { name: "Cyber", icon: "ShieldCheck" },
    { name: "Nexus", icon: "Cpu" },
    { name: "Vertex", icon: "Layers" },
  ],

  bentoFeatures: {
    balance: {
      title: "Balance",
      description: "Real-time balance monitoring and active project liquidity with automated budget alerts.",
      activePrototype: "Create a working prototype",
      status: "30-20 Tracking every micro-design",
    },
    users: {
      title: "Users",
      description: "Scale from prototype to millions without rewriting infrastructure or breaking state.",
      count: "72,350",
      growth: "+9.8%",
    },
    aiSessions: {
      title: "AI Sessions",
      description: "Smart autonomous agents orchestrating tasks, automated tests, and code generation.",
      items: [
        { label: "Personal", active: true },
        { label: "Issues", active: false },
        { label: "Active", active: true },
        { label: "Backlog", active: false },
        { label: "Projects", active: true },
      ]
    },
    spotlight: {
      title: "Create",
      description: "Harness generative AI to build bespoke components, API clients, and responsive viewports instantly.",
      badge: "AI Powered v2.4",
    }
  },

  detailedFeatures: [
    {
      badge: "SaaS Management",
      title: "Top Management, to help you see the bigger picture",
      description: "Eliminate fragmentation across your product roadmap. Seamlessly orchestrate code quality, design fidelity, and automated pipelines with granular insight at every stage.",
      linkText: "See Doc",
      linkHref: "/projects",
      points: [
        "Customizable layouts for efficient coding",
        "Font preferences to match your style",
        "Create multiple profiles for versatility",
      ],
      reverse: false,
    },
    {
      badge: "High Performance",
      title: "Helping you with fast-reading charts on the go",
      description: "Live visual telemetry built directly into your workflow. Monitor microsecond latency, distributed traces, and conversion metrics on desktop and mobile without performance penalties.",
      linkText: "See Doc",
      linkHref: "/projects",
      points: [
        "Interactive real-time SVG charting engine",
        "Offline synchronization and optimistic UI",
        "Granular role-based privacy and team permissions",
      ],
      reverse: true,
    }
  ],

  pricingPlans: [
    {
      id: "starter",
      name: "Starter",
      subtitle: "Perfect for small businesses that need a professional digital presence.",
      price: "₹10K+",
      features: [
        "Business / Portfolio Website",
        "Responsive design",
        "Contact & enquiry forms",
        "WhatsApp integration",
        "Basic admin functionality",
        "Deployment support",
      ]
    },
    {
      id: "business",
      name: "Business",
      subtitle: "For businesses that need custom software to manage their daily operations.",
      price: "₹25K+",
      popular: true,
      features: [
        "Custom Web Application",
        "CRM / Lead Management",
        "Inventory Management",
        "Admin Dashboard",
        "REST API integration",
        "Excel / PDF reports",
        "WhatsApp / notification integration",
        "Deployment & basic support",
      ]
    },
    {
      id: "ai-scale",
      name: "AI & Scale",
      subtitle: "For businesses looking for advanced automation, SaaS products and AI-powered solutions.",
      price: "₹50K+",
      features: [
        "SaaS Platform Development",
        "AI Chatbot",
        "RAG / AI Knowledge Assistant",
        "Business Automation",
        "Advanced CRM / workflows",
        "AI & API integrations",
        "Cloud deployment",
        "Post-launch support",
      ]
    }
  ],

  projects: [
    {
      id: "luxury-restaurant",
      title: "Luxury Restaurant Website",
      category: "Business Website",
      filterCategories: ["Websites"],
      description: "A premium restaurant website featuring menu presentation, chef profiles, gallery, reservations, customer reviews and contact sections.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive UI"],
      gradient: "from-amber-500/30 via-orange-500/15 to-transparent",
      accentColor: "#ff5500",
      liveUrl: "https://6a3cb2d220e0516f0142ec7d--chipper-nasturtium-be85c1.netlify.app/",
      featured: true
    },
    {
      id: "premium-camera-store",
      title: "Premium Camera Store",
      category: "E-Commerce Website",
      filterCategories: ["E-Commerce", "Websites"],
      description: "A modern camera e-commerce experience with product categories, product listings, featured products, brands, reviews and promotional sections.",
      tags: ["React", "JavaScript", "Responsive UI", "E-Commerce UI"],
      gradient: "from-blue-500/30 via-indigo-500/15 to-transparent",
      accentColor: "#3b82f6",
      liveUrl: "https://6a3d03477ce79400da070805--glittery-souffle-62965a.netlify.app/",
      featured: true
    },
    {
      id: "library-management-system-1",
      title: "Library Management System",
      category: "Business Management Software",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "A full library management system for managing students, books, inventory, issue/return transactions, fines, reports and analytics.",
      tags: ["React", "JavaScript", "Database", "Dashboard", "REST API"],
      gradient: "from-emerald-500/30 via-teal-500/15 to-transparent",
      accentColor: "#10b981",
      liveUrl: "https://6a45278161a99419250c54e9--dazzling-caramel-9d2218.netlify.app/#dashboard",
      featured: true
    },
    {
      id: "library-management-platform",
      title: "Library Management Platform",
      category: "Management System",
      filterCategories: ["Management Systems", "Dashboards", "Business Software"],
      description: "A modern library management application focused on student registration, book inventory, issue and return workflows, fine management, reports and analytics.",
      tags: ["React", "Database", "Dashboard", "CRUD", "Analytics"],
      gradient: "from-cyan-500/30 via-blue-500/15 to-transparent",
      accentColor: "#06b6d4",
      liveUrl: "https://library-30k3eorcl-anmolsahoos-projects.vercel.app/",
      featured: true
    },
    {
      id: "library-management-advanced",
      title: "Library Management — Advanced Version",
      category: "Business Management Software",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "An advanced library management interface with administration, student records, book catalogue, transactions, reports, analytics and system settings.",
      tags: ["React", "Database", "Admin Dashboard", "Analytics"],
      gradient: "from-rose-500/30 via-orange-500/15 to-transparent",
      accentColor: "#f43f5e",
      liveUrl: "https://library-1pu491ier-anmolsahoos-projects.vercel.app/",
      featured: true
    },
    {
      id: "college-admin-management",
      title: "College Admin Management",
      category: "Full-Stack Application",
      filterCategories: ["Business Software", "Management Systems", "Dashboards"],
      description: "A production-style college admin management application demonstrating student management, academic operations, records and administrative workflows.",
      tags: ["Full-Stack", "Database", "REST API", "Admin Dashboard"],
      gradient: "from-violet-500/30 via-indigo-500/15 to-transparent",
      accentColor: "#8b5cf6",
      liveUrl: "https://library-2-molm.onrender.com/",
      featured: true
    },
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
      featured: true
    }
  ],

  contact: {
    email: "anmol.sahoo@example.com",
    location: "Bhubaneswar / Remote Worldwide",
    availability: "Available for freelance projects, technical consulting & full-time opportunities",
    responseTime: "Usually responds within 12 hours",
    faqs: [
      {
        q: "What types of projects do you take on?",
        a: "I specialize in end-to-end full stack web applications, AI-integrated workflows, high-performance design systems, and cloud infrastructure."
      },
      {
        q: "What is your typical turnaround time?",
        a: "For prototypes and MVPs, delivery typically spans 1–3 weeks. Larger enterprise applications and multi-tenant architectures are planned in agile 2-week sprints."
      },
      {
        q: "How do you handle communication and updates?",
        a: "I work asynchronously and synchronously via Slack, Discord, GitHub, and scheduled video syncs, providing staging links and transparent milestone demos."
      }
    ]
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
  ]
};
