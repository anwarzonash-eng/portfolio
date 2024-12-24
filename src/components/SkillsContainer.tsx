import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import React, { useState } from "react";

const SkillsContainer = ({ list }) => {
  const [showAll, setShowAll] = useState(false);

  // Number of items to display when "Show More" is not clicked (3 rows)
  const initialVisibleItems = 3 * 6; // Adjust for number of columns

  // Determine the skills to show based on the showAll state
  const visibleSkills = showAll ? list : list?.slice(0, initialVisibleItems);

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
      icon?: string;
    }[];
  } = skillsGrouping(visibleSkills);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-[1.5rem] mt-[6rem]">
        {Object?.values(skills)?.map((group, groupIndex) => (
          <>
            {group.map((skill, i) => (
              <div
                key={i}
                style={{
                  animationDelay: `${i * 0.03}s`,
                }}
                className="mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] max-w-[13rem] lg:max-w-[17rem] w-full animate-fadeIn opacity-0 "
              >
                {skill.icon && (
                  <div className="flex items-center justify-center h-[6.4rem] w-[6.4rem]">
                    <Image
                      src={skill?.icon}
                      alt={skill?.title}
                      height={64}
                      width={64}
                      className="object-cover rounded-full h-[6.4rem] w-[6.4rem]"
                    />
                  </div>
                )}
                <p className="mt-[1.5rem] text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                  {skill.title}
                </p>
              </div>
            ))}
          </>
        ))}
      </div>
      {list?.length > initialVisibleItems && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight mx-auto"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default SkillsContainer;
