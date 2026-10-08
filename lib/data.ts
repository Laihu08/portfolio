// Single source of truth for all on-page content. Every name, date, company, skill
// and achievement here is taken verbatim from the résumé — nothing invented.
// Components only read from this file.

export const PROFILE = {
  name: 'Rahul Selvaraj',
  role: 'Senior AI Software Engineer',
  roleSub: 'Agentic AI, Full-Stack AI Systems & Cloud',
  location: 'Taiwan',
  email: 'srahul.pk98@gmail.com',
  github: 'https://github.com/Laihu08',
  linkedin: 'https://www.linkedin.com/in/rahul-selvaraj',
  pitch: 'I build production AI for industry and medicine.',
  summary:
    'AI software engineer with 5+ years of experience building and deploying production AI systems across industrial and medical applications. Strong hands-on background in Python, agentic AI, multi-agent orchestration, RAG, REST APIs, GCP/Vertex AI, CI/CD, containerized deployment, model evaluation and monitoring. Experienced in translating business and engineering needs into reliable AI solutions and reusable software patterns across cross-functional teams.',
}

export const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'skills', label: 'Technology' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export type SkillFamily =
  | 'AI & Agents'
  | 'Frameworks'
  | 'Programming'
  | 'Cloud & Delivery'
  | 'Tools'
  | 'Engineering Practice'

export interface Skill {
  symbol: string
  name: string
  family: SkillFamily
}

// 2-letter symbols, "periodic table" style — kept short and distinct per family.
export const SKILL_GROUPS: { family: SkillFamily; skills: Skill[] }[] = [
  {
    family: 'AI & Agents',
    skills: [
      { symbol: 'Lm', name: 'LLMs', family: 'AI & Agents' },
      { symbol: 'Vm', name: 'VLMs', family: 'AI & Agents' },
      { symbol: 'Rg', name: 'RAG', family: 'AI & Agents' },
      { symbol: 'Ag', name: 'Agentic AI', family: 'AI & Agents' },
      { symbol: 'Mo', name: 'Multi-Agent Orchestration', family: 'AI & Agents' },
      { symbol: 'Pe', name: 'Prompt Engineering', family: 'AI & Agents' },
      { symbol: 'Vd', name: 'Vector Databases', family: 'AI & Agents' },
      { symbol: 'Em', name: 'Model Evaluation & Monitoring', family: 'AI & Agents' },
    ],
  },
  {
    family: 'Frameworks',
    skills: [
      { symbol: 'Pt', name: 'PyTorch', family: 'Frameworks' },
      { symbol: 'Tf', name: 'TensorFlow', family: 'Frameworks' },
      { symbol: 'Ke', name: 'Keras', family: 'Frameworks' },
      { symbol: 'Hf', name: 'Hugging Face Transformers', family: 'Frameworks' },
      { symbol: 'Lc', name: 'LangChain', family: 'Frameworks' },
      { symbol: 'Cv', name: 'OpenCV', family: 'Frameworks' },
    ],
  },
  {
    family: 'Programming',
    skills: [
      { symbol: 'Py', name: 'Python', family: 'Programming' },
      { symbol: 'Cp', name: 'C++', family: 'Programming' },
    ],
  },
  {
    family: 'Cloud & Delivery',
    skills: [
      { symbol: 'Gc', name: 'Google Cloud Platform', family: 'Cloud & Delivery' },
      { symbol: 'Va', name: 'Vertex AI', family: 'Cloud & Delivery' },
      { symbol: 'Ci', name: 'CI/CD', family: 'Cloud & Delivery' },
      { symbol: 'Dk', name: 'Docker', family: 'Cloud & Delivery' },
      { symbol: 'Ra', name: 'REST APIs', family: 'Cloud & Delivery' },
      { symbol: 'Fa', name: 'FastAPI', family: 'Cloud & Delivery' },
    ],
  },
  {
    family: 'Tools',
    skills: [
      { symbol: 'Gi', name: 'Git', family: 'Tools' },
      { symbol: 'Gl', name: 'GitLab', family: 'Tools' },
      { symbol: 'Vc', name: 'VS Code', family: 'Tools' },
      { symbol: 'Jp', name: 'Jupyter', family: 'Tools' },
    ],
  },
  {
    family: 'Engineering Practice',
    skills: [
      { symbol: 'At', name: 'Automated Testing', family: 'Engineering Practice' },
      { symbol: 'Pd', name: 'Production Debugging', family: 'Engineering Practice' },
      { symbol: 'Dc', name: 'Documentation', family: 'Engineering Practice' },
    ],
  },

]

