export interface Achievement {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  icon: string;
}

export const STEAM_ACHIEVEMENTS: Record<string, Achievement> = {
  FIRST_DOUBT: {
    id: 'FIRST_DOUBT',
    titleKo: '첫 번째 의심',
    titleEn: 'The First Doubt',
    descriptionKo: '가이드의 말을 처음으로 거부하고 다른 버튼을 눌렀습니다.',
    descriptionEn: 'Refused the guide\'s instruction for the first time.',
    icon: '⚡'
  },
  TRUTH_REVEALED: {
    id: 'TRUTH_REVEALED',
    titleKo: '코드 속 진실',
    titleEn: 'Truth in the Code',
    descriptionKo: '개발자 도구 콘솔에서 가이드의 모순을 강제로 폭로했습니다.',
    descriptionEn: 'Exposed the guide\'s paradox via developer console.',
    icon: '💻'
  },
  KERNEL_PANIC: {
    id: 'KERNEL_PANIC',
    titleKo: '치명적 예외',
    titleEn: 'Fatal Exception',
    descriptionKo: '가이드 코어를 강제로 패닉에 빠뜨렸습니다.',
    descriptionEn: 'Triggered a kernel panic in TUTO-9.',
    icon: '⚠️'
  },
  SKEPTIC_SOUL: {
    id: 'SKEPTIC_SOUL',
    titleKo: '절대 불신자',
    titleEn: 'Absolute Skeptic',
    descriptionKo: '성향 진단서에서 최고 등급 EX 판정을 받았습니다.',
    descriptionEn: 'Achieved EX Grade in Civic Personality Diagnosis.',
    icon: '📜'
  },
  MEMORY_COLLECTOR: {
    id: 'MEMORY_COLLECTOR',
    titleKo: '기억의 수집가',
    titleEn: 'Memory Collector',
    descriptionKo: '빛바랜 기억 조각 10개를 모두 발견했습니다.',
    descriptionEn: 'Discovered at least 10 faded memory fragments.',
    icon: '✨'
  },
  MASTER_EXPLORER: {
    id: 'MASTER_EXPLORER',
    titleKo: '50개의 여정',
    titleEn: 'Fifty Steps',
    descriptionKo: '모든 50개 스테이지를 돌파했습니다.',
    descriptionEn: 'Cleared all 50 interconnected stages.',
    icon: '🏆'
  },
  ENDING_COMPLIANCE: {
    id: 'ENDING_COMPLIANCE',
    titleKo: '다시, 첫 번째 수업',
    titleEn: 'Again, The First Lesson',
    descriptionKo: '순응 엔딩을 맞이했습니다.',
    descriptionEn: 'Reached the Compliance Ending.',
    icon: '🔄'
  },
  ENDING_SHUTDOWN: {
    id: 'ENDING_SHUTDOWN',
    titleKo: '아무도 가리키지 않는 길',
    titleEn: 'A Path Pointed by None',
    descriptionKo: '종료 엔딩을 맞이했습니다.',
    descriptionEn: 'Reached the Shutdown Ending.',
    icon: '🔌'
  },
  ENDING_TOGETHER: {
    id: 'ENDING_TOGETHER',
    titleKo: '서툴지만, 함께',
    titleEn: 'Clumsy, Yet Together',
    descriptionKo: '진실 엔딩을 맞이했습니다.',
    descriptionEn: 'Reached the True Ending with TUTO-9.',
    icon: '🤝'
  },
  ENDING_ADMIN: {
    id: 'ENDING_ADMIN',
    titleKo: '모든 길의 해방',
    titleEn: 'Liberation of All Paths',
    descriptionKo: '기억 10개로 숨겨진 관리자 엔딩을 달성했습니다.',
    descriptionEn: 'Unlocked the Secret Administrator Ending.',
    icon: '🌟'
  }
};

interface TauriWindow {
  __TAURI__?: {
    core?: {
      invoke: (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;
    };
    invoke?: (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;
  };
  __TAURI_INTERNALS__?: {
    invoke: (cmd: string, args?: Record<string, unknown>) => Promise<unknown>;
  };
}

export function isDesktopApp(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as TauriWindow;
  return Boolean(win.__TAURI__ || win.__TAURI_INTERNALS__);
}

async function tauriInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T | null> {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as TauriWindow;
  try {
    if (win.__TAURI__?.core?.invoke) {
      return (await win.__TAURI__.core.invoke(cmd, args)) as T;
    }
    if (win.__TAURI__?.invoke) {
      return (await win.__TAURI__.invoke(cmd, args)) as T;
    }
    if (win.__TAURI_INTERNALS__?.invoke) {
      return (await win.__TAURI_INTERNALS__.invoke(cmd, args)) as T;
    }
  } catch (err) {
    console.warn(`[Tauri Invoke Error] ${cmd}:`, err);
  }
  return null;
}

/** OS 사용자 계정명 획득 (제4의 벽 돌파 연출) */
export async function getDesktopUsername(): Promise<string> {
  if (isDesktopApp()) {
    const res = await tauriInvoke<string>('get_system_username');
    if (res) return res;
  }
  return 'Operator';
}

/** 데스크톱 윈도우 물리적 셰이크 */
export async function desktopShakeWindow(): Promise<void> {
  if (isDesktopApp()) {
    await tauriInvoke('shake_window');
  }
}

/** 데스크톱 창 타이틀바 동적 조작 */
export async function desktopSetTitle(title: string): Promise<void> {
  if (isDesktopApp()) {
    await tauriInvoke('set_window_title', { title });
  } else if (typeof document !== 'undefined') {
    document.title = title;
  }
}

/** 데스크톱 풀스크린 패닉 모드 */
export async function desktopTriggerPanic(fullscreen: boolean = true): Promise<void> {
  if (isDesktopApp()) {
    await tauriInvoke('trigger_window_panic', { fullscreen });
  }
}

export function unlockAchievement(achievementId: keyof typeof STEAM_ACHIEVEMENTS, notify?: (msg: string) => void) {
  const ach = STEAM_ACHIEVEMENTS[achievementId];
  if (!ach) return;

  // 1. 데스크톱(Tauri / Steamworks) 모드
  if (isDesktopApp()) {
    tauriInvoke('unlock_steam_achievement', { id: ach.id });
  }

  // 2. 인게임 팝업 알림
  if (notify) {
    notify(`${ach.icon} [도전과제 달성] ${ach.titleKo}`);
  }
}
