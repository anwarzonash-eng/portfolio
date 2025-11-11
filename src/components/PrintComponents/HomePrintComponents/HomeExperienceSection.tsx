"use client";

import NoteDomainForPint from "@/components/NoteDomainForPint";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

// Simple Skills Component
const SkillComponent: React.FC<{ skill: SkillType; index: number }> = ({ 
  skill, 
  index 
}) => {
  const animationDelay = `${index * 0.1}s`;
  
  if (skill.url) {
    return (
      <Link
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ animationDelay }}
        className="capitalize text-center text-primary text-[1.2rem] font-medium py-[0.3rem] px-[1.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group transition-all duration-200 hover:bg-primary hover:text-white"
      >
        {skill.title}
      </Link>
    );
  }

  return (
    <span
      style={{ animationDelay }}
      className="capitalize text-center text-primary text-[1.2rem] font-medium py-[0.3rem] px-[1.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group transition-all duration-200 hover:bg-primary hover:text-white"
    >
      {skill.title}
    </span>
  );
};

const HomeExperienceSection = ({
  listOfdata,
  skillsGrouping,
  modifiedContent,
  formatDate,
  showMoreSkills,
  dateFormatsOptions,
  listOfskills
}) => {
  if (!listOfdata?.experiences_ids?.length) return null;

  // Sort experiences by date (newest first)
  const sortedExperiences = [...listOfdata.experiences_ids].sort((a, b) => {
    const yearA = new Date(a.ending_Date).getFullYear();
    const yearB = new Date(b.ending_Date).getFullYear();
    if (yearA !== yearB) return yearB - yearA;
    
    const monthA = new Date(a.ending_Date).getMonth();
    const monthB = new Date(b.ending_Date).getMonth();
    return monthB - monthA;
  });

  // Split experiences into two groups for two sections
  const firstGroupExperiences = sortedExperiences.slice(0, 3);
  const secondGroupExperiences = sortedExperiences.slice(3, 6);

  const renderExperience = (experience, index) => {
    const skillsforExpereince = skillsGrouping(
      showMoreSkills[index] ? experience?.skills : experience?.skills?.slice(0, 5)
    );

    return (
      <div key={experience.id} className="space-y-[1rem] space-x-[9rem]">
        {/* Date */}
        <div className="mb-auto ml-auto mt-[1rem] absolute left-[-4rem] z-10 text-[1.4rem] text-paragraph1 capitalize flex gap-1">
          <span>
            {formatDate(experience.starting_date, dateFormatsOptions.shortMonthYear)}
          </span>
          -
          <span>
            {isNaN(new Date(experience.ending_Date).getFullYear())
              ? experience.ending_Date
              : formatDate(experience.ending_Date, dateFormatsOptions.shortMonthYear)}
          </span>
        </div>

        {/* Timeline item */}
        <div className="relative flex items-start">
          {/* Dot */}
          <div className="absolute top-0 left-[2rem] block">
            <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
              <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white p-[1.6rem] rounded-[1rem] shadow ml-[6rem] w-full">
            <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
              <div className="flex gap-[1rem] items-center w-full justify-between">
                <div className="flex items-center gap-2">
                  {experience?.thumbnail && (
                    <div className="h-[3.5rem] w-[3.5rem] bg-[#D1E9FF] rounded-[0.4rem] relative">
                      <Image
                        src={experience?.thumbnail}
                        height={26}
                        width={26}
                        alt="Logo Mark"
                        className="h-[2.6rem] w-[2.6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[1.2rem] font-normal text-paragraph1">
                      {experience?.company_name}
                    </p>
                    <h3 className="text-[1.4rem] font-medium text-heading">
                      {experience?.title}
                    </h3>
                  </div>
                </div>

                {/* Link */}
                <div className="flex justify-end w-auto">
                  <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                    <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white">
                      <Link
                        href={experience.company_website}
                        className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold relative py-2 pl-[1rem] text-[1.3rem]"
                      >
                        {experience.company_website
                          .replace(/^(https?:\/\/)?(www\.)?/, "")
                          .split("/")[0]}
                      </Link>
                    </div>
                    {experience.company_website.includes("upwork") && (
                      <Link
                        href={experience.company_website}
                        className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                      >
                        View my upwork Freelance Profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p
                className="mt-[1rem] list-div text-[1.4rem] font-medium text-paragraph1 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html:
                    modifiedContent(
                      experience?.short_description,
                      listOfskills,
                      listOfdata
                    ) + (experience?.short_description.length > 80 ? "..." : ""),
                }}
              />
              <Link
                href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`}
                className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary mt-[0.3rem]"
              >
                Read More
              </Link>
            </div>

            {experience?.skills && experience?.skills.length > 0 && (
              <div className="w-full">
                <h4 className="text-[1.3rem] text-black font-medium mb-[0.5rem] mt-[1rem]">
                  AREAS OF EXPERTISE I'VE WORKED IN
                </h4>
                <div className="w-full flex-col items-start flex gap-5">
                  <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                    {Object?.values(skillsforExpereince)
                      ?.flat()
                      ?.map((skill, i) => (
                        <SkillComponent key={i} skill={skill} index={i} />
                      ))}
                    <Link
                      href={`/portfolio/${listOfdata?.portfolios_ids[0]?.id}?scroll=skills`}
                      className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                    >
                      Show More Skills
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Professional Experience Timeline Section 1 */}
      <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
        <div className="max-w-[1550px] w-full mx-auto">          
          <div className="max-w-[1550px] w-full mx-auto px-[4rem] flex items-center justify-center mt-[2rem] print:m-0">
            <div className="relative print:flex flex-col gap-4">
              <div className="absolute left-[10rem] top-[3rem] print:top-[5rem] w-[0.4rem] h-[calc(100%-78px)] bg-primary mx-[2.1rem]" />
              {firstGroupExperiences.map((experience, index) => renderExperience(experience, index))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Timeline Section 2 */}
      {secondGroupExperiences.length > 0 && (
        <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
          <div className="max-w-[1550px] w-full mx-auto">
            <div className="max-w-[1550px] w-full mx-auto px-[4rem] flex items-center justify-center mt-[2rem] print:m-0">
              <div className="relative print:flex flex-col gap-4">
                <div className="absolute left-[10rem] top-[3rem] print:top-[5rem] w-[0.4rem] h-[calc(100%-75px)] bg-primary mx-[2.1rem]" />
                {secondGroupExperiences.map((experience, index) => renderExperience(experience, index + 3))}
              </div>
            </div>
            
            {sortedExperiences.length > 6 && (
              <div className="flex justify-center mt-8">
                <Link
                  href={`/cv?scrollTo=experiences&expand=true`}
                  className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium"
                >
                  View Full Career Timeline
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default HomeExperienceSection;