import { create } from "zustand";
import type { GameEntry, GameStatus } from "../types/Game";
import type { SearchResult } from "../components/GameSearchModal/GameSearchModal";
import {
  loadGames,
  loadIndex,
  saveGames,
  saveIndex,
} from "../lib/localStorage";

type GameStore = {
  games: GameEntry[];
  currentIndex: number;
  searchCache: Record<string, { data: SearchResult[]; timestamp: number }>;

  addGame: (game: GameEntry) => void;
  removeGame: (id: string) => void;
  updateStatus: (id: string, status: GameStatus) => void;
  setCurrentIndex: (index: number) => void;

  addSearchResult: (query: string, results: SearchResult[]) => void;
  getSearchResult: (query: string) => SearchResult[] | null;
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
    const existing = get().games.some((g) => g.id === game.id);
    if (existing) return;

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

  addSearchResult: (query: string, results: SearchResult[]) => {
    const normalized = query.toLowerCase();
    set((state) => ({
      searchCache: {
        ...state.searchCache,
        [normalized]: {
          data: results,
          timestamp: Date.now(),
        },
      },
    }));
  },

  getSearchResult: (query: string): SearchResult[] | null => {
    const normalized = query.toLowerCase();
    const cached = get().searchCache[normalized];
    const now = Date.now();

    if (!cached) return null;
    if (now - cached.timestamp > 1000 * 60 * 60 * 24) return null; // 24 hours

    return cached.data;
  },
}));
