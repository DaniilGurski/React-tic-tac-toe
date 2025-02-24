import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { TResetDialogRef } from "@/components/game/Game";
import { useGameContext } from "@/hooks/useGameContext";

const Reset = forwardRef<TResetDialogRef>((_, ref) => {
  const { dispatch } = useGameContext();

  const localRef = useRef<HTMLDialogElement | null>(null);

  const onResetButtonClick = () => {
    if (!localRef.current) {
      return;
    }

    localRef.current.showModal();
  };

  const onResetCancelButtonClick = () => {
    if (!localRef.current) {
      return;
    }

    localRef.current.close();
  };

  const onResetConfirmButtonClick = () => {
    dispatch({ type: "FULL_RESET" });

    if (!localRef.current) {
      return;
    }

    localRef.current.close();
  };

  useImperativeHandle(ref, () => ({
    onResetButtonClick,
  }));

  return (
    <Dialog ref={localRef}>
      <h2 className="text-silver-200 mb-4 text-[2.813rem] font-bold uppercase">
        RESTART GAME ?
      </h2>
      <ul className="flex gap-x-4">
        <li>
          <Button
            color="silver"
            className="rounded-xl p-4"
            onClick={onResetCancelButtonClick}
          >
            NO, CANCEL
          </Button>
        </li>
        <li>
          <Button
            color="yellow"
            className="rounded-xl p-4"
            onClick={onResetConfirmButtonClick}
          >
            YES, RESTART
          </Button>
        </li>
      </ul>
    </Dialog>
  );
});

export default Reset;
