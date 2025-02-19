import iconMiniX from "@assets/icon-mini-x.svg";
import iconMiniO from "@assets/icon-mini-o.svg";
import iconRestart from "@assets/icon-restart.svg";
import Logo from "@components/Logo";
import Button from "@components/Button";
import Board from "@components/Board";
import StatBlock from "@components/StatBlock";
import { useEffect, useRef } from "react";
import { useGameContext } from "@/hooks/useGameContext";
import Reset from "@/components/dialogs/Reset";
import Result from "@/components/dialogs/Result";

export type TResetDialogRef = {
  onResetButtonClick: () => void;
};

export type TResultDialogRef = {};

export default function Game() {
  const { state, dispatch } = useGameContext();

  const resetDialogRef = useRef<TResetDialogRef | null>(null);
  const resultDialogRef = useRef<TResultDialogRef | null>(null);

  useEffect(() => {}, []);

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
            <StatBlock color="blue" heading="[stat]" value={0} />
            <StatBlock color="silver" heading="[stat]" value={0} />
            <StatBlock color="yellow" heading="[stat]" value={0} />
          </ul>
        </footer>

        <button
          className="cursor-pointer text-white"
          onClick={() => dispatch({ type: "END_GAME" })}
        >
          Win game
        </button>
      </div>

      <Result ref={resultDialogRef} />
      <Reset ref={resetDialogRef} />
    </>
  );
}
