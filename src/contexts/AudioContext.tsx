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
  isVideoFullscreen: boolean;
  setIsVideoFullscreen: (value: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

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
    if (audio) {
      console.log("Pausing music, current state:", { paused: audio.paused, muted: audio.muted, currentTime: audio.currentTime, volume: audio.volume });
      // Order matters on mobile - mute first, then pause, then volume
      audio.muted = true;
      audio.pause();
      audio.volume = 0;
      // Force the audio to stop completely by removing src temporarily
      const currentSrc = audio.src;
      audio.src = "";
      audio.src = currentSrc;
      audio.load(); // Force reload to stop playback
      setIsPlaying(false);
      setIsMuted(true);
      console.log("Music paused and stopped");
    }
  };

  const resumeMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      console.log("Resuming music");
      audio.volume = 0.4;
      audio.muted = false;
      setIsMuted(false);
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Play failed:", e));
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, isMuted, toggleMusic, toggleMute, pauseMusic, resumeMusic, startExperience, showWelcome, isVideoFullscreen, setIsVideoFullscreen }}>
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
