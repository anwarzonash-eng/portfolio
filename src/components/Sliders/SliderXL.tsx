"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const SLIDE_INTERVAL = 2500; // milliseconds — change to 2000 or 3000 as desired
const PROGRESS_TICK_MS = 100; // progress update tick

const SliderXL = ({ portfolioPictures }) => {
  const images = JSON.parse(portfolioPictures).filter(
    (src: string | null) => src !== null
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Preload all images
  useEffect(() => {
    if (images.length === 0) {
      setPreloaded(true);
      return;
    }

    let loaded = 0;
    const total = images.length;

    images.forEach((src: string) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === total) setPreloaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) setPreloaded(true);
      };
    });
  }, [images]);

  // Intersection Observer: Start/stop auto-play when component enters/leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (sliderContainerRef.current) {
      observer.observe(sliderContainerRef.current);
    }

    return () => {
      if (sliderContainerRef.current) {
        observer.unobserve(sliderContainerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  // Auto-advance with interval (only when in view and not paused)
  useEffect(() => {
    const shouldAutoPlay = preloaded && images.length > 1 && isInView && !isPaused;
    if (!shouldAutoPlay) {
      return;
    }

    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      // progress is reset in the progress effect when currentSlide changes
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [preloaded, images.length, isInView, isPaused]);

  // Auto-scroll thumbnails to active (without page scroll)
  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    if (!container) return;
    const activeThumb = container.children[currentSlide] as HTMLElement;
    if (!activeThumb) return;

    // Only scroll horizontally within the thumbnails container when it can scroll
    if (container.scrollWidth > container.clientWidth) {
      const scrollLeft =
        activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "auto" });
    }
  }, [currentSlide]);

  // Progress bar effect — matches SLIDE_INTERVAL and resets on slide change
  useEffect(() => {
    if (!isInView || isPaused || images.length <= 1 || !preloaded) {
      setProgress(0);
      return;
    }

    const steps = Math.max(1, Math.ceil(SLIDE_INTERVAL / PROGRESS_TICK_MS));
    const increment = 100 / steps;
    let current = 0;
    setProgress(0);

    const progressId = setInterval(() => {
      current += increment;
      if (current >= 100) {
        // cap at 100 until auto-advance sets currentSlide and this effect resets progress
        setProgress(100);
        current = 0;
      } else {
        setProgress(current);
      }
    }, PROGRESS_TICK_MS);

    return () => clearInterval(progressId);
    // include currentSlide so progress resets when slide changes
  }, [isInView, isPaused, images.length, preloaded, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Pause on hover/mouse down (desktop)
  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUpOrLeave = () => setIsPaused(false);

  // Touch pause support (mobile)
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  if (!preloaded) {
    return (
      <div className="w-full h-[200px] lg:h-[700px] flex items-center justify-center bg-gray-100 rounded-[1.6rem]">
        <div className="text-gray-500">Loading images...</div>
      </div>
    );
  }

  return (
    <div ref={sliderContainerRef} className="relative w-full max-lg:pb-[2rem] sliderxl-root">
      {/* Progress Timeline Bars */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
        {images.map((_: any, index: number) => (
          <div
            key={index}
            className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-primary transition-all duration-100"
              style={{
                width:
                  index < currentSlide
                    ? "100%"
                    : index === currentSlide
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Slider */}
      <div
        className="relative w-full overflow-hidden rounded-[1.6rem] group"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 h-[200px] lg:h-[700px]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((img: string, index: number) => (
            <Image
              key={index}
              height={1500}
              width={3000}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full flex-shrink-0 object-fill rounded-[1.6rem] border border-solid border-border"
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbnailsContainerRef}
        className="flex gap-3 mt-8 overflow-x-auto scrollbar-hidden sliderxl-thumbnails py-[1rem] px-4 "
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {images.map((img: string, index: number) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-4 transition-all
              ${
                index === currentSlide
                  ? "border-primary scale-105"
                  : "border-gray-300 opacity-70"
              }`}
          >
            <Image
              src={img}
              alt={`Thumb ${index + 1}`}
              width={160}
              height={160}
              className="w-40 h-40 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Prevent scroll anchoring causing page jumps when slides update */
        .sliderxl-root,
        .sliderxl-thumbnails {
          overflow-anchor: none;
        }
      `}</style>

      {/* Navigation Buttons */}

      {/* Prev Button - Desktop (outside slider) */}
      <button
        onClick={prevSlide}
        className={`absolute left-[100px] bottom-[-50px] lg:top-1/2 lg:-left-[3.6rem] -translate-y-1/2 
             bg-[#EFF5FD] hover:bg-primary active:bg-primary hover:text-white active:text-white rounded-full shadow-xl flex items-center justify-center 
             lg:h-[7.2rem] lg:w-[7.2rem] h-[4.5rem] w-[4.5rem] transition-all duration-300`}
      >
        <ArrowLeft />
      </button>

      {/* Next Button - Desktop (outside slider) */}
      <button
        onClick={nextSlide}
        className={`absolute flex items-center justify-center right-[100px] bottom-[-50px]  lg:top-1/2 lg:-right-[3.6rem] -translate-y-1/2 
             bg-[#EFF5FD] hover:bg-primary active:bg-primary hover:text-white active:text-white rounded-full shadow-xl  
             lg:h-[7.2rem] lg:w-[7.2rem] h-[4.5rem] w-[4.5rem] transition-all duration-300`}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default SliderXL;