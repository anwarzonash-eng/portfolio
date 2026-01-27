import React from "react";

type CVLatestSkillsProps = {
  sortedSkills?: any[] | null;
};

const CVLatestSkills = ({ sortedSkills }: CVLatestSkillsProps) => {
  if (!sortedSkills || sortedSkills.length === 0) return null;

  return (
    <section className="mt-[2rem] mb-[4rem]">
      <h2 className="CVLatestHeading">
        SKILLS
      </h2>
      <div className="flex items-center gap-[0.8rem] flex-wrap my-[1rem]">
        {sortedSkills.map((skill, i) => (
          <div
            key={skill.id || i}
            className="hover:bg-primary hover:text-white py-[0.4rem] px-[0.8rem] border border-primary border-solid text-primary rounded-[10rem] text-[1.4rem] font-medium leading-normal"
          >
            {skill.title}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CVLatestSkills;