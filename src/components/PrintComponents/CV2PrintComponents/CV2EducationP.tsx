import type { Education } from "@/types/api";

type Props = {
  education?: Education[] | null;
  location?: string | null;
};


const CV2Education = ({ education }: Props) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="mb-[4rem] pl-[2rem]">
      <div className="mt-[1rem] space-y-[1.2rem]">
        {education.map((edu, index) => (
          <div key={index} className="flex gap-[1.6rem]">
            <div className="w-[16rem] flex-shrink-0 text-[1.4rem] text-paragraph1">
            </div>
            <div className="flex-1 border-l border-[#E5E7EB] pl-[1.6rem] relative">
              <span className="absolute -left-[0.7rem] top-0 h-[1.2rem] w-[1.2rem] rounded-full bg-primary" />
              <div className="text-[1.6rem] font-semibold text-heading">
                {edu?.degree_name || edu?.degree}
              </div>
              <div className="text-[1.4rem] text-primary font-medium">
                {edu?.university_name || edu?.school}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CV2Education;
