import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Sampler, { SamplerEvents } from "../lib/sampler/Sampler";
import { isMidiSupportet } from "../lib/sampler/MidiInput";
import { SamplesMap } from "../lib/sampler/data";

const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const OCTAVES = [2, 3, 4, 5, 6];
const WHITE_KEYS_IN_OCTAVE = 7;
const WIDTH = WHITE_KEYS_IN_OCTAVE * OCTAVES.length * 15;
const WHITE_KEYS = OCTAVES.flatMap((octave) =>
  NOTES.map((tone) => ({ tone, octave }))
);

export default function Piano() {
  const sampler = useRef<Sampler | null>(null);

  const [audioContextSupport, setAudioContextSupport] = useState<
    null | boolean
  >(null);
  const [midiSupport, setMidiSupport] = useState(true);
  const [isPianoEnabled, setIsPianoEnabled] = useState(false);

  const [samples, setSamples] = useState<null | SamplesMap>(null);
  const [irReverb, setIrReverb] = useState<null | ArrayBuffer>(null);
  const [samplesError, setSamplesError] = useState(false);

  const [availableMidiInputs, setAvailableMidiInputs] = useState<any[]>([]);
  const [selectedMidiInput, setSelectedMidiInput] = useState<null | any>(null);

  // Check for midi support
  useEffect(() => {
    setMidiSupport(isMidiSupportet());
    setAudioContextSupport(Boolean(window.AudioContext));
  }, []);

  // Create sampler and setup events
  useEffect(() => {
    if (typeof audioContextSupport === "boolean" && !audioContextSupport) {
      return;
    }
    sampler.current = new Sampler();
    const onSamplerEvent = (e: SamplerEvents) => {
      switch (e.type) {
        case "noteOn":
          const noteon = document.querySelector<SVGElement>(
            `[data-note='${e.note}']`
          );
          if (noteon) {
            noteon.style.color = e.note.includes("#") ? "#525252" : "#737373";
          }
          break;

        case "noteOff":
          const noteoff = document.querySelector<SVGElement>(
            `[data-note='${e.note}']`
          );
          if (noteoff) {
            noteoff.style.color = "";
          }
          break;

        case "availableMidiInputs":
          setAvailableMidiInputs(e.inputs);
          break;

        case "currentMidiDisconnected":
          setSelectedMidiInput(null);
          break;
      }
    };
    sampler.current.emitter.listen(onSamplerEvent);
    return () => sampler.current?.emitter?.unlisten(onSamplerEvent);
  }, [audioContextSupport]);

  // Fetch samples
  useEffect(() => {
    async function getSamples() {
      const getSample = (url: string) =>
        fetch(url).then((r) =>
          r.ok ? r.arrayBuffer() : Promise.reject("404")
        );

      try {
        const [C2, C3, C4, C5, C6, reverbBuffer] = await Promise.all([
          getSample("/C2.mp3"),
          getSample("/C3.mp3"),
          getSample("/C4.mp3"),
          getSample("/C5.mp3"),
          getSample("/C6.mp3"),
          getSample("/irHall.ogg"),
        ]);

        setSamples({ C2, C3, C4, C5, C6 });
        setIrReverb(reverbBuffer);
      } catch {
        setSamplesError(true);
      }
    }
    getSamples();
  }, []);

  // Init sampler on unmute
  useEffect(() => {
    if (!isPianoEnabled || !samples || !irReverb) return;
    sampler.current?.init(new AudioContext(), samples, irReverb);
  }, [isPianoEnabled, samples, irReverb]);

  if (samplesError) {
    return <p>Failed to fetch samples, try reloading the page.</p>;
  }

  if (typeof audioContextSupport === "boolean" && !audioContextSupport) {
    return <p>Your browser doesn{"'"}t support AudioContext</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Transition
            show={!isPianoEnabled}
            as={Fragment}
            leave="transition duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <button
              onClick={() => {
                setIsPianoEnabled(true);
              }}
              className="h-8 rounded border border-neutral-600 px-3 text-xs hover:border-neutral-500 hover:text-neutral-100"
            >
              Unmute
            </button>
          </Transition>
        </div>
        <div>
          {!midiSupport ? (
            <div className="flex h-8 items-center text-xs">
              Your browser doesn{"'"}t support MIDI
            </div>
          ) : (
            <Listbox
              value={selectedMidiInput}
              onChange={(midiInput) => {
                if (!sampler.current) return;
                sampler.current?.setMidiInput(midiInput);
                setSelectedMidiInput(midiInput);
              }}
            >
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button
                    disabled={availableMidiInputs.length === 0}
                    className="relative h-8 w-40 rounded border border-neutral-600 px-4 text-left text-xs text-neutral-200"
                  >
                    <span className="block truncate">
                      {selectedMidiInput?.name ?? (
                        <span className="text-neutral-500">MIDI input</span>
                      )}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        shapeRendering="geometricPrecision"
                        className={`transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full rounded border border-neutral-600 bg-neutral-900 text-xs outline-none">
                    {availableMidiInputs.length === 0 ? (
                      <span className="flex justify-center py-2">
                        No MIDI input found
                      </span>
                    ) : (
                      availableMidiInputs.map((midiInput) => (
                        <Listbox.Option
                          key={midiInput.id}
                          className={({ active }) =>
                            `relative cursor-pointer py-2 pl-10 pr-4 ${
                              active
                                ? "bg-neutral-700 text-neutral-200"
                                : "text-gray-400"
                            }`
                          }
                          value={midiInput}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "text-neutral-200" : ""
                                }`}
                              >
                                {midiInput.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-200">
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    shapeRendering="geometricPrecision"
                                  >
                                    <path d="M20 6L9 17l-5-5" />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))
                    )}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Keyboard sampler={sampler.current} />
      </div>
    </div>
  );
}

