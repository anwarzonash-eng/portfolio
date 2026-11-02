"use client";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";
import type { Testimonial } from "@/types/api";

/**
 * Viewport-gated wrapper around TestimonialsSection.
 *
 * TestimonialsSection pulls in swiper + swiper/css (~44 KB gzipped) and always
 * sits below the fold, so neither the chunk nor the CSS needs to be in the
 * initial payload.
 *
 * The placeholder reproduces the real component's outer <section> and heading
 * verbatim rather than guessing a height. The heading is static copy, so the
 * only reserved space is the slide area, whose media is a fixed
 * h-[30rem] lg:h-[56rem] in the real component — mirrored here as a min-height
 * so the swap can only ever grow into slack, never collapse the box.
 */
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
});

interface TestimonialsSectionLazyProps {
  testimonials: Testimonial[];
  designation: string;
}

const TestimonialsSectionLazy = (props: TestimonialsSectionLazyProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  if (inView) return <TestimonialsSection {...props} />;

  return (
    <section
      ref={ref}
      className="w-full bg-primary dark:bg-sectionBG lg:px-[4rem]  lg:py-[8rem] px-0 py-[2rem] my-[8rem]"
    >
      <div className="mainContainer">
        <div className="px-3 lg:px-6 relative">
          {/* Heading — identical markup to TestimonialsSection */}
          <div className="flex flex-col gap-2 z-10 lg:absolute lg:top-[2rem]">
            <div className="max-lg:flex items-center justify-center">
              <div className="badge">Testimonials</div>
            </div>
            <h3 className="text-[2rem] lg:text-[3rem] font-medium text-white max-lg:text-center max-lg:my-[1.5rem]">
              See what my clients say about me
            </h3>
          </div>
          {/* Reserves the slide area so the swap does not shift the page */}
          <div
            className="w-full min-h-[30rem] lg:min-h-[56rem]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionLazy;
