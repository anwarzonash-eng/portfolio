"use client";

import React from "react";
import type { ProfileReport, SkillRef } from "@/types/api";

interface PortfolioDetailKeyModuleProps {
  portfolioDetails: {
    features_long?: string | null;
  } | null;
  filteredSkills?: SkillRef[];
  listOfdata?: ProfileReport | null;
  modulesFeaturesHeading?: string;
  modifiedContent: (
    html: string | null | undefined,
    filteredSkills: SkillRef[],
    listOfdata: ProfileReport | null
  ) => string;
}

const PortfolioDetailKeyModule: React.FC<PortfolioDetailKeyModuleProps> = ({
  portfolioDetails,
  filteredSkills,
  listOfdata,
  modifiedContent,
  modulesFeaturesHeading
}) => {
  return (
    <div className="w-full  limit-height-portfolio-detail px-[2rem]">
      <h2 className="text-primary text-center text-[4rem] font-semibold my-[2rem] capitalize">
        {modulesFeaturesHeading}
      </h2>

      <div
        className="text-[1.8rem] mt-[3rem]"
        dangerouslySetInnerHTML={{
          __html: modifiedContent(
            portfolioDetails?.features_long || "",
            filteredSkills,
            listOfdata
          ),
        }}
      />
    </div>
  );
};

export default PortfolioDetailKeyModule;
