import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

// 🎵 Inserta la música (debes poner un archivo en /public, por ejemplo: birthday.mp3)
const music = new Audio("/birthday.mp3");

// Carrusel: reemplaza con los nombres de tus fotos en /public
const photos = [
  "/IMG-20220513-WA0052.jpg",
  "/IMG-20250706-WA0013.jpg",
  "/IMG-20250808-WA0036.jpg",
  "/IMG-20251009-WA0061.jpg",
  "/IMG-20251019-WA0024.jpg",
];

function NicoleBirthdayPage() {
  const [index, setIndex] = useState(0);

  // ----- Carrusel automático -----
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000); // Cambia cada 3s
    return () => clearInterval(interval);
  }, []);

  // ----- Reproducir voz TTS (simulación) -----
  const playVibeVoice = () => {
    const utterance = new SpeechSynthesisUtterance(
      `Nicole, hoy es un día especial porque celebramos tu vida.
      Tu dulzura, tu fuerza y la luz que transmites hacen que el mundo sea más bonito.
      Que este nuevo año te encuentre rodeada de amor, de sueños cumplidos y momentos inolvidables.
      Con mucho cariño, de Adrian Tobar Hanze.`
    );

    // Configurar voz masculina latinoamericana (la más cercana disponible)
    utterance.lang = "es-419";

    // Buscar voz masculina si existe
    const voices = speechSynthesis.getVoices();
    const latinoMale = voices.find(
      (v) =>
        v.lang.includes("es") &&
        (v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("hombre"))
    );

    if (latinoMale) {
      utterance.voice = latinoMale;
    }

    speechSynthesis.speak(utterance);
  };

  // ----- Música -----
  const playMusic = () => {
    music.play();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #ffb6d9, #ff8dc7)",
        textAlign: "center",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Confetti */}
      <Confetti numberOfPieces={200} recycle={true} />

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "2.6rem",
          fontWeight: "700",
          marginBottom: "10px",
          textShadow: "0 0 10px rgba(255,255,255,0.8)",
        }}
      >
        💗 ¡Feliz Cumpleaños, Nicole! 💗
      </motion.h1>

      {/* Carrusel */}
      <div
        style={{
          margin: "auto",
          width: "80%",
          maxWidth: "400px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          marginTop: "20px",
        }}
      >
        <motion.img
          key={index}
          src={photos[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Mensaje */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: "25px",
          fontSize: "1.2rem",
          maxWidth: "600px",
          margin: "25px auto",
          lineHeight: "1.7",
          background: "rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        Nicole, hoy celebramos a una persona increíble: tú.
        <br />
        Que este nuevo año te encuentre rodeada de amor, luz y momentos que te
        recuerden lo valiosa que eres.
        <br />
        Que tus sueños se acerquen a tu vida y que cada día esté lleno de
        magia, alegría y ternura.
        <br />
        <strong>Con mucho cariño, Adrian Tobar Hanze 💗</strong>
      </motion.p>

      {/* Botón de música */}
      <button
        onClick={playMusic}
        style={buttonStyle}
      >
        🎵 Reproducir Música
      </button>

      {/* Botón de VibeVoice */}
      <button
        onClick={playVibeVoice}
        style={{ ...buttonStyle, background: "#ff6fb7" }}
      >
        🔊 Escuchar Mensaje
      </button>
    </div>
  );
}

// Estilo reutilizable para botones
const buttonStyle = {
  padding: "12px 20px",
  margin: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#ff82c1",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0px 0px 10px rgba(255,255,255,0.4)",
};

export default NicoleBirthdayPage;
