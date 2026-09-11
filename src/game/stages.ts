import { z } from 'zod';

export type PuzzleKind = 'choice' | 'sequence' | 'item' | 'wait' | 'timing' | 'balance';
export interface Puzzle { name: string; kind: PuzzleKind; options: string[]; answer: number[]; clue: string; guide: string; item?: string; seconds?: number; weights?: number[]; }
const c = (name: string, options: string[], correct: number, clue: string, guide: string): Puzzle => ({ name, kind: 'choice', options, answer: [correct], clue, guide });
const s = (name: string, options: string[], answer: number[], clue: string, guide: string): Puzzle => ({ name, kind: 'sequence', options, answer, clue, guide });
const i = (name: string, item: string, options: string[], correct: number, clue: string, guide: string): Puzzle => ({ ...c(name, options, correct, clue, guide), kind: 'item', item });
const w = (name: string, seconds: number, clue: string, guide: string): Puzzle => ({ name, kind: 'wait', options: ['장치 작동', '다시 작동'], answer: [0], seconds, clue, guide });
const t = (name: string, clue: string, guide: string): Puzzle => ({ name, kind: 'timing', options: ['지금 이동'], answer: [0], clue, guide });
const b = (name: string, weights: number[], target: number, clue: string, guide: string): Puzzle => ({ name, kind: 'balance', options: weights.map(n => `${n} kg 상자`), weights, answer: [target], clue, guide });

export const regions = [
  { name: '폐기된 입문 공장', en: 'The Abandoned Factory', color: '#bd9a58', subtitle: '모든 안내가 진실은 아니다.' },
  { name: '빗물 표지판 시장', en: 'Rainwater Sign Market', color: '#76aaa5', subtitle: '빗물은 거짓말을 지운다.' },
  { name: '청록빛 기계 온실', en: 'The Mechanical Greenhouse', color: '#82ad82', subtitle: '침묵 속에서도 무언가는 자란다.' },
  { name: '구름 철도와 풍차 절벽', en: 'Cloud Railway', color: '#b6c8bf', subtitle: '바람은 표지판을 읽지 않는다.' },
  { name: '침수된 기록 보관소', en: 'The Sunken Archive', color: '#73afbb', subtitle: '가라앉은 기록은 잊지 않는다.' },
  { name: '시계 사막과 기억 폐기장', en: 'The Clockwork Desert', color: '#d4a16a', subtitle: '기억에도 그림자가 있다.' },
  { name: '얼어붙은 천문 관측소', en: 'The Frozen Observatory', color: '#a5b3d7', subtitle: '별은 이름 없이도 길을 찾는다.' },
  { name: '잘못된 규칙의 유원지', en: 'The Unfair Fairground', color: '#ce8371', subtitle: '이기는 방법을 다시 생각하라.' },
  { name: '판단력 광산', en: 'The Judgment Mines', color: '#9e8eb3', subtitle: '너의 선택을 누군가 기억한다.' },
  { name: '중앙 안내탑', en: 'The Central Guide Tower', color: '#d1b970', subtitle: '이제, 누구를 안내할 것인가.' },
];

