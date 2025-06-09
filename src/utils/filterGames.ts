import type { GameEntry, GameStatus } from "../types/Game";

export function filterGamesByStatus(
  games: GameEntry[],
  status: GameStatus | "All"
): GameEntry[] {
  if (status === "All") return games;
  return games.filter((game) => game.status === status);
}
