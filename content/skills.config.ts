export interface Skill {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  author: string;
  source: string;
  tags: string[];
  addedAt: string;
  contentFile: string; // content 폴더 내 md 파일명
}

export const skills: Skill[] = [
  {
    slug: "gstack",
    title: "gstack",
    description:
      "Y Combinator CEO 개리 탄이 만든 Claude Code 슬래시 명령어 모음. AI를 가상 팀처럼 활용하여 CEO, 엔지니어, 디자이너, QA 역할을 동시에 수행합니다.",
    icon: "🚀",
    color: "#FF6B35",
    author: "Garry Tan (Y Combinator)",
    source: "https://github.com/garrytan/gstack",
    tags: ["Claude Code", "AI Agent", "Workflow", "Automation"],
    addedAt: "2026-04-01",
    contentFile: "gstack-analysis.md",
  },
  {
    slug: "seo-content-writer",
    title: "SEO Content Writer",
    description:
      "SEO 최적화 블로그 포스트, 기사, 랜딩 페이지 작성을 돕는 스킬입니다. CORE-EEAT 가이드라인과 CITE 프레임워크를 기반으로 고품질 콘텐츠를 생성합니다.",
    icon: "✍️",
    color: "#2563eb",
    author: "aaron-he-zhu",
    source: "https://github.com/aaron-he-zhu/seo-geo-claude-skills",
    tags: ["SEO", "Content Writing", "CORE-EEAT", "Google Search"],
    addedAt: "2026-04-10",
    contentFile: "seo-content-writer.md",
  },
  {
    slug: "insane-design",
    title: "Insane Design",
    description:
      "URL 하나로 웹사이트의 실제 CSS를 분석해 디자인 시스템 레퍼런스(design.md)와 인터랙티브 HTML 리포트를 생성합니다. AI가 추측하지 않고 실제 CSS 팩트만 사용합니다.",
    icon: "🎨",
    color: "#7C3AED",
    author: "fivetaku",
    source: "https://github.com/fivetaku/insane-design",
    tags: ["Design System", "CSS Analysis", "Design Tokens", "UI Cloning"],
    addedAt: "2026-04-13",
    contentFile: "insane-design.md",
  },
  {
    slug: "insane-search",
    title: "Insane Search",
    description:
      "WebFetch가 차단될 때 우회 접근 전략을 제공합니다. X/Twitter, Reddit, YouTube, 네이버 등 1,858개 사이트를 플랫폼별 최적 방법으로 접근합니다.",
    icon: "🔍",
    color: "#059669",
    author: "fivetaku",
    source: "https://github.com/fivetaku/insane-search",
    tags: ["Web Scraping", "Social Media", "YouTube", "Korea Platforms"],
    addedAt: "2026-04-13",
    contentFile: "insane-search.md",
  },
  {
    slug: "bkit",
    title: "bkit (Vibecoding Kit)",
    description:
      "Claude Code를 풀스택 AI 개발 팀으로 만드는 PDCA 프레임워크. 37개 스킬 · 32개 에이전트로 기획-설계-구현-QA-배포 전 사이클을 자동화합니다.",
    icon: "⚡",
    color: "#F59E0B",
    author: "popup-studio-ai",
    source: "https://github.com/popup-studio-ai/bkit-claude-code",
    tags: ["Claude Code", "PDCA", "AI Agent", "Fullstack", "Automation"],
    addedAt: "2026-04-17",
    contentFile: "bkit.md",
  },
  {
    slug: "awesome-design-md",
    title: "Awesome DESIGN.md",
    description:
      "Airbnb, Stripe, Apple, Tesla 등 69개 유명 브랜드의 디자인 시스템을 DESIGN.md 파일로 정리한 컬렉션. 프로젝트에 복사하면 AI 에이전트가 즉시 해당 브랜드 스타일로 UI를 생성합니다.",
    icon: "🖌️",
    color: "#10B981",
    author: "VoltAgent",
    source: "https://github.com/VoltAgent/awesome-design-md",
    tags: ["DESIGN.md", "Design System", "UI Reference", "AI Agent", "Brand Kit"],
    addedAt: "2026-04-25",
    contentFile: "awesome-design-md.md",
  },
  {
    slug: "master-of-slide",
    title: "Master of Slide",
    description:
      "Markdown/Obsidian 노트를 React 기반 1920×1080 프레젠테이션으로 자동 변환하는 AI 슬라이드 도구. Claude Code의 /slide 명령 한 번으로 한국어 최적화 발표 자료를 완성합니다.",
    icon: "🎞️",
    color: "#6366F1",
    author: "reallygood83",
    source: "https://github.com/reallygood83/master-of-slide",
    tags: ["Claude Code", "Presentation", "Markdown", "Slide", "React", "한국어"],
    addedAt: "2026-05-06",
    contentFile: "master-of-slide.md",
  },
];
