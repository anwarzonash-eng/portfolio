"use client";
import React from "react";
import SkillsContainer from "@/components/SkillsContainer";
import type { SkillRef } from "@/types/api";

interface ToolsAndTechnologiesProps {
  sortedSkills: SkillRef[];
  skillsContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

/** "My Tools and Technologies" band (extracted verbatim from pages/portfolio-detail). */
const ToolsAndTechnologies = ({
  sortedSkills,
  skillsContainerRef,
}: ToolsAndTechnologiesProps) => (
  <article className="my-[6.4rem] bg-surface pt-16 border rounded-2xl">
    <div className="text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] text-center mb-20">
      The skills, tools and technologies I used in this project:
    </div>
    <div ref={skillsContainerRef}>
      <SkillsContainer
        list={sortedSkills}
        variant="portfolio"
        autoExpandOnParam={true}
        layoutType
      />
    </div>
  </article>
);

export default ToolsAndTechnologies;
