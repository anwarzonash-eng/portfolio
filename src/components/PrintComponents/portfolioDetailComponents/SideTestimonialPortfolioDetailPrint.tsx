import type { Testimonial } from "@/types/api";
import React, { useMemo, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Instagram,  LinkedIn } from "@/components/SVGI-Icons";

import { processReviewText } from "@/hooks/processReviewText";


interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  designation: string;
  hideLinks?: boolean;
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
        className="w-full h-[28rem] object-cover"
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

const SideTestimonialPortfolioDetailPrint: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  designation,
  hideLinks,
  heading
}) => {
  // Simplified: no Swiper here. Render the first testimonial for portfolio detail testing.

  // For print: assume data is ready when this component is rendered.
  if (!testimonials || testimonials.length === 0) return null;

  const t = testimonials[0];
  const processedReview = processReviewText(t.review_text, designation, "text-primary");
  const resolvedVideoUrl = t.video || t.Prototype?.[0]?.video || t.upwork || "";
  const thumbnail = t.thumbnail || t.client_pic || "/images/placeholder-video.jpg";

  return (
    <section className="w-full">
      <div className="relative">
        {/* Heading */}
        <div className="flex flex-col">
          <h3 className="text-[1.8rem] font-semibold my-[1rem] font-Rubik leading-normal">
            {heading}
          </h3>
        </div>

        {/* Render single testimonial (first) for portfolio print - fixed styling */}
        <div>
          {/* Video Section */}
          <div className="w-full">
            {resolvedVideoUrl ? (
              <VideoPlayer src={resolvedVideoUrl} poster={thumbnail} />
            ) : (
              <img
                src={thumbnail}
                alt="No video available"
                className="w-full h-[20rem] object-cover"
                loading="eager"
              />
            )}
          </div>
          <div className="mb-[3rem] mt-[2rem]">
            <div className="bg-[#a3ddd3] rounded-xl p-[1rem] h-[17.5rem] overflow-hidden">
              <img
                src="/images/DoubleQuotes.svg"
                className="size-[1.5rem] mb-[0.5rem]"
                alt="quote"
              />
              <div
                dangerouslySetInnerHTML={{ __html: processedReview }}
                className="text-[1.4rem] leading-normal mb-0 text-paragraph1 line-clamp-6"
              />
            </div>

            <div className="mt-[1rem] flex items-center gap-[1rem] mb-[-3rem]">
              {/* Social Links */}
              <div className="flex items-center flex-col gap-[1rem]">
                {t.linked_in && (
                  <a
                    href={t.linked_in}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition"
                  >
                    <LinkedIn className="size-[2.5rem]" />
                  </a>
                )}
                {t.instagram && (
                  <a
                    href={t.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition"
                  >
                    <Instagram className="size-[2.5rem]" />
                  </a>
                )}
              </div>
              {/* Client Info */}
              <div className="w-full grid grid-cols-[auto,1fr] gap-[1rem] items-center">
                <img
                  src={t.client_pic}
                  alt={t.client_name}
                  className="size-[6.5rem] rounded-[1rem] object-cover border-2 border-black/20 mt-[1.4rem]"
                />
                <div>
                  <div className="font-semibold text-primary text-[1.4rem]">
                    {t.client_name}
                  </div>
                  <div className="text-primary text-[1.4rem]">
                    {t.client_designation} @ 
                    {t.client_company_website && !hideLinks ? (
                      <a
                        href={t.client_company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium"
                      >
                        {new URL(t.client_company_website).hostname.replace("www.", "")}
                      </a>
                    ) : (
                      <p
                        className="font-medium"
                      >
                        {new URL(t.client_company_website).hostname.replace("www.", "")}
                      </p>
                    )
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SideTestimonialPortfolioDetailPrint);