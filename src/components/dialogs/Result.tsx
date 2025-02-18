import {
  gameModeAtom,
  gameBoardAtom,
  playerOneAtom,
  isPlayingAtom,
  isGameEndedAtom,
  dialogsAtom,
} from "@/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { forwardRef } from "react";
import clsx from "clsx";

type TResultProps = {
  winner: "X" | "O";
};

export const Result = forwardRef<HTMLDialogElement, TResultProps>(
  ({ winner }, ref) => {
    const gameMode = useAtomValue(gameModeAtom);
    const playerOne = useAtomValue(playerOneAtom);
    const dialogs = useAtomValue(dialogsAtom);
    const setGameEnded = useSetAtom(isGameEndedAtom);
    const setGameBoard = useSetAtom(gameBoardAtom);
    const setIsPlaying = useSetAtom(isPlayingAtom);
    const isWinnerX = winner === "X";

    const messageMap = {
      multiplayer: winner === playerOne ? "PLAYER 1 WINS" : "PLAYER 2 WINS",
      singleplayer: winner === playerOne ? "YOU WON!" : "OH NO, YOU LOST...",
    };

    const onQuitButtonClick = () => {
      setIsPlaying(false);
      setGameEnded(false);
      setGameBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    };

    const onNextRoundButtonClick = () => {
      setGameEnded(false);
      setGameBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    };

    return (
      <Dialog ref={ref} isOpened={dialogs.resultOpened}>
        <h2 className="text-silver-200 mb-4 font-bold uppercase">
          <span>{messageMap[gameMode]}</span>
        </h2>
        <p className="mobile:gap-x-6 mb-6 flex gap-x-2">
          <img src={isWinnerX ? iconX : iconO} alt="" />
          <span
            className={clsx(
              "text-[2.813rem]",
              isWinnerX ? "text-blue-200" : "text-yellow-200",
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
  },
);

export default Result;
