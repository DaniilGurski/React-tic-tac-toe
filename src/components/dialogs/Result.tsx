import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import { useRef } from "react";
import { useGameContext } from "@/hooks/useGameContext";
import { TResultDialogRef } from "@/components/game/Game";
import { useAtom } from "jotai";
import { gameModeAtom, isInMenuAtom, playerOneAtom } from "@/atoms";

type TResultProps = {};

export const Result = forwardRef<TResultDialogRef, TResultProps>(({}, ref) => {
  const { state, dispatch } = useGameContext();

  const localRef = useRef<HTMLDialogElement | null>(null);
  const [_, setIsInMenu] = useAtom(isInMenuAtom);
  const [playerOne] = useAtom(playerOneAtom);
  const [gameMode] = useAtom(gameModeAtom);

  const winner = state.turn;
  const resultMessageMap = {
    multiplayer: winner === playerOne ? "PLAYER 1 WINS" : "PLAYER 2 WINS",
    singleplayer: winner === playerOne ? "YOU WON!" : "OH NO, YOU LOST...",
  };

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

  // if game ended
  useEffect(() => {
    if (state.isGameEnded) {
      openResultModal();
    }
  }, [state]);

  return (
    <Dialog ref={localRef}>
      <h2 className="text-silver-200 mb-4 font-bold uppercase">
        {gameMode && <span>{resultMessageMap[gameMode]}</span>}
      </h2>
      <p className="mobile:gap-x-6 mb-6 flex gap-x-2">
        <img src={winner === "X" ? iconX : iconO} alt="" />
        <span
          className={clsx(
            "text-[2.813rem]",
            winner === "X" ? "text-blue-200" : "text-yellow-200",
          )}
        >
          TAKES THE ROUND
        </span>
      </p>
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
          <Button color="yellow" className="rounded-xl p-4">
            NEXT ROUND
          </Button>
        </li>
      </ul>
    </Dialog>
  );
});

export default Result;
