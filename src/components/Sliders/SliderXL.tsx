"use client";
import React, { useState } from "react";

const SliderXL = () => {
  const images = [
    "/images/SliderXLImage.png",
    "/images/SliderXLImage.png",
    "/images/SliderXLImage.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[36rem]  lg:h-[99rem] overflow-visible">
      {/* Wrapper with overflow-visible */}
      <div className="relative w-full h-full overflow-hidden rounded-[1.6rem] shadow-lg">
        {/* Slider container */}
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[36rem] lg:h-[99rem] flex-shrink-0 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Display on Less Then XL Devices */}
      <div className="xl:hidden flex items-center justify-center gap-[2rem] mt-[2rem]">
        <button
          onClick={prevSlide}
          className="bg-white rounded-full shadow-md focus:outline-none inline-flex items-center justify-center h-[5rem] w-[5rem] xl:h-[7.2rem] xl:w-[7.2rem]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M20.25 12.0127H3.75"
              stroke="#00473C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 5.2627L3.75 12.0127L10.5 18.7627"
              stroke="#00473C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="bg-white rounded-full shadow-md focus:outline-none inline-flex items-center justify-center h-[5rem] w-[5rem] xl:h-[7.2rem] xl:w-[7.2rem]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M3.75 12.0127H20.25"
              stroke="#00473C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5 5.2627L20.25 12.0127L13.5 18.7627"
              stroke="#00473C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Display on XL Devices */}
      {/* Navigation buttons positioned with overflow-visible  */}
      <button
        onClick={prevSlide}
        className="absolute hidden xl:inline-flex xl:top-1/2 xl:left-[-3.6rem] xl:transform xl:-translate-y-1/2 bg-white rounded-full shadow-md focus:outline-none  items-center justify-center  h-[5rem] w-[5rem] xl:h-[7.2rem] xl:w-[7.2rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M20.25 12.0127H3.75"
            stroke="#00473C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 5.2627L3.75 12.0127L10.5 18.7627"
            stroke="#00473C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute hidden xl:inline-flex xl:top-1/2 xl:right-[-3.6rem] xl:transform xl:-translate-y-1/2 bg-white rounded-full shadow-md focus:outline-none items-center justify-center h-[5rem] w-[5rem] xl:h-[7.2rem] xl:w-[7.2rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M3.75 12.0127H20.25"
            stroke="#00473C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 5.2627L20.25 12.0127L13.5 18.7627"
            stroke="#00473C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SliderXL;
