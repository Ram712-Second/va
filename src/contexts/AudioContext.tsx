import { createContext, useContext, useRef, useState, ReactNode } from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMusic: () => void;
  toggleMute: () => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
  startExperience: () => void;
  showWelcome: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const startExperience = () => {
    setShowWelcome(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = isMuted;
      audio.volume = isMuted ? 0 : 0.4;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      audio.volume = 0.4;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const resumeMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      // Always unmute when resuming
      audio.muted = false;
      setIsMuted(false);
      // Only play if actually paused
      if (audio.paused) {
        audio.volume = 0.4;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, isMuted, toggleMusic, toggleMute, pauseMusic, resumeMusic, startExperience, showWelcome }}>
      {children}
      <audio ref={audioRef} src="/love.mp3" loop preload="auto" />
    </AudioContext.Provider>
  );
};


export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};
