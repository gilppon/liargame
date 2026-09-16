// Web Audio API 기반 절차적 신디사이저 엔진 (외부 오디오 파일 0MB)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// 1. 캐릭터 대사 타이핑 블립 사운드 (언더테일 / 동물의 숲 스타일)
export function playBlip(speaker: 'TUTO-9' | 'PIN-04' | 'SYSTEM', tone?: 'normal' | 'success' | 'fail' | 'clue', enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (speaker === 'TUTO-9') {
      // TUTO-9: 깐족거리고 톡톡 튀는 스퀘어(Square)/트라이앵글 파형 + 피치 변동
      osc.type = tone === 'fail' ? 'sawtooth' : 'square';
      // 기본 320Hz 부근에서 무작위 지터로 익살스러운 말소리 느낌 연출
      const baseFreq = tone === 'fail' ? 220 : 340;
      const jitter = (Math.random() - 0.5) * 70;
      osc.frequency.setValueAtTime(baseFreq + jitter, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, t + 0.05);

      gain.gain.setValueAtTime(0.025, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } else {
      // PIN-04: 조용하고 귀여운 황동 미니 로봇 (부드러운 사인파 삐빅)
      osc.type = 'sine';
      const baseFreq = tone === 'success' ? 587.33 : 440; // D5 or A4
      const jitter = (Math.random() - 0.5) * 30;
      osc.frequency.setValueAtTime(baseFreq + jitter, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, t + 0.04);

      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.045);
    }
  } catch {}
}

// 2. 글리치 / 충격 노이즈 사운드 (거짓말 발각 및 회로 쇼크)
export function playGlitchShock(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    // 화이트 노이즈 버퍼 생성 (0.15초)
    const bufferSize = Math.floor(ctx.sampleRate * 0.15);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // 대역 필터로 지직거리는 전기 소음 강조
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(400, t + 0.14);
    filter.Q.setValueAtTime(3, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.15);
  } catch {}
}

// 3. 퍼즐 해결 / 성공 팡파르 (경쾌한 3단 아르페지오 신스)
export function playPuzzleSuccess(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // E-G#-B-E (마장조 화음 아르페지오)
    const notes = [329.63, 415.30, 493.88, 659.25];
    notes.forEach((freq, i) => {
      const at = ctx.currentTime + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, at);

      gain.gain.setValueAtTime(0.04, at);
      gain.gain.exponentialRampToValueAtTime(0.0005, at + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(at);
      osc.stop(at + 0.36);
    });
  } catch {}
}

// 4. 퍼즐 실패 / 장치 오류 버저 (묵직한 하향 톱니파)
export function playPuzzleFail(enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(95, t + 0.28);

    gain.gain.setValueAtTime(0.045, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  } catch {}
}

// 5. 버튼 클릭 & 사물 상호작용 햅틱 사운드
export function playInteract(type: 'click' | 'step' | 'switch' = 'click', enabled = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'step') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    } else if (type === 'switch') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.setValueAtTime(780, t + 0.04);
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + 0.05);
      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  } catch {}
}
