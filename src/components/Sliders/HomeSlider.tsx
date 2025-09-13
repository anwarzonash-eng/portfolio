"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PortfolioImagesLoader from "../PortfolioImagesLoader";
import PortfolioPopUp from "../PortfolioPopUp";
import PortfolioContent from "../PortfolioContent";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

type PortfolioType = {
  id: string;
  title: string;
  tagline_1: string;
  tagline_2: string;
  skills: SkillType[];
  thumbnail: string;
  pictures: string;
  child_hero_banner: string;
  link: string;
  has_testimonial: boolean;
  company_icon?: string;
  features_short?: string;
};

interface HomeSliderProps {
  portfolios: PortfolioType[];
  companyType: string;
}

// Config
const SLIDE_INTERVAL = 5000;
const PROGRESS_STEP = 100;
const SWIPE_THRESHOLD = 50;
const PRESS_DELAY = 200;

const HomeSlider: React.FC<HomeSliderProps> = ({ portfolios }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideHeight, setSlideHeight] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const [selectedPortfolioPictures, setSelectedPortfolioPictures] = useState<
    string[] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState<boolean[]>(
    Array(portfolios.length).fill(false)
  );

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isInViewport, setIsInViewport] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      elapsed += PROGRESS_STEP;
      setProgress((elapsed / SLIDE_INTERVAL) * 100);

      if (elapsed >= SLIDE_INTERVAL) {
        clearInterval(interval);
        setProgress(0);
        nextSlide();
      }
    }, PROGRESS_STEP);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isModalOpen, isInViewport, nextSlide]);

  // --- Swipe & Press ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isModalOpen) return;
    touchStartX.current = e.changedTouches[0].clientX;
    pressTimerRef.current = setTimeout(() => setIsPaused(true), PRESS_DELAY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isModalOpen) return;
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);

    setIsPaused(false);
    touchEndX.current = e.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX.current;
    if (distance > SWIPE_THRESHOLD) nextSlide();
    else if (distance < -SWIPE_THRESHOLD) prevSlide();
  };

  const handleMouseDown = () => !isModalOpen && setIsPaused(true);
  const handleMouseUp = () => !isModalOpen && setIsPaused(false);
  const handleMouseLeave = () => !isModalOpen && setIsPaused(false);

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

  // --- Dynamic Height ---
  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      setSlideHeight(slideRefs.current[currentSlide]!.offsetHeight);
    }
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
        className={`relative w-full transition-all duration-500 ease-in-out ${
          isInteracting ? "overflow-visible" : "overflow-hidden"
        }`}
        style={{ height: isInteracting ? "auto" : `${slideHeight}px` }}
      >
        {/* Slides */}
        <div
          className="flex items-start transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {portfolios.map((portfolio, index) => (
            <div
              key={portfolio.id || index}
              className="w-full flex-shrink-0 px-[1.5rem] bg-white rounded-[1rem] p-4 lg:p-8"
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
            >
              <PortfolioContent
                pauseSlider={() => setIsPaused(true)}
                resumeSlider={() => setIsPaused(false)}
                portfolio={portfolio}
                thumbnailToUse={
                  portfolio.title === "Velzon"
                    ? "/VelzonThumbnail.PNG"
                    : portfolio.thumbnail || "/images/dummy_port_img.webp"
                }
                listOfskills={[]}
                listOfdata={[]}
                skills={skillsGrouping(
                  portfolio.skills?.length < 15
                    ? portfolio.skills
                    : portfolio.skills?.slice(0, 15)
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
