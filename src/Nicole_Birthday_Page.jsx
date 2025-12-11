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

function NicoleBirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [audio] = useState(new Audio(audioFile));

  const images = [foto1, foto2, foto3, foto4, foto5];

  // Música automática con permiso del usuario
  useEffect(() => {
    audio.volume = 0.50;
    audio.playbackRate = 1.0;
    audio.loop = true;

    const playAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", playAudio);
    };

    document.addEventListener("click", playAudio);
  }, [audio]);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Corazones sorpresa
  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 5500);
  };

  return (
    <div className="birthday-container">
      {showConfetti && <Confetti />}

      {/* Título */}
      <h1 className="titulo-latido">💗 Feliz Cumpleaños, Nicole 💗</h1>

      {/* Carrusel Polaroid */}
      <div className="carousel-container">
        <div className="polaroid-frame">
          <img src={images[currentIndex]} alt="Foto" className="carousel-img" />
          <span className="polaroid-note">Nicole ✧</span>
        </div>
      </div>

      {/* Carta */}
      <div className="carta-container">
        <p className="carta-texto">
          Nicole… hoy celebramos la vida de una mujer extraordinaria.  
          Una mujer que ilumina su propio camino y también el de quienes tenemos la fortuna de encontrarnos con ella.
          Hoy el mundo se vuelve un poco más suave, un poco más hermoso, porque en un día como este llegaste tú.
          <br /><br />

          Quiero que este cumpleaños sea más que una fecha… sea un recordatorio.
          Un recordatorio de lo valiosa que eres, de tu fuerza suave, de esa mezcla tan tuya de ternura y valentía.
          <br /><br />

          Que este nuevo año te encuentre rodeada de amor sincero, de paz,  
          de libros que te hagan sentir, metas que te enciendan el alma  
          y de personas que te quieran bonito y de verdad.
          <br /><br />

          Yo… yo solo quiero acompañarte.  
          Cuidarte con la calma con la que se cuidan las cosas importantes.  
          Ser motivo de tus sonrisas y abrazo para tus cansancios.
          <br /><br />

          Ojalá la vida te regale todo lo que sueñas —  
          y ojalá me permita seguir celebrando contigo cada uno de tus cumpleaños.
          <br /><br />

          Feliz cumpleaños, mi amor.  
          Que este 26 sea un capítulo lleno de magia, luz y momentos que se queden para siempre.
          <br /><br />

          Con todo mi cariño,  
          <strong>Adrian Tobar</strong>
        </p>
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
              left: Math.random() * 90 + "%",
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
