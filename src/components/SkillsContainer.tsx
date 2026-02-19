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

interface SkillsContainerProps {
  list?: SkillType[] | any;
  variant?: "default" | "portfolio" | "print";
  // pageType?: "home" | "portfolio" | "cv";
  layoutType?: boolean;
  useLinks?: boolean;
  autoExpandOnParam?: boolean;
  portfolioId?: string;
  numColumns?: number;
  numSkills?: number;
  hideLinks?: boolean;
}

const SkillsContainer: React.FC<SkillsContainerProps> = ({
  list,
  variant = "default",
  layoutType = false,
  // pageType = "home",
  useLinks = true,
  autoExpandOnParam = false,
  portfolioId,
  numColumns = 6,
  numSkills = 8,
  hideLinks
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldExpand, setShouldExpand] = useState(false);

  const initialVisibleItemsDesktop = 32;
  const initialVisibleItemsMobile = 12;

  const initialVisibleItems =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? initialVisibleItemsDesktop
      : initialVisibleItemsMobile;

  // Auto-expand if ?scroll=skills
  useEffect(() => {
    if (autoExpandOnParam && searchParams.get("scroll") === "skills") {
      setShouldExpand(true);
    }
  }, [autoExpandOnParam, searchParams]);

  useEffect(() => {
    if (shouldExpand) setIsExpanded(true);
  }, [shouldExpand]);

  // Determine visible skills based on variant
  const visibleSkills =
    variant === "print"
      ? list?.slice(0, numSkills)
      : isExpanded
        ? list
        : list?.slice(0, initialVisibleItems);

  const skills: Record<string, SkillType[]> = skillsGrouping(
    visibleSkills || []
  );

  const showToggleButton =
    variant !== "print" && list && list.length > initialVisibleItems;

  const handleToggleExpand = () => setIsExpanded((prev) => !prev);

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

  const gridCols =
    variant === "print"
      ? getGridCols(numColumns)
      : "grid-cols-4 lg:grid-cols-6 xl:grid-cols-9";
  const gap = variant === "portfolio" ? "gap-[2rem]" : "gap-[2.5rem]";
  const textSize =
    variant === "portfolio"
      ? "text-[1.4rem] leading-[2rem] font-medium text-heading"
      : "text-[1.8rem] leading-[2.8rem] text-paragraph1";

  // Conditional layout based on number of skills (similar to HomeSkillsSection)
  const totalVisibleSkills = visibleSkills?.length || 0;
  const useFlex = totalVisibleSkills <= 10;

  // Apply different styles based on skill count
  const containerClasses = useFlex
    ? `flex items-center justify-center flex-wrap ${gap} w-full`
    : `grid ${gridCols} ${gap} content-center`;

  return (
    <div className="flex flex-col w-full items-center justify-center mt-[3rem] bg-white">
      {/* === Skills Grid === */}
      <div
        className={`${containerClasses} ${variant === "default" ? "print:hidden" : ""
          }`}
      >
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => {
              const Content = (
                <>
                  {skill.icon && (
                    <div
                      className={`h-[6rem] w-[6rem] mx-auto ${variant === "print"
                        ? "print:h-[4.5rem] print:w-[4.5rem]"
                        : ""
                        }`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.title}
                        height={64}
                        width={64}
                        className="object-contain w-full h-full filter "
                      />
                    </div>
                  )}
                  <div className="mt-[1rem] min-h-[4rem] flex items-start justify-center px-2 text-center">
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
                  className={`mx-auto mb-[4rem] max-w-[13rem]  animate-fadeIn opacity-0`}
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

      {/* === Print Mode === */}
      {variant === "print" && (
        <>
          {list && list.length > numSkills && (
            <Link
              href={"/cv"}
              className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium leading-tight mx-auto mt-[1rem]"
            >
              See More Skills
            </Link>
          )}
        </>
      )}

      {/* === Toggle Button for Default/Portfolio === */}
      {showToggleButton && (
        <div className="flex justify-center my-[3rem] print:hidden">
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

export default SkillsContainer;
