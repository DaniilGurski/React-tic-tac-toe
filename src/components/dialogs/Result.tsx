import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { useEffect } from "react";
import clsx from "clsx";
import { useRef } from "react";
import { useGameContext } from "@/hooks/useGameContext";
import { useAtom, useSetAtom } from "jotai";
import { gameModeAtom, isInMenuAtom, playerOneAtom } from "@/atoms";

export const Result = () => {
  const { state, dispatch } = useGameContext();
  const localRef = useRef<HTMLDialogElement | null>(null);
  const setIsInMenu = useSetAtom(isInMenuAtom);

  const isTied = state.isTied;

  const openResultModal = () => {
    if (!localRef.current) {
      return;
    }

    localRef.current.showModal();
  };

  const onQuitButtonClick = () => {
    if (!localRef.current) {
      return;
    }

    localRef.current.close();
    setIsInMenu(true);
    dispatch({ type: "RESET" });
  };

  const onNextRoundButtonClick = () => {
    if (!localRef.current) {
      return;
    }

    localRef.current.close();
    dispatch({ type: "RESET" });
  };

  // If game ended
  useEffect(() => {
    if (state.isGameEnded) {
      openResultModal();
    }
  }, [state.isGameEnded]);

  return (
    <Dialog ref={localRef}>
      {isTied ? <Tie /> : <Winner />}
      <ul className="flex gap-x-4">
        <li>
          <Button
            color="silver"
            className="rounded-xl p-4"
            onClick={onQuitButtonClick}
          >
            QUIT
          </Button>
        </li>
        <li>
          <Button
            color="yellow"
            className="rounded-xl p-4"
            onClick={onNextRoundButtonClick}
          >
            NEXT ROUND
          </Button>
        </li>
      </ul>
    </Dialog>
  );
};

const Winner = () => {
  const { state } = useGameContext();
  const [playerOne] = useAtom(playerOneAtom);
  const [gameMode] = useAtom(gameModeAtom);
  const winner = state.turn;
  const resultMessageMap = {
    multiplayer: winner === playerOne ? "PLAYER 1 WINS" : "PLAYER 2 WINS",
    singleplayer: winner === playerOne ? "YOU WON!" : "OH NO, YOU LOST...",
  };

  return (
    <>
      <h2 className="text-silver-200 mb-4 font-bold uppercase">
        {gameMode && <span>{resultMessageMap[gameMode]}</span>}
      </h2>
      <p className="mobile:gap-x-6 mb-6 flex items-center gap-x-2">
        <img
          className="mobile:size-16 size-7"
          src={winner === "X" ? iconX : iconO}
          alt=""
        />
        <span
          className={clsx(
            "mobile:text-[2.813rem] text-2xl",
            winner === "X" ? "text-blue-200" : "text-yellow-200",
          )}
        >
          TAKES THE ROUND
        </span>
      </p>
    </>
  );
};

const Tie = () => {
  return (
    <>
      <p className="text-silver-200 mobile:text-[2.5rem] mb-6 text-2xl font-bold">
        ROUND TIED
      </p>
    </>
  );
};

export default Result;