export interface ExperienceEntry {
  title: string
  company: string
  location: string
  start: string
  end: string
  bullets: string[]
  url?: string
  logo?: string
  education?: boolean
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'AI Engineer II',
    company: 'BizLink',
    url: 'https://www.bizlinktech.com/',
    logo: '/logos/bizlink.svg',
    location: 'Taiwan',
    start: 'Aug 2025',
    end: 'Present',
    bullets: [
      'Built a multi-agent orchestration system for internal automation, from architecture to production on GCP.',
      'Integrated LLM, VLM and multimodal agents into real-time industrial workflows.',
      'Shipped scalable AI services on Vertex AI, connected through REST APIs.',
      'Brought open-source agent frameworks into enterprise infrastructure and defined reusable patterns.',
      'Added evaluation, monitoring and guardrails for reliable, responsible AI.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Karma Medical Products',
    url: 'https://www.karmamedical.com/',
    logo: '/logos/karma.png',
    location: 'Taiwan',
    start: 'Oct 2021',
    end: 'Jul 2025',
    bullets: [
      'Built AI posture-detection and pressure-alert systems from embedded sensor data.',
      'Developed cross-platform apps integrated with custom medical hardware.',
      'Automated actuator and sensor testing: manual QA time down 90%, remote testability up 75%.',
      'Diagnosed issues across software, hardware and system layers.',
      'Worked with European teams on CE/FDA compliance.',
    ],
  },
  {
    title: 'Open-Source Contributor & AI Researcher',
    company: 'Remote',
    location: 'Remote',
    start: 'Jan 2023',
    end: 'Present',
    bullets: [
      'Contributed to open-source LLM and RAG frameworks for agentic, real-time AI.',
      'Building a real-time audio translator for macOS and Windows with Whisper.cpp.',
    ],
  },
]

export interface ProjectEntry {
  title: string
  tag: string
  tags: string[]
  bullets: string[]
  url?: string
  flow: string[] // pipeline shown on the card cover, left to right
}

export const PROJECTS: ProjectEntry[] = [
  {
    title: 'LLM Multi-Agent Planning System',
    tag: 'Personal / Research Project',
    tags: ['OpenAI GPT', 'Claude', 'LLaMA 2', 'Mistral', 'RAG', 'Vector Databases', 'Docker'],
    flow: ['Task', 'Orchestrator', 'LLM agents', 'RAG + vector DB', 'Plan'],
    bullets: [
      'Agentic orchestration platform using GPT, Claude, LLaMA 2 and Mistral, with RAG and vector databases for long-context planning.',
      'Dockerised for reproducible, scalable deployment.',
    ],
  },
  {
    title: 'Self-Supervised Depth Completion for 3D Object Detection',
    tag: 'M.Sc. Thesis',
    tags: ['Python', 'Self-supervised learning', 'LiDAR', 'RGB', 'KITTI'],
    url: 'https://github.com/Laihu08/DepthCompletion-3DObjectDetection',
    flow: ['LiDAR + RGB', 'Depth completion', 'Dense depth', '3D detection'],
    bullets: [
      'Self-supervised framework fusing sparse LiDAR and RGB into dense depth maps for autonomous driving.',
      'Improved RMSE, MAE and AP on the KITTI benchmark.',
    ],
  },
  {
    title: 'LLM RAG Chatbot',
    tag: 'Personal Project',
    tags: ['Python', 'RAG', 'ChromaDB', 'Ollama', 'Mistral 7B', 'OpenAI', 'Streamlit'],
    url: 'https://github.com/Laihu08/llm-rag-chatbot',
    flow: ['Query', 'Embedding', 'ChromaDB', 'Mistral / GPT', 'Streamlit'],
    bullets: [
      'Chatbot that answers from a knowledge base using RAG on ChromaDB.',
      'Runs fully local on Mistral 7B via Ollama, or on OpenAI GPT, with a Streamlit interface.',
    ],
  },
  {
    title: 'Hybrid AI Chatbot (CAG + RAG)',
    tag: 'Personal Project',
    tags: ['Python', 'CAG', 'RAG'],
    url: 'https://github.com/Laihu08/Hybrid-AI-Chatbot-CAG-RAG-',
    flow: ['Query', 'Cache hit? (CAG)', 'Retrieve (RAG)', 'Answer'],
    bullets: [
      'Combines cache-augmented generation for fast answers with retrieval-augmented generation for fresh data.',
      'Balances response speed against knowledge freshness.',
    ],
  },
]

