import { motion } from "framer-motion";

const quotes = [
  "You are my today and all of my tomorrows.",
  "Every love story is beautiful, but ours is my favorite.",
  "My heart chose you, and it still chooses you every day.",
  "With you, even silence feels special.",
  "Forever isn't long enough with you, Archa.",
];

const QuotesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-100 via-rose-200 to-pink-200">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-rose-700 text-center mb-12"
      >
        Words From My Heart 💝
      </motion.h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-6 shadow-lg cursor-default"
          >
            <p className="text-rose-700 text-lg italic leading-relaxed">"{quote}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuotesSection;
