import { gameModeAtom, playerOneAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { useState, useEffect, useCallback } from "react";
import { useGameContext } from "./useGameContext";

export const useCpu = () => {
  const { state, dispatch } = useGameContext();
  const [isCpuTurn, setIsCpuTurn] = useState(false);
  const gameMode = useAtomValue(gameModeAtom);
  const playerOne = useAtomValue(playerOneAtom);

  const getRandomCellPosition = useCallback((): {
    randomColIndex: number;
    randomRowIndex: number;
  } => {
    const randomColIndex = Math.round(Math.random() * 2);
    const randomRowIndex = Math.round(Math.random() * 2);

    if (state.gameBoard[randomRowIndex][randomColIndex] !== "") {
      return getRandomCellPosition();
    }

    return { randomRowIndex, randomColIndex };
  }, [state.gameBoard]);

  useEffect(() => {
    if (gameMode !== "singleplayer") {
      return;
    }
    if (state.turn === playerOne) {
      setIsCpuTurn(false);
    } else {
      setIsCpuTurn(true);
    }
  }, [state.turn]);

  useEffect(() => {
    if (gameMode !== "singleplayer") {
      return;
    }

    if (!isCpuTurn) {
      return;
    }

    const { randomRowIndex, randomColIndex } = getRandomCellPosition();

    const updatedBoard = [...state.gameBoard];
    updatedBoard[randomRowIndex][randomColIndex] = state.turn;

    dispatch({ type: "UPDATE_GAME_BOARD", payload: updatedBoard });
  }, [isCpuTurn]);
};
