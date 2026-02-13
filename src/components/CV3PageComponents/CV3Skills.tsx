import React from "react";

type CV3SkillsProps = {
    sortedSkills?: any[] | null;
};

const CV3Skills = ({ sortedSkills }: CV3SkillsProps) => {
    if (!sortedSkills || sortedSkills.length === 0) return null;

    return (
        // <section className="mt-[2rem] mb-[4rem]">
        //     <h2 className="cv3SecondaryHeading">
        //         SKILLS
        //     </h2>
        //     <div className="flex items-center gap-[0.8rem] flex-wrap my-[1rem]">
        //         <div className="text-primary font-medium text-[1.4rem] leading-normal">
        //             {sortedSkills.map((skill) => skill.title).join(", ")}
        //         </div>
        //     </div>
        // </section>


        <div className="mb-6">

            <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black ">SKILLS</h2>
            <div className="flex flex-wrap gap-4">
                {sortedSkills.map((skill) => (
                    <span key={skill.id} className="px-3 py-1 border-b border-black text-gray-700 font-bold text-[14px] ">
                        {skill.title}
                    </span>
                ))}
                {/* <span className="px-3 py-1 border-b border-black  text-gray-700 font-bold text-[14px] ">Python</span> */}

            </div>
        </div>
    );
};

export default CV3Skills;