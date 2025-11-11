"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { skillsGrouping } from "@/hooks/skillsGrouping";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

interface HomeSkillsSectionProps {
  list?: SkillType[] | null;
  useLinks?: boolean;
  autoExpandOnParam?: boolean;
  portfolioId?: string;
  numColumns?: number;
  numSkills?: number;
}

const HomeSkillsSection: React.FC<HomeSkillsSectionProps> = ({
  list = [],
  useLinks = true,
  autoExpandOnParam = false,
  portfolioId,
  numColumns = 8,
  numSkills = 32,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldExpand, setShouldExpand] = useState(false);

  // Auto-expand if ?scroll=skills
  useEffect(() => {
    if (autoExpandOnParam && searchParams.get("scroll") === "skills") {
      setShouldExpand(true);
    }
  }, [autoExpandOnParam, searchParams]);

  useEffect(() => {
    if (shouldExpand) setIsExpanded(true);
  }, [shouldExpand]);

  // Group all skills
  const groupedSkills: Record<string, SkillType[]> = skillsGrouping(list || []);
  // Flatten and slice for visible count
  const flatSkills: SkillType[] = Object.values(groupedSkills).flat();
  const visibleSkills = isExpanded ? flatSkills : flatSkills.slice(0, numSkills);
  // Regroup for display
  const displayGroups: Record<string, SkillType[]> = skillsGrouping(visibleSkills);

  const handleSeeMorePrint = () => {
    if (portfolioId) {
      router.push(`/portfolio/${portfolioId}?scroll=skills`);
    } else {
      router.push(`/portfolio`);
    }
  };

  // Dynamic grid system from SkillsContainer
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

  // Dynamic centering based on visible skills count
  const getOptimalGrid = (skillCount: number) => {
    if (skillCount <= 4) {
      return getGridCols(skillCount); // Use exact count for small numbers
    } else if (skillCount <= 6) {
      return "grid-cols-6";
    } else if (skillCount <= 12) {
      return "grid-cols-8";
    } else {
      return `grid-cols-${numColumns}`; // Default to specified columns
    }
  };

  const visibleSkillCount = visibleSkills.length;
  const gridCols = getOptimalGrid(visibleSkillCount);

  return (
      <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
        {/* Skills Grid */}
        <div
          className={`grid ${gridCols} gap-[1.5rem] content-center place-items-center justify-items-center`}
        >
          {Object.values(displayGroups).map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.map((skill, i) => {
                const Content = (
                  <>
                    {skill.icon && (
                      <div className="flex items-center justify-center h-[4.5rem] w-[4.5rem]">
                        <Image
                          src={skill.icon}
                          alt={skill.title}
                          height={64}
                          width={64}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    )}
                    <div className="mt-[1rem] min-h-[4rem] flex items-center justify-center px-2 text-center">
                      <p className="text-[1.8rem] leading-[2.8rem] text-paragraph1 overflow-hidden text-ellipsis">
                        {skill.title === "Nest.js" ? "NestJs" : skill.title}
                      </p>
                    </div>
                  </>
                );

                return (
                  <div
                    key={`${groupIndex}-${i}`}
                    style={{ animationDelay: `${i * 0.03}s` }}
                    className="mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] max-w-[13rem] animate-fadeIn opacity-0"
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

        {/* See More Button */}
        {list && list.length > numSkills && (
          <div className="flex items-center justify-center w-full mt-[2rem]">
            <Link
              href={
                portfolioId
                  ? `/portfolio/${portfolioId}?scroll=skills`
                  : `/portfolio`
              }
              onClick={handleSeeMorePrint}
              className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium leading-tight"
            >
              See More Skills
            </Link>
          </div>
        )}
      </div>
  );
};

export default HomeSkillsSection;
