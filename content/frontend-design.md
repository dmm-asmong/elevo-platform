# Frontend Design — AI 클리셰를 깨부수는 프론트엔드 디자인 스킬 ✨

> **원본**: [github.com/anthropics/skills/tree/main/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)  
> **제작자**: Anthropic 공식  
> **적용 도구**: Claude Code, Antigravity, Cursor, Codex 등  
> **라이선스**: Apache-2.0 / Complete terms in LICENSE.txt  

---

## 🎨 개요

**Frontend Design**은 Anthropic 공식 저장소에서 제공하는 프론트엔드 전문 스킬(Skill)입니다.

AI 코딩 도구(Claude Code 등)에게 UI/UX 작업을 요청하면, 대부분 어디서 본 듯한 **"천편일률적인 AI 템플릿 디자인(AI Slop)"**을 만들어내는 경향이 있습니다.  
이 스킬은 AI에게 **"클라이언트마다 고유한 비주얼 아이덴티티를 부여하는 전문 디자인 스튜디오의 디자인 리드"** 페르소나를 부여하여, 뻔한 기본값을 거부하고 제품의 본질과 사용자에 맞춘 **의도적이고 세련된 UI**를 구축하도록 이끕니다.

> "이 클라이언트는 이미 뻔하고 템플릿 같은 제안서를 거절했습니다. 당신의 차별화된 관점을 위해 비용을 지불하고 있으므로, 색상 팔레트·타이포그래피·레이아웃에 대해 대담하고 의도적인 선택을 내리세요."

---

## 🚫 AI가 흔히 빠지는 5가지 디자인 클리셰 (AI Slop)

Anthropic은 AI가 생성하는 디자인이 특정 패턴으로 획일화되는 현상을 정밀하게 지적합니다:

| 클리셰 유형 | 흔한 표현 방식 | 왜 문제인가? |
|-------------|----------------|--------------|
| **1. 웜 크림 & 테라코타** | 배경 `#F4F1EA` + 테라코타(Claude 브랜드 컬러인 `#D97757`) | 제품과 무관하게 Claude 자체의 브랜드 룩을 복제함 |
| **2. 다크 & 애시드 그린** | 검은색 배경에 쨍한 네온 그린이나 버밀리온 한 방울 | 모든 개발자 도구/테크 사이트의 클리셰 |
| **3. SaaS 카드 공장** | 똑같은 `border-radius`, 옅은 그림자(`rgba(0,0,0,0.1)`), 그라디언트 배경의 카드 나열 | 정보의 위계가 사라지고 모든 요소가 똑같이 보임 |
| **4. 템플릿 크롬 장식** | 모든 제목 위의 ALL-CAPS 작은 라벨, 가운데 점(`A · B · C`), `WORD — fragment` 형태 | 의미 없는 시각적 노이즈로 화면을 채움 |
| **5. 습관적 요소** | 순서가 아닌데 `01 / 02 / 03` 번호 매기기, 버튼마다 무조건 `→` 화살표 붙이기, 모든 카드에 슬라이드업 애니메이션 남발 | 장식일 뿐 정보 전달에 기여하지 못함 |

---

## 🧭 핵심 디자인 원칙

### 1. 제품과 대상(Audience)에 뿌리내리기
- 디자인 브리프에 명확한 제품 설명이 없다면 먼저 대상과 핵심 역할을 정의합니다.
- **8~11세 여아용 장난감 앱**과 **금융 분석가용 대시보드**의 시각 언어는 완전히 달라야 합니다.
- 실제 제품의 소재, 산업군, 사용자 언어에서 고유한 시각적 단서를 찾아냅니다.

### 2. 히어로(Hero) 섹션의 차별화
- 큰 숫자 + 작은 라벨 + 그라디언트 포인트는 가장 흔한 기본값입니다. 꼭 필요한 경우가 아니라면 지양합니다.
- 제품 세계관을 가장 잘 보여주는 형식(헤드라인, 인터랙티브 데모, 라이브 시각화, 실시간 경험 등)으로 첫인상을 설계합니다.

### 3. 타이포그래피에 성격 부여
- 무난하다고 시스템 폰트나 Inter/Roboto를 무의식적으로 쓰지 않습니다.
- 1~2개의 명확히 구별되는 폰트 패밀리를 선택하고 체계적인 타입 스케일을 적용합니다.
- **가독성 규칙**: 1줄당 80자 이하로 제한.
- **금지 패턴**: 제목 안에서 단 한 단어만 이탤릭/볼드/컬러 처리하는 AI 특유의 버릇 금지.

### 4. 시각적 구조를 '정보'로 활용
- 테두리, 구분선, 번호는 장식이 아니라 정보를 담는 수단이어야 합니다.
- 실제 타임라인이나 단계별 절차가 아니라면 `01 / 02 / 03` 번호를 붙이지 않습니다.
- 사용자 동작에 반응하는 모션(열기, 확장, 확인)은 권장하되, 페이지 로딩 시 섹션마다 날아오는 페이드인 애니메이션은 절제합니다.

### 5. 절제와 자체 비평 (Chanel의 법칙)
> **"외출하기 전 거울을 보고 액세서리 하나를 벗어라."** — 코코 샤넬

- 대담함은 단 한 군데에만 집중하고, 주변 요소는 정돈되고 차분하게 유지합니다.
- 모바일 반응형, 키보드 포커스, 접근성, 조화로운 색상 팔레트의 기본 완성도를 철저히 지킵니다.

