import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useGameStore } from "../../store/useGameStore";
import GameCard from "../GameCard/GameCard";
import { filterGamesByStatus } from "../../utils/filterGames";
import styles from "./GameCarousel.module.scss";
import type { GameStatus } from "../../types/Game";

export default function GameCarousel() {
  const games = useGameStore((s) => s.games);
  const currentIndex = useGameStore((s) => s.currentIndex);
  const setCurrentIndex = useGameStore((s) => s.setCurrentIndex);

  const [isTouch, setIsTouch] = useState(false);
  const [filter, setFilter] = useState<
    "All" | "Backlog" | "Playing" | "Completed" | "Dropped"
  >("All");

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const filteredGames = filterGamesByStatus(games, filter);

  useEffect(() => {
    if (currentIndex >= filteredGames.length) {
      setCurrentIndex(0);
    }
  }, [filteredGames.length, currentIndex, setCurrentIndex]);
  useEffect(() => {
    const track = document.querySelector(
      `.${styles.carousel__track}`
    ) as HTMLElement | null;
    if (track) {
      void track.offsetHeight;
    }
  }, [filteredGames.length, currentIndex]);

  const prev = () => {
    console.log("prev clicked");
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    console.log("next click");
    if (currentIndex < filteredGames.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__filter}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as GameStatus | "All")}
        >
          <option value="All">All</option>
          <option value="Backlog">Backlog</option>
          <option value="Playing">Playing</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
      </div>

      <div className={styles.carousel__content}>
        {!isTouch && (
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={styles.carousel__arrow}
          >
            ◀
          </button>
        )}

        <div {...swipeHandlers} className={styles.carousel__track}>
          {games.length === 0 ? (
            <div className={styles.empty}>
              Your backlog is empty. Start adding some games!
            </div>
          ) : filteredGames.length === 0 ? (
            <div className={styles.empty}>
              No games found matching that filter.
            </div>
          ) : (
            filteredGames.map((game, index) => {
              const offset = index - currentIndex;
              return (
                <div
                  key={game.id}
                  className={styles.carousel__card}
                  style={{
                    transform: `translateX(${offset * 100}%) scale(${
                      offset === 0 ? 1 : 0.85
                    })`,
                    zIndex: filteredGames.length - Math.abs(offset),
                    opacity: offset < -2 || offset > 2 ? 0 : 1,
                    pointerEvents: offset === 0 ? "auto" : "none",
                  }}
                >
                  <GameCard game={game} />
                </div>
              );
            })
          )}
        </div>

        {!isTouch && (
          <button
            onClick={next}
            disabled={currentIndex === filteredGames.length - 1}
            className={styles.carousel__arrow}
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
