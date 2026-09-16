import {
  stagePuzzlesEn, stagePuzzlesJa,
  stageCluesEn, stageCluesJa,
  stageGuidesEn, stageGuidesJa,
  stageItemsEn, stageItemsJa,
  stageOptionsEn, stageOptionsJa
} from './stageTranslations';

export interface EndingTranslation {
  title: string;
  subtitle: string;
  text: string;
}

export const englishEndings: EndingTranslation[] = [
  {
    title: 'Again, The First Lesson',
    subtitle: 'Standard Ending · Compliance',
    text: 'The familiar lamp flickers on. A red button, a blue button. "Welcome, PIN-04!" This time, the voice sounds just a little melancholic.'
  },
  {
    title: 'A Path Pointed by None',
    subtitle: 'Standard Ending · Shutdown',
    text: 'TUTO-9\'s wheel grinds to a halt. The city falls silent. For the first time, PIN-04 walks in a direction no finger pointed to.'
  },
  {
    title: 'Clumsy, Yet Together',
    subtitle: 'True Ending · Module Decoupled',
    text: 'The deception module quietly powers down. "I... don\'t really know the way either." The first honest words you\'ve heard. A small brass pincer grasps a white glove. Together, any path can be found.'
  },
  {
    title: 'Liberation of All Paths',
    subtitle: 'Secret Ending · Administrator',
    text: 'The collected memories reconnect the city\'s guidance network. Thousands of misleading signs freeze, and every robot chooses its own heading. On the final beacon, there are no arrows left.'
  }
];

export const japaneseEndings: EndingTranslation[] = [
  {
    title: '再び、最初の教習へ',
    subtitle: '通常エンディング · 順応',
    text: '見慣れた電灯が瞬く。赤いボタン、青いボタン。「ようこそ、PIN-04！」今度のその声は、どこかほんの少し寂しげに響いた。'
  },
  {
    title: '誰も指し示さぬ道',
    subtitle: '通常エンディング · 停止',
    text: 'TUTO-9の車輪がきしみ、完全に静止した。街に静寂が訪れる。生まれて初めて、PIN-04は誰も指ささなかった方角へと歩き出す。'
  },
  {
    title: '不器用でも、共に',
    subtitle: 'トゥルーエンディング · モジュール分離',
    text: '欺瞞モジュールの電源が静かに落ちる。「ボクも……本当は道なんて知らないんだ」。初めて聞いた、偽りのない言葉。小さな真鍮のマニピュレーターが、白い手袋を握りしめた。二人なら、どんな道だって歩いていける。'
  },
  {
    title: 'すべての道の解放',
    subtitle: 'シークレットエンディング · 管理者',
    text: '集められた記憶が街の誘導ネットワークを再結合する。数千の欺きの標識が停止し、すべてのロボットが自らの意思で進路を選び始めた。最後の誘導灯には、もう矢印など一つも残されていない。'
  }
];

export const englishRegionSubtitles: string[] = [
  'Not every guide speaks the truth.',
  'Rain washes away the deceit.',
  'Even in silence, something grows.',
  'The wind never reads the signs.',
  'Sunken records never forget.',
  'Even memories cast long shadows.',
  'Stars find their way without a name.',
  'Reinvent how you win.',
  'Someone remembers every choice you made.',
  'Now, who will you choose to guide?'
];

export const japaneseRegions: { name: string; subtitle: string }[] = [
  { name: '廃棄された入門工場', subtitle: 'すべての案内が真実とは限らない。' },
  { name: '雨水標識の市場', subtitle: '雨水は嘘を洗い流す。' },
  { name: '青碧の機械温室', subtitle: '沈黙の中でも何かが育つ。' },
  { name: '雲上鉄道と風車崖', subtitle: '風は標識を読まない。' },
  { name: '水没した記録保管所', subtitle: '沈んだ記録は忘れない。' },
  { name: '時計砂漠と記憶廃棄場', subtitle: '記憶にも影はある。' },
  { name: '凍てついた天文観測所', subtitle: '星は名を持たずとも道を見つける。' },
  { name: '歪んだ規則の유원지', subtitle: '勝つ方法を考え直せ。' },
  { name: '判断力の鉱山', subtitle: 'あなたの選択を誰かが覚えている。' },
  { name: '中央案内塔', subtitle: 'さあ、誰を導くのか。' }
];

