import { NoteName, NOTE_TO_NUMBER, SamplesMap } from "./data";
import Sample from "./Sample";

class Sampler {
  samples: { [noteName: NoteName]: Sample } = {};
  audioContext: AudioContext;
  out: AudioNode;

  sustain = false;
  sustained: { sample: Sample; note: NoteName }[] = [];

  async createReverb(node: ConvolverNode) {
    // load impulse response from file
    let response = await fetch("/irHall.ogg");
    let arraybuffer = await response.arrayBuffer();
    node.buffer = await this.audioContext.decodeAudioData(arraybuffer);
  }

  constructor(audioContext: AudioContext, samples: SamplesMap) {
    this.audioContext = audioContext;

    // Dry
    const outGain = this.audioContext.createGain();
    outGain.gain.value = 0.3;
    this.out = outGain;

    // Wet
    const reverb = this.audioContext.createConvolver();
    this.createReverb(reverb);
    const reverbGain = this.audioContext.createGain();
    reverbGain.gain.value = 0.2;

    // Connect
    this.out.connect(this.audioContext.destination);
    this.out.connect(reverbGain);
    reverbGain.connect(reverb);
    reverb.connect(this.audioContext.destination);

    // Add samples
    Object.entries(samples).forEach(([note, arrayBuffer]) => {
      this.audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
        this.samples[note] = new Sample(
          this.audioContext,
          this.out,
          note,
          audioBuffer
        );
      });
    });
  }

  keyDown(note: NoteName) {
    // console.log("nr inputs", this.out.numberOfInputs);
    const matchedSampleKey = this.selectSampleKey(note);
    if (this.sustain) {
      // Remove from sustained
      this.sustained = this.sustained.filter(
        ({ note: sustainedNote }) => sustainedNote !== note
      );
    }

    if (matchedSampleKey) {
      this.samples[matchedSampleKey]?.play(note);
    }
  }

  keyUp(note: NoteName) {
    const matchedSampleKey = this.selectSampleKey(note);
    if (!matchedSampleKey) {
      //??
      throw new Error();
      //??
    }
    const sample = this.samples[matchedSampleKey];
    if (this.sustain) {
      // Add to sustained
      this.sustained.push({ sample, note });
    } else {
      sample.stop(note);
    }
  }

  sustainOn() {
    this.sustain = true;
  }

  sustainOff() {
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
