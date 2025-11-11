import AreasOfExpertiesSkillComponent from "@/components/AreasOfExpertiesSkillComponent";
import { modifiedContent } from "@/hooks/modifiedContent";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Single Experience Item Component for individual rendering
export const SingleExperienceItem = ({
  experience,
  index,
  ShowmoreSkills,
  filteredSkills,
  listOfdata,
}) => {
  // Smart skills display logic - adjust count based on skill name lengths
  const getOptimalSkillsToShow = (skills) => {
    if (!skills || skills.length === 0) return [];
    
    // Check if any of the first 6 skills has a long name (more than 12 characters)
    const first6Skills = skills.slice(0, 6);
    const hasLongSkillNames = first6Skills.some(skill => skill.title && skill.title.length > 12);
    
    // If there are long names, show 5 skills to leave room for button
    // Otherwise, show 6 skills
    const skillsToShow = hasLongSkillNames ? 5 : 6;
    
    return ShowmoreSkills[index] 
      ? skills 
      : skills.slice(0, skillsToShow);
  };

  const skillsforExpereince: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
      icon?: string;
    }[];
  } = skillsGrouping(getOptimalSkillsToShow(experience?.skills));

  return (
    <div className="w-full mb-[2rem]">
      <div className="bg-white p-[1.6rem] rounded-[1rem] shadow w-full">
        <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] justify-between">
          {/* About Content */}
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
                    View my upwork Freelance Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
          <h1 className="mb-[1rem] text-primary text-[1.8rem] leading-[2rem] font-bold">
            {new Date(experience.starting_date).toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {isNaN(new Date(experience.ending_Date).getTime())
              ? experience.ending_Date
              : new Date(experience.ending_Date).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
          </h1>
        </div>

        <div className="w-full">
          <p
            className="mt-[1rem] list-div text-[1.4rem] font-medium text-paragraph1 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html:
                modifiedContent(
                  experience?.short_description,
                  filteredSkills,
                  listOfdata
                ) + (experience?.short_description.length > 80 ? "..." : ""), // Add ellipsis if description is long
            }}
          />
          <Link
            href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`} // Navigate to CV page with experience ID
            className="text-primary underline capitalize text-center text-[1.5rem] font-medium px-[1rem] inline-flex items-center justify-center relative group mt-[0.3rem] duration-300 hover:font-semibold"
          >
            Read More
          </Link>
        </div>

        <hr className="w-full my-[1rem] h-px bg-border" />

        {experience?.skills && experience?.skills.length > 0 && (
          <div className="w-full">
            <h4 className="text-[1.3rem] text-black font-medium mb-[0.5rem] mt-[1rem]">
              AREAS OF EXPERTISE I'VE WORKED IN
            </h4>
            <div className="w-full flex-col items-start flex gap-5">
              <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                {Object?.values(skillsforExpereince)?.map(
                  (group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                      {group.map((skill, i) => (
                        <AreasOfExpertiesSkillComponent
                          key={`${groupIndex}-${i}`}
                          skill={skill}
                          index={i}
                          groupIndex={groupIndex}
                        />
                      ))}
                    </React.Fragment>
                  )
                )}
                {/* Show "Show More Skills" button if there are more skills than displayed */}
                {(() => {
                  const totalSkills = experience?.skills?.length || 0;
                  const first6Skills = experience?.skills?.slice(0, 6) || [];
                  const hasLongSkillNames = first6Skills.some(skill => skill.title && skill.title.length > 12);
                  const skillsDisplayed = hasLongSkillNames ? 5 : 6;
                  
                  return totalSkills > skillsDisplayed;
                })() && (
                  <Link
                    href={`/portfolio/${listOfdata?.portfolios_ids[0]?.id}?scroll=skills`}
                    className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                  >
                    Show More Skills
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Page-aware Experiences Component that handles badge and experience distribution
export const ExperiencesPageRenderer = ({
  experiences,
  ShowmoreSkills,
  filteredSkills,
  listOfdata,
  pageIndex = 0,
  experiencesPerPage = 2, // Default number of experiences per page
}) => {
  // Calculate which experiences to show on this page
  const startIndex = pageIndex * experiencesPerPage;
  const endIndex = startIndex + experiencesPerPage;
  const experiencesForThisPage = experiences.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      {experiencesForThisPage.map((experience, index) => (
        <SingleExperienceItem
          key={experience.id}
          experience={experience}
          index={startIndex + index} // Use actual index for skills logic
          ShowmoreSkills={ShowmoreSkills}
          filteredSkills={filteredSkills}
          listOfdata={listOfdata}
        />
      ))}
    </div>
  );
};

// Helper function to get sorted experiences
export const getSortedExperiences = (experiences_ids) => {
  return [...experiences_ids]
    ?.sort((a, b) => {
      const yearA = new Date(a.ending_Date).getFullYear();
      const yearB = new Date(b.ending_Date).getFullYear();

      if (yearA !== yearB) {
        return yearB - yearA;
      }

      const monthA = new Date(a.ending_Date).getMonth();
      const monthB = new Date(b.ending_Date).getMonth();

      return monthB - monthA;
    })
    ?.slice(0, 3); // Limit to maximum 3 experiences for print
};

// Original component for backward compatibility (renders all experiences)
const ExperienceCvPortrait = ({
  listOfdata,
  showAllExperiences,
  ShowmoreSkills,
  filteredSkills,
}) => {
  const sortedExperiences = getSortedExperiences(listOfdata?.experiences_ids || []);

  return (
    <>
          {sortedExperiences.map((experience, index) => (
            <SingleExperienceItem
              key={experience.id}
              experience={experience}
              index={index}
              ShowmoreSkills={ShowmoreSkills}
              filteredSkills={filteredSkills}
              listOfdata={listOfdata}
            />
          ))}
    </>
  );
};

export default ExperienceCvPortrait;
