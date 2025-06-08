import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { debounce } from "lodash";
import { useGameStore } from "../../store/useGameStore";
import { searchGames } from "../../lib/api";

import type { GameEntry } from "../../types/Game";

import styles from "./GameSearchModal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export type SearchResult = {
  id: number;
  name: string;
  cover?: { image_id: string };
  platforms?: { id: number; name: string }[];
};

export default function GameSearchModal({ isOpen, onClose }: Props) {
  const addGame = useGameStore((state) => state.addGame);
  const games = useGameStore((state) => state.games);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSearchResult = useGameStore((s) => s.getSearchResult);
  const addSearchResult = useGameStore((s) => s.addSearchResult);

  const debouncedSearch = useCallback(
    debounce(async (q: string) => {
      if (!q.trim()) return;

      const cached = getSearchResult(q);
      if (cached) {
        setResults(cached as unknown as SearchResult[]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data: SearchResult[] = await searchGames(q);
        addSearchResult(q, data);
        setResults(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        } else {
          setError("Unknown error occurred");
        }
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [getSearchResult, addSearchResult]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  if (!isOpen) return null;



  return createPortal(
    <div>
      <div className={styles["game-search-modal__overlay"]}></div>
      <div className={styles["game-search-modal__modal"]}>
        <div className={styles["game-search-modal__header"]}>
          <h2>Search for a Game</h2>
          <button
            onClick={onClose}
            className={styles["game-search-modal__close-button"]}
          >
            &times;
          </button>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games..."
          className={styles["game-search-modal__input"]}
        />
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <ul className={styles["game-search-modal__results"]}>
          {results.map((game) => {
            const alreadyAdded = games.some((g) => g.id === game.id.toString());

            return (
              <li
                key={game.id}
                className={styles["game-search-modal__result-item"]}
              >
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`}
                  alt={game.name}
                  width={80}
                  height={100}
                />
                <div>
                  <strong>{game.name}</strong>
                  <p>{game.platforms?.map((p) => p.name).join(", ")}</p>
                </div>
                <button
                  disabled={alreadyAdded}
                  onClick={() => {
                    if (alreadyAdded) return;
                    const entry: GameEntry = {
                      id: game.id.toString(),
                      title: game.name,
                      platform: game.platforms?.map((p) => p.name) ?? [],
                      coverImageId: game.cover?.image_id ?? "",
                      status: "Backlog",
                      addedAt: Date.now(),
                    };
                    addGame(entry);
                  }}
                >
                  {alreadyAdded ? "✅" : "➕"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    document.body
  );

}