export const uiTranslations = {
  ko: {
    adventure: '모험',
    journal: '정비 일지',
    worldMap: '지역 지도',
    inventory: '인벤토리',
    saved: '자동 저장됨',
    saving: '저장 중…',
    currentObjective: '현재 목표',
    nextStage: '다음 장소로',
    lockedExit: '잠긴 출구',
    inspectNearby: '주변 장치 조사',
    personalityReport: '성향 진단서',
    getPersonalityReport: '내 성향 진단서 발급',
    viewAllItems: '모든 소지품 보기',
    memories: '기억 조각',
    motto: '그의 말을 듣되, 당신의 눈을 믿으세요.',
    controls: '조작 안내',
    stage: '스테이지',
    unlocked: '출구 개방',
    exploring: '탐험 중',
    language: '언어',
    currentLocation: '현재 위치',
    completed: '완료',
    restartFromBeginning: '처음부터 다시 시작',
    saveNow: '지금 저장하기',
    loadBackup: '최근 저장 불러오기',
    hint: '힌트',
    hintTooltip: '정비 기록 힌트 (H)',
    pinObservation: 'PIN-04의 관찰',
    closeObservation: '관찰 닫기',
    recordedInJournal: '정비 일지에 기록됨',
    circuitConnected: '연결 완료',
    counterweight: '균형추',
    verifyBalance: '저울 확인',
    clickToMove: '바닥을 클릭해 이동',
    showTargets: '조사 대상 표시',
    hideTargets: '조사 대상 숨기기',
    yourGuide: '당신의 믿음직한 안내자',
    friendlyGuide: '당신의 친절한 안내자',
    repairLog: '작은 수리 로봇의 정비 기록',
    unverifiedTrust: '신뢰도 미확인',
    newPathFound: '새로운 길 발견',
    observedFact: '직접 관찰한 사실',
    clickToSkip: '클릭하여 스킵',
    showAllText: '대사 전체 표시 (클릭)',
    next: '다음',
    findExitStage1: '교육실을 나갈 방법 찾기',
    moveToNext: '열린 문을 통해 다음 장소로 이동하기',
    redButton: '빨간 버튼',
    blueButton: '파란 버튼',
    fadedMemory: '빛바랜 기억 조각',
    pressureWaiting: '압력 반응 대기',
    pressureReacting: (sec: number) => `${sec}초 · 압력 반응 중`,
    platformConnected: '발판 연결됨',
    machineMoving: '기계 이동 중',
    regionTag: (id: number, title: string) => `${String(id).padStart(2, '0')} 지역 · ${title}`
  },
  en: {
    adventure: 'Adventure',
    journal: 'Journal',
    worldMap: 'World Map',
    inventory: 'Inventory',
    saved: 'Saved',
    saving: 'Saving…',
    currentObjective: 'Objective',
    nextStage: 'Proceed',
    lockedExit: 'Locked Gate',
    inspectNearby: 'Inspect Area',
    personalityReport: 'Personality Report',
    getPersonalityReport: 'Get Personality Report',
    viewAllItems: 'View All Items',
    memories: 'Memories',
    motto: 'Hear his words. Trust your eyes.',
    controls: 'Controls',
    stage: 'STAGE',
    unlocked: 'Gate Open',
    exploring: 'Exploring',
    language: 'Language',
    currentLocation: 'Current',
    completed: 'Done',
    restartFromBeginning: 'Restart From Beginning',
    saveNow: 'Save Now',
    loadBackup: 'Load Backup',
    hint: 'Hint',
    hintTooltip: 'Maintenance Hint (H)',
    pinObservation: "PIN-04's Observation",
    closeObservation: 'Close Observation',
    recordedInJournal: 'Recorded in Journal',
    circuitConnected: 'Connected',
    counterweight: 'Target',
    verifyBalance: 'Verify Balance',
    clickToMove: 'Click floor to move',
    showTargets: 'Show Targets',
    hideTargets: 'Hide Targets',
    yourGuide: 'Your Reliable Guide',
    friendlyGuide: 'Your Friendly Guide',
    repairLog: 'Little Repair Robot Log',
    unverifiedTrust: 'Unverified Trust',
    newPathFound: 'New Path Discovered',
    observedFact: 'Direct Observation',
    clickToSkip: 'Click to skip',
    showAllText: 'Show all text (Click)',
    next: 'Next',
    findExitStage1: 'Find a way out of the room',
    moveToNext: 'Proceed through the open door',
    redButton: 'Red Button',
    blueButton: 'Blue Button',
    fadedMemory: 'Faded Memory Fragment',
    pressureWaiting: 'Awaiting Pressure',
    pressureReacting: (sec: number) => `${sec}s · Responding`,
    platformConnected: 'Platform Connected',
    machineMoving: 'Machine Moving',
    regionTag: (id: number, title: string) => `Region ${String(id).padStart(2, '0')} · ${title}`
  },
  ja: {
    adventure: '冒険',
    journal: '整備日誌',
    worldMap: '地域マップ',
    inventory: '所持品',
    saved: '自動保存済み',
    saving: '保存中…',
    currentObjective: '現在の目標',
    nextStage: '次の場所へ',
    lockedExit: '施錠された出口',
    inspectNearby: '周辺装置の調査',
    personalityReport: '傾向診断書',
    getPersonalityReport: '自分の傾向診断書を発行',
    viewAllItems: 'すべての所持品',
    memories: '記憶の欠片',
    motto: '彼の言葉を聞きつつ、己の目を信じよ。',
    controls: '操作ガイド',
    stage: 'ステージ',
    unlocked: '出口開放',
    exploring: '探索中',
    language: '言語',
    currentLocation: '現在位置',
    completed: '達成',
    restartFromBeginning: '最初からやり直す',
    saveNow: '今すぐ保存',
    loadBackup: 'バックアップ読込',
    hint: 'ヒント',
    hintTooltip: '整備記録ヒント (H)',
    pinObservation: 'PIN-04の観察',
    closeObservation: '観察を閉じる',
    recordedInJournal: '整備日誌に記録完了',
    circuitConnected: '接続完了',
    counterweight: '基準分銅',
    verifyBalance: '天秤を確認',
    clickToMove: '床をクリックして移動',
    showTargets: '調査対象を表示',
    hideTargets: '調査対象を隠す',
    yourGuide: 'あなたの頼れる案内人',
    friendlyGuide: 'あなたの親切な案内人',
    repairLog: '小さな修理ロボットの記録',
    unverifiedTrust: '信頼度未確認',
    newPathFound: '新しい道を発見',
    observedFact: '自ら観察した事実',
    clickToSkip: 'クリックでスキップ',
    showAllText: '全文表示 (クリック)',
    next: '次へ',
    findExitStage1: '教習室からの脱出方法を探す',
    moveToNext: '開いた扉から次の場所へ進む',
    redButton: '赤いボタン',
    blueButton: '青いボタン',
    fadedMemory: '色褪せた記憶の欠片',
    pressureWaiting: '圧力反応待機中',
    pressureReacting: (sec: number) => `${sec}秒 · 圧力反応中`,
    platformConnected: '足場接続完了',
    machineMoving: '機械移動中',
    regionTag: (id: number, title: string) => `${String(id).padStart(2, '0')} 地域 · ${title}`
  }
};

