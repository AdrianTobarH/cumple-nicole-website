// src/CandyLove.jsx
import React, { useEffect, useState } from "react";
import "./Games.css";

const ROWS = 6;
const COLS = 6;
const TARGET_SCORE = 1000;
const MAX_MOVES = 22;

const CANDIES = ["🍓", "🍇", "🍋", "🍒", "🍍", "🥝"];

const randomCandy = () => CANDIES[Math.floor(Math.random() * CANDIES.length)];

function makeBoard() {
  return Array.from({ length: ROWS * COLS }, () => randomCandy());
}

function areAdjacent(a, b) {
  const rowA = Math.floor(a / COLS);
  const colA = a % COLS;
  const rowB = Math.floor(b / COLS);
  const colB = b % COLS;

  const sameRow = rowA === rowB && Math.abs(colA - colB) === 1;
  const sameCol = colA === colB && Math.abs(rowA - rowB) === 1;
  return sameRow || sameCol;
}

function findMatches(board) {
  const indices = new Set();
  const groups = [];

  // Filas
  for (let r = 0; r < ROWS; r++) {
    let runStart = 0;
    for (let c = 1; c <= COLS; c++) {
      const idxPrev = r * COLS + (c - 1);
      const prevVal = board[idxPrev];
      const idx = r * COLS + c;
      const val = c < COLS ? board[idx] : null;

      if (c < COLS && val === prevVal) continue;

      const runLen = c - runStart;
      if (prevVal && runLen >= 3) {
        groups.push(runLen);
        for (let k = runStart; k < c; k++) indices.add(r * COLS + k);
      }
      runStart = c;
    }
  }

  // Columnas
  for (let c = 0; c < COLS; c++) {
    let runStart = 0;
    for (let r = 1; r <= ROWS; r++) {
      const idxPrev = (r - 1) * COLS + c;
      const prevVal = board[idxPrev];
      const idx = r * COLS + c;
      const val = r < ROWS ? board[idx] : null;

      if (r < ROWS && val === prevVal) continue;

      const runLen = r - runStart;
      if (prevVal && runLen >= 3) {
        groups.push(runLen);
        for (let k = runStart; k < r; k++) indices.add(k * COLS + c);
      }
      runStart = r;
    }
  }

  return { indices, groups };
}

function computeScore(groups) {
  let total = 0;
  let best = 0;

  for (const len of groups) {
    if (len === 3) total += 40; // básico
    else if (len === 4) total += 80;
    else if (len === 5) total += 140;
    else total += 140 + (len - 5) * 30;
    if (len > best) best = len;
  }

  let bonusLabel = "";
  if (best >= 5) bonusLabel = "💞 Súper combo (+bonus)";
  else if (best === 4) bonusLabel = "💕 Combo dulce";

  return { total, bonusLabel };
}

// Soniditos simples con Web Audio (sin archivos externos)
function playTone(kind = "ok") {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.value = kind === "ok" ? 920 : 240;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  osc.start(now);
  osc.stop(now + 0.25);
}

