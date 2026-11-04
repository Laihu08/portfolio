import ossLive from './oss-live.json'
import extraContributions from './contributions-extra.json'
// Single source of truth for all on-page content. Every name, date, company, skill
// and achievement here is taken verbatim from the résumé — nothing invented.
// Components only read from this file.

export const PROFILE = {
  name: 'Rahul Selvaraj',
  role: 'Senior AI Engineer',
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
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Technology' },
  { id: 'certifications', label: 'Certifications' },
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
  bonus?: boolean // dateless extra stop, shown as "Bonus"
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
      'Containerised AI workloads with Docker and Kubernetes, deployed through MLOps CI/CD pipelines.',
      'Applied GPU infrastructure practices for multi-GPU scaling, workload scheduling and performance tuning.',
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
    title: 'Open Source Contributor',
    company: 'Remote',
    location: 'Remote',
    start: '',
    end: '',
    bonus: true,
    bullets: [
      'Contributed to open-source LLM and RAG frameworks for agentic, real-time AI.',
      'Building a real-time audio translator for macOS and Windows with Whisper.cpp.',
    ],
  },
]

export interface StoryStep {
  heading: string
  text: string
}

export interface ContributionEntry {
  repo: string
  status?: 'open' | 'merged' | 'closed' // live, from oss-live.json
  repoUrl: string
  stars: number
  logo?: string
  logoWordmark?: boolean
  banner: string
  bannerAlt: string
  pr: number
  label: string // small caption above the cover diagram
  diagramTitle: string
  flow: [string, string, string] // use \n for a line break
  footNote: string
  title: string
  summary: string
  skills: string[]
  story: {
    title: string
    lead: string
    steps: StoryStep[]
    links: { label: string; url: string }[]
  }
}

const GH = 'https://raw.githubusercontent.com'

