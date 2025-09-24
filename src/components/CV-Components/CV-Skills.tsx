"use client";
import React, { useState } from "react";
import Image from "next/image";

type Skill = {
  title: string;
  icon?: string;
  url?: string;
};

interface CVSkillsProps {
  skillsforCV: Record<string, Skill[]>; // grouped skills
  listOfdata?: { skills_ids?: string[] };
  initialVisibleItems?: number; // default visible skills count
}

const CVSkills: React.FC<CVSkillsProps> = ({
  skillsforCV,
  listOfdata,
  initialVisibleItems = 16,
}) => {
  const [showAll, setShowAll] = useState(false);

  const allSkills = Object.values(skillsforCV).flat();
  const visibleSkills = showAll
    ? allSkills
    : allSkills.slice(0, initialVisibleItems);

  return (
    <div className="print:mt-[4rem] w-full">
      {/* Title */}
      <h2 className="overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]">
        Skills
      </h2>

      <div className="flex flex-col items-center w-full">
        {/* Skills Grid */}
        <div
          className="
            grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 
            min-[1220px]:grid-cols-5 
            xl:grid-cols-8 2xl:grid-cols-8 print:grid-cols-5
            gap-[1rem] xl:gap-[1.5rem] 
            mx-auto justify-center items-center ml-[1rem] overflow-hidden"
        >
          {visibleSkills.map((skill, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.03}s` }}
              className="mx-auto mb-[2rem] xl:mb-[4rem] flex flex-col items-center justify-start gap-[0.4rem] xl:gap-[0.8rem] max-w-[15rem] lg:max-w-[19rem] w-full animate-fadeIn opacity-0"
            >
              {skill.icon && (
                <div className="flex items-center justify-center max-h-[6.4rem] max-w-[6.4rem] h-full w-full">
                  <Image
                    src={skill.icon}
                    alt={skill.title}
                    height={64}
                    width={64}
                    className="max-h-[6.4rem] max-w-[6.4rem] w-full h-full object-contain"
                  />
                </div>
              )}
              <p className="mt-[1.5rem] text-paragraph1 text-center line-clamp-1 text-[1.3rem] min-[500px]:text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                {skill.title}
              </p>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {listOfdata?.skills_ids?.length &&
          listOfdata.skills_ids.length > initialVisibleItems && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-[4rem] print:hidden py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight mx-auto"
            >
              {showAll ? "Show Less Skills" : "Show More Skills"}
            </button>
          )}
      </div>
    </div>
  );
};

export default CVSkills;
