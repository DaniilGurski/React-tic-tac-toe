import Game from "@components/game/Game";
import Menu from "@components/game/Menu";
import { useAtom, useAtomValue } from "jotai";
import { gameBoardAtom, isPlayingAtom, turnAtom } from "@/atoms";
import { useEffect } from "react";

function App() {
  const [isPlaying] = useAtom(isPlayingAtom);
  const turn = useAtomValue(turnAtom);
  const board = useAtomValue(gameBoardAtom);

  // TODO: make this a hook ?
  useEffect(() => {
    const lastIndex = board.length - 1;
    const previousTurn = turn === "X" ? "O" : "X";
    let isDiagonalWin = false;

    // check rows
    for (const row of board) {
      const isRowFull = row.every((cell) => cell === previousTurn);

      if (isRowFull) {
        return;
      }
    }

    // check for columns
    for (let col = 0; col < board.length; col++) {
      const isColFull = board.every((row) => row[col] === previousTurn);

      if (isColFull) {
        return;
      }
    }

    for (let pos = 0; pos < board.length; pos++) {
      if (
        board[pos][pos] === previousTurn ||
        board[pos][lastIndex - pos] === previousTurn
      ) {
        isDiagonalWin = true;
      } else {
        isDiagonalWin = false;
        break;
      }
    }

    if (isDiagonalWin) {
      return;
    }
  }, [board]);

  return (
    <>
      <main className="bg-navy-200 text-navy-200 font-primary grid h-dvh py-6 font-medium">
        {isPlaying ? <Game /> : <Menu />}
      </main>
    </>
  );
}

export default App;
