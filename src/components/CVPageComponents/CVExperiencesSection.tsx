"use client";
import React from "react";
import ExperienceSection from "@/components/ExperienceSection";
import CVSectionHeading from "@/components/CVPageComponents/CVSectionHeading";
import CVTimelineDot from "@/components/CVPageComponents/CVTimelineDot";
import { sortByDate } from "@/utils/sortByDate";
import type { ProfileReport, SkillRef } from "@/types/api";

interface CVExperiencesSectionProps {
  listOfdata: ProfileReport | null;
  filteredSkills: SkillRef[];
  isMobile: boolean;
  showAllExperiences: boolean;
  setShowAllExperiences: (show: boolean) => void;
  highlightedExperienceId: string | null;
  showMoreSkills: boolean[];
  setShowMoreSkills: (skills: boolean[]) => void;
}

/** The CV "Experiences" timeline block (extracted verbatim from pages/cv). */
const CVExperiencesSection = ({
  listOfdata,
  filteredSkills,
  isMobile,
  showAllExperiences,
  setShowAllExperiences,
  highlightedExperienceId,
  showMoreSkills,
  setShowMoreSkills,
}: CVExperiencesSectionProps) => {
  if (!(listOfdata && listOfdata?.experiences_ids?.length > 0)) return null;

  return (
    <div
      id="experienceSection"
      className="relative flex items-start print:break-before-page"
    >
      <CVTimelineDot
        positionClassName="absolute top-0 left-[-1.3rem] z-[60]"
        circleClassName="mt-[3rem] mb-[2rem]"
      />
      <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print_p_m">
        <div className="w-full">
          <CVSectionHeading title="Experiences" margin="mt-[3rem] mb-[2rem]" />
        </div>
        <div className="">
          {[...(listOfdata?.experiences_ids || [])]
            .sort(sortByDate)
            .slice(
              0,
              showAllExperiences
                ? listOfdata.experiences_ids.length
                : isMobile
                  ? 3
                  : 6,
            )
            .map((experience, index) => (
              <div
                key={index}
                id={`experience-${experience.id}`}
                className={`relative ${highlightedExperienceId ===
                    experience.id
                    ? "border border-primary rounded-[1rem]"
                    : ""
                  }`}
              >
                <ExperienceSection
                  experience={experience}
                  index={index}
                  listOfskills={filteredSkills}
                  listOfdata={listOfdata}
                  showMoreSkills={showMoreSkills}
                  setShowMoreSkills={setShowMoreSkills}
                  variant="list"
                />
              </div>
            ))}
        </div>
        {listOfdata?.experiences_ids?.length > (isMobile ? 3 : 6) &&
          !showAllExperiences && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllExperiences(true)}
                className="bg-primary py-[0.8rem] px-[2.4rem] text-white hover:bg-white border border-primary hover:text-primary rounded-[2rem] text-[1.6rem] font-medium transition-colors"
              >
                View Full Career Timeline
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default CVExperiencesSection;
