import { createContext, useReducer } from "react";
import {
  GAME_INITIAL_STATE,
  gameStateReducer,
  TAction,
  TGameState,
} from "@/gameReducer";
import Game from "@components/game/Game";
import Menu from "@components/game/Menu";
import { isInMenuAtom } from "@/atoms";
import { useAtomValue } from "jotai";

export const GameContext = createContext<
  { state: TGameState; dispatch: (action: TAction) => void } | undefined
>(undefined);

function App() {
  const [state, dispatch] = useReducer(gameStateReducer, GAME_INITIAL_STATE);
  const isInMenu = useAtomValue(isInMenuAtom);
  return (
    <>
      <main className="bg-navy-200 text-navy-200 font-primary grid h-dvh py-6 font-medium">
        <GameContext.Provider value={{ state, dispatch }}>
          {isInMenu ? <Menu /> : <Game />}
        </GameContext.Provider>
      </main>
    </>
  );
}

export default App;
