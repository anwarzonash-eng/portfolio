"use client";
import React from "react";
import Link from "next/link";
import PortfolioCardContent from "@/components/PortfolioCardContent";
import CVTimelineDot from "@/components/CVPageComponents/CVTimelineDot";
import type { ProfileReport, SkillRef } from "@/types/api";

interface CVPortfoliosSectionProps {
  listOfdata: ProfileReport | null;
  filteredSkills: SkillRef[];
  highlightedPortfolioId: string | null;
  showMoreSkills: boolean[];
  setShowMoreSkills: (skills: boolean[]) => void;
  openModal: (
    pictures: string,
    thumbnail: string | undefined,
    child_hero_banner: string | undefined
  ) => void;
}

/** The CV "Portfolios" timeline block (extracted verbatim from pages/cv). */
const CVPortfoliosSection = ({
  listOfdata,
  filteredSkills,
  highlightedPortfolioId,
  showMoreSkills,
  setShowMoreSkills,
  openModal,
}: CVPortfoliosSectionProps) => {
  if (!(listOfdata && listOfdata?.portfolios_ids?.length > 0)) return null;

  return (
    <div
      id="portfolioSection"
      className="relative flex items-start print:break-before-page"
    >
      <CVTimelineDot circleClassName="mt-[3rem] mb-[2rem]" />
      <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print_p_m print:!pt-[2rem]">
        <div className="flex items-center print:hidden justify-between w-full my-[3rem]">
          <h2 className="text-heading leading-[3.56rem] text-[3rem] lg:text-[4rem] font-semibold pl-[0.5rem]">
            Portfolios
          </h2>
          <Link
            href={"/portfolio"}
            className="flex items-center gap-[0.6rem] group cursor-pointer mt-1.5"
          >
            <div className="hover:font-bold hover:text-primary text-[1.4rem] text-heading font-medium">
              View all
            </div>
            <div className="group-hover:translate-x-[1rem] duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337"
                  stroke="#262626"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
        {listOfdata?.portfolios_ids?.map((portfolio, index) => {
          return (
            <div
              key={index}
              id={`portfolio-${portfolio.id}`}
              className={`relative flex items-start mt-[2rem] print-section flex-col ${highlightedPortfolioId ===
                  portfolio.id
                  ? "border border-primary rounded-[1rem]"
                  : ""
                }`}
            >
              <CVTimelineDot positionClassName="absolute top-0 left-[-3.2rem] z-[60] md:left-[-4.2rem] lg:left-[-6.2rem] block print:hidden" />
              <h1 className="mb-[1rem] text-heading text-[2rem] leading-[2.7rem] font-bold max-lg:ml-[0.5rem] print:hidden block opacity-70 mt-[0.6rem] italic">
                {new Date(portfolio.starting_date).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {isNaN(new Date(portfolio.ending_Date).getTime())
                  ? portfolio.ending_Date
                  : new Date(portfolio.ending_Date).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
              </h1>

              <PortfolioCardContent
                portfolio={portfolio}
                thumbnailSize={"small"}
                listOfskills={filteredSkills} // FIX: Use filtered
                listOfdata={{
                  primaryColor: "#1F4FE1",
                  companytype: portfolio.companytype || "",
                }}
                index={index}
                showMoreSkills={showMoreSkills}
                setShowMoreSkills={setShowMoreSkills}
                openModal={openModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CVPortfoliosSection;
