import { NoteName, NOTE_TO_NUMBER, SamplesMap } from "./data";
import Emitter from "./emitter";
import MidiInput from "./MidiInput";
import Sample from "./Sample";

export type SamplerEvents =
  | { type: "availableMidiInputs"; inputs: any[] }
  | { type: "currentMidiDisconnected" }
  | { type: "noteOn"; note: NoteName; velocity: number }
  | { type: "noteOff"; note: NoteName }
  | { type: "sustainOn" }
  | { type: "sustainOff" };

export type SamplerEmitter = Emitter<SamplerEvents>;

class Sampler {
  emitter: SamplerEmitter = new Emitter<SamplerEvents>();
  private midiInput: MidiInput = new MidiInput(this.emitter);

  private samples: { [noteName: NoteName]: Sample } = {};

  private sustain = false;
  private sustained: { sample: Sample; note: NoteName }[] = [];

  constructor() {
    this.midiInput.init();

    this.emitter.listen((e) => {
      switch (e.type) {
        case "noteOn":
          this.keyDown(e.note);
          break;

        case "noteOff":
          this.keyUp(e.note);
          break;

        case "sustainOn":
          this.sustainOn();
          break;

        case "sustainOff":
          this.sustainOff();
          break;
      }
    });
  }

  setMidiInput(midiInput: any) {
    this.midiInput.setMidiInput(midiInput);
  }

  init(
    audioContext: AudioContext,
    samplesMap: SamplesMap,
    irReverb: ArrayBuffer
  ) {
    // Dry
    const outGain = audioContext.createGain();
    outGain.gain.value = 0.3;

    // Wet
    const reverb = audioContext.createConvolver();
    audioContext.decodeAudioData(irReverb).then((reverbBuffer) => {
      reverb.buffer = reverbBuffer;
    });
    const reverbGain = audioContext.createGain();
    reverbGain.gain.value = 0.2;

    // Connect
    outGain.connect(audioContext.destination);
    outGain.connect(reverbGain);
    reverbGain.connect(reverb);
    reverb.connect(audioContext.destination);

    // Add samples
    Object.entries(samplesMap).forEach(([note, arrayBuffer]) => {
      audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
        this.samples[note] = new Sample(
          audioContext,
          outGain,
          note,
          audioBuffer
        );
      });
    });
  }

  private keyDown(note: NoteName) {
    const matchedSampleKey = this.selectSampleKey(note);
    if (!matchedSampleKey) {
      return;
    }
    if (this.sustain) {
      // Remove from sustained
      this.sustained = this.sustained.filter(
        ({ note: sustainedNote }) => sustainedNote !== note
      );
    }

    this.samples[matchedSampleKey]?.play(note);
  }

  private keyUp(note: NoteName) {
    const matchedSampleKey = this.selectSampleKey(note);
    if (!matchedSampleKey) {
      return;
    }
    const sample = this.samples[matchedSampleKey];
    if (this.sustain) {
      // Add to sustained
      this.sustained.push({ sample, note });
    } else {
      sample.stop(note);
    }
  }

  private sustainOn() {
    this.sustain = true;
  }

  private sustainOff() {
    this.sustain = false;
    this.sustained.forEach(({ sample, note }) => {
      sample.stop(note);
    });
    this.sustained = [];
  }

  private selectSampleKey(note: NoteName): NoteName | null {
    const noteNumber = NOTE_TO_NUMBER[note];

    return Object.keys(this.samples).reduce<string | null>(
      (accSampleKey, curSampleKey) => {
        if (!accSampleKey) {
          return curSampleKey;
        }
        const accNoteNumber = NOTE_TO_NUMBER[accSampleKey];
        const curNoteNumber = NOTE_TO_NUMBER[curSampleKey];
        const accNoteDiff = Math.abs(accNoteNumber - noteNumber);
        const curNoteDiff = Math.abs(curNoteNumber - noteNumber);
        if (curNoteDiff === accNoteDiff) {
          // PREFER DOWN DETUNE?
          // PREFER DOWN DETUNE?
          // PREFER DOWN DETUNE?
        } else if (curNoteDiff < accNoteDiff) {
          return curSampleKey;
        }
        return accSampleKey;
      },
      null
    );
  }
}

export default Sampler;
