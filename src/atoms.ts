import { atom } from "jotai";

// TODO: Refactor to useReducer ?
export const isPlayingAtom = atom(false);
export const isCrossSelectedAtom = atom(true);
export const gameModeAtom = atom("");
export const turnAtom = atom("X");
export const gameBoardAtom = atom([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);
