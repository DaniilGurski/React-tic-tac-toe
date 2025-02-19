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
        return row.map((_col, colIndex) => {
          return (
            <Cell
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={`${rowIndex}_${colIndex}`}
              marking={null}
            />
          );
        });
      })}
    </ul>
  );
}

function Cell({ rowIndex, colIndex, marking }: TCellProps) {
  const { state, dispatch } = useGameContext();

  const [cellMarking, setCellMarking] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // Add X / O to the game board
  const onCellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rowIndex =
      e.currentTarget.dataset.row && parseInt(e.currentTarget.dataset.row);

    const columnIndex =
      e.currentTarget.dataset.column &&
      parseInt(e.currentTarget.dataset.column);

    const updatedBoard = state.gameBoard;

    // Add a marking  to the none visual board at the specified row and column position
    if (typeof rowIndex === "number" && typeof columnIndex === "number") {
      updatedBoard[rowIndex][columnIndex] = state.turn;
    }

    dispatch({ type: "SWITCH_TURN" });
    setIsDisabled(true);
  };

  // Mark the cell on visual game board
  useEffect(() => {
    if (!isDisabled) {
      return;
    }

    const previousTurn = state.turn === "X" ? "O" : "X";
    setCellMarking(previousTurn);

    console.log(`Cell ${rowIndex + 1}, ${colIndex + 1} disabled`);
  }, [isDisabled]);

  // Disable the cell if marking was passed manually (by CPU)
  useEffect(() => {
    if (marking) {
      setIsDisabled(true);
      console.log(`BY CPU:`);
    }
  }, []);

  // Reset cell if game reset
  useEffect(() => {
    if (state.isFreshGame) {
      setIsDisabled(false);
      setCellMarking("");
    }
  }, [state]);

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
        {isDisabled && (
          <img
            src={cellMarking === "X" ? iconX : iconO}
            alt=""
            aria-hidden="true"
          />
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
