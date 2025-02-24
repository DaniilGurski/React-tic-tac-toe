import { useEffect } from "react";
import { useGameContext } from "./useGameContext";

export const useCheckWinner = () => {
  const { state, dispatch } = useGameContext();
  const { isFreshGame, gameBoard, turn } = state;

  useEffect(() => {
    if (isFreshGame) {
      return;
    }
    const lastIndex = gameBoard.length - 1;
    let win = false;
    const diagonalWin = {
      right: true,
      left: true,
    };

    const isGameBoardFull = gameBoard.flat(1).every((cell) => cell !== "");

    // Check rows
    for (const row of gameBoard) {
      const isRowFull = row.every((cell) => cell === turn);

      if (isRowFull) {
        win = true;
      }
    }

    // Check columns
    for (let col = 0; col < gameBoard.length; col++) {
      const isColFull = gameBoard.every((row) => row[col] === turn);

      if (isColFull) {
        win = true;
      }
    }

    // Check for diagonal
    for (let pos = 0; pos < gameBoard.length; pos++) {
      if (gameBoard[pos][pos] !== turn) {
        diagonalWin.right = false;
      }
      if (gameBoard[pos][lastIndex - pos] !== turn) {
        diagonalWin.left = false;
      }
    }

    if (win || diagonalWin.right || diagonalWin.left) {
      dispatch({ type: "END_GAME" });
      dispatch({ type: `ADD_POINT_TO_${turn}` });
      return;
    } else if (isGameBoardFull) {
      // Set isTied to true
      dispatch({ type: "END_GAME", payload: true });
      dispatch({ type: "ADD_POINT_TO_TIED" });
      return;
    } else {
      dispatch({ type: "SWITCH_TURN" });
    }
  }, [gameBoard]);
};
