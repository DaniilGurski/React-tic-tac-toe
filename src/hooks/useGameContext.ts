import { GameContext } from "@/App";
import { useContext } from "react";

export const useGameContext = () => {
  const value = useContext(GameContext);

  if (!value) {
    throw new Error("Game context value is not defined / null");
  }

  return value;
};
