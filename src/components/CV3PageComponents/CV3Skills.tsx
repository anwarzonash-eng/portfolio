import type { SkillRef } from "@/types/api";

type CV3SkillsProps = {
    sortedSkills?: SkillRef[] | null;
};

const CV3Skills = ({ sortedSkills }: CV3SkillsProps) => {
    if (!sortedSkills || sortedSkills.length === 0) return null;

    return (

        <div className="mb-6">

            <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black ">SKILLS</h2>
            <div className="flex flex-wrap gap-4">
                {sortedSkills.map((skill) => (
                    <span key={skill.id} className="px-3 py-1 border-b border-black text-gray-700 font-bold text-[14px] ">
                        {skill.title}
                    </span>
                ))}

            </div>
        </div>
    );
};

export default CV3Skills;