### 6. 의도적인 카피라이팅
- 사용자 관점의 쉬운 언어를 사용합니다 (예: "웹훅 설정" ❌ → "알림 관리" ⭕).
- 버튼 CTA는 동작을 명확히 설명합니다 (예: "Submit" ❌ → "변경사항 저장" / "Save changes" ⭕).
- 에러 화면과 빈 상태(Empty State)는 불필요한 사과 대신 사용자가 다음으로 취해야 할 행동을 안내합니다.

---

## 🛠️ 설치 및 사용 방법

### 방법 1. Claude Code CLI에서 공식 추가 (권장)

```bash
npx skills add anthropics/skills --skill frontend-design
```

### 방법 2. 프로젝트에 수동 추가

프로젝트 루트의 `.claude/skills/frontend-design/SKILL.md` (또는 `.agents/skills/frontend-design/SKILL.md`) 위치에 파일을 생성하고 저장합니다.

```bash
# 디렉토리 생성
mkdir -p .claude/skills/frontend-design

# SKILL.md 파일 다운로드
curl -o .claude/skills/frontend-design/SKILL.md https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md
```

### 방법 3. Antigravity / Cursor / Roo Code 등에서 사용
프로젝트의 `.cursorrules` 또는 규칙 파일에 `SKILL.md` 내용을 포함하거나, 프롬프트에 직접 디자인 원칙을 첨부하여 실행합니다.

---

## 💬 실전 프롬프트 예시

### 예시 1: 신규 랜딩 페이지 제작
```prompt
/frontend-design
지속 가능한 라이프스타일을 위한 제로웨이스트 화장품 브랜드의 소개 랜딩 페이지를 만들어줘.
일반적인 SaaS 템플릿이나 뻔한 카드 그리드 형태를 피하고,
자연스러운 질감과 차별화된 타이포그래피, 대담한 레이아웃 콘셉트를 제안해줘.
먼저 4~6개의 색상 팔레트와 폰트, ASCII 와이어프레임 계획을 세우고 자체 검토를 거친 후 코드를 작성해줘.
```

### 예시 2: 기존 UI 리팩토링 & AI 클리셰 제거
```prompt
/frontend-design
현재 작성된 대시보드 UI를 검토해줘.
모든 데이터가 둥근 사각형 카드 안에 똑같이 갇혀 있는 SaaS 클리셰를 깨고,
핵심 데이터에 시각적 임팩트를 주는 절제된 위계 구조로 리디자인해줘.
불필요한 ALL-CAPS 라벨과 무의미한 호버 애니메이션은 제거해줘.
```

---

## 📄 SKILL.md 영문 원문

<details>
<summary><strong>SKILL.md 원문 펼치기</strong></summary>

```markdown
---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. You can come up with one concrete subject, the design's audience, and the design's primary job, as a proposal. If there's any information in your memory about the client's preferences or context about what they're building, use that as a hint. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a toy for girls aged 8–11 will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. You don't need a different typeface for display or headline text and body content: use one family or two, and if two, make them clearly distinct.

Choose your typefaces deliberately, not the default families you would reach for on any other project, and set a clear type scale following the default guidance of The Elements of Typographic Style with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design, not a neutral delivery vehicle for the content.

Default to line lengths of less than 80 characters. Serif typefaces can have slightly longer line lengths; give serif body text slightly more line-height than a sans-serif.

Avoid these default typographic treatments; they are the commonest tells of a generated page:
- Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color.
- Using all caps for labels.
- Adding unnecessary typographic labels above content.

Visual structure is information. Structural devices like outlines, borders, numbering, eyebrows, dividers, labels, etc., encode useful information about the content rather than decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence — like a stepped process or a timeline. Before adding numbered markers, check the content really is a sequence.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects; fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated. Motion that answers a person's action (opening, expanding, confirming) is welcome when it shows what changed.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy and placeholder content. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance.

## Process: plan, review against the brief, build, critique

For calibration, AI-generated design right now clusters around some traits:
1. a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent (often near #D97757 — Anthropic's own Claude-interaction accent, so on a user's brief it reads as a tell);
2. a near-black background with a single bright acid-green or vermilion accent;
3. a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns;
4. the SaaS-card kit: content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy, the same soft grey shadow (rgba(0,0,0,.1)) under each, and gradient washes as decoration;
5. template chrome that appears whatever the subject: a tracked-out ALL-CAPS eyebrow label above every heading; meta strings joined with middle dots ('A · B · C'); labels built as 'WORD — fragment' with a spaced em dash; tinted near-black (#0B0B0B, #111) standing in for black; a monospace face for small data labels; a '→' appended to link and button text.

All traits are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. As with a hired human designer, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the client's design brief: create a compact token system with color, type, layout, and principles.
- Color: describe the core base palette as 4–6 named hex values.
- Type: the typefaces and their roles.
- Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Include alignment guidance; should the content be left aligned, center aligned, justified?
- Principles: the high-level guidance for what makes this page unique.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and an element-based selector like .cta). This can happen often with padding/margin between sections.

## Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious color palettes. Critique your own work as you build, taking screenshots to review if your environment supports it — a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creatives have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand and use. They are design content, not decoration. Bring the same intentionality and minimalism to copywriting that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's perspective. Name things by what users will understand in simple language, not by how the system is built. A user manages notifications, not webhook config. Describe what something is or does in plain terms rather than selling it. Being specific and legible to new users is always better than being clever.

Use active voice as default. A CTA says exactly what happens when it is used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the tone conversational: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each written element do exactly one job.
```

</details>
