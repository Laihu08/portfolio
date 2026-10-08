import {
  siPytorch,
  siTensorflow,
  siKeras,
  siHuggingface,
  siLangchain,
  siOpencv,
  siGooglecloud,
  siDocker,
  siFastapi,
  siPython,
  siCplusplus,
  siGit,
  siGitlab,
  siJupyter,
} from 'simple-icons'

export type TechIcon =
  | { kind: 'brand'; path: string; hex: string }
  | { kind: 'line'; paths: string[] }

const brand = (i: { path: string; hex: string }): TechIcon => ({ kind: 'brand', path: i.path, hex: i.hex })
const line = (...paths: string[]): TechIcon => ({ kind: 'line', paths })

// Real brand marks (single-colour, from simple-icons) where one exists; plain
// line icons for concepts and tools without a brand mark.
export const TECH_ICONS: Record<string, TechIcon> = {
  PyTorch: brand(siPytorch),
  TensorFlow: brand(siTensorflow),
  Keras: brand(siKeras),
  'Hugging Face Transformers': brand(siHuggingface),
  LangChain: brand(siLangchain),
  OpenCV: brand(siOpencv),
  'Google Cloud Platform': brand(siGooglecloud),
  Docker: brand(siDocker),
  FastAPI: brand(siFastapi),
  Python: brand(siPython),
  'C++': brand(siCplusplus),
  Git: brand(siGit),
  GitLab: brand(siGitlab),
  Jupyter: brand(siJupyter),

  LLMs: line('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'M8 9h8', 'M8 13h5'),
  VLMs: line('M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'),
  RAG: line('M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.3-4.3', 'M8 11h6', 'M11 8v6'),
  'Agentic AI': line('M12 8V4H8', 'M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', 'M2 14h2', 'M20 14h2', 'M15 13v2', 'M9 13v2'),
  'Multi-Agent Orchestration': line('M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M5 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M10.5 8.5 6.5 15', 'M13.5 8.5l4 6.5', 'M8 18h8'),
  'Prompt Engineering': line('m4 17 6-6-6-6', 'M12 19h8'),
  'Vector Databases': line('M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z', 'M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5', 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'),
  'Model Evaluation & Monitoring': line('M22 12h-4l-3 9L9 3l-3 9H2'),
  'Vertex AI': line('M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 3v4', 'M17 5h4'),
  'CI/CD': line('M18.4 6.6a9 9 0 0 1 0 10.8', 'M5.6 17.4a9 9 0 0 1 0-10.8', 'M12 12h.01', 'M7 8l-3 3 3 3', 'M17 16l3-3-3-3'),
  'REST APIs': line('M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z'),
  'VS Code': line('m16 18 6-6-6-6', 'm8 6-6 6 6 6'),
  'Automated Testing': line('M22 11.1V12a10 10 0 1 1-5.9-9.1', 'm9 11 3 3L22 4'),
  'Production Debugging': line('M8 2l1.9 1.9', 'M14.1 3.9 16 2', 'M9 7.1v-.1a3 3 0 0 1 6 0v.1', 'M12 20a6 6 0 0 1-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3a6 6 0 0 1-6 6z', 'M12 20v-9', 'M6.5 13H2', 'M17.5 13H22', 'M3 21c0-2.1 1.7-3.9 3.8-4', 'M21 21c0-2.1-1.7-3.9-3.8-4'),
  Documentation: line('M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z', 'M14 2v6h6', 'M8 13h8', 'M8 17h5'),
}
