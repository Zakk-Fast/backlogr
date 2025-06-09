import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useGameStore } from "../../store/useGameStore";
import GameCard from "../GameCard/GameCard";
import styles from "./GameCarousel.module.scss";

export default function GameCarousel() {
  const games = useGameStore((s) => s.games);
  const currentIndex = useGameStore((s) => s.currentIndex);
  const setCurrentIndex = useGameStore((s) => s.setCurrentIndex);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < games.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  if (games.length === 0) return <p className={styles.empty}>No games yet</p>;

  return (
    <div className={styles.carousel}>
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
        {games.map((game, index) => {
          const offset = index - currentIndex;
          return (
            <div
              key={game.id}
              className={styles.carousel__card}
              style={{
                transform: `translateX(${offset * 100}%) scale(${
                  offset === 0 ? 1 : 0.85
                })`,
                zIndex: games.length - Math.abs(offset),
                opacity: offset < -2 || offset > 2 ? 0 : 1,
              }}
            >
              <GameCard game={game} />
            </div>
          );
        })}
      </div>

      {!isTouch && (
        <button
          onClick={next}
          disabled={currentIndex === games.length - 1}
          className={styles.carousel__arrow}
        >
          ▶
        </button>
      )}
    </div>
  );
}