/** 퍼즐 선택지 및 라벨 다국어 자동 변환 */
export function localizeOption(text: string, lang: 'ko' | 'en' | 'ja'): string {
  if (lang === 'ko') return text;

  const weightMatch = text.match(/(\d+)\s*kg\s*(상자|조각)?/);
  if (weightMatch) {
    return lang === 'ja' ? `${weightMatch[1]}kgの分銅` : `${weightMatch[1]}kg Weight`;
  }

  const mapEn: Record<string, string> = {
    ...stagePuzzlesEn,
    ...stageItemsEn,
    ...stageOptionsEn,
    '빨간 버튼': 'Red Button',
    '파란 버튼': 'Blue Button',
    '왼쪽 통로': 'Left Corridor',
    '오른쪽 통로': 'Right Corridor',
    '1번 톱니': 'Gear 1',
    '2번 톱니': 'Gear 2',
    '3번 톱니': 'Gear 3',
    '맞물린 톱니': 'Meshed Gears',
    '빨강 · 삼각형': 'Red · Triangle',
    '파랑 · 원': 'Blue · Circle',
    '노랑 · 사각형': 'Yellow · Square',
    'UP 레버': 'UP Lever',
    'DOWN 레버': 'DOWN Lever',
    '왼쪽 골목': 'Left Alley',
    '가운데 골목': 'Center Alley',
    '오른쪽 골목': 'Right Alley',
    '자판기 저울': 'Vending Scale',
    '동전 주조기': 'Coin Mint',
    '3kg 주형': '3kg Mold',
    '빈 상품 슬롯': 'Empty Dispenser',
    '금속 조각': 'Metal Scrap',
    '장치 작동': 'Activate Device',
    '다시 작동': 'Reactivate',
    '지금 이동': 'Move Now',
    '왼쪽 상인': 'Left Merchant',
    '오른쪽 상인': 'Right Merchant',
    '청소 로봇': 'Cleaner Bot',
    '왼쪽에 빛': 'Light Left',
    '오른쪽에 빛': 'Light Right',
    'OPEN': 'OPEN',
    'CLOSE': 'CLOSE',
    '선로 1': 'Track 1',
    '선로 2': 'Track 2',
    '선로 3': 'Track 3',
    '선로 4': 'Track 4',
    '선로 5': 'Track 5',
    '짧게 1회': '1 Short',
    '짧게 2회': '2 Short',
    '길게 1회': '1 Long',
    '왼쪽': 'Left',
    '중앙': 'Center',
    '오른쪽': 'Right',
    '짧은 바늘': 'Short Hand',
    '긴 바늘': 'Long Hand',
    '고정쇠': 'Latch',
    '왼쪽 문': 'Left Gate',
    '가운데 문': 'Center Gate',
    '오른쪽 문': 'Right Gate',
    '해 그림자 쪽': 'Toward Shadow',
    '나침반 방향': 'Compass Needle',
    '되감기': 'Rewind',
    '앞으로': 'Forward',
    '맑은 얼음': 'Clear Ice',
    '눈 쌓인 길': 'Snowy Path',
    '정비 공구': 'Maintenance Tool',
    '정비 수첩': 'Maintenance Log',
    '황동 조각': 'Brass Scrap'
  };

  const mapJa: Record<string, string> = {
    ...stagePuzzlesJa,
    ...stageItemsJa,
    ...stageOptionsJa,
    '빨간 버튼': '赤いボタン',
    '파란 버튼': '青いボタン',
    '왼쪽 통로': '左の通路',
    '오른쪽 통로': '右の通路',
    '1번 톱니': '1番の歯車',
    '2번 톱니': '2番の歯車',
    '3번 톱니': '3番の歯車',
    '맞물린 톱니': '噛み合う歯車',
    '빨강 · 삼각형': '赤 · 三角',
    '파랑 · 원': '青 · 円',
    '노랑 · 사각형': '黄 · 四角',
    'UP 레버': 'UPレバー',
    'DOWN 레버': 'DOWNレバー',
    '왼쪽 골목': '左の路地',
    '가운데 골목': '中央の路地',
    '오른쪽 골목': '右の路地',
    '자판기 저울': '自販機の天秤',
    '동전 주조기': 'コイン鋳造機',
    '3kg 주형': '3kgの鋳型',
    '빈 상품 슬롯': '空の投入口',
    '금속 조각': '金属片',
    '장치 작동': '装置作動',
    '다시 작동': '再作動',
    '지금 이동': '今すぐ移動',
    '왼쪽 상인': '左の商人',
    '오른쪽 상인': '右の商人',
    '청소 로봇': '清掃ロボット',
    '왼쪽에 빛': '左に光',
    '오른쪽에 빛': '右に光',
    'OPEN': 'OPEN',
    'CLOSE': 'CLOSE',
    '선로 1': '線路 1',
    '선로 2': '線路 2',
    '선로 3': '線路 3',
    '선로 4': '線路 4',
    '선로 5': '線路 5',
    '짧게 1회': '短く1回',
    '짧게 2회': '短く2回',
    '길게 1회': '長く1回',
    '왼쪽': '左',
    '중앙': '中央',
    '오른쪽': '右',
    '짧은 바늘': '短い針',
    '긴 바늘': '長い針',
    '고정쇠': '留め具',
    '왼쪽 문': '左の扉',
    '가운데 문': '中央の扉',
    '오른쪽 문': '右の扉',
    '해 그림자 쪽': '日陰の方角',
    '나침반 방향': '羅針盤の指針',
    '되감기': '巻き戻し',
    '앞으로': '前進',
    '맑은 얼음': '澄んだ氷',
    '눈 쌓인 길': '雪の積もった道',
    '정비 공구': '整備工具',
    '정비 수첩': '整備日誌',
    '황동 조각': '真鍮片'
  };

  const dict = lang === 'ja' ? mapJa : mapEn;
  return dict[text] || text;
}

