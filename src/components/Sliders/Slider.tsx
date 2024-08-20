"use client";

import { useState, useRef, useEffect } from "react";

interface SlideProps {
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  currentIndex: number;
  totalSlides: number;
}

interface SliderProps {
  slides: ((props: SlideProps) => React.ReactNode)[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < slides.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : slides.length - 1
    );
  };

  // Swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      goToNextSlide();
      touchStartX.current = null;
    } else if (deltaX < -50) {
      goToPrevSlide();
      touchStartX.current = null;
    }
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full max-w-[1200px] mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${100 * currentIndex}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full">
            {slide({
              goToNextSlide,
              goToPrevSlide,
              currentIndex,
              totalSlides: slides.length,
            })}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-start sm:justify-center lg:justify-end w-full lg:absolute bottom-[4rem] z-10">
        <div className="flex items-center justify-center gap-[1.2rem]">
          <div
            onClick={goToPrevSlide}
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-white border-solid flex items-center justify-center hover:bg-white group duration-300 cursor-pointer z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.25 12H3.75"
                className="stroke-white group-hover:stroke-primary"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5 5.25L3.75 12L10.5 18.75"
                className="stroke-white group-hover:stroke-primary"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            onClick={goToNextSlide}
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-white border-solid flex items-center justify-center hover:bg-white group duration-300 cursor-pointer z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.75 12H20.25"
                className="stroke-white group-hover:stroke-primary"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 5.25L20.25 12L13.5 18.75"
                className="stroke-white group-hover:stroke-primary"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