// Hand-written stories. New ones are added to contributions-extra.json by the OSS team;
// stars and status are refreshed in oss-live.json (OSS/tools/portfolio/update.py).
const BASE_CONTRIBUTIONS: ContributionEntry[] = [
  {
    repo: 'OpenSandbox',
    repoUrl: 'https://github.com/opensandbox-group/OpenSandbox',
    stars: 16436,
    logo: `${GH}/opensandbox-group/OpenSandbox/main/docs/public/images/logo.svg`,
    banner: `${GH}/opensandbox-group/OpenSandbox/main/docs/public/images/architecture-overview.svg`,
    bannerAlt: "OpenSandbox's official architecture overview",
    pr: 2559,
    label: 'Find the right sandbox by its details',
    diagramTitle: 'Search sandboxes by team or environment',
    flow: ['Find a\nsandbox', 'Search\nby details', 'Matching\nsandboxes'],
    footNote: 'Search only what matches',
    title: 'Find sandboxes by team or environment',
    summary:
      'I updated OpenSandbox to search by details like team or environment first, so it can return matching sandboxes without loading unrelated ones.',
    skills: ['Python', 'Kubernetes', 'Label selectors', 'Unit & integration testing'],
    story: {
      title: 'Find sandboxes using their details',
      lead: 'Previously, OpenSandbox loaded every sandbox before checking which ones matched the requested details.',
      steps: [
        {
          heading: 'The problem',
          text: 'When someone searched by details such as team or environment, the system first loaded every sandbox and only then looked for matches.',
        },
        {
          heading: 'My fix',
          text: 'I changed the search so it can narrow down the sandboxes using those details before loading the results. A second check remains to keep the behavior consistent when a detail cannot be used in the initial search.',
        },
        {
          heading: 'The outcome',
          text: 'The change was tested with 255 passing unit and integration tests. It avoids loading sandboxes that can already be excluded by the search details; no specific speed improvement was measured.',
        },
      ],
      links: [
        { label: 'Read PR #2559', url: 'https://github.com/opensandbox-group/OpenSandbox/pull/2559' },
        { label: 'Related issue #2502', url: 'https://github.com/opensandbox-group/OpenSandbox/issues/2502' },
      ],
    },
  },
  {
    repo: 'Headroom',
    repoUrl: 'https://github.com/headroomlabs-ai/headroom',
    stars: 78766,
    banner: `${GH}/headroomlabs-ai/headroom/main/.github/assets/hero.svg`,
    bannerAlt: 'Headroom’s official repository banner showing context compression and preserved content',
    pr: 4626,
    label: 'Protect the original instructions',
    diagramTitle: 'Keep valid instructions intact',
    flow: ['Read the\nmarkers', 'Recognize\nvalid content', 'Keep the\ninstruction'],
    footNote: 'Protect useful context',
    title: 'Stopped valid instructions being mistaken for broken ones',
    summary:
      'I fixed a bug that could discard valid text just because it began and ended with different pieces of compression syntax.',
    skills: ['Python', 'String handling', 'pytest', 'Ruff & mypy'],
    story: {
      title: 'Keep valid instructions from being discarded',
      lead: 'Headroom shortens AI instructions before sending them to a model. This fix prevents valid original text from being mistaken for compression instructions.',
      steps: [
        {
          heading: 'The problem',
          text: 'The system could mistake a real instruction for an internal marker if that instruction happened to start and end with different marker-like pieces of text.',
        },
        {
          heading: 'My fix',
          text: 'I narrowed the check so it rejects only a standalone marker, not real text that happens to contain marker-like pieces at its beginning and end.',
        },
      ],
      links: [
        { label: 'Read PR #4626', url: 'https://github.com/headroomlabs-ai/headroom/pull/4626' },
        { label: 'Headroom repository', url: 'https://github.com/headroomlabs-ai/headroom' },
      ],
    },
  },
  {
    repo: 'Ouroboros',
    repoUrl: 'https://github.com/Q00/ouroboros',
    stars: 6311,
    logo: `${GH}/Q00/ouroboros/main/docs/images/ouroboros.png`,
    banner: `${GH}/Q00/ouroboros/main/docs/images/social-preview.png`,
    bannerAlt: "Ouroboros's official social preview artwork",
    pr: 2818,
    label: 'Get AI answers in the expected format',
    diagramTitle: 'Help the model follow answer instructions',
    flow: ['Answer\ninstructions', 'Compatible\nrequest', 'Structured\nanswer'],
    footNote: 'Make the format clear to the model',
    title: 'Help AI return answers in the requested format',
    summary:
      'I fixed how Ouroboros prepares structured-answer requests, so AI providers can understand the requested JSON format instead of rejecting it.',
    skills: ['Python', 'LiteLLM', 'JSON Schema', 'pytest'],
    story: {
      title: 'Help AI return answers in the expected format',
      lead: 'Some AI providers need JSON-format instructions wrapped in a specific way before they can return structured answers.',
      steps: [
        {
          heading: 'The problem',
          text: 'Ouroboros passed some JSON answer formats to LiteLLM without the name and schema fields that certain providers expect, causing structured-answer requests to fail.',
        },
        {
          heading: 'My fix',
          text: 'I added a small conversion that wraps a bare JSON schema in the expected format, while leaving already-wrapped formats and other response types unchanged.',
        },
        {
          heading: 'The outcome',
          text: 'Added tests for bare and already-wrapped schemas, preserving caller input and existing JSON-object behavior. The PR reports 1,680 provider tests passing, one skipped, and one environment-related failure also present on the main branch.',
        },
      ],
      links: [{ label: 'Read PR #2818', url: 'https://github.com/Q00/ouroboros/pull/2818' }],
    },
  },
  {
    repo: 'Paperclip',
    repoUrl: 'https://github.com/paperclipai/paperclip',
    stars: 110860,
    logo: `${GH}/paperclipai/paperclip/master/docs/images/logo-light.svg`,
    logoWordmark: true,
    banner: `${GH}/paperclipai/paperclip/master/doc/assets/banner.jpg`,
    bannerAlt: "Paperclip's official repository banner",
    pr: 18589,
    label: 'Connect more tools with the sign-in they support',
    diagramTitle: 'A service can connect without extra sign-in grants',
    flow: ['Choose a\nservice', 'Approve\nsign-in', 'Connect\nsuccessfully'],
    footNote: 'Refresh tokens are optional',
    title: 'Connect services that use simpler sign-in',
    summary:
      'I updated Paperclip to accept a valid sign-in when a service provides an authorization code but does not offer an optional refresh token.',
    skills: ['TypeScript', 'OAuth', 'Integration testing', 'Vitest'],
    story: {
      title: 'Connect services with simpler sign-in',
      lead: 'Some services provide the sign-in code an app needs, but do not provide an optional token for refreshing the connection later.',
      steps: [
        {
          heading: 'The problem',
          text: 'Paperclip rejected certain OAuth registrations when the service returned an authorization code but did not include a refresh-token grant.',
        },
        {
          heading: 'My fix',
          text: 'I updated registration validation to require the authorization-code grant while treating the refresh-token grant as optional. Existing response checks and safety boundaries remain in place.',
        },
        {
          heading: 'The outcome',
          text: 'The PR reports 504 passing tests across two integration test files, a successful TypeScript check, and passing module-boundary checks.',
        },
      ],
      links: [{ label: 'Read PR #18589', url: 'https://github.com/paperclipai/paperclip/pull/18589' }],
    },
  },
  {
    repo: 'Paperclip',
    repoUrl: 'https://github.com/paperclipai/paperclip',
    stars: 110860,
    logo: `${GH}/paperclipai/paperclip/master/docs/images/logo-light.svg`,
    logoWordmark: true,
    banner: `${GH}/paperclipai/paperclip/master/doc/assets/banner.jpg`,
    bannerAlt: "Paperclip's official repository banner",
    pr: 18580,
    label: 'Let trusted webhook requests reach the right routine',
    diagramTitle: 'Check the right signature on a webhook',
    flow: ['Webhook\narrives', 'Check secure\nsignature', 'Start the\nroutine'],
    footNote: 'Prefer the SHA-256 signature',
    title: 'Make trusted webhook triggers work reliably',
    summary:
      'I fixed a webhook issue where Paperclip could reject a valid request when the sender included both older and newer signature headers.',
    skills: ['TypeScript', 'Webhooks', 'HMAC-SHA256', 'Vitest'],
    story: {
      title: 'Help valid webhook requests reach their routine',
      lead: 'A webhook can include more than one signature header. Paperclip needs to check the SHA-256 signature for this trigger type.',
      steps: [
        {
          heading: 'The problem',
          text: 'When a sender included both the older signature header and the SHA-256 header, Paperclip checked the older one first and could reject a valid webhook.',
        },
        {
          heading: 'My fix',
          text: 'I changed the webhook trigger to prefer the SHA-256 signature header, while keeping the existing fallback for senders that provide only the other header.',
        },
        {
          heading: 'The outcome',
          text: 'The PR reports 81 passing routine-service tests, 16 passing route tests, a successful TypeScript check, and passing module-boundary checks.',
        },
      ],
      links: [{ label: 'Read PR #18580', url: 'https://github.com/paperclipai/paperclip/pull/18580' }],
    },
  },
  {
    repo: 'NWT Reading',
    repoUrl: 'https://github.com/searchwork/nwt-reading',
    stars: 26,
    logo: `${GH}/searchwork/nwt-reading/main/assets/launcher/icon.png`,
    banner: `${GH}/searchwork/nwt-reading/main/assets/store_presence/feature_graphic.png`,
    bannerAlt: "NWT Reading's official app feature graphic",
    pr: 255,
    label: 'Keep the calendar readable on small screens',
    diagramTitle: 'A year label that fits different screens',
    flow: ['Large\nyear text', 'Fit the\nscreen', 'Readable\ncalendar'],
    footNote: 'Make room for larger text',
    title: 'Keep calendar text from overlapping on iPhone',
    summary:
      'I adjusted the plan card’s year text to fit the screen, helping prevent it from colliding with the days-left indicator when people use larger text.',
    skills: ['Flutter', 'Dart', 'Responsive UI', 'Accessibility'],
    story: {
      title: 'Keep calendar text from overlapping on iPhone',
      lead: 'The year on a plan card could collide with the days-left indicator when the screen was narrow or text was enlarged.',
      steps: [
        {
          heading: 'The problem',
          text: 'The plan card used a fixed-size year label. On iPhones, especially with larger system text, it could overlap nearby calendar information.',
        },
        {
          heading: 'My fix',
          text: 'I changed the year label to size itself based on the available screen width and use the app’s display text styling.',
        },
        {
          heading: 'The outcome',
          text: 'The PR reports checks on iPhone 16 Pro and other iOS screen sizes, including larger text settings, to confirm the card remains readable.',
        },
      ],
      links: [{ label: 'Read PR #255', url: 'https://github.com/searchwork/nwt-reading/pull/255' }],
    },
  },
]

