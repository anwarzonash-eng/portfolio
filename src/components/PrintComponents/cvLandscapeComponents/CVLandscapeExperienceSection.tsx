import React from "react";
import Image from "next/image";
import Link from "next/link";
import AreasOfExpertiesSkillComponent from "@/components/AreasOfExpertiesSkillComponent";
import NoteDomainForPint from "@/components/NoteDomainForPint";

const CVLandscapeExperienceSection = ({ urlInfo: _urlInfo,
  listOfdata,
  showAllExperiences,
  showMoreSkills,
  skillsGrouping,
  modifiedContent,
  filteredSkills,
  min,
  max,
  hideLinks,
}) => {
  return (
    <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
      {/* Note and Domain For Each Page */}
      {!hideLinks && (
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      )}
      <div className="max-w-[1550px] w-full mx-auto">
        {/* Badge */}
        <div className="flex items-center justify-center pb-[2rem]">
          <div className="badge">Professional Experience</div>
        </div>
        {/* Timeline */}
        <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center mt-[2rem] print:m-0 ">
          <div className="relative print:flex flex-col gap-4">
            {listOfdata?.experiences_ids &&
              [...listOfdata.experiences_ids]
                ?.sort((a, b) => {
                  const yearA = new Date(a.ending_Date).getFullYear();
                  const yearB = new Date(b.ending_Date).getFullYear();

                  if (yearA !== yearB) {
                    return yearB - yearA;
                  }

                  const monthA = new Date(a.ending_Date).getMonth();
                  const monthB = new Date(b.ending_Date).getMonth();

                  return monthB - monthA;
                })
                ?.slice(
                  min,
                  showAllExperiences ? listOfdata.experiences_ids.length : max,
                )
                ?.map((experience, index) => {
                  const skillsforExpereince: {
                    [key: string]: {
                      title: string;
                      url?: string;
                      order?: string;
                      icon?: string;
                    }[];
                  } = skillsGrouping(
                    showMoreSkills[index]
                      ? experience?.skills
                      : experience?.skills?.slice(0, 6),
                  );
                  return (
                    <>
                      {/* Timeline items Container */}
                      <div className="space-y-[1rem] space-x-[9rem]">
                        {/* Timeline item */}
                        <>
                          <div className="relative flex items-start">
                            {/* Card */}
                            <div
                              className="bg-white p-[1.6rem]
                                               rounded-[1rem] shadow w-full mb-[1rem]"
                            >
                              <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                                {/* About Content */}
                                <div className="flex gap-[1rem] items-center  w-full justify-between">
                                  <div className="flex items-center gap-2">
                                    {experience?.thumbnail && (
                                      <div className="h-[3.5rem] w-[3.5rem]  rounded-[0.4rem] relative">
                                        <Image
                                          src={experience?.thumbnail}
                                          height={26}
                                          width={26}
                                          alt="Logo Mark"
                                          className="h-[2.6rem] 
                                                                w-[2.6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
                                  {!hideLinks && (
                                    <div className="flex justify-end w-auto">
                                      <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                                        {experience.company_website.includes(
                                          "upwork",
                                        ) && (
                                            <div className="flex items-center gap-2">
                                              <Link
                                                href={
                                                  experience.company_website ??
                                                  "#"
                                                }
                                                target="_blank"
                                                className="
                                  bg-black text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary duration-300 text-nowrap
                                  flex items-center justify-center
                                  text-[1.4rem] font-medium rounded-[20rem] p-[1rem] py-[0.5rem] group"
                                              >
                                                <span>Check My</span>
                                                <div className="h-[2.5rem] w-[2.5rem] rounded-full relative mx-2 inline-block">
                                                  <Image
                                                    src="/images/upworkforContactComponent.svg"
                                                    alt="Upwork Logo"
                                                    width={25}
                                                    height={25}
                                                    loading="eager"
                                                    priority={true}
                                                    className="h-full w-full object-cover rounded-full group-hover:border-primary border border-transparent duration-300
                                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                  />
                                                </div>
                                                <span>Profile</span>
                                              </Link>
                                            </div>
                                          )}
                                        {!experience.company_website.includes(
                                          "upwork",
                                        ) && (
                                            <div className="bg-white border border-[#E2E6EE] text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-sectionBG hover:text-white duration-300">
                                              <Link
                                                href={experience.company_website}
                                                className="flex gap-2 items-center p-4"
                                              >
                                                {
                                                  experience.company_website
                                                    .replace(
                                                      /^(https?:\/\/)?(www\.)?/,
                                                      "",
                                                    )
                                                    .split("/")[0]
                                                }
                                              </Link>
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <h1 className="mb-[1rem] text-primary text-[1.8rem] leading-[2rem] font-bold">
                                  {new Date(
                                    experience.starting_date,
                                  ).toLocaleString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}{" "}
                                  -{" "}
                                  {isNaN(
                                    new Date(experience.ending_Date).getTime(),
                                  )
                                    ? experience.ending_Date
                                    : new Date(
                                      experience.ending_Date,
                                    ).toLocaleString("en-US", {
                                      month: "short",
                                      year: "numeric",
                                    })}
                                </h1>
                              </div>

                              <div className="w-full">
                                <p
                                  className={`mt-[1rem] list-div text-[1.4rem] font-medium text-paragraph1 line-clamp-2`}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      modifiedContent(
                                        experience?.short_description,
                                        filteredSkills,
                                        listOfdata,
                                      ) +
                                      (experience?.short_description?.length >
                                        80
                                        ? "..."
                                        : ""), // Add ellipsis if description is long
                                  }}
                                />
                                {!hideLinks && (
                                  <Link
                                    href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`} // Navigate to CV page with experience ID
                                    className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary mt-[1rem]"
                                  >
                                    Read More
                                  </Link>
                                )}
                              </div>

                              <hr className="w-full my-[1rem] h-px bg-border" />

                              {experience?.skills &&
                                experience?.skills.length > 0 && (
                                  <div className="w-full">
                                    <h4 className="text-[1.3rem] text-black font-medium mb-[0.5rem] mt-[1rem]">
                                      AREAS OF EXPERTISE I&apos;VE WORKED IN
                                    </h4>
                                    <div className="w-full flex-col items-start flex gap-5">
                                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                                        {Object?.values(
                                          skillsforExpereince,
                                        )?.map((group, groupIndex) => (
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
                                        ))}
                                        {!hideLinks && (
                                          <Link
                                            href={
                                              listOfdata?.portfolios_ids?.[0]
                                                ?.id
                                                ? `/portfolio/${listOfdata.portfolios_ids[0].id}?scroll=skills`
                                                : "#"
                                            }
                                            className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary 
                                                              text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                                          >
                                            Show More Skills
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </>
                      </div>{" "}
                    </>
                  );
                })}{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVLandscapeExperienceSection;
