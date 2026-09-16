# 4회차 워크시트 — GitHub·Vercel 가입 & 배포 체크리스트

## 1. Vercel 가입하기

Vercel은 GitHub에 올린 파일을 주소 하나(`https://프로젝트이름.vercel.app`)로 바꿔주는 배포 서비스다. **오늘은 반드시 GitHub 계정으로 가입한다** — 이메일로 가입하면 어차피 나중에 GitHub을 다시 연결해야 하고, 로그인할 때마다 계정 확인 절차를 거치게 된다.

1. 브라우저에서 오늘 쓸 GitHub 계정으로 로그인된 상태인지 먼저 확인한다.
2. `vercel.com/signup`을 열고 **GitHub으로 계속하기(Continue with GitHub)**를 선택한다.

   ![Vercel 첫 가입 화면](/images/vibe-coding-codex/session-04/vercel-01.png)

3. GitHub 인증 화면에서 **지금 로그인된 계정이 맞는지** 확인한 뒤 승인한다.

   ![GitHub 인증 승인 화면](/images/vibe-coding-codex/session-04/vercel-02.png)

4. 저장소 접근 범위를 고르는 화면이 나오면 **`Only select repositories`**를 선택하고 `본인프로젝트명-codex` 저장소만 체크한다. (`All repositories`는 고르지 않는다 — 필요한 저장소만 열어주는 것이 기본이다)
5. 이름·사용자 이름을 입력한다. 영문 소문자·숫자·하이픈으로 짧게 짓는다.
6. 플랜 선택 화면에서 **Hobby(무료)**를 고른다. 카드 정보를 입력하라는 화면이 나오면 잘못 들어온 것이니 뒤로 가서 Hobby를 다시 고른다.

   ![Vercel 플랜 선택 화면](/images/vibe-coding-codex/session-04/vercel-03.png)

7. 프로젝트 목록 화면이 뜨면 가입 완료. **"저장소를 가져오라(Import)"는 화면이 보여도 아직 누르지 않는다** — 배포는 수업 진행 순서에 맞춰 한다.

### 가입 확인

- [ ] Vercel 대시보드(프로젝트 목록)가 열린다.
- [ ] 오른쪽 위 프로필 → `Settings` → `Authentication`에 GitHub 연결이 표시된다.
- [ ] 내 플랜이 `Hobby`이고, 카드 정보를 입력한 적이 없다.

### 무료 Hobby 플랜, 알아둘 것

| 항목 | 내용 |
|---|---|
| 프로젝트 개수 / 하루 배포 횟수 | 200개 / 100회 — 실습에는 충분 |
| 배포 주소 공개 범위 | `.vercel.app` 주소는 **주소를 아는 사람은 누구나 열 수 있다** — 배포 전 개인정보·API 키 점검 필수 |
| 상업적 사용 | **비상업적 개인 사용만 허용.** 결제, 상품 판매, 광고, 유료 호스팅 대행에는 쓸 수 없다. 나중에 수강생 모집·강의 판매 페이지를 만들 때는 Pro 플랜이 필요하다 |
| 파일명 규칙 | Vercel은 `index.html`을 강제하지 않는다. 다른 이름이어도 `주소/파일명.html`로 접속하면 정상 배포된다 |

---

## 2. 배포 검증 체크리스트

### 계정·설치·보안

- [ ] GitHub 이메일이 `Verified` 상태다.
- [ ] Codex에서 `git --version`이 버전 번호를 출력한다. (설치했다면 앱을 재시작한 뒤 확인)
- [ ] 공개 저장소에 `.env`, API 키, 비밀번호, 개인정보 파일이 없다.

### GitHub 웹 수동 업로드

- [ ] `본인프로젝트명-manual` 저장소가 `Public`이다.
- [ ] 저장소에 `index.html`, `README.md`가 있다.
- [ ] 두 파일의 실제 내용을 GitHub 웹에서 확인했다.

### Codex Cloud GitHub 연결

- [ ] `Connect GitHub`에서 올바른 계정을 선택했다.
- [ ] `본인프로젝트명-manual` 저장소만 접근 허용했다.
- [ ] Codex 환경에서 저장소 이름과 파일 목록을 확인했다.

### Codex 요청 업로드

- [ ] `본인프로젝트명-codex` 빈 저장소를 웹에서 먼저 만들었다. (README·.gitignore·License 선택 안 함)
- [ ] 현재 폴더가 `본인프로젝트명-codex`인지 확인했다.
- [ ] 파일·비밀정보·Git 상태·인증 상태를 먼저 점검했다.
- [ ] 기존 저장소나 `origin`을 덮어쓰지 않는 계획인지 확인했다.
- [ ] 연결 대상 주소가 내 `-codex` 저장소 주소인지 확인하고 승인했다.
- [ ] Codex 완료 보고 뒤 GitHub 웹에서 소유자·브랜치·커밋·파일을 확인했다.

### Vercel 첫 배포

- [ ] Vercel에서 `본인프로젝트명-codex` 저장소를 Import했다.
- [ ] Framework Preset은 정적 HTML에 맞는 기본값으로 두었다.
- [ ] 배포 URL을 열면 `index.html` 화면이 보인다.

### 자동 재배포

- [ ] `index.html` 문구 한 곳을 수정했다.
- [ ] 로컬 실행과 diff를 사람이 확인했다.
- [ ] 확인한 변경만 Codex로 Commit 후 Push했다.
- [ ] Vercel Deployments에 새 배포가 생겼다.
- [ ] 같은 라이브 URL에서 수정 문구가 보인다.

### 복구

- [ ] 되돌릴 커밋 ID와 변경 파일을 확인했다.
- [ ] Codex의 `git revert` 계획을 검토한 뒤 승인했다.
- [ ] Revert 커밋을 main에 Push했다.
- [ ] Vercel 새 배포 후 라이브 URL이 정상 동작한다.

### 최종 제출

- [ ] GitHub `-manual` 저장소 URL: ___________________________
- [ ] GitHub `-codex` 저장소 URL: ___________________________
- [ ] Vercel 라이브 URL: ___________________________
