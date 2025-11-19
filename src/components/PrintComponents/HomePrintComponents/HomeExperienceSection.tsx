"use client";

import React from "react";
import ExperienceCard from "./ExperienceCard"; // make sure path is correct

const HomeExperienceSection = ({
  listOfdata,
  skillsGrouping,
  showMoreSkills,
  listOfskills,
  start,
  end
}) => {
  if (!listOfdata?.experiences_ids?.length) return null;

  // Sort experiences by ending date (newest first)
  const sortedExperiences = [...listOfdata.experiences_ids].sort((a, b) => {
    const yearA = new Date(a.ending_Date).getFullYear();
    const yearB = new Date(b.ending_Date).getFullYear();
    if (yearA !== yearB) return yearB - yearA;

    const monthA = new Date(a.ending_Date).getMonth();
    const monthB = new Date(b.ending_Date).getMonth();
    return monthB - monthA;
  });

  // Split first 3 experiences for first section
  const firstGroupExperiences = sortedExperiences.slice(start, end);

  const renderExperience = (experience, index) => {
    return (
      <div key={experience.id} className="relative flex items-start space-y-[2rem]">
        {/* Timeline Dot */}
        <div className="absolute top-0 left-[2rem] flex items-center z-50">
          <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
            <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
          </div>
        </div>

        {/* Vertical Timeline Line */}
        <div className="absolute left-[3.1rem] top-[-1rem] w-[0.4rem] 
        h-full bg-primary" />
        

        {/* Experience Card */}
        <div className="ml-[6rem] w-full">
          <ExperienceCard
            listOfdata={{ experiences_ids: [experience] }}
            skillsGrouping={skillsGrouping}
            showMoreSkills={showMoreSkills}
            filteredSkills={listOfskills}
            start={0}
            end={1}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-4">
        {firstGroupExperiences.map((experience, index) =>
          renderExperience(experience, index)
        )}
      </div>
  );
};

export default HomeExperienceSection;
