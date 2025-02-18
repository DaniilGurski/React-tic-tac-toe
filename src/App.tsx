import Game from "@components/game/Game";
import Menu from "@components/game/Menu";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import {
  gameBoardAtom,
  gameModeAtom,
  isGameEndedAtom,
  isPlayingAtom,
  playerOneAtom,
  turnAtom,
} from "@/atoms";
import { useEffect } from "react";

function App() {
  const gameMode = useAtomValue(gameModeAtom);
  const isPlaying = useAtomValue(isPlayingAtom);
  const [isGameEnded, setIsGameEnded] = useAtom(isGameEndedAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const [board, setBoard] = useAtom(gameBoardAtom);
  const playerOne = useAtomValue(playerOneAtom);

  // For singleplayer
  const getRandomCellPosition = (): {
    randomColIndex: number;
    randomRowIndex: number;
  } => {
    const randomColIndex = Math.round(Math.random() * 2);
    const randomRowIndex = Math.round(Math.random() * 2);

    if (board[randomRowIndex][randomColIndex] !== "") {
      return getRandomCellPosition();
    }

    return { randomColIndex, randomRowIndex };
  };

  // TODO: make this a hook ?
  useEffect(() => {
    const lastIndex = board.length - 1;
    const previousTurn = turn;
    let isDiagonalWin = true;
    let isReverseDiagonalWin = true;
    let isBoardFull = board.flat(1).every((cell) => cell !== "");

    // check rows
    for (const row of board) {
      const isRowFull = row.every((cell) => cell === previousTurn);

      if (isRowFull) {
        setIsGameEnded(true);
        return;
      }
    }

    // check for columns
    for (let col = 0; col < board.length; col++) {
      const isColFull = board.every((row) => row[col] === previousTurn);

      if (isColFull) {
        setIsGameEnded(true);
        return;
      }
    }

    for (let pos = 0; pos < board.length; pos++) {
      if (board[pos][pos] !== previousTurn) {
        isDiagonalWin = false;
      }

      if (board[pos][lastIndex - pos] !== previousTurn) {
        isReverseDiagonalWin = false;
      }
    }

    if (isDiagonalWin || isReverseDiagonalWin) {
      setIsGameEnded(true);
      return;
    }
  }, [board]);

  useEffect(() => {
    const cpu = playerOne === "X" ? "O" : "X";
    if (
      gameMode === "multiplayer" ||
      !isPlaying ||
      isGameEnded ||
      turn !== cpu
    ) {
      return;
    }

    const { randomColIndex, randomRowIndex } = getRandomCellPosition();

    setBoard(
      board.map((row, index) => {
        if (index === randomRowIndex) {
          row[randomColIndex] = cpu;
        }
        return row;
      }),
    );

    setTurn(playerOne);
  }, [turn]);

  return (
    <>
      <main className="bg-navy-200 text-navy-200 font-primary grid h-dvh py-6 font-medium">
        {isPlaying ? <Game /> : <Menu />}
      </main>
    </>
  );
}

export default App;
