import { motion } from "framer-motion";

const LoveLetterSection = () => {
  return (
    <section id="love-letter" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 md:p-12 shadow-2xl relative"
      >
        <div className="absolute -top-4 -left-4 text-3xl">💕</div>
        <div className="absolute -top-4 -right-4 text-3xl">💕</div>
        <div className="absolute -bottom-4 -left-4 text-3xl">💗</div>
        <div className="absolute -bottom-4 -right-4 text-3xl">💗</div>

        <h2 className="text-3xl md:text-4xl font-bold text-rose-700 text-center mb-8">
          My Letter to You 💌
        </h2>

        <div className="space-y-4 text-rose-800 text-base md:text-lg leading-relaxed font-light">
          <p className="font-semibold text-xl">Archa,</p>
          <p>I know I have made mistakes.</p>
          <p>I know I haven't always been perfect.</p>
          <p>But please believe me when I say — my love for you has always been real.</p>
          <p>If I ever hurt you, I am truly sorry.</p>
          <p>You mean more to me than my ego, my pride, or my misunderstandings.</p>
          <p className="font-medium">Please forgive me.</p>
          <p>Let's grow together, understand each other better, and build something beautiful again.</p>
          <p>You are not just my Valentine.</p>
          <p>You are my peace, my happiness, and my heart.</p>
          <p className="font-semibold text-xl mt-6 text-right">Forever yours ❤️</p>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetterSection;
