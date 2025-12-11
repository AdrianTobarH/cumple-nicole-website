// GamesMenu.jsx
import React, { useState } from "react";
import FindHearts from "./FindHearts";
import Puzzle from "./Puzzle";
import Ruleta from "./Ruleta";
import "./Games.css";

export default function GamesMenu({ completed = {}, onCompleteGame }) {
  const [view, setView] = useState(null); // null | "hearts" | "puzzle" | "ruleta"

  const goBack = () => setView(null);

  const handleDone = (key) => {
    if (onCompleteGame) onCompleteGame(key);
  };

  return (
    <div className="games-wrap">
      {!view && (
        <div className="games-menu">
          <h2 className="games-title">🎉 Juegos del Cumple — Para Nicole</h2>
          <p className="games-sub">Elige un juego y diviértete 💗</p>

          <div className="games-buttons">
            <button className="game-btn hearts" onClick={() => setView("hearts")}>
              💘 Encuentra los Corazones
              {completed.hearts && <span className="game-tag">✓</span>}
            </button>

            <button className="game-btn puzzle" onClick={() => setView("puzzle")}>
              💖 Puzzle del Amor
              {completed.puzzle && <span className="game-tag">✓</span>}
            </button>

            <button className="game-btn ruleta" onClick={() => setView("ruleta")}>
              💓 Ruleta del Amor
              {completed.ruleta && <span className="game-tag">✓</span>}
            </button>
          </div>

          <p className="games-note">
            Completa los tres juegos para desbloquear la sorpresa final ✨
          </p>
        </div>
      )}

      {view === "hearts" && (
        <FindHearts onBack={goBack} onComplete={() => handleDone("hearts")} />
      )}

      {view === "puzzle" && (
        <Puzzle onBack={goBack} onComplete={() => handleDone("puzzle")} />
      )}

      {view === "ruleta" && (
        <Ruleta onBack={goBack} onComplete={() => handleDone("ruleta")} />
      )}
    </div>
  );
}
