import useSound from "use-sound";
import Piano from "./sounds/piano.mp3";

const playbackRates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-x-1 bg-slate-200">
      <div className="flex items-start shadow-2xl shadow-slate-400/50">
        {playbackRates.map((playbackRate, i) => {
          if (i % 2 === 0) {
            return (
              <PianoKeyWhite key={playbackRate} playbackRate={playbackRate} />
            );
          } else {
            return (
              <PianoKeyBlack key={playbackRate} playbackRate={playbackRate} />
            );
          }
        })}
      </div>
    </div>
  );
}

function PianoKeyBlack({ playbackRate }) {
  return (
    <PianoKey
      playbackRate={playbackRate}
      className="z-10 -mx-5 h-64 w-10  rounded-b border bg-black text-black"
    />
  );
}

function PianoKeyWhite({ playbackRate }) {
  return (
    <PianoKey
      playbackRate={playbackRate}
      className="h-96 w-16 rounded  border bg-white text-white"
    />
  );
}

function PianoKey({ playbackRate, className }) {
  const [play] = useSound(Piano, { playbackRate });

  return <button className={className} onClick={play} />;
}

export default App;
