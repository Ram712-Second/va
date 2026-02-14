import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !hasStarted.current) {
      audio.muted = false;
      audio.volume = 0.4;
      audio.play().then(() => {
        setPlaying(true);
        hasStarted.current = true;
      }).catch(() => {
        // Auto-play blocked, user needs to click
      });
    }
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.muted = false;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
    hasStarted.current = true;
  };

  return (
    <>
      <audio ref={audioRef} src="/love.mp3" loop preload="auto" />
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg flex items-center justify-center"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? <Music className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
