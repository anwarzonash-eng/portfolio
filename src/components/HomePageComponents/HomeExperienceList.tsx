"use client";
import React from "react";
import ExperienceSection from "@/components/ExperienceSection";
import type { Experience, ProfileReport } from "@/types/api";

interface HomeExperienceListProps {
  listOfdata: ProfileReport | null;
  experiences: Experience[];
  showAllExperiences: boolean;
  setShowAllExperiences: (show: boolean) => void;
  initialCount: number;
  highlightedExperienceId: string | null;
  showMoreSkills: boolean[];
  setShowMoreSkills: (skills: boolean[]) => void;
  experiencesRef: React.MutableRefObject<HTMLElement | null>;
}

/** The "Professional Experience" timeline section (extracted verbatim from pages/home). */
const HomeExperienceList = ({
  listOfdata,
  experiences,
  showAllExperiences,
  setShowAllExperiences,
  initialCount,
  highlightedExperienceId,
  showMoreSkills,
  setShowMoreSkills,
  experiencesRef,
}: HomeExperienceListProps) => {
  if (
    !(
      listOfdata &&
      listOfdata.experiences_ids &&
      listOfdata.experiences_ids.length > 0
    )
  )
    return null;

  return (
    <section
      id="experienceSection"
      ref={experiencesRef} // FIX: ref on section wrapper
      className="w-full print_p_m print:h-screen print:break-before-page print:bg-[#a3ddd3]"
    >
      <div className="mainContainer print:shadow-none print:!pt-[3rem]">
        <div className="flex items-center justify-center lg:hidden">
          <div className="badge">Professional Experience</div>
        </div>
        <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
          My Professional Career Journey
        </div>

        {experiences
          .slice(0, showAllExperiences ? experiences.length : initialCount)
          .map((experience, index) => {
            // ⬅️ IMPORTANT: Add 'index' to the map callback arguments

            // 1. Declare the variable and logic inside the map function's body.
            const isLastItem =
              index ===
              experiences.slice(
                0,
                showAllExperiences ? experiences.length : initialCount,
              ).length -
              1;

            // 2. Return the JSX element.
            return (
              <div
                key={experience.id}
                id={`experience-${experience.id}`}
                className={
                  highlightedExperienceId === experience.id
                    ? "border border-primary rounded-[1rem] p-4"
                    : ""
                }
              >
                <ExperienceSection
                  index={index} // Changed this to the array index, as it is usually required for showMoreSkills array index
                  experience={experience}
                  listOfskills={listOfdata?.skills_ids}
                  listOfdata={listOfdata}
                  showMoreSkills={showMoreSkills}
                  setShowMoreSkills={setShowMoreSkills}
                  isLast={isLastItem} // ⬅️ Passed the correctly calculated isLast prop
                  variant="timeline"
                />
              </div>
            );
          })}

        {!showAllExperiences && experiences.length > initialCount && (
          <div className="flex items-center justify-center lg:ml-20">
            <button
              onClick={() => setShowAllExperiences(true)}
              className="btn-primary text-onPrimary py-[1rem] mt-[2rem] px-[3.4rem] text-[1.8rem] font-medium"
            >
              View Full Career Timeline
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeExperienceList;
