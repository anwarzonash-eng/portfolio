// New Popup
import React, { useState, useEffect, useRef } from 'react';
import WebsiteLoader from './WebsiteLoader';
import PortfolioImagesLoader from './PortfolioImagesLoader';

const PortfolioPopUp = ({ isModalOpen, closeModal, portfolioImages }) => {
  const images = portfolioImages.filter((src) => src !== null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloaded, setPreloaded] = useState(false);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaded && isModalOpen) {
      preloadImages();
    }
  }, [isModalOpen, preloaded]);

  useEffect(() => {
    // Scroll the selected thumbnail into view
    if (thumbnailsContainerRef.current) {
      const thumbnail = thumbnailsContainerRef.current.children[
        currentImageIndex
      ] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [currentImageIndex]);

  const preloadImages = () => {
    const promises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      });
    });

    Promise.all(promises).then(() => {
      setPreloaded(true);
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full  bg-opacity-50 backdrop-blur-2xl z-[500]'>
          <div className='min-h-screen flex items-center justify-center'>
            <div
              className='absolute inset-0'
              onClick={closeModal} // Close modal on background click
            ></div>
            <div className='relative max-w-[35rem] lg:max-w-[800px] w-full mx-auto bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300'>
              {preloaded ? (
                <>
                  {/* Desktop Navigation buttons */}
                  <div className='relative flex items-center justify-center'>
                    <div
                      className='rounded-[50%] h-[5.6rem] w-[5.6rem] hidden lg:flex items-center justify-center bg-white hover:bg-primary group duration-300 cursor-pointer absolute left-[1rem] shadow-xl'
                      onClick={prevImage}
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

                    <img
                      src={images[currentImageIndex]}
                      alt='Slide'
                      className='h-[342px] lg:h-[400px] w-full object-cover object-center'
                    />

                    <div
                      className='rounded-[50%] h-[5.6rem] w-[5.6rem] hidden lg:flex items-center justify-center bg-white hover:bg-primary group duration-300 cursor-pointer absolute right-[1rem] shadow-xl '
                      onClick={nextImage}
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

                  {/* Desktop Images */}
                  {/* <div className='mt-4 hidden lg:flex justify-between gap-[1.5rem] overflow-hidden'>
                    {images.map((src, index) => (
                      <div key={index} className='relative'>
                        <img
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          className={`max-h-[140px] max-w-[200px] h-full w-full object-cover cursor-pointer flex-shrink-0 ${
                            currentImageIndex === index
                              ? 'opacity-50'
                              : 'opacity-100'
                          } transition-opacity duration-300`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                        {currentImageIndex === index && (
                          <div className='absolute inset-0 bg-primary opacity-50 rounded-lg'></div>
                        )}
                      </div>
                    ))}
                  </div> */}

                  {/* Mobile Images */}
                  <div className='mt-4 flex flex-col items-center'>
                    {/* Thumbnail Scroll */}
                    <div
                      ref={thumbnailsContainerRef}
                      className='flex overflow-x-auto scrollbar-hidden w-full mb-[2rem] lg:mb-0'
                    >
                      {images.map((src, index) => (
                        <div
                          key={index}
                          className='relative flex-shrink-0 mr-4'
                          style={{ width: '146px', height: '90px' }}
                        >
                          <img
                            src={src}
                            alt={`Thumbnail ${index + 1}`}
                            className={`h-full w-full object-cover cursor-pointer ${
                              currentImageIndex === index
                                ? 'opacity-50'
                                : 'opacity-100'
                            } transition-opacity duration-300`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                          {currentImageIndex === index && (
                            <div className='absolute inset-0 bg-primary opacity-50 rounded-lg'></div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className='lg:hidden flex justify-center w-full gap-[2rem] mb-[1rem] bg-white'>
                      <div
                        className='rounded-[50%] h-[50px] w-[50px] flex items-center justify-center bg-[#EFF5FD] hover:bg-primary group duration-300 cursor-pointer shadow-xl'
                        onClick={prevImage}
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
                        className='rounded-[50%] h-[50px] w-[50px] flex items-center justify-center bg-[#EFF5FD] hover:bg-primary group duration-300 cursor-pointer shadow-xl'
                        onClick={nextImage}
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

                  <style jsx global>{`
                    /* Hide scrollbar for WebKit browsers */
                    .scrollbar-hidden::-webkit-scrollbar {
                      display: none;
                    }

                    /* Hide scrollbar for Firefox */
                    .scrollbar-hidden {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}</style>
                </>
              ) : (
                <PortfolioImagesLoader />
              )}

              <button
                className='absolute top-[-4rem] lg:top-[-3rem] right-[15rem] lg:right-[-3rem] text-black bg-border text-[1.2rem] h-[3rem] w-[3rem] rounded-[50%]'
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioPopUp;
