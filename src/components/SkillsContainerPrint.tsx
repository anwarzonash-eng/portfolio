import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import React from "react";

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
  layoutType: any | undefined | null;
}

const SkillsContainerPrint: React.FC<SkillsContainerPrintProps> = ({
  list,
  layoutType = false,
}) => {
  console.log("List", list);

  // Show only a fixed number of items for large/print screen
  const initialVisibleItems = 4 * 2;

  // Slice the list to show only the relevant skills
  const visibleSkills = list?.slice(0, initialVisibleItems) || [];

  // Group the skills for display
  const skills: Record<string, SkillType[]> = skillsGrouping(visibleSkills);

  return (
    <div className="flex flex-col print:w-full items-center justify-center">
      <div
        className={`w-full grid ${
          layoutType ? "grid-cols-4" : "grid-cols-6"
        } content-center place-items-center justify-between`}
      >
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => (
              <div
                key={`${groupIndex}-${i}`}
                style={{
                  animationDelay: `${i * 0.03}s`,
                }}
                className="mx-auto mb-[4rem] flex items-center justify-center flex-col gap-[0.8rem] max-w-[12rem] w-full animate-fadeIn opacity-0 bg-red500"
              >
                {skill.icon && (
                  <div className="flex items-center justify-center rounded-full h-[8rem] w-[8rem] print:h-[5rem] print:w-[5rem]">
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
