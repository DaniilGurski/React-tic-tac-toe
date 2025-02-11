import { gameBoardAtom } from "@/atoms";
import { useAtom } from "jotai";

export default function Board() {
  const [board, setBoard] = useAtom(gameBoardAtom);
  const boardFlatten = board.flat(1);

  return (
    <ul className="mobile:h-[480px] mb-5 grid h-[380px] grid-cols-3 grid-rows-3 gap-5">
      {boardFlatten.map(() => {
        return <Cell />;
      })}
    </ul>
  );
}

function Cell() {
  return (
    <li className="grid">
      <button className="bg-navy-100 inset-shadow-navy-lg items-center rounded-xl">
        {" "}
      </button>
    </li>
  );
}
