import React, { useEffect, useRef, useState } from "react";
import "./TvGlitch.css";

const TvGlitch = ({ frameImg, screenImg }) => {
  const audioRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const audio = new Audio("/sounds/tv-glitch-sound.mp3");
    audio.volume = 0.2; // 20% volume
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="tv-wrapper absolute w-60 h-35 rounded-4xl overflow-hidden bg-amber-50 cursor-pointer flex items-center justify-center"
      onMouseEnter={() => {
        setHovered(true);
        playSound();
      }}
      onMouseLeave={() => {
        setHovered(false);
        stopSound();
      }}
    >
      {/* TV Frame */}
      <img
        src={frameImg}
        alt="tv frame"
        className="w-60 absolute top-0 right-0 z-20 pointer-events-none select-none"
      />

      {/* TV Content */}
      <div className="tv-screen z-10 w-full h-full flex items-center justify-center">
        {hovered ? (
          // Show glitch images on hover
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="glitch-img absolute top-0 left-0 w-full h-full"
              style={{ backgroundImage: `url(${screenImg})` }}
            ></div>
          ))
        ) : (
          // Default text when not hovered
          <span className="text-white text-lg font-bold">Featured</span>
        )}
      </div>
    </div>
  );
};

export default TvGlitch;
