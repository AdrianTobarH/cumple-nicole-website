// src/NicoleBirthdayPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./NicoleBirthday.css";

import foto1 from "./IMG-20220513-WA0052.jpg";
import foto2 from "./IMG-20250706-WA0013.jpg";
import foto3 from "./IMG-20250808-WA0036.jpg";
import foto4 from "./IMG-20251009-WA0061.jpg";
import foto5 from "./IMG-20251019-WA0024.jpg";

import audioFile from "./mensaje-cumple-nicole.mp3";

const LETTER_TEXT = `
Nicole… hoy celebramos la vida de una mujer extraordinaria.  
Una mujer que ilumina su propio camino y también el de quienes tenemos la fortuna de encontrarnos con ella.
Hoy el mundo se vuelve un poco más suave, un poco más hermoso, porque en un día como este llegaste tú.

Quiero que este cumpleaños sea más que una fecha… sea un recordatorio.
Un recordatorio de lo valiosa que eres, de tu fuerza suave, de esa mezcla tan tuya de ternura y valentía.

Que este nuevo año te encuentre rodeada de amor sincero, de paz,
de libros que te hagan sentir, metas que te enciendan el alma
y de personas que te quieran bonito y de verdad.

Yo… yo solo quiero acompañarte.
Cuidarte con la calma con la que se cuidan las cosas importantes.
Ser motivo de tus sonrisas y abrazo para tus cansancios.

Ojalá la vida te regale todo lo que sueñas —
y ojalá me permita seguir celebrando contigo cada uno de tus cumpleaños.

Feliz cumpleaños, mi amor.
Que este 26 sea un capítulo lleno de magia, luz y momentos que se queden para siempre.
`.trim();

function useTypewriter(text, speed = 26) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");
    let i = 0;
    const id = setInterval(() => {
      setOutput((prev) => prev + text.charAt(i));
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return output;
}

const SURPRISE_LINES = [
  "Vale por una noche de juegos, abrazos y lo que tú quieras pedirme.",
  "Vale por una cita planeada solo para ti (tú eliges el plan).",
  "Vale por un día completo dedicado a hacerte sonreír.",
];

function NicoleBirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);

  const audioRef = useRef(new Audio(audioFile));
  const images = useMemo(() => [foto1, foto2, foto3, foto4, foto5], []);
  const typedLetter = useTypewriter(LETTER_TEXT, 24);
  const surpriseText = useMemo(
    () => SURPRISE_LINES[Math.floor(Math.random() * SURPRISE_LINES.length)],
    []
  );

  // Confeti solo al inicio
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Música
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;

    const handleFirstClick = () => {
      if (isMusicOn) {
        audio
          .play()
          .catch(() => {
            /* ignore */
          });
      }
      document.removeEventListener("click", handleFirstClick);
    };

    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, [isMusicOn]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsMusicOn(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsMusicOn(false);
    }
  };

  // Carrusel
  useEffect(() => {
    const id = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      3500
    );
    return () => clearInterval(id);
  }, [images.length]);

  // Hearts para la sorpresa
  const surpriseHearts = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="birthday-container">
      {showConfetti && <Confetti />}

      <div className="top-ribbon">
        <span className="chip-premium">Edición Premium · Para Nicole</span>
        <button className="chip-music" onClick={toggleMusic}>
          {isMusicOn ? "⏸ Música" : "▶ Música"}
        </button>
      </div>

      <h1 className="titulo-latido">💗 Feliz Cumpleaños, Nicole 💗</h1>

      <div className="hero-layout">
        <div className="carousel-container">
          <div className="polaroid-frame">
            <img
              src={images[currentIndex]}
              alt="Nicole"
              className="carousel-img"
            />
            <span className="polaroid-note">Nicole ✧</span>
          </div>
        </div>
      </div>

      <div className="carta-container">
        <p className="carta-texto">
          {typedLetter.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
          <br />
          <br />
          <strong>Adrian Tobar</strong>
        </p>
      </div>

      <section className="paneles-extra">
        <div className="panel-card">
          <h3>3 cosas que amo de ti</h3>
          <ul>
            <li>Cómo miras el mundo con sensibilidad.</li>
            <li>Tu forma de cuidar a las personas que quieres.</li>
            <li>La paz que siento cuando estoy contigo.</li>
          </ul>
        </div>

        <div className="panel-card">
          <h3>Deseos para este año ✨</h3>
          <ul>
            <li>Que te sientas más segura de ti que nunca.</li>
            <li>Que tengas tiempo para todo lo que te hace bien.</li>
            <li>Que nunca te falten abrazos sinceros.</li>
          </ul>
        </div>
      </section>

      <button
        className="boton-sorpresa"
        type="button"
        onClick={() => setShowSurprise(true)}
      >
        ✨ Toque sorpresa ✨
      </button>

      <p className="mini-helper">
        Juega los mini-juegos para desbloquear todas las sorpresas 💖
      </p>

      {showSurprise && (
        <div
          className="surprise-overlay"
          onClick={() => setShowSurprise(false)}
        >
          <div
            className="surprise-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>💌 Sorpresa para ti</h3>
            <p>
              Verte sonreír es mi juego favorito. Gracias por dejarme
              acompañarte en este capítulo de tu vida.
            </p>
            <p className="surprise-reward">
              <strong>Recompensa secreta:</strong> {surpriseText}
            </p>
            <button
              className="btn-primary"
              type="button"
              onClick={() => setShowSurprise(false)}
            >
              Guardar en mi corazón 💗
            </button>
          </div>

          {surpriseHearts.map((h) => (
            <span
              key={h.id}
              className="surprise-heart"
              style={{
                left: `${h.left}%`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default NicoleBirthdayPage;
