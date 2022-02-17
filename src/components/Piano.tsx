import clsx from "clsx";
import { useEffect, useState } from "react";
import Sampler, { isMidiSupportet, SamplesMap } from "../lib/sampler";

const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const OCTAVES = [2, 3, 4, 5, 6];
const WHITE_KEYS_IN_OCTAVE = 7;
const WIDTH = WHITE_KEYS_IN_OCTAVE * OCTAVES.length * 15;
const WHITE_KEYS = OCTAVES.flatMap((octave) =>
  NOTES.map((tone) => ({ tone, octave }))
);

export default function Piano() {
  const [_sampler, setSampler] = useState<null | Sampler>(null);
  const [midiAccess, setMidiAccess] = useState<any>(null);
  const [isPianoEnabled, setIsPianoEnabled] = useState(false);
  // const [isInitialized, setIsInitialized] = useState(false);
  const [samples, setSamples] = useState<null | SamplesMap>(null);
  // const [samplesError, setSamplesError] = useState(false);

  const [midiConnected, _setMidiConnected] = useState<null | boolean>(false);

  useEffect(() => {
    async function getSamples() {
      // PREFETCH <link>
      const getSample = (url: string) =>
        fetch(url).then((r) => r.arrayBuffer());

      const [C3, C4, C5] = await Promise.all([
        getSample("/2C3.mp3"),
        getSample("/2C4.mp3"),
        getSample("/2C5.mp3"),
        // getSample("/C5.mp3"),
        // getSample("/C6.mp3"),
      ]);

      setSamples({ C3, C4, C5 });
    }
    getSamples();
  }, []);

  useEffect(() => {
    if (!isPianoEnabled || !samples || !midiAccess) return;
    console.log({ isPianoEnabled, samples, midiAccess });

    // INTE SKAPA NY VA!?
    setSampler(new Sampler(samples, midiAccess));
  }, [isPianoEnabled, samples, midiAccess]);

  useEffect(() => {
    //   const unsubscribe = midiInput.subscribe((e) => {
    //     switch (e.type) {
    //       case "hasmidi":
    //         setMidiConnected(true);
    //         break;
    //       case "nomidi":
    //         setMidiConnected(false);
    //         break;
    //       case "noteon":
    //         const noteon = document.querySelector<SVGElement>(
    //           `[data-note='${e.note}']`
    //         );
    //         if (noteon) {
    //           noteon.style.color = e.note.includes("#") ? "#a3a3a3" : "#737373";
    //         }
    //         break;
    //       case "noteoff":
    //         const noteoff = document.querySelector<SVGElement>(
    //           `[data-note='${e.note}']`
    //         );
    //         if (noteoff) {
    //           noteoff.style.color = "";
    //         }
    //         break;
    //     }
    //   });
    //   return unsubscribe;
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className={clsx("h-3 w-3 rounded-full border ", {
            "border-green-400 bg-green-400": isPianoEnabled,
            "border-neutral-500": !isPianoEnabled,
          })}
        />
        <button
          onClick={() => {
            if (midiAccess) {
              setIsPianoEnabled(!isPianoEnabled);
            } else {
              (navigator as any).requestMIDIAccess().then((access: any) => {
                setMidiAccess(access);
                setIsPianoEnabled(true);
              });
            }
          }}
          className="rounded border border-neutral-600 py-1 px-4 text-neutral-400 hover:border-neutral-500 hover:text-neutral-100"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M18.36 6.64a9 9 0 11-12.73 0"></path>
            <path d="M12 2v10"></path>
          </svg>
        </button>
      </div>
      <div className="relative mt-4">
        <Keyboard enabled={Boolean(midiConnected)} />
        {!midiConnected && isPianoEnabled ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-semibold">
              {midiConnected != null
                ? isMidiSupportet()
                  ? "Connect MIDI device to play"
                  : "Midi not supported in your browser"
                : null}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Keyboard({ enabled }: { enabled: boolean }) {
  return (
    <svg
      width={WIDTH}
      height="100"
      viewBox={`0 0 ${WIDTH} 100`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={enabled ? undefined : "opacity-10"}
    >
      {WHITE_KEYS.map(({ octave, tone }, i) => (
        <rect
          data-note={`${tone}${octave}`}
          key={i}
          x={15 * i}
          y="0"
          width="15"
          height="100"
          fill="currentColor"
          className="text-neutral-900"
        />
      ))}
      {WHITE_KEYS.map((_, i) =>
        i !== WHITE_KEYS.keys.length - 1 ? (
          <path
            key={i}
            d={`M${15 * (i + 1)} 100V0`}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ) : null
      )}
      {WHITE_KEYS.map(({ octave, tone }, i) =>
        i % 7 !== 2 && i % 7 !== 6 ? (
          <rect
            key={i}
            data-note={`${tone}#${octave}`}
            x={15 * (i + 1) - 4}
            y="0"
            width="8"
            height="60"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ) : null
      )}
      <rect
        x="0.25"
        y="0.25"
        width={WIDTH - 0.5}
        height="99.5"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}
