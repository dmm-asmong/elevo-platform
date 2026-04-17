# bkit — Claude Code를 "풀스택 AI 개발 팀"으로 만드는 프레임워크

> **원본**: [github.com/popup-studio-ai/bkit-claude-code](https://github.com/popup-studio-ai/bkit-claude-code)  
> **제작자**: popup-studio-ai  
> **현재 버전**: v2.1.7  
> **라이선스**: MIT

---

## 개요

**bkit (Vibecoding Kit)**은 Claude Code를 위한 **PDCA 기반 풀스택 개발 프레임워크**입니다.  
37개 스킬 · 32개 에이전트 · 19개 훅 이벤트로 구성된 팀을 Claude Code 하나로 운용합니다.

> Plan → Design → Do → Check → Act 사이클을 자동화하여  
> 1인 개발자가 **기획 → 설계 → 구현 → QA → 배포**를 체계적으로 완주할 수 있습니다.

---

## 핵심 구성

| 구성 요소 | 수량 | 설명 |
|-----------|------|------|
| Skills | 37개 | 각 단계별 전문화된 작업 지침 |
| Agents | 32개 | CTO · PM · QA · 보안 · 인프라 등 역할 에이전트 |
| Hook Events | 19개 | 자동화 트리거 (빌드, 테스트, 배포 시) |
| MCP Servers | 2개 | bkend.ai BaaS + 분석 서버 |

---

## 3가지 개발 레벨

### 🌱 Starter
- HTML · CSS · JavaScript 정적 사이트
- 백엔드 없는 포트폴리오, 랜딩 페이지
- 초보자 친화적, 단계별 가이드

### ⚡ Dynamic
- Next.js + bkend.ai BaaS
- 인증 · DB · 파일 업로드 포함 풀스택 앱
- PDCA 사이클 자동화

### 🏢 Enterprise
- 마이크로서비스 · Kubernetes · Terraform
- AWS + CI/CD 파이프라인
- CTO 레벨 아키텍처 결정

---

## PDCA 9단계 개발 파이프라인

```
Phase 1  스키마 정의     → 데이터 모델, 용어 정의
Phase 2  컨벤션         → 코딩 규칙, 폴더 구조
Phase 3  목업           → UI/UX 프로토타입
Phase 4  API 설계       → REST API, Zero Script QA
Phase 5  디자인 시스템   → 컴포넌트, 토큰
Phase 6  UI 통합        → 프론트엔드 + 백엔드 연결
Phase 7  SEO · 보안     → 메타태그, OWASP
Phase 8  코드 리뷰      → 품질 검사, 갭 분석
Phase 9  배포           → CI/CD, 프로덕션 릴리스
```

---

## 주요 스킬

| 스킬 | 역할 |
|------|------|
| `/bkit:pdca` | PDCA 사이클 전체 관리 |
| `/bkit:phase-4-api` | API 설계 + Zero Script QA |
| `/bkit:phase-5-design-system` | 디자인 시스템 구축 |
| `/bkit:phase-6-ui-integration` | UI · API 통합 |
| `/bkit:zero-script-qa` | Docker 로그 기반 QA (스크립트 없이) |
| `/bkit:code-review` | 코드 품질 분석 |
| `/bkit:deploy` | 배포 자동화 |
| `/bkit:bkend-auth` | 인증 (이메일 · 소셜 로그인) |
| `/bkit:bkend-data` | DB CRUD 자동화 |

---

## 에이전트 팀 (Agent Teams)

환경 변수 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 설정 시 활성화.

```
CTO Lead (Opus)
├── PM Agent       → 요구사항 분석, PRD 작성
├── Frontend       → React · Next.js 컴포넌트
├── Backend        → bkend.ai API 설계
├── Security       → OWASP, 인증 설계
├── QA Lead        → 테스트 계획 · 실행
└── Infra          → AWS · Kubernetes
```

---

## 설치 방법

```bash
# bkit 마켓플레이스 추가
claude plugin add bkit --marketplace bkit-marketplace

# 또는 직접 설치
claude plugin add bkit --source github:popup-studio-ai/bkit-claude-code
```

---

## 사용 방법

```prompt
/bkit:dynamic    # Dynamic 레벨 풀스택 프로젝트 시작
```

```prompt
/bkit:pdca       # PDCA 사이클 관리
```

```prompt
/bkit:zero-script-qa   # Docker 로그 기반 QA 실행
```

```prompt
/bkit:bkit       # 전체 스킬 목록 보기
```

---

## 자동화 레벨 (L0~L4)

| 레벨 | 설명 |
|------|------|
| L0 | 수동 (모든 단계 확인) |
| L1 | 반자동 (주요 단계만 확인) |
| L2 | 자동 (완료 후 보고) |
| L3 | 풀 자동 (에이전트 팀 활용) |
| L4 | 자율 (최소 개입) |

```prompt
/bkit:control L2   # 자동화 레벨 설정
```

---

## 품질 게이트 (M1~M10)

코드 머지 전 자동 검사:

- **M1** 타입 오류 없음
- **M3** 테스트 통과율 ≥ 80%
- **M5** 보안 취약점 없음
- **M7** 번들 크기 증가 < 10%
- **M10** 갭 분석 일치율 ≥ 90%
