import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export default function DecryptedText({
  text,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  useOriginalCharsOnly = false,
  revealDirection = "start",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  hoverScrambleDuration = 400, // faster scramble before reveal on hover
  hoverRevealSpeed = 40,       // faster reveal speed per char on hover
  viewDuration = 1000,         // fixed 2s reveal on view
  scrambleBlur =  0.9,            // blur intensity for scrambling
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef(null);

  const scrambleText = (originalText, currentRevealed, availableChars) => {
    return originalText.split("").map((char, i) => {
      if (char === " ") return " ";
      if (currentRevealed.has(i)) return originalText[i];
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    }).join("");
  };

  const runReveal = (availableChars, speedPerChar, onDone) => {
    let revealTimeout;
    let scrambleInterval;

    const revealNext = (revealedSet) => {
      if (revealedSet.size >= text.length) {
        clearInterval(scrambleInterval);
        onDone?.();
        return;
      }

      const nextIndex =
        revealDirection === "end"
          ? text.length - 1 - revealedSet.size
          : revealDirection === "center"
          ? Math.abs(Math.floor(text.length / 2 - revealedSet.size / 2)) %
            text.length
          : revealedSet.size;

      const newRevealed = new Set(revealedSet);
      newRevealed.add(nextIndex);

      setRevealedIndices(newRevealed);

      revealTimeout = setTimeout(() => revealNext(newRevealed), speedPerChar);
    };

    scrambleInterval = setInterval(() => {
      setDisplayText(scrambleText(text, revealedIndices, availableChars));
    }, 40);

    revealNext(new Set());

    return () => {
      clearTimeout(revealTimeout);
      clearInterval(scrambleInterval);
    };
  };

  const startAnimation = ({ mode = "view" }) => {
    if (isScrambling) return;
    setIsScrambling(true);
    setRevealedIndices(new Set());

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("");

    if (mode === "view") {
      // view → fixed 2s
      const perChar = viewDuration / text.length;
      runReveal(availableChars, perChar, () => {
        setDisplayText(text);
        setIsScrambling(false);
      });
    } else {
      // hover → scramble first, then fast reveal
      const scrambleInterval = setInterval(() => {
        setDisplayText(scrambleText(text, new Set(), availableChars));
      }, 35);

      setTimeout(() => {
        clearInterval(scrambleInterval);
        runReveal(availableChars, hoverRevealSpeed, () => {
          setDisplayText(text);
          setIsScrambling(false);
        });
      }, hoverScrambleDuration);
    }
  };

  // Trigger on view once
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation({ mode: "view" });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [text]);

  // Hover
  const hoverProps = {
    onMouseEnter: () => startAnimation({ mode: "hover" }),
  };

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      style={styles.wrapper}
      {...hoverProps}
      {...props}
    >
      <span style={styles.srOnly}>{text}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isScrambling;
          const isScramblingChar = !isRevealed && isScrambling;

          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isRevealed ? 1 : 0.6,
                y: isRevealed ? 0 : 15,
              }}
              transition={{
                duration: 0.18,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              // style={{
              //   filter: isScramblingChar ? `blur(${scrambleBlur}px)` : "none",
              // }}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
}
