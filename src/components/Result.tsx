import { gameModeAtom, isDialogOpenedAtom } from "@/atoms";
import { useAtom, useAtomValue } from "jotai";
import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";
import Button from "./Button";
import { forwardRef } from "react";
import clsx from "clsx";

type TResultProps = {};

export const Result = forwardRef<HTMLDialogElement, TResultProps>(({}, ref) => {
  const [gameMode, setGameMode] = useAtom(gameModeAtom);
  const isDialogOpened = useAtomValue(isDialogOpenedAtom);
  // if player loses to cpu, display loose message, if not, display which player wins
  return (
    <dialog
      className={clsx(
        "fixed top-[50%] w-full max-w-full translate-y-[-50%] justify-center text-center",
        isDialogOpened ? "grid" : "hidden",
      )}
      ref={ref}
    >
      <h2> [] </h2>
      <p>
        <img src={iconX} alt="" /> <span> TAKES THE ROUND </span>
      </p>
      <ul>
        <li>
          <Button color="silver"> QUIT </Button>
        </li>
        <li>
          <Button color="yellow"> NEXT ROUND </Button>
        </li>
      </ul>
    </dialog>
  );
});

export default Result;
