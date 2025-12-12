// CandyLove.jsx
import React, { useState } from "react";
import "./Games.css";

const ROWS = 6;
const COLS = 6;
const GOAL = 150;          // meta de puntos
const MAX_MOVES = 18;      // movimientos disponibles
const POINTS_PER_CANDY = 10;

const CANDIES = ["🍓", "🍋", "🍇", "🍒", "🍬"];

const randomCandy = () => CANDIES[Math.floor(Math.random() * CANDIES.length)];

const createBoard = () =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => randomCandy())
  );

const areAdjacent = (a, b) =>
  a &&
  b &&
  ((Math.abs(a.row - b.row) === 1 && a.col === b.col) ||
    (Math.abs(a.col - b.col) === 1 && a.row === b.row));

function findMatches(board) {
  const matches = new Set();

  // horizontales
  for (let r = 0; r < ROWS; r++) {
    let runStart = 0;
    for (let c = 1; c <= COLS; c++) {
      const current = board[r][c];
      const prev = board[r][c - 1];
      if (c < COLS && current === prev && current != null) continue;

      const runLength = c - runStart;
      if (prev != null && runLength >= 3) {
        for (let k = runStart; k < c; k++) {
          matches.add(`${r}-${k}`);
        }
      }
      runStart = c;
    }
  }

  // verticales
  for (let c = 0; c < COLS; c++) {
    let runStart = 0;
    for (let r = 1; r <= ROWS; r++) {
      const current = board[r]?.[c];
      const prev = board[r - 1]?.[c];
      if (r < ROWS && current === prev && current != null) continue;

      const runLength = r - runStart;
      if (prev != null && runLength >= 3) {
        for (let k = runStart; k < r; k++) {
          matches.add(`${k}-${c}`);
        }
      }
      runStart = r;
    }
  }

  return matches;
}

function applyGravity(board, matches) {
  const newBoard = board.map((row) => row.slice());

  // borra las casillas que coinciden
  matches.forEach((key) => {
    const [r, c] = key.split("-").map(Number);
    newBoard[r][c] = null;
  });

  // gravedad columna por columna
  for (let c = 0; c < COLS; c++) {
    const col = [];
    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r][c] != null) col.push(newBoard[r][c]);
    }
    for (let r = ROWS - 1; r >= 0; r--) {
      if (col.length > 0) {
        newBoard[r][c] = col.shift();
      } else {
        newBoard[r][c] = randomCandy();
      }
    }
  }

  return newBoard;
}

export default function CandyLove({ onBack, onComplete }) {
  const [board, setBoard] = useState(() => createBoard());
  const [selected, setSelected] = useState(null);
  const [clearing, setClearing] = useState(new Set());
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(MAX_MOVES);
  const [processing, setProcessing] = useState(false);
  const [showWin, setShowWin] = useState(false);

  const reachedGoal = score >= GOAL;

  const resetGame = () => {
    setBoard(createBoard());
    setSelected(null);
    setClearing(new Set());
    setScore(0);
    setMovesLeft(MAX_MOVES);
    setProcessing(false);
    setShowWin(false);
  };

  const performSwap = (a, b) => {
    const newBoard = board.map((row) => row.slice());
    const tmp = newBoard[a.row][a.col];
    newBoard[a.row][a.col] = newBoard[b.row][b.col];
    newBoard[b.row][b.col] = tmp;
    return newBoard;
  };

  const handleCellClick = (row, col) => {
    if (processing || showWin) return;

    const current = { row, col };

    if (!selected) {
      setSelected(current);
      return;
    }

    if (selected.row === row && selected.col === col) {
      setSelected(null);
      return;
    }

    if (!areAdjacent(selected, current)) {
      // si no es adyacente, selecciona esta nueva
      setSelected(current);
      return;
    }

    // intento de swap válido
    const swapped = performSwap(selected, current);
    const matches = findMatches(swapped);

    if (matches.size === 0) {
      // sin match: no se acepta la jugada
      setSelected(null);
      return;
    }

    setProcessing(true);
    setBoard(swapped);
    setMovesLeft((m) => Math.max(0, m - 1));
    setSelected(null);

    // animación de "pop" antes de borrar realmente
    setClearing(matches);

    setTimeout(() => {
      const afterGravity = applyGravity(swapped, matches);
      setBoard(afterGravity);
      setClearing(new Set());

      setScore((prev) => {
        const pointsGained = matches.size * POINTS_PER_CANDY;
        const nextScore = prev + pointsGained;

        if (nextScore >= GOAL && !showWin) {
          setShowWin(true);
          if (onComplete) onComplete();
        }

        return nextScore;
      });

      setProcessing(false);
    }, 260);
  };

  return (
    <div className="game-screen candy-love-screen">
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>
          ← Volver
        </button>
        <div className="candy-stats">
          <span>
            Puntos: <strong>{score}</strong>
          </span>
          <span>
            Meta: <strong>{GOAL}</strong>
          </span>
          <span>
            Movimientos: <strong>{movesLeft}</strong>
          </span>
        </div>
      </div>

      <div className="candy-love-wrap">
        <div className={`candy-panel ${reachedGoal ? "goal-hit" : ""}`}>
          <p className="candy-instr">
            Intercambia caramelos <strong>adyacentes</strong> para hacer líneas
            de 3 o más <span>🥰</span>
          </p>

          <div className="candy-grid">
            {board.map((row, r) =>
              row.map((candy, c) => {
                const key = `${r}-${c}`;
                const isSelected =
                  selected && selected.row === r && selected.col === c;
                const isPopping = clearing.has(key);

                return (
                  <button
                    key={key}
                    className={`candy-cell ${
                      isSelected ? "selected" : ""
                    } ${isPopping ? "pop" : ""}`}
                    onClick={() => handleCellClick(r, c)}
                    disabled={processing}
                  >
                    <span className="candy-emoji">{candy}</span>
                  </button>
                );
              })
            )}
          </div>

          <p className="candy-goal">
            Consigue al menos{" "}
            <strong>
              {GOAL} puntos{" "}
              {reachedGoal && <span className="goal-badge">¡Logrado! ✨</span>}
            </strong>{" "}
            para desbloquear la sorpresa romántica 💖
          </p>

          <div className="candy-actions">
            <button className="btn-secondary" onClick={resetGame}>
              Reiniciar partida
            </button>
          </div>
        </div>
      </div>

      {showWin && (
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
              <button
                className="btn-primary"
                onClick={() => setShowWin(false)}
              >
                Guardar recompensa 💌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
