import type { GameEntry } from "../types/Game";

const GAMES_KEY = "backlogr_games";
const INDEX_KEY = "backlogr_currentIndex";

export function saveGames(games: GameEntry[]) {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

export function loadGames(): GameEntry[] {
  const data = localStorage.getItem(GAMES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveIndex(index: number) {
  localStorage.setItem(INDEX_KEY, index.toString());
}

export function loadIndex(): number {
  const data = localStorage.getItem(INDEX_KEY);
  return data ? parseInt(data, 10) : 0;
}
