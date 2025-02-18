import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { playerOneAtom } from "@/atoms";
import iconMenuX from "@assets/icon-menu-x.svg";
import iconMenuO from "@assets/icon-menu-o.svg";
import iconSelectedMenuX from "@assets/icon-menu-x-selected.svg";
import iconSelectedMenuO from "@assets/icon-menu-o-selected.svg";

type TMarkButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  mark: "X" | "O";
};

export default function MarkPicker() {
  const setPlayerOne = useSetAtom(playerOneAtom);

  return (
    <div className="text-silver-200 bg-navy-100 inset-shadow-navy-lg mobile:py-8 ring-navy-200 grid gap-y-6 rounded-2xl p-6 ring-4">
      <h1 className="font-bold"> PICK PLAYER 1'S MARK </h1>

      <ul className="bg-navy-200 w-almost-full mx-auto grid grid-cols-2 rounded-[0.625rem] p-2">
        <li className="grid">
          <MarkButton mark="X" onClick={() => setPlayerOne("X")} />
        </li>
        <li className="grid">
          <MarkButton mark="O" onClick={() => setPlayerOne("O")} />
        </li>
      </ul>

      <p> REMEMBER : X GOES FIRST </p>
    </div>
  );
}

function MarkButton({ mark, ...rest }: TMarkButtonProps) {
  const playerOne = useAtomValue(playerOneAtom);

  return (
    <button
      className={clsx(
        "cursor-pointer rounded-[0.625rem] py-3",
        mark === playerOne
          ? "bg-silver-200"
          : "hover:bg-silver-400 focus:bg-silver-400",
      )}
      {...rest}
    >
      {mark === "X" ? (
        <img
          className="mx-auto size-8"
          src={playerOne === "X" ? iconSelectedMenuX : iconMenuX}
          alt=""
        />
      ) : (
        <img
          className="mx-auto size-8"
          src={playerOne === "O" ? iconSelectedMenuO : iconMenuO}
          alt=""
        />
      )}
    </button>
  );
}
