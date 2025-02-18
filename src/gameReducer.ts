type TGameState = {
  isPlaying: boolean;
  isGameEnded: boolean;
  isDialogOpened: boolean;
  gameMode: "singleplayer" | "multiplayer" | null;
  turn: "X" | "O";
  gameBoard: [string, string, string][];
};

type TAction = {
  type: "UPDATE_GAME_BOARD" | "END_GAME" | "RETURN_TO_MENU" | "RESET_GAME";
  payload?: any;
};

export const GAME_INITIAL_STATE: TGameState = {
  isPlaying: false,
  isGameEnded: false,
  isDialogOpened: false,
  gameMode: null,
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
        gameBoard: action.payload,
      };

    case "RETURN_TO_MENU":
      return {
        ...state,
        isPlaying: false,
      };

    default:
      return state;
  }
};
