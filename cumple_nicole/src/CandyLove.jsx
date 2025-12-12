// CandyLove.jsx
import React, { useState } from "react";
import "./Games.css";

const WIDTH = 6;
const HEIGHT = 6;
const CANDIES = ["🍓", "🍋", "🍇", "🍒", "🍬"];
const TARGET_SCORE = 120;

const randomCandy = () =>
  Math.floor(Math.random() * CANDIES.length);

const createBoard = () =>
  Array.from({ length: WIDTH * HEIGHT }, () => randomCandy());

const isAdjacent = (a, b) => {
  const rowA = Math.floor(a / WIDTH);
  const rowB = Math.floor(b / WIDTH);
  const colA = a % WIDTH;
  const colB = b % WIDTH;

  if (a === b) return false;
  if (rowA === rowB && Math.abs(colA - colB) === 1) return true;
  if (colA === colB && Math.abs(rowA - rowB) === 1) return true;
  return false;
};

const findMatches = (board) => {
  const matches = new Set();

  // Horizontales
  for (let row = 0; row < HEIGHT; row++) {
    let runStart = row * WIDTH;
    for (let col = 1; col <= WIDTH; col++) {
      const idx = row * WIDTH + col;
      const prev = board[idx - 1];
      const curr = board[idx];

      if (col < WIDTH && curr === prev && curr !== null) continue;

      const runLength = idx - runStart;
      if (runLength >= 3 && prev !== null) {
        for (let k = 0; k < runLength; k++) {
          matches.add(runStart + k);
        }
      }
      runStart = idx;
    }
  }

  // Verticales
  for (let col = 0; col < WIDTH; col++) {
    let runStart = col;
    for (let row = 1; row <= HEIGHT; row++) {
      const idx = row * WIDTH + col;
      const prev = board[idx - WIDTH];
      const curr = board[idx];

      if (row < HEIGHT && curr === prev && curr !== null) continue;

      const runLength = (idx - runStart) / WIDTH;
      if (runLength >= 3 && prev !== null) {
        for (let k = 0; k < runLength; k++) {
          matches.add(runStart + k * WIDTH);
        }
      }
      runStart = idx;
    }
  }

  return matches;
};

export default function CandyLove({ onBack, onCompleted }) {
  const [board, setBoard] = useState(createBoard);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showRomantic, setShowRomantic] = useState(false);
  const [reported, setReported] = useState(false);

  const applyGravityAndFill = (arr) => {
    for (let col = 0; col < WIDTH; col++) {
      const values = [];
      for (let row = HEIGHT - 1; row >= 0; row--) {
        const idx = row * WIDTH + col;
        if (arr[idx] !== null) values.push(arr[idx]);
      }

      for (let row = 0; row < HEIGHT; row++) {
        const idx = row * WIDTH + col;
        if (row < HEIGHT - values.length) {
          arr[idx] = null;
        } else {
          arr[idx] = values[values.length - (HEIGHT - row)];
        }
      }

      // Rellenar huecos
      for (let row = 0; row < HEIGHT; row++) {
        const idx = row * WIDTH + col;
        if (arr[idx] === null) {
          arr[idx] = randomCandy();
        }
      }
    }
  };

  const resolveMatches = (arr) => {
    let totalCleared = 0;

    while (true) {
      const matches = findMatches(arr);
      if (matches.size === 0) break;

      totalCleared += matches.size;
      matches.forEach((idx) => {
        arr[idx] = null;
      });

      applyGravityAndFill(arr);
    }

    if (totalCleared > 0) {
      setScore((prev) => {
        const newScore = prev + totalCleared * 10;
        if (newScore >= TARGET_SCORE && !showRomantic) {
          setShowRomantic(true);
          if (!reported && onCompleted) {
            onCompleted();
            setReported(true);
          }
        }
        return newScore;
      });
    }

    return totalCleared;
  };

  const handleSelect = (idx) => {
    if (selected === null) {
      setSelected(idx);
      return;
    }

    if (selected === idx) {
      setSelected(null);
      return;
    }

    if (!isAdjacent(selected, idx)) {
      setSelected(idx);
      return;
    }

    const newBoard = [...board];
    [newBoard[selected], newBoard[idx]] = [newBoard[idx], newBoard[selected]];

    const cloned = [...newBoard];
    const cleared = resolveMatches(cloned);

    if (cleared > 0) {
      setBoard(cloned);
    }

    setSelected(null);
  };

  const resetGame = () => {
    setBoard(createBoard());
    setScore(0);
    setShowRomantic(false);
  };

  return (
    <div className="game-screen">
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>
          ← Volver
        </button>
        <div className="counter">Puntos: {score}</div>
      </div>

      <div className="candy-stage">
        <p className="hint">
          Intercambia caramelos adyacentes para hacer líneas de 3 o más 💝
        </p>

        <div className="candy-grid">
          {board.map((value, idx) => (
            <button
              key={idx}
              className={`candy-cell ${
                selected === idx ? "selected" : ""
              }`}
              onClick={() => handleSelect(idx)}
            >
              {CANDIES[value]}
            </button>
          ))}
        </div>

        <p className="candy-score">
          Consigue al menos {TARGET_SCORE} puntos para desbloquear la sorpresa
          romántica ✨
        </p>

        <button className="btn-secondary" onClick={resetGame}>
          Reiniciar partida
        </button>
      </div>

      {showRomantic && (
        <div className="modal secret-modal">
          <div className="modal-card">
            <h3>¡Nivel de dulzura máximo! 🍬💗</h3>
            <p className="secret-text">
              Si jugar Candy Love contigo ya se siente bonito… imagina todo lo
              que quiero seguir viviendo a tu lado.
              <br />
              <br />
              Premio desbloqueado:
              <br />
              <strong>
                1 noche de juegos, abrazos y lo que tú quieras pedirme.
              </strong>
            </p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowRomantic(false)}>
                Guardar recompensa 💌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
