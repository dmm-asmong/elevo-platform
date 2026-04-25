# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**elevo-platform** — AI 강의 플랫폼. MDX 기반 강의 콘텐츠를 제공하는 Next.js 웹앱이다.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 아키텍처

**스택:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 4 · gray-matter · next-mdx-remote

**디렉토리 구조:**
```
elevo-platform/
├── app/
│   ├── page.tsx                        # 홈 (강의 목록)
│   ├── layout.tsx                      # 루트 레이아웃
│   ├── courses/[courseSlug]/           # 강의 상세
│   │   └── [sessionId]/page.tsx        # 회차별 강의 내용
│   ├── library/                        # 강의 자료 라이브러리
│   └── api/                            # API 라우트
├── components/
│   ├── course/                         # 강의 관련 컴포넌트
│   ├── home/                           # 홈 화면 컴포넌트
│   ├── layout/                         # 레이아웃 컴포넌트
│   ├── presentation/                   # 발표 뷰 컴포넌트
│   └── viewer/                         # 콘텐츠 뷰어 컴포넌트
├── lib/
│   ├── content.ts                      # 강의/회차 콘텐츠 로딩
│   ├── markdown.ts                     # 마크다운 처리
│   ├── skills.ts                       # 스킬 유틸리티
│   └── toc.ts                          # 목차 생성
└── content/
    ├── courses.config.ts               # 강의 목록 메타데이터
    ├── skills.config.ts                # 스킬 설정
    └── <courseSlug>/                   # 강의별 콘텐츠 폴더
        ├── meta.json                   # 강의 메타 (title, description, totalSessions)
        └── session-NN/                 # 회차별 폴더 (session-01, session-02 ...)
            ├── meta.json               # 회차 메타 (sessionNumber, title, duration, tool, status)
            ├── lesson.md               # 강의 내용
            ├── slide-outline.md        # 슬라이드 개요
            ├── slide.html              # 슬라이드 HTML (선택)
            └── worksheet.md           # 워크시트 (선택)
```

## 강의 목록

`content/courses.config.ts`에서 관리. 각 강의는 `slug`, `title`, `description`, `sessions`, `status` 를 가진다.

| slug | 제목 | 상태 |
|------|------|------|
| `vibe-coding` | 바이브코딩 | active (7회차) |
| `notebooklm` | NotebookLM & Gemini | active (1회차) |
| `ai-creator-workshop` | AI 크리에이터 첫걸음 | active (1회차) |
| `generative-ai` | 생성형AI 활용법 | coming-soon |
| `google-workspace` | Google Workspace | coming-soon |

## 콘텐츠 추가 방법

### 새 강의 추가
1. `content/courses.config.ts`에 강의 항목 추가
2. `content/<courseSlug>/meta.json` 생성
3. `content/<courseSlug>/session-01/` 폴더 및 파일 생성

### 새 회차 추가
1. `content/<courseSlug>/session-NN/meta.json` 생성
2. `lesson.md` 작성 (필수)
3. `slide-outline.md`, `worksheet.md` 추가 (선택)

### session meta.json 형식
```json
{
  "sessionNumber": 1,
  "title": "회차 제목",
  "duration": "90분",
  "tool": "사용 도구",
  "hasLesson": true,
  "hasSlideOutline": true,
  "hasSlideHtml": false,
  "hasWorksheet": false,
  "status": "published"
}
```
`status`: `"published"` | `"draft"` | `"coming-soon"`
