/**
 * Web Audio API synthesizer for romantic background music and playful cartoon sound effects.
 * No external file dependencies needed - works reliably in all browsers.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  private currentStep: number = 0;

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
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // AudioContext might be blocked until user interaction
    }
  }

  // Play cute kitten meow
  public playMeow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  // Dramatic gun / record scratch / dramatic buzzer for the NO screen
  public playDramaticNo() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Low thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      // Scratch noise
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(800, now + 0.05);
      osc2.frequency.linearRampToValueAtTime(200, now + 0.25);

      gain2.gain.setValueAtTime(0.15, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.26);
    } catch {}
  }

  // Romantic celestial harp / chime for YES
  public playRomanticChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C E G C E
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

      // Click 1
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

      // Shutter release
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

  // Party horn / celebratory fanfare
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A major
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
      // White noise simulation using lowpass filter
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

  // Gentle lofi music box background melody looping
  public startBgm() {
    if (this.isBgmPlaying || this.isMuted) return;
    try {
      this.initCtx();
      this.isBgmPlaying = true;
      this.playBgmLoop();
    } catch {}
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  private playBgmLoop() {
    if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;

    // Sweet romantic melody chords in C major / A minor
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
      gain.gain.linearRampToValueAtTime(0.04, now + noteIdx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + noteIdx * 0.15 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + noteIdx * 0.15);
      osc.stop(now + noteIdx * 0.15 + 1.3);
    });

    this.bgmTimer = window.setTimeout(() => {
      this.playBgmLoop();
    }, 1400);
  }
}

export const sound = new SoundEngine();
