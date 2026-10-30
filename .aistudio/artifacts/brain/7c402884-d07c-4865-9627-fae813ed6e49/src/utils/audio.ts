/**
 * Web Audio API synthesizer for the iconic "Happy Birthday To You" song,
 * romantic chimes, and playful cartoon sound effects.
 */

interface Note {
  freq: number;
  duration: number; // in beats
}

export type MusicTrack = 'happy-birthday' | 'romantic-lofi';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  private currentTrack: MusicTrack = 'happy-birthday';
  private currentStep: number = 0;
  private hbdNoteIdx: number = 0;

  // Happy Birthday melody in C major
  private hbdMelody: Note[] = [
    // Happy Birthday to you
    { freq: 392.00, duration: 0.75 }, // G4
    { freq: 392.00, duration: 0.25 }, // G4
    { freq: 440.00, duration: 1.0 },  // A4
    { freq: 392.00, duration: 1.0 },  // G4
    { freq: 523.25, duration: 1.0 },  // C5
    { freq: 493.88, duration: 2.0 },  // B4

    // Happy Birthday to you
    { freq: 392.00, duration: 0.75 }, // G4
    { freq: 392.00, duration: 0.25 }, // G4
    { freq: 440.00, duration: 1.0 },  // A4
    { freq: 392.00, duration: 1.0 },  // G4
    { freq: 587.33, duration: 1.0 },  // D5
    { freq: 523.25, duration: 2.0 },  // C5

    // Happy Birthday dear Faiz ur Rehman
    { freq: 392.00, duration: 0.75 }, // G4
    { freq: 392.00, duration: 0.25 }, // G4
    { freq: 783.99, duration: 1.0 },  // G5
    { freq: 659.25, duration: 1.0 },  // E5
    { freq: 523.25, duration: 1.0 },  // C5
    { freq: 493.88, duration: 1.0 },  // B4
    { freq: 440.00, duration: 2.0 },  // A4

    // Happy Birthday to you!
    { freq: 698.46, duration: 0.75 }, // F5
    { freq: 698.46, duration: 0.25 }, // F5
    { freq: 659.25, duration: 1.0 },  // E5
    { freq: 523.25, duration: 1.0 },  // C5
    { freq: 587.33, duration: 1.0 },  // D5
    { freq: 523.25, duration: 2.5 },  // C5
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBgm();
    } else if (!this.isMuted && !this.isBgmPlaying) {
      this.startBgm();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setTrack(track: MusicTrack) {
    this.currentTrack = track;
    this.hbdNoteIdx = 0;
    this.currentStep = 0;
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.startBgm();
    }
  }

  public getTrack(): MusicTrack {
    return this.currentTrack;
  }

  // Play a soft sweet pop sound
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Cute kitten meow
  public playMeow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  // Dramatic sound for NO screen
  public playDramaticNo() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }

  // Romantic chime for YES
  public playRomanticChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const now = (this.ctx?.currentTime || 0) + idx * 0.07;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch {}
  }

  // Camera shutter sound
  public playCameraShutter() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(1200, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.045);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(800, now + 0.08);
      gain2.gain.setValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.17);
    } catch {}
  }

  // Celebration fanfare
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const now = (this.ctx?.currentTime || 0) + idx * 0.1;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      });
    } catch {}
  }

  // Candle blowing whoosh
  public playBlowCandle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } catch {}
  }

  // Start Background Music Loop
  public startBgm() {
    if (this.isBgmPlaying || this.isMuted) return;
    try {
      this.initCtx();
      this.isBgmPlaying = true;
      if (this.currentTrack === 'happy-birthday') {
        this.playHappyBirthdayLoop();
      } else {
        this.playLofiLoop();
      }
    } catch {}
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // Happy Birthday Melodic Chime Loop
  private playHappyBirthdayLoop() {
    if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;

    const note = this.hbdMelody[this.hbdNoteIdx];
    const beatDurationSec = 0.45; // Tempo
    const noteDurationMs = note.duration * beatDurationSec * 1000;

    const now = this.ctx.currentTime;
    
    // Primary music box chime
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, now);

    // Warm harmonics
    const oscHarmonic = this.ctx.createOscillator();
    const gainHarmonic = this.ctx.createGain();
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(note.freq * 2, now);

    const playLength = Math.max(0.2, note.duration * beatDurationSec);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + playLength);

    gainHarmonic.gain.setValueAtTime(0.001, now);
    gainHarmonic.gain.linearRampToValueAtTime(0.04, now + 0.03);
    gainHarmonic.gain.exponentialRampToValueAtTime(0.001, now + playLength * 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    oscHarmonic.connect(gainHarmonic);
    gainHarmonic.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + playLength + 0.05);
    oscHarmonic.start(now);
    oscHarmonic.stop(now + playLength + 0.05);

    // Next note
    this.hbdNoteIdx = (this.hbdNoteIdx + 1) % this.hbdMelody.length;

    // Small pause between phrases
    const extraGap = (this.hbdNoteIdx === 0) ? 1200 : 20;

    this.bgmTimer = window.setTimeout(() => {
      this.playHappyBirthdayLoop();
    }, noteDurationMs + extraGap);
  }

  // Alternate Romantic Lofi Chord Progression Loop
  private playLofiLoop() {
    if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;

    const chordProgressions = [
      [523.25, 659.25, 783.99], // C major
      [440.00, 523.25, 659.25], // A minor
      [349.23, 440.00, 523.25], // F major
      [392.00, 493.88, 587.33], // G major
    ];

    const currentChord = chordProgressions[this.currentStep % chordProgressions.length];
    this.currentStep++;

    const now = this.ctx.currentTime;
    currentChord.forEach((freq, noteIdx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + noteIdx * 0.15);

      gain.gain.setValueAtTime(0.001, now + noteIdx * 0.15);
      gain.gain.linearRampToValueAtTime(0.05, now + noteIdx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + noteIdx * 0.15 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + noteIdx * 0.15);
      osc.stop(now + noteIdx * 0.15 + 1.3);
    });

    this.bgmTimer = window.setTimeout(() => {
      this.playLofiLoop();
    }, 1500);
  }
}

export const sound = new SoundEngine();
