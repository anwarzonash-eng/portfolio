import { modifiedContent } from "@/hooks/modifiedContent";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

type Variant = "small" | "medium" | "different";

interface AreasOfExpertiesSkillComponentProps {
  skill: SkillType;
  index: number;
  groupIndex?: number | null; // ✅ optional or null
  variant?: Variant; // default: "small"
}

const AreasOfExpertiesSkillComponent: React.FC<
  AreasOfExpertiesSkillComponentProps
> = ({ skill, index, groupIndex, variant = "small" }) => {
  const animationDelay = `${index * 0.1}s`;

  // Define style variants
  const baseVariants: Record<Variant, string> = {
    small:
      "capitalize text-center text-primary text-[1.2rem] font-medium py-[0.3rem] px-[1.5rem] bg-white " +
      "flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] " +
      "rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn " +
      "relative group transition-all duration-200 hover:bg-primary hover:text-white",
    medium:
      "hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group",

    different:
      "hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal",
  };

  const baseClasses = baseVariants[variant];

  const key = groupIndex != null ? `${groupIndex}-${index}` : `${index}`;

  // Render
  if (skill.url) {
    return (
      <Link href={skill.url || "#"} legacyBehavior key={key}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay }}
          className={baseClasses}
        >
          {skill.title}
        </a>
      </Link>
    );
  }

  return (
    <div key={key}>
      <span
        style={{ animationDelay }}
        className={`${baseClasses} ${
          variant !== "different" ? "inline-flex" : ""
        }`}
      >
        {skill.title}
      </span>
    </div>
  );
};

const ExperienceCard = ({
  listOfdata,
  skillsGrouping,
  showMoreSkills = [],
  filteredSkills,
  start = 0,
  end,
}) => {
  // Guard against null or undefined experiences and sort them
  const sortedExperiences = React.useMemo(() => {
    if (!listOfdata?.experiences_ids) {
      return [];
    }
    // Create a shallow copy before sorting to avoid mutating props
    return [...listOfdata.experiences_ids].sort((a, b) => {
      const dateA = new Date(a.starting_date).getTime();
      const dateB = new Date(b.starting_date).getTime();
      return dateB - dateA; // Sort descending
    });
  }, [listOfdata?.experiences_ids]);

  // Slice experiences based on start and end props
  const experiencesToShow =
    end !== undefined
      ? sortedExperiences.slice(start, end)
      : sortedExperiences.slice(start);

  // Smart skills display logic - adjust count based on skill name lengths
  const getOptimalSkillsToShow = (skills, index) => {
    if (!skills || skills.length === 0) return [];

    // Check if any of the first 6 skills has a long name (more than 12 characters)
    const first6Skills = skills.slice(0, 6);
    const hasLongSkillNames = first6Skills.some(
      (skill) => skill.title && skill.title.length > 12
    );

    // If there are long names, show 5 skills to leave room for button
    // Otherwise, show 6 skills
    const skillsToShow = hasLongSkillNames ? 5 : 6;

    return showMoreSkills[index] ? skills : skills.slice(0, skillsToShow);
  };

  return (
    <div className="relative w-full px-[2rem] mb-[2rem] space-y-[20px]">
      {experiencesToShow.map((experience, index) => {
        const optimalSkills = getOptimalSkillsToShow(experience?.skills, index);
        const skillsforExpereince = skillsGrouping(optimalSkills);

        // Determine if "Show More Skills" button should be shown
        const totalSkills = experience?.skills?.length || 0;
        const first6Skills = experience?.skills?.slice(0, 6) || [];
        const hasLongSkillNames = first6Skills.some(
          (skill) => skill.title && skill.title.length > 12
        );
        const skillsDisplayed = hasLongSkillNames ? 5 : 6;
        const shouldShowMoreButton = totalSkills > skillsDisplayed;

        return (
          <div
            key={experience.id}
            className="bg-white p-[1.4rem] rounded-[1rem] shadow w-full relative"
          >
            <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
              {/* About Content */}
              <div className="flex gap-[1rem] items-center  w-full justify-between">
                <div className="flex items-center gap-2">
                  {experience?.thumbnail && (
                    <div className="h-[3.5rem] w-[3.5rem] bg-[#D1E9FF] rounded-[0.4rem] relative">
                      <Image
                        src={experience?.thumbnail}
                        loading="eager"
                        priority={true}
                        height={26}
                        width={26}
                        alt="Logo Mark"
                        className="h-[2.6rem] w-[2.6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[1.2rem] font-normal text-paragraph1">
                      {experience?.company_name}
                    </p>
                    <h3 className="text-[1.4rem] font-medium text-heading">
                      {experience?.title}
                    </h3>
                  </div>
                </div>

                {/* Link */}
                <div className="flex justify-end w-auto">
                  <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                    <div className=" py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white ">
                      <Link
                        href={experience.company_website}
                        className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold relative py-2 pl-[1rem] text-[1.3rem]"
                      >
                        {
                          experience.company_website
                            .replace(/^(https?:\/\/)?(www\.)?/, "")
                            .split("/")[0]
                        }{" "}
                      </Link>
                    </div>
                    {experience.company_website.includes("upwork") && (
                      <Link
                        href={experience.company_website}
                        className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                      >
                        View my upwork Freelance Profile
                      </Link>
                    )}{" "}
                  </div>
                </div>
              </div>
              <h1 className="mb-[1rem] text-primary text-[1.8rem] leading-[2rem] font-bold">
                {new Date(experience.starting_date).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {isNaN(new Date(experience.ending_Date).getTime())
                  ? experience.ending_Date
                  : new Date(experience.ending_Date).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
              </h1>
            </div>

            <div className="w-full">
              <p
                className="mt-[1rem] list-div text-[1.4rem] font-medium text-paragraph1 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: modifiedContent(
                    experience?.short_description,
                    filteredSkills,
                    listOfdata
                  ),
                }}
              />
              <Link
                href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`} // Navigate to CV page with experience ID
                className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary mt-[1rem]"
              >
                Read More
              </Link>
            </div>

            <hr className="w-full my-[1rem] h-px bg-border" />

            {experience?.skills && experience?.skills.length > 0 && (
              <div className="w-full">
                <h4 className="text-[1.3rem] text-black font-medium mb-[0.5rem] mt-[1rem]">
                  AREAS OF EXPERTISE I'VE WORKED IN
                </h4>
                <div className="w-full flex-col items-start flex gap-5">
                  <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                    {Object.values(skillsforExpereince).map(
                      (group: SkillType[], groupIndex) => (
                        <React.Fragment key={groupIndex}>
                          {group.map((skill, i) => (
                            <AreasOfExpertiesSkillComponent
                              key={`${groupIndex}-${i}`}
                              skill={skill}
                              index={i}
                              groupIndex={groupIndex}
                            />
                          ))}
                        </React.Fragment>
                      )
                    )}
                    {shouldShowMoreButton && (
                      <Link
                        href={`/portfolio/${listOfdata?.portfolios_ids?.[0]?.id}?scroll=skills`}
                        className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                      >
                        Show More Skills
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceCard;
