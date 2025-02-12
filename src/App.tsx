import Game from "@components/game/Game";
import Menu from "@components/game/Menu";
import { useAtom, useAtomValue } from "jotai";
import { gameBoardAtom, isCrossSelectedAtom, isPlayingAtom } from "@/atoms";
import { useEffect } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [isCrossSelected, setIsCrossSelected] = useAtom(isCrossSelectedAtom);

  // const board = useAtomValue(gameBoardAtom);

  // useEffect(() => {
  //   console.log(board);
  // }, [board]);

  return (
    <>
      <main className="bg-navy-200 text-navy-200 font-primary grid h-dvh py-6 font-medium">
        {isPlaying ? <Game /> : <Menu />}
      </main>
    </>
  );
}

export default App;
