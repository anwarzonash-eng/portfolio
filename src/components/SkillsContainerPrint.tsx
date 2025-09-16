"use client";

import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

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
  layoutType?: boolean;
  initialVisibleItems?: number;
  portfolioId: string; // ✅ add portfolioId
}

const SkillsContainerPrint: React.FC<SkillsContainerPrintProps> = ({
  list = [],
  layoutType = false,
  initialVisibleItems = 8,
  portfolioId,
}) => {
  const router = useRouter();

  // Slice visible skills
  const visibleSkills = list?.slice(0, initialVisibleItems) || [];

  // Group the visible skills
  const skills: Record<string, SkillType[]> = skillsGrouping(visibleSkills);

  // Navigate to portfolio detail page -> skills section
  const handleSeeMore = () => {
    router.push(`/a/portfolio/${portfolioId}#skills`);
  };

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
                style={{ animationDelay: `${i * 0.03}s` }}
                className="mx-auto mb-[4rem] flex items-center justify-center flex-col gap-[0.8rem] max-w-[12rem] w-full animate-fadeIn opacity-0"
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

      {/* Redirect instead of expanding */}
      {list && list.length > initialVisibleItems && (
        <button
          onClick={handleSeeMore}
          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium font-Inter leading-tight mx-auto"
        >
          See More Skills
        </button>
      )}
    </div>
  );
};

export default SkillsContainerPrint;
