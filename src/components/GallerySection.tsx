import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Play, Pause } from "lucide-react";
 
const videos = [
  { src: "/First.mp4", title: "Video 1" },
  { src: "/Second.mp4", title: "Video 2" },
];
 
const images = [
  "/First.jpeg",
  "/Five.jpeg",
  "/Third.jpeg",
  "/Four.jpeg",
];
 
const GallerySection = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"image" | "video">("image");
  const [playing, setPlaying] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
 
  const togglePlay = (src: string) => {
    const video = videoRefs.current[src];
    if (!video) return;
 
    if (playing[src]) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying({ ...playing, [src]: !playing[src] });
  };
 
  const toggleFullscreen = (src: string) => {
    const video = videoRefs.current[src];
    if (!video) return;
 
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };
 
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-200 via-rose-100 to-pink-100">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-rose-700 text-center mb-12"
      >
        Our Moments 📸
      </motion.h2>
 
      {/* Videos Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <h3 className="text-2xl font-semibold text-rose-600 text-center mb-6">Videos 🎬</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative overflow-hidden rounded-2xl shadow-lg bg-black/20"
            >
              <video
                ref={(el) => { videoRefs.current[video.src] = el; }}
                src={video.src}
                className="w-full h-56 object-cover"
                playsInline
                onEnded={() => setPlaying({ ...playing, [video.src]: false })}
              />
              {/* Play/Pause Button */}
              <button
                onClick={() => togglePlay(video.src)}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white/90 text-rose-600 flex items-center justify-center hover:bg-white transition-colors"
              >
                {playing[video.src] ? <Pause size={18} /> : <Play size={18} />}
              </button>
              {/* Fullscreen Button */}
              <button
                onClick={() => toggleFullscreen(video.src)}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 text-rose-600 flex items-center justify-center hover:bg-white transition-colors"
                title="Fullscreen"
              >
                <Maximize size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
 
      {/* Images Section */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-rose-600 text-center mb-6">Photos 📷</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              onClick={() => {
                setSelected(src);
                setSelectedType("image");
              }}
            >
              <img
                src={src}
                alt={`Gallery photo ${i + 1}`}
                className="w-full h-48 md:h-56 object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
 
      {/* Fullscreen Preview for Images */}
      <AnimatePresence>
        {selected && selectedType === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selected}
              alt="Preview"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
 
export default GallerySection;