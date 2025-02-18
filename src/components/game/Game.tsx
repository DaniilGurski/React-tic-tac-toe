import iconMiniX from "@assets/icon-mini-x.svg";
import iconMiniO from "@assets/icon-mini-o.svg";
import iconRestart from "@assets/icon-restart.svg";
import Logo from "@components/Logo";
import Button from "@components/Button";
import Board from "@components/Board";
import StatBlock from "@components/StatBlock";
import { useEffect } from "react";

export default function Game() {
  // Reset game board on first mount
  useEffect(() => {}, []);
  return (
    <>
      <div className="max-w-game-window w-almost-full mobile:place-self-center mx-auto">
        <header className="mobile:mb-5 mb-16 flex items-center justify-between">
          <Logo />

          <div className="mobile:gap-x-3.5 bg-navy-100 mobile:px-8 mobile:py-3.5 inset-shadow-navy-sm flex items-center gap-x-2 rounded-xl px-3.5 py-2">
            {/* <img src={turn === "X" ? iconMiniX : iconMiniO} alt="" /> */}
            <img src={iconMiniX} alt="" />
            <span className="text-silver-200 mobile:text-base text-sm">
              {" "}
              TURN{" "}
            </span>
          </div>

          <Button
            color="silver"
            className="mobile:p-3 aspect-square rounded-xl p-3"
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

      {/* <Result />
      <Reset /> */}
    </>
  );
}
