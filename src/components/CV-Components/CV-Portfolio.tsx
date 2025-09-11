"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import ShowmoreSkills from "../showmoreSkills";

// Types
interface Skill {
  title: string;
  url?: string;
}

interface PortfolioType {
  id: string | number;
  title: string;
  link?: string;
  starting_date: string;
  ending_Date: string;
  company_icon?: string;
  thumbnail?: string;
  tagline_1?: string;
  tagline_2?: string;
  features_short?: string;
  pictures?: string[];
  child_hero_banner?: string;
  skills?: Skill[];
  has_testimonial?: boolean;
}

interface CVPortfolioProps {
  portfolio: PortfolioType;
  index: number;
  listOfskills: any;
  listOfdata: any;
  skillsForPortfolios: Record<string, Skill[]>;
  showMoreSkillsForPortfolios: boolean[];
  setShowMoreSkillsForPortfolios: React.Dispatch<
    React.SetStateAction<boolean[]>
  >;
  openModal: (
    pictures?: string[],
    thumbnail?: string,
    childHeroBanner?: string
  ) => void;
  modifiedContent: (
    content: string,
    listOfskills: any,
    listOfdata: any
  ) => string;
  expandedPortfolio: boolean;
  setExpandedPortfolio: React.Dispatch<React.SetStateAction<boolean>>;
}

const CVPortfolio: React.FC<CVPortfolioProps> = ({
  portfolio,
  index,
  listOfskills,
  listOfdata,
  skillsForPortfolios,
  showMoreSkillsForPortfolios,
  setShowMoreSkillsForPortfolios,
  openModal,
  modifiedContent,
  expandedPortfolio,
  setExpandedPortfolio,
}) => {
  return (
    <div className="w-full">
      {/* Title for print */}
      <h2 className="text-heading print:block hidden leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] print:p-0 pb-[2rem]">
        Portfolios
      </h2>

      {/* Date */}
      <h2
        key={index}
        className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] print:mb-[0rem] print:!mt-[1.3rem] mb-[3rem]"
      >
        {formatDate(portfolio?.starting_date, dateFormatsOptions.onlyYear)} -{" "}
        {isNaN(new Date(portfolio.ending_Date).getFullYear())
          ? portfolio.ending_Date
          : formatDate(portfolio.ending_Date, dateFormatsOptions.onlyYear)}
      </h2>

      {/* Card */}
      <div className="max-lg:p-[1.5rem] print_p_m print:!mt-[2rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
        <div className="w-full">
          <div className="flex items-center justify-between flex-col-reverse xl:flex-row">
            <div>
              <Link
                href={portfolio?.link || "#"}
                target="_blank"
                className="flex gap-[1rem] p-2 hover:bg-[#D1E9FF] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
              >
                {portfolio?.company_icon && (
                  <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block">
                    <Image
                      src={portfolio?.company_icon}
                      alt="Case"
                      height={34}
                      width={34}
                      className="h-[2rem] w-[2rem]"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                    {portfolio?.title}
                  </h1>
                  <Link
                    href={portfolio?.link || "#"}
                    className="text-[#1F4FE1] break-all text-[1.4rem] lg:text-[1.6rem] font-normal leading-normal"
                  >
                    {
                      portfolio?.link
                        ?.replace(/^(https?:\/\/)?(www\.)?/, "")
                        .split("/")[0]
                    }
                  </Link>
                </div>
              </Link>

              <p
                className="text-primary text-[1.6rem] leading-[150%] font-normal mt-[1rem]"
                dangerouslySetInnerHTML={{
                  __html: modifiedContent(
                    portfolio?.tagline_2 || "",
                    listOfskills,
                    listOfdata
                  ),
                }}
              ></p>
            </div>

            {/* Thumbnail */}
            {portfolio?.thumbnail && (
              <div className="md:ms-[2rem] flex items-center gap-2 flex-col lg:w-[30rem] float-right w-full rounded-[1.2rem] print:hidden relative min-w-[28rem]">
                <div className="relative pt-[56.25%] w-full">
                  <Image
                    src={portfolio.thumbnail}
                    alt="Project Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 30rem"
                    className="rounded-[1.2rem] object-fill absolute top-0 left-0 w-full h-full"
                    priority={index === 0}
                  />
                </div>
                <button
                  onClick={() =>
                    openModal(
                      portfolio?.pictures,
                      portfolio?.thumbnail,
                      portfolio?.child_hero_banner
                    )
                  }
                  className="max-w-max py-[6px] px-[3.4rem] text-primary text-[1.6rem] leading-[2.4rem] font-medium hover:bg-primary backdrop-blur-[9px] bg-black/20 text-nowrap hover:text-white outline-none border-2 border-solid border-white hover:border-transparent duration-300 max-lg:w-full text-center rounded-[20rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  Explore the Gallery
                </button>
              </div>
            )}
          </div>

          {/* Expandable Content */}
          <div className="mb-2">
            {expandedPortfolio && (
              <p
                dangerouslySetInnerHTML={{
                  __html: modifiedContent(
                    portfolio.features_short || "",
                    listOfskills,
                    listOfdata
                  ),
                }}
                className="mt-[2rem] list-div-portfolio1 pl-[2rem]"
              ></p>
            )}

            <button
              onClick={() => setExpandedPortfolio((prev) => !prev)}
              className={`${
                expandedPortfolio ? "mt-[-3rem]" : "mt-[1rem]"
              } bg-primary leading-normal text-center py-[0.6rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border-primary hover:text-primary rounded-[2rem] text-[1.4rem] font-medium`}
            >
              {expandedPortfolio ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
              AREAS OF EXPERTISE I'VE WORKED IN
            </h4>
            <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] flex-wrap text-[1.2rem]">
              {Object?.values(skillsForPortfolios)?.map((group, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {group.map((skill, i) => (
                    <Link
                      key={i}
                      href={skill?.url || "#"}
                      className="hover:text-white hover:bg-primary py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                    >
                      {skill?.title}
                    </Link>
                  ))}
                  {showMoreSkillsForPortfolios[index] && (
                    <div className="w-full mb-[1px]" />
                  )}
                </React.Fragment>
              ))}

              <ShowmoreSkills
                props={{
                  list: portfolio?.skills,
                  index,
                  setShowMoreSkills: setShowMoreSkillsForPortfolios,
                  showMoreSkills: showMoreSkillsForPortfolios,
                }}
              />
            </div>
          </div>

          <hr className="w-full my-[2.4rem] h-px bg-border" />

          {/* Buttons */}
          <div className="flex items-center flex-wrap max-sm:flex-col print:hidden max-md:items-start gap-[1.4rem]">
            <Link
              href={`/portfolio/${portfolio.id}`}
              className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 w-full md:max-w-max text-center rounded-[0.6rem]"
            >
              View Details
            </Link>
            {listOfdata?.companytype !== "leewop" && (
              <Link
                href={portfolio?.link || "#"}
                className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] w-full md:max-w-max text-center whitespace-nowrap"
              >
                Launch Project - Live Preview
              </Link>
            )}
            {portfolio?.has_testimonial && (
              <Link
                href={"#"}
                className="text-primary text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center"
              >
                Check Client Testimonial
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPortfolio;
