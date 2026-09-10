# M3E Canvas — 브라우저에서 Material 3 Expressive UI를 스케치하고 바이브코딩 프롬프트로 변환

> **원본**: [github.com/lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas)  
> **제작자**: lnkiai  
> **라이브 데모**: [lnkiai.github.io/m3e-canvas](https://lnkiai.github.io/m3e-canvas/)  
> **스택**: Next.js 16 · React 19 · TypeScript  
> **라이선스**: MIT

---

## 개요

**M3E Canvas**는 브라우저에서 **Material 3 Expressive** 디자인 가이드라인에 맞는 모바일/데스크탑 화면을 드래그 앤 드롭으로 설계하고, 완성된 디자인을 **AI 코딩 도구용 프롬프트**로 즉시 변환하는 도구입니다.

> 화면을 스케치하고 → 테마를 조정하고 → 프롬프트를 복사해서  
> Claude Code, Codex, Gemini CLI, Cursor 등에 붙여넣으면 **앱이 완성**됩니다.

백엔드가 없으며, 모든 데이터는 브라우저 localStorage에 저장됩니다.

---

## 핵심 기능

### 1. 드래그 앤 드롭 UI 파트

| 카테고리 | 파트 목록 |
|----------|----------|
| 버튼류 | 버튼, 아이콘 버튼, FAB, 스플릿 버튼, FAB 메뉴, 토글 버튼 |
| 내비게이션 | 앱 바, 내비게이션 바, 플로팅 툴바, 탭, 검색 바 |
| 컨텐츠 | 카드, 리스트, 다이얼로그, 스낵바, 텍스트, 이미지, 카메라/지도 플레이스홀더 |
| 입력 | 텍스트 필드, 드롭다운, 스위치, 체크박스, 라디오 버튼, 슬라이더, 칩 |
| 기타 | 뱃지, 박스, 구분선, 로딩 인디케이터, 프로그레스 바 |

### 2. 마그네틱 연결

버튼이나 리스트 아이템을 가까이 드래그하면 **자동으로 하나의 그룹으로 결합**되며, 모서리가 부드럽게 연결됩니다.

### 3. 멀티 스크린 & 네비게이션

- **폰 화면** (412×892) · **데스크탑 화면** (1280×800) 모두 지원
- 화면 간 **탭 내비게이션** 설정 (슬라이드 4방향, 페이드, 확대, 없음)
- **스와이프 내비게이션** 설정 (프리뷰에서 실제 손가락 추적)
- 같은 이름의 화면은 프롬프트에서 **하나의 화면 두 가지 너비**로 표현
- 캔버스에 **화살표**로 화면 간 흐름을 시각화

### 4. 테마 시스템 (M3 Expressive 4축)

| 축 | 옵션 |
|----|------|
| **Color** | 7가지 프리셋 또는 시드 색상 → Material 3 스킴 자동 생성, 라이트/다크, 3단계 대비, 다이나믹 컬러 |
| **Shape** | Square · Rounded · Full 코너 |
| **Type** | Roboto · Roboto Flex · Roboto Serif · System, 강조 스타일 |
| **Motion** | Standard · Expressive 스프링 스킴 |

### 5. 프롬프트 출력

- 전체 디자인 또는 개별 화면을 **자연어 프롬프트**로 변환
- **한국어** · 영어 · 일본어 · 중국어 지원
- **Android** 또는 **Web** 타겟 선택 시 해당 스택에 맞는 프롬프트 생성
- 수동 편집 후 복사 가능

### 6. AI 도우미 (선택 사항)

- OpenAI · Claude · Gemini · DeepSeek API 키를 입력하면 파트별 설명을 AI가 자동 작성
- API 키는 브라우저에만 저장, 서버 중개 없이 직접 요청

---

## 🛠️ 사용 방법

### 온라인 사용 (권장)

[lnkiai.github.io/m3e-canvas](https://lnkiai.github.io/m3e-canvas/) 접속 → 바로 사용 시작

### 로컬 개발 환경

```bash
git clone https://github.com/lnkiai/m3e-canvas.git
cd m3e-canvas
npm install
npm run dev        # http://localhost:3000
npm run build      # ./out 에 정적 내보내기
```

### 워크플로우

```
1. 화면 추가     → 폰/데스크탑 화면 생성
2. 파트 배치     → 드래그 앤 드롭으로 UI 구성
3. 네비게이션    → 파트에 이동 대상 화면 & 전환 효과 설정
4. 테마 조정     → 색상·모양·타이포·모션 조정
5. Tidy 버튼     → 바를 가장자리에, FAB를 코너에, 나머지를 16dp 마진에 정렬
6. 프롬프트 복사  → 한국어/영어 프롬프트를 AI 코딩 도구에 붙여넣기
```

---

## ⌨️ 단축키

| 키 | 동작 |
|----|------|
| `V` / `H` | 선택 / 핸드 도구 (`Space` 누르면 팬) |
| 휠, `Ctrl`+휠 | 팬, 줌 |
| `+` `-` `0` | 줌 인, 줌 아웃, 맞춤 |
| `Ctrl+Z` / `Ctrl+Shift+Z` | 실행 취소 / 다시 실행 |
| `Ctrl+D` | 복제 |
| 방향키 (`Shift` = 8dp) | 미세 조정 |
| `Ctrl` + 드래그 | 스냅 없이 이동 |
| `Delete` | 파트 또는 화면 삭제 |
| `P` | 프리뷰 |

---

## 🤖 AI 에이전트 연동 (agent.md)

M3E Canvas는 **AI 에이전트가 디자인을 자동 생성**할 수 있는 JSON 포맷(agent.md)을 제공합니다:

1. 에이전트가 JSON 문서를 작성하고
2. zlib으로 압축 → base64url 인코딩한 공유 링크를 생성하면
3. 사용자가 링크를 열어 디자인을 캔버스에서 수정 후 프롬프트로 변환

```js
// Node.js로 공유 링크 생성
import { readFileSync } from "node:fs";
import { deflateRawSync } from "node:zlib";
const json = readFileSync("design.json", "utf8");
console.log("https://lnkiai.github.io/m3e-canvas/#docz=" +
  deflateRawSync(json).toString("base64url"));
```

---

## 💡 활용 사례

1. **바이브코딩 시작점**: UI를 시각적으로 설계한 뒤 프롬프트로 변환해 AI가 코드 생성
2. **Material 3 Expressive 학습**: 최신 구글 디자인 가이드라인을 직접 실험
3. **프로토타이핑**: 빠르게 화면 흐름을 설계하고 탭해서 확인
4. **디자이너-개발자 협업**: 디자인을 프롬프트로 변환해 정확한 의도 전달

---

## 📤 내보내기 옵션

- **프롬프트 복사**: 편집 가능한 자연어 프롬프트 (한/영/일/중)
- **PNG 저장**: 개별 화면을 이미지로 내보내기
- **공유 링크**: 디자인을 URL로 공유 (서버 불필요)
- **JSON 프로젝트**: 프로젝트 파일 열기/저장

*MIT License · [github.com/lnkiai/m3e-canvas](https://github.com/lnkiai/m3e-canvas)*
