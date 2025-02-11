import Game from "@components/game/Game";
import Menu from "@components/game/Menu";
import { useAtom } from "jotai";
import { isCrossSelectedAtom, isPlayingAtom } from "@/atoms";

function App() {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [isCrossSelected, setIsCrossSelected] = useAtom(isCrossSelectedAtom);

  return (
    <>
      <main className="bg-navy-200 text-navy-200 font-primary grid h-dvh py-6 font-medium">
        {isPlaying ? <Game /> : <Menu />}
      </main>
    </>
  );
}

export default App;
