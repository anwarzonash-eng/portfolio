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
  hideLinks?: boolean;
}

const AreasOfExpertiesSkillComponent: React.FC<
  AreasOfExpertiesSkillComponentProps
> = ({ skill, index, groupIndex, variant = "small", hideLinks }) => {


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
  if (skill.url && !hideLinks) {
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
        className={`${baseClasses} ${variant !== "different" ? "inline-flex" : ""
          }`}
      >
        {skill.title}
      </span>
    </div>
  );
};

const ExperienceCvPortrait = ({
  listOfdata,
  skillsGrouping,
  showMoreSkills = [],
  filteredSkills,
  hideLinks,
  start = 0,
  end,
  bulletCount
}) => {

  // helper to keep only first `limit` <li> elements in any HTML string
  const truncateListItems = (html, limit = 3) => {
    if (!html) return html;
    let count = 0;
    return html.replace(/<li[^>]*>[\s\S]*?<\/li>/gi, (match) => {
      count += 1;
      return count <= limit ? match : "";
    });
  };
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
    const first9Skills = skills.slice(0, 9);
    const hasLongSkillNames = first9Skills.some(
      (skill) => skill.title && skill.title.length > 12,
    );

    // If there are long names, show 5 skills to leave room for button
    // Otherwise, show 6 skills
    const skillsToShow = hasLongSkillNames ? 8 : 9;

    return showMoreSkills[index] ? skills : skills.slice(0, 11);
  };

  return (
    <div className="relative w-full px-[2rem] mb-[2rem] space-y-[20px]">
      {experiencesToShow.map((experience, index) => {
        const optimalSkills = getOptimalSkillsToShow(experience?.skills, index);
        const skillsforExpereince = skillsGrouping(optimalSkills);

        // Determine if "Show More Skills" button should be shown
        const totalSkills = experience?.skills?.length || 0;
        const first9Skills = experience?.skills?.slice(0, 8) || [];
        const hasLongSkillNames = first9Skills.some(
          (skill) => skill.title && skill.title.length > 12,
        );
        const skillsDisplayed = hasLongSkillNames ? 7 : 8;
        const shouldShowMoreButton = totalSkills > skillsDisplayed;

        // truncate long_description to first 4 <li> elements before modifying content
        const descriptionHtml = truncateListItems(experience?.long_description || "", bulletCount);

        return (
          <div
            key={experience.id}
            className={`${experience?.company_name !== "Upwork" ? "bg-white" : "bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 border-2 border-[#295050ae]"} p-[1.4rem] rounded-[1rem] shadow w-full relative`}
          >
            <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
              {/* About Content */}
              <div className="flex gap-[1rem] items-center  w-full justify-between">
                <div className="flex items-center gap-2">
                  {experience?.thumbnail && (
                    <div className="h-[3.5rem] w-[3.5rem]  rounded-[0.4rem] relative">
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
                    <h3 className="text-[1.2rem] font-medium text-heading">
                      {experience?.title}{" "}
                      {experience?.company_name !== "Upwork" &&
                        (experience?.type || experience?.nature) && (
                          <span className="font-semibold text-primary">
                            ({[experience?.type, experience?.nature].filter(Boolean).join(", ")})
                          </span>
                        )}
                    </h3>
                  </div>
                </div>

                {/* Link */}
                {!hideLinks &&
                  <div className="flex justify-end w-auto">
                    <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                      {experience &&
                        experience.company_website.includes("upwork") && (
                          <div className="flex items-center gap-2">
                            <Link
                              href={experience.company_website ?? "#"}
                              target="_blank"
                              className="
                                bg-[#00473c] text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary duration-300 text-nowrap
                                flex items-center justify-center
                                text-[1.4rem] font-medium rounded-[20rem] p-[1rem] py-[0.5rem] group"
                            >
                              <span>Check My</span>
                              {/* <div className="h-[2.5rem] w-[2.5rem] rounded-full relative mx-2 inline-block">
                              <Image
                                src="/images/upworkText.svg"
                                alt="Upwork Logo"
                                width={25}
                                height={25}
                                loading="eager"
                                priority={true}
                                className="h-full w-full object-cover rounded-full group-hover:border-primary border border-transparent duration-300
                                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                              />
                            </div> */}
                              <div className="h-[3.5rem] w-[10rem] relative mx-2 inline-block overflow-hidden rounded-[10rem] px-2 bg-white">
                                <Image
                                  src="/images/upworkText.svg"
                                  alt="Upwork Logo"
                                  width={100}
                                  height={35}
                                  loading="eager"
                                  priority={true}
                                  className="h-full w-full object-contain object-center p-[0.5rem]
                                                        border-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                              </div>
                              <span>Profile</span>
                            </Link>
                          </div>
                        )}


                      {!experience.company_website.includes("upwork") && <p className="mb-[1rem] text-primary text-[1.2rem] leading-[2rem] ">
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
                      </p>}
                      {/* {!experience.company_website.includes("upwork") && (
                        <div className="bg-white border border-[#E2E6EE] text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-sectionBG hover:text-white duration-300">
                          <Link
                            href={experience.company_website}
                            className="flex gap-2 items-center p-4"
                          >
                            {
                              experience.company_website
                                .replace(/^(https?:\/\/)?(www\.)?/, "")
                                .split("/")[0]
                            }
                          </Link>
                        </div>
                      )} */}
                    </div>
                  </div>
                }
              </div>

            </div>

            <div className="w-full">
              <p
                className="mt-[1rem] g-m-0 list-div text-[1.2rem] "
                dangerouslySetInnerHTML={{
                  __html: modifiedContent(
                    descriptionHtml,
                    filteredSkills,
                    listOfdata,
                  ),
                }}
              />
              {!hideLinks && experience?.company_name !== "Upwork" && (
                <div className="flex items-center justify-center">


                  <Link
                    href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`} // Navigate to CV page with experience ID
                    className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary mt-[1rem]"
                  >
                    Read More
                  </Link>
                </div>
              )}
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
                              hideLinks={hideLinks}
                            />
                          ))}
                        </React.Fragment>
                      ),
                    )}
                    {shouldShowMoreButton && !hideLinks && (
                      <Link
                        href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`}
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

export default ExperienceCvPortrait;
