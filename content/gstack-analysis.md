# gstack — Claude Code를 "가상 팀"으로 만드는 도구

> **원본**: [github.com/garrytan/gstack](https://github.com/garrytan/gstack)  
> **제작자**: Garry Tan (Y Combinator CEO)  
> **분석일**: 2026년 4월 1일  
> **라이선스**: MIT (영원히 무료)

---

## 개요

**gstack**은 Claude Code용 **슬래시 명령어(Slash Commands) 모음**입니다.  
하나의 AI에게 CEO, 엔지니어링 매니저, 디자이너, QA, 보안 담당자 역할을 동시에 부여하여  
**"1인 가상 개발팀"** 환경을 구현합니다.

> 개리 탄은 60일 동안 파트타임으로 하루 1~2만 줄씩,  
> 총 **60만 줄 이상의 코드**를 혼자 배포했습니다. 그 핵심이 gstack입니다.

---

## 대상

| 대상 | 활용 포인트 |
|------|------------|
| 1인 창업자 / 스타트업 CEO | 팀 없이 빠르게 MVP ~ 제품 출시 |
| Claude Code 초보자 | 역할 기반 명령어로 "무엇을 시킬지" 가이드 |
| 개발팀 리더 | PR 리뷰, QA, 배포 자동화 강화 |

---

## 설치 (30초)

Claude Code를 열고 아래 명령어를 실행합니다:

```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
```

팀원 공유 시 (선택):

```bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && \
  rm -rf .claude/skills/gstack/.git && \
  cd .claude/skills/gstack && ./setup
```

---

## 핵심: 스프린트 워크플로우

gstack은 **"생각 → 계획 → 구축 → 검토 → 테스트 → 출시 → 회고"** 순서의 프로세스입니다.  
각 단계가 앞 단계의 결과물을 자동으로 읽어 흐름이 이어집니다.

| 단계 | 명령어 | AI 역할 | 수행 내용 |
|:----:|--------|:-------:|----------|
| 💡 | `/office-hours` | YC 오피스 아워 | 아이디어를 분석, 핵심 문제 추출 → 설계문서 작성 |
| 📋 | `/plan-ceo-review` | CEO / 창업자 | 범위 재검토, 숨겨진 10점짜리 제품 발굴 |
| 🏗️ | `/plan-eng-review` | 엔지니어링 매니저 | 아키텍처, 데이터 흐름, 예외 처리, 테스트 계획 |
| 🎨 | `/design-consultation` | 디자인 파트너 | 디자인 시스템, 시장 조사, 목업 제작 |
| 🔍 | `/review` | 수석 엔지니어 | CI 통과 후에도 숨겨진 버그 발견 → 자동 수정 |
| 🧪 | `/qa <url>` | QA 리드 | Chrome으로 실제 클릭 테스트, 버그 발견 & 수정 |
| 🚀 | `/ship` | 릴리스 엔지니어 | 테스트 실행, 커버리지 감사, PR 생성 |
| 🔒 | `/cso` | 보안 책임자 | OWASP Top 10 + STRIDE 위협 모델 분석 |
| 📝 | `/document-release` | 기술 문서 작성자 | README, 아키텍처 문서 자동 최신화 |
| 🔄 | `/retro` | 엔지니어링 매니저 | 주간 회고, 배포 실적, 테스트 추세 분석 |

---

## 실제 사용 예시

```prompt
구글 캘린더 일일 브리핑 앱을 만들고 싶어요.
```

```prompt
/office-hours
```

**Claude의 반응:**
> [6가지 핵심 질문으로 진짜 문제를 추출]  
> "당신이 필요한 건 '일일 브리핑 앱'이 아니라 개인 비서 AI입니다."  
> → 3가지 구현 방향 + 출시 우선순위 + 설계문서 작성

**연속 명령어 실행:**
```bash
/plan-ceo-review   # 범위 검토
/plan-eng-review   # 아키텍처 확정 및 코드 생성
/review             # 자동 버그 수정
/qa https://staging.myapp.com # 브라우저 테스트 및 수정
/ship               # 테스트 강화 및 PR 생성
```

**8개 명령어**로 아이디어에서 PR까지 완성됩니다.

---

## 안전 & 특수 명령어

| 명령어 | 기능 |
|--------|------|
| `/careful` | `rm -rf`, `DROP TABLE` 등 위험 명령 실행 전 경고 |
| `/freeze` | 디버깅 중 특정 폴더만 편집 가능하도록 제한 |
| `/guard` | `/careful` + `/freeze` 동시 활성화 (프로덕션용) |
| `/browse` | Playwright 기반 Chrome 브라우저 자동화 |
| `/codex` | OpenAI Codex로 독립적인 2차 코드 리뷰 |
| `/gstack-upgrade` | gstack 자체 자동 업데이트 |
| `/learn` | 세션 간 학습 내용 관리 (프로젝트별 패턴 축적) |
| `/autoplan` | CEO → 디자인 → 엔지니어링 검토 자동 순차 실행 |
| `/retro global` | 모든 프로젝트 + AI 도구 통합 회고 |

---

## 특징 요약

- **MIT 라이선스**, 완전 무료
- Claude Code 외 **Codex, Gemini CLI, Cursor, Factory Droid** 지원
- **10~15개 스프린트 병렬 실행** 가능 (Conductor)
- 텔레메트리 기본 OFF, 코드·파일명 절대 전송 안 함
- Windows(Git Bash/WSL), Mac, Linux 모두 지원
- 총 **31개 스킬** 제공

---

## 플랫폼별 설치

### Codex / Gemini CLI

```bash
git clone --single-branch --depth 1 \
  https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host codex
```

### 자동 감지

```bash
git clone --single-branch --depth 1 \
  https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup --host auto
```

---

## 트러블슈팅

| 증상 | 해결 |
|------|------|
| 스킬이 표시되지 않음 | `cd ~/.claude/skills/gstack && ./setup` |
| `/browse` 실패 | `cd ~/.claude/skills/gstack && bun install && bun run build` |
| 설치가 오래됨 | `/gstack-upgrade` 또는 `auto_upgrade: true` 설정 |
| 명령어 간소화 | `./setup --no-prefix` (예: `/gstack-qa` → `/qa`) |

---

*MIT License · [github.com/garrytan/gstack](https://github.com/garrytan/gstack)*