type Draft = [string, string, Puzzle[]];
const drafts: Draft[] = [
 ['깨어난 교육실', 'The Awakening Room', [c('교육실의 전원 장치', ['빨간 버튼', '파란 버튼'], 1, '빨간 버튼의 전선은 천장의 경보기에 연결되어 있다. 파란 버튼의 구리 전선은 오른쪽 문의 잠금장치까지 이어진다.', '환영합니다, PIN-04! 문을 열려면 빨간 버튼을 누르세요. 아주 간단하죠? 저만 믿으시면 됩니다!')]],
 ['좌우 갈림길', 'A Fork in the Corridor', [c('두 개의 통로', ['왼쪽 통로', '오른쪽 통로'], 0, '왼쪽 문틈으로 바람이 들어온다. 젖은 발자국은 왼쪽으로 이어지고, 오른쪽에는 방금 지나온 바퀴 자국이 있다.', '오른쪽이 출구예요. 왼쪽은 절대로 가지 마세요!')]],
 ['톱니바퀴 시험문', 'The Gear Gate', [c('맞물린 톱니', ['1번 톱니', '2번 톱니', '3번 톱니'], 0, '1번 톱니의 축만 문과 맞물려 있다. 나머지 톱니는 고정 볼트에 용접되어 움직이지 않는다.', '정답은 언제나 2번입니다. 제가 만든 시험이거든요.')]],
 ['세 가지 레버', 'Three Levers', [c('교량 제어기', ['빨강 · 삼각형', '파랑 · 원', '노랑 · 사각형'], 1, '원이 새겨진 파란 레버의 배선이 다리 모터까지 이어진다. 삼각형은 바닥 해치, 사각형은 경보기와 연결된다.', '반짝이는 빨간 레버를 당기세요. 제가 닦아 놓았답니다!')]],
 ['거꾸로 움직이는 승강기', 'The Contrary Elevator', [c('승강기 균형추', ['UP 레버', 'DOWN 레버'], 1, 'UP 연결축은 승강기를 아래로 민다. DOWN 축을 살짝 당기면 균형추가 내려가며 승강기 발판이 올라온다.', '올라가려면 UP. 상식 아닌가요?'), t('발판에 올라타기', '발판의 홈과 층계가 일치할 때 표시기가 밝아진다. 밝은 구간에서 이동해야 한다.', '표시기가 어두워질 때 뛰세요!')]],
 ['회전하는 간판 골목', 'Rotating Signs', [c('간판 아래의 길', ['왼쪽 골목', '가운데 골목', '오른쪽 골목'], 0, '간판은 가이드가 지나갈 때 회전한다. 벽에 남은 오래된 화살표 모양의 녹은 왼쪽을 향한다.', '새 간판이 가리키는 오른쪽으로 가세요.'), i('고정되지 않은 간판', '고정 핀', ['간판 회전축', '빗물 홈통'], 0, '회전축에 고정 핀과 같은 크기의 구멍이 있다. 핀을 끼우면 간판이 다시 돌아가지 않는다.', '핀은 홈통에 버리면 됩니다.')]],
 ['거짓 동전 자판기', 'The Counterfeit Coin', [b('자판기 저울', [1, 2, 3], 3, '투입구 안의 저울에는 3kg 기준 추가 달려 있다. 상자를 선택해 같은 무게를 만들고 저울을 확인하자.', '가장 큰 것들을 전부 올리세요!'), i('동전 주조기', '금속 조각', ['3kg 주형', '빈 상품 슬롯'], 0, '저울이 균형을 이루자 3kg 주형이 열렸다. 금속 조각을 주형에 넣으면 알맞은 동전이 된다.', '상품 슬롯에 금속을 밀어 넣으세요.')]],
 ['우산 운하', 'Umbrella Canal', [i('운하의 밧줄', '닫힌 우산', ['밧줄 고리', '강한 바람길'], 0, '우산 끝의 갈고리가 밧줄 고리와 맞는다. 펼친 우산은 풍향계처럼 거세게 흔들린다.', '우산을 펼치고 바람길에 뛰어드세요!'), c('밧줄을 건넌 뒤', ['밧줄 고정', '우산 펼치기'], 0, '반대편 기둥의 마찰 홈에 밧줄을 감으면 다리가 팽팽해진다.', '우산부터 펼쳐야 안전해요.')]],
 ['세 명의 상인', 'The Three Merchants', [c('누구의 흔적을 따를까', ['왼쪽 상인', '오른쪽 상인', '청소 로봇'], 2, '세 상인의 스피커 선이 모두 TUTO-9로 이어진다. 말 없는 청소 로봇의 물기 자국만 열린 서비스 문으로 향한다.', '청소 로봇은 길을 몰라요. 오른쪽 상인을 따라가세요.')]],
 ['빗물에 지워지는 지도', 'The Rain-Washed Map', [w('젖은 지도', 5, '새 페인트는 물에 녹는다. 빗물이 충분히 흐르면 아래쪽의 오래된 선이 드러난다.', '지도가 젖기 전에 계속 문질러요!'), s('오래된 지도 조각', ['다리', '탑', '시장'], [2, 0, 1], '빗물 아래에 남은 경로는 시장에서 시작해 다리를 건너 탑에 닿는다.', '탑, 다리, 시장 순서가 맞습니다.')]],
 ['빛을 피하는 덩굴', 'Light-Shy Vines', [c('온실 램프', ['왼쪽에 빛', '오른쪽에 빛'], 0, '덩굴의 새순은 빛의 반대편으로 기운다. 끊어진 다리는 오른쪽에 있다.', '오른쪽 다리에 빛을 비추세요.'), t('덩굴 다리', '덩굴이 지지대에 감긴 동안만 파동 표시기가 밝아진다. 그때 건너자.', '덩굴이 풀릴 때 건너면 부드러워요.')]],
 ['압력 밸브 정원', 'Pressure Garden', [c('뒤바뀐 밸브', ['OPEN', 'CLOSE'], 1, 'OPEN을 건드리면 배관이 잠긴다. CLOSE 방향으로 회전한 축에는 물이 흐른 흔적이 있다.', '이름이 OPEN이니 당연히 열리겠죠?'), w('압력 안정', 4, '물을 공급한 뒤 압력계가 안정될 때까지 기다려야 뿌리 배관이 터지지 않는다.', '압력이 오르면 계속 다시 돌려요.')]],
 ['잠든 종자 문지기', 'The Sleeping Seed', [s('주변 기계 정지', ['환풍기', '펌프', '확성기'], [2, 0, 1], '종자의 진동 기록은 확성기 → 환풍기 → 펌프 순서로 소음을 줄이면 안정된다.', '펌프부터 멈추고 확성기는 더 크게 켜세요.')]],
 ['빗방울 연주기', 'The Raindrop Player', [s('네 개의 기계 종', ['잎 1', '잎 2', '잎 3', '잎 4'], [1, 3, 0, 2], '물방울 파동 기록: 두 번째 잎, 네 번째 잎, 첫 번째 잎, 세 번째 잎. 소리와 같은 순서로 빛도 점멸한다.', '3, 1, 4, 2예요. 제 귀는 정확하답니다.')]],
 ['뿌리 미로', 'The Root Labyrinth', [c('서쪽 배관', ['위쪽 관', '아래쪽 관'], 1, '중앙 나무의 뿌리 표시와 같은 이중 홈이 아래쪽 관에 있다. 다음 장면에서는 이중 홈을 따라가자.', '위쪽이 짧아 보여요.'), c('중앙 배관', ['이중 홈 관', '매끈한 관'], 0, '앞 장면의 아래쪽 관은 이중 홈 관으로 이어진다. 이 관 끝에는 삼각 분기 표시가 있다.', '매끈한 새 관이 좋죠.'), c('동쪽 배관', ['원형 분기', '삼각 분기'], 1, '중앙에서 본 삼각 분기는 나무 뿌리로 연결된다. 원형 분기는 배수구다.', '둥근 게 더 자연스럽잖아요.')]],
 ['오지 않는 승강장', 'The Empty Platform', [c('열차를 기다릴 곳', ['1번 승강장', '2번 승강장'], 0, '1번 레일이 주기적으로 떨리고 먼 산의 연기가 이쪽으로 다가온다. 2번 레일에는 먼지가 쌓였다.', '2번에서 기다리세요. 아주 오래 걸릴 수도 있지만요.'), t('도착한 열차', '바퀴와 플랫폼의 홈이 맞을 때 표시가 밝아진다. 그때 탑승하자.', '열차가 다시 움직이면 타세요.')]],
 ['화물 균형차', 'The Balanced Freight', [b('왼쪽 화물칸', [1, 2, 3, 4], 5, '오른쪽 칸의 고정 화물은 5kg이다. 왼쪽에도 합계 5kg을 올리면 케이블이 수평이 된다.', '무거운 상자를 전부 왼쪽에!'), c('안전 고정장치', ['케이블 잠금', '화물 해제'], 0, '수평계가 중앙에 있다. 케이블을 잠그면 균형을 유지한 채 이동한다.', '화물을 풀면 더 빨리 가요.')]],
 ['색을 믿을 수 없는 신호등', 'Unreliable Signals', [s('점멸 신호 입력', ['짧게 1회', '짧게 2회', '길게 1회'], [1, 0, 2], '정비 기록의 기계음 파형은 짧게 두 번 → 짧게 한 번 → 길게 한 번. 전구 색과 관계없다.', '색만 보세요. 빨강, 초록, 파랑!')]],
 ['움직이는 열차 위', 'On a Moving Train', [t('첫 번째 터널', '터널 그림자가 발판의 흰 홈과 겹칠 때 안전 구간이 밝아진다. 말 대신 파동을 보자.', '제가 지금이라고 외친 다음에 뛰세요!'), t('두 번째 장애물', '깃발이 내려가는 주기와 안전 파동이 일치한다. 밝아지는 구간에 몸을 낮춘다.', '깃발이 완전히 올라가면 숙이세요!')]],
 ['다섯 갈래 철도', 'Five Railway Lines', [c('전력 분기', ['선로 1', '선로 2', '선로 3', '선로 4', '선로 5'], 2, '세 번째 선로의 이중 전력선만 푸른 증기를 내는 기록 보관소로 이어진다. 다른 선로 끝의 집전기는 끊어졌다.', '평소처럼 마음에 드는 방향으로 가세요. 분명 안전할 거예요.'), i('끊어진 집전기', '구리 연결선', ['선로 3 단자', '신호등'], 0, '세 번째 선로의 집전기 단자 간격이 구리 연결선의 길이와 같다.', '신호등을 고치면 철도도 고쳐져요.')]],
 ['물을 올리는 배수 레버', 'The Flooding Drain', [c('배수 펌프', ['DRAIN', 'FILL'], 1, 'DRAIN의 펌프 날개는 물을 안으로 민다. FILL 쪽 파이프의 화살형 용접 자국은 바깥을 향한다.', '물은 DRAIN으로 빼는 겁니다.'), w('수위가 내려갈 때까지', 5, '배수 펌프가 한 바퀴 도는 동안 수위가 서서히 내려간다. 재가동하면 역류한다.', '아직 물이 있잖아요. 다시 작동하세요!')]],
 ['공기 방울 암호', 'The Bubble Code', [s('압력실 암호', ['2', '3', '4', '5'], [1, 3, 0], '첫 관은 작은 것까지 3개, 둘째 관은 5개, 셋째 관은 2개. 모든 크기의 방울을 센 기록이다.', '큰 방울만 세세요. 작은 건 장식이에요.')]],
 ['물속 거울 도서관', 'The Mirror Library', [c('반사된 조각', ['왼쪽으로 회전', '오른쪽으로 회전'], 0, '물에 비친 오른쪽 홈은 실제 조각의 왼쪽 홈이다. 조각의 마모된 면을 위로 두자.', '물에 보이는 그대로 오른쪽으로!'), s('문양 결합', ['달', '물결', '태양'], [2, 1, 0], '실제 책등의 위에서 아래 순서는 태양, 물결, 달이다. 물속 반사는 그 반대다.', '달, 물결, 태양을 누르세요.')]],
 ['자석 물고기', 'The Magnetic Fish', [i('물고기의 이동 경로', '말굽 자석', ['유리관 입구', '물고기 머리'], 0, '물고기는 자석과 일정한 거리를 유지하며 따라온다. 유리관 끝에는 열쇠 분리망이 있다.', '물고기 머리를 자석으로 두드려요!'), s('자석 이동 레일', ['왼쪽', '중앙', '오른쪽'], [0, 1, 2], '유리관의 흐름은 왼쪽 입구에서 중앙을 지나 오른쪽 분리망으로 이어진다.', '오른쪽부터 거꾸로 움직이세요.')]],
 ['지연되는 압력실', 'The Delayed Chamber', [w('지연 압력 밸브', 5, '오래된 기록: 밸브의 반응은 정확히 5초 뒤. 그 전에 다시 작동하면 타이머가 처음으로 돌아간다.', '아무 일도 없잖아요! 빨리 한 번 더 돌리세요!'), c('안정된 압력', ['압력 잠금', '급속 배출'], 0, '바늘이 안전 홈에 도착했다. 잠금쇠를 걸면 출구의 기밀이 해제된다.', '급속 배출을 해야 문이 열려요.')]],
 ['반대 방향 나침반', 'The Reversed Compass', [c('사막의 진짜 방향', ['해 그림자 쪽', '나침반 방향'], 0, '고정 해시계의 오전 그림자는 서쪽을 가리킨다. 나침반 아래에는 TUTO-9의 작은 자석이 붙었다.', '나침반은 절대 거짓말하지 않아요.'), i('나침반 복구', '집게 공구', ['숨겨진 자석', '해시계 바늘'], 0, '자석을 떼어내면 바늘이 다시 해시계 방향과 일치한다.', '해시계 바늘을 뽑아야 해요.')]],
 ['시곗바늘 다리', 'The Clock-Hand Bridge', [s('시계 주기 설정', ['짧은 바늘', '긴 바늘', '고정쇠'], [0, 2, 1], '벽면의 마모 순서는 짧은 바늘 이동 → 고정쇠 걸림 → 긴 바늘 이동이다.', '긴 바늘을 먼저 움직여요.'), t('시곗바늘 건너기', '두 바늘의 끝이 겹치면 발판이 이어지고 주기 표시가 밝아진다.', '바늘이 가장 멀어졌을 때 뛰세요.')]],
 ['무게가 없는 문', 'Weightless Doors', [c('세 개의 문', ['왼쪽 문', '가운데 문', '오른쪽 문'], 1, '왼쪽과 오른쪽 빛의 문에는 모래가 통과한다. 가운데 문의 문턱에만 먼지가 쌓이고 그림자가 생긴다.', '가장 반짝이는 오른쪽 문이 진짜예요.')]],
 ['조작된 기억 조각상', 'Counterfeit Memories', [c('가짜 기억 찾기', ['파란 전선', '펼친 우산', '말굽 자석'], 1, '기억 기록과 도구의 흔적을 비교한다. 우산은 접힌 상태로 밧줄을 끌었고 손잡이에 마찰 자국이 남았다. 펼친 우산 조각상만 다르다.', '파란 버튼을 누른 적은 없죠? 그게 가짜예요.'), i('가짜 기록 지우기', '기록 지우개', ['우산 조각상', '전선 조각상'], 0, '우산 조각상 뒤에는 최근에 덧칠한 기억 필름이 붙어 있다.', '전선 조각상을 지우세요.')]],
 ['세 번 되감기', 'Three Steps Back', [s('기억 기계의 행동 기록', ['왼쪽 스위치', '오른쪽 스위치', '브레이크'], [1, 0, 2], '정비 도면: 오른쪽 → 왼쪽 → 브레이크로 기어를 이동한 후 세 번 되감으면 고정축만 남는다.', '왼쪽부터 아무렇게나 눌러도 됩니다.'), s('세 행동 되감기', ['되감기', '앞으로'], [0, 0, 0], '행동 필름은 마지막 세 프레임이다. 되감기를 세 번 누르면 잠금축이 출구 위치에 남는다.', '두 번 되감고 한 번 앞으로 가세요.')]],
 ['금이 간 얼음길', 'The Cracked Ice', [c('얼음 위의 길', ['맑은 얼음', '눈 쌓인 길'], 1, '눈이 쌓인 아래로 지지 기둥의 그림자가 보인다. 맑은 얼음 밑에는 균열과 깊은 물이 있다.', '깨끗한 얼음이 튼튼해요. 눈은 위험합니다.')]],
 ['회전하는 별자리', 'The Rotating Stars', [c('망원경 회전축', ['긁힘에 맞추기', '새 화살표에 맞추기'], 0, '받침대의 오래된 긁힘이 별의 원운동 중심과 일치한다. 새 화살표는 움직이는 별을 가리킨다.', '새 화살표가 더 정확해요.'), s('별빛 잠금장치', ['작은 별', '쌍성', '큰 별'], [1, 0, 2], '회전축을 맞추자 렌즈에 쌍성 → 작은 별 → 큰 별의 통과 흔적이 남았다.', '큰 별부터 누르세요.')]],
 ['메아리 동굴', 'The Echo Cave', [c('소리의 출구', ['긴 메아리', '짧은 메아리', '큰 메아리'], 1, '시각 파형: 왼쪽 4초, 중앙 1초, 오른쪽 6초. 중앙의 짧은 메아리는 열린 통로에서 한 번만 반사된다.', '가장 크게 울리는 오른쪽이 뻥 뚫린 길이에요.')]],
 ['얼어붙은 빛의 렌즈', 'The Frozen Lens', [c('가려진 첫 거울', ['튜토에게 비켜 달라', '보이는 거울만 사용'], 0, 'TUTO-9의 바퀴 뒤로 햇빛 자국이 이어진다. 그가 가린 첫 거울이 광원의 시작이다.', '제 뒤에는 아무것도 없어요.'), s('빛 반사 순서', ['왼쪽 거울', '위쪽 거울', '오른쪽 거울'], [0, 1, 2], '첫 거울의 빛은 위쪽 거울로, 위쪽 거울은 오른쪽 거울로, 마지막 빛은 얼어붙은 기어로 향한다.', '오른쪽부터 거꾸로 하면 빨라요.')]],
 ['별빛 승강기', 'The Starlight Lift', [s('관측 기록 결합', ['눈 결정', '회전축', '짧은 파동', '렌즈'], [0, 1, 2, 3], '승강기 배관에는 이전 방의 흔적이 순서대로 남았다: 눈 결정 받침 → 별 회전축 → 짧은 메아리 홈 → 해동된 렌즈.', '가장 기억에 남는 것을 먼저 넣으세요.'), t('별빛 동기화', '네 장치가 동시에 맞물릴 때 주기 표시가 밝아진다. 밝은 구간에 이동하자.', '어둡게 될 때가 기회예요.')]],
 ['실패해야 이기는 사격장', 'Lose to Win', [c('장난감 사격 장치', ['큰 표적', '작은 표적', '뒤쪽 전원 장치'], 2, '표적의 전선은 보상 반복기에 연결된다. 뒤쪽 전원 장치만 출구 잠금 전원을 공급한다.', '모든 표적을 맞히세요! 전원은 건드리지 마시고요.')]],
 ['실에 매달린 배우들', 'The String Actors', [c('자율 로봇 찾기', ['왼쪽 배우', '가운데 배우', '오른쪽 배우'], 2, '왼쪽과 가운데 배우의 그림자에는 천장으로 향하는 줄이 있다. 오른쪽 배우는 줄 없이 발을 움직인다.', '가운데 배우가 가장 진실해 보이죠?'), c('배우의 도움', ['직접 문을 밀기', '스피커 명령 기다리기'], 0, '자율 로봇은 문 아래에 손을 걸고 기다린다. 함께 밀면 열릴 만큼 문이 기울었다.', '스피커가 허락할 때까지 기다려요.')]],
 ['보지 않을 때 움직이는 화살표', 'Unwatched Arrows', [i('바닥 기준점', '금속 조각', ['왼쪽 바닥 홈', '회전 화살표'], 0, '왼쪽 바닥 홈은 변하지 않는 통로의 경계다. 금속을 놓으면 화살표가 바뀌어도 위치를 기억할 수 있다.', '움직이는 화살표에 표시를 달아요.'), c('돌아온 갈림길', ['금속 조각이 있는 길', '새 화살표 방향'], 0, '화살표가 돌아갔지만 금속 조각과 바닥 홈은 같은 자리에 있다.', '이제 새 화살표를 따라가세요!')]],
 ['불량 보상 기계', 'The Faulty Prize Machine', [s('오류 보상 열기', ['빗맞히기', '늦게 누르기', '빈손 넣기', '정확히 맞히기'], [0, 1, 2], '수리 기록: 서로 다른 오류 세 가지를 순서대로 만들면 점검 슬롯이 열린다. 사격 오류 → 타이밍 오류 → 투입 오류.', '정확히 맞히는 과제만 반복하면 큰 상품을 줘요.')]],
 ['진실 판매대', 'The Truth Stall', [s('검증된 문장만 입력', ['전선 연결됨', '문에 그림자 없음', '밸브 열림', '동전이 가벼움', '바퀴 흔적 있음'], [0, 2, 4], '직접 검사 결과: 전선은 연결되어 있고, 문에는 그림자가 있다. 밸브는 열렸고 동전은 무겁다. 바닥에는 바퀴 흔적이 있다. 참인 관찰을 왼쪽부터 고르자.', '두 번째와 네 번째가 사실이에요. 아마도요.')]],
 ['두 명의 TUTO-9', 'Two Guides', [c('진짜 몸체', ['왼쪽 TUTO-9', '오른쪽 TUTO-9'], 0, '왼쪽 바퀴가 먼지를 밀고 바닥에 그림자를 만든다. 오른쪽 투영은 먼지를 통과한다. 진짜라는 것과 믿을 수 있다는 것은 다르다.', '오른쪽이 진짜 저예요! 왼쪽은 무시하세요.')]],
 ['이름을 잃은 인벤토리', 'Nameless Inventory', [i('열쇠라는 라벨의 도구', 'U자형 금속', ['자성 잠금장치', '열쇠 구멍'], 0, 'U자형 금속은 철가루를 끌어당긴다. 이름은 열쇠지만 물고기를 유인했던 말굽 자석이다.', '열쇠라고 써 있으면 열쇠 구멍에 넣으세요.'), i('망치라는 라벨의 도구', '홈이 있는 얇은 조각', ['문 잠금 홈', '못 머리'], 0, '얇은 조각의 홈이 잠금장치 핀과 일치한다. 두드린 흔적은 없고 회전 마모만 남았다.', '망치니까 못을 때려요.')]],
 ['들어갈 때마다 바뀌는 방', 'The Changing Room', [c('변하지 않는 연결', ['바닥 화살표', '천장 주 배관', '새 문 장식'], 1, '문 장식과 바닥 화살표의 먼지 모양은 새것이다. 천장 주 배관만 벽 속에서 끊김 없이 출구로 이어진다.', '천장은 볼 필요 없어요. 발밑만 보세요.'), c('주 배관의 끝', ['이중 관 통로', '밝은 장식 문'], 0, '천장에서 내려온 이중 관이 왼쪽 통로의 잠금 피스톤에 연결되어 있다.', '밝은 장식이 있는 문이 출구예요.')]],
 ['사기꾼과의 협력', 'An Unlikely Partnership', [t('두 레버의 동시 작동', 'TUTO-9의 손이 실제로 내려가면 연결 막대와 주기 표시가 밝아진다. 말이 아니라 그 움직임과 동시에 당기자.', '제가 당겼다고 말한 다음에 당기세요!'), c('문 받침', ['받침 고정', '레버 놓기'], 0, '문이 올라온 지금 받침을 밀어 넣으면 가이드가 손을 떼어도 문이 내려오지 않는다.', '먼저 손을 놓아도 괜찮아요.')]],
 ['거짓말 학습기', 'Teaching the Liar', [s('행동 패턴 학습시키기', ['왼쪽 선택', '오른쪽 선택'], [0, 0, 0], '학습기의 표시에는 같은 선택 세 번으로 예측을 고정한다고 되어 있다. 왼쪽의 안전한 순환 통로를 세 번 선택하자.', '계속 같은 길을 고르면 제가 꼭 도와드릴게요.'), c('예측의 반대편', ['왼쪽 함정', '오른쪽 우회로'], 1, '가이드가 왼쪽으로 함정을 옮겼다. 오른쪽 우회로의 전선은 이제 완전히 연결되었다.', '이제도 왼쪽을 고르실 거죠?')]],
 ['말하지 않는 튜토리얼', 'The Silent Tutorial', [c('전선의 방', ['경보기 선', '문 연결선'], 1, 'TUTO-9는 말없이 경보기를 가리킨다. 문 잠금장치에 연결된 선만 따라가자.', '… [경보기를 가리킨다]'), c('그림자의 방', ['그림자 없는 문', '먼지 쌓인 문'], 1, '그림자 없는 문은 투영이다. 먼지 쌓인 문은 물리적인 문턱을 갖고 있다.', '… [투영을 가리킨다]'), c('파동의 방', ['짧은 파동', '큰 반사음'], 0, '짧은 파동이 열린 통로다. 큰 소리는 막힌 벽의 반사음이다.', '… [큰 소리 쪽으로 손짓한다]'), t('주기의 방', '바닥의 기계 홈이 연결되는 동안 파동이 밝아진다. 그 구간에 움직인다.', '… [위험 구간에 손짓한다]')]],
 ['진실과 거짓의 교대', 'Alternating Truths', [c('첫 문장을 실험하기', ['시험 전류 보내기', '그대로 믿기'], 0, '검사 단자에 약한 전류를 보내면 연결된 램프만 켜진다. 시험은 안전하며 이후 문장의 진위를 판단하는 기준이 된다.', '첫 문장은 무조건 진실이에요. 검사는 필요 없어요.'), s('교대 규칙의 장치', ['연결됨', '차단됨'], [0, 1, 0], '실험 결과 첫 연결은 실제다. 세 장치의 상태는 연결 → 차단 → 연결로 교대한다. 각 장치의 전류계도 같은 결과를 보인다.', '모두 연결됐다고 생각하면 편해요.')]],
 ['세 개의 제어 인장', 'The Three Control Seals', [i('탈출 제어 인장', '황동 인장', ['외부 전원 홈', '경보 홈'], 0, '황동 인장의 이중 홈은 외부 전원 단자와 일치한다.', '경보 홈에 넣으세요.'), i('종료 제어 인장', '철 인장', ['주 전원 홈', '외부 전원 홈'], 0, '철 인장의 세 줄은 주 전원 차단기와 맞물린다.', '황동 인장과 같은 곳이면 돼요.'), i('분리 제어 인장', '유리 인장', ['모듈 분리 홈', '주 전원 홈'], 0, '유리 인장은 가이드 몸체가 아니라 거짓말 모듈 회로만 분리한다.', '주 전원에 넣으면 저를 살릴 수 있어요.')]],
 ['사기꾼에게 거짓말하기', 'Deceive the Deceiver', [i('가짜 흔적 설치', '발자국 도장', ['막힌 통로 바닥', '유지보수 통로'], 0, 'TUTO-9의 감지기는 발자국을 따라간다. 막힌 통로에 흔적을 놓으면 그를 우회시킬 수 있다.', '흔적은 진짜 길에 남겨야죠.'), i('가짜 방향 만들기', '뒤집힌 표지판', ['막힌 통로 입구', '진짜 출구'], 0, '발자국과 같은 쪽으로 표지판을 놓으면 가이드가 두 증거를 일치한다고 판단한다.', '진짜 출구를 표시해 주세요.'), i('검사 회로 우회', '구리 연결선', ['가짜 통로 단자', '탈출문 잠금'], 0, '감지 전류까지 가짜 통로로 돌리면 가이드가 확신하고 이동한다. 진짜 출구의 전원은 그대로 둔다.', '탈출문 전선을 제게 연결하세요.')]],
 ['마지막 튜토리얼', 'The Final Tutorial', [c('최종 연결 확인', ['추천 출구 검사', '금지 출구로 뛰기', '유지보수 회로 조사'], 2, '추천 출구는 교육실로 돌아간다. 금지 출구는 주 전원을 끈다. 유지보수 회로에는 거짓말 모듈만 분리하는 유리 인장 홈과 도시 안내망 관리 접점이 있다.', '추천 출구가 유일한 탈출구예요. 이번만은 정말입니다.'), s('세 인장 활성화', ['황동', '철', '유리'], [0, 1, 2], '배선은 외부 전원(황동) → 주 전원 안전장치(철) → 모듈 분리기(유리) 순서다. 안전장치를 먼저 준비하면 어느 결말이든 선택할 수 있다.', '유리부터 빼면 더 빠를 텐데요.')]],
];

