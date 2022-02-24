import { NUMBER_TO_NOTE } from "./data";
import { SamplerEmitter } from "./Sampler";

class MidiInput {
  midiInput?: any;
  emitter: SamplerEmitter;

  constructor(emitter: SamplerEmitter) {
    this.emitter = emitter;
  }

  init() {
    if (!isMidiSupportet()) return;
    (navigator as any).requestMIDIAccess().then((access: any) => {
      const onStateChange = () => {
        const inputs = [...access.inputs.values()];
        if (!inputs.includes(this.midiInput)) {
          this.emitter.emit({ type: "currentMidiDisconnected" });
        }
        this.emitter.emit({
          type: "availableMidiInputs",
          inputs,
        });
      };

      onStateChange();
      access.onstatechange = onStateChange;
    });
  }

  setMidiInput(midiInput: any) {
    if (this.midiInput) {
      this.midiInput.onmidimessage = null;
    }
    if (!midiInput) {
      this.midiInput = null;
      return;
    }

    midiInput.onmidimessage = (msg: any) => {
      // https://github.com/cwilso/midi-synth/blob/master/js/midi.js
      const cmd = msg.data[0] >> 4;
      const channel = msg.data[0] & 0xf;
      const noteNumber = msg.data[1];
      const velocity = msg.data[2];

      if (channel === 9 || cmd === 15) return;

      if (cmd == 8 || (cmd == 9 && velocity == 0)) {
        this.emitter.emit({
          type: "noteOff",
          note: NUMBER_TO_NOTE[noteNumber],
        });
      } else if (cmd == 9) {
        this.emitter.emit({
          type: "noteOn",
          note: NUMBER_TO_NOTE[noteNumber],
          velocity: velocity / 127.0,
        });
      } else if (cmd === 11 && noteNumber === 64) {
        if (velocity > 0) {
          this.emitter.emit({
            type: "sustainOn",
          });
        } else {
          this.emitter.emit({
            type: "sustainOff",
          });
        }
      }
    };

    this.midiInput = midiInput;
  }
}

export function isMidiSupportet() {
  return "requestMIDIAccess" in navigator;
}

export default MidiInput;
