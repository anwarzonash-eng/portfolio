"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioImagesLoader from "../PortfolioImagesLoader";
import PortfolioPopUp from "../PortfolioPopUp";
import { skillsGrouping } from "@/hooks/skillsGrouping";

const HomeSlider = ({ portfolios, companyType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const slideInterval = 80000;
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isPaused && portfolios?.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, portfolios]);

  const openModal = (pictures, thumbnail, child_hero_banner) => {
    const portfolioImages = JSON.parse(pictures);
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

  const adjustedCurrentSlide = currentSlide + 1;
  const totalSlides = portfolios.length;

  // Infinite behavior using cloning
  const displaySlides = [
    portfolios[totalSlides - 1],
    ...portfolios,
    portfolios[0],
  ];

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-[3rem]">
      <div className="relative w-full overflow-x-hidden lg:h-[610px] h-full">
        {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
          <PortfolioPopUp
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            portfolioImages={selectedPorfolioPicturesforPopup}
          />
        )}

        {/* Slider Container */}
        <div
          className="flex items-center transition-all duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${adjustedCurrentSlide * 100}%)` }}
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {displaySlides.map((portfolio, index) => {
            const skills = skillsGrouping(
              portfolio?.skills?.length < 15
                ? portfolio?.skills
                : portfolio?.skills?.slice(0, 15)
            );

            return (
              <div
                key={index}
                className="w-full flex-shrink-0 px-[1.5rem] h-full"
              >
                <div className="h-full flex items-center justify-center">
                  <div className="flex flex-col-reverse lg:flex-row  items-stretch bg-white rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden h-full w-full">
                    {/* Content Section */}
                    <div className="p-[2rem] lg:p-[3.5rem] w-full lg:w-1/2 print:w-full overflow-y-auto hide-scrollbar flex items-start justify-between flex-col">
                      <div className="flex items-start w-full flex-col">
                        <div className="flex gap-[2rem] mb-[2rem]">
                          {/* {portfolio?.company_icon && (
                        <div className="bg-primary p-[1.8rem] lg:p-[2.4rem] rounded-[1.6rem]">
                          <Image
                            src={portfolio?.company_icon}
                            alt="Case"
                            height={34}
                            width={34}
                            className="h-[2.5rem] w-[2.5rem] lg:h-[3.4rem] lg:w-[3.4rem] rounded-[1.6rem]"
                          />
                        </div>
                      )} */}
                          <Link href={`/portfolio/${portfolio.id}`}>
                            <h1 className="flex items-center text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading">
                              {portfolio.title}
                            </h1>
                          </Link>
                        </div>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: portfolio.tagline_1,
                          }}
                          className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem] line-clampforTagline1 basicLineClamp"
                        ></p>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: portfolio.tagline_2,
                          }}
                          className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem] line-clamp basicLineClamp"
                        ></p>

                        <div className="text-black text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium my-[2rem]">
                          AREAS OF EXPERTISE I'VE WORKED IN:
                          <div className="w-full flex flex-col items-start  ">
                            <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] my-[2rem] text-nowrap flex-wrap">
                              {Object?.values(skills)?.map(
                                (group, groupIndex) => (
                                  <React.Fragment key={groupIndex}>
                                    {group.map((skill, i) => {
                                      // Calculate the skill number (groupIndex+1).(i+1)
                                      const skillNumber = `${groupIndex + 1}.${
                                        i + 1
                                      }`;

                                      return (
                                        <Link
                                          href={skill.url || "#"}
                                          legacyBehavior
                                          key={`${groupIndex}-${i}`}
                                        >
                                          <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                              animationDelay: `${i * 0.1}s`,
                                            }}
                                            className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                          >
                                            {/* <span className=" bg-primary text-white group-hover:bg-white group-hover:text-primary text-[0.8rem] pt-[1.5px] font-bold rounded-full size-[21px] flex items-center justify-center">
      {skillNumber}
    </span> */}
                                            {skill?.title}
                                          </a>
                                        </Link>
                                      );
                                    })}
                                  </React.Fragment>
                                )
                              )}
                            </div>
                            {portfolio?.skills?.length > 15 && (
                              <Link
                                href={`/portfolio/${portfolio.id}?scroll=skills`}
                                className="bg-primary text-white print:hidden border border-transparent py-[0.4rem] px-[2rem] hover:bg-white hover:text-primary hover:border-primary hover:border text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]"
                              >
                                See More
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <hr className="w-full mt-[2.4rem] h-px bg-border" /> */}

                      <div className="flex print:hidden  items-center  flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem]">
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
                            className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem]"
                          >
                            Check Client Testimonial
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 print:w-full  w-full flex flex-col items-center justify-center p-4">
                      {portfolio?.thumbnail && (
                        <div className="relative w-full h-[300px] lg:h-[400px] rounded-[1.2rem] overflow-hidden">
                          <Image
                            src={
                              portfolio?.thumbnail ||
                              "/images/dummy_port_img.webp"
                            }
                            alt="Project Image"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-[1.2rem] cursor-pointer"
                            onClick={() =>
                              openModal(
                                portfolio?.pictures,
                                portfolio?.thumbnail,
                                portfolio?.child_hero_banner
                              )
                            }
                          />
                        </div>
                      )}
                      <button
                        className="text-white py-[6px] mt-[17px] print:hidden px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative"
                        onClick={() =>
                          openModal(
                            portfolio?.pictures,
                            portfolio?.thumbnail,
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
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
      </div>
      <div className="flex print:hidden items-center justify-center w-full mt-4">
        <div className="flex items-center justify-center gap-[1.2rem]">
          <div
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary group duration-300 cursor-pointer"
            onClick={prevSlide}
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
                className="stroke-primary group-hover:stroke-white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.5 5.25L3.75 12L10.5 18.75"
                className="stroke-primary group-hover:stroke-white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary group duration-300 cursor-pointer"
            onClick={nextSlide}
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
                className="stroke-primary group-hover:stroke-white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 5.25L20.25 12L13.5 18.75"
                className="stroke-primary group-hover:stroke-white"
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

export default HomeSlider;
