import React from "react";

type CVLatestSkillsProps = {
  sortedSkills?: any[] | null;
};

const CVLatestSkills = ({ sortedSkills }: CVLatestSkillsProps) => {
  if (!sortedSkills || sortedSkills.length === 0) return null;

  return (
    <section className="mt-[1.6rem]">
      <h2 className="text-[1.6rem] font-semibold text-heading tracking-wide">
        SKILLS
      </h2>
      <div className="flex items-center gap-[0.8rem] flex-wrap mt-[1rem]">
        {sortedSkills.map((skill, i) => (
          <div
            key={skill.id || i}
            className="hover:bg-primary hover:text-white py-[0.4rem] px-[0.8rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.2rem] font-medium leading-normal"
          >
            {skill.title}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CVLatestSkills;