"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const TestimonialSlider: React.FC = () => {
  // Slide data
  const slides = [
    {
      key: "slide1",
      badgeText: "Professional Experience",
      heading: "My Professional Career Journey",
      quote:
        "“Great Designer, does great work and is very flexible with change. if you’re a programmer and are looking for UI/UX designer is definitely well qualified for the job.”",
      clientName: "EaseMyKid",
      clientRole: "Project",
      clientImageSrc: "/images/cameron.png",
      projectLink: "https://cpasxsoft.com",
    },
    {
      key: "slide2",
      badgeText: "Client Satisfaction",
      heading: "Design Solutions for EaseMyKid",
      quote:
        "“The UI/UX designs helped bring our product to life, seamlessly integrating user-friendly features.”",
      clientName: "EaseMyKid",
      clientRole: "Project",
      clientImageSrc: "/images/cameron.png",
      projectLink: "https://cpasxsoft.com",
    },
    {
      key: "slide3",
      badgeText: "Collaboration",
      heading: "Crafting Unique User Experiences",
      quote:
        "“Highly collaborative and adaptive to our needs. Delivered designs that exceeded our expectations.”",
      clientName: "TechCorp",
      clientRole: "CEO",
      clientImageSrc: "/images/cameron.png",
      projectLink: "https://cpasxsoft.com",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch move/swipe
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (deltaX > 50) {
      goToNextSlide();
    } else if (deltaX < -50) {
      goToPrevSlide();
    }

    touchStartX.current = null;
  };

  return (
    <div
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
          <div key={index} className="min-w-full px-4">
            <div className="w-full hidden lg:block mb-[5rem]">
              {/* Badge */}
              <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border text-center max-w-max text-heading text-[1.4rem] font-medium">
                {slide.badgeText}
              </div>
              {/* Heading */}
              <div className="text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                {slide.heading}
              </div>
            </div>
            <div className="p-[2rem] lg:p-[4rem] bg-[rgba(255,255,255,0.2)] rounded-[1.2rem] w-full">
              {/* DoubleQuotes */}
              <Image
                src={"/images/DoubleQuotes.svg"}
                height={40}
                width={40}
                alt="Double Quotes"
              />
              <h3 className="text-[2rem] lg:text-[2.4rem] leading-[3.2rem] font-normal text-white my-[2rem]">
                {slide.quote}
              </h3>
              <hr className="h-[0.1rem] w-full bg-border mb-[2rem]" />
              {/* Testimonial Client Info */}
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h4 className="text-[2rem] font-normal">
                    {slide.clientName}
                  </h4>
                  <p className="text-[1.4rem] font-normal">
                    {slide.clientRole}
                  </p>
                </div>
                <div>
                  <Link
                    href={slide.projectLink}
                    className="flex items-center gap-[0.8rem] group"
                  >
                    <p className="text-[1.6rem] font-medium text-white">
                      Check Project
                    </p>
                    <img
                      src="./images/ArrowRight.svg"
                      alt="Arrow"
                      className="group-hover:translate-x-[1rem] duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full lg:flex items-center justify-between">
              {/* Client Info Box */}
              <div className="flex items-center gap-[1.5rem] mt-[3.2rem] mb-[2.4rem]">
                <Image
                  src={slide.clientImageSrc}
                  height={72}
                  width={72}
                  alt={slide.clientName}
                />
                <div className="lg:flex items-end">
                  <div>
                    <h3 className="text-[1.8rem] font-bold leading-[2.6rem] text-paragraph2">
                      {slide.clientName}
                    </h3>
                    <h4 className="text-[1.6rem] font-bold leading-[2.4rem] text-paragraph2">
                      {slide.clientRole}
                    </h4>
                  </div>
                  <hr className="hidden lg:block w-[0.1rem] h-[2.5rem] bg-border mx-[1rem]" />
                  {/* Link */}
                  <div className="flex items-center gap-[0.52rem]">
                    <Image
                      src={"./images/link.svg"}
                      height={18}
                      width={18}
                      alt="Link"
                    />
                    <Link
                      href={slide.projectLink}
                      className="text-[#1F4FE1] text-[1.6rem]"
                    >
                      {slide.projectLink}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center lg:justify-end w-full absolute bottom-[4rem] z-10">
        <div className="flex items-center gap-[1.2rem]">
          <div
            onClick={goToPrevSlide}
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-white flex items-center justify-center hover:bg-white group duration-300 cursor-pointer z-20"
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
            className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-white flex items-center justify-center hover:bg-white group duration-300 cursor-pointer z-20"
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

export default TestimonialSlider;
