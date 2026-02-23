import React, { useMemo, useRef, useState } from "react";
import { Link, Play } from "lucide-react";
import { LinkedIn, Instagram } from "../../SVGI-Icons";
import { processReviewText } from "@/hooks/processReviewText";

interface Testimonial {
  client_company: string;
  client_company_website: string;
  client_designation: string;
  client_name: string;
  client_pic: string;
  id: string;
  linked_in?: string;
  instagram?: string;
  review_text: string;
  video?: string;
  thumbnail?: string;
  Prototype?: Array<{ video?: string }>;
  upwork?: string;
}

interface HomeTestimonialSectionProps {
  testimonials: Testimonial[];
  designation: string; // This is required for processReviewText
  hideLinks?: boolean;
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
    <div className="relative rounded-3xl overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrcWithFragment}
        poster={poster}
        className="w-full aspect-auto h-[55rem] object-cover"
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
          <Play className="text-black size-7 ml-1" fill="black" />
        </button>
      )}
    </div>
  );
};

const HomeTestimonialSection: React.FC<HomeTestimonialSectionProps> = ({
  testimonials,
  designation,
  hideLinks,
}) => {
  // Use only the first testimonial
  const testimonial = testimonials[0];

  if (!testimonial) {
    return null;
  }

  // Properly process the review text with the designation
  const processedReview = useMemo(() => {
    return processReviewText(testimonial.review_text, designation);
  }, [testimonial.review_text, designation]);

  const companyDomain = testimonial.client_company_website
    ? new URL(testimonial.client_company_website).hostname.replace("www.", "")
    : "";

  const videoUrl = testimonial.video;
  // Prefer Prototype[0].video -> upwork -> video
  const resolvedVideoUrl =
    testimonial.Prototype?.[0]?.video || testimonial.upwork || testimonial.video || "";

  const thumbnail = testimonial.thumbnail || testimonial.client_pic || "/images/placeholder-video.jpg";

  return (
    <section className="w-full bg-primary px-16 py-32 h-screen flex items-center justify-center">
      {/* Testimonial Layout */}
      <div className="flex gap-20 items-start">
        {/* Client Info Side */}
        <div className="flex flex-col justify-between">
          {/* Heading */}
          <div className="mb-[2rem] text-left">
            <div className="badge mb-[1rem] inline-block">Testimonials</div>
            <h3 className="text-[2rem] font-medium text-white">
              See what my clients say about me
            </h3>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-12 text-white">
            <img
              src="/images/DoubleQuotes.svg"
              alt="quote"
              className="w-[3rem] h-[3rem] mb-[1rem] opacity-80"
            />
            <div
              dangerouslySetInnerHTML={{ __html: processedReview }}
              className="text-[2rem] leading-relaxed font-light"
            />
          </div>

          {/* Client Info */}
          <div className="mt-[2rem] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={testimonial.client_pic}
                alt={testimonial.client_name}
                className="w-[9rem] h-[9rem] rounded-2xl object-cover border-4 border-white/20"
              />
              <div>
                <h4 className="text-[2rem] font-semibold text-white">
                  {testimonial.client_name}
                </h4>
                <div className="text-[1.4rem] text-white/90 flex items-center justify-center">
                  <span className="inline-block mr-[0.5rem]">
                    {testimonial.client_designation} {" @ "}
                  </span>
                  {testimonial.client_company_website && !hideLinks ? (
                    <>
                      <a
                        href={testimonial.client_company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline inline-flex items-center gap-2 hover:text-blue-300"
                      >
                        <Link className="w-[1.4rem] h-[1.4rem]" />
                        {companyDomain}
                      </a>
                    </>
                  ) : testimonial.client_company_website && hideLinks ? (
                    <span className="text-white">{companyDomain}</span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Social Links */}
            {!hideLinks && (
              <div className="flex gap-4">
                {testimonial.linked_in && (
                  <a
                    href={testimonial.linked_in}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-300 transition"
                  >
                    <LinkedIn className="w-[4rem] h-[4rem]" />
                  </a>
                )}
                {testimonial.instagram && (
                  <a
                    href={testimonial.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-300 transition"
                  >
                    <Instagram className="w-[4rem] h-[4rem]" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Video Side Completed*/}
        <div className="min-w-[40rem]">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {resolvedVideoUrl ? (
              <VideoPlayer src={resolvedVideoUrl} poster={thumbnail} />
            ) : (
              <img
                src={thumbnail}
                alt="No video available"
                className="w-full aspect-auto h-[55rem] object-cover"
                loading="eager"
              />
            )}
          </div>
        </div>



      </div>
    </section>
  );
};

export default HomeTestimonialSection;
