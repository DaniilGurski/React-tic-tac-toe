import { atom } from "jotai";

export const isPlayingAtom = atom(false);
export const isGameEndedAtom = atom(false);
export const playerOneAtom = atom<"X" | "O">("X");
export const dialogsAtom = atom({
  resultOpened: false,
  resetOpened: false,
});

export const gameModeAtom = atom<"singleplayer" | "multiplayer">("multiplayer");
export const turnAtom = atom<"X" | "O">("X");

export const gameBoardAtom = atom([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);
