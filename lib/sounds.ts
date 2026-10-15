// Synthesized sound effects via Web Audio — no asset files needed.
// AudioContext is created lazily on first play (browser autoplay rules
// require a user gesture anyway, so sounds only fire after interaction).

const SOUND_KEY = 'tradequest-sound-enabled';

let ctx: AudioContext | null = null;
let enabled = true;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined' || !enabled) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, delay: number, duration: number, type: OscillatorType = 'sine', volume = 0.12) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const t0 = ac.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export function isSoundEnabled() {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(SOUND_KEY);
  enabled = stored === null ? true : stored === 'true';
  return enabled;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try { localStorage.setItem(SOUND_KEY, String(on)); } catch { /* noop */ }
  if (!on && ctx) { void ctx.suspend(); }
}

export function playCorrect() {
  tone(660, 0, 0.12);
  tone(880, 0.09, 0.18);
}

export function playWrong() {
  tone(196, 0, 0.22, 'sawtooth', 0.06);
  tone(147, 0.12, 0.28, 'sawtooth', 0.06);
}

export function playComplete() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.25, 'triangle'));
}

export function playFail() {
  [392, 330, 262, 196].forEach((f, i) => tone(f, i * 0.13, 0.3, 'sine', 0.1));
}

export function playClaim() {
  tone(1047, 0, 0.09, 'square', 0.05);
  tone(1319, 0.07, 0.09, 'square', 0.05);
  tone(1568, 0.14, 0.16, 'square', 0.05);
}
