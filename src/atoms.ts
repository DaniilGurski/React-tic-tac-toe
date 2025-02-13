import { atom } from "jotai";

// TODO: Refactor to useReducer ?
export const isPlayingAtom = atom(false);
export const isCrossSelectedAtom = atom(true);
export const isDialogOpenedAtom = atom(false);
export const gameModeAtom = atom("");
export const turnAtom = atom("X");

export const gameBoardAtom = atom([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

// TODO: create a state with wins, ties for each side
