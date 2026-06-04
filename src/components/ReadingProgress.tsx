"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (progress < 1) return null;

  return (
    <div className="reading-progress" style={{ width: `${progress}%` }}>
      <span
        style={{
          position: "absolute",
          right: -2,
          top: -6,
          fontSize: "12px",
        }}
      >
        🎲
      </span>
    </div>
  );
}
