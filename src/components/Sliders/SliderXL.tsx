"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
        console.log("🎬 SliderXL Visibility:", entry.isIntersecting ? "IN VIEW ✅" : "OUT OF VIEW ❌");
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
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

  // Auto-advance with progress bar (only when in view and not paused)
  useEffect(() => {
    const shouldAutoPlay = preloaded && images.length > 1 && isInView && !isPaused;
    
    console.log("🎞️  Auto-Slide Status:", {
      preloaded,
      "images.length": images.length,
      isInView,
      isPaused,
      "Should Auto-Play": shouldAutoPlay,
    });

    if (!shouldAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setProgress(0);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, preloaded, images.length, isInView]);

  // Auto-scroll thumbnails to active (without page scroll)
  useEffect(() => {
    if (thumbnailsContainerRef.current) {
      const activeThumb = thumbnailsContainerRef.current.children[
        currentSlide
      ] as HTMLElement;
      if (activeThumb) {
        // Scroll only within the thumbnail container, not the page
        const scrollLeft = activeThumb.offsetLeft - thumbnailsContainerRef.current.offsetWidth / 2 + activeThumb.offsetWidth / 2;
        
        thumbnailsContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentSlide]);

  // Progress bar effect - independent of auto-advance
  useEffect(() => {
    if (!isInView || isPaused || images.length <= 1) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 50); // 5000ms / 100 = 50 intervals
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isInView, isPaused, images.length]);

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
    <div ref={sliderContainerRef} className="relative w-full max-lg:pb-[2rem]">
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
        className="flex gap-3 mt-8 overflow-x-auto scrollbar-hidden py-[1rem] px-4 "
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
