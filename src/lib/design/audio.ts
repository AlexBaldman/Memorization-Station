'use client';

// Lightweight retro audio synthesizer using Web Audio API.
// This avoids large base64 strings and gives us procedural control over the "juiciness".

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  
  // Retro coin/success sweep
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

export function playErrorSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  
  // Retro buzz/error
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
  
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

export function playFlipSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  
  // Quick subtle whoosh
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

export function playDiceRollSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Tri-tone cyber tumble chime
  const tones = [
    { offset: 0, freq: 220 },
    { offset: 0.09, freq: 340 },
    { offset: 0.19, freq: 560 },
  ];

  for (const { offset, freq } of tones) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + offset + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + offset + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + offset);
    osc.stop(ctx.currentTime + offset + 0.1);
  }
}
