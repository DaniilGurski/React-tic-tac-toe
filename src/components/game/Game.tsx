import { dialogsAtom, isGameEndedAtom, turnAtom } from "@/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import iconMiniX from "@assets/icon-mini-x.svg";
import iconMiniO from "@assets/icon-mini-o.svg";
import iconRestart from "@assets/icon-restart.svg";
import Logo from "@components/Logo";
import Button from "@components/Button";
import Board from "@components/Board";
import StatBlock from "@components/StatBlock";
import Result from "@/components/dialogs/Result";
import Reset from "@/components/dialogs/Reset";
import { useEffect, useRef } from "react";

export default function Game() {
  const [turn, setTurn] = useAtom(turnAtom);

  const isGameEnded = useAtomValue(isGameEndedAtom);
  const resetDialogRef = useRef<HTMLDialogElement | null>(null);
  const resultDialogRef = useRef<HTMLDialogElement | null>(null);
  const [dialogs, setDialogs] = useAtom(dialogsAtom);

  const winner = turn === "X" ? "O" : "X"; // previous turn

  console.log(winner);

  const onResetButtonClick = () => {
    if (!resetDialogRef.current) {
      return;
    }
    setDialogs((prev) => ({ ...prev, resetOpened: true }));
    resetDialogRef.current.showModal();
  };

  const onCancelResetButtonClick = () => {
    if (!resetDialogRef.current) {
      return;
    }
    setDialogs((prev) => ({ ...prev, resetOpened: false }));
    resetDialogRef.current.close();
  };

  // Open result dialog
  useEffect(() => {
    if (!resultDialogRef.current) {
      return;
    }

    if (isGameEnded) {
      resultDialogRef.current.showModal();
      setDialogs((prev) => ({ ...prev, resultOpened: true }));
    } else {
      setDialogs({ resultOpened: false, resetOpened: false });
      setTurn("X");
      resultDialogRef.current.close();
    }
  }, [isGameEnded]);

  return (
    <>
      <div className="max-w-game-window w-almost-full mobile:place-self-center mx-auto">
        <header className="mobile:mb-5 mb-16 flex items-center justify-between">
          <Logo />

          <div className="mobile:gap-x-3.5 bg-navy-100 mobile:px-8 mobile:py-3.5 inset-shadow-navy-sm flex items-center gap-x-2 rounded-xl px-3.5 py-2">
            <img src={turn === "X" ? iconMiniX : iconMiniO} alt="" />
            <span className="text-silver-200 mobile:text-base text-sm">
              {" "}
              TURN{" "}
            </span>
          </div>

          <Button
            color="silver"
            className="mobile:p-3 aspect-square rounded-xl p-3"
            onClick={onResetButtonClick}
          >
            <img src={iconRestart} alt="" />
          </Button>
        </header>

        <Board />

        <footer className="">
          <ul className="grid grid-cols-3 gap-x-5">
            <StatBlock color="blue" heading="[stat]" value={0} />
            <StatBlock color="silver" heading="[stat]" value={0} />
            <StatBlock color="yellow" heading="[stat]" value={0} />
          </ul>
        </footer>
      </div>

      <Result ref={resultDialogRef} winner={winner} />
      <Reset
        handleResetCancelButtonClick={onCancelResetButtonClick}
        ref={resetDialogRef}
      />
    </>
  );
}
