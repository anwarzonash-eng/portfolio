"use client";
import React from "react";
import HomeSlider from "@/components/Sliders/HomeSlider";
import type { Portfolio, ProfileReport } from "@/types/api";

interface HomeWorkSliderProps {
  listOfdata: ProfileReport | null;
  uniqueList: Portfolio[];
  highlightedPortfolioId: string | null;
}

/** The "My Work" slider section (extracted verbatim from pages/home). */
const HomeWorkSlider = ({
  listOfdata,
  uniqueList,
  highlightedPortfolioId,
}: HomeWorkSliderProps) => {
  if (
    !(
      listOfdata &&
      listOfdata.portfolios_ids &&
      listOfdata.portfolios_ids.length > 0
    )
  )
    return null;

  return (
    <section
      id="myWork"
      className="w-full  bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:bg-none dark:bg-surfaceMuted pt-[4rem] lg:pt-[7rem] pb-[4rem] mb-[3.5rem] lg:mb-[7rem] print_p_m print:!pt-[3rem] print:bg-[#a3ddd3] print:break-before-page print:h-screen "
    >
      <div className="mainContainer   my-[5rem] print:my-[1rem] ">
        <div className="flex items-center justify-center lg:hidden">
          <div className="badge">My Work</div>
        </div>

        <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
          Explore My Technical Endeavor
        </div>

        <HomeSlider
          portfolios={uniqueList}
          highlightedPortfolioId={highlightedPortfolioId}
        />
      </div>
    </section>
  );
};

export default HomeWorkSlider;
