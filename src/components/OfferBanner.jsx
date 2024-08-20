"use client";

import React from "react";
import CharacterAnimation from "./CharacterAnimation";

const OfferBanner = () => {
  return (
    <div className="max-[1100px]:hidden bg-[#FCDC2A] w-full">
      <div className="mainContainer px-[2rem] h-[6.4rem] w-full flex items-center justify-between gap-[1.6rem]">
        {/* I Place it in Div BCZ later i will animate this */}
        <div className="flex items-center gap-1">
          <div className="text-heading text-[1.8rem] hidden min-[1122px]:block">
            <CharacterAnimation text="Subscribe for FREE 2-Week Development TRIAL!" />
          </div>
          <div className="text-heading text-[1.8rem] min-[1122px]:hidden">
            <CharacterAnimation text="Get Free Development Trial!" />
          </div>
          <div className="mb-2">
            <img src="./images/offerBannerStars.svg" />
          </div>
        </div>

        <div className="relative">
          {/* Positioned Text svg */}
          <div className="absolute left-[-26rem] ">
            <img src="./images/limmitedOfferText.svg" alt="" />
          </div>
          {/* Positioned Arrow Svg */}
          <div className="absolute left-[-11rem] top-[-1rem]">
            <img src="./images/offerBannerArrow.svg" alt="" />
          </div>
          <form className="w-[380px] h-[4.5rem] bg-white/50 rounded flex items-center">
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-transparent h-full w-full py-[1.7rem] px-[1.8rem] text-[1.6rem] outline-none text-heading placeholder:text-heading"
            />
            <button className="h-full px-[3.4rem] font-medium text-[1.6rem] primaryGradient rounded-[0.6rem] text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
