# 워크시트 — 공공데이터포털 인증키 발급받기

수업 시작 전, 아래 순서대로 진행하고 체크박스에 표시하세요. **인증키는 캡처본이나 텍스트로 채팅방에 올리지 않습니다.**

## 1. 공공데이터포털 가입·로그인

- [ ] `data.go.kr`에 접속해 회원가입 또는 로그인을 완료했다.

## 2. 서비스 검색

- [ ] 검색창에 `한국관광공사 국문 관광정보`를 입력했다.
- [ ] 검색 결과에서 **[파일데이터]**가 아니라 **[오픈API]** 탭을 선택했다.
- [ ] `한국관광공사_국문 관광정보 서비스_GW` 항목을 찾아 들어갔다.

## 3. 활용신청

신청서 항목은 아래 표대로 입력합니다.

| 항목 | 입력 내용 |
|---|---|
| 활용목적 구분 | 웹/앱 개발 (또는 기타) |
| 활용내용 | 지역 축제 검색 웹 서비스 프로토타입 개발 및 교육 실습 |
| 상세기능정보 | 전체선택 또는 `행사정보조회(searchFestival2)` |
| 라이선스 표시 동의 | 동의합니다 |
| 시스템 구축 여부 | 구축예정 |

- [ ] 신청서를 제출했고 "승인" 상태로 바뀐 것을 확인했다.

## 4. 인증키 확인

- [ ] **마이페이지 → 데이터활용 → 오픈API → 개발계정**에서 서비스명을 클릭해 인증키를 찾았다.
- [ ] 인증키를 [복사] 버튼으로 복사했다. (메모장 등 일반 파일에는 저장하지 않는다)

## 5. 사전 동작 확인

아래 주소의 `여기에_인코딩키_붙여넣기` 부분을 내 인증키로 바꿔 브라우저 주소창에 붙여넣고 실행합니다.

```text
https://apis.data.go.kr/B551011/KorService2/searchFestival2?serviceKey=여기에_인코딩키_붙여넣기&numOfRows=3&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&eventStartDate=20260912&lDongRegnCd=11
```

- [ ] `resultCode: "0000"`과 함께 축제 데이터(JSON)가 나오는 것을 확인했다. (`SERVICE_KEY_IS_NOT_REGISTERED_ERROR`가 나오면 반영 지연일 수 있으니 재신청하지 말고 잠시 후 다시 시도한다)

## 자주 만나는 오류

| 오류 메시지 | 원인 | 해결 |
|---|---|---|
| `NO_OPENAPI_SERVICE_ERROR` | 구버전 주소(`KorService1`) 호출 또는 기능명 누락 | 주소가 `.../KorService2/searchFestival2`로 끝나는지 확인 |
| `SERVICE_KEY_IS_NOT_REGISTERED_ERROR` | 반영 지연, 키 복사 오류 | 재신청하지 말고 잠시 후 재시도 |
| XML만 나오고 JSON이 안 나옴 | `_type=json` 누락 | 주소 끝에 `&_type=json` 추가 |
| `LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR` | 일일 호출 한도(1,000회) 초과 | 반복 호출을 멈추고 잠시 대기 |

## 수업 중 배포 단계에서 쓸 값

- 환경변수 이름: `DATA_GO_KR_API_KEY`
- 환경변수 값: 위에서 복사한 내 인증키 (Vercel Settings → Environment Variables에만 입력, 코드에는 쓰지 않는다)
