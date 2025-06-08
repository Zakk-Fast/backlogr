import { describe, it, expect, beforeEach, vi } from "vitest";
import { useGameStore } from "./useGameStore";
import { act } from "react-dom/test-utils";

import type { GameEntry } from "../types/Game";

Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

const sampleGame: GameEntry = {
  id: "abc123",
  title: "Test Game",
  platform: "PC",
  coverImageUrl: "https://test.image",
  status: "Backlog",
  addedAt: new Date().toISOString(),
};

describe("useGameStore", () => {
  beforeEach(() => {
    useGameStore.setState({ games: [], currentIndex: 0, searchCache: {} });
  });

  it("adds a game to the store", () => {
    act(() => {
      useGameStore.getState().addGame(sampleGame);
    });

    const games = useGameStore.getState().games;
    expect(games).toHaveLength(1);
    expect(games[0].title).toBe("Test Game");
  });

  it("updates the status of a game", () => {
    act(() => {
      useGameStore.getState().addGame(sampleGame);
      useGameStore.getState().updateStatus("abc123", "Playing");
    });

    const updated = useGameStore
      .getState()
      .games.find((g) => g.id === "abc123");
    expect(updated?.status).toBe("Playing");
  });
});
