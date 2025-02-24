import { atom } from "jotai";

export const isInMenuAtom = atom(true);
export const playerOneAtom = atom<"X" | "O">("X");
export const gameModeAtom = atom<"singleplayer" | "multiplayer" | null>(null);
