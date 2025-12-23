import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowLeft, ArrowRight, Link, Pause, Play } from "lucide-react";
import { Facebook, Instagram, Twitter, LinkedIn } from "../SVGI-Icons";

import { processReviewText } from "@/hooks/processReviewText";

// Define the TypeScript interface based on your backend data
interface Testimonial {
  client_company: string;
  client_company_website: string;
  client_designation: string;
  designation: string;
  client_name: string;
  client_pic: string;
  id: string;
  linked_in: string;
  instagram: string;
  portfolio_id: number;
  review_text: string;
  video: string; // We'll extract from Prototype[0].video or upwork
  Prototype?: Array<{ video?: string }>;
  upwork?: string;
  website_purpose?: string | null;
  twitter?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  designation: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  designation
}) => {
  const swiperRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeBtn, setActiveBtn] = useState<"prev" | "next" | null>(null);

  const togglePause = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      if (isPaused) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
      }
      setIsPaused(!isPaused);
    }
  };

  return (
    <section className="w-full bg-primary lg:px-[4rem]  lg:py-[8rem] px-0 py-[2rem] my-[8rem]">
      <div className="mainContainer">
        <div className="px-3 lg:px-6 relative">
          {/* Heading */}
          <div className="flex flex-col gap-2 z-10 lg:absolute lg:top-[2rem]">
            <div className="max-lg:flex items-center justify-center">
              <div className="badge">Testimonials</div>
            </div>
            <h3 className="text-[2rem] lg:text-[3rem] font-medium text-white max-lg:text-center max-lg:my-[1.5rem]">
              See what my clients say about me
            </h3>
          </div>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            speed={800}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {testimonials.map((t) => {
              const processedReview = useMemo(() => {
                return processReviewText(
                  t.review_text,
                  designation
                );
              }, [t.review_text, designation]);
              // Extract video URL: prefer Prototype[0].video → fallback to upwork
              const videoThumb =
                t.Prototype?.[0]?.video || t.upwork || "/placeholder-video.jpg";

              return (
                <SwiperSlide key={t.id}>
                  <div className="flex flex-col-reverse lg:flex-row gap-[2rem] lg:gap-[5rem] items-end justify-center">
                    {/* Left Side: Info Container */}
                    <div className="flex-1 mb-[3rem]">
                      <div className="bg-white/20 rounded-xl p-[1rem] lg:p-[2rem] text-white  backdrop-blur-xl">
                        <img
                          src="/images/DoubleQuotes.svg"
                          className="size-[30px] mb-[1rem]"
                          alt="quote"
                        />
                        <div
                          dangerouslySetInnerHTML={{ __html: processedReview }}
                          className="text-[1.4rem] lg:text-[2.5rem] leading-normal  mb-0"
                        />

                        {/* <hr className="mb-[2rem] border-white/40" /> */}

                        {/* <div className="flex justify-between items-center">
                          <div>
                            <div className="text-[1.6rem] text-white font-medium">
                              {t.client_company}
                            </div>
                            <div className="text-[1.3rem] opacity-80">
                              Client Company
                            </div>
                          </div>
                          <ArrowRight className="text-white size-6" />
                        </div> */}
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center gap-4">
                          <img
                            src={t.client_pic}
                            alt={t.client_name}
                            className="size-[7.2rem] lg:size-[6rem] rounded-[1rem]  object-cover border-2 border-white/20"
                          />
                          <div>
                            <div className="font-semibold text-white text-[1.4rem]">
                              {t.client_name}
                            </div>
                            <div className="flex max-lg:flex-col">
                              <span className="text-[1.4rem] text-white">
                                {t.client_designation}
                              </span>
                              {t.client_company_website && (
                                <>
                                  <span className="hidden lg:inline-block mx-[1rem] text-white font-medium text-[1.4rem]">
                                    |
                                  </span>
                                  <a
                                    href={t.client_company_website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#5981fa] underline  items-center gap-[1rem] inline-flex text-[1.4rem] lg:text-[1.6rem]"
                                  >
                                    <Link className="size-[1.4rem]" />
                                    {new URL(
                                      t.client_company_website
                                    ).hostname.replace("www.", "")}
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-[1rem]">
                          {/* LinkedIn Link (if available) */}
                          {t.linked_in && (
                            <a
                              href={t.linked_in}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-emerald-300 transition"
                            >
                              <LinkedIn className="size-[3em]" />
                            </a>
                          )}
                          {/* Instagram Link (if available) */}
                          {t.instagram && (
                            <a
                              href={t.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-emerald-300 transition"
                            >
                              <Instagram className="size-[3em]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Video Container */}
                    <div className="w-full lg:max-w-[40rem]">
                      <div className="relative rounded-[20px] overflow-hidden group">
                        <video
                          src={t.video}
                          className="w-full h-[30rem] lg:h-[56rem] object-cover"
                          muted
                          playsInline
                          controls={true} // Set to true if you want visible controls
                          // poster={t.client_pic || "/placeholder-thumbnail.jpg"} // Optional: thumbnail before play
                          preload="metadata" // Loads only metadata initially (faster page load)
                        ></video>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Play/Pause/Next/Prev Buttons */}
          {testimonials.length > 1 && (
            <div className=" absolute left-1/2 -translate-x-1/2  z-10 w-full flex items-center justify-center gap-[2rem] lg:bottom-[3rem] bottom-[-1rem]">
              {/* Play/Pause Button - Centered Below Slider */}
              <div className="flex justify-center">
                <button
                  onClick={togglePause}
                  className="size-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  {isPaused ? (
                    <Play className="text-white size-7 ml-1" fill="white" />
                  ) : (
                    <Pause className="text-white size-7" />
                  )}
                </button>
              </div>

              {/* Desktop Navigation Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    swiperRef.current?.slidePrev();
                    setActiveBtn("prev");
                    setTimeout(() => setActiveBtn(null), 300);
                  }}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                    activeBtn === "prev"
                      ? "bg-white text-black border-white"
                      : "border-white text-white hover:bg-white/10"
                  }`}
                >
                  <ArrowLeft className="size-5" />
                </button>

                <button
                  onClick={() => {
                    swiperRef.current?.slideNext();
                    setActiveBtn("next");
                    setTimeout(() => setActiveBtn(null), 300);
                  }}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                    activeBtn === "next"
                      ? "bg-white text-black border-white"
                      : "border-white text-white hover:bg-white/10"
                  }`}
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
