"use client";

import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  numColumns?: number; // ✅ Dynamic number of columns
  numSkills?: number; // ✅ Dynamic number of skills to display
  portfolioId: string;
}

const SkillsContainerPrint: React.FC<SkillsContainerPrintProps> = ({
  list = [],
  numColumns = 6, // Default to 6 columns
  numSkills = 8, // Default to 8 skills
  portfolioId,
}) => {
  const router = useRouter();

  const getGridColumnsClass = (numColumns: number) => {
    const columnMap: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    };
    return columnMap[numColumns] || "grid-cols-1"; // Fallback to 1 column
  };

  const gridColumnsClass = getGridColumnsClass(numColumns);

  // Slice visible skills based on numSkills prop
  const visibleSkills = list?.slice(0, numSkills) || [];

  console.log("Skills Print List:", list);

  // Group the visible skills
  const skills: Record<string, SkillType[]> = skillsGrouping(visibleSkills);

  // Navigate to portfolio detail page -> skills section
  const handleSeeMore = () => {
    // Navigate to portfolio detail with skills section scroll
    router.push(`/portfolio/${portfolioId}?scroll=skills`);
  };

  // Generate grid columns class dynamically

  return (
    <div className="flex flex-col print:w-full items-center justify-center">
      <div
        className={`w-full grid ${gridColumnsClass} content-center place-items-center justify-between`}
      >
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => (
              <Link
                href={skill.url}
                target="_blank"
                key={`${groupIndex}-${i}`}
                style={{ animationDelay: `${i * 0.03}s` }}
                className="mx-auto mb-[4rem] flex items-center justify-center flex-col gap-[0.8rem] max-w-[12rem] w-full animate-fadeIn opacity-0"
              >
                {skill.icon && (
                  <div
                    className="flex items-center justify-center rounded-full 
                  h-[6.5rem] w-[6.5rem] print:h-[4.5rem] print:w-[4.5rem]"
                  >
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
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Show More button if there are more skills to display */}
      {list && list.length > numSkills && (
        <button
          onClick={handleSeeMore}
          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium font-Inter leading-tight mx-auto mt-[1rem]"
        >
          See More Skills
        </button>
      )}
    </div>
  );
};

export default SkillsContainerPrint;
