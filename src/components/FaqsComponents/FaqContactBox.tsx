"use client";
import React from "react";
import { scrollToSection } from "@/hooks/scrollToSection";
import type { RoutesInfo } from "@/hooks/url";

/** The "Find your answer here?" contact box beside the FAQ list (extracted verbatim from Faqs.tsx). */
const FaqContactBox = ({ urlInfo }: { urlInfo?: RoutesInfo | null }) => (
  <div className="bg-primary rounded-[2rem] flex items-center justify-between flex-col overflow-hidden h-[27rem] lg:h-[40.7rem] md:max-w-[35.7rem] w-full relative">
    <div className="text-paragraph2 pt-[2rem] lg:pt-[3rem] pl-[2rem]">
      <h4 className="pb-[2rem] text-[2.4rem] lg:text-[3rem] font-medium leading-[3.6rem]">
        Find your <br /> answer here{urlInfo?.u ? "." : "?"}
      </h4>
      {!urlInfo?.u && (
        <p className="text-[1.8rem] font-normal leading-[2.6rem]">
          No worries, You can share your queries over here.
        </p>
      )}
    </div>
    {!urlInfo?.u && (
      <button
        onClick={() => scrollToSection("contact")}
        className="bg-radial-gradient bg-primary mb-[34px]  max-w-[320px] rounded-[0.6rem] text-onPrimary py-[1rem] px-[3rem] xl:py-[2rem] xl:px-[5.6rem] text-[1.8rem] font-medium border border-solid border-surface hover:bg-surface hover:text-primary duration-300 w-full"
      >
        Contact Me
      </button>
    )}
  </div>
);

export default FaqContactBox;