// Education sits in the same timeline as work, after it (no scores shown).
export const TIMELINE: ExperienceEntry[] = [
  ...EXPERIENCE,
  {
    title: 'M.Sc. Electrical Engineering (ML / AI)',
    company: 'National Chung Cheng University',
    url: 'https://www.ccu.edu.tw/',
    logo: '/logos/nccu.png',
    location: 'Taiwan',
    start: 'Sep 2019',
    end: 'Sep 2021',
    education: true,
    bullets: ['Thesis: self-supervised depth completion for 3D object detection.'],
  },
  {
    title: 'B.Tech Electronics and Instrumentation Engineering',
    company: 'SRM Institute of Science and Technology',
    url: 'https://www.srmist.edu.in/',
    logo: '/logos/srm.png',
    location: 'India',
    start: 'Jul 2015',
    end: 'May 2019',
    education: true,
    bullets: [],
  },
]

export interface CertificationEntry {
  title: string
  issuer: string
  date: string
  logo: string // image path under /public, or 'microsoft' | 'googlecloud' for inline marks
}

export const CERTIFICATIONS: CertificationEntry[] = [
  { title: 'AI and Career Empowerment', issuer: 'Robert H. Smith School of Business', date: 'Mar 2026', logo: '/logos/umd-smith.png' },
  { title: 'Understanding Agentic AI', issuer: 'Digital Workforce Services', date: 'May 2025', logo: '/logos/digital-workforce.png' },
  { title: 'Develop a RAG-based Solution with Azure AI Foundry', issuer: 'Microsoft', date: 'Apr 2025', logo: 'microsoft' },
  { title: 'Evaluate Generative AI Performance in Azure AI Foundry', issuer: 'Microsoft', date: 'Apr 2025', logo: 'microsoft' },
  { title: 'LangChain for LLM Application Development', issuer: 'DeepLearning.AI', date: 'Mar 2025', logo: '/logos/deeplearning-ai.png' },
  { title: 'Prompt Design in Vertex AI', issuer: 'Google Cloud', date: 'Mar 2025', logo: 'googlecloud' },
]

// Shown under the name on the opening screen.
export const HERO_STATS = [
  { value: 5, suffix: '+', label: 'Years of experience' },
  { value: 2, suffix: '', label: 'International patents', icon: 'patent' as const },
]


export interface AchievementEntry {
  title: string
  detail: string
  logo: string // image path under /public, or 'patent' for the inline icon
}

export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    title: 'Co-inventor of two international patents',
    detail: 'Smart assistive technology · USA, Europe, Taiwan, India',
    logo: 'patent',
  },
  {
    title: '2025 Taiwan Excellence Award',
    detail: 'Contributed to sensor-driven innovations',
    logo: '/logos/taiwan-excellence.svg',
  },
]

