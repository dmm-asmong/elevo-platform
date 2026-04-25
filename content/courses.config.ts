export interface Course {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sessions: number;
  status: "active" | "coming-soon" | "archived";
  tags: string[];
}

export const courses: Course[] = [
  {
    slug: "vibe-coding",
    title: "바이브코딩",
    description: "AI와 대화로 웹앱 만들기. 코딩 경험 없는 입문자도 7회차만에 나만의 웹앱을 완성합니다.",
    icon: "⚡",
    color: "#3A7BD5",
    sessions: 7,
    status: "active",
    tags: ["Google AI Studio", "Gemini", "HTML/CSS/JS"],
  },
  {
    slug: "generative-ai",
    title: "생성형AI 활용법",
    description: "ChatGPT, Claude, Gemini 등 생성형 AI 도구를 업무에 실전 적용하는 방법을 배웁니다.",
    icon: "🤖",
    color: "#7c3aed",
    sessions: 0,
    status: "coming-soon",
    tags: ["ChatGPT", "Claude", "Gemini"],
  },
  {
    slug: "notebooklm",
    title: "NotebookLM & Gemini",
    description: "Google NotebookLM으로 문서를 분석하고, Gemini와 함께 지식을 체계화합니다.",
    icon: "📓",
    color: "#059669",
    sessions: 1,
    status: "active",
    tags: ["NotebookLM", "Gemini", "Google"],
  },
  {
    slug: "google-workspace",
    title: "Google Workspace",
    description: "Docs, Sheets, Slides, Gmail을 AI와 함께 10배 더 효율적으로 활용합니다.",
    icon: "🔧",
    color: "#d97706",
    sessions: 0,
    status: "coming-soon",
    tags: ["Google Docs", "Sheets", "Gmail"],
  },
  {
    slug: "ai-creator-workshop",
    title: "AI 크리에이터 첫걸음",
    description: "촬영·편집 경험 없이, AI 3종 세트로 90분 만에 첫 숏폼 영상 완성",
    icon: "🚀",
    color: "#6366F1",
    sessions: 1,
    status: "active",
    tags: ["ChatGPT", "DALL-E", "Vrew", "숏폼"],
  },
  {
    slug: "ai-video-making",
    title: "생성형 AI 영상제작",
    description: "카메라 없이 90분 만에 첫 AI 영상 완성. Gemini로 기획하고, 미리캔버스로 이미지를 만들고, Vrew로 편집까지.",
    icon: "🎬",
    color: "#E11D48",
    sessions: 1,
    status: "active",
    tags: ["Gemini", "미리캔버스", "Vrew", "AI 영상"],
  },
];
