import React, { useState, useEffect, useRef } from "react";
import PortfolioImagesLoader from "./PortfolioImagesLoader";

const PortfolioPopUp = ({ isModalOpen, closeModal, portfolioImages }) => {
  const images = portfolioImages.filter((src) => src !== null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloaded, setPreloaded] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const pressTimerRef = useRef(null);
  const thumbnailsContainerRef = useRef(null);

  // Scroll popup to top when modal opens
  // useEffect(() => {
  //   if (isModalOpen) {
  //     // Small delay ensures modal DOM is rendered
  //     const timeout = setTimeout(() => {
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //     }, 10);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isModalOpen]);

  // Auto-scroll thumbnails
  useEffect(() => {
    if (thumbnailsContainerRef.current) {
      const activeThumb =
        thumbnailsContainerRef.current.children[currentImageIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentImageIndex]);

  // Preload images when modal opens
  useEffect(() => {
    if (!preloaded && isModalOpen) {
      Promise.all(
        images.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
            })
        )
      ).then(() => setPreloaded(true));
    }
  }, [isModalOpen, preloaded]);

  // Auto-progress logic
  useEffect(() => {
    if (!isModalOpen) return;

    setProgress(0);
    let elapsed = 0;

    const interval = setInterval(() => {
      if (!isPaused) {
        elapsed += 100;
        setProgress((elapsed / 5000) * 100);

        if (elapsed >= 5000) {
          clearInterval(interval);
          setTimeout(() => nextImage(), 0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentImageIndex, isPaused, isModalOpen]);

  // Navigation
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Swipe handling
  const handleTouchStartSwipe = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
    pressTimerRef.current = setTimeout(() => setIsPaused(true), 200); // Long press pause (mobile)
  };

  const handleTouchEndSwipe = (e) => {
    clearTimeout(pressTimerRef.current);
    setIsPaused(false);
    touchEndX.current = e.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextImage();
    else if (distance < -50) prevImage();
  };

  // Mouse hold handlers (desktop pause on press)
  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  const handleMouseLeave = () => setIsPaused(false); // safety reset

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-2xl z-[550]"
          onTouchStart={handleTouchStartSwipe}
          onTouchEnd={handleTouchEndSwipe}
        >
          <div className="h-screen flex items-center justify-center">
            <div className="absolute inset-0" onClick={closeModal}></div>
            <div className="relative max-w-[35rem] lg:max-w-[1000px] w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
              {/* Progress bars */}
              <div className="absolute top-0 left-0 w-full flex gap-[4px] p-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className="h-[4px] flex-1 bg-gray-300 rounded overflow-hidden"
                  >
                    <div
                      className="h-full bg-primary transition-all duration-100"
                      style={{
                        width:
                          index < currentImageIndex
                            ? "100%"
                            : index === currentImageIndex
                            ? `${progress}%`
                            : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {preloaded ? (
                <div className="relative flex flex-col items-center justify-center">
                  {/* Prev Button */}
                  <div
                    className="rounded-[50%] h-[50px] w-[50px] flex items-center justify-center bg-[#EFF5FD] hover:bg-primary flex-shrink-0 group duration-300 cursor-pointer shadow-xl absolute left-[-3.5rem] top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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

                  {/* Main Image (pause on hold) */}
                  <img
                    src={images[currentImageIndex]}
                    alt="Slide"
                    className="h-[342px] lg:h-[450px] w-full object-contain object-center"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Next Button */}
                  <div
                    className="rounded-[50%] h-[50px] w-[50px] flex items-center justify-center bg-[#EFF5FD] hover:bg-primary flex-shrink-0 group duration-300 cursor-pointer shadow-xl absolute right-[-3.5rem] top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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

                  {/* Thumbnails (pause on hold too) */}
                  <div
                    ref={thumbnailsContainerRef}
                    className="flex gap-[10px] mt-4 overflow-x-auto max-w-full scrollbar-hidden"
                  >
                    {images.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Thumbnail ${index}`}
                        onClick={() => setCurrentImageIndex(index)}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        className={`h-40 w-40 object-contain object-center rounded-[8px] cursor-pointer border-2 flex-shrink-0 ${
                          index === currentImageIndex
                            ? "border-primary"
                            : "border-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <style jsx global>{`
                    .scrollbar-hidden::-webkit-scrollbar {
                      display: none;
                    }
                    .scrollbar-hidden {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}</style>
                </div>
              ) : (
                <PortfolioImagesLoader />
              )}

              {/* Close Button */}
              <button
                className="absolute top-[-4rem] lg:top-[-3rem] right-[15rem] lg:right-[-3rem] text-black bg-border text-[1.2rem] h-[3rem] w-[3rem] rounded-full"
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
