"use client";

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

interface PortfolioBlogDetailProps {
  portfolioDetails: any;
  formatDate: any;
  dateFormatsOptions: any;
  modifiedContent: any;
  filteredSkills: any;
  listOfdata: any;
  skillsforDetailPortfolio: any;
}

const PortfolioBlogDetail: React.FC<PortfolioBlogDetailProps> = ({
  portfolioDetails,
  formatDate,
  dateFormatsOptions,
  modifiedContent,
  filteredSkills,
  listOfdata,
  skillsforDetailPortfolio,
}) => {
  return (
    <article className="flex items-center justify-center h-screen w-full px-[2rem]">
      <div className="flex gap-[4rem]">
        <div className="flex flex-col gap-[1rem] min-w-[28rem]">
          <aside
            className="rounded-[1rem] bg-white p-[2.4rem] 
                      w-full flex flex-col gap-[3.2rem]"
          >
            {portfolioDetails?.my_role && (
              <div className="">
                <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                  MY ROLE
                </p>
                <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc">
                  {portfolioDetails?.my_role}
                </ul>
              </div>
            )}
            {portfolioDetails?.services_i_provide && (
              <div className="">
                <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                  SERVICE I PROVIDE
                </p>
                <div
                  className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc line-clamp-6"
                  dangerouslySetInnerHTML={{
                    __html: portfolioDetails?.services_i_provide,
                  }}
                ></div>
              </div>
            )}
            <div className="">
              <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                PROJECT DURATION
              </p>
              <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                <li>
                  {formatDate(
                    portfolioDetails?.starting_date,
                    dateFormatsOptions.shortMonthYear
                  )}{" "}
                  -{" "}
                  {formatDate(
                    portfolioDetails?.ending_Date,
                    dateFormatsOptions.shortMonthYear
                  )}
                </li>
              </ul>
            </div>
            {portfolioDetails?.client_name && (
              <div className="">
                <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                  Client
                </p>
                <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                  <li>{portfolioDetails?.client_name}</li>
                </ul>
              </div>
            )}
            {portfolioDetails?.has_testimonial && (
              <div className="">
                <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                  CLIENT DESIGNATION
                </p>
                <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                  <li>
                    This slide is 100% editable. Adapt it to your needs and
                    capture your audience’s attention.
                  </li>
                </ul>
              </div>
            )}
          </aside>
          <Link href={"/cv"}>
            <button className="w-full btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5rem] text-[1.8rem] font-medium border border-solid border-custom">
              View CV Online
            </button>
          </Link>
        </div>
        <div className="text-heading">
          <Link
            href={portfolioDetails?.link || "#"}
            className="text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center mb-[1.2rem]"
          >
            {portfolioDetails?.title}
          </Link>
          <h1 className="text-[3.2rem] font-medium leading-[4rem]">
            Client/Project Brief Description
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: modifiedContent(
                portfolioDetails?.tagline_1,
                filteredSkills,
                listOfdata
              ),
            }}
            className="text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem] line-clamp-6"
          ></p>
          <p
            className="text-[2rem] list-div leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem] line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: modifiedContent(
                portfolioDetails?.tagline_2,
                filteredSkills,
                listOfdata
              ),
            }}
          ></p>
          <div className="w-full ">
            <h4 className="text-primary text-[1.4rem] lg:text-[2rem] font-medium">
              AREAS OF EXPERTISE I'VE WORKED IN:
            </h4>
            <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem] mb-[3.2rem] mt-[1rem]">
              {skillsforDetailPortfolio && (
                <>
                  {Object.values(skillsforDetailPortfolio)
                    .flat() // flatten nested groups into one array
                    .slice(0, 10) // take only first 10
                    .map((skill, i) => (
                      <AreasOfExpertiesSkillComponent
                        skill={skill as SkillType}
                        index={i}
                        variant="different"
                      />
                    ))}
                </>
              )}
            </div>
            <div className="flex flex-col text-nowrap  gap-[1.4rem]">
              {portfolioDetails?.link &&
                listOfdata?.companytype !== "leewop" && (
                  <Link
                    href={portfolioDetails?.link || "#"}
                    className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max"
                  >
                    Launch Project - Live Preview
                  </Link>
                )}
              {portfolioDetails?.has_testimonial && (
                <Link
                  href={"/"}
                  className="text-primary  max-w-max text-[1.6rem] leading-[2.4rem] font-medium inline-block text-center"
                >
                  Check Client Testimonial
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PortfolioBlogDetail;
