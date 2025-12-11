import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import "./NicoleBirthday.css";

// Importación de imágenes del carrusel
import photo1 from "./IMG-20220513-WA0052.jpg";
import photo2 from "./IMG-20250706-WA0013.jpg";
import photo3 from "./IMG-20250808-WA0036.jpg";
import photo4 from "./IMG-20251009-WA0061.jpg";
import photo5 from "./IMG-20251019-WA0024.jpg";

function NicoleBirthdayPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const audioRef = useRef(null);

  const photos = [photo1, photo2, photo3, photo4, photo5];

  // Confetti responsive
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cambio automático del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  // Audio y TTS
  const playVoiceMessage = () => {
    if (!window.speechSynthesis) return alert("Tu navegador no soporta TTS.");

    const utter = new SpeechSynthesisUtterance(
      "Feliz cumpleaños, Nicole. Hoy celebramos a una mujer extraordinaria. Que este nuevo capítulo llegue lleno de luz, amor, alegría y momentos que te recuerden lo valiosa que eres. Con todo el cariño del mundo, Adrian Tobar Hanze."
    );

    // Voz masculina latina estilo locutor elegante
    utter.lang = "es-MX";
    utter.pitch = 1;
    utter.rate = 0.92;
    utter.volume = 1;

    window.speechSynthesis.speak(utter);

    // Música
    if (audioRef.current) audioRef.current.play();
  };

  const triggerHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);
  };

  return (
    <div className="birthday-container">
      <Confetti width={width} height={height} numberOfPieces={200} />

      {/* Música */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2023/03/31/audio_89b8e7e1ac.mp3" />

      {/* Título animado */}
      <motion.h1
        className="birthday-title"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        🌸 Feliz Cumpleaños, Nicole 🌸
      </motion.h1>

      {/* Texto principal */}
      <motion.p
        className="birthday-message"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      >
        Hoy el mundo celebra la vida de una mujer increíble: tú.  
        Que este nuevo año esté lleno de magia, amor, alegría  
        y momentos que te recuerden lo especial que eres.  
      </motion.p>

      {/* Carrusel Polaroid */}
      <div className="carousel-container">
        <motion.div
          key={currentIndex}
          className="polaroid"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={photos[currentIndex]} alt="nicole" className="carousel-img" />
          <p className="polaroid-caption">Nicole 💗</p>
        </motion.div>
      </div>

      {/* Botón de voz */}
      <motion.button
        className="voice-button"
        onClick={playVoiceMessage}
        whileTap={{ scale: 0.9 }}
      >
        🎙️ Escuchar mensaje
      </motion.button>

      {/* Botón sorpresa */}
      <motion.button
        className="surprise-button"
        onClick={triggerHearts}
        whileHover={{ scale: 1.1 }}
      >
        💝 Toque sorpresa
      </motion.button>

      {/* Corazones animados */}
      {showHearts && (
        <div className="hearts-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="heart">💗</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default NicoleBirthdayPage;
