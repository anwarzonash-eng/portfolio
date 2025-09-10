"use client";
import React, { useState, useEffect, useRef } from "react";
import PortfolioImagesLoader from "../PortfolioImagesLoader";
import PortfolioPopUp from "../PortfolioPopUp";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PortfolioContent from "../PortfolioContent";

// Define types
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

const HomeSlider: React.FC<HomeSliderProps> = ({ portfolios }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideInterval = 5000; // 5s per slide
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState<boolean[]>(
    Array(portfolios.length).fill(false)
  );

  // Progress bar state
  const [progress, setProgress] = useState(0);

  // Swipe + hold tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (!portfolios || portfolios.length === 0) {
    return <PortfolioImagesLoader />;
  }

  const openModal = (
    pictures: string,
    thumbnail: string,
    child_hero_banner: string
  ) => {
    const portfolioImages = JSON.parse(pictures) as string[];
    const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
    setSelectedPorfolioPicturesforPopup(allImages);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % portfolios.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + portfolios.length) % portfolios.length
    );

  // Auto-progress (Instagram style)
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    let elapsed = 0;

    const interval = setInterval(() => {
      if (!isPaused) {
        elapsed += 100;
        setProgress((elapsed / slideInterval) * 100);

        if (elapsed >= slideInterval) {
          clearInterval(interval);
          nextSlide();
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    pressTimerRef.current = setTimeout(() => setIsPaused(true), 200);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    setIsPaused(false);
    touchEndX.current = e.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  // Mouse hold (pause)
  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-[3rem] print:m-0">
      <div className="relative w-full overflow-hidden print:my-[4rem] h-full">
        {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
          <PortfolioPopUp
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            portfolioImages={selectedPorfolioPicturesforPopup}
          />
        )}

        {/* Progress bars */}
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

        {/* Slider Container */}
        <div
          className="flex items-center transition-all duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {portfolios.map((portfolio, index) => {
            const skills = skillsGrouping(
              portfolio?.skills?.length < 15
                ? portfolio?.skills
                : portfolio?.skills?.slice(0, 15)
            ) as Record<string, SkillType[]>;

            return (
              <div
                key={index}
                className="w-full flex-shrink-0 px-[1.5rem] h-full bg-white rounded-[1rem] overflow-hidden p-4 lg:p-8"
              >
                <div className="h-full flex items-center justify-center">
                  <PortfolioContent
                    portfolio={portfolio}
                    thumbnailToUse={
                      portfolio?.title === "Velzon"
                        ? "/VelzonThumbnail.PNG"
                        : portfolio?.thumbnail || "/images/dummy_port_img.webp"
                    }
                    listOfskills={[]} // 🔹 Replace if needed
                    listOfdata={[]} // 🔹 Replace if needed
                    skills={skills}
                    index={index}
                    showMoreSkills={showMoreSkills}
                    setShowMoreSkills={setShowMoreSkills}
                    openModal={openModal}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="hidden lg:flex  items-center justify-center w-full">
        <div className="flex items-center justify-center gap-[1.2rem]">
          <div
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary hover:text-white text-primary group duration-300 cursor-pointer"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-8 h-8 " />
          </div>
          <div
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary hover:text-white text-primary group duration-300 cursor-pointer"
            onClick={nextSlide}
          >
            <ChevronRight className="w-8 h-8 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
