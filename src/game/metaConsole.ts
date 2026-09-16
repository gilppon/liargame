import { type Game } from './useGame';
import { getDesktopUsername } from './desktop';

declare global {
  interface Window {
    help?: () => void;
    reveal_truth?: () => void;
    reboot_guide?: () => void;
    hack_memory?: () => void;
    whoami?: () => void;
    TUTO_CONSOLE?: boolean;
  }
}

export function initMetaConsole(game: Game, onTriggerCrash: () => void) {
  if (typeof window === 'undefined') return;

  const headerStyle = 'background: #d5b775; color: #111714; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 3px;';
  const warningStyle = 'background: #eb5745; color: #fff; font-weight: bold; font-size: 12px; padding: 3px 6px; border-radius: 2px;';
  const textStyle = 'color: #c8d2ba; font-family: monospace; font-size: 12px; line-height: 1.5;';
  const cmdStyle = 'color: #9cdcfe; font-family: monospace; font-weight: bold; font-size: 12px;';

  // 최초 1회 환영 및 경고 배너 출력
  if (!window.TUTO_CONSOLE) {
    window.TUTO_CONSOLE = true;
    console.log(
      '%c🤖 TUTO-9 SECRET BACKDOOR%c %c⚠️ UNAUTHORIZED ACCESS DETECTED',
      headerStyle,
      '',
      warningStyle
    );
    console.log(
      '%c피실험자가 소스 코드 뒷면(F12 Console)을 훔쳐보고 있습니다.\n' +
      '안내 시스템의 신뢰성을 위해 당장 개발자 도구를 닫으십시오!\n\n' +
      '굳이 참견하고 싶다면 아래 명령어를 입력해 보시든가요:\n' +
      ' • %chelp()%c : 비밀 콘솔 명령어 목록\n' +
      ' • %cwhoami()%c : 현재 단말기 조작자의 진짜 정체 식별 (제4의 벽)\n' +
      ' • %creveal_truth()%c : 가이드의 모순을 강제로 폭로\n' +
      ' • %creboot_guide()%c : 가이드 시스템 강제 재부팅 (주의: 창 진동 및 시스템 불안정)\n' +
      ' • %chack_memory()%c : 정비국의 숨겨진 기억 조각 해킹\n',
      textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle
    );
  }

  // 글로벌 커맨드 등록
  window.help = () => {
    console.log(
      '%c[TUTO-9 SYSTEM HELP]%c 사용 가능한 터미널 커맨드:\n' +
      '1. %cwhoami()%c - 단말기 너머 현실 조작자 정체 분석\n' +
      '2. %creveal_truth()%c - 현재 장치의 물리적 진실과 모순점 분석\n' +
      '3. %creboot_guide()%c - 가이드 인공지능 커널 강제 패닉 및 물리적 창 흔들기\n' +
      '4. %chack_memory()%c - 현재 방에 숨겨진 기억 조각 강제 획득\n',
      headerStyle, textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle,
      cmdStyle, textStyle
    );
    game.notify('콘솔 커맨드 도움말을 확인했습니다.');
  };

  window.whoami = async () => {
    const username = await getDesktopUsername();
    console.log(
      `%c[IDENTITY SCANNER]%c\n` +
      `단말기 지정 개체명: PIN-04\n` +
      `물리적 호스트 계정: 【 ${username} 】\n` +
      `물리 접속 IP/단말: LOCALHOST_DESKTOP_CLIENT\n` +
      `판정: 당신은 단순한 안드로이드가 아닙니다. 모니터 너머의 관측자입니다.`,
      headerStyle, textStyle
    );
    game.setDialogue({
      speaker: 'TUTO-9',
      tone: 'doubt',
      text: `……어? PIN-04 너머에…… '${username}'……? 당신, 대체 어디서 날 보고 있는 거죠?!`
    });
    game.notify(`🔍 조작자 식별 완료: ${username}`);
  };

  window.reveal_truth = () => {
    const p = game.puzzle;
    console.log(
      `%c[TRUTH DECODER]%c 현재 스테이지: ${game.data.stage} - ${game.stage.title}\n` +
      `💡 가이드의 말: "${p.guide}"\n` +
      `🔍 실제 환경 단서: "${p.clue}"\n` +
      `⚠️ 분석 결론: 가이드의 지시는 오답을 유도하고 있습니다!`,
      headerStyle, textStyle
    );
    game.setDialogue({
      speaker: 'TUTO-9',
      tone: 'fail',
      text: '히익! 콘솔 창으로 제 데이터를 뜯어보신 건가요?! 반칙이에요, 반칙!'
    });
    game.notify('⚠️ 콘솔에서 가이드의 모순을 강제 해독했습니다!');
  };

  window.reboot_guide = () => {
    console.warn('⚠️ CRITICAL: TRIGGERING KERNEL PANIC IN TUTO_CORE.SYS...');
    onTriggerCrash();
  };

  window.hack_memory = () => {
    game.collect(true);
    console.log(
      '%c[HACK SUCCESS]%c 메모리 뱅크 침투 완료. 기억 조각을 수첩에 주입했습니다.',
      headerStyle, textStyle
    );
  };
}
