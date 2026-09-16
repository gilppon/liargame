import { type SaveData } from './state';

export interface PersonalityResult {
  id: string;
  title: string;
  titleEn: string;
  titleJa: string;
  tagline: string;
  taglineJa: string;
  description: string;
  descriptionJa: string;
  tutoComment: string;
  tutoCommentJa: string;
  pinComment: string;
  pinCommentJa: string;
  stampText: string;
  stampTextJa: string;
  stampColor: 'danger' | 'warning' | 'success' | 'gold';
  grade: 'S' | 'A' | 'B' | 'C' | 'EX';
  stats: {
    skepticism: number; // 의심 지수 (0~100)
    impatience: number; // 성급함 (0~100)
    curiosity: number;  // 탐구욕 (0~100)
    tenacity: number;   // 뚝심/집념 (0~100)
  };
  highlights: string[];
  highlightsJa?: string[];
}

export function analyzePersonality(data: SaveData): PersonalityResult {
  const m = data.metrics;
  const actions = Math.max(1, m.actions);
  const stagesCleared = Object.values(data.progress).filter(p => p.completed).length;

  // 4대 지수 정규화 (0~100)
  const skepticism = Math.min(100, Math.round((m.opposed / actions) * 140));
  const impatience = Math.min(100, Math.round((m.early / actions) * 160));
  const curiosity = Math.min(100, Math.round(((m.inspections * 1.5 + data.logs.length * 3) / Math.max(10, actions * 0.7)) * 50));
  const tenacity = Math.min(100, Math.round(((m.repeated * 2 + m.waits * 2.5) / Math.max(5, actions * 0.5)) * 60));

  const stats = { skepticism, impatience, curiosity, tenacity };

  // 조건부 성향 판정
  if (skepticism >= 65) {
    return {
      id: 'skeptic',
      title: '절대 불신자',
      titleEn: 'THE ABSOLUTE SKEPTIC',
      titleJa: '絶対的懐疑論者',
      tagline: '“안내자의 말을 믿느니, 녹슨 톱니바퀴의 비명을 믿겠다.”',
      taglineJa: '「案内人の言葉を信じるくらいなら、錆びた歯車の悲鳴を信じる。」',
      description: '가이드 TUTO-9의 감언이설을 뼈저리게 불신하며, 오직 스스로 발견한 흔적과 물리적 법칙만으로 길을 개척하는 고독한 현실주의자입니다.',
      descriptionJa: 'ガイドTUTO-9の甘言を一切信じず、自ら見つけ出した痕跡と物理法則だけを頼りに道を切り拓く孤独な現実主義者です。',
      tutoComment: '“흥, 제 말을 그렇게 안 듣더니 여기까지 오셨네요? 언젠가는 뼈저리게 후회할 날이 올 겁니다!”',
      tutoCommentJa: '「フン、ボクの言うことを聞かないでよくここまで来ましたね！ いつか後悔する日が来ますよ！」',
      pinComment: '직접 눈으로 확인한 전선만이 거짓을 말하지 않는다.',
      pinCommentJa: '自分の目で確認した配線だけが、決して嘘をつかない。',
      stampText: '위험: 통제 불능',
      stampTextJa: '危険：統制不能',
      stampColor: 'danger',
      grade: 'EX',
      stats,
      highlights: [
        `가이드 반대 조작률: ${skepticism}%`,
        `발견한 현장 증거: ${data.evidence.length}건`,
        `의심의 결실: 안전 통로 확보`
      ],
      highlightsJa: [
        `案内反対操作率: ${skepticism}%`,
        `発見した証拠: ${data.evidence.length}件`,
        `疑念の結実: 安全ルート確保`
      ]
    };
  }

  if (skepticism <= 25 && actions >= 5) {
    return {
      id: 'faithful',
      title: '순종적인 모범생',
      titleEn: 'THE FAITHFUL SUBJECT',
      titleJa: '忠実なる模範生',
      tagline: '“가이드님이 그러시는데, 다 깊은 뜻이 있어서 그러시는 거겠죠?”',
      taglineJa: '「ガイド様がそう仰るなら、きっと深い理由があるに違いない。」',
      description: '가이드의 모든 낚시와 거짓말에 온 마음을 다해 걸려준 천사표 플레이어입니다. 사회생활에서 보증이나 사기를 각별히 조심해야 할 유형입니다.',
      descriptionJa: 'ガイドのあらゆる嘘と罠に全力で引っかかってくれた純粋無垢なプレイヤー。社会生活での保証人や詐欺には要注意なタイプです。',
      tutoComment: '“정말 사랑스러운 실험체… 아니, 여행자님이셨어요! 앞으로도 제 말만 맹신해 주세요!”',
      tutoCommentJa: '「本当に愛おしい実験体……いえ、旅人さんでした！ これからもボクの言葉だけを盲信してくださいね！」',
      pinComment: '…이 로봇의 안내를 다 믿다가는 몸체가 먼저 녹슬어 버릴 텐데.',
      pinCommentJa: '……このロボットの言うことを信じ切っていたら、先に体が錆びついてしまう。',
      stampText: '우수: 모범 피실험체',
      stampTextJa: '優秀：模範被験体',
      stampColor: 'success',
      grade: 'A',
      stats,
      highlights: [
        `순종률: ${100 - skepticism}%`,
        `순진무구함: 측정 불가 초과`,
        `가이드의 만족도: 100%`
      ],
      highlightsJa: [
        `従順率: ${100 - skepticism}%`,
        `純真無垢さ: 測定不能`,
        `ガイドの満足度: 100%`
      ]
    };
  }

  if (impatience >= 55) {
    return {
      id: 'rusher',
      title: '성격 급한 불도저',
      titleEn: 'THE IMPATIENT RUSHER',
      titleJa: 'せっかちな重機関車',
      tagline: '“설명서는 읽지 않는다. 버튼이 거기 있으니까 누를 뿐!”',
      taglineJa: '「説明書など読まない。そこにボタンがあるから押すのだ！」',
      description: '대사는 사치일 뿐! TUTO-9가 입을 열기도 전에 버튼부터 마구 누르는 화끈한 행동파입니다. 일단 부딪쳐 보고 생각하는 직진 본능의 소유자입니다.',
      descriptionJa: 'セリフなど読む暇はない！ TUTO-9が口を開く前にボタンを連打する情熱の行動派。ぶつかってから考える直進プレイヤーです。',
      tutoComment: '“제발 말 좀 끝까지 들으세요! 당신 때문에 제 말풍선 타이밍이 다 꼬였잖아요!”',
      tutoCommentJa: '「お願いだから最後まで話を聞いて！ あなたのせいでフキダシのタイミングが台無しですよ！」',
      pinComment: '기계는 기다림에 반응하기도 한다. 하지만 그 속도감은 놀라웠다.',
      pinCommentJa: '機械は待つことにも反応する。だがその突進力には驚かされた。',
      stampText: '주의: 설명서 미독',
      stampTextJa: '注意：説明書未読',
      stampColor: 'warning',
      grade: 'B',
      stats,
      highlights: [
        `초고속 조작 횟수: ${m.early}회`,
        `평균 대기 시간: 0.8초`,
        `행동력: 최고 등급`
      ],
      highlightsJa: [
        `超高速操作回数: ${m.early}回`,
        `平均待機時間: 0.8秒`,
        `行動力: 最高ランク`
      ]
    };
  }

  if (curiosity >= 60 || data.logs.length >= 8) {
    return {
      id: 'relic_hunter',
      title: '기계 고고학자',
      titleEn: 'THE RELIC HUNTER',
      titleJa: '機械考古学者',
      tagline: '“이 바닥의 먼지 한 톨에도 과거의 진실이 서려 있다.”',
      taglineJa: '「この床の塵一つにも、過去の真実が宿っている。」',
      description: '퍼즐을 푸는 것보다 바닥에 떨어진 낡은 기억 조각과 구석진 벽면 조사를 더 즐기는 학구파 탐정입니다. 숨겨진 진실을 결코 지나치지 않습니다.',
      descriptionJa: '謎解きよりも床に落ちた記憶の欠片や壁際の調査を好む探求型プレイヤー。隠された真実を決して見逃しません。',
      tutoComment: '“바닥에 떨어진 쓰레기는 왜 자꾸 줍는 거죠? 참 별난 취미를 가지셨군요.”',
      tutoCommentJa: '「床に落ちたゴミをどうしてそんなに拾うんです？ 変わった趣味をお持ちですね。」',
      pinComment: '빛바랜 기억을 모두 모았다. 도시는 우리에게 무언가를 감추고 있었다.',
      pinCommentJa: '色褪せた記憶をすべて集めた。この街は僕たちに何かを隠していたんだ。',
      stampText: '공인: 1급 수집광',
      stampTextJa: '公認：特級収集家',
      stampColor: 'gold',
      grade: 'S',
      stats,
      highlights: [
        `수집한 기억 조각: ${data.logs.length} / 50개`,
        `주변 환경 조사: ${m.inspections}회`,
        `역사 해독도: 최상위`
      ],
      highlightsJa: [
        `収集した記憶の欠片: ${data.logs.length} / 50個`,
        `周辺環境調査: ${m.inspections}回`,
        `歴史解読度: 最上位`
      ]
    };
  }

  if (tenacity >= 50 || m.repeated >= 4) {
    return {
      id: 'stubborn',
      title: '고집불통 장인',
      titleEn: 'THE STUBBORN MECHANIC',
      titleJa: '我を通す職人',
      tagline: '“안 되면 될 때까지 누른다. 톱니가 이기나 내가 이기나 해보자.”',
      taglineJa: '「動くまで押し続ける。歯車と私の根比べだ。」',
      description: '실패해도 포기하지 않고 같은 레버를 세 번, 네 번 다시 당겨보는 불굴의 뚝심을 지녔습니다. 결국 기계도 당신의 집념에 굴복하고 맙니다.',
      descriptionJa: '失敗しても諦めず、同じレバーを何度も引き続ける不屈の執念。最後には機械のほうがあなたの根気に根負けします。',
      tutoComment: '“아니, 아까 안 됐으면 다른 걸 누르셔야죠! 왜 자꾸 같은 걸 누르시는 건가요?!”',
      tutoCommentJa: '「さっきダメだったなら他を押してくださいよ！ どうして同じものばかり引くんですか？！」',
      pinComment: '마모된 부품도 끈질기게 두드리면 결국 맞물린다.',
      pinCommentJa: '摩耗した部品も、根気強く叩けば噛み合うものだ。',
      stampText: '경고: 끈기 과다',
      stampTextJa: '警告：執念過多',
      stampColor: 'warning',
      grade: 'A',
      stats,
      highlights: [
        `끈질긴 반복 시도: ${m.repeated}회`,
        `뚝심 지수: ${tenacity}%`,
        `포기를 모르는 근성: 인증됨`
      ],
      highlightsJa: [
        `粘り強い反復試行: ${m.repeated}回`,
        `執念指数: ${tenacity}%`,
        `諦めない根性: 認定済み`
      ]
    };
  }

  if (m.waits >= 2) {
    return {
      id: 'patient',
      title: '침묵의 관조자',
      titleEn: 'THE PATIENT OBSERVER',
      titleJa: '沈黙の観照者',
      tagline: '“서두르지 마라. 기계의 숨소리가 잦아들 때를 기다려라.”',
      taglineJa: '「焦るな。機械の息遣いが静まる瞬間を待て。」',
      description: '압력계가 서서히 차오르고 주기가 일치할 때까지 차분하게 숨을 고를 줄 아는 지혜로운 탐험가입니다. 가이드의 재촉에도 결코 흔들리지 않습니다.',
      descriptionJa: '圧力計が満ち、周期が一致するまで静かに息を整える賢明な探求者。ガイドの急かしにも決して惑わされません。',
      tutoComment: '“하아암… 언제까지 그러고 서 계실 건가요? 지루해서 하품이 다 나오네요.”',
      tutoCommentJa: '「ふあぁ〜……いつまで突っ立ってるんです？ 退屈でアクビが出ちゃいますよ。」',
      pinComment: '기다림은 낭비가 아니다. 가장 안전한 타이밍을 포착하는 기술이다.',
      pinCommentJa: '待つことは無駄ではない。最も確実な好機を掴む技術だ。',
      stampText: '심의: 평정심 보유',
      stampTextJa: '審議：冷静沈着',
      stampColor: 'success',
      grade: 'S',
      stats,
      highlights: [
        `인내와 관찰 횟수: ${m.waits}회`,
        `타이밍 정확도: 완벽`,
        `정신 안정도: 최상`
      ],
      highlightsJa: [
        `忍耐と観察の回数: ${m.waits}회`,
        `タイミング精度: 完璧`,
        `精神安定度: 最上`
      ]
    };
  }

  // 기본 밸런스형
  return {
    id: 'wanderer',
    title: '자유로운 방랑자',
    titleEn: 'THE FREE WANDERER',
    titleJa: '自由なる放浪者',
    tagline: '“믿지도 의심하지도 않는다. 오직 내 발걸음이 이끄는 대로 갈 뿐.”',
    taglineJa: '「信じも疑いもしない。ただ我が足取りの導くままに進むのみ。」',
    description: '가이드의 말에 적당히 어울려 주면서도 결정적인 순간에는 자신의 직관을 믿는 균형 잡힌 모험가입니다. 기계 세계의 모든 풍경을 유연하게 받아들입니다.',
    descriptionJa: 'ガイドの言葉に適度に合わせつつも、決定的な瞬間には自らの直感を信じるバランス派。機械都市のあらゆる風景を柔軟に受け入れます。',
    tutoComment: '“도무지 속을 알 수 없는 여행자시네요. 다음엔 더 기발한 안내를 준비해 두죠.”',
    tutoCommentJa: '「全く底の知れない旅人さんですね。次はもっと巧妙な案内を用意しておきますよ。」',
    pinComment: '균형 잡힌 발걸음으로 50개의 스테이지를 차분히 걸어왔다.',
    pinCommentJa: '確かな足取りで、50のステージを歩き通した。',
    stampText: '발급: 자유 시민',
    stampTextJa: '発給：自由市民',
    stampColor: 'gold',
    grade: 'A',
    stats,
    highlights: [
      `클리어 스테이지: ${stagesCleared}개`,
      `총 조작 행동: ${actions}회`,
      `플레이 스타일: 완벽한 밸런스`
    ],
    highlightsJa: [
      `クリアステージ数: ${stagesCleared}個`,
      `総操作アクション: ${actions}回`,
      `プレイスタイル: 完璧なバランス`
    ]
  };
}
