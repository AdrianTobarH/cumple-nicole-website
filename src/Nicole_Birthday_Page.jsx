function NicoleBirthdayPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const audioRef = useRef(null);

  const photos = [photo1, photo2, photo3, photo4, photo5];

  // Resize confetti
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 💗 Nueva voz mejorada x1.5 + mensaje más largo y romántico
  const playVoiceMessage = () => {
    if (!window.speechSynthesis) {
      alert("Tu navegador no soporta mensajes de voz.");
      return;
    }

    const message =
      "Feliz cumpleaños, mi amor. Nicole... Hoy es un día especial porque el mundo celebra la vida de una persona increíble: tú. Tu luz, tu forma de ser, la dulzura con la que miras las cosas y la fuerza con la que enfrentas cada día te hacen única. Quiero que este nuevo año te encuentre rodeada de cariño, de sonrisas sinceras y de todo aquello que te hace feliz. Que cada sueño que guardas dentro empiece a tomar forma. Que cada deseo encuentre su camino. Y que la vida te sorprenda bonito, como tú mereces. Gracias por ser tú. Tan auténtica, tan sensible, tan tú. Ojalá la alegría que das a los demás vuelva multiplicada a tu corazón. Que nunca te falte amor, paz, libros que te hagan sentir, y momentos que te recuerden lo valiosa que eres. Feliz cumpleaños, Nicole. Que este veintiséis sea un capítulo lleno de magia. Con mucho amor y cariño… Adrian Tobar.";

    const utter = new SpeechSynthesisUtterance(message);
    utter.lang = "es-MX";
    utter.pitch = 1;
    utter.rate = 1.5; // 🔥 velocidad más energética
    utter.volume = 1;

    window.speechSynthesis.speak(utter);

    if (audioRef.current) audioRef.current.play();
  };

  // 💗 Nuevo Toque Sorpresa mejorado (corazones + brillo + animación real)
  const triggerHearts = () => {
    setShowHearts(true);

    setTimeout(() => {
      setShowHearts(false);
    }, 2500);
  };

  return (
    <div className="birthday-container">
      <Confetti width={width} height={height} numberOfPieces={200} />

      {/* Música */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2023/03/31/audio_89b8e7e1ac.mp3"
      />

      {/* 💗 Nuevo título “mi amor” */}
      <motion.h1
        className="birthday-title"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        💗 ¡Feliz cumpleaños, mi amor! 💗
      </motion.h1>

      {/* Mensaje principal animado */}
      <motion.p
        className="birthday-message"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
      >
        Hoy el mundo celebra a una mujer extraordinaria.  
        Que tu vida se llene siempre de amor, magia y momentos hermosos.
      </motion.p>

      {/* Carrusel */}
      <div className="carousel-container">
        <motion.div
          key={currentIndex}
          className="polaroid"
          initial={{ opacity: 0, rotate: -6 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={photos[currentIndex]} className="carousel-img" />
          <p className="polaroid-caption">Nicole 💗</p>
        </motion.div>
      </div>

      {/* Botón mensaje de voz */}
      <motion.button
        className="voice-button"
        whileTap={{ scale: 0.92 }}
        onClick={playVoiceMessage}
      >
        🎙️ Escuchar mensaje
      </motion.button>

      {/* Botón sorpresa mejorado */}
      <motion.button
        className="surprise-button"
        whileHover={{ scale: 1.12 }}
        onClick={triggerHearts}
      >
        ✨ Toque sorpresa ✨
      </motion.button>

      {/* Corazones mágicos */}
      {showHearts && (
        <div className="hearts-container">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 1.4}s`
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
