import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const ProposalSection = () => {
  const [accepted, setAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#ec4899", "#f9a8d4", "#fda4af", "#fff1f2"],
    });
  };

  const moveNo = () => {
    setNoOffset({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 60,
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-rose-700 mb-12"
        >
          Archa, Will You Be My Valentine? 💖
        </motion.h2>

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
              className="px-10 py-4 rounded-full bg-white/50 backdrop-blur border border-rose-300 text-rose-600 text-xl font-bold shadow-md"
            >
              No 😢
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 max-w-md mx-auto shadow-2xl"
          >
            <p className="text-2xl md:text-3xl text-rose-700 font-bold">
              Thank you for giving us another chance ❤️
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProposalSection;
