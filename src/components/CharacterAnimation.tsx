"use client";

import React from "react";

interface CharacterAnimationProps {
  text: string;
}

const CharacterAnimation: React.FC<CharacterAnimationProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center">
      {text.split("").map((char, index) => (
        <div
          key={index}
          className="opacity-0 animate-fadeIn text-heading text-[1.8rem] hidden min-[1122px]:block"
          style={{ animationDelay: `${index * 0.02}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </div>
      ))}
    </div>
  );
};

export default CharacterAnimation;
