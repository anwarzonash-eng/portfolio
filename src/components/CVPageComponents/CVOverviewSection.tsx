"use client";
import React, { useState } from "react";
import { modifiedContent } from "@/hooks/modifiedContent";
import CVSectionHeading from "@/components/CVPageComponents/CVSectionHeading";
import CVTimelineDot from "@/components/CVPageComponents/CVTimelineDot";
import type { ProfileReport, SkillRef } from "@/types/api";

interface CVOverviewSectionProps {
  listOfdata: ProfileReport | null;
  filteredSkills: SkillRef[];
  isMobile: boolean;
}

/**
 * The CV "Overview" block: renders the profile's skills HTML with a
 * read more / read less toggle (extracted verbatim from pages/cv).
 */
const CVOverviewSection = ({
  listOfdata,
  filteredSkills,
  isMobile,
}: CVOverviewSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!listOfdata?.skills) return null;

  // Generate HTML for skills (overview section)
  const rawHtml = modifiedContent(
    listOfdata?.skills,
    filteredSkills,
    listOfdata,
  );

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const items = Array.from(doc.querySelectorAll("li")).map(
    (li) => li.outerHTML,
  );
  const maxItems = isMobile ? 4 : 10;
  const visibleItems = !expanded ? items.slice(0, maxItems) : items;

  return (
    <div className="relative flex items-start print:break-before-page">
      <CVTimelineDot />
      <div className="overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print:break-before-page print_p_m">
        <CVSectionHeading title="Overview" margin={"mb-[20px]"} />
        <div className="text-heading services_main list-div text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem] list-inside print:p-0 w-full max-w-full">
          <ul
            dangerouslySetInnerHTML={{
              __html: visibleItems.join(""),
            }}
          />
          {items.length > maxItems && (
            <div className="flex items-center justify-center">
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="px-[4rem] print:hidden py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVOverviewSection;
