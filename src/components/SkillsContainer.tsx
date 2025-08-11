import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import React, { useState } from "react";

// Define the skill type
type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

// Define the props type for the component
interface SkillsContainerProps {
  list: SkillType[] | undefined | null;
}

const SkillsContainer: React.FC<SkillsContainerProps> = ({ list }) => {
  const [showAll, setShowAll] = useState(false);

  // Number of items to display by default
  const initialVisibleItemsLarge = 3 * 6;
  const initialVisibleItemsSmall = 3 * 3;

  // Determine the skills to show based on screen size and showAll state
  const visibleSkills = showAll
    ? list
    : list?.slice(
        0,
        typeof window !== "undefined" && window.innerWidth >= 1024
          ? initialVisibleItemsLarge
          : initialVisibleItemsSmall
      );

  // Explicitly type the skills object
  const skills: Record<string, SkillType[]> = skillsGrouping(
    visibleSkills || []
  );

  return (
    <div className="flex flex-col print:w-full items-center justify-center">
      {/* Normal View Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-[1.5rem] mt-[6rem] print:hidden">
        {Object.values(skills).map((group: SkillType[], groupIndex: number) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill: SkillType, i: number) => (
              <div
                key={`${groupIndex}-${i}`}
                style={{
                  animationDelay: `${i * 0.03}s`,
                }}
                className="mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] max-w-[13rem] lg:max-w-[17rem] w-full animate-fadeIn opacity-0"
              >
                {skill.icon && (
                  <div className="flex items-center justify-center h-[6.4rem] w-[6.4rem]">
                    <Image
                      src={skill.icon}
                      alt={skill.title}
                      height={64}
                      width={64}
                      className="object-cover rounded-full h-[6.4rem] w-[6.4rem]"
                    />
                  </div>
                )}
                <p className="mt-[1.5rem] text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                  {skill.title == "Nest.js" ? "NestJs" : skill.title}
                </p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Print View Grid - Always shows all skills in 3 columns */}
      <div className="hidden w-full print:grid print:grid-cols-10 items-center justify-center print:gap-[1.5rem] print:mt-[2rem]">
        {list &&
          Object.values(skillsGrouping(list)).map(
            (group: SkillType[], groupIndex: number) => (
              <React.Fragment key={`print-${groupIndex}`}>
                {group.map((skill: SkillType, i: number) => (
                  <div
                    key={`print-${groupIndex}-${i}`}
                    className="mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] print:gap-0 max-w-[13rem] w-full print:opacity-100"
                  >
                    {skill.icon && (
                      <div className="flex items-center justify-center h-[6.4rem] w-[6.4rem]">
                        <Image
                          src={skill.icon}
                          alt={skill.title}
                          height={64}
                          width={64}
                          className="object-cover rounded-full h-[6rem] w-[6rem]"
                        />
                      </div>
                    )}
                    <p className=" text-paragraph1 text-center text-[1.1rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                      {skill.title}
                    </p>
                  </div>
                ))}
              </React.Fragment>
            )
          )}
      </div>

      {/* Show More/Show Less button - Hidden on print */}
      {list && list.length > initialVisibleItemsSmall && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-[4rem] py-[1.6rem] bg-primary hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white rounded-[2.2rem] text-[2rem] font-semibold font-Inter leading-tight mx-auto"
        >
          {showAll ? "See Less" : "See More Skills"}
        </button>
      )}
    </div>
  );
};

export default SkillsContainer;
