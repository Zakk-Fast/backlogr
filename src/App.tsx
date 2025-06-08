// src/App.tsx
import { useState } from "react";
import GameSearchModal from "./components/GameSearchModal/GameSearchModal";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎮 Backlogr</h1>
      <button onClick={() => setModalOpen(true)}>➕ Add Game</button>

      <GameSearchModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
