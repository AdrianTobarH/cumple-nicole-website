// App.jsx
import React, { useState } from "react";
import NicoleBirthdayPage from "./NicoleBirthdayPage"; // o tu nombre actual
import GamesMenu from "./GamesMenu";
import "./NicoleBirthday.css";

export default function App() {
  const [showGames, setShowGames] = useState(false);

  const [completed, setCompleted] = useState({
    hearts: false,
    puzzle: false,
    ruleta: false,
  });

  const [showFinalModal, setShowFinalModal] = useState(false);

  const handleCompleteGame = (key) => {
    setCompleted((prev) => {
      if (prev[key]) return prev; // ya se marcó
      const updated = { ...prev, [key]: true };
      const allDone = updated.hearts && updated.puzzle && updated.ruleta;
      if (allDone) {
        setShowFinalModal(true);
      }
      return updated;
    });
  };

  const allDone = completed.hearts && completed.puzzle && completed.ruleta;

  return (
    <div className="app-premium-bg">
      <div className="app-premium-frame">
        <div className="app-premium-header">
          <span className="badge-premium">Edición Premium · Para Nicole</span>
          {allDone && <span className="badge-complete">🎁 Juegos completados</span>}
        </div>

        <NicoleBirthdayPage />

        <div className="app-premium-footer">
          <p className="footer-mini">
            Juega los mini-juegos para desbloquear todas las sorpresas 💖
          </p>
        </div>
      </div>

      {/* Botón flotante para abrir el menú de juegos */}
      <button
        onClick={() => setShowGames((s) => !s)}
        className="floating-games-btn"
      >
        🎮 Juegos
      </button>

      {showGames && (
        <div className="games-overlay">
          <div className="games-overlay-inner">
            <GamesMenu
              completed={completed}
              onCompleteGame={handleCompleteGame}
            />
          </div>
        </div>
      )}

      {showFinalModal && (
        <div className="modal secret-modal">
          <div className="modal-card">
            <h3>🎁 Sorpresa final</h3>
            <p className="secret-text">
              Completaste todos los juegos, encontraste todas las pistas…  
              y solo puedo decirte algo: te mereces todo lo bonito del mundo.
              <br />
              <br />
              Prometo seguir inventando formas creativas de hacerte sentir querida,
              escuchada y acompañada. Este regalo solo es el comienzo de muchas
              celebraciones juntos.
              <br />
              <br />
              Con todo mi cariño, <strong>Adrian</strong>.
            </p>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => setShowFinalModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
