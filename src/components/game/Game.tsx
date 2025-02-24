import iconMiniX from "@assets/icon-mini-x.svg";
import iconMiniO from "@assets/icon-mini-o.svg";
import iconRestart from "@assets/icon-restart.svg";
import Logo from "@components/Logo";
import Button from "@components/Button";
import Board from "@components/Board";
import StatBlock from "@components/StatBlock";
import { useEffect, useRef, useState } from "react";
import { useGameContext } from "@/hooks/useGameContext";
import Reset from "@/components/dialogs/Reset";
import Result from "@/components/dialogs/Result";
import { useAtom } from "jotai";
import { gameModeAtom, playerOneAtom } from "@/atoms";

export type TResetDialogRef = {
  onResetButtonClick: () => void;
};

export default function Game() {
  const { state, dispatch } = useGameContext();
  const [gameMode] = useAtom(gameModeAtom);
  const [playerOne] = useAtom(playerOneAtom);
  const [isCpuTurn, setIsCpuTurn] = useState(false);
  const resetDialogRef = useRef<TResetDialogRef | null>(null);

  const statSuffix = {
    multiplayer: {
      x: playerOne === "X" ? "(P1)" : "(P2)",
      o: playerOne === "O" ? "(P1)" : "(P2)",
    },
    singleplayer: {
      x: playerOne === "X" ? "(YOU)" : "(CPU)",
      o: playerOne === "O" ? "(YOU)" : "(CPU)",
    },
  };

  useEffect(() => {
    if (state.isFreshGame) {
      return;
    }
    const lastIndex = state.gameBoard.length - 1;
    let win = false;
    const diagonalWin = {
      right: true,
      left: true,
    };

    const isGameBoardFull = state.gameBoard
      .flat(1)
      .every((cell) => cell !== "");

    // Check rows
    for (const row of state.gameBoard) {
      const isRowFull = row.every((cell) => cell === state.turn);

      if (isRowFull) {
        win = true;
      }
    }

    // Check columns
    for (let col = 0; col < state.gameBoard.length; col++) {
      const isColFull = state.gameBoard.every((row) => row[col] === state.turn);

      if (isColFull) {
        win = true;
      }
    }

    // Check for diagonal
    for (let pos = 0; pos < state.gameBoard.length; pos++) {
      if (state.gameBoard[pos][pos] !== state.turn) {
        diagonalWin.right = false;
      }
      if (state.gameBoard[pos][lastIndex - pos] !== state.turn) {
        diagonalWin.left = false;
      }
    }

    if (win || diagonalWin.right || diagonalWin.left) {
      dispatch({ type: "END_GAME" });
      dispatch({ type: `ADD_POINT_TO_${state.turn}` });
      return;
    } else if (isGameBoardFull) {
      // Set isTied to true
      dispatch({ type: "END_GAME", payload: true });
      dispatch({ type: "ADD_POINT_TO_TIED" });
      return;
    } else {
      dispatch({ type: "SWITCH_TURN" });
    }
  }, [state.gameBoard]);

  useEffect(() => {
    if (gameMode !== "singleplayer") {
      return;
    }
    if (state.turn === playerOne) {
      setIsCpuTurn(false);
    } else {
      setIsCpuTurn(true);
    }
  }, [state.turn]);

  useEffect(() => {
    if (!isCpuTurn) {
      console.log("Not cpu move");
      return;
    }

    console.log("CPU Making move");

    const getRandomCellPosition = (): {
      randomColIndex: number;
      randomRowIndex: number;
    } => {
      const randomColIndex = Math.round(Math.random() * 2);
      const randomRowIndex = Math.round(Math.random() * 2);

      if (state.gameBoard[randomRowIndex][randomColIndex] !== "") {
        return getRandomCellPosition();
      }

      return { randomRowIndex, randomColIndex };
    };

    const { randomRowIndex, randomColIndex } = getRandomCellPosition();
    console.log(randomRowIndex, randomColIndex);

    const updatedBoard = [...state.gameBoard];
    updatedBoard[randomRowIndex][randomColIndex] = state.turn;

    console.log(updatedBoard);

    dispatch({ type: "UPDATE_GAME_BOARD", payload: updatedBoard });
  }, [isCpuTurn]);

  return (
    <>
      <div className="max-w-game-window w-almost-full mobile:place-self-center mx-auto">
        <header className="mobile:mb-5 mb-16 flex items-center justify-between">
          <Logo />

          <div className="mobile:gap-x-3.5 bg-navy-100 mobile:px-8 mobile:py-3.5 inset-shadow-navy-sm flex items-center gap-x-2 rounded-xl px-3.5 py-2">
            <img src={state.turn === "X" ? iconMiniX : iconMiniO} alt="" />

            <span className="text-silver-200 mobile:text-base text-sm">
              TURN
            </span>
          </div>

          <Button
            color="silver"
            className="mobile:p-3 aspect-square rounded-xl p-3"
            onClick={() => resetDialogRef.current?.onResetButtonClick()}
          >
            <img src={iconRestart} alt="" />
          </Button>
        </header>

        <Board />

        <footer className="">
          <ul className="grid grid-cols-3 gap-x-5">
            <StatBlock
              color="blue"
              heading={`X ${gameMode && statSuffix[gameMode].x}`}
              value={state.score.x}
            />
            <StatBlock color="silver" heading="TIES" value={state.score.tie} />
            <StatBlock
              color="yellow"
              heading={`O ${gameMode && statSuffix[gameMode].o}`}
              value={state.score.o}
            />
          </ul>
        </footer>
      </div>

      <Result />
      <Reset ref={resetDialogRef} />
    </>
  );
}
