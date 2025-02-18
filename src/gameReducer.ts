export type TGameState = {
  isInMenu: boolean;
  isGameEnded: boolean;
  turn: "X" | "O";
  gameBoard: [string, string, string][];
};

export type TAction = {
  type: "UPDATE_GAME_BOARD" | "END_GAME" | "RETURN_TO_MENU" | "RESET_GAME";
  payload?: any;
};

export const GAME_INITIAL_STATE: TGameState = {
  isInMenu: true,
  isGameEnded: false,
  turn: "X",

  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

export const gameStateReducer = (state: TGameState, action: TAction) => {
  switch (action.type) {
    case "UPDATE_GAME_BOARD":
      return {
        ...GAME_INITIAL_STATE,
      };

    case "END_GAME":
      return {
        ...state,
        isGameEnded: true,
        isDialogOpened: true,
      };

    case "RESET_GAME":
      return {
        ...state,
        gameBoard: GAME_INITIAL_STATE.gameBoard,
      };

    case "RETURN_TO_MENU":
      return {
        ...state,
        isInMenu: true,
      };

    default:
      return state;
  }
};
