"use client";

import ExperienceCard from "./ExperienceCard"; // make sure path is correct

const HomeExperienceSection = ({
  listOfdata,
  skillsGrouping,
  showMoreSkills,
  listOfskills,
  start,
  end,
  hideLinks,
  bulletCount
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

  const renderExperience = (experience, _index) => {
    return (
      <div key={experience.id} className="relative flex items-start space-y-[2rem]">
        {/* Timeline Dot */}

        {/* Vertical Timeline Line */}

        {/* Experience Card */}
        <div className="w-full">
          <ExperienceCard
            listOfdata={{ experiences_ids: [experience] }}
            skillsGrouping={skillsGrouping}
            showMoreSkills={showMoreSkills}
            filteredSkills={listOfskills}
            hideLinks={hideLinks}
            start={0}
            end={1}
            bulletCount={bulletCount}
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
