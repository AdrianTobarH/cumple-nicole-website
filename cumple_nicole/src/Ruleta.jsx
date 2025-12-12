// Ruleta.jsx
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

export default function Ruleta({ onBack, onCompleted }) {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [lastRotation, setLastRotation] = useState(0);
  const [reported, setReported] = useState(false);

  const spin = () => {
    if (spinning) return;

    const slice = 360 / PRIZES.length;
    const targetIndex = Math.floor(Math.random() * PRIZES.length);

    const extraTurns = 3 + Math.floor(Math.random() * 3); // 3–5 vueltas
    const targetAngle = targetIndex * slice + slice / 2;
    const finalRotation = lastRotation + extraTurns * 360 + targetAngle;

    setSpinning(true);
    setResult(null);

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 4s cubic-bezier(.18,.9,.2,1)";
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
    }

    setTimeout(() => {
      setLastRotation(finalRotation % 360);
      setResult(PRIZES[targetIndex]);
      setSpinning(false);

      if (!reported && onCompleted) {
        onCompleted();
        setReported(true);
      }
    }, 4100);
  };

  const resetWheel = () => {
    if (spinning) return;
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
    setLastRotation(0);
    setResult(null);
  };

  return (
    <div className="game-screen">
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>
          ← Volver
        </button>
        <div className="counter">Ruleta del Amor</div>
      </div>

      <div className="ruleta-stage">
        <div className="wheel-wrap">
          <div className="wheel" ref={wheelRef}>
            {PRIZES.map((p, i) => (
              <div
                key={i}
                className="slice"
                style={{ transform: `rotate(${i * (360 / PRIZES.length)}deg)` }}
              >
                <span className="slice-label">{p}</span>
              </div>
            ))}
          </div>

          <div className="pointer">▼</div>
        </div>

        <div className="ruleta-actions">
          <button className="btn-primary" onClick={spin} disabled={spinning}>
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
          <div className="modal secret-modal">
            <div className="modal-card">
              <h3>Felicidades 🎉</h3>
              <p className="secret-text">{result}</p>
              <div className="modal-actions">
                <button
                  className="btn-primary"
                  onClick={() => setResult(null)}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
