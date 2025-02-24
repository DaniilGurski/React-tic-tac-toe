import React, { forwardRef } from "react";
import clsx from "clsx";

type TDialogProps = {
  children: React.ReactNode;
};
export const Dialog = forwardRef<HTMLDialogElement, TDialogProps>(
  ({ children }, ref) => {
    return (
      <dialog
        className={clsx(
          "bg-navy-100 fixed top-[50%] w-full max-w-full translate-y-[-50%] justify-items-center py-11 text-center backdrop:bg-black/45",
        )}
        ref={ref}
      >
        {children}
      </dialog>
    );
  },
);

export default Dialog;
