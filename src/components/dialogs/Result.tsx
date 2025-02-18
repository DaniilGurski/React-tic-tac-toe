import iconX from "@assets/icon-x.svg";
import iconO from "@assets/icon-o.svg";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { forwardRef } from "react";
import clsx from "clsx";

type TResultProps = {
  // winner: "X" | "O";
};

export const Result = forwardRef<HTMLDialogElement, TResultProps>(({}, ref) => {
  return (
    <Dialog ref={ref} isOpened={false}>
      <h2 className="text-silver-200 mb-4 font-bold uppercase">
        <span>{"MESSAGE"}</span>
      </h2>
      <p className="mobile:gap-x-6 mb-6 flex gap-x-2">
        <img src={true ? iconX : iconO} alt="" />
        <span
          className={clsx(
            "text-[2.813rem]",
            true ? "text-blue-200" : "text-yellow-200",
          )}
        >
          TAKES THE ROUND
        </span>
      </p>
      <ul className="flex gap-x-4">
        <li>
          <Button color="silver" className="rounded-xl p-4">
            QUIT
          </Button>
        </li>
        <li>
          <Button color="yellow" className="rounded-xl p-4">
            NEXT ROUND
          </Button>
        </li>
      </ul>
    </Dialog>
  );
});

export default Result;
