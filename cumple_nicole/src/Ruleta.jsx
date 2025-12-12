// src/Ruleta.jsx
import React, { useRef, useState } from "react";
import "./Games.css";

const PRIZES = [
  "Un beso sorpresa 💋",
  "Una cena romántica 🍽️",
  "Una noche de película juntos 🎬",
  "Un masaje relajante 💆‍♀️",
  "Un regalo especial 🎁",
  "Un deseo que tú pidas ✨",
];

export default function Ruleta({ onBack }) {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const sliceAngle = 360 / PRIZES.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const spinTurns = 3 + Math.random() * 3;
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const targetAngle = 360 - prizeIndex * sliceAngle - sliceAngle / 2;
    const degrees = spinTurns * 360 + targetAngle;

    if (wheelRef.current) {
      wheelRef.current.classList.remove("wheel--reset");
      wheelRef.current.style.transition =
        "transform 4.4s cubic-bezier(.18,.9,.15,1)";
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      setResult(PRIZES[prizeIndex]);
      setSpinning(false);
    }, 4500);
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.classList.add("wheel--reset");
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
    setResult(null);
  };

  return (
    <div className="game-modal">
      <div className="game-card">
        <button
          className="close-circle-btn"
          onClick={onBack}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="game-header">
          <span className="game-tag">Juego</span>
          <h2 className="game-title">Ruleta del Amor</h2>
          <p className="game-sub">
            Gira la ruleta y deja que el destino elija un premio romántico 💖
          </p>
        </div>

        <div className="ruleta-stage">
          <div className="wheel-wrap">
            <div className="pointer" aria-hidden="true" />
            <div className="wheel" ref={wheelRef}>
              {PRIZES.map((text, i) => {
                const rotation = i * sliceAngle;
                return (
                  <div
                    key={i}
                    className="slice"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <span
                      className="slice-label"
                      style={{
                        transform: `translate(-50%, -145%) rotate(${-rotation}deg)`,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ruleta-actions">
            <button
              className="btn-primary"
              onClick={spin}
              disabled={spinning}
            >
              {spinning ? "Girando..." : "Girar la ruleta"}
            </button>
            <button
              className="btn-secondary"
              onClick={resetWheel}
              disabled={spinning}
            >
              Reset
            </button>
          </div>

          {result && (
            <div className="ruleta-result">
              <p className="ruleta-result-label">Premio conseguido:</p>
              <p className="ruleta-result-text">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