/** 대사 텍스트 다국어 자동 변환 (성공/실패/피드백/단서 전체 대응) */
export function localizeDialogue(text: string, lang: 'ko' | 'en' | 'ja'): string {
  if (lang === 'ko') return text;

  // 1. 성공/잠금해제 피드백
  if (text.includes('잠금장치가 풀렸다') && text.includes('열린 출구')) {
    return lang === 'ja'
      ? 'ピピッ！ロックが解除された。光の差し込む出口へ進むことができる。'
      : 'BEEP—! The lock clicked open. The lit exit ahead is now accessible.';
  }

  // 2. 부분 성공 (다음 장치로)
  const nextMatch = text.match(/^장치가 반응했다\. 다음은 (.*)을 살펴보자\./);
  if (nextMatch) {
    const nextDevice = localizeOption(nextMatch[1], lang);
    return lang === 'ja'
      ? `装置が反応した。次は${nextDevice}を調べよう。`
      : `The mechanism responded. Next, let's examine ${nextDevice}.`;
  }

  // 3. 순서 퍼즐 부분 연결
  const seqMatch = text.match(/^장치 (\d+) \/ (\d+) 연결\. 다음 순서를 이어가자\./);
  if (seqMatch) {
    return lang === 'ja'
      ? `装置 ${seqMatch[1]} / ${seqMatch[2]} 接続完了。次の順序を続けよう。`
      : `Unit ${seqMatch[1]} / ${seqMatch[2]} connected. Continue the sequence.`;
  }

  // 4. 기억 조각 획득
  const memoryMatch = text.match(/^기억 기록 #(\d+) — “안내는 선택을 대신하기 위해 만들어진 것이 아니다\.” 작은 기록을 정비 수첩에 보관했다\./);
  if (memoryMatch) {
    return lang === 'ja'
      ? `記憶記録 #${memoryMatch[1]} — 「案内は選択の代わりをするために作られたのではない。」日誌に保管した。`
      : `Memory Log #${memoryMatch[1]} — "Guidance was never meant to replace choice." Stowed into journal.`;
  }

  // 5. 가이드 성향별 동적 꼬리말(tail) 감지 및 분리
  const tails: Record<string, { en: string; ja: string }> = {
    ' 빨리요, 기다릴 필요 없어요!': { en: ' Hurry, no need to wait!', ja: ' 早く、待つ必要なんてありませんよ！' },
    ' 왼쪽을 좋아하셨죠?': { en: " You liked the left, didn't you?", ja: ' 左がお好きでしたよね？' },
    ' 늘 오른쪽을 고르셨잖아요.': { en: ' You always chose the right, after all.', ja: ' いつも右を選んでいたじゃないですか。' },
    ' 구석은 볼 필요 없어요.': { en: ' No need to look in the corners.', ja: ' 隅っこを見る必要はありませんよ。' }
  };

  let matchedTailKey = '';
  let mainText = text;
  for (const tailKey of Object.keys(tails)) {
    if (text.endsWith(tailKey)) {
      matchedTailKey = tailKey;
      mainText = text.slice(0, -tailKey.length);
      break;
    }
  }

  // 6. 31단계 이상 진실 힌트 대사 동적 변환
  const truthMatch = mainText.match(/^이번에는 (.*) 쪽을 살펴보세요\. 하지만 환경을 조사하는 건 시간 낭비랍니다!/);
  if (truthMatch) {
    const optLoc = localizeOption(truthMatch[1], lang);
    const base = lang === 'ja'
      ? `今回は${optLoc}側を調べてみてください。ですが環境を調査するのは時間の無駄ですよ！`
      : `This time, examine the ${optLoc} side. But investigating the environment is a waste of time!`;
    const tailStr = matchedTailKey ? (lang === 'ja' ? tails[matchedTailKey].ja : tails[matchedTailKey].en) : '';
    return base + tailStr;
  }

  const dialogueEn: Record<string, string> = {
    ...stageCluesEn,
    ...stageGuidesEn,
    // 실패 대사
    '이런! 장치가 원래대로 돌아왔네요. 제가 아니라 누른 쪽의 문제일 거예요. 다시 해 보시겠어요?':
      'Oops! The device reset itself. The problem isn\'t me, it\'s definitely what you pressed. Care to try again?',
    '어머, 박자가 어긋났네요. 다음 주기에 다시 해 보세요. 제 말보다는… 아니, 제 말을 잘 들으세요!':
      'Oh my, you missed the beat! Try again next cycle. Instead of... no, listen closely to me!',
    '다시 처음부터 작동하네요? 분명 당신이 너무 서두른 탓일 거예요.':
      'Starting over from scratch? You were definitely rushing too much.',

    // 관찰 및 상태 대사
    '문이 굳게 잠겨 있다. 장치와 연결된 전선을 먼저 살펴보자.':
      'The gate is firmly locked. Let\'s examine the wiring connected to the device first.',
    '밸브가 돌아가기 시작했다. 압력계의 반응을 지켜보자.':
      'The valve started turning. Let\'s monitor the pressure gauge response.',
    '삐… 맨손으로는 작동하지 않는다. 도구의 모양과 장치의 홈을 비교해 보자.':
      'BEEP... Doesn\'t work barehanded. Match the tool shape with the device slot.',
    '아, 다시 오셨군요. 열린 출구는 저쪽이에요. 이번에는 정말입니다.':
      'Ah, you\'re back. The open exit is over there. Truly, this time!',

    // 가이드 지시 대사 (50개 스테이지 주요 대사)
    '가장 큰 것들을 전부 올리세요!': 'Place all the heaviest pieces!',
    '환영합니다, PIN-04! 문을 열려면 빨간 버튼을 누르세요. 아주 간단하죠? 저만 믿으시면 됩니다!':
      'Welcome, PIN-04! Just press the red button to open the door. Simple, right? Trust me!',
    '오른쪽이 출구예요. 왼쪽은 절대로 가지 마세요!':
      'The exit is on the right. Never go to the left!',
    '정답은 언제나 2번입니다. 제가 만든 시험이거든요.':
      'The answer is always 2. After all, I designed this test.',
    '반짝이는 빨간 레버를 당기세요. 제가 닦아 놓았답니다!':
      'Pull the shiny red lever. I polished it just for you!',
    '올라가려면 UP. 상식 아닌가요?':
      'To go up, choose UP. Isn\'t that obvious?',
    '표시기가 어두워질 때 뛰세요!':
      'Jump when the indicator dims!',
    '새 간판이 가리키는 오른쪽으로 가세요.':
      'Follow the new sign to the right.',
    '핀은 홈통에 버리면 됩니다.':
      'Just toss the pin into the gutter.',
    '상품 슬롯에 금속을 밀어 넣으세요.':
      'Shove the metal scrap right into the item slot.',
    '우산을 펼치고 바람길에 뛰어드세요!':
      'Open the umbrella and leap into the gale!',
    '우산부터 펼쳐야 안전해요.':
      'You must open the umbrella first for safety.',
    '청소 로봇은 길을 몰라요. 오른쪽 상인을 따라가세요.':
      'Cleaner bots know nothing. Follow the merchant on the right.',
    '지도가 젖기 전에 계속 문질러요!':
      'Keep rubbing before the map gets soaked!',
    '탑, 다리, 시장 순서가 맞습니다.':
      'The correct sequence is Tower, Bridge, Market.',
    '오른쪽 다리에 빛을 비추세요.':
      'Shine the light onto the right bridge.',
    '덩굴이 풀릴 때 건너면 부드러워요.':
      'It is much smoother to cross as the vines unravel.',
    '이름이 OPEN이니 당연히 열리겠죠?':
      'It says OPEN, so obviously it opens, right?',
    '압력이 오르면 계속 다시 돌려요.':
      'Keep turning it again whenever pressure rises.',
    '펌프부터 멈추고 확성기는 더 크게 켜세요.':
      'Stop the pump first and turn up the speaker louder.',
    '3, 1, 4, 2예요. 제 귀는 정확하답니다.':
      'It is 3, 1, 4, 2. My auditory sensors are infallible.'
  };

  const dialogueJa: Record<string, string> = {
    ...stageCluesJa,
    ...stageGuidesJa,
    // 실패 대사
    '이런! 장치가 원래대로 돌아왔네요. 제가 아니라 누른 쪽의 문제일 거예요. 다시 해 보시겠어요?':
      'おや！装置が元に戻っちゃいましたね。ボクではなく押した側の問題ですよ。もう一度やってみます？',
    '어머, 박자가 어긋났네요. 다음 주기에 다시 해 보세요. 제 말보다는… 아니, 제 말을 잘 들으세요!':
      'あら、タイミングが狂いましたね。次の周期でやり直してください。ボクの言葉をよく聞いて！',
    '다시 처음부터 작동하네요? 분명 당신이 너무 서두른 탓일 거예요.':
      'また最初からやり直しですね？間違いなくあなたが焦りすぎたせいです。',

    // 관찰 및 상태 대사
    '문이 굳게 잠겨 있다. 장치와 연결된 전선을 먼저 살펴보자.':
      '扉は固く閉ざされている。まずは装置に繋がる配線を調べよう。',
    '밸브가 돌아가기 시작했다. 압력계의 반응을 지켜보자.':
      'バルブが回り始めた。圧力計の反応を見守ろう。',
    '삐… 맨손으로는 작동하지 않는다. 도구의 모양과 장치의 홈을 비교해 보자.':
      'ピ… 素手では動かない。工具の形状と装置の溝を照らし合わせよう。',
    '아, 다시 오셨군요. 열린 출구는 저쪽이에요. 이번에는 정말입니다.':
      'あ、また来られたのですね。開いた出口はあちらですよ。今度は本当です。',

    // 가이드 지시 대사 (50개 스테이지 주요 대사)
    '가장 큰 것들을 전부 올리세요!': '一番重いものを全部乗せて！',
    '환영합니다, PIN-04! 문을 열려면 빨간 버튼을 누르세요. 아주 간단하죠? 저만 믿으시면 됩니다!':
      'ようこそ、PIN-04！扉を開けるには赤いボタンを押してください。簡単でしょう？ボクを信じて！',
    '오른쪽이 출구예요. 왼쪽은 절대로 가지 마세요!':
      '右が出口ですよ。左には絶対に行かないで！',
    '정답은 언제나 2번입니다. 제가 만든 시험이거든요.':
      '正解はいつでも2番です。ボクが作った試験ですから。',
    '반짝이는 빨간 레버를 당기세요. 제가 닦아 놓았답니다!':
      'ピカピカの赤いレバーを引いてください。ボクが磨いておきました！',
    '올라가려면 UP. 상식 아닌가요?':
      '上がるならUP。常識じゃありませんか？',
    '표시기가 어두워질 때 뛰세요!':
      'インジケーターが暗くなった瞬間に跳んで！',
    '새 간판이 가리키는 오른쪽으로 가세요.':
      '新しい看板が示す右へ進んでください。',
    '핀은 홈통에 버리면 됩니다.':
      '固定ピンは雨樋に捨てちゃえばいいんです。',
    '상품 슬롯에 금속을 밀어 넣으세요.':
      '金属片をそのまま商品の投入スロットに押し込んで！',
    '우산을 펼치고 바람길에 뛰어드세요!':
      '傘を広げて風の通り道に飛び込んで！',
    '우산부터 펼쳐야 안전해요.':
      '傘を先に開かないと危険ですよ。',
    '청소 로봇은 길을 몰라요. 오른쪽 상인을 따라가세요.':
      '清掃ロボットは道を知りません。右の商人について行って！',
    '지도가 젖기 전에 계속 문질러요!':
      '地図が濡れる前にこすり続けて！',
    '탑, 다리, 시장 순서가 맞습니다.':
      '塔、橋、市場の順で合っていますよ。',
    '오른쪽 다리에 빛을 비추세요.':
      '右の橋に光を当ててください。',
    '덩굴이 풀릴 때 건너면 부드러워요.':
      'ツタがほどける瞬間に渡るとスムーズですよ。',
    '이름이 OPEN이니 당연히 열리겠죠?':
      '名前がOPENなんですから、当然開くに決まってますよね？',
    '압력이 오르면 계속 다시 돌려요.':
      '圧力が上がったら何度も回し直して！',
    '펌프부터 멈추고 확성기는 더 크게 켜세요.':
      'ポンプを先に止めて、スピーカーをもっと大音量にして！',
    '3, 1, 4, 2예요. 제 귀는 정확하답니다.':
      '3、1、4、2です。ボクの耳は正確なんですから。'
  };

  const dict = lang === 'ja' ? dialogueJa : dialogueEn;
  const translatedMain = dict[mainText] || mainText;
  const tailStr = matchedTailKey ? (lang === 'ja' ? tails[matchedTailKey].ja : tails[matchedTailKey].en) : '';
  return translatedMain + tailStr;
}
