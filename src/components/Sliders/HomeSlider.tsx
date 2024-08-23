import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const HomeSlider: React.FC = () => {
  const slides = [
    {
      title: "EaseMyKid - Education Learning Management System",
      description:
        "EaseMyKid is an education, courses, and online (LMS) learning management system Figma template designed for people who want to start teaching online, create an LMS etc.",
      skills: ["AWS", "React", "jQuery", "Bootstrap 5", "HTML"],
      imgSrc: "/images/AnaysisImage.png",
      logoSrc: "/images/Rocket.svg",
      logoBG: "bg-[#005CE8]",
      link: "/",
    },
    {
      title: "EaseMyKid - Education Learning Management System",
      description:
        "EaseMyKid is an education, courses, and online (LMS) learning management system Figma template designed for people who want to start teaching online, create an LMS etc.",
      skills: ["AWS", "React", "jQuery", "Bootstrap 5", "HTML"],
      imgSrc: "/images/ProjectImage.png",
      logoSrc: "/images/case.svg",
      logoBG: "bg-[#FCDC2A]",
      link: "/",
    },
    {
      title: "EaseMyKid - Education Learning Management System",
      description:
        "EaseMyKid is an education, courses, and online (LMS) learning management system Figma template designed for people who want to start teaching online, create an LMS etc.",
      skills: ["AWS", "React", "jQuery", "Bootstrap 5", "HTML"],
      imgSrc: "/images/AnaysisImage.png",
      logoSrc: "/images/Rocket.svg",
      logoBG: "bg-[#005CE8]",
      link: "/",
    },

    // Add more slides if needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const slideInterval = 3000; // Change slide every 3 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex items-center transition-all duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        ref={sliderRef}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="w-full my-[6rem] flex items-center justify-center">
              <div className="flex flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden">
                {/* Content */}
                <div className="lg:py-[6.4rem] lg:pl-[6.4rem] w-full">
                  <div
                    className={` ${slide.logoBG} p-[1.8rem] lg:p-[2.4rem] rounded-[1.6rem] inline-block max-lg:my-[2rem] lg:mb-[3.2rem]`}
                  >
                    <Image
                      src={slide.logoSrc}
                      alt="Case"
                      height={34}
                      width={34}
                      className="h-[2.5rem] w-[2.5rem] lg:h-[3.4rem] lg:w-[3.4rem]"
                    />
                  </div>
                  {/* Heading */}
                  <h1 className="text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading">
                    {slide.title}
                  </h1>
                  {/* Para */}
                  <p className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem]">
                    {slide.description}
                  </p>
                  {/* Skills Badges */}
                  <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] mt-[3.4rem] mb-[3.2rem] text-nowrap flex-wrap">
                    {slide.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="flex items-center flex-wrap text-nowrap max-md:flex-col max-md:items-start">
                    <Link
                      href={"/"}
                      className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                    >
                      Check Online
                    </Link>
                    <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                      /
                    </span>
                    <Link
                      href={"/"}
                      className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                    >
                      View Details
                    </Link>
                    <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                      /
                    </span>
                    <Link
                      href={"/"}
                      className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                    >
                      Check Client Testimonial
                    </Link>
                  </div>
                </div>
                {/* Image */}
                <div className="lg:max-w-[70rem] w-full relative top-0 lg:right-[-1rem]  xl:flex-shrink-0">
                  <Image
                    src={slide.imgSrc}
                    alt="Project Image"
                    height={800}
                    width={800}
                    className="object-cover  w-full h-full max-h-[55.2rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation UI Buttons Sample */}
      <div className="flex items-center justify-center w-full  ">
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
