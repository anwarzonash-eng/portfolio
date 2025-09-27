"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PortfolioImagesLoader from "../PortfolioImagesLoader";
import PortfolioPopUp from "../PortfolioPopUp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PortfolioCardContent from "../PortfolioCardContent";

// Config
const SLIDE_INTERVAL = 5000; // default autoplay
const INACTIVITY_DELAY = 5000; // after interaction

const HomeSlider = ({ portfolios }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [slideHeight, setSlideHeight] = useState<number>(0);

  const [selectedPortfolioPictures, setSelectedPortfolioPictures] = useState<
    string[] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState<boolean[]>(
    Array(portfolios.length).fill(false)
  );

  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  if (!portfolios?.length) return <PortfolioImagesLoader />;

  // --- Navigation ---
  const nextSlide = useCallback(() => {
    if (!isModalOpen) {
      setCurrentSlide((prev) => (prev + 1) % portfolios.length);
      setProgress(0);
    }
  }, [isModalOpen, portfolios.length]);

  const prevSlide = useCallback(() => {
    if (!isModalOpen) {
      setCurrentSlide(
        (prev) => (prev - 1 + portfolios.length) % portfolios.length
      );
      setProgress(0);
    }
  }, [isModalOpen, portfolios.length]);

  // --- Modal ---
  const openModal = (
    pictures: string,
    thumbnail: string,
    childBanner: string
  ) => {
    const portfolioImages = JSON.parse(pictures) as string[];
    setSelectedPortfolioPictures([thumbnail, childBanner, ...portfolioImages]);
    setIsModalOpen(true);
    setIsPaused(true);
  };

  const closeModal = () => {
    setSelectedPortfolioPictures(null);
    setIsModalOpen(false);
    setIsPaused(false);
  };

  // --- Auto Progress ---
  useEffect(() => {
    if (isPaused || isModalOpen || !isInViewport) return;

    const interval = setInterval(() => {
      setProgress(0);
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isModalOpen, isInViewport, nextSlide]);

  // --- Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  // --- Interaction Tracking ---
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleUserActivity = () => {
      setIsPaused(true);

      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

      inactivityTimer.current = setTimeout(() => {
        setIsPaused(false);
        setProgress(0);
      }, INACTIVITY_DELAY);
    };

    const events = ["mousemove", "click", "touchstart", "keydown"];
    events.forEach((ev) => el.addEventListener(ev, handleUserActivity));

    return () => {
      events.forEach((ev) => el.removeEventListener(ev, handleUserActivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // --- Touch/Swipe Support ---
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let startX = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        isDragging = false;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  // --- Dynamic Height (ResizeObserver) ---
  useEffect(() => {
    if (!slideRefs.current[currentSlide]) return;

    const slideEl = slideRefs.current[currentSlide];
    const observer = new ResizeObserver(() => {
      if (slideEl) setSlideHeight(slideEl.offsetHeight);
    });

    observer.observe(slideEl);
    setSlideHeight(slideEl.offsetHeight);

    return () => observer.disconnect();
  }, [currentSlide]);

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-[3rem] relative">
      {/* Progress Bars */}
      <div className="w-full flex gap-[4px] px-4 mb-3 sticky top-[9rem] z-10 bg-white xl:static xl:bg-transparent p-2 rounded-[1rem] max-xl:shadow-lg">
        {portfolios.map((_, index) => {
          const isActive = index === currentSlide;
          const isCompleted = index < currentSlide;

          return (
            <div
              key={index}
              className="h-[4px] flex-1 bg-gray-300 rounded overflow-hidden relative"
            >
              <div
                className={`h-full absolute top-0 left-0 transition-all duration-[${SLIDE_INTERVAL}ms] ease-linear
                  ${
                    isPaused || isModalOpen || !isInViewport
                      ? "bg-gray-400"
                      : "bg-primary"
                  }`}
                style={{
                  width: isCompleted ? "100%" : isActive ? "100%" : "0%",
                  animation:
                    isActive && !(isPaused || isModalOpen || !isInViewport)
                      ? `progress ${SLIDE_INTERVAL}ms linear`
                      : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPortfolioPictures && (
        <PortfolioPopUp
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          portfolioImages={selectedPortfolioPictures}
        />
      )}

      {/* Slider */}
      <div
        ref={carouselRef}
        className="relative w-full transition-all duration-500 ease-in-out overflow-hidden"
        style={{ height: `${slideHeight}px` }}
      >
        <div
          className="flex items-start transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {portfolios.map((portfolio, index) => (
            <div
              key={portfolio.id}
              className="w-full flex-shrink-0 rounded-[1rem]"
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
            >
              <PortfolioCardContent
                portfolio={portfolio}
                thumbnailSize={"large"}
                listOfskills={portfolio.skills || []}
                listOfdata={{
                  primaryColor: "#1F4FE1",
                  companytype: portfolio.companytype || "",
                }}
                index={index}
                showMoreSkills={showMoreSkills}
                setShowMoreSkills={setShowMoreSkills}
                openModal={openModal}
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        {!isModalOpen && (
          <div className="absolute bottom-0 right-0 hidden xl:flex items-center gap-5 p-4 lg:p-8">
            <button
              className="rounded-full h-[5rem] w-[5rem] border-2 border-primary hidden xl:flex items-center justify-center bg-white hover:bg-primary hover:text-white text-primary transition-colors duration-300"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="rounded-full h-[5rem] w-[5rem] border-2 border-primary hidden xl:flex items-center justify-center bg-white hover:bg-primary hover:text-white text-primary transition-colors duration-300"
              onClick={nextSlide}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>

      {/* CSS for Progress Animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeSlider;
