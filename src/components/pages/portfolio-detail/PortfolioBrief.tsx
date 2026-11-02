"use client";
import React from "react";
import Link from "next/link";
import { modifiedContent } from "@/hooks/modifiedContent";
import AreasOfExpertiesSkillComponent from "@/components/AreasOfExpertiesSkillComponent";
import type { Portfolio, ProfileReport, SkillRef } from "@/types/api";

interface PortfolioBriefProps {
  portfolioDetails: Portfolio | null;
  listOfdata: ProfileReport | null;
  filteredSkills: SkillRef[];
  skillsforDetailPortfolio: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  };
}

/** Project brief, taglines, expertise chips and CTA links (extracted verbatim from pages/portfolio-detail). */
const PortfolioBrief = ({
  portfolioDetails,
  listOfdata,
  filteredSkills,
  skillsforDetailPortfolio,
}: PortfolioBriefProps) => (
  <div className="w-full ">
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
            listOfdata,
          ),
        }}
        className="text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
      ></p>
      <p
        className="text-[2rem] list-div leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
        dangerouslySetInnerHTML={{
          __html: modifiedContent(
            portfolioDetails?.tagline_2,
            filteredSkills,
            listOfdata,
          ),
        }}
      ></p>
    </div>
    <h4 className="text-primary text-[1.4rem] lg:text-[2rem] font-medium">
      AREAS OF EXPERTISE I&apos;VE WORKED IN:
    </h4>
    <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem] mb-[3.2rem] mt-[1rem]">
      {skillsforDetailPortfolio && (
        <>
          {Object?.values(skillsforDetailPortfolio)?.map(
            (group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {group.map((skill, i) => (
                  <AreasOfExpertiesSkillComponent
                    key={`${groupIndex}-${i}`}
                    skill={skill}
                    index={i}
                    groupIndex={groupIndex}
                    variant="different"
                  />
                ))}
              </React.Fragment>
            ),
          )}
        </>
      )}
    </div>
    <div
      className="flex flex-col text-nowrap
                      gap-[1.4rem] max-lg:items-center"
    >
      {portfolioDetails?.link && listOfdata?.companytype !== "leewop" && (
        <Link
          href={portfolioDetails?.link || "#"}
          className="text-onPrimary py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max"
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
);

export default PortfolioBrief;
