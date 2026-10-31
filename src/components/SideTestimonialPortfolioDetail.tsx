import React, { useMemo, useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Instagram,  LinkedIn } from "./../components/SVGI-Icons";
// SVGI-Icons

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
  video: string; // Video URL
  thumbnail?: string; // Optional thumbnail URL from API
  Prototype?: Array<{ video?: string }>;
  upwork?: string;
  website_purpose?: string | null;
  twitter?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  designation: string;
  heading?: string;
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const videoSrcWithFragment = useMemo(() => `${src}#t=0.1`, [src]);

  return (
    <div className="relative rounded-[20px] overflow-hidden group">
      <video
        ref={videoRef}
        src={videoSrcWithFragment}
        poster={poster}
        className="w-full h-[30rem] lg:h-[35rem] object-cover"
        controls={isPlaying}
        muted
        playsInline
        preload="metadata"
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-full p-4 flex items-center justify-center hover:bg-white/70 transition-all z-10"
          aria-label="Play video"
        >
          <Play className="size-10 text-black" fill="black" />
        </button>
      )}
    </div>
  );
};

const SideTestimonialPortfolioDetail: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  designation,
  heading,
}) => {
  // Simplified: no Swiper here. Render the first testimonial for portfolio detail testing.

  // Memoize the first testimonial and derived values so rendering is fast
  const firstTestimonial = useMemo(() => (testimonials && testimonials.length > 0 ? testimonials[0] : null), [testimonials]);

  const processedReview = useMemo(() => {
    return firstTestimonial ? processReviewText(firstTestimonial.review_text, designation, "text-primary") : "";
  }, [firstTestimonial?.review_text, designation]);

  const resolvedVideoUrl = useMemo(() => {
    if (!firstTestimonial) return "";
    return firstTestimonial.video || firstTestimonial.Prototype?.[0]?.video || firstTestimonial.upwork || "";
  }, [firstTestimonial?.video, firstTestimonial?.Prototype, firstTestimonial?.upwork]);

  const thumbnail = useMemo(() => {
    if (!firstTestimonial) return "/images/placeholder-video.jpg";
    return firstTestimonial.thumbnail || firstTestimonial.client_pic || "/images/placeholder-video.jpg";
  }, [firstTestimonial?.thumbnail, firstTestimonial?.client_pic]);

  // Preload thumbnail to avoid layout shift when component appears
  useEffect(() => {
    if (thumbnail) {
      const img = new Image();
      img.src = thumbnail;
    }
  }, [thumbnail]);

  return (
    <section className="w-full">
      <div className="relative">
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[1.8rem] lg:text-[2.4rem] font-bold my-[2rem] font-Rubik capitalize">
            {heading}
          </h3>
        </div>

        {/* Render single testimonial (first) for portfolio detail testing */}
        {!firstTestimonial ? (
          // Skeleton to avoid layout shift / perceived delay
          <div className="flex flex-col gap-[1.5rem]">
            <div className="w-full lg:max-w-[40rem] h-[20rem] bg-gray-200/20 rounded-2xl animate-pulse" />
            <div className="bg-[#A3DDD3] dark:bg-bannerBG rounded-xl p-[1rem] backdrop-blur-xl animate-pulse h-[10rem]" />
          </div>
        ) : (
          <div className="">
            {/* Video Section */}
            <div className="w-full lg:max-w-[40rem]">
              {resolvedVideoUrl ? (
                <VideoPlayer src={resolvedVideoUrl} poster={thumbnail} />
              ) : (
                <img
                  src={thumbnail}
                  alt="No video available"
                  className="w-full aspect-auto h-auto object-cover"
                  loading="eager"
                />
              )}
            </div>
            <div className="mb-[3rem] mt-[2rem]">
              <div className="bg-[#A3DDD3] dark:bg-bannerBG rounded-xl 
              p-[1rem] backdrop-blur-xl">
                <img
                  src="/images/DoubleQuotes.svg"
                  className="size-[2rem] mb-[1rem]"
                  alt="quote"
                />
                <div
                  dangerouslySetInnerHTML={{ __html: processedReview }}
                  className="text-[1.2rem] lg:text-[1.5rem] leading-normal mb-0 text-paragraph1"
                />
              </div>

               <div className="mt-8 flex items-center gap-[1rem]">
                {/* Social Links */}
                <div className="flex items-center justify-center flex-col gap-[1rem]">
                  {firstTestimonial.linked_in && (
                    <a
                      href={firstTestimonial.linked_in}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 transition"
                    >
                      <LinkedIn className="size-[2.5em]" />
                    </a>
                  )}
                  {firstTestimonial.instagram && (
                    <a
                      href={firstTestimonial.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 transition"
                    >
                      <Instagram className="size-[2.5em]" />
                    </a>
                  )}
                </div>
                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={firstTestimonial.client_pic}
                    alt={firstTestimonial.client_name}
                    className="size-[7.2rem] lg:size-[7rem] rounded-[1rem]  object-cover border-2 border-black/20"
                  />
                  <div>
                    <div className="font-semibold text-primary text-[1.4rem]">
                      {firstTestimonial.client_name}
                    </div>
                    <div className="text-primary 
                    text-[1.4rem] lg:text-[1.6rem]">
                      <span className="">
                        {firstTestimonial.client_designation} @ 
                      </span>
                      {firstTestimonial.client_company_website && (
                        <>
                          <a
                            href={firstTestimonial.client_company_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary
                            font-medium"
                          >
                            {new URL(firstTestimonial.client_company_website).hostname.replace("www.", "")}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(SideTestimonialPortfolioDetail);