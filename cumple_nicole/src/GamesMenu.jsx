// GamesMenu.jsx
import React, { useState } from "react";
import FindHearts from "./FindHearts";
import Puzzle from "./Puzzle";
import Ruleta from "./Ruleta";
import CandyLove from "./CandyLove";
import "./Games.css";

export default function GamesMenu() {
  const [view, setView] = useState(null); // null | "hearts" | "puzzle" | "ruleta" | "candy"
  const [completed, setCompleted] = useState({
    hearts: false,
    puzzle: false,
    ruleta: false,
    candy: false,
  });

  const markCompleted = (key) => {
    setCompleted((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  return (
    <div className="games-wrap">
      {!view && (
        <div className="games-menu">
          <h2 className="games-title">🎉 Juegos del Cumple — Para Nicole</h2>
          <p className="games-sub">Elige un juego y diviértete 💗</p>

          <div className="games-buttons">
            <button
              className="game-btn hearts"
              onClick={() => setView("hearts")}
            >
              💘 Encuentra los Corazones
              {completed.hearts && <span className="game-tag">✓</span>}
            </button>

            <button
              className="game-btn puzzle"
              onClick={() => setView("puzzle")}
            >
              💖 Puzzle del Amor
              {completed.puzzle && <span className="game-tag">✓</span>}
            </button>

            <button
              className="game-btn ruleta"
              onClick={() => setView("ruleta")}
            >
              💓 Ruleta del Amor
              {completed.ruleta && <span className="game-tag">✓</span>}
            </button>

            <button
              className="game-btn candy"
              onClick={() => setView("candy")}
            >
              🍬 Candy Love
              {completed.candy && <span className="game-tag">✓</span>}
            </button>
          </div>

          <p className="games-note">
            Completa los mini-juegos para desbloquear todas las sorpresas ✨
          </p>
        </div>
      )}

      {view === "hearts" && (
        <FindHearts
          onBack={() => setView(null)}
          onCompleted={() => markCompleted("hearts")}
        />
      )}

      {view === "puzzle" && (
        <Puzzle
          onBack={() => setView(null)}
          onCompleted={() => markCompleted("puzzle")}
        />
      )}

      {view === "ruleta" && (
        <Ruleta
          onBack={() => setView(null)}
          onCompleted={() => markCompleted("ruleta")}
        />
      )}

      {view === "candy" && (
        <CandyLove
          onBack={() => setView(null)}
          onCompleted={() => markCompleted("candy")}
        />
      )}
    </div>
  );
}
