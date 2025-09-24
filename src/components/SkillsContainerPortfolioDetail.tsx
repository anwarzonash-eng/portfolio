"use client";

import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

interface SkillsContainerPortfolioDetailProps {
  list: SkillType[] | undefined | null;
  layoutType?: boolean;
  initialVisibleItems?: number;
}

const SkillsContainerPortfolioDetail: React.FC<
  SkillsContainerPortfolioDetailProps
> = ({ list = [], layoutType = false, initialVisibleItems = 12 }) => {
  const searchParams = useSearchParams();

  // State for expanded view
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldExpand, setShouldExpand] = useState(false);

  // Check if we need to expand on mount (when navigated from skills print page)
  useEffect(() => {
    const scrollParam = searchParams.get("scroll");
    if (scrollParam === "skills") {
      setShouldExpand(true);
    }
  }, [searchParams]);

  // Auto-expand when shouldExpand is true
  useEffect(() => {
    if (shouldExpand) {
      setIsExpanded(true);
    }
  }, [shouldExpand]);

  // Calculate visible skills based on expanded state
  const visibleSkills = isExpanded
    ? list || []
    : list?.slice(0, initialVisibleItems) || [];

  // Group the visible skills
  const skills: Record<string, SkillType[]> = skillsGrouping(visibleSkills);

  // Toggle expanded state
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full mt-[3rem]">
      {/* Skills Grid */}
      <div
        className={`grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-[2rem] content-center place-items-center`}
      >
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => (
              <div
                key={`${groupIndex}-${i}`}
                className="flex items-center justify-center flex-col gap-[0.8rem] max-w-[10rem] w-full"
              >
                {skill.icon && (
                  <div className="flex items-center justify-center h-[6rem] w-[6rem]">
                    <Image
                      src={skill.icon}
                      alt={skill.title}
                      height={150}
                      width={150}
                      className="max-h-[6rem] max-w-[6rem] w-full h-full object-contain"
                    />
                  </div>
                )}
                <p className="text-center text-[1.4rem] leading-[2rem] font-medium text-heading">
                  {skill.title}
                </p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Expand/Collapse Button - Only show if not expanded and there are more skills */}
      {!isExpanded && list && list.length > initialVisibleItems && (
        <div className="flex justify-center mt-[3rem]">
          <button
            onClick={handleToggleExpand}
            className="px-[3rem] py-[1rem] bg-primary rounded-[2rem] text-white text-[1.4rem] font-medium hover:bg-primary-dark transition-colors"
          >
            Show All Skills
          </button>
        </div>
      )}

      {/* Show "Showing All Skills" message when expanded */}
      {isExpanded && list && list.length > initialVisibleItems && (
        <div className="flex justify-center mt-[2rem]">
          <button
            onClick={handleToggleExpand}
            className="px-[3rem] py-[1rem] bg-primary rounded-[2rem] text-white text-[1.4rem] font-medium hover:bg-primary-dark transition-colors"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsContainerPortfolioDetail;
