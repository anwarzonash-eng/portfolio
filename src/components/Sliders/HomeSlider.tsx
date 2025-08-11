"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioImagesLoader from "../PortfolioImagesLoader";
import PortfolioPopUp from "../PortfolioPopUp";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  // Add any other portfolio properties you use
};

interface HomeSliderProps {
  portfolios: PortfolioType[];
  companyType: string;
}

const HomeSlider: React.FC<HomeSliderProps> = ({ portfolios, companyType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideInterval = 3000;
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isPaused && portfolios?.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, portfolios]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolios.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + portfolios.length) % portfolios.length
    );
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (!portfolios || portfolios.length === 0) {
    return <PortfolioImagesLoader />;
  }
  const [showAllSkills, setShowAllSkills] = useState(false);
  const adjustedCurrentSlide = currentSlide + 1;
  const totalSlides = portfolios.length;

  // Infinite behavior using cloning
  const displaySlides = [
    portfolios[totalSlides - 1],
    ...portfolios,
    portfolios[0],
  ];

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-[3rem] print:m-0">
      <div className="relative w-full overflow-x-hidden print:overflow-x-hidden print:my-[4rem] lg:h-[610px] print:h-[610px] h-full">
        {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
          <PortfolioPopUp
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            portfolioImages={selectedPorfolioPicturesforPopup}
          />
        )}

        {/* Slider Container */}
        <div
          className="flex items-center  transition-all duration-700 ease-in-out h-full print:h-full"
          style={{ transform: `translateX(-${adjustedCurrentSlide * 100}%)` }}
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {(typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("print").matches
            ? displaySlides.slice(0, 2)
            : displaySlides
          )
            .filter((portfolio, index, self) =>
              portfolio.title === "Beyond Competitions"
                ? self.findIndex((p) => p.title === "Beyond Competitions") ===
                  index
                : true
            )
            .map((portfolio, index) => {
              const skills = skillsGrouping(
                portfolio?.skills?.length < 15
                  ? portfolio?.skills
                  : portfolio?.skills?.slice(0, 15)
              ) as Record<string, SkillType[]>;

              return (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-[1.5rem] h-full"
                >
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col-reverse lg:flex-row items-stretch bg-white rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden h-full w-full">
                      {/* Content Section */}
                      <div className="p-[2rem] lg:p-[3.5rem] w-full lg:w-1/2 print:w-full  flex items-start justify-between flex-col">
                        <div className="flex items-start w-full flex-col justify-between h-full">
                          <div>
                            <div className="flex gap-[2rem] mb-[2rem]">
                              <Link href={`/portfolio/${portfolio.id}`}>
                                <h1 className="flex items-center text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading">
                                  {portfolio.title}
                                </h1>
                              </Link>
                            </div>
                            <div className="h-[234px] overflow-auto custom-scrollbar">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: portfolio.tagline_1,
                                }}
                                className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem] line-clampforTagline1 basicLineClamp"
                              ></p>

                              {/* <p
                                dangerouslySetInnerHTML={{
                                  __html: portfolio.tagline_2,
                                }}
                                className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem] line-clamp basicLineClamp"
                              ></p> */}
                              {/* New */}
                              <div>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: portfolio.tagline_2,
                                  }}
                                  className={`text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem] basicLineClamp transition-all duration-300 ${
                                    isExpanded ? "" : "line-clamp-4"
                                  }`}
                                ></p>
                                {/* Toggle button */}
                                <button
                                  onClick={() => setIsExpanded(!isExpanded)}
                                  // className="text-primary font-medium mt-2 underline"
                                  className="bg-primary text-white print:hidden border border-transparent py-[0.4rem] px-[2rem] hover:bg-white hover:text-primary hover:border-primary hover:border text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem] mt-2"
                                >
                                  {isExpanded ? "Read less" : "Read more"}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-black text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium my-[2rem]">
                            AREAS OF EXPERTISE I'VE WORKED IN:
                            <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] my-[2rem] text-nowrap flex-wrap">
                              {Object.values(skills)
                                .flat()
                                .slice(0, showAllSkills ? undefined : 8)
                                .map((skill: SkillType, i: number) => (
                                  <Link
                                    href={skill.url || "#"}
                                    legacyBehavior
                                    key={`skill-${i}`}
                                  >
                                    <a
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        animationDelay: `${i * 0.1}s`,
                                      }}
                                      className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                    >
                                      {skill?.title}
                                    </a>
                                  </Link>
                                ))}
                              {Object.values(skills).flat().length > 8 && (
                                <button
                                  onClick={() =>
                                    setShowAllSkills(!showAllSkills)
                                  }
                                  className="bg-primary text-white print:hidden border border-transparent py-[0.4rem] px-[2rem] hover:bg-white hover:text-primary hover:border-primary hover:border text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]"
                                >
                                  {showAllSkills ? "Show Less" : "See More"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex  items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem]">
                          <Link
                            href={`/portfolio/${portfolio.id}`}
                            className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem]"
                          >
                            View Details
                          </Link>
                          {companyType !== "leewop" && (
                            <Link
                              href={portfolio?.link}
                              className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-lg:w-full text-center"
                            >
                              Launch Project - Live Preview
                            </Link>
                          )}
                          {portfolio?.has_testimonial == true && (
                            <Link
                              href={"#"}
                              className="text-white print:hidden py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem]"
                            >
                              Check Client Testimonial
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="lg:w-1/2 print:w-full w-full flex flex-col items-center justify-center p-4">
                        {portfolio?.thumbnail &&
                          (() => {
                            const thumbnailToUse =
                              portfolio?.title === "Velzon"
                                ? "/VelzonThumbnail.PNG"
                                : portfolio?.thumbnail ||
                                  "/images/dummy_port_img.webp";

                            return (
                              <>
                                <div className="relative w-full h-[300px] lg:h-[400px] rounded-[1.2rem] overflow-hidden">
                                  <Image
                                    src={thumbnailToUse}
                                    onClick={() =>
                                      openModal(
                                        portfolio?.pictures,
                                        thumbnailToUse,
                                        portfolio?.child_hero_banner
                                      )
                                    }
                                    alt="Project Image"
                                    fill
                                    // style={{ objectFit: "contain" }}
                                    // className="rounded-[1.2rem] cursor-pointer"
                                    sizes=" 100vw, 30rem"
                                    className="rounded-[1.2rem] object-fill w-full !h-[300px] lg:!h-[400px]"
                                  />
                                </div>
                                <button
                                  className="text-white py-[6px] mt-[17px] print:hidden px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative"
                                  onClick={() =>
                                    openModal(
                                      portfolio?.pictures,
                                      thumbnailToUse,
                                      portfolio?.child_hero_banner
                                    )
                                  }
                                >
                                  <span className="relative z-10 flex items-center justify-center gap-2">
                                    Explore the Gallery
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </button>
                              </>
                            );
                          })()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <Link
        href="/"
        className="text-white hidden  py-[2rem] px-[6.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem]"
      >
        View More
      </Link> */}
      {/* Navigation Buttons */}
      <div className="flex print:hidden items-center justify-center w-full">
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
