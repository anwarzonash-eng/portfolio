"use client";

import React, { useEffect, useRef } from "react";
const confetti = require("canvas-confetti");

const Confetti = () => {
  const confettiRef = useRef(null);

  useEffect(() => {
    const myConfetti = confetti.create(confettiRef.current, {
      resize: true,
      useWorker: true,
    });

    const fireConfetti = () => {
      myConfetti({
        particleCount: 400,
        spread: 90,
        origin: { y: 0.6 },
      });
    };

    fireConfetti();

    // Optionally, you can set up an interval to fire confetti repeatedly
    // const intervalId = setInterval(fireConfetti, 1000);

    // Clean up
    return () => {
      // clearInterval(intervalId);
      myConfetti.reset();
    };
  }, []);

  return (
    <canvas
      ref={confettiRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10000]"
    />
  );
};

export default Confetti;
