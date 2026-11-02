"use client";
import React from "react";
import Portfoliodetailbg from "@/components/portfoliodetailbg";
import type { Portfolio } from "@/types/api";

/** Hero banner with the project title (extracted verbatim from pages/portfolio-detail). */
const PortfolioHero = ({
  portfolioDetails,
}: {
  portfolioDetails: Portfolio | null;
}) => (
  <section className="mainContainer w-full lg:h-[90rem] relative overflow-hidden">
    <Portfoliodetailbg />
    <div className="mainContainer w-full flex items-center justify-center flex-col text-center pt-[6.5rem] pb-[8rem] relative z-20 ">
      <div className="flex items-center text-white text-[1.4rem] leading-[2rem] font-medium">
      </div>
      <h1 className="text-[4rem] lg:text-[6rem] leading-[5rem] lg:leading-[8rem] font-medium break-all text-white mt-[1.6rem] mb-[2.4rem]">
        {portfolioDetails?.title}
      </h1>
    </div>
  </section>
);

export default PortfolioHero;
