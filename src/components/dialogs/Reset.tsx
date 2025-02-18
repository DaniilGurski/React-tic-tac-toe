import Button from "@components/Button";
import Dialog from "@components/Dialog";
import { forwardRef } from "react";

type TResetProps = {
  handleResetCancelButtonClick: () => void;
};

const Reset = forwardRef<HTMLDialogElement, TResetProps>(
  ({ handleResetCancelButtonClick }, ref) => {
    return (
      <Dialog ref={ref} isOpened={false}>
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
            <Button color="yellow" className="rounded-xl p-4">
              YES, RESTART
            </Button>
          </li>
        </ul>
      </Dialog>
    );
  },
);

export default Reset;
