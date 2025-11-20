"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { skillsGrouping } from "@/hooks/skillsGrouping";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

interface SkillsContainerProps {
  list?: SkillType[] | null;
  layoutType?: boolean;
  useLinks?: boolean;
  autoExpandOnParam?: boolean;
  portfolioId?: string;
  numColumns?: number;
  numSkills?: number;
}

const HomeSkillsSection: React.FC<SkillsContainerProps> = ({
  list = [],
  layoutType = false,
  useLinks = true,
  autoExpandOnParam = false,
  portfolioId,
  numColumns = 6,
  numSkills = 24,
}) => {
  const router = useRouter();

  const handleSeeMorePrint = () => {
    if (portfolioId) {
      router.push(`/portfolio/${portfolioId}?scroll=skills`);
    } else {
      router.push(`/portfolio`);
    }
  };

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
  const skills: Record<string, SkillType[]> = skillsGrouping(visibleSkills || []);
  
  // Show "See More" button if there are more skills than displayed
  const showSeeMoreButton = list && list.length > numSkills;

  // Apply print styles permanently
  const gridCols = getGridCols(numColumns);
  const gap = "gap-[1rem]";
  const textSize = "text-[1.5rem] leading-[2rem] text-paragraph1";

  // Conditional layout based on number of skills
  const totalVisibleSkills = visibleSkills?.length || 0;
  const useFlex = totalVisibleSkills <= 10;
  
  // Apply different styles based on skill count
  const containerClasses = useFlex 
    ? "flex items-center justify-center flex-wrap gap-[2rem] w-full my-[2rem]"
    : `grid ${gridCols} ${gap} content-center place-items-center justify-items-center my-[2rem]`;

  return (
    <div className="flex flex-col w-full items-center justify-center mt-[2rem]">
      {/* === Skills Grid === */}
      <div className={containerClasses}>
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => {
              const Content = (
                <>
                  {skill.icon && (
                    <div className="flex items-center justify-center 
                    h-[5.5rem] w-[5.5rem]">
                      <Image
                        src={skill.icon}
                        alt={skill.title}
                        loading="eager"
                        priority={true}
                        height={55}
                        width={55}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div className="mt-[1rem] min-h-[4.5rem] flex items-center justify-center px-2 text-center">
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
                  className="mx-auto flex flex-col items-center justify-center gap-[0.8rem] max-w-[13rem] animate-fadeIn opacity-0"
                >
                  {useLinks && skill.url ? (
                    <Link
                      href={skill.url}
                      target="_blank"
                      className="flex flex-col items-center justify-center"
                    >
                      {Content}
                    </Link>
                  ) : (
                    Content
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* === See More Button === */}
      {showSeeMoreButton && (
        <Link
          href={
            portfolioId
              ? `/portfolio/${portfolioId}?scroll=skills`
              : `/portfolio`
          }
          onClick={handleSeeMorePrint}
          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium leading-tight mx-auto mt-[1rem]"
        >
          See More Skills
        </Link>
      )}
    </div>
  );
};

export default HomeSkillsSection;