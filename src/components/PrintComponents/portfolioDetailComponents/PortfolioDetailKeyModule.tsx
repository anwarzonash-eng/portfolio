"use client";

import React from "react";

interface PortfolioDetailKeyModuleProps {
  portfolioDetails: {
    features_long?: string | null;
  } | null;
  filteredSkills?: any;
  listOfdata?: any;
  modifiedContent: (
    html: string | null | undefined,
    filteredSkills: any,
    listOfdata: any
  ) => string;
}

const PortfolioDetailKeyModule: React.FC<PortfolioDetailKeyModuleProps> = ({
  portfolioDetails,
  filteredSkills,
  listOfdata,
  modifiedContent,
}) => {
  return (
    <div className="w-full  limit-height-portfolio-detail px-[2rem]">
      <h2 className="text-primary text-center text-[4rem] font-semibold my-[2rem]">
        Features & Modules
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
