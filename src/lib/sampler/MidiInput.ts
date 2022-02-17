import { NUMBER_TO_NOTE } from "./data";

type MidiInputEventHandler = (event: MidiInputEvent) => void;
export type MidiInputEvent =
  | { type: "hasmidi" }
  | { type: "nomidi" }
  | { type: "noteon"; note: string; velocity: number }
  | { type: "noteoff"; note: string }
  | { type: "sustainon" }
  | { type: "sustainoff" };

class MidiInput {
  subscribers = new Set<MidiInputEventHandler>();

  private emit(event: MidiInputEvent) {
    this.subscribers.forEach((cb) => {
      cb(event);
    });
  }

  constructor(access: any) {
    const onStateChange = () => {
      if (access.inputs.size > 0) {
        this.emit({ type: "hasmidi" });
      } else {
        this.emit({ type: "nomidi" });
      }

      access.inputs.forEach((input: any) => {
        input.onmidimessage = (msg: any) => {
          // https://github.com/cwilso/midi-synth/blob/master/js/midi.js
          const cmd = msg.data[0] >> 4;
          const channel = msg.data[0] & 0xf;
          const noteNumber = msg.data[1];
          const velocity = msg.data[2];

          if (channel === 9 || cmd === 15) return;

          if (cmd == 8 || (cmd == 9 && velocity == 0)) {
            this.emit({
              type: "noteoff",
              note: NUMBER_TO_NOTE[noteNumber],
            });
          } else if (cmd == 9) {
            this.emit({
              type: "noteon",
              note: NUMBER_TO_NOTE[noteNumber],
              velocity: velocity / 127.0,
            });
          } else if (cmd === 11 && noteNumber === 64) {
            if (velocity > 0) {
              this.emit({
                type: "sustainon",
              });
            } else {
              this.emit({
                type: "sustainoff",
              });
            }
          }
          // {cmd: 11, channel: 0, noteNumber: 64, velocity: 127}
          // console.log(msg.data[0]);
          // console.log({ cmd, channel, noteNumber, velocity });
          // else if (cmd == 11) {
          //   controller( noteNumber, velocity/127.0);
          // } else if (cmd == 14) {
          //   // pitch wheel
          //   pitchWheel( ((velocity * 128.0 + noteNumber)-8192)/8192.0 );
          // } else if ( cmd == 10 ) {  // poly aftertouch
          //   polyPressure(noteNumber,velocity/127)
          // } else
          // console.log("" + msg.data[0] + " " + msg.data[1] + " " + msg.data[2]);
        };
      });
    };

    onStateChange();
    access.onstatechange = onStateChange;
  }

  subscribe(cb: MidiInputEventHandler) {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }
}

export function isMidiSupportet() {
  return "requestMIDIAccess" in navigator;
}

export default MidiInput;
