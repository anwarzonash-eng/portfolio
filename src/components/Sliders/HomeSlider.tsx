"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PortfolioImagesLoader from "../PortfolioImagesLoader";
import PortfolioPopUp from "../PortfolioPopUp";
import PortfolioContent from "../PortfolioContent";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    }
  }, [isModalOpen, portfolios.length]);

  const prevSlide = useCallback(() => {
    if (!isModalOpen) {
      setCurrentSlide(
        (prev) => (prev - 1 + portfolios.length) % portfolios.length
      );
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

    let elapsed = (progress / 100) * SLIDE_INTERVAL;
    const interval = setInterval(() => {
      elapsed += 100;
      setProgress((elapsed / SLIDE_INTERVAL) * 100);

      if (elapsed >= SLIDE_INTERVAL) {
        clearInterval(interval);
        setProgress(0);
        nextSlide();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isModalOpen, isInViewport, nextSlide, progress]);

  // --- Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 } // at least 10% visible
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
        setProgress(0); // restart progress bar
      }, INACTIVITY_DELAY);
    };

    const events = ["mousemove", "click", "touchstart", "keydown"];
    events.forEach((ev) => el.addEventListener(ev, handleUserActivity));

    return () => {
      events.forEach((ev) => el.removeEventListener(ev, handleUserActivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

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
      {/* Modal */}
      {isModalOpen && selectedPortfolioPictures && (
        <PortfolioPopUp
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          portfolioImages={selectedPortfolioPictures}
        />
      )}

      {/* Progress Bars */}
      <div className="w-full flex gap-[4px] px-4 mb-3">
        {portfolios.map((_, index) => (
          <div
            key={index}
            className="h-[4px] flex-1 bg-gray-300 rounded overflow-hidden"
          >
            <div
              className={`h-full transition-all duration-100 ${
                isPaused ? "bg-gray-400" : "bg-primary"
              }`}
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
              key={portfolio.id || index}
              className="w-full flex-shrink-0 px-[1.5rem] bg-white rounded-[1rem] p-4 lg:p-8"
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
            >
              <PortfolioContent
                portfolio={portfolio}
                thumbnailToUse={
                  portfolio.title === "Velzon"
                    ? "/VelzonThumbnail.PNG"
                    : portfolio.thumbnail || "/images/dummy_port_img.webp"
                }
                listOfskills={portfolio.skills || []} // Pass portfolio.skills as the skills list for modifiedContent
                listOfdata={{
                  primaryColor: "#1F4FE1", // Match CVPortfolio's expected color
                  companytype: portfolio.companytype || "", // For "Launch Project" button
                }}
                skills={skillsGrouping(
                  portfolio.skills?.length < 15
                    ? portfolio.skills || []
                    : portfolio.skills?.slice(0, 15) || []
                )}
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
          <div className="absolute bottom-0 right-0 hidden xl:flex items-center gap-5 p-4 lg:p-8 bg-white">
            <button
              className="rounded-full h-[5rem] w-[5rem] border-2 border-primary 
              hidden xl:flex items-center justify-center bg-white hover:bg-primary hover:text-white 
              text-primary transition-colors duration-300"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="rounded-full h-[5rem] w-[5rem] border-2 border-primary 
              hidden xl:flex items-center justify-center bg-white hover:bg-primary hover:text-white 
              text-primary transition-colors duration-300"
              onClick={nextSlide}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSlider;
