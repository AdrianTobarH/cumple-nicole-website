// App.jsx
import React, { useState } from "react";
import NicoleBirthdayPage from "./NicoleBirthdayPage";
import GamesMenu from "./GamesMenu";

export default function App() {
  const [showGames, setShowGames] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Botón flotante para abrir juegos */}
      <button
        onClick={() => setShowGames(true)}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 1500,
          background: "linear-gradient(90deg,#ff6fb7,#ff82c1)",
          color: "white",
          border: "none",
          padding: "12px 16px",
          borderRadius: 14,
          boxShadow: "0 10px 30px rgba(255,80,150,0.18)",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        🎮 Juegos
      </button>

      <NicoleBirthdayPage />

      {/* Overlay de juegos */}
      {showGames && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1400,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "18px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 980,
            }}
          >
            {/* Botón X para cerrar */}
            <button
              onClick={() => setShowGames(false)}
              aria-label="Cerrar juegos"
              style={{
                position: "absolute",
                top: -14,
                right: -14,
                width: 32,
                height: 32,
                borderRadius: "999px",
                border: "none",
                background: "#ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                cursor: "pointer",
                fontSize: 18,
                color: "#ff5fa2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <GamesMenu />
          </div>
        </div>
      )}
    </div>
  );
}
