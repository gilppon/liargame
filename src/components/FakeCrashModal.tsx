import { useEffect } from 'react';
import { playGlitchShock } from '../game/audio';
import { type Settings } from '../game/state';
import { desktopShakeWindow, desktopSetTitle, desktopTriggerPanic } from '../game/desktop';

export function FakeCrashModal({
  settings,
  onRecover
}: {
  settings: Settings;
  onRecover: () => void;
}) {
  useEffect(() => {
    playGlitchShock(settings.sound);

    // 데스크톱 전용 메타 연출: 물리적 창 진동 + 타이틀 변경 + 패닉 모드
    desktopShakeWindow();
    desktopSetTitle('⚠️ [FATAL EXCEPTION] TUTO_OS KERNEL PANIC 0x0000007F');
    desktopTriggerPanic(false);

    const timer = setTimeout(() => {
      handleRestoreAndRecover();
    }, 3200);

    const handleRestoreAndRecover = () => {
      desktopSetTitle('거짓말하는 튜토리얼 (Deceptive Guide)');
      onRecover();
    };

    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      handleRestoreAndRecover();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      desktopSetTitle('거짓말하는 튜토리얼 (Deceptive Guide)');
    };
  }, [onRecover, settings.sound]);

  return (
    <div
      className="fake-crash-overlay"
      onClick={onRecover}
      role="alert"
      aria-label="가짜 시스템 커널 패닉"
    >
      <div className="fake-crash-scanline" />
      <div className="fake-crash-content">
        <div className="fake-crash-header">
          <span className="blink-dot" />
          <span>*** TUTO_OS KERNEL PANIC (FATAL EXCEPTION) ***</span>
        </div>

        <p className="fake-crash-code">
          STOP: 0x0000007F (0x00000008, 0x80042000, 0x00000000, 0x00000000)<br />
          MODULE: TUTO_DECEPTION_CORE.SYS - AT ADDRESS 0xDEADBEEF
        </p>

        <div className="fake-crash-hex">
          0x0010: 47 55 49 44 45 5F 4C 49 41 52 00 FF 2A 1B 90 AC<br />
          0x0020: 54 55 54 4F 2D 39 20 4F 56 45 52 48 45 41 54 21<br />
          0x0030: 50 49 4E 2D 30 34 20 44 45 54 45 43 54 45 44 2E<br />
          0x0040: 53 59 53 54 45 4D 20 52 45 42 4F 4F 54 49 4E 47...
        </div>

        <p className="fake-crash-hint">
          &gt; 가이드 기만 프로세스가 메모리 오버플로우로 긴급 재부팅됩니다.<br />
          &gt; 재부팅 중... (화면을 클릭하거나 아무 키를 누르면 즉시 복구)
        </p>

        <div className="fake-crash-footer">
          <span className="terminal-cursor">█</span> REBOOTING CORE MEMORY...
        </div>
      </div>
    </div>
  );
}
