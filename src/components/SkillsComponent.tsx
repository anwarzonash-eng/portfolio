"use client";

import React, { useState } from "react";
import Link from "next/link";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";

interface Skill {
  title: string;
  url?: string;
}

interface SkillsComponentProps {
  service: { skills?: Skill[] };
  skillsList: Skill[];
  index?: number;
}

const SkillsComponent = ({
  service,
  skillsList,
  index = 0,
}: SkillsComponentProps) => {
  const [showMoreSkills, setShowMoreSkills] = useState<boolean[]>([]);

  // Log input props to debug
  console.log("SkillsComponent props:", { service, skillsList, index });

  // Ensure skills is an array and handle showMoreSkills logic
  const skillsToDisplay = showMoreSkills[index]
    ? service?.skills || []
    : (service?.skills || []).slice(0, 15);

  console.log("Skills to display:", skillsToDisplay);

  // Group skills using the skillsGrouping hook
  const groupedSkills = skillsGrouping(skillsToDisplay);
  console.log("Grouped skills:", groupedSkills);

  return (
    <div className="px-[1rem] lg:px-[3rem] text-black list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem] print_AREAS_EXPERTISE">
      <h3>AREAS OF EXPERTISE I&apos;VE WORKED IN</h3>
      <div className="w-full flex-col items-start flex">
        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] my-[2.4rem] text-nowrap flex-wrap">
          {Array.isArray(groupedSkills) && groupedSkills.length > 0 ? (
            groupedSkills.map((group: Skill[], groupIndex: number) => (
              <React.Fragment key={`group-${groupIndex}`}>
                {group.map((skill: Skill, i: number) => {
                  const skillNumber = `${groupIndex + 1}.${i + 1}`;
                  console.log(`Rendering skill ${skillNumber}:`, skill);
                  return (
                    <Link
                      href={skill.url || "#"}
                      key={`${groupIndex}-${i}`}
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                        }}
                        className="hover:bg-primary capitalize print:!py-[1px] hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                      >
                        {skill?.title || "Unnamed Skill"}
                      </a>
                    </Link>
                  );
                })}
              </React.Fragment>
            ))
          ) : (
            <p>No skills available.</p>
          )}
        </div>
        <ShowmoreSkills
          props={{
            list: service?.skills || [],
            index,
            setShowMoreSkills,
            showMoreSkills,
          }}
        />
      </div>
    </div>
  );
};

export default SkillsComponent;
