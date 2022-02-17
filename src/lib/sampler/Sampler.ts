import { SamplesMap } from "./data";
import MidiInput from "./MidiInput";
import Keyboard from "./Keyboard";

class Sampler {
  midiInput: MidiInput;
  keyboard: Keyboard;

  constructor(samplesMap: SamplesMap, midiAccess: any) {
    this.midiInput = new MidiInput(midiAccess);
    this.keyboard = new Keyboard(new AudioContext(), samplesMap);

    const unsubscribe = this.midiInput.subscribe((e) => {
      switch (e.type) {
        case "noteon":
          this.keyboard.keyDown(e.note);
          break;

        case "noteoff":
          this.keyboard.keyUp(e.note);
          break;

        case "sustainon":
          this.keyboard.sustainOn();
          break;

        case "sustainoff":
          this.keyboard.sustainOff();
          break;

        default:
          console.log(e);
      }
    });

    console.log(unsubscribe);
    // return unsubscribe;
  }

  subscribe() {}
}

export default Sampler;
