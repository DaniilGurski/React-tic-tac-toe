type TMarking = "X" | "O";

export type TGameState = {
  isGameEnded: boolean;
  turn: TMarking;
  isFreshGame: boolean;
  isTied: boolean;
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
    | "SWITCH_TURN"
    | "ADD_POINT_TO_X"
    | "ADD_POINT_TO_O"
    | "ADD_POINT_TO_TIED";

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  payload?: any;
};

export const GAME_INITIAL_STATE: TGameState = {
  isGameEnded: false,
  turn: "X",
  isFreshGame: true,
  isTied: false,

  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],

  score: {
    x: 0,
    o: 0,
    tie: 0,
  },
};

export const gameStateReducer = (state: TGameState, action: TAction) => {
  // I'm resetting everything manually because spreading or returning GAME_INITIAL_STATE isn't working for some reason.
  switch (action.type) {
    case "UPDATE_GAME_BOARD":
      return {
        ...state,
        gameBoard: action.payload as [string, string, string][],
        isFreshGame: false,
      };

    case "END_GAME":
      return {
        ...state,
        isGameEnded: true,
        isTied: action.payload ?? false,
      };

    case "FULL_RESET":
      return {
        isGameEnded: false,
        turn: "X" as TMarking,
        isFreshGame: true,
        isTied: false,

        gameBoard: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ] as [string, string, string][],

        score: {
          x: 0,
          o: 0,
          tie: 0,
        },
      };

    case "RESET":
      return {
        isGameEnded: false,
        turn: "X" as TMarking,
        isFreshGame: true,
        isTied: false,

        gameBoard: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ] as [string, string, string][],

        score: state.score,
      };

    case "SWITCH_TURN":
      return {
        ...state,
        turn: state.turn === "X" ? "O" : ("X" as TMarking),
      };

    case "ADD_POINT_TO_X":
      return {
        ...state,
        score: {
          ...state.score,
          x: state.score.x + 1,
        },
      };

    case "ADD_POINT_TO_O":
      return {
        ...state,
        score: {
          ...state.score,
          o: state.score.o + 1,
        },
      };

    case "ADD_POINT_TO_TIED":
      return {
        ...state,
        score: {
          ...state.score,
          tie: state.score.tie + 1,
        },
      };
    default:
      return state;
  }
};
