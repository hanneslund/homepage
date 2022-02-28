import { NoteName, NOTE_TO_NUMBER } from "./data";

class Sample {
  private note: NoteName;
  private audioContext: AudioContext;
  private out: AudioNode;

  private noteSound: AudioBuffer;

  // Gains of playing samples
  private playing: Map<NoteName, AudioParam> = new Map();

  constructor(
    audioContext: AudioContext,
    out: AudioNode,
    note: NoteName,
    noteSound: AudioBuffer
  ) {
    this.audioContext = audioContext;
    this.noteSound = noteSound;
    this.out = out;
    this.note = note;
  }

  play(note: NoteName) {
    this.stop(note);

    const gain = this.audioContext.createGain();
    gain.connect(this.out);

    // Note
    const semitonesDiff = NOTE_TO_NUMBER[note] - NOTE_TO_NUMBER[this.note];
    const detuneValue = semitonesDiff * 100;
    const noteSample = this.audioContext.createBufferSource();
    noteSample.detune.value = detuneValue;
    noteSample.buffer = this.noteSound;
    // noteSample.onended = () => {
    // noteSample.disconnect(this.out);????
    // };
    noteSample.connect(gain);
    noteSample.start();

    this.playing.set(note, gain.gain);
  }

  stop(note: NoteName) {
    const gain = this.playing.get(note);
    if (gain) {
      gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.2);
      this.playing.delete(note);
    }
  }
}

export default Sample;
