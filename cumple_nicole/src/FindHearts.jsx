// FindHearts.jsx
import React, { useEffect, useState } from "react";
import "./Games.css";

const MESSAGES = [
  "Tu sonrisa ilumina incluso mis días más difíciles.",
  "Eres el tipo de mujer que inspira, calma y enamora.",
  "Cada detalle tuyo tiene algo que me encanta.",
  "Tu forma de ser hace que todo valga la pena.",
  "Eres magia pura en este mundo acelerado.",
  "Gracias por existir así, tan tú.",
  "Mi corazón te eligió sin dudar.",
];

export default function FindHearts({ onBack, onComplete }) {
  const TOTAL = 7;
  const [hearts, setHearts] = useState([]);
  const [found, setFound] = useState(Array(TOTAL).fill(false));
  const [foundCount, setFoundCount] = useState(0);
  const [lastMsg, setLastMsg] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [reportedDone, setReportedDone] = useState(false);

  useEffect(() => {
    const arr = Array.from({ length: TOTAL }).map(() => ({
      left: 6 + Math.random() * 88,
      top: 18 + Math.random() * 70,
    }));
    setHearts(arr);
  }, []);

  const handleClickHeart = (idx) => {
    if (found[idx]) return;
    const newFound = found.slice();
    newFound[idx] = true;
    setFound(newFound);
    const newCount = foundCount + 1;
    setFoundCount(newCount);
    setLastMsg(MESSAGES[idx] || "Eres maravillosa.");

    if (newCount >= TOTAL) {
      if (!reportedDone && onComplete) {
        onComplete();
        setReportedDone(true);
      }
      setTimeout(() => setShowSecret(true), 800);
    }
  };

  return (
    <div className="game-screen">
      <div className="game-topbar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="counter">Corazones encontrados: {foundCount}/{TOTAL} ❤️</div>
      </div>

      <div className="find-stage">
        <p className="hint">Busca y toca los corazones escondidos ❤</p>

        <div className="field-area">
          {hearts.map((pos, i) => (
            <button
              key={i}
              className={`heart-egg ${found[i] ? "found" : ""}`}
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              onClick={() => handleClickHeart(i)}
              aria-hidden={found[i]}
            >
              {found[i] ? "💗" : "♡"}
            </button>
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
              {/* Tu texto original aquí, lo dejé igual */}
              Nicole… hoy celebramos la vida de una mujer extraordinaria. Una mujer que no solo ilumina su propio camino, sino también el de quienes tenemos la fortuna de cruzarnos con ella. Hoy el mundo se vuelve un poco más suave, un poco más bello, porque en un día como este llegaste tú.
              <br/><br/>
              Quiero que este cumpleaños sea más que una fecha… quiero que sea un recordatorio. Un recordatorio de lo valiosa que eres, de la fuerza tierna que llevas dentro, de la forma en la que miras la vida con esa mezcla tan tuya de dulzura, sensibilidad y coraje.
              <br/><br/>
              Que este nuevo año te encuentre rodeada de amor del bueno, de esa paz que llega en los momentos silenciosos y de esa alegría suave que se queda incluso cuando nadie la ve. Que tengas libros que te hagan sentir, canciones que te abracen, metas que te enciendan el alma y personas que te quieran de verdad.
              <br/><br/>
              Con todo mi cariño, <strong>Adrian Tobar</strong>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowSecret(false)} className="btn-primary">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
