"use client";

import Link from "next/link";
import React from "react";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

type Variant = "small" | "medium" | "different";

interface AreasOfExpertiesSkillComponentProps {
  skill: SkillType;
  index: number;
  groupIndex?: number | null; // ✅ optional or null
  variant?: Variant; // default: "small"
  hideLinks?: boolean;
}

const AreasOfExpertiesSkillComponent: React.FC<
  AreasOfExpertiesSkillComponentProps
> = ({ skill, index, groupIndex, variant = "small", hideLinks }) => {
  const animationDelay = `${index * 0.1}s`;

  // Define style variants
  const baseVariants: Record<Variant, string> = {
    small:
      "capitalize text-center text-primary text-[1.2rem] font-medium py-[0.3rem] px-[1.5rem] bg-white " +
      "flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] " +
      "rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn " +
      "relative group transition-all duration-200 hover:bg-primary hover:text-white",
    medium:
      "hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group",

    different:
      "hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal",
  };

  const baseClasses = baseVariants[variant];

  const key = groupIndex != null ? `${groupIndex}-${index}` : `${index}`;


  // Render
  if (skill.url && !hideLinks) {
    return (
      <Link
        href={skill.url ? skill.url : "#"}
        legacyBehavior
        key={key}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay }}
          className={baseClasses}
        >
          {skill.title}
        </a>
      </Link>
    );
  }

  return (
    <div key={key}>
      <span
        style={{ animationDelay }}
        className={`${baseClasses} ${
          variant !== "different" ? "inline-flex" : ""
        }`}
      >
        {skill.title}
      </span>
    </div>
  );
};

export default AreasOfExpertiesSkillComponent;
