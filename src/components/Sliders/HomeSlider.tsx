'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLoader from 'next/dist/client/page-loader';
import PortfolioImagesLoader from '../PortfolioImagesLoader';

const HomeSlider = ({ portfolios }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const slideInterval = 3000; // Change slide every 3 seconds

  useEffect(() => {
    if (!isPaused && portfolios?.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, portfolios]);

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
    portfolios[totalSlides - 1], // Clone the last slide to the front for seamless transition
    ...portfolios,
    portfolios[0], // Clone the first slide to the end
  ];

  return (
    <div className='relative w-full overflow-hidden'>
      {/* Slider Container */}
      <div
        className='flex items-center transition-all duration-700 ease-in-out'
        style={{ transform: `translateX(-${adjustedCurrentSlide * 100}%)` }}
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displaySlides.map((portfolio, index) => (
          <div
            key={index}
            className='w-full flex-shrink-0 my-[6rem] overflow-hidden'
          >
            <div className='w-full flex items-center justify-center'>
              <div className='flex flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden'>
                {/* Content */}
                <div className='lg:py-[6.4rem] lg:pl-[6.4rem] pr-[2rem] w-full'>
                  <div className='bg-primary p-[1.8rem] lg:p-[2.4rem] rounded-[1.6rem] inline-block max-lg:my-[2rem] lg:mb-[3.2rem]'>
                    <Image
                      src={portfolio.company_icon}
                      alt='Case'
                      height={34}
                      width={34}
                      className='h-[2.5rem] w-[2.5rem] lg:h-[3.4rem] lg:w-[3.4rem] rounded-[1.6rem]'
                    />
                  </div>
                  {/* Heading */}
                  <h1 className='text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading'>
                    {portfolio.title}
                  </h1>
                  {/* Para */}
                  <p className='text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem]'>
                    {portfolio.tagline_1}
                  </p>
                  <p className='text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem]'>
                    {portfolio.tagline_2}
                  </p>
                  {/* Skills Badges */}
                  <div className='flex items-center gap-[1rem] lg:gap-[0.7rem] mt-[3.4rem] mb-[3.2rem] text-nowrap flex-wrap'>
                    {portfolio.skills.map((skill, idx) => (
                      <Link
                        href={skill?.url || '#'}
                        key={idx}
                        className='hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]'
                      >
                        {skill.title}
                      </Link>
                    ))}
                  </div>
                  {/* Links */}
                  <div className='flex items-center flex-wrap text-nowrap max-md:flex-col max-md:items-start'>
                    <Link
                      href={portfolio.link}
                      target='_blank'
                      className='text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold'
                    >
                      Check Online
                    </Link>
                    <span className='inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden'>
                      /
                    </span>
                    <Link
                      href={`/portfolio-detail?portfolio_id=${portfolio.id}`}
                      className='text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold'
                    >
                      View Details
                    </Link>
                    {portfolio.has_testimonial && (
                      <>
                        <span className='inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden'>
                          /
                        </span>
                        <Link
                          href='#'
                          className='text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold'
                        >
                          Check Client Testimonial
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                {/* Image */}
                <div className='rounded-[1.2rem] lg:max-w-[70rem] w-full relative top-0 lg:right-[-1rem] xl:flex-shrink-0 flex items-center'>
                  <Image
                    src={portfolio.child_hero_banner}
                    alt='Project Image'
                    height={800}
                    width={800}
                    className='object-contain lg:pr-[6.4rem] rounded-[1.2rem] w-full h-full max-h-[55.2rem]'
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation UI Buttons */}
      <div className='flex items-center justify-center w-full'>
        <div className='flex items-center justify-center gap-[1.2rem]'>
          <div
            className='rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary group duration-300 cursor-pointer'
            onClick={prevSlide}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M20.25 12H3.75'
                className='stroke-primary group-hover:stroke-white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10.5 5.25L3.75 12L10.5 18.75'
                className='stroke-primary group-hover:stroke-white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div
            className='rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary group duration-300 cursor-pointer'
            onClick={nextSlide}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M3.75 12H20.25'
                className='stroke-primary group-hover:stroke-white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M13.5 5.25L20.25 12L13.5 18.75'
                className='stroke-primary group-hover:stroke-white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
