import { formatDistanceToNow } from "date-fns";
import type { GameEntry } from "../../types/Game";
import styles from "./GameCard.module.scss";
import { useGameStore } from "../../store/useGameStore";

type Props = {
  game: GameEntry;
};

export default function GameCard({ game }: Props) {
  const updateStatus = useGameStore((s) => s.updateStatus);

  return (
    <div className={styles.card}>
      <select
        value={game.status}
        onChange={(e) =>
          updateStatus(game.id, e.target.value as GameEntry["status"])
        }
        className={`${styles.statusSelect} ${
          styles[`status--${game.status.toLowerCase()}`]
        }`}
      >
        <option value="Backlog">Backlog</option>
        <option value="Playing">Playing</option>
        <option value="Completed">Completed</option>
        <option value="Dropped">Dropped</option>
      </select>

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
      
      <span className={styles.added}>
        Added {formatDistanceToNow(new Date(game.addedAt), { addSuffix: true })}
      </span>
    </div>
  );
}
