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
];
