import { create } from "zustand";
import type { GameEntry, GameStatus } from "../types/Game";
import {
  loadGames,
  loadIndex,
  saveGames,
  saveIndex,
} from "../lib/localStorage";

type GameStore = {
  games: GameEntry[];
  currentIndex: number;
  searchCache: Record<string, GameEntry[]>;

  addGame: (game: GameEntry) => void;
  removeGame: (id: string) => void;
  updateStatus: (id: string, status: GameStatus) => void;
  setCurrentIndex: (index: number) => void;

  addSearchResult: (query: string, results: GameEntry[]) => void;
  getSearchResult: (query: string) => GameEntry[] | null;
};

let initialGames: GameEntry[] = [];
let initialIndex: number = 0;

if (typeof window !== "undefined") {
  initialGames = loadGames();
  initialIndex = loadIndex();
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: initialGames,
  currentIndex: initialIndex,
  searchCache: {},

  addGame: (game: GameEntry) => {
    const updated = [...get().games, game];
    saveGames(updated);
    set({ games: updated });
  },

  removeGame: (id: string) => {
    const updated = get().games.filter((g) => g.id !== id);
    saveGames(updated);
    set({ games: updated });
  },

  updateStatus: (id: string, status: GameStatus) => {
    const updated = get().games.map((g: GameEntry) =>
      g.id === id ? { ...g, status } : g
    );
    saveGames(updated);
    set({ games: updated });
  },

  setCurrentIndex: (index: number) => {
    saveIndex(index);
    set({ currentIndex: index });
  },

  addSearchResult: (query: string, results: GameEntry[]) => {
    const normalized = query.toLowerCase();
    set((state) => ({
      searchCache: {
        ...state.searchCache,
        [normalized]: results,
      },
    }));
  },

  getSearchResult: (query: string): GameEntry[] | null => {
    return get().searchCache[query.toLowerCase()] ?? null;
  },
}));
