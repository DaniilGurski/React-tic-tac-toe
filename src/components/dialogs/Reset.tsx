import {
  dialogsAtom,
  gameBoardAtom,
  isGameEndedAtom,
  isPlayingAtom,
} from "@/atoms";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { forwardRef } from "react";

type TResetProps = {
  handleResetCancelButtonClick: () => void;
};

const Reset = forwardRef<HTMLDialogElement, TResetProps>(
  ({ handleResetCancelButtonClick }, ref) => {
    // TOOD: Make a useDialogHook returning close Dialog function or end Game ?
    const [dialogs, setDialogs] = useAtom(dialogsAtom);
    const setGameEnded = useSetAtom(isGameEndedAtom);
    const setGameBoard = useSetAtom(gameBoardAtom);
    const setIsPlaying = useSetAtom(isPlayingAtom);

    const onResetButtonClick = () => {
      setIsPlaying(false);
      setGameEnded(false);
      setGameBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    };

    return (
      <Dialog ref={ref} isOpened={dialogs.resetOpened}>
        <h2 className="text-silver-200 mb-4 text-[2.813rem] font-bold uppercase">
          RESTART GAME ?
        </h2>
        <ul className="flex gap-x-4">
          <li>
            <Button
              color="silver"
              className="rounded-xl p-4"
              onClick={handleResetCancelButtonClick}
            >
              NO, CANCEL
            </Button>
          </li>
          <li>
            <Button
              color="yellow"
              className="rounded-xl p-4"
              onClick={onResetButtonClick}
            >
              YES, RESTART
            </Button>
          </li>
        </ul>
      </Dialog>
    );
  },
);

export default Reset;
