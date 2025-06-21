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
interface SkillsContainerPrintProps {
  list: SkillType[] | undefined | null;
}

const SkillsContainerPrint: React.FC<SkillsContainerPrintProps> = ({
  list,
}) => {
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
    <div className="flex flex-col print:w-full items-center justify-center ">
      <div className="gap-[2rem] mt-[6rem] grid grid-cols-4 items-center place-items-center w-full">
        {Object.values(skills).map((group: SkillType[], groupIndex: number) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill: SkillType, i: number) => (
              <div
                key={`${groupIndex}-${i}`}
                style={{
                  animationDelay: `${i * 0.03}s`,
                }}
                className="mx-auto mb-[4rem] flex items-center justify-center flex-col gap-[0.8rem] max-w-[24rem] print:max-w-[20rem] w-full animate-fadeIn opacity-0"
              >
                {skill.icon && (
                  <div className="flex items-center justify-center rounded-full h-[10rem] w-[10rem] print:h-[7rem] print:w-[7rem]">
                    <Image
                      src={skill.icon}
                      alt={skill.title}
                      height={200}
                      width={200}
                      className="object-cover h-full w-full"
                    />
                  </div>
                )}
                <p className="mt-[1.5rem] text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                  {skill.title}
                </p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SkillsContainerPrint;
