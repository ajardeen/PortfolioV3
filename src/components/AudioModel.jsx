import React, { useEffect, useRef } from "react";

// Global audio manager
let globalAudio = null;

const AudioModel = ({
  children,
  onHover,
  onView,
  onClick,
  audio,
  startTime = 0,
  playAudio = false,
  className = "",
  style = {}
}) => {
  const elementRef = useRef(null);

  // Handle play/stop audio
  const playAudioFile = () => {
    if (!playAudio || !audio) return;

    // Stop previous audio
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.currentTime = 0;
    }

    // Create new audio
    globalAudio = new Audio(audio);
    globalAudio.currentTime = startTime;
    globalAudio.play().catch(() => {
      console.warn("Audio play blocked by browser");
    });
  };

  const stopAudioFile = () => {
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.currentTime = 0;
      globalAudio = null;
    }
  };

  // Trigger on view (IntersectionObserver)
  useEffect(() => {
    if (!onView && !playAudio) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (onView) onView();
            playAudioFile();
          } else {
            stopAudioFile();
          }
        });
      },
      { threshold: 0.5 } // visible 50% to trigger
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      stopAudioFile();
    };
  }, [onView, playAudio, audio, startTime]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={style}
      onMouseEnter={() => {
        if (onHover) onHover();
        playAudioFile();
      }}
      onClick={() => {
        if (onClick) onClick();
        playAudioFile();
      }}
    >
      {children}
    </div>
  );
};

export default AudioModel;
