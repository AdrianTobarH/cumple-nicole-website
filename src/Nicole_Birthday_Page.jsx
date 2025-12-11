import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

// Importación de imágenes del carrusel
import photo1 from "./IMG-20220513-WA0052.jpg";
import photo2 from "./IMG-20250706-WA0013.jpg";
import photo3 from "./IMG-20250808-WA0036.jpg";
import photo4 from "./IMG-20251009-WA0061.jpg";
import photo5 from "./IMG-20251019-WA0024.jpg";

// Importación correcta del audio
import audioMensaje from "./mensaje-cumple-nicole.mp3.mp3";

import "./NicoleBirthday.css";

function NicoleBirthdayPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(false);

  const audioRef = useRef(null);

  const photos = [photo1, photo2, photo3, photo4, photo5];

  // Resize confetti
  useEffect(() => {
    const handle = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔊 Nueva voz elegante romántica + audio
  const playVoice = () => {
    if (!window.speechSynthesis) {
      alert("Tu navegador no soporta mensajes de voz.");
      return;
    }

    const texto =
      "Feliz cumpleaños, mi amor. Nicole... Hoy es un día especial porque celebramos la vida de una mujer maravillosa: tú. Tu luz, tu forma de ser, la dulzura con la que miras las cosas y la fuerza con la que enfrentas cada día te hacen única. Deseo que este nuevo año te encuentre rodeada de amor, de sonrisas sinceras y de aquello que realmente te haga feliz. Que cada sueño que guardas en tu corazón empiece a tomar forma. Que la vida te sorprenda bonito, siempre. Gracias por ser tan auténtica, tan sensible, tan tú. Ojalá la alegría que das vuelva multiplicada a tu vida. Que nunca te falte paz, amor, momentos mágicos… y libros que te hagan sentir. Feliz cumpleaños, Nicole. Que este veintiséis sea un capítulo lleno de magia. Con todo el amor del mundo… Adrian Tobar.";

    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-MX";
    utter.pitch = 1;
    utter.rate = 1.5; // voz más energica elegante
    utter.volume = 1;

    window.speechSynthesis.speak(utter);

    if (audioRef.current) audioRef.current.play();
  };

  // Efecto sorpresa – corazones flotantes
  const tocarSorpresa = () => {
    setHearts(true);
    setTimeout(() => setHearts(false), 2500);
  };

  return (
    <div className="birthday-container">
      <Confetti width={width} height={height} numberOfPieces={220} />

      {/* Audio */}
      <audio ref={audioRef} src={audioMensaje} preload="auto" />

      {/* Título ultra romántico */}
      <motion.h1
        className="titulo-romantico"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        ✨💗 ¡Feliz cumpleaños, mi amor! 💗✨
      </motion.h1>

      {/* Mensaje suave */}
      <motion.p
        className="mensaje-romantico"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
      >
        Hoy celebramos la vida de una mujer extraordinaria… tú.  
        Que este día y todos los que vienen estén llenos de amor, luz y magia.
      </motion.p>

      {/* Carrusel */}
      <div className="carousel-container">
        <motion.div
          key={index}
          className="polaroid"
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={photos[index]} className="carousel-img" />
          <p className="polaroid-caption">Nicole 💗</p>
        </motion.div>
      </div>

      {/* Botón voz */}
      <motion.button
        className="btn-voz"
        whileTap={{ scale: 0.9 }}
        onClick={playVoice}
      >
        🎙️ Escuchar mensaje
      </motion.button>

      {/* Botón sorpresa */}
      <motion.button
        className="btn-sorpresa"
        whileHover={{ scale: 1.12 }}
        onClick={tocarSorpresa}
      >
        💞 Toque sorpresa 💞
      </motion.button>

      {hearts && (
        <div className="hearts-overlay">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              className="heart"
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 1.5}s`
              }}
            >
              💗
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default NicoleBirthdayPage;
