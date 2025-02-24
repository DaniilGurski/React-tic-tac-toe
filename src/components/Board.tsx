import iconOutlineX from "@assets/icon-x-outline.svg";
import iconOutlineO from "@assets/icon-o-outline.svg";
import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";
import { useGameContext } from "@/hooks/useGameContext";
import { useEffect, useState } from "react";

type TCellProps = {
  colIndex: number;
  rowIndex: number;
  marking: "X" | "O" | null;
};

export default function Board() {
  const { state } = useGameContext();

  return (
    <ul className="mobile:h-[480px] mb-5 grid h-[380px] grid-cols-3 grid-rows-3 gap-5">
      {state.gameBoard.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          const marking = col !== "" ? (col as "X" | "O") : null;

          return (
            <Cell
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={`${rowIndex}_${colIndex}`}
              marking={marking}
            />
          );
        });
      })}
    </ul>
  );
}

function Cell({ rowIndex, colIndex, marking }: TCellProps) {
  const { state, dispatch } = useGameContext();

  const [cellMarking, setCellMarking] = useState(marking);
  const [isDisabled, setIsDisabled] = useState(false);

  // Add X / O to the game board by clicking
  const onCellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rowIndex =
      e.currentTarget.dataset.row && parseInt(e.currentTarget.dataset.row);

    const columnIndex =
      e.currentTarget.dataset.column &&
      parseInt(e.currentTarget.dataset.column);

    // Add a marking  to the none visual board at the specified row and column position
    if (typeof rowIndex === "number" && typeof columnIndex === "number") {
      const updatedBoard = [...state.gameBoard];
      updatedBoard[rowIndex][columnIndex] = state.turn;

      dispatch({ type: "UPDATE_GAME_BOARD", payload: updatedBoard });

      setIsDisabled(true);
    }
  };

  // Mark the cell on visual game board
  useEffect(() => {
    if (!isDisabled) {
      return;
    }

    setCellMarking(marking ?? state.turn);
  }, [isDisabled]);

  // Disable the cell if marking was passed manually (by CPU)
  useEffect(() => {
    if (marking) {
      setIsDisabled(true);
    }
  }, [marking, colIndex, rowIndex, state.turn]);

  // Re-enable cells on reset
  useEffect(() => {
    if (state.isFreshGame) {
      setIsDisabled(false);
    }
  }, [state.isFreshGame]);

  return (
    <div className="grid">
      <button
        className="bg-navy-100 inset-shadow-navy-lg group cursor-pointer place-items-center rounded-xl"
        onClick={onCellClick}
        disabled={isDisabled}
        data-row={rowIndex}
        data-column={colIndex}
      >
        {/* Actual cell marking */}
        {isDisabled && cellMarking === "X" && (
          <img src={iconX} alt="" aria-hidden="true" />
        )}
        {isDisabled && cellMarking === "O" && (
          <img src={iconO} alt="" aria-hidden="true" />
        )}

        {/* On hover cell marking */}
        {!isDisabled && (
          <img
            className="hidden group-hover:block group-focus:block"
            src={state.turn === "X" ? iconOutlineX : iconOutlineO}
            alt=""
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