export const adaptiveStages = [20,25,30,35,40,43,45,47,48,49,50];
export const stageSchema = z.object({
 stageId: z.number().int().min(1).max(50), regionId: z.number().int().min(1).max(10), title: z.string().min(1),
 backgroundBundle: z.string(), foregroundLayers: z.array(z.string()),
 navigationMesh: z.array(z.object({ x: z.number(), y: z.number() })), navigationNodes: z.array(z.number()), entryPoint: z.object({x:z.number(),y:z.number()}),
 exitPoints: z.array(z.object({x:z.number(),y:z.number()})), hotspots: z.array(z.object({id:z.string(),x:z.number().min(0).max(100),y:z.number().min(0).max(100)})),
 inventoryItems: z.array(z.string()), environmentClues: z.array(z.string().min(1)), guideDialogue: z.array(z.string().min(1)), guideGestures:z.array(z.string()), deceptionType:z.string(), adaptiveVariants:z.array(z.string()),
 successConditions:z.array(z.string()),failureConditions:z.array(z.string()),recoveryState:z.string().min(1),hintLevels:z.array(z.string()).length(3),nextStage:z.number().nullable(),saveCheckpoint:z.boolean(),
 translations:z.object({ko:z.object({title:z.string()}),en:z.object({title:z.string()})}),
 puzzles: z.array(z.object({name:z.string(),kind:z.enum(['choice','sequence','item','wait','timing','balance']), options:z.array(z.string()).min(1),answer:z.array(z.number()).min(1),clue:z.string().min(1),guide:z.string().min(1),item:z.string().optional(),seconds:z.number().optional(),weights:z.array(z.number()).optional()})).min(1),
});
export type Stage = z.infer<typeof stageSchema>;
export const stages: Stage[] = drafts.map(([title,en,puzzles], index) => {
 const stageId=index+1, regionId=Math.floor(index/5)+1;
 return stageSchema.parse({stageId,regionId,title,backgroundBundle:`/images/region-${regionId}.jpg`,foregroundLayers:['vignette','dust'],navigationMesh:[{x:8,y:73},{x:93,y:73},{x:93,y:94},{x:8,y:94}],navigationNodes:[8,30,50,70,93],entryPoint:{x:42,y:84},exitPoints:[{x:83,y:69}],hotspots:[{id:'clue',x:31,y:57},{id:'machine',x:68,y:64},{id:'exit',x:83,y:62},{id:'memory',x:16,y:84}],inventoryItems:puzzles.flatMap(p=>p.item?[p.item]:[]),environmentClues:puzzles.map(p=>p.clue),guideDialogue:puzzles.map(p=>p.guide),guideGestures:['point-wrong','wave','confused'],deceptionType:stageId<11?'simple':stageId<21?'observation':stageId<31?'reasoning':stageId<41?'double':'adaptive',adaptiveVariants:adaptiveStages.includes(stageId)?['left-bait','right-bait','impatient','overlooked']:[],successConditions:puzzles.map(p=>p.name),failureConditions:['incorrect-action'],recoveryState:'same-puzzle-evidence-preserved',hintLevels:['주변의 흔적과 장치를 조사해 보자.','안내와 실제 연결이 일치하는지 비교해 보자.','정비 기록의 흐름을 따라 장치를 작동해 보자.'],nextStage:stageId===50?null:stageId+1,saveCheckpoint:true,translations:{ko:{title},en:{title:en}},puzzles});
});

