import React from "react";

type CV2SkillsProps = {
  sortedSkills?: any[] | null;
};

const CV2Skills = ({ sortedSkills }: CV2SkillsProps) => {
  if (!sortedSkills || sortedSkills.length === 0) return null;

  return (
    <section className="mt-[2rem] mb-[4rem]">
      <h2 className="cv2SecondaryHeading">
        SKILLS
      </h2>
      <div className="flex items-center gap-[0.8rem] flex-wrap my-[1rem]">
            <div className="text-paragraph1 text-[1.4rem] leading-normal">
              {sortedSkills.map((skill) => skill.title).join(", ")}
            </div>
      </div>
    </section>
  );
};
  
export default CV2Skills;