import React from "react";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useState } from "react";
import Link from "next/link";
import ShowmoreSkills from "./showmoreSkills";

const SkillsComponent = ({ service, skillsList, index = 0 }) => {
  const [showMoreSkills, setShowMoreSkills] = useState([]);

  console.log("Service inside the SkillsComponent:", service)

  const skills: {
    [key: string]: {
      id?: {
      id?: string;
      title?: string;
      category?: string;
      url?: string;
    };
      title?: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(
    showMoreSkills[index] ? service?.skills : service?.skills?.slice(0, 15)
  );
  return (
    <div className="px-[1rem] lg:px-[3rem] text-black list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem]  font-normal lg:font-medium mb-[2rem] print_AREAS_EXPERTISE ">
      AREAS OF EXPERTISE I'VE WORKED IN
      <div className="w-full flex-col items-start flex ">
        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] my-[2.4rem] text-nowrap flex-wrap">
          {Object?.values(skills)?.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.map((skill, i) => {
                // Calculate the skill number (groupIndex+1).(i+1)
                const skillNumber = `${groupIndex + 1}.${i + 1}`;

                return (
                  <Link
                    href={skill.url || "#"}
                    legacyBehavior
                    key={`${groupIndex}-${i}`}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        animationDelay: `${i * 0.03}s`,
                      }}
                      className="hover:bg-primary capitaliz  print:!py-[1px] hover:text-white text-center text-primary text-[1.3rem] font-medium  py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                    >
                      {skill?.id?.title}
                    </a>
                  </Link>
                );
              })}
            </React.Fragment>
          ))}{" "}
        </div>
        <ShowmoreSkills
          props={{
            list: service?.skills,
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