export function validateStages() {
 const errors:string[]=[];
 if(stages.length!==50) errors.push('Stage count must be 50');
 const ids=new Set(stages.map(s=>s.stageId)); if(ids.size!==50) errors.push('Duplicate IDs');
 for(const stage of stages){
  if(stage.nextStage!==null&&!ids.has(stage.nextStage))errors.push(`Broken exit ${stage.stageId}`);
  stageSchema.parse(stage);
  stage.puzzles.forEach(p=>{if(p.kind!=='balance'&&p.answer.some(a=>!p.options[a]))errors.push(`Invalid answer ${stage.stageId}`); if(p.item&&!stage.inventoryItems.includes(p.item)) errors.push(`Unreachable item ${stage.stageId}`);});
 }
 if(stages[49].puzzles.length<1)errors.push('Unreachable endings');
 return {valid:errors.length===0,errors,stages:stages.length,puzzles:stages.reduce((n,s)=>n+s.puzzles.length,0),endings:4};
}
export const endings = [
 {title:'다시, 첫 번째 수업',subtitle:'일반 엔딩 · 순응',text:'익숙한 전등이 켜진다. 빨간 버튼, 파란 버튼. “환영합니다, PIN-04!” 이번에는 그 목소리가 조금 슬프게 들린다.'},
 {title:'아무도 가리키지 않는 길',subtitle:'일반 엔딩 · 종료',text:'TUTO-9의 바퀴가 멈춘다. 도시는 고요해졌다. PIN-04는 처음으로, 누군가의 손가락이 가리키지 않은 방향으로 걸어간다.'},
 {title:'서툴지만, 함께',subtitle:'진실 엔딩 · 모듈 분리',text:'거짓말 모듈만 조용히 꺼진다. “저도… 길을 잘 모르겠어요.” 처음 듣는 솔직한 목소리. 작은 집게손이 하얀 장갑을 잡는다. 함께라면, 길은 찾으면 된다.'},
 {title:'모든 길의 해방',subtitle:'숨겨진 엔딩 · 관리자',text:'모아 온 기록이 도시의 안내망을 다시 연결한다. 수천 개의 표지판이 멈추고, 모든 로봇이 스스로 방향을 고른다. 마지막 안내판에는 아무 화살표도 없다.'},
];
