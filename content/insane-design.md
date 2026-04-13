# Insane Design 🎨

> **"URL 하나로 실제 CSS를 뜯어내 디자인 시스템 레퍼런스를 만드는 스킬"**

Insane Design은 웹사이트 URL만 입력하면 실제 CSS를 분석해 **design.md**(디자인 시스템 레퍼런스)와 **인터랙티브 HTML 리포트**를 자동으로 생성합니다. AI가 색상을 추측하거나 만들어내는 게 아니라, 실제 CSS 파일에서 추출한 팩트만 사용합니다.

---

## 🚀 주요 기능

### 1. 실제 CSS 기반 디자인 토큰 추출
- **브랜드 색상**: `color-brand`, `--primary` 등 CSS custom property 기반
- **타이포그래피 스케일**: heading, body, input, quote 폰트 크기/굵기 추출
- **CSS var() 체인 해결**: 중첩 CSS 변수를 재귀적으로 최종값까지 추적
- **Semantic alias 계층**: util / action / component / core 4단계 분류

### 2. 7단계 자동 워크플로우
| 단계 | 내용 |
|------|------|
| INIT | URL 파싱 + 작업 디렉토리 생성 |
| FETCH | HTML/CSS + 스크린샷 병렬 수집 |
| EXTRACT | 4개 Python 스크립트로 토큰 추출 |
| INTERPRET | 스크린샷 + 추출 결과 멀티모달 AI 분석 |
| WRITE-MD | 16섹션 design.md 생성 |
| RENDER-HTML | 인터랙티브 report.ko.html 생성 |
| VALIDATE | 파일 크기·섹션·hex 실존 검증 |

### 3. 인터랙티브 HTML 리포트
- 컬러 스와치 hover 미리보기
- 타이포그래피 라이브 프리뷰
- 스페이싱 바 시각화
- 원클릭 Copy 버튼 (CSS 변수값 복사)

---

## 🛠️ 사용 방법

```prompt
/insane-design https://stripe.com
```

```prompt
https://toss.im 디자인 분석해줘
```

```prompt
이 사이트 CSS 뜯어봐 → https://linear.app
```

**완료 후 산출물:**
```
insane-design/stripe/
├── design.md          # 16섹션 디자인 레퍼런스 (8KB+)
├── report.ko.html     # 인터랙티브 리포트 (20KB+)
└── screenshots/
    └── hero-cropped.png
```

---

## 💡 활용 사례

1. **UI 클론 코딩**: `design.md`를 Claude Code에 첨부하면 해당 사이트 스타일로 UI 생성
2. **디자인 시스템 벤치마크**: 경쟁사 사이트의 토큰 구조 분석
3. **리브랜딩 참고**: 실제 사용 중인 색상 팔레트와 타이포 스케일 파악

---

## ⚠️ 원칙

- AI는 hex 값을 **만들지 않는다** — CSS에 없는 값 생성 = 환각
- AI는 토큰명을 **만들지 않는다** — 가상 이름 금지
- AI는 팩트 위에 **해석만** 얹는다 — 값 변경 불가

*MIT License · [github.com/fivetaku/insane-design](https://github.com/fivetaku/insane-design)*