export default function CandyLove({ onBack }) {
  const [board, setBoard] = useState(makeBoard);
  const [selected, setSelected] = useState(null);
  const [shakePair, setShakePair] = useState(null);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(MAX_MOVES);
  const [bonusText, setBonusText] = useState("");
  const [endMessage, setEndMessage] = useState(null);

  useEffect(() => {
    if (score >= TARGET_SCORE && !endMessage) {
      setEndMessage({
        title: "¡Nivel de dulzura máximo! 🍬💗",
        body:
          "Si jugar Candy Love contigo ya se siente bonito… imagina todo lo que quiero seguir viviendo a tu lado.",
        reward:
          "1 noche de juegos, abrazos y lo que tú quieras pedirme.",
      });
    } else if (movesLeft === 0 && score < TARGET_SCORE && !endMessage) {
      setEndMessage({
        title: "Se acabaron los movimientos 💫",
        body:
          "No pasa nada, podemos seguir jugando todas las veces que quieras. Lo importante es jugar juntos.",
        reward: "Revancha romántica cuando tú digas 💕",
      });
    }
  }, [score, movesLeft, endMessage]);

  const hardReset = () => {
    setBoard(makeBoard());
    setSelected(null);
    setShakePair(null);
    setMatched([]);
    setScore(0);
    setMovesLeft(MAX_MOVES);
    setBonusText("");
    setEndMessage(null);
  };

  const applyGravityAndFill = (startBoard) => {
    const b = [...startBoard];

    for (let c = 0; c < COLS; c++) {
      let writeRow = ROWS - 1;

      for (let r = ROWS - 1; r >= 0; r--) {
        const idx = r * COLS + c;
        if (b[idx] != null) {
          const destIdx = writeRow * COLS + c;
          b[destIdx] = b[idx];
          if (destIdx !== idx) b[idx] = null;
          writeRow--;
        }
      }

      for (let r = writeRow; r >= 0; r--) {
        b[r * COLS + c] = randomCandy();
      }
    }

    return b;
  };

  const resolveBoard = (startBoard) => {
    let working = [...startBoard];
    let totalGain = 0;
    let bestBonus = "";

    while (true) {
      const { indices, groups } = findMatches(working);
      if (indices.size === 0) break;

      const { total, bonusLabel } = computeScore(groups);
      totalGain += total;
      if (bonusLabel) bestBonus = bonusLabel;

      indices.forEach((i) => {
        working[i] = null;
      });

      working = applyGravityAndFill(working);
    }

    return { board: working, gain: totalGain, bestBonus };
  };

  const handleTileClick = (idx) => {
    if (endMessage) return;

    if (selected === null) {
      setSelected(idx);
      return;
    }

    if (selected === idx) {
      setSelected(null);
      return;
    }

    if (!areAdjacent(selected, idx)) {
      // Click en ficha no adyacente
      setShakePair({ a: selected, b: idx });
      playTone("error");
      setTimeout(() => setShakePair(null), 250);
      setSelected(idx);
      return;
    }

    const swapped = [...board];
    [swapped[selected], swapped[idx]] = [swapped[idx], swapped[selected]];

    const firstMatches = findMatches(swapped);
    if (firstMatches.indices.size === 0) {
      // Swap sin match -> animación de error y revertimos
      setShakePair({ a: selected, b: idx });
      playTone("error");
      setTimeout(() => setShakePair(null), 260);
      setSelected(null);
      return;
    }

    // Swap válido
    setBoard(swapped);
    setSelected(null);
    setMovesLeft((m) => m - 1);
    setMatched(Array.from(firstMatches.indices));
    playTone("ok");

    setTimeout(() => {
      const { board: finalBoard, gain, bestBonus } = resolveBoard(swapped);
      setBoard(finalBoard);
      setMatched([]);
      setScore((s) => s + gain);
      setBonusText(bestBonus || "");
    }, 230);
  };

  const scoreClass =
    score >= TARGET_SCORE
      ? "candy-score-value candy-score-value--goal"
      : score >= TARGET_SCORE * 0.6
      ? "candy-score-value candy-score-value--ok"
      : "candy-score-value";

  const movesClass =
    movesLeft <= 4 ? "candy-moves-value candy-moves-value--low" : "candy-moves-value";

  return (
    <div className="game-modal">
      <div className="game-card candy-card">
        <button
          className="close-circle-btn"
          onClick={onBack}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="game-header">
          <span className="game-tag">Juego</span>
          <h2 className="game-title">Candy Love</h2>
          <p className="game-sub">
            Intercambia caramelos <strong>adyacentes</strong> para hacer líneas
            de 3 o más 💞
          </p>
        </div>

        <div className="candy-top-bar">
          <div className="candy-meta-group">
            <span className="candy-label">Puntos</span>
            <span className={scoreClass}>{score}</span>
          </div>
          <div className="candy-meta-group">
            <span className="candy-label">Meta</span>
            <span className="candy-target">{TARGET_SCORE}</span>
          </div>
          <div className="candy-meta-group">
            <span className="candy-label">Movimientos</span>
            <span className={movesClass}>{movesLeft}</span>
          </div>
        </div>

        <div className="candy-grid-wrap">
          <div className="candy-grid">
            {board.map((cell, idx) => {
              const isSelected = selected === idx;
              const isMatched = matched.includes(idx);
              const isShaking =
                shakePair && (shakePair.a === idx || shakePair.b === idx);

              let tileClass = "candy-tile";
              if (isSelected) tileClass += " candy-tile--selected";
              if (isMatched) tileClass += " candy-tile--matched";
              if (isShaking) tileClass += " candy-tile--wrong";

              return (
                <button
                  key={idx}
                  className={tileClass}
                  onClick={() => handleTileClick(idx)}
                >
                  <span className="candy-emoji">{cell}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="candy-footer">
          <p className="candy-helper">
            Consigue al menos{" "}
            <strong>{TARGET_SCORE} puntos</strong> para desbloquear la sorpresa
            romántica 💘
          </p>
          {bonusText && <div className="candy-badge">{bonusText}</div>}
          <button className="btn-secondary" onClick={hardReset}>
            Reiniciar partida
          </button>
        </div>

        {endMessage && (
          <div className="modal secret-modal">
            <div className="modal-card">
              <h3>{endMessage.title}</h3>
              <p className="secret-text">{endMessage.body}</p>
              <p className="secret-text">
                <strong>Premio desbloqueado:</strong> {endMessage.reward}
              </p>
              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setEndMessage(null)}
                >
                  Seguir jugando
                </button>
                <button className="btn-primary" onClick={hardReset}>
                  Empezar de nuevo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
