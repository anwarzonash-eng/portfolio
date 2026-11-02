"use client";
import { useInView } from "@/hooks/useInView";
import type { ProfileReport } from "@/types/api";

/**
 * Custom Video Player Section.
 *
 * The markup is a plain <video> element, so there is no JS bundle cost here —
 * the weight is the media file. Because the element is autoplaying and had no
 * `preload` hint, the browser began downloading the video during initial page
 * load, competing with critical resources for bandwidth.
 *
 * The <source> is therefore attached only once the section nears the viewport,
 * and `preload="none"` stops the browser from fetching ahead of that. The
 * wrapper keeps the video's exact height at both breakpoints, so the box is
 * reserved up front and the swap cannot shift the page.
 */
const HomeVideoSection = ({
  listOfdata,
}: {
  listOfdata: (ProfileReport & { video_attached?: { videoURL?: string } }) | null;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const videoURL = listOfdata?.video_attached?.videoURL;

  if (!videoURL) return null;

  return (
    <div
      ref={ref}
      className="w-full mb-[10rem] xl:mb-[12rem] mainContainer print:hidden "
    >
      {inView ? (
        <video
          autoPlay
          muted
          loop
          controls
          playsInline
          preload="none"
          className="rounded-xl h-[40rem] lg:h-[70rem] w-full object-cover"
        >
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        /* Same height as the video, so no shift when it mounts */
        <div
          className="rounded-xl h-[40rem] lg:h-[70rem] w-full bg-sectionBG"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default HomeVideoSection;
