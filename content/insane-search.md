# Insane Search 🔍

> **"WebFetch가 막혀도 우회한다 — 1,858개 사이트 접근 전략"**

Insane Search는 WebFetch가 차단되거나 소셜 미디어·한국 플랫폼 등 직접 접근이 어려운 사이트에서 데이터를 가져오는 **우회 접근 전략 스킬**입니다. X/Twitter, Reddit, YouTube, 네이버 블로그 등 다양한 플랫폼에 최적화된 접근법을 제공합니다.

---

## 🚀 지원 플랫폼

### 소셜 미디어
| 플랫폼 | 방법 |
|--------|------|
| X/Twitter | Syndication API + oEmbed |
| Reddit | JSON API (`.json` + Mobile UA) |
| Bluesky | AT Protocol 공개 API |
| Mastodon | 인스턴스별 공개 API |
| Threads | Jina Reader |

### 미디어/영상 (1,858개 사이트)
| 플랫폼 | 방법 |
|--------|------|
| YouTube | yt-dlp (자막/메타/검색/댓글) |
| TikTok / Vimeo / Twitch | yt-dlp |
| 네이버 TV / Chzzk / Soop | yt-dlp |
| SBS / JTBC / Kakao TV | yt-dlp |

### 개발/기술
| 플랫폼 | 방법 |
|--------|------|
| GitHub | gh CLI / REST API |
| Hacker News | Firebase JSON API |
| Stack Overflow | SE API v2.3 |
| arXiv | Atom API |
| npm / PyPI | Registry JSON API |

### 한국 플랫폼
| 플랫폼 | 방법 |
|--------|------|
| 네이버 블로그 | 모바일 URL + iPhone UA |
| 클리앙 / 루리웹 / 뽐뿌 | Jina Reader |
| 긱뉴스 / 브런치 | Jina Reader |
| 요즘IT / 디시인사이드 / 에펨코리아 | 모바일 curl (특수 처리) |
| 벨로그 | RSS (`v2.velog.io/rss/@{user}`) |

---

## 🛠️ 빠른 사용법

**자동 트리거 조건:**
- WebFetch가 402/403/blocked 반환 시
- 소셜 미디어 또는 개발자 플랫폼 접근 시
- 영상/오디오/자막 추출 필요 시

```prompt
이 트윗 내용 가져와줘 → https://x.com/...
```

```prompt
이 유튜브 영상 자막 뽑아줘 → https://youtube.com/watch?v=...
```

```prompt
이 레딧 스레드 요약해줘 → https://reddit.com/r/...
```

**범용 명령어:**
```bash
# Jina Reader (범용 웹)
curl -s "https://r.jina.ai/{URL}"

# YouTube 자막 추출
yt-dlp --write-sub --sub-lang "ko,en" --skip-download "URL"

# Reddit JSON
curl -sL -H "User-Agent: Mozilla/5.0 (iPhone...)" "https://reddit.com/r/{sub}/hot.json"
```

---

## 💡 접근 전략 우선순위

1. **플랫폼 인덱스 확인** → 최적 방법 즉시 실행
2. **인덱스에 없는 사이트** → WebFetch → Jina Reader → Fallback 순 시도
3. **미디어 사이트** → yt-dlp `--dump-json` (1,858개 사이트 지원)

*MIT License · [github.com/fivetaku/insane-search](https://github.com/fivetaku/insane-search)*
