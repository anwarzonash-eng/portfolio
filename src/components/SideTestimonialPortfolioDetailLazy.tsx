"use client";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";
import type { Testimonial } from "@/types/api";

/**
 * Viewport-gated wrapper around SideTestimonialPortfolioDetail.
 *
 * The component carries a custom video player and sits in the portfolio-detail
 * sidebar, below the fold. The print build uses a separate component
 * (SideTestimonialPortfolioDetailPrint), so deferring here cannot affect PDF
 * capture.
 *
 * The placeholder reuses the component's own loading skeleton markup verbatim,
 * so the reserved box matches what the real component renders before its
 * testimonial resolves.
 */
const SideTestimonialPortfolioDetail = dynamic(
  () => import("./SideTestimonialPortfolioDetail"),
  { ssr: false },
);

interface SideTestimonialPortfolioDetailLazyProps {
  testimonials: Testimonial[];
  designation: string;
  heading?: string;
}

const SideTestimonialPortfolioDetailLazy = (
  props: SideTestimonialPortfolioDetailLazyProps,
) => {
  const { ref, inView } = useInView<HTMLElement>();

  if (inView) return <SideTestimonialPortfolioDetail {...props} />;

  return (
    <section ref={ref} className="w-full">
      <div className="relative">
        <div className="flex flex-col gap-2">
          <h3 className="text-[1.8rem] lg:text-[2.4rem] font-bold my-[2rem] font-Rubik capitalize">
            {props.heading}
          </h3>
        </div>
        {/* Same skeleton the real component shows before a testimonial resolves */}
        <div className="flex flex-col gap-[1.5rem]">
          <div className="w-full lg:max-w-[40rem] h-[20rem] bg-gray-200/20 rounded-2xl animate-pulse" />
          <div className="bg-[#A3DDD3] dark:bg-bannerBG rounded-xl p-[1rem] backdrop-blur-xl animate-pulse h-[10rem]" />
        </div>
      </div>
    </section>
  );
};

export default SideTestimonialPortfolioDetailLazy;
