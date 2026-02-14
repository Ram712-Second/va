import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Volume2, Heart } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const MusicPlayer = () => {
  const { isPlaying, isMuted, toggleMute, startExperience, showWelcome } = useAudio();

  return (
    <>
      {/* Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 rounded-3xl shadow-2xl text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-16 h-16 mx-auto mb-4 text-white fill-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Welcome! 💕
              </h2>
              <p className="text-white/90 mb-6">
                Click below to start your experience with music
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startExperience}
                className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Enter ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Control Button - Mute/Unmute */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg flex items-center justify-center"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
