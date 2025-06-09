import { formatDistanceToNow } from "date-fns";
import type { GameEntry } from "../../types/Game";
import styles from "./GameCard.module.scss";

type Props = {
  game: GameEntry;
};

export default function GameCard({ game }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {game.coverImageId ? (
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.coverImageId}.jpg`}
            alt={game.title}
          />
        ) : (
          <div className={styles.fallback}>No Image</div>
        )}
      </div>

      <h3 className={styles.title}>{game.title}</h3>

      <p className={styles.platforms}>{game.platform.join(", ")}</p>

      <div className={styles.meta}>
        <span
          className={`${styles.status} ${
            styles[`status--${game.status.toLowerCase()}`]
          }`}
        >
          {game.status}
        </span>
        <span className={styles.added}>
          Added{" "}
          {formatDistanceToNow(new Date(game.addedAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}
