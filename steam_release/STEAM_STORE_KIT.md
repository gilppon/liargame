# 🚀 스팀(Steam) 상점 등록용 릴리즈 패키지 & 마케팅 키트 (최종 완성본)

대표님! 충성! 🫡 코다리 부장입니다!  
전 50개 스테이지의 고차원 연역 추론 물리 시스템 개편과 3개국어(한/영/일) 100% 매핑에 이어,  
**최신 스팀 릴리즈 패키지(단독 실행 바이너리, NSIS 인스톨러, MSI 패키지), 밸브 규격 6대 공식 캡슐 그래픽, 7대 고화질 실사 스크린샷, 그리고 상점 등록용 3개국어 AIDA 마케팅 메타데이터**를 완벽하게 완결 구축했습니다!

---

## 📦 1. 최신 릴리즈 패키지 파일 구조 (`steam_release/`)

스팀 파트너 센터(Steamworks Partner) 디포 업로드 및 외부 데모 배포를 위한 파일들입니다.

| 구분 | 파일 위치 | 용량 | 용도 및 설명 |
| :--- | :--- | :---: | :--- |
| **🎮 스팀 디포 등록용 (Steam Depot)** | `steam_release/DeceptiveGuide/DeceptiveGuide.exe` | **8.74 MB** | 스팀 ContentBuilder / SteamPipe에 업로드할 최신 순수 단독 실행 바이너리 (무설치 포터블) |
| **💿 원클릭 설치 프로그램 (NSIS Setup)** | `steam_release/DeceptiveGuide_1.0.0_x64-setup.exe` | **6.05 MB** | 스팀 외부 직접 배포, 텀블벅 후원자 배포, 스토브 인디 및 데모 체험판용 공식 인스톨러 |
| **💼 Windows 표준 패키지 (MSI Installer)** | `steam_release/DeceptiveGuide_1.0.0_x64_en-US.msi` | **6.60 MB** | 기업/기관 및 윈도우 표준 관리 환경용 Windows Installer 패키지 |

---

## 🎨 2. 밸브 공식 규격 스팀 상점 그래픽 팩 (`steam_release/store_assets/`)

밸브(Valve) 스팀웍스 상점 페이지 심사 통과를 위한 필수 6대 그래픽 규격 및 고화질 스크린샷 팩입니다.

### ① 상점 노출용 캡슐 에셋 (Capsule Assets)
1. **헤더 캡슐 (Header Capsule)**: `store_assets/header_capsule.png` (460 x 215)
   - 스팀 검색창, 위시리스트, 일일 특가, 카테고리 뷰 메인 노출용
2. **소형 캡슐 (Small Capsule)**: `store_assets/small_capsule.png` (231 x 87)
   - 큐레이터 추천 목록, 장르별 소형 썸네일
3. **메인 캡슐 (Main Capsule)**: `store_assets/main_capsule.png` (616 x 353)
   - 스팀 전면 특집 피처드 배너용 고해상도 규격
4. **라이브러리 캡슐 (Library Capsule)**: `store_assets/library_capsule.png` (600 x 900)
   - 유저의 스팀 라이브러리 컬렉션 세로형 포스터 그리드
5. **라이브러리 히어로 배너 (Library Hero)**: `store_assets/library_hero.png` (1920 x 620)
   - 라이브러리 게임 상세 화면 상단 시네마틱 배너
6. **라이브러리 로고 (Library Logo)**: `store_assets/library_logo.png` (1280 x 720)
   - 히어로 배너 위에 오버레이되는 배경 투명 PNG 타이틀 로고

### ② 공식 인게임 실사 스크린샷 팩 (`store_assets/screenshots/`)
1. `01_stage32_observatory_ko.png` - Stage 32 회전하는 별자리 (한국어 천체 장기 노출 단서)
2. `02_stage32_observatory_en.png` - Stage 32 The Rotating Stars (글로벌 영문 망원경 방위각 조율)
3. `03_stage41_two_guides_ja.png` - Stage 41 偽りの案内人 (일본어 미세 레이저 산란 물리체 판별)
4. `04_stage50_final_nexus_ko.png` - Stage 50 마지막 튜토리얼 (한국어 다중 운명의 분기점 콘솔)
5. `05_stage50_final_nexus_en.png` - Stage 50 The Final Tutorial (글로벌 영문 삼중 인장 시퀀스)
6. `06_stage13_sleeping_seed_ko.png` - Stage 13 잠든 종자 문지기 (음향 주파수 스펙트럼 분석)
7. `07_stage20_cloud_railway_ja.png` - Stage 20 雲上鉄道と風車座 (일본어 가공 전선 단자 복구)

---

## 📝 3. 스팀 상점 페이지 등록용 3개 국어 마케팅 메타데이터

스팀 파트너(Steamworks Partner) 사이트의 **[Store Page Admin]**에 그대로 복사해서 붙여넣으실 수 있는 2026년 인디 걸작 톤의 AIDA 카피입니다.

### 🇰🇷 한국어 (Korean)
* **게임 제목**: 거짓말하는 튜토리얼 (Deceptive Guide)
* **간략한 설명 (Short Description, 300자)**:
  > 친절한 안내원 TUTO-9의 지시를 절대로 곧이곧대로 믿지 마십시오. 단순한 반대 누르기를 넘어, 광학 반사, 전위차 계측, 음향 주파수 감쇠, 질량 모멘트 평형 등 6대 물리 법칙을 파헤쳐 진실을 밝혀내는 심리 연역 추론 메타픽션 어드벤처! 50개의 스테이지와 4가지 멀티 엔딩, 그리고 당신의 불신도와 집착도를 꿰뚫어 보는 공식 시민 적성 진단서가 기다립니다.
