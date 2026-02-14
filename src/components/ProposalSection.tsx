import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const ProposalSection = () => {
  const [accepted, setAccepted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });

  // Auto-hide message after 3 seconds
  useEffect(() => {
    if (accepted) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [accepted]);

  const handleYes = () => {
    setAccepted(true);
    // Fire confetti from outside the screen edges - won't interfere with text
    const end = Date.now() + 2000;
    const colors = ["#f43f5e", "#ec4899", "#f9a8d4"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const moveNo = () => {
    setNoOffset({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 60,
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="text-center backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-rose-700 mb-12"
        >
          Archa, Will You Be My Valentine? 💖
        </motion.h2>

        <AnimatePresence>
          {!accepted ? (
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                YES 💕
              </motion.button>

              <motion.button
                animate={{ x: noOffset.x, y: noOffset.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={moveNo}
                onClick={moveNo}
                className="px-10 py-4 rounded-full bg-white border border-rose-300 text-rose-600 text-xl font-bold shadow-md hover:shadow-lg transition-shadow"
              >
                No 😢
              </motion.button>
            </div>
          ) : (
            showMessage && (
              <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white/90 backdrop-blur border border-rose-200 rounded-2xl p-6 shadow-xl"
            >
              <p className="text-2xl md:text-3xl text-rose-700 font-bold">
                Thank you for giving us another chance ❤️
              </p>
            </motion.div>
          )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProposalSection;