type Live = { stars?: number; status?: 'open' | 'merged' | 'closed' }
const LIVE = (ossLive as { items: Record<string, Live> }).items

export const CONTRIBUTIONS: ContributionEntry[] = [
  ...BASE_CONTRIBUTIONS,
  ...(extraContributions as ContributionEntry[]),
]
  .map((c) => ({ ...c, ...LIVE[`${c.repoUrl}#${c.pr}`] }))
  .filter((c) => c.status !== 'closed')

export interface ProjectEntry {
  title: string
  kind: string // e.g. "Personal Project", "M.Sc. Thesis"
  mark: string // short category shown top-right on the cover
  label: string // small caption above the cover diagram
  diagramTitle: string
  flow: [string, string, string] // use \n for a line break
  footNote: string
  summary: string
  tags: string[]
  url?: string
}

export const PROJECTS: ProjectEntry[] = [
  {
    title: 'LLM Multi-Agent Planning System',
    kind: 'Personal / Research Project',
    mark: 'AI System',
    label: 'Plan complex tasks with a team of AI agents',
    diagramTitle: 'Turn a complex request into a grounded plan',
    flow: ['Task', 'Orchestrator', 'AI agents\n+ knowledge'],
    footNote: 'GPT · Claude · LLaMA · RAG',
    summary:
      'An agentic orchestration platform that uses multiple language models and retrieval to make long-context planning more grounded. Dockerized for reproducible deployment.',
    tags: ['OpenAI GPT', 'Claude', 'LLaMA 2', 'Mistral', 'RAG', 'Vector databases', 'Docker'],
  },
  {
    title: 'Self-Supervised Depth Completion for 3D Object Detection',
    kind: 'M.Sc. Thesis',
    mark: 'Computer Vision',
    label: 'Help vehicles understand the road in 3D',
    diagramTitle: 'Fill in missing depth to see the scene more clearly',
    flow: ['LiDAR\n+ RGB', 'Complete\ndepth', '3D object\ndetection'],
    footNote: 'Self-supervised learning',
    summary:
      'A self-supervised framework that combines sparse LiDAR with RGB images to create dense depth maps for autonomous driving. Evaluated on the KITTI benchmark.',
    tags: ['Python', 'Self-supervised learning', 'LiDAR', 'RGB', 'KITTI'],
    url: 'https://github.com/Laihu08/DepthCompletion-3DObjectDetection',
  },
  {
    title: 'LLM RAG Chatbot',
    kind: 'Personal Project',
    mark: 'RAG Chatbot',
    label: 'Ask questions about your own documents',
    diagramTitle: 'Find relevant knowledge before answering',
    flow: ['Question', 'Search\nknowledge', 'Grounded\nanswer'],
    footNote: 'Local or cloud models',
    summary:
      'A chatbot that answers questions from a knowledge base using retrieval-augmented generation and ChromaDB. Run it locally with Mistral 7B through Ollama, or use OpenAI GPT.',
    tags: ['Python', 'RAG', 'ChromaDB', 'Ollama', 'Mistral 7B', 'OpenAI', 'Streamlit'],
    url: 'https://github.com/Laihu08/llm-rag-chatbot',
  },
  {
    title: 'Hybrid AI Chatbot (CAG + RAG)',
    kind: 'Personal Project',
    mark: 'CAG + RAG',
    label: 'Balance quick answers with up-to-date information',
    diagramTitle: 'Use a cache first, then retrieve fresh knowledge',
    flow: ['Question', 'Check\nthe cache', 'Fresh\nanswer'],
    footNote: 'Speed and freshness',
    summary:
      'Combines cache-augmented generation for quick answers with retrieval-augmented generation when fresh information is needed, balancing response speed and knowledge freshness.',
    tags: ['Python', 'CAG', 'RAG'],
    url: 'https://github.com/Laihu08/Hybrid-AI-Chatbot-CAG-RAG-',
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
  logo: string // image path under /public, or 'microsoft' | 'googlecloud' | 'nvidia' for inline marks
}

export const CERTIFICATIONS: CertificationEntry[] = [
  { title: 'AI Infrastructure and Operations Fundamentals', issuer: 'NVIDIA', date: 'Oct 2026', logo: 'nvidia' },
  { title: 'AI and Career Empowerment', issuer: 'Robert H. Smith School of Business', date: 'Mar 2026', logo: '/logos/umd-smith.png' },
  { title: 'Understanding Agentic AI', issuer: 'Digital Workforce Services', date: 'May 2025', logo: '/logos/digital-workforce.png' },
  { title: 'Develop a RAG-based Solution with Azure AI Foundry', issuer: 'Microsoft', date: 'Apr 2025', logo: 'microsoft' },
  { title: 'Evaluate Generative AI Performance in Azure AI Foundry', issuer: 'Microsoft', date: 'Apr 2025', logo: 'microsoft' },
  { title: 'LangChain for LLM Application Development', issuer: 'DeepLearning.AI', date: 'Mar 2025', logo: '/logos/deeplearning-ai.png' },
  { title: 'Prompt Design in Vertex AI', issuer: 'Google Cloud', date: 'Mar 2025', logo: 'googlecloud' },
]

// About Me — in Rahul's own words.
export const ABOUT_LINES = [
  'I always want to know why, not just how.',
  "When something I built finally works, I'm genuinely proud.",
  "In my free time, I'm out with friends trying something new.",
]

export const ABOUT_TAGS = ['Logical', 'Honest', 'Persistent', 'Techie', 'Friends first']

// Shown under the name on the opening screen.
export const HERO_STATS = [
  { value: 5, suffix: '+', label: 'Years of experience' },
  { value: 2, suffix: '', label: 'International patents', icon: 'patent' as const },
  { value: (ossLive as { githubContributions: number }).githubContributions, suffix: '', label: 'GitHub contributions', href: 'https://github.com/Laihu08' },
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

