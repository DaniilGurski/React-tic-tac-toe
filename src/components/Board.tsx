import { gameBoardAtom, turnAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import iconOutlineX from "@assets/icon-x-outline.svg";
import iconOutlineO from "@assets/icon-o-outline.svg";
import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";

type TCellProps = {
  columnIndex: number;
  rowIndex: number;
};

export default function Board() {
  const [board, setBoard] = useAtom(gameBoardAtom);
  const boardFlatten = board.flat(1);

  return (
    <ul className="mobile:h-[480px] mb-5 grid h-[380px] grid-cols-3 grid-rows-3 gap-5">
      {board.map((row, rowIndex) => {
        return row.map((_col, columnIndex) => {
          return (
            <Cell
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              key={`${rowIndex}_${columnIndex}`}
            />
          );
        });
      })}
    </ul>
  );
}

function Cell({ rowIndex, columnIndex }: TCellProps) {
  const [turn, setTurn] = useAtom(turnAtom);
  const [cellMarking, setCellMarking] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [board, setBoard] = useAtom(gameBoardAtom);

  // Add X / O to the game board
  const onCellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rowIndex =
      e.currentTarget.dataset.row && parseInt(e.currentTarget.dataset.row);

    const columnIndex =
      e.currentTarget.dataset.column &&
      parseInt(e.currentTarget.dataset.column);

    const updatedBoard = [...board];

    // Add a marking  to the none visual board at the specified row and column position
    if (typeof rowIndex === "number" && typeof columnIndex === "number") {
      updatedBoard[rowIndex][columnIndex] = turn;
      setBoard(updatedBoard);
    }

    // Memorize the marking at the time of new turn (cell is clicked on)
    setTurn(turn === "X" ? "O" : "X");
    setIsDisabled(true);
    setCellMarking(turn);
  };

  return (
    <div className="grid">
      <button
        className="bg-navy-100 inset-shadow-navy-lg group cursor-pointer place-items-center rounded-xl"
        onClick={onCellClick}
        disabled={isDisabled}
        data-row={rowIndex}
        data-column={columnIndex}
      >
        {/* Actual cell marking*/}
        {cellMarking === "X" && isDisabled && (
          <img src={iconX} alt="" aria-hidden="true" />
        )}

        {cellMarking === "O" && isDisabled && (
          <img src={iconO} alt="" aria-hidden="true" />
        )}

        {/* On hover cell marking */}
        {turn === "X" && !isDisabled && (
          <img
            className="hidden group-hover:block group-focus:block"
            src={iconOutlineX}
            alt=""
            aria-hidden="true"
          />
        )}

        {turn === "O" && !isDisabled && (
          <img
            className="hidden group-hover:block group-focus:block"
            src={iconOutlineO}
            alt=""
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
