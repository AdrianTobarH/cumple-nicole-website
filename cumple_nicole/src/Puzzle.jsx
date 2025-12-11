// Puzzle.jsx
import React, { useEffect, useState } from "react";
import "./Games.css";
import sorpresa from "./Sorpresa.jpg";

const createOrdered = () => Array.from({ length: 9 }, (_, i) => i);

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Puzzle({ onBack, onComplete }) {
  const [tiles, setTiles] = useState(createOrdered());
  const [selected, setSelected] = useState(null);
  const [won, setWon] = useState(false);
  const [reportedDone, setReportedDone] = useState(false);

  useEffect(() => {
    setTiles(shuffle(createOrdered()));
    setWon(false);
    setReportedDone(false);
  }, []);

  const swap = (i, j) => {
    const t = tiles.slice();
    [t[i], t[j]] = [t[j], t[i]];
    setTiles(t);
    if (t.every((v, idx) => v === idx)) {
      if (!reportedDone && onComplete) {
        onComplete();
        setReportedDone(true);
      }
      setTimeout(() => setWon(true), 250);
    }
  };

  const handleClick = (idx) => {
    if (selected === null) {
      setSelected(idx);
    } else {
      if (selected === idx) {
        setSelected(null);
        return;
      }
      swap(selected, idx);
      setSelected(null);
    }
  };

  return (
    <div className="game-screen">
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="counter">Puzzle 3×3</div>
      </div>

      <div className="puzzle-stage">
        <div className="puzzle-grid">
          {tiles.map((tileIdx, i) => {
            const row = Math.floor(tileIdx / 3);
            const col = tileIdx % 3;
            const bgPos = `${(col / 2) * 100}% ${(row / 2) * 100}%`;
            return (
              <div
                key={i}
                className={`puzzle-tile ${selected === i ? "selected" : ""}`}
                onClick={() => handleClick(i)}
                style={{
                  backgroundImage: `url(${sorpresa})`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: bgPos,
                }}
              />
            );
          })}
        </div>

        <p className="puzzle-instr">
          Click en una pieza y luego en otra para intercambiar. Arma la imagen completa ✨
        </p>
      </div>

      {won && (
        <div className="modal secret-modal">
          <div className="modal-card">
            <h3>¡Lo lograste! 🎉</h3>
            <p className="secret-text">
              Así como armaste esta imagen… quiero construir muchos momentos contigo.
            </p>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  setWon(false);
                  setTiles(shuffle(createOrdered()));
                  setReportedDone(false);
                }}
              >
                Jugar de nuevo
              </button>
              <button className="btn-secondary" onClick={onBack}>Volver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
