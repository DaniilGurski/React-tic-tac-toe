import { ComponentState, useEffect } from "react";

export const useConsoleLog = (state: ComponentState, message?: string) => {
  useEffect(() => {
    if (message) {
      console.log(message);
    } else {
      console.log(state);
    }
  }, [state]);
};
