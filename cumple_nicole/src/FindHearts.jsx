// src/FindHearts.jsx
import React, { useEffect, useState } from "react";
import "./Games.css";

const TOTAL = 7;

const MESSAGES = [
  "Tu sonrisa ilumina incluso mis días más difíciles.",
  "Eres el tipo de mujer que inspira, calma y enamora.",
  "Cada detalle tuyo tiene algo que me encanta.",
  "Tu forma de ser hace que todo valga la pena.",
  "Eres magia pura en este mundo acelerado.",
  "Gracias por existir así, tan tú.",
  "Mi corazón te eligió sin dudar.",
];

export default function FindHearts({ onBack }) {
  const [hearts, setHearts] = useState([]);
  const [found, setFound] = useState(Array(TOTAL).fill(false));
  const [foundCount, setFoundCount] = useState(0);
  const [lastMsg, setLastMsg] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: TOTAL }).map(() => ({
      left: 10 + Math.random() * 80,
      top: 18 + Math.random() * 60,
    }));
    setHearts(arr);
  }, []);

  const handleClickHeart = (idx) => {
    if (found[idx]) return;

    const updated = [...found];
    updated[idx] = true;
    setFound(updated);

    const newCount = foundCount + 1;
    setFoundCount(newCount);
    setLastMsg(MESSAGES[idx] || "Eres maravillosa.");

    const pos = hearts[idx];
    const id = `${idx}-${Date.now()}`;
    setSparkles((prev) => [...prev, { id, left: pos.left, top: pos.top }]);
    setTimeout(
      () => setSparkles((prev) => prev.filter((s) => s.id !== id)),
      850
    );

    if (newCount >= TOTAL) {
      setTimeout(() => setShowSecret(true), 650);
    }
  };

  const progress = (foundCount / TOTAL) * 100;

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
          <h2 className="game-title">Encuentra los Corazones</h2>
          <p className="game-sub">
            Hay <strong>{TOTAL}</strong> corazones escondidos. Cada uno guarda
            un mensaje solo para ti 💗
          </p>
        </div>

        <div className="find-stage">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="hint">
            Haz clic por la pantalla para descubrirlos. Algunos se esconden muy
            bien ✨
          </p>

          <div className="field-area">
            {hearts.map((pos, i) => (
              <button
                key={i}
                className={`heart-egg ${found[i] ? "found" : ""}`}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                onClick={() => handleClickHeart(i)}
              >
                {found[i] ? "💖" : "🤍"}
              </button>
            ))}

            {sparkles.map((s) => (
              <span
                key={s.id}
                className="heart-spark"
                style={{ left: `${s.left}%`, top: `${s.top}%` }}
              />
            ))}
          </div>

          <div className="found-msg">
            {lastMsg && <div className="msg-bubble">{lastMsg}</div>}
          </div>
        </div>

        {showSecret && (
          <div className="modal secret-modal">
            <div className="modal-card">
              <h3>💌 Carta secreta</h3>
              <div className="secret-text">
                Nicole… hoy celebramos la vida de una mujer extraordinaria. Una
                mujer que no solo ilumina su propio camino, sino también el de
                quienes tenemos la fortuna de cruzarnos con ella.
                <br />
                <br />
                Quiero que este cumpleaños sea un recordatorio de lo valiosa que
                eres, de la fuerza tierna que llevas dentro y de la forma en la
                que haces más bonito todo lo que tocas.
                <br />
                <br />
                Gracias por dejarme estar cerca de tu mundo, de tus risas, de
                tus silencios y de tus sueños.
                <br />
                <br />
                Con todo mi cariño, <strong>Adrian Tobar</strong>
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowSecret(false)}
                  className="btn-primary"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
