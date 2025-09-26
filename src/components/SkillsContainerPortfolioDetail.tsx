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
}

const SkillsContainerPortfolioDetail: React.FC<
  SkillsContainerPortfolioDetailProps
> = ({ list = [], layoutType = false }) => {
  const searchParams = useSearchParams();

  // State for expanded view
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldExpand, setShouldExpand] = useState(false);

  // Number of items to display by default
  const initialVisibleItemsDesktop = 16; // lg and above (≥1024px)
  const initialVisibleItemsMobile = 12; // below lg (<1024px)

  // Determine the number of items to show based on screen size
  const initialVisibleItems =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? initialVisibleItemsDesktop
      : initialVisibleItemsMobile;

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

  // Determine when to show the "Show All Skills" or "Show Less" button
  const showToggleButton = list && list.length > initialVisibleItems;

  return (
    <div className="w-full mt-[3rem]">
      {/* Skills Grid */}
      <div
        className={`grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-[2rem] content-center place-items-center`}
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

      {/* Expand/Collapse Button - Only show if there are more skills than initialVisibleItems */}
      {showToggleButton && (
        <div className="flex justify-center mt-[3rem]">
          <button
            onClick={handleToggleExpand}
            className="px-[3rem] py-[1rem] bg-primary rounded-[2rem] text-white text-[1.4rem] font-medium hover:bg-primary-dark transition-colors"
          >
            {isExpanded ? "Show Less" : "Show All Skills"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsContainerPortfolioDetail;
