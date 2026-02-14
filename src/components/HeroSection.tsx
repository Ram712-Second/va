import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToLetter = () => {
    document.getElementById("love-letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300">
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-rose-700 mb-4"
        >
          Happy Valentine's Day, Archa ❤️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-rose-500 mb-10 font-light"
        >
          A small surprise from my heart to yours...
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToLetter}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Open My Heart 💌
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
