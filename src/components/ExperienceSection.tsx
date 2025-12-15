"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ShowmoreSkills from "./showmoreSkills";

import { skillsGrouping } from "@/hooks/skillsGrouping";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import { modifiedContent } from "@/hooks/modifiedContent";
import useIsDesktop from "@/hooks/useIsDesktop";
import { MoveUpRight } from "lucide-react";

interface SkillType {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
}

interface ExperienceSectionProps {
  experience: any; // refine type if possible
  index: number;
  listOfskills: any;
  listOfdata: any;
  showMoreSkills: boolean[];
  setShowMoreSkills: React.Dispatch<React.SetStateAction<boolean[]>>;
  variant?: "timeline" | "list"; // controls styling
  isLast?: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  index,
  listOfskills,
  listOfdata,
  showMoreSkills,
  setShowMoreSkills,
  variant = "list",
  isLast = false,
}) => {
  const skills = experience?.skills || [];
  const isSkillsNested =
    Array.isArray(skills) && skills.length > 0 && Array.isArray(skills[0]);
  const flatSkills = isSkillsNested ? skills.flat() : skills; // Flatten nested skills for consistent rendering
  const isDesktop = useIsDesktop(1024); // matches Tailwind's lg breakpoint
  const initialSkillLimit = isDesktop ? 15 : 6;
  const skillsToShow = showMoreSkills[index]
    ? flatSkills
    : flatSkills.slice(0, initialSkillLimit);

  // Expanded Code Logic
  const [isMobile, setIsMobile] = useState(false);
  const [expansionState, setExpansionState] = useState<
    "collapsed" | "partial" | "full"
  >("collapsed");

  useEffect(() => {
    const checkMobile = window.innerWidth < 768; // Matches Tailwind 'md' breakpoint
    setIsMobile(checkMobile);
    setExpansionState(checkMobile ? "collapsed" : "partial");

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      setExpansionState(newIsMobile ? "collapsed" : "partial");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize the processed HTML from modifiedContent
  const rawHtml = useMemo(
    () =>
      modifiedContent(
        experience.long_description || "",
        listOfskills,
        listOfdata
      ) || "", // Fallback to empty string
    [experience.long_description, listOfskills, listOfdata]
  );

  // console.log("Experiences:", experience);

  // Parse the <li> elements, preserving all HTML and styles
  const items = useMemo(() => {
    if (!rawHtml) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");
    const liElements = doc.querySelectorAll("li");
    return liElements.length > 0
      ? Array.from(liElements).map((li) => li.outerHTML)
      : [];
  }, [rawHtml]);

  // Determine visible count based on state
  const visibleCount = useMemo(() => {
    if (items.length === 0) return 0;
    switch (expansionState) {
      case "collapsed":
        return 0;
      case "partial":
        return Math.min(4, items.length); // Show up to 4 items
      case "full":
        return items.length; // Show all items
      default:
        return 0;
    }
  }, [expansionState, items.length]);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  // Handle toggle logic
  const handleToggle = useCallback(() => {
    setExpansionState((prev) => {
      if (prev === "collapsed") return "partial";
      if (prev === "partial") return items.length > 4 ? "full" : "collapsed"; // Skip "full" if ≤ 4 items
      return "collapsed";
    });
  }, [items.length]);

  // Handle multiple possible field names
  const startRaw =
    experience?.starting_date ??
    experience?.start_date ??
    experience?.startDate;

  const endRaw =
    experience?.ending_Date ?? experience?.end_date ?? experience?.endDate;

  // Safe formatter
  const fmtMonthYear = (value: any) => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime())
      ? String(value)
      : formatDate(value, dateFormatsOptions.shortMonthYear);
  };

  const startLabel = fmtMonthYear(startRaw);
  const endLabel =
    endRaw == null || String(endRaw).trim().toLowerCase() === "present"
      ? "Present"
      : fmtMonthYear(endRaw);

  return (
    <div
      className={`w-full flex mt-[2rem] ${
        variant === "timeline" ? "relative" : "static"
      }`}
    >
      {variant === "timeline" && (
        <>
          <div
            className={`absolute left-[10rem] top-[4rem] ${
              isLast ? "h-[93%]" : "h-[100%]"
            }  bottom-0 w-[0.4rem] bg-border hidden xl:block`}
          />
          <div className="absolute top-[1.5rem] left-[9rem] hidden xl:block">
            <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
              <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
            </div>
          </div>
        </>
      )}

      <div
        className={`relative flex items-start w-full ${
          variant === "timeline" ? "xl:ml-[13rem] mt-10" : "ml-[0.5rem]"
        }`}
      >
        <div className="bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow w-full">
          <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
            {/* About Content */}
            <div className="flex gap-[1rem]">
              {experience?.company_website ? (
                <Link
                  href={experience.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-[1rem] items-center group hover:bg-[#D1E9FF] p-3 rounded-[4px] 
                  hover:drop-shadow-xl hover:scale-105 transition-all duration-300 ml-[-1rem]"
                >
                  {experience?.thumbnail && (
                    <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                      <Image
                        src={experience?.thumbnail}
                        height={32}
                        width={32}
                        alt="Logo Mark"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1 group-hover:text-primary transition-colors duration-300">
                      {experience?.company_name}
                    </p>
                    <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading group-hover:text-primary transition-colors duration-300">
                      {experience?.title}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div className="flex gap-[1rem]">
                  {experience?.thumbnail && (
                    <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                      <Image
                        src={experience?.thumbnail}
                        height={32}
                        width={32}
                        alt="Logo Mark"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                      {experience?.company_name}
                    </p>
                    <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                      {experience?.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Website link */}
            {experience?.company_website && (
              <div className="flex justify-center md:justify-end w-full md:w-auto">
                <div className="flex flex-col-reverse gap-[1rem] max-w-max">                    {!experience.company_website.includes("upwork")  && 
                  <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-sectionBG hover:text-white duration-300">
                    <Link
                      href={experience.company_website}
                      className="flex gap-2 items-center p-4 text-[2rem]"
                    >
                      {
                        experience.company_website
                          .replace(/^(https?:\/\/)?(www\.)?/, "")
                          .split("/")[0]
                      }
                    </Link>
                  </div>
                  }
                  {experience.company_website.includes("upwork") && (
                    <div className="flex items-center gap-2">
                      <Link
                        href={experience.company_website ?? "#"}
                        target="_blank"
                        className="
                              bg-black text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary duration-300 text-nowrap
                              flex items-center justify-center
                              text-[1.4rem] lg:text-[1.6rem] lg:font-medium rounded-[20rem] p-[1rem] group"
                      >
                        <span>Check My</span>
                        <div className="h-[2.5rem] w-[2.5rem] rounded-full relative mx-2 inline-block">
                          <Image
                            src="/images/upworkforContactComponent.svg"
                            alt="Upwork Logo"
                            width={25}
                            height={25}
                            className="h-full w-full object-cover rounded-full group-hover:border-primary border border-transparent duration-300
                                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                        <span>Profile</span>
                      </Link>
                      <Link
                        href={experience.company_website ?? "#"}
                        target="_blank"
                        className="h-[3rem] w-[3rem] rounded-full relative mx-2 bg-sectionBG text-white flex items-center justify-center animate-bounce cursor-pointer hover:bg-white hover:text-primary border border-transparent hover:border-primary duration-300"
                      >
                        <MoveUpRight className="size-[2rem]" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Unified Date Range */}
          {(startLabel || endLabel) && (
            <p className="text-[2rem] text-primary font-medium max-lg:text-center max-lg:my-[1rem] mb-2">
              {startLabel ?? ""} - {endLabel ?? "Present"}
            </p>
          )}

          {/* Short Description */}
          {experience?.short_description && (
            <p
              className="text-[1.6rem] font-medium text-paragraph1"
              dangerouslySetInnerHTML={{
                __html: experience.short_description,
              }}
            />
          )}

          {/* Expandable Content */}
          <div className="mb-2 list-div" id="experiecnesPoints">
            {visibleItems.length > 0 && (
              <ul
                className="mt-[2rem] pl-[2rem] text-heading text-[1.6rem]
                leading-[3rem]"
                dangerouslySetInnerHTML={{ __html: visibleItems.join("") }}
              />
            )}

            {items.length > 0 && (
              <div className="flex items-center max-lg:justify-center">
                <button
                  onClick={handleToggle}
                  className={`mt-[1rem] bg-primary leading-normal text-center py-[0.6rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border-primary hover:text-primary rounded-[2rem] text-[1.4rem] font-medium`}
                  aria-label={
                    expansionState === "full"
                      ? "Collapse content"
                      : "Expand content"
                  }
                >
                  {expansionState === "full" ? "Read Less" : "Read More"}
                </button>
              </div>
            )}
          </div>

          <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />

          {/* Skills */}
          {experience?.skills?.length > 0 && (
            <div className="w-full mt-[1.6rem]">
              <h4 className="text-primary text-[1.5rem] font-medium mb-[1.2rem]">
                AREAS OF EXPERTISE I'VE WORKED IN
              </h4>
              <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
                {Array.isArray(skillsToShow) && skillsToShow.length > 0 && (
                  <React.Fragment>
                    {skillsToShow.map((skill: any, i: number) => (
                      <>
                        {skill?.url ? (
                          <Link
                            key={i}
                            href={skill.url || "#"}
                            target="_blank"
                            className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                          >
                            {skill.title}
                          </Link>
                        ) : (
                          <div
                            key={i}
                            className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                          >
                            {skill.title}
                          </div>
                        )}
                      </>
                    ))}
                    {showMoreSkills[index] && (
                      <div className="w-full mb-[1px]" />
                    )}
                  </React.Fragment>
                )}
                <ShowmoreSkills
                  props={{
                    list: flatSkills,
                    index,
                    setShowMoreSkills,
                    showMoreSkills,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
