"use client";
import React from "react";
import SkillsContainer from "@/components/SkillsContainer";
import type { ProfileReport, SkillRef } from "@/types/api";

interface HomeSkillsSectionProps {
  listOfdata: ProfileReport | null;
  sortedSkills: SkillRef[];
  heading: string;
}

/** The "skillSection" band (extracted verbatim from pages/home). */
const HomeSkillsSection = ({
  listOfdata,
  sortedSkills,
  heading,
}: HomeSkillsSectionProps) => {
  if (!(listOfdata && listOfdata?.skills_ids?.length > 0)) return null;

  return (
    <div
      id="skillSection"
      className="pt-20 mb-0 print:!pt-[4rem] print:my-[0rem] my-[5rem]  print:h-screen print:break-before-page break-before-avoid print:bg-[#a3ddd3] bg-surface"
    >
      <div className="flex items-center justify-center mt-[2rem] lg:hidden mb-20">
        <div id="skills_ids" className="badge capitalize">
          {heading}
        </div>
      </div>

      <div
        className="text-center text-heading text-[2.4rem] xl:text-[3rem]
                      font-medium leading-[2.8rem] mt-[2rem] hidden lg:block capitalize mb-[2rem] lg:mb-[6rem] "
      >
        {heading}
      </div>

      <SkillsContainer
        list={sortedSkills}
        variant="default"
        autoExpandOnParam={true}
      />
    </div>
  );
};

export default HomeSkillsSection;
