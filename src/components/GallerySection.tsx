import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Play, Pause, X } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const videos = [
  { src: "/First.mp4", title: "Video 1" },
  { src: "/Second.mp4", title: "Video 2" },
];
 
const images = [
  "/First.jpg",
  "/Second.jpg",
  "/Six.jpg",
  "/Four.jpg",
];
const GallerySection = () => {
  const { pauseMusic, resumeMusic } = useAudio();
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"image" | "video">("image");
  const [playing, setPlaying] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  // Resume music when video ends or is closed
  useEffect(() => {
    if (fullscreenVideo && playing[fullscreenVideo]) {
      pauseMusic();
    } else if (fullscreenVideo === null) {
      resumeMusic();
    }
  }, [fullscreenVideo, playing, pauseMusic, resumeMusic]);

  const togglePlay = (src: string) => {
    const video = videoRefs.current[src];
    if (!video) return;

    if (playing[src]) {
      video.pause();
      setPlaying({ ...playing, [src]: false });
      resumeMusic();
    } else {
      pauseMusic();
      video.play();
      setPlaying({ ...playing, [src]: true });
    }
  };

  const openVideoFullscreen = (src: string) => {
    setFullscreenVideo(src);
    setSelected(src);
    setSelectedType("video");
    // Auto-play when opening fullscreen
    setTimeout(() => {
      const video = videoRefs.current[src];
      if (video && !playing[src]) {
        pauseMusic();
        video.play();
        setPlaying({ ...playing, [src]: true });
      }
    }, 100);
  };

  const closeFullscreen = () => {
    // Pause any playing video
    if (fullscreenVideo && playing[fullscreenVideo]) {
      const video = videoRefs.current[fullscreenVideo];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      setPlaying({ ...playing, [fullscreenVideo]: false });
    }
    setFullscreenVideo(null);
    setSelected(null);
    resumeMusic();
  };

  const handleVideoEnd = (src: string) => {
    setPlaying({ ...playing, [src]: false });
    resumeMusic();
  };

  return (
    <section className="py-20 px-4">
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
              className="relative overflow-hidden rounded-2xl shadow-lg bg-black/20 cursor-pointer group"
              onClick={() => openVideoFullscreen(video.src)}
            >
              <video
                ref={(el) => { videoRefs.current[video.src] = el; }}
                src={video.src}
                className="w-full h-56 object-cover"
                playsInline
                muted={!playing[video.src]}
                onEnded={() => handleVideoEnd(video.src)}
              />
              {/* Play/Pause Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay(video.src);
                }}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white/90 text-rose-600 flex items-center justify-center hover:bg-white transition-colors"
              >
                {playing[video.src] ? <Pause size={18} /> : <Play size={18} />}
              </button>
              {/* Fullscreen Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openVideoFullscreen(video.src);
                }}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 text-rose-600 flex items-center justify-center hover:bg-white transition-colors"
                title="Fullscreen"
              >
                <Maximize size={18} />
              </button>
              {/* Play overlay on hover */}
              {!playing[video.src] && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={48} className="text-white" />
                </div>
              )}
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
                className="w-full h-48 md:h-56 object-cover object-bottom"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Preview for Videos */}
      <AnimatePresence>
        {selected && selectedType === "video" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </button>

            {/* Video container - forces landscape on mobile */}
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={(el) => { videoRefs.current[selected] = el; }}
                src={selected}
                className="max-w-full max-h-full"
                autoPlay
                playsInline
                controls
                onEnded={() => handleVideoEnd(selected)}
                style={{
                  maxHeight: '100vh',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
