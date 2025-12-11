// NicoleBirthdayPage.jsx
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

import "./NicoleBirthday.css";

// Carrusel de imágenes
import foto1 from "./IMG-20220513-WA0052.jpg";
import foto2 from "./IMG-20250706-WA0013.jpg";
import foto3 from "./IMG-20250808-WA0036.jpg";
import foto4 from "./IMG-20251009-WA0061.jpg";
import foto5 from "./IMG-20251019-WA0024.jpg";

// Audio
import audioFile from "./mensaje-cumple-nicole.mp3";

// Texto de la carta (para el efecto máquina de escribir)
const LETTER_TEXT = `Nicole… hoy celebramos la vida de una mujer extraordinaria.
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

Con todo mi cariño,
Adrian Tobar`;

function NicoleBirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [audio] = useState(() => new Audio(audioFile));
  const [isPlaying, setIsPlaying] = useState(false);

  // máquina de escribir
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  const images = [foto1, foto2, foto3, foto4, foto5];

  // Música automática con permiso del usuario
  useEffect(() => {
    audio.volume = 0.5;
    audio.playbackRate = 1.0;
    audio.loop = true;

    const playAudioOnFirstClick = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      document.removeEventListener("click", playAudioOnFirstClick);
    };

    document.addEventListener("click", playAudioOnFirstClick);

    return () => {
      audio.pause();
      document.removeEventListener("click", playAudioOnFirstClick);
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Confetti se apaga solo
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 9000);
    return () => clearTimeout(t);
  }, []);

  // Corazones sorpresa
  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 5500);
  };

  // Efecto máquina de escribir para la carta
  useEffect(() => {
    let i = 0;
    const speed = 25; // ms por carácter

    const typeInterval = setInterval(() => {
      i += 1;
      setTypedText(LETTER_TEXT.slice(0, i));

      if (i >= LETTER_TEXT.length) {
        clearInterval(typeInterval);
        setIsTypingDone(true);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, []);

  // Permitir que ella salte la animación con un click
  const skipTyping = () => {
    if (!isTypingDone) {
      setTypedText(LETTER_TEXT);
      setIsTypingDone(true);
    }
  };

  return (
    <div className="birthday-container">
      {/* Botón música */}
      <button className="music-toggle" onClick={toggleMusic}>
        {isPlaying ? "🔊 Música" : "🔈 Música"}
      </button>

      {showConfetti && <Confetti />}

      {/* Título */}
      <h1 className="titulo-latido">💗 Feliz Cumpleaños, Nicole 💗</h1>

      {/* Carrusel Polaroid */}
      <div className="carousel-container">
        <div className="polaroid-frame">
          <img
            src={images[currentIndex]}
            alt="Foto"
            className="carousel-img"
          />
          <span className="polaroid-note">Nicole ✧</span>
        </div>
      </div>

      {/* Carta con efecto máquina de escribir */}
      <div className="carta-container" onClick={skipTyping}>
        <p className="carta-texto">
          {typedText.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        {!isTypingDone && (
          <p className="carta-hint">
            (Toca la carta si quieres que aparezca completa más rápido ✨)
          </p>
        )}
      </div>

      {/* Tarjetitas románticas extra */}
      <div className="premium-row-cards">
        <div className="mini-love-card">
          <span className="mini-love-title">3 cosas que amo de ti</span>
          <ul>
            <li>Cómo miras el mundo con sensibilidad.</li>
            <li>Tu forma de cuidar a las personas que quieres.</li>
            <li>La paz que siento cuando estoy contigo.</li>
          </ul>
        </div>

        <div className="mini-love-card">
          <span className="mini-love-title">Deseos para este año</span>
          <ul>
            <li>Que te sientas más segura de ti que nunca.</li>
            <li>Que tengas tiempo para todo lo que te hace bien.</li>
            <li>Que nunca te falten abrazos sinceros.</li>
          </ul>
        </div>
      </div>

      {/* Botón sorpresa */}
      <button className="boton-sorpresa" onClick={triggerHearts}>
        ✨ Toque sorpresa ✨
      </button>

      {/* Corazones flotando */}
      {showHearts &&
        [...Array(18)].map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: Math.random() * 90 + "%", // posición horizontal aleatoria
              animationDuration: 3.5 + Math.random() * 3 + "s",
            }}
          >
            💖
          </span>
        ))}
    </div>
  );
}

export default NicoleBirthdayPage;
