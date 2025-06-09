import { useState, useEffect } from "react";
import GameSearchModal from "./components/GameSearchModal/GameSearchModal";
import GameCarousel from "./components/GameCarousel/GameCarousel";
import styles from "./App.module.scss";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <main className={styles.app}>
      <GameSearchModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className="header">
        <h1>🎮 Backlogr</h1>
      </div>
      <div className={styles.wrapper}>
        <GameCarousel />
        {!isMobile ? (
          <button
            className={styles.addDesktop}
            onClick={() => setModalOpen(true)}
          >
            + Add Game
          </button>
        ) : (
          <button className={styles.fab} onClick={() => setModalOpen(true)}>
            +
          </button>
        )}
      </div>
    </main>
  );
}