const isTouch = isTouchDevice();
function Keyboard({ sampler }: { sampler: null | Sampler }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [note, setNote] = useState<null | string>(null);
  const playingNote = useRef<null | string>(null);

  useEffect(() => {
    const mousedownHandler = () => setMouseDown(true);
    document.addEventListener("mousedown", mousedownHandler);

    const mouseupHandler = () => setMouseDown(false);
    document.addEventListener("mouseup", mouseupHandler);

    return () => {
      document.removeEventListener("mousedown", mousedownHandler);
      document.removeEventListener("mouseup", mouseupHandler);
    };
  }, []);

  useEffect(() => {
    if (!sampler) return;
    const currentNote = playingNote.current;

    if ((!mouseDown && currentNote) || (currentNote && currentNote !== note)) {
      sampler.emitter.emit({
        type: "noteOff",
        note: currentNote,
      });
      playingNote.current = null;
    }

    if (note && mouseDown) {
      sampler.emitter.emit({
        type: "noteOn",
        note,
        velocity: 100,
      });
      playingNote.current = note;
    }
  }, [note, mouseDown, sampler]);

  return (
    <svg
      width={WIDTH}
      height="100"
      viewBox={`-1 -1 ${WIDTH + 2} 102`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onTouchStart={(e: any) => {
        setNote(e.target.dataset?.note ?? null);
        setMouseDown(true);
      }}
      onTouchEnd={() => {
        setNote(null);
        setMouseDown(false);
      }}
      onMouseOver={(e: any) => {
        if (isTouch) return;
        setNote(e.target.dataset?.note ?? null);
      }}
      onMouseLeave={() => {
        if (isTouch) return;
        setNote(null);
      }}
      className="w-full"
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
      {WHITE_KEYS.slice(0, -1).map((_, i) => (
        <path
          key={i}
          d={`M${15 * (i + 1)} 100V0`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
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
          />
        ) : null
      )}
      <rect
        x="0"
        y="0"
        width={WIDTH}
        height="100"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function isTouchDevice() {
  return (
    !!(
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        ((window as any).DocumentTouch &&
          typeof document !== "undefined" &&
          document instanceof (window as any).DocumentTouch))
    ) ||
    !!(
      typeof navigator !== "undefined" &&
      (navigator.maxTouchPoints || (navigator as any).msMaxTouchPoints)
    )
  );
}
