// NicoleBirthdayPage.jsx
import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./NicoleBirthday.css";

import foto1 from "./IMG-20220513-WA0052.jpg";
import foto2 from "./IMG-20250706-WA0013.jpg";
import foto3 from "./IMG-20250808-WA0036.jpg";
import foto4 from "./IMG-20251009-WA0061.jpg";
import foto5 from "./IMG-20251019-WA0024.jpg";

import audioFile from "./mensaje-cumple-nicole.mp3";

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
  const [typedText, setTypedText] = useState("");
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const images = [foto1, foto2, foto3, foto4, foto5];
  const audioRef = useRef(null);

  // Configurar audio
  useEffect(() => {
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // ignorar error de autoplay
      }
    }
  };

  // Confetti unos segundos
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(t);
  }, []);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Máquina de escribir
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(LETTER_TEXT.slice(0, index));
      if (index >= LETTER_TEXT.length) {
        clearInterval(interval);
        setFinishedTyping(true);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Corazones sorpresa
  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 5000);
  };

  return (
    <div className="birthday-root">
      {showConfetti && <Confetti recycle={false} />}

      <header className="top-strip">
        <div className="top-badge">Edición Premium · Para Nicole</div>
        <button className="music-toggle" onClick={toggleMusic}>
          {isPlaying ? "⏸ Música" : "▶ Música"}
        </button>
      </header>

      <main className="birthday-container">
        <h1 className="titulo-latido">💗 Feliz Cumpleaños, Nicole 💗</h1>

        {/* Carrusel Polaroid */}
        <div className="carousel-container">
          <div className="polaroid-frame">
            <img
              src={images[currentIndex]}
              alt="Nicole y Adrian"
              className="carousel-img"
            />
            <span className="polaroid-note">Nicole ✧</span>
          </div>
        </div>

        {/* Carta con typewriter */}
        <section className="carta-container">
          <div className="carta-texto typewriter">
            <span>{typedText}</span>
            {!finishedTyping && <span className="type-cursor">|</span>}
          </div>
        </section>

        {/* Paneles de lista */}
        <section className="mini-panels">
          <div className="mini-panel">
            <h3>3 cosas que amo de ti</h3>
            <ul>
              <li>Cómo miras el mundo con sensibilidad.</li>
              <li>Tu forma de cuidar a las personas que quieres.</li>
              <li>La paz que siento cuando estoy contigo.</li>
            </ul>
          </div>

          <div className="mini-panel">
            <h3>Deseos para este año ✨</h3>
            <ul>
              <li>Que te sientas más segura de ti que nunca.</li>
              <li>Que tengas tiempo para todo lo que te hace bien.</li>
              <li>Que nunca te falten abrazos sinceros.</li>
            </ul>
          </div>
        </section>

        {/* Botón sorpresa */}
        <button className="boton-sorpresa" onClick={triggerHearts}>
          ✨ Toque sorpresa ✨
        </button>

        <p className="bottom-note">
          Juega los mini-juegos para desbloquear todas las sorpresas 💖
        </p>

        {/* Corazones flotando */}
        {showHearts &&
          [...Array(18)].map((_, i) => (
            <span
              key={i}
              className="heart"
              style={{
                left: Math.random() * 90 + "%",
                animationDuration: 3.5 + Math.random() * 3 + "s",
              }}
            >
              💖
            </span>
          ))}
      </main>
    </div>
  );
}

export default NicoleBirthdayPage;
