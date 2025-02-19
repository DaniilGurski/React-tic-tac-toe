type TMarking = "X" | "O";

export type TGameState = {
  isGameEnded: boolean;
  turn: TMarking;
  isFreshGame: boolean;
  gameBoard: [string, string, string][];
  score: {
    x: number;
    o: number;
    tie: number;
  };
};

export type TAction = {
  type:
    | "UPDATE_GAME_BOARD"
    | "END_GAME"
    | "RETURN_TO_MENU"
    | "FULL_RESET"
    | "RESET"
    | "SWITCH_TURN";
  payload?: any;
};

export const GAME_INITIAL_STATE: TGameState = {
  isGameEnded: false,
  turn: "X",
  isFreshGame: true,

  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],

  score: {
    x: 5,
    o: 5,
    tie: 0,
  },
};

export const gameStateReducer = (state: TGameState, action: TAction) => {
  switch (action.type) {
    case "UPDATE_GAME_BOARD":
      return {
        ...state,
        gameBoard: action.payload as [string, string, string][],
      };

    case "END_GAME":
      return {
        ...state,
        isGameEnded: true,
      };

    case "FULL_RESET":
      return {
        ...GAME_INITIAL_STATE,
      };

    case "RESET":
      return {
        ...GAME_INITIAL_STATE,
        score: state.score,
      };

    case "SWITCH_TURN":
      return {
        ...state,
        turn: state.turn === "X" ? "O" : ("X" as TMarking),
        isFreshGame: false,
      };

    default:
      return state;
  }
};
