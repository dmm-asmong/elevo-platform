# k-skill — 한국 실생활·공공·업무를 위한 125+ 종합 스킬 모음 🇰🇷

> **원본**: [github.com/NomaDamas/k-skill](https://github.com/NomaDamas/k-skill)  
> **제작자**: NomaDamas  
> **지원 에이전트**: Claude Code, Codex, OpenCode, OpenClaw/ClawHub 등  
> **라이선스**: MIT (일부 프록시 패키지 AGPL-3.0)  

---

## 🚀 개요

> **"한국인인가요? 이 스킬 모음집을 다운로드 받아 두세요. 언젠가 무조건 쓸 때가 옵니다!"**

**k-skill**은 KTX, KBO, 로또, 당근마켓, 쿠팡, 정부24, 국세청 홈택스, HWP 한글 문서 처리 등 한국 사용자가 일상과 업무에서 마주치는 수많은 귀찮은 일들을 AI 코딩 에이전트(Claude Code 등)가 직접 처리할 수 있도록 돕는 **한국형 종합 스킬 컬렉션**입니다.

총 **125개 이상의 전문 스킬**이 포함되어 있으며, 별도의 복잡한 공공데이터 API 키 발급 없이도 공개 API 프록시(`k-skill-proxy`)를 통해 손쉽게 호출할 수 있도록 설계되었습니다.

---

## 📦 12가지 카테고리별 주요 기능 (125+ 스킬)

### 1. 🚉 이동 · 교통 · 여행
* **철도 통합 시간표 조회 (`railway-timetable`)**: KTX 코레일 공식 계획 시간표 실시간 조회
* **고속/시외버스 예매 지원 (`express-bus-booking`, `intercity-bus-booking`)**: KOBUS 및 티머니 배차·잔여좌석·요금 조회
* **대중교통 & 카카오맵 길찾기 (`korean-transit-route`, `kakao-map`)**: 지하철+버스 최적 경로, 예상 택시비, 내비게이션 소요시간 계산
* **서울 지하철 도착 & 따릉이 (`seoul-subway-arrival`, `seoul-bike`)**: 실시간 지하철 도착 정보 및 따릉이 대여소별 잔여 대수
* **주유소 & 전기차 충전소 (`cheap-gas-nearby`, `ev-charger-nearby`)**: 내 위치 주변 최저가 주유소 및 실시간 급속/완속 충전기 현황
* **기타**: 마이리얼트립 검색, 숲나들e 자연휴양림 빈 객실, 서울 주요 핫스팟 혼잡도, 고속도로 CCTV/교통량

### 2. 🏠 부동산 · 주택
* **부동산 실거래가 조회 (`real-estate-search`)**: 국토부 아파트, 오피스텔, 빌라, 단독주택 매매 및 전월세 실거래가
* **공시가격 & 개별공시지가 (`housing-official-price`, `gongsijiga-search`)**: 공동주택 공시가격 및 지번별 다년도 공시지가 추이
* **건축물대장 조회 (`building-register-search`)**: 주소 및 지번 기반 건축물 주용도, 연면적, 사용승인일 확인
* **LH & SH 청약 공고문 (`lh-notice-search`, `sh-notice-search`)**: 임대/분양/신혼희망타운 최신 공고문 및 마감 일정
* **법원 경매 공고 (`court-auction-notice-search`)**: 대법원 법원경매 매각기일, 감정평가액, 최저매각가격 및 물건 상세
* **당근 부동산 (`daangn-realty-search`)**: 동네 기반 원룸, 투룸, 전월세 직거래 매물 탐색

### 3. ⚖️ 법률 · 공공 · 행정
* **한국 법령 검색 (`korean-law-search`)**: 대한민국 현행 법령, 조문, 대법원 판례, 유권해석 검색
* **한국 특허 검색 (`korean-patent-search`)**: 키워드 기반 특허 및 실용신안 출원 번호 및 공개 전문 확인
* **개인정보처리방침 & 약관 자동 생성 (`korean-privacy-terms`)**: 국내 법률(개인정보보호법, 전자상거래법) 기준 약관 및 쿠키 모달 생성
* **인터넷등기소 등기부등본 (`iros-registry-automation`)**: 법인 및 부동산 등기부등본 열람·발급 흐름 보조
* **지급명령 신청 보조 (`court-payment-order-assistant`)**: 전자소송 지급명령 신청 서류 및 청구원인 초안 작성

### 4. 🏢 사업 · 상권 · 세무
* **사업자등록정보 진위확인 (`nts-business-registration`)**: 국세청 사업자등록 상태(계속사업자/휴업/폐업) 실시간 확인
* **사업자 실사 종합 리포트 (`biz-health-check`)**: 국세청 상태 + 국민연금 가입자 + 체납 여부 + 금융위 법인 개요 교차 검증
* **국민연금 가입 사업장 (`national-pension-workplace`)**: 기업별 가입자 수 추이, 평균 급여 수준 추정
* **동네 상권 인허가 상태 (`localdata-business-status`, `store-longevity-radar`)**: 208개 업종의 영업/폐업 현황 및 장수 점포 분석
* **팝빌 세금계산서 연동 (`popbill`)**: 전자세금계산서 발행, 홈택스 수집, 계좌 조회 BYOK 호출

### 5. 🏛️ 정부지원 · 조달
* **K-Startup & 정부지원 전수조사 (`kstartup-search`, `government-support-survey`)**: 창업진흥원, 기업마당, NIPA 지원사업 공고 통합 검색
* **나라장터 발주계획 & 부정당제재 (`g2b-order-plan-search`, `g2b-sanctioned-supplier`)**: 공공 조달 발주 계획 및 입찰 참가자격 확인
* **국방전자조달(D2B) & 학교장터(S2B) (`d2b-notice-search`, `s2b-notice-search`)**: 분야별 입찰 공고문 실시간 모니터링

### 6. 📈 금융 · 투자 · 경제통계
* **한국 주식 & 시세 조회 (`korean-stock-search`)**: KRX 코스피/코스닥 종목 검색 및 일별 시세
* **금감원 DART 전자공시 (`k-dart`)**: 사업보고서, 재무제표, 유상증자/감자, 배당 등 14개 공시 엔드포인트
* **한국은행 ECOS & 통계청 KOSIS (`bok-ecos-stats`, `kosis-stats`)**: 기준금리, 환율, 소비자물가지수, 국가 통계 데이터 조회

### 7. 🛒 쇼핑 · 가격비교 · 택배
* **쿠팡 상품 검색 (`coupang-product-search`)**: 로켓배송 필터, 골드박스 특가, 가격대별 최저가 비교
* **네이버 쇼핑 & 다나와 (`naver-shopping-search`, `danawa-price-search`)**: 실구매가(배송비/카드할인 포함) 및 가격비교
* **당근마켓 & 번개장터 (`daangn-used-goods-search`, `bunjang-search`)**: 지역 기반 중고 매물 검색 및 찜/가격 추적
* **택배 배송 조회 (`delivery-tracking`)**: CJ대한통운, 우체국 택배 송장번호 실시간 이동 경로 추적

### 8. 📄 한국형 문서(HWP) 및 텍스트 도구
* **HWP/HWPX 조회 및 변환 (`hwp`)**: 아래아한글 문서를 Markdown 및 JSON으로 변환, 양식 데이터 추출
* **HWP 문서 직접 편집 (`rhwp-edit`)**: WASM 엔진을 이용해 한글 파일의 본문 수정, 표 셀 값 변경, 텍스트 일괄 치환
* **한국어 맞춤법 검사 (`korean-spell-check`)**: 국립국어원 규칙 기반 맞춤법 교정
* **한국어 AI 윤문 (`korean-humanizer`)**: AI 특유의 어색한 번역체와 상투어를 자연스러운 한국어 문체로 변환

### 9. 🎭 여가 · 스포츠 · 생활
* **영화관 상영시간표 (`korean-cinema-search`)**: CGV, 롯데시네마, 메가박스 잔여 좌석 및 시간표
* **스포츠 경기 결과 (`kbo-results`, `kleague-results`, `kbl-results`, `lck-analytics`)**: 프로야구, K리그, 프로농구, LCK 밴픽 및 순위
* **로또 6/45 당첨 확인 (`lotto-results`)**: 역대 당첨 번호, 내 번호 자동 대조
* **사주 운세 & 작명소 (`saju-fortune`, `naming-house`)**: 생년월일시 기반 사주오행 및 성명학 풀이

---

## 🛠️ 설치 및 설정 방법

### 방법 1. Claude Code 플러그인 마켓플레이스로 설치 (가장 추천)

Claude Code 터미널에서 명령어 2줄로 전체 스킬을 설치할 수 있습니다:

```bash
/plugin marketplace add NomaDamas/k-skill
/plugin install k-skill@k-skill
```

설치 후에는 `/k-skill:<스킬이름>` 형식으로 실행할 수 있습니다. (예: `/k-skill:lotto-results`)

---

### 방법 2. `skills` CLI로 설치

```bash
# 전체 125개 스킬 한 번에 설치
npx --yes skills add NomaDamas/k-skill --all -g

# 원하는 특정 스킬만 골라서 설치 (예: 지하철 도착 정보)
npx --yes skills add NomaDamas/k-skill --skill seoul-subway-arrival -g

# 철도 시간표 스킬 설치
npx --yes skills add NomaDamas/k-skill --skill railway-timetable -g
```

---

### 방법 3. 초기 설정 및 환경 확인

설치가 끝난 후 공통 셋업 스킬을 실행하면 필요한 환경변수와 권한을 자동으로 점검해 줍니다:

```bash
k-skill-setup
```

---

## 💡 실전 프롬프트 예시

### 🚇 출퇴근 및 대중교통
```prompt
"지금 강남역 2호선 홍대입구 방면 열차 몇 분 뒤에 도착해?"
"내일 아침 8시 서울역에서 부산역 가는 KTX 시간표 확인해줘."
```

### 🏠 부동산 & 정부 지원
```prompt
"서울 마포구 공덕동 일대 전용 84㎡ 아파트 최근 3개월 실거래가 추이 정리해줘."
"올해 마감 안 된 청년 창업지원사업(K-Startup) 리스트 뽑아줘."
```

### 📑 업무 & HWP 문서 편집
```prompt
"contracts/견적서.hwp 파일에서 '단가' 열의 값을 확인하고, 공급가액을 10% 인하된 금액으로 수정해줘."
"이 사업계획서 텍스트에서 AI 번역투를 제거하고 공공기관 제출용 자연스러운 한국어 문체로 다듬어줘."
```

### 🛒 실생활 & 쇼핑
```prompt
"쿠팡에서 로켓배송 가능한 24인치 IPS 모니터 가성비 상위 3개 비교해줘."
"이번 주 로또 1등 번호 알려주고 내가 산 번호 [3, 12, 19, 25, 33, 41] 맞는지 확인해줘."
```
