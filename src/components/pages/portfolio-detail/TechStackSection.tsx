"use client";
import React from "react";

interface TechStackSectionProps {
  heading: string;
  techStacksRef: React.MutableRefObject<HTMLHeadingElement | null>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  fullFeaturesHtml: string | null;
  defaultTruncatedHtml: string | null;
  featuresItemCount: number;
}

/** The truncatable "Tech Stacks" HTML block (extracted verbatim from pages/portfolio-detail). */
const TechStackSection = ({
  heading,
  techStacksRef,
  isExpanded,
  setIsExpanded,
  fullFeaturesHtml,
  defaultTruncatedHtml,
  featuresItemCount,
}: TechStackSectionProps) => (
  <div className="w-full my-[6.4rem]">
    <h2
      ref={techStacksRef}
      id="tech-stacks-heading"
      className="text-primary text-center text-[2rem] xl:text-[4rem] font-semibold mb-[2rem] xl:mb-[3rem]"
    >
      {heading}
    </h2>
    <div className="w-full relative">
      <div
        id="tech-stacks"
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? fullFeaturesHtml || ""
            : defaultTruncatedHtml || "",
        }}
        className="w-full list-div text-[2rem] leading-[3.2rem] text-paragraph1 font-normal"
      ></div>

      {/* Read More Button: show only if > 15 items */}
      {featuresItemCount > 15 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setIsExpanded((s) => !s)}
            className="text-onPrimary py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  </div>
);

export default TechStackSection;
