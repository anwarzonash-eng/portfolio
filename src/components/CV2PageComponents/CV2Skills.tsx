import React from "react";

type CV2SkillsProps = {
  sortedSkills?: any[] | null;
};

const CV2Skills = ({ sortedSkills }: CV2SkillsProps) => {
  if (!sortedSkills || sortedSkills.length === 0) return null;

  return (
    <section className="mt-[2rem] mb-[4rem]">
      <h2 className="cv2SecondaryHeading">SKILLS</h2>
      <div className="flex items-center gap-[0.8rem] flex-wrap my-[1rem]">
        {sortedSkills.map((skill, idx) => (
          <span
            key={skill.title + idx}
            className="bg-primary/10 text-primary font-medium text-[1.2rem] px-4 py-1 rounded-full border border-primary/30 shadow-sm mb-2"
          >
            {skill.title}
          </span>
        ))}
      </div>
    </section>
  );
};

export default CV2Skills;
