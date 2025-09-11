"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ExperienceDescription from "./ExperienceDescription";
import ShowmoreSkills from "./showmoreSkills";

import { skillsGrouping } from "@/hooks/skillsGrouping";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";

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
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  index,
  listOfskills,
  listOfdata,
  showMoreSkills,
  setShowMoreSkills,
  variant = "list", // default styling
}) => {
  const skillsForExperience = skillsGrouping(
    showMoreSkills[index]
      ? experience?.skills
      : experience?.skills?.slice(0, 15)
  );

  // ✅ Handle multiple possible field names
  const startRaw =
    experience?.starting_date ??
    experience?.start_date ??
    experience?.startDate;

  const endRaw =
    experience?.ending_Date ?? experience?.end_date ?? experience?.endDate;

  // ✅ Safe formatter
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
      {/* Vertical timeline line (only for timeline) */}
      {variant === "timeline" && (
        <div className="absolute left-[10rem] top-[4rem] h-[90%] bottom-0 w-[0.4rem] bg-border hidden xl:block" />
      )}
      {/* Timeline dot (only for timeline) */}
      {variant === "timeline" && (
        <div className="absolute top-[2.5rem] left-[9rem] hidden xl:block">
          <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
            <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
          </div>
        </div>
      )}

      <div
        className={`relative flex items-start w-full ${
          variant === "timeline" ? "xl:ml-[13rem] mt-10" : "ml-[0.5rem]"
        }`}
      >
        {/* Card */}
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
                <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                  <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem]">
                    <Link
                      href={experience.company_website}
                      className="flex gap-2 items-center"
                    >
                      <Image
                        src={"/images/link.svg"}
                        height={18}
                        width={18}
                        alt="Link"
                      />
                      {
                        experience.company_website
                          .replace(/^(https?:\/\/)?(www\.)?/, "")
                          .split("/")[0]
                      }
                    </Link>
                  </div>
                  {experience.company_website.includes("upwork") && (
                    <Link
                      href={experience.company_website}
                      className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                    >
                      View My Freelance Profile
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* 📅 Unified Date Range */}
          {(startLabel || endLabel) && (
            <p className="text-[2rem] text-primary font-medium max-lg:text-center max-lg:my-[1rem] mb-2">
              {startLabel ?? ""} - {endLabel ?? "Present"}
            </p>
          )}

          {/* Short Description */}
          <p
            className="text-[1.6rem] font-medium text-paragraph1"
            dangerouslySetInnerHTML={{
              __html: experience?.short_description,
            }}
          />

          {/* Extended Description */}
          <ExperienceDescription
            experience={experience}
            listOfskills={listOfskills}
            listOfdata={listOfdata}
            index={index}
          />

          {/* Skills */}
          {experience?.skills?.length > 0 && (
            <div className="w-full mt-[1.6rem]">
              <h4 className="text-primary text-[1.5rem] font-medium mb-[1.2rem]">
                AREAS OF EXPERTISE I'VE WORKED IN
              </h4>
              <div className="flex items-center gap-[1rem] flex-wrap text-[1.2rem]">
                {(Object.values(skillsForExperience) as SkillType[][]).map(
                  (group, groupIndex) =>
                    group.map((skill, i) => (
                      <Link
                        href={skill.url || "#"}
                        key={`${groupIndex}-${i}`}
                        className="hover:bg-primary capitalize hover:text-white text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] "
                      >
                        {skill?.title}
                      </Link>
                    ))
                )}

                <ShowmoreSkills
                  props={{
                    list: experience?.skills,
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
