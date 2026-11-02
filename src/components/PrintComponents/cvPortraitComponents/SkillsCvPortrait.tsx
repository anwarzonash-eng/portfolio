"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import type { SkillRef } from "@/types/api";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

interface SkillsContainerProps {
  list?: SkillRef[] | null;
  layoutType?: boolean;
  useLinks?: boolean;
  autoExpandOnParam?: boolean;
  hideLinks?: boolean;
  portfolioId?: string;
  numColumns?: number;
  numSkills?: number;
}

const SkillsCvPortrait: React.FC<SkillsContainerProps> = ({
  list = [],
  layoutType: _layoutType = false,
  useLinks = true,
  autoExpandOnParam: _autoExpandOnParam = false,
  hideLinks,
  numColumns = 5,
  numSkills = 20,
}) => {

  const getGridCols = (count: number) => {
    const colMap: Record<number, string> = {
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
    return colMap[count] || "grid-cols-6";
  };

  // Determine visible skills - always use print logic with numSkills
  const visibleSkills = list?.slice(0, numSkills);
  const skills: Record<string, SkillType[]> = skillsGrouping(
    visibleSkills || []
  );

  // Show "See More" button if there are more skills than displayed
  const showSeeMoreButton = list && list.length > numSkills;

  // Apply print styles permanently
  const gridCols = getGridCols(numColumns);
  const gap = "gap-[1.5rem]";
  const textSize = "text-[2rem] leading-[2.8rem] text-paragraph1";



  // Apply different styles based on skill count
  const containerClasses = `grid ${gridCols} ${gap} content-center place-items-start justify-items-center`;

  return (
    <div className="flex flex-col w-full items-center justify-center mt-[3rem]">
      {/* === Skills Grid === */}
      <div className={containerClasses}>
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => {
              const Content = (
                <>
                  {skill.icon && (
                    <div
                      className="h-[8rem] w-[8rem] mx-auto"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.title}
                        loading="eager"
                        priority={true}
                        height={80}
                        width={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div className="my-[1rem] min-h-[4rem] flex items-start justify-center px-2 text-center">
                    <p className={`${textSize} overflow-hidden text-ellipsis`}>
                      {skill.title === "Nest.js" ? "NestJs" : skill.title}
                    </p>
                  </div>
                </>
              );

              return (
                <div
                  key={`${groupIndex}-${i}`}
                  style={{ animationDelay: `${i * 0.03}s` }}
                  className="mx-auto mb-[4rem] flex flex-col items-center justify-center gap-[0.8rem] max-w-[13rem] animate-fadeIn opacity-0"
                >
                  {useLinks && skill.url && !hideLinks ? (
                    <Link
                      href={skill.url}
                      target="_blank"
                      className="flex flex-col items-center justify-center"
                    >
                      {Content}
                    </Link>
                  ) : (
                   <div className="flex flex-col items-center justify-center">
                    {Content}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* === See More Button === */}
      {showSeeMoreButton && !hideLinks && (
        <Link
          href="/cv"
          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium leading-tight mx-auto mt-[1rem]"
        >
          See More Skills
        </Link>
      )}
    </div>
  );
};

export default SkillsCvPortrait;
