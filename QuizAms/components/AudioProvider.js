import React, { createContext, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

const defaultValue: AudioContextType = {
  isPlaying: true,
  toggleMusic: () => {},
};

export const AudioContext = createContext(defaultValue);

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const init = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });

      const { sound } = await Audio.Sound.createAsync(
        require("../assets/musicafundo.mp3"),
        { isLooping: true, volume: 0.5 }
      );

      soundRef.current = sound;
      await sound.playAsync();
    };

    init();

    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  const toggleMusic = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </AudioContext.Provider>
  );
}
