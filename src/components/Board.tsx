import iconOutlineX from "@assets/icon-x-outline.svg";
import iconOutlineO from "@assets/icon-o-outline.svg";
import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";

type TCellProps = {
  columnIndex: number;
  rowIndex: number;
  marking: string;
};

export default function Board() {
  return (
    <ul className="mobile:h-[480px] mb-5 grid h-[380px] grid-cols-3 grid-rows-3 gap-5">
      {/* {board.map((row, rowIndex) => {
        return row.map((col, columnIndex) => {
          return (
            <Cell
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              key={`${rowIndex}_${columnIndex}`}
              marking={col !== "" ? col : ""}
            />
          );
        });
      })} */}
    </ul>
  );
}

function Cell({ rowIndex, columnIndex, marking }: TCellProps) {
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

    // Memorize the selection on a new turn (the cell is clicked) and switch turns
    setTurn(turn === "X" ? "O" : "X");
    setIsDisabled(true);
    setCellMarking(turn);
  };

  return (
    <div className="grid">
      <button
        className="bg-navy-100 inset-shadow-navy-lg group cursor-pointer place-items-center rounded-xl"
        onClick={onCellClick}
        disabled={false}
        data-row={rowIndex}
        data-column={columnIndex}
      ></button>
    </div>
  );
}
