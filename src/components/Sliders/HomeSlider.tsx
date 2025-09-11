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

  const [selectedPortfolioPictures, setSelectedPortfolioPictures] = useState<
    string[] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState<boolean[]>(
    Array(portfolios.length).fill(false)
  );

  // Swipe tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback loader
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
    if (isPaused || isModalOpen) return;

    setProgress(0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += PROGRESS_STEP;
      setProgress((elapsed / SLIDE_INTERVAL) * 100);

      if (elapsed >= SLIDE_INTERVAL) {
        clearInterval(interval);
        nextSlide();
      }
    }, PROGRESS_STEP);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isModalOpen, nextSlide]);

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

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-[3rem] relative">
      <div className="relative w-full overflow-hidden transition-all duration-500 ease-in-out h-auto">
        {/* Modal */}
        {isModalOpen && selectedPortfolioPictures && (
          <PortfolioPopUp
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            portfolioImages={selectedPortfolioPictures}
          />
        )}

        {/* Progress Bars */}
        <div className="absolute top-0 left-0 w-full flex gap-[4px] p-2 z-20">
          {portfolios.map((_, index) => (
            <div
              key={index}
              className="h-[4px] flex-1 bg-gray-300 rounded overflow-hidden"
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

        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
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
            >
              <PortfolioContent
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
      </div>

      {/* Navigation */}
      {!isModalOpen && (
        <>
          <button
            className=" absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-20 
                       rounded-full h-[5.6rem] w-[5.6rem] border-2 border-primary 
                       hidden xl:flex items-center justify-center hover:bg-primary hover:text-white 
                       text-primary transition-colors duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-20 
                       rounded-full h-[5.6rem] w-[5.6rem] border-2 border-primary 
                       hidden xl:flex items-center justify-center hover:bg-primary hover:text-white 
                       text-primary transition-colors duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
    </div>
  );
};

export default HomeSlider;
