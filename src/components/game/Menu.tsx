import Logo from "@components/Logo";
import MarkPicker from "@components/MarkPicker";
import Button from "@components/Button";
import { useAtom } from "jotai";
import { gameModeAtom, isInMenuAtom } from "@/atoms";
import { useEffect } from "react";

export default function Menu() {
  const [gameMode, setGameMode] = useAtom(gameModeAtom);
  const [_, setIsInMenu] = useAtom(isInMenuAtom);

  // Start game when game mode selected
  useEffect(() => {}, [gameMode]);

  return (
    <div className="max-w-game-window w-game-window m mobile:gap-y-10 mx-auto grid gap-y-8 place-self-center text-center">
      <Logo className="mx-auto" />
      <MarkPicker />

      <ul className="mobile:gap-y-5 grid gap-y-4">
        <li className="grid">
          <Button
            color="yellow"
            className="rounded-2xl py-6"
            onClick={() => {
              setGameMode("singleplayer");
              setIsInMenu(false);
            }}
          >
            NEW GAME (VS CPU)
          </Button>
        </li>
        <li className="grid">
          <Button
            color="blue"
            className="rounded-2xl py-6"
            onClick={() => {
              setGameMode("multiplayer");
              setIsInMenu(false);
            }}
          >
            NEW GAME (VS PLAYER)
          </Button>
        </li>
      </ul>
    </div>
  );
}