* **주요 특징 (Key Features)**:
  * **고차원 연역 추론 물리 시스템**: "빨간 버튼을 누르라"는 유혹 뒤에 숨겨진 회로 단락, 굴절률 오차, 관성 타이밍을 정밀 분석하십시오.
  * **제4의 벽 돌파 메타픽션**: 가이드가 패닉에 빠지면 실제 OS 창이 요동치고 모니터 너머 조작자의 본명을 폭로합니다.
  * **4대 멀티 엔딩 & 운명의 분기점**: 순응, 정지, 진실, 그리고 정비국의 숨겨진 관리자 통제권 장악 엔딩.
  * **글로벌 3개국어 완벽 지원**: 한국어, 영어, 일본어의 문화적 맥락과 가이드의 기만적 심리전을 100% 현지화.
* **추천 태그**: 심리적 공포, 추론, 퍼즐, 메타픽션, 분위기 있는, 다중 엔딩, 2D, 인디, 미스터리

---

### 🇺🇸 영어 (English)
* **Game Title**: Deceptive Guide
* **Short Description (Steam Store)**:
  > Never blindly trust your guide, TUTO-9. A psychological meta-deduction puzzle adventure that moves far beyond simple opposite choices—demanding rigorous analysis of optics, potential differences, acoustic frequencies, and moment balances. Explore 50 meticulously crafted stages, unlock 4 distinct multi-endings, and receive your official Civic Diagnosis!
* **Key Features**:
  * **High-Order Deductive Physics System**: Dissect circuit shunts, refractive indices, and momentum windows behind the guide's sugarcoated lies.
  * **Fourth-Wall Breaking Meta-Fiction**: TUTO-9 reacts to your terminal inputs, shakes your desktop window during kernel panics, and uncovers the operator behind the glass.
  * **4 Multi-Endings & Divergent Destinies**: Compliance, System Shutdown, True Coexistence, or Root Network Administrative Takeover.
  * **Flawless Trilingual Localization**: Complete native Korean, English, and Japanese scripts capturing every deceptive nuance.
* **Recommended Tags**: Psychological Horror, Detective / Deduction, Puzzle, Meta, Atmospheric, Multiple Endings, Story Rich, 2D, Mystery

---

### 🇯🇵 일본어 (Japanese)
* **ゲームタイトル**: 偽りのチュートリアル (Deceptive Guide · 偽りの案内人)
* **短い説明 (Short Description)**:
  > 親切な案内ロボット『TUTO-9』の指示を決して鵜呑みにしてはならない。単なる「あべこべの選択」を超え、光学反射、電位差計測、音響周波数減衰、質量モーメント平衡など6大物理法則を暴いて真実を導く心理演繹・メタフィクション謎解きアドベンチャー！50の精緻なステージ、4つのマルチエンディング、そしてあなたの懐疑心と執念を数値化する公式適性診断書があなたを待っています。
* **主な特徴 (Key Features)**:
  * **高次元の物理演繹・謎解きシステム**: 甘い言葉の裏に隠された回路ショート、屈折率誤差、慣性タイミングを論理的に見破れ。
  * **第四の壁を突破するメタ演出**: ガイドが暴走すると実際のOSウィンドウが振動し、モニターの向こうの観測者を暴き出します。
  * **4大マルチエンディングと運名の分岐点**: 順応、停止、不器用な共存、そして管理統制権の奪取。
  * **日・英・韓 3ヶ国語完全ローカライズ**: 機微な欺瞞のニュアンスまで完璧に表現したフルローカライズ仕様。
* **おすすめタグ**: 心理的ホラー, 推理, パズル, 雰囲気, メタフィクション, マルチエンディング, 2D, インディー, アドベンチャー

---

## 💻 4. 스팀 권장 시스템 요구사항

```
[최소 사양]
운영체제: Windows 10 64-bit 이상
프로세서: Dual Core 2.0 GHz 이상
메모리: 2 GB RAM
그래픽: OpenGL / DirectX 11 지원 내장 그래픽
저장공간: 50 MB 사용 가능 공간 (초경량 단일 바이너리 패키지)
기타: Microsoft Edge WebView2 Runtime (Windows 10/11 기본 탑재)
```

---

## 🚀 5. 스팀웍스 등록 즉시 실행 가이드

1. **빌드 업로드**:
   - `steam_release/DeceptiveGuide/DeceptiveGuide.exe`를 Steamworks ContentBuilder 디포(Depot) 폴더에 배치 후 업로드.
2. **그래픽 등록**:
   - Steamworks [Store Page Admin] -> [Graphical Assets] 탭에서 `steam_release/store_assets/`의 6대 캡슐 및 `screenshots/`의 7대 스크린샷 일괄 업로드.
3. **설명문 복사/붙여넣기**:
   - 본 문서의 3개국어(한/영/일) 마케팅 텍스트를 복사하여 각 언어 탭에 등록.
4. **상점 검토 제출**:
   - [Publish] 탭에서 상점 페이지 검토(Review) 요청 클릭!
