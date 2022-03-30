import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import GuitarSound from "./sounds/guitar.mp3";
import PianoSound from "./sounds/piano.mp3";

const playbackRates = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5,
];

function App() {
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");
  const sound = selectedInstrument === "guitar" ? GuitarSound : PianoSound;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 ">
      <div className="mb-8 space-x-2">
        <InstrumentButton
          selected={selectedInstrument === "piano"}
          onClick={() => setSelectedInstrument("piano")}
        >
          Piano
        </InstrumentButton>
        <InstrumentButton
          selected={selectedInstrument === "guitar"}
          onClick={() => setSelectedInstrument("guitar")}
        >
          Guitar
        </InstrumentButton>
      </div>
      <div className="flex items-start gap-x-1 shadow-2xl">
        {playbackRates.map((playbackRate, i) => {
          if (i % 2 === 0) {
            return (
              <WhitePianoKey
                key={i}
                soundFile={sound}
                playbackRate={playbackRate}
              />
            );
          } else {
            return (
              <BlackPianoKey soundFile={sound} playbackRate={playbackRate} />
            );
          }
        })}
      </div>
    </div>
  );
}

function InstrumentButton({ onClick, selected, children }) {
  let bgcolor = "white";
  if (selected) bgcolor = "emerald-600";

  return (
    <button
      onClick={onClick}
      className={`rounded bg-${bgcolor} p-2 hover:scale-105`}
    >
      {children}
    </button>
  );
}

function WhitePianoKey({ soundFile, playbackRate }) {
  return (
    <PianoKey
      playbackRate={playbackRate}
      soundFile={soundFile}
      className="h-96 w-12 rounded-b bg-white"
    />
  );
}

function BlackPianoKey({ soundFile, playbackRate }) {
  return (
    <PianoKey
      playbackRate={playbackRate}
      soundFile={soundFile}
      className="z-10 -mx-3 h-48 w-6 rounded-b-lg bg-black"
    />
  );
}

function PianoKey({ className, soundFile, playbackRate }) {
  const [ownPlaybackRate, setOwnPlaybackRate] = useState(playbackRate);
  const [play] = useSound(soundFile, { playbackRate: ownPlaybackRate });

  useEffect(() => {
    console.log(playbackRate);
    setOwnPlaybackRate(playbackRate + 0.1);
  }, [soundFile]);

  return (
    <button
      className={className + " transition-transform hover:scale-105"}
      onClick={play}
    ></button>
  );
}

export default App;
