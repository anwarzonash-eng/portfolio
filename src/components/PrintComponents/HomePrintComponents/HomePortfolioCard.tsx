"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import NoteDomainForPint from "@/components/NoteDomainForPint";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

type PortfolioType = {
  id: string;
  title: string;
  tagline_1: string;
  tagline_2: string;
  skills: SkillType[];
  thumbnail: string;
  pictures: string;
  child_hero_banner: string;
  link: string;
  has_testimonial: boolean;
  company_icon?: string;
  starting_date?: string;
  ending_Date?: string;
};

interface HomePortfolioCardProps {
  portfolios: PortfolioType[];
  companyType: string;
  locationLink: string;
  portfolioId: string;
  from: number;
  max?: number;
}

// Simple Skills Component
const SkillComponent: React.FC<{ skill: SkillType; index: number }> = ({
  skill,
  index,
}) => {
  const animationDelay = `${index * 0.1}s`;

  if (skill.url) {
    return (
      <Link
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ animationDelay }}
        className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
      >
        {skill.title}
      </Link>
    );
  }

  return (
    <span
      style={{ animationDelay }}
      className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
    >
      {skill.title}
    </span>
  );
};

const HomePortfolioCard: React.FC<HomePortfolioCardProps> = ({
  portfolios,
  companyType,
  locationLink,
  portfolioId,
  from,
  max,
}) => {
  if (!portfolios || portfolios.length === 0) return null;

  const topTwoPortfolios = portfolios.slice(from, max);

  // Function to calculate how many skills can fit in two lines
  const calculateSkillsToShow = (skillsArray: SkillType[]) => {
    const containerWidth = 520; // 520px container width
    const seeMoreButtonWidth = 160; // Approximate width of "See More" button
    const gapWidth = 7; // 0.7rem gap between items
    
    // Estimate skill button width based on text length
    const estimateSkillWidth = (skillTitle: string) => {
      const baseWidth = 40; // padding (4rem total) + border
      const charWidth = 7; // approximate width per character at 1.3rem font size
      return baseWidth + (skillTitle.length * charWidth);
    };

    let currentLineWidth = 0;
    let skillsToShow = 0;
    let linesUsed = 0;
    const maxLines = 2;

    for (let i = 0; i < skillsArray.length; i++) {
      const skillWidth = estimateSkillWidth(skillsArray[i].title);
      const gapWidthForThisItem = skillsToShow > 0 ? gapWidth : 0;
      
      // Check if we need "See More" button space (only on the last line)
      const isLastSkill = i === skillsArray.length - 1;
      const hasMoreSkills = !isLastSkill;
      const spaceForSeeMore = hasMoreSkills && (linesUsed === maxLines - 1) ? seeMoreButtonWidth + gapWidth : 0;
      
      const requiredWidth = currentLineWidth + gapWidthForThisItem + skillWidth + spaceForSeeMore;
      
      // If skill doesn't fit on current line, try next line
      if (requiredWidth > containerWidth) {
        linesUsed++;
        
        // If we've used all available lines, stop
        if (linesUsed >= maxLines) {
          break;
        }
        
        // Start new line with this skill
        currentLineWidth = skillWidth;
        // Check if "See More" button fits on this new line
        const seeMoreSpaceNewLine = hasMoreSkills && (linesUsed === maxLines - 1) ? seeMoreButtonWidth + gapWidth : 0;
        if (currentLineWidth + seeMoreSpaceNewLine > containerWidth) {
          break;
        }
      } else {
        // Skill fits on current line
        currentLineWidth = requiredWidth - spaceForSeeMore; // Don't include "See More" in line width yet
      }
      
      skillsToShow++;
      
      // Safety check to prevent showing too many skills
      if (skillsToShow >= 16) break;
    }

    // Ensure we show at least 2 skills if available
    return Math.max(2, Math.min(skillsToShow, skillsArray.length));
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-[2rem]">
      {topTwoPortfolios.map((portfolio, index) => {
        const skills = skillsGrouping(
          portfolio.skills.length < 15
            ? portfolio.skills
            : portfolio.skills.slice(0, 15)
        ) as Record<string, SkillType[]>;

        // Get flattened skills array and calculate how many to show
        const flatSkills = Object.values(skills).flat();
        const skillsToDisplay = calculateSkillsToShow(flatSkills);
        const visibleSkills = flatSkills.slice(0, skillsToDisplay);
        const hasMoreSkills = flatSkills.length > skillsToDisplay;

        return (
          <div
            key={index}
            className="flex flex-row rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden w-full bg-white"
          >
            <div className="flex bg-white rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden h-full w-full p-[3rem] gap-[4rem] items-start">
              {/* Content Section */}
              <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="flex items-start w-full flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-[2rem] mb-[1rem]">
                      <Link href={`/portfolio/${portfolio.id}`}>
                        <h1 className="flex items-center text-[3.2rem] font-bold leading-[4rem] text-heading">
                          {portfolio.title}
                        </h1>
                      </Link>
                    </div>
                    <p className="text-[2rem] font-medium text-heading">
                      {new Date(portfolio.starting_date).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {isNaN(new Date(portfolio.ending_Date).getTime())
                        ? portfolio.ending_Date
                        : new Date(portfolio.ending_Date).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                    </p>
                    <div>
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: portfolio.tagline_1,
                        }}
                        className="text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem] line-clamp-4"
                      /> */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: portfolio.tagline_2,
                        }}
                        className="text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem] line-clamp-6"
                      />
                      <Link
                          href={`/portfolio/${portfolioId}?scroll=skills`}
                          className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary max-w-max mt-[2rem]"
                        >
                          <button >
                          Read More
                          </button>
                        </Link>
                    </div>
                  </div>

                  <hr className="w-full my-[2rem] h-px bg-border" />
                  <div className="text-black text-[1.8rem] leading-[2.8rem] font-medium w-[520px] overflow-hidden">
                    <p className="mb-[1rem]">
                      AREAS OF EXPERTISE I'VE WORKED IN:
                    </p>
                    <div className="flex items-center gap-[0.7rem] flex-wrap">
                      {visibleSkills.map((skill: SkillType, i: number) => (
                        <SkillComponent key={i} skill={skill} index={i} />
                      ))}

                      {hasMoreSkills && (
                        <Link
                          href={`/portfolio/${portfolioId}?scroll=skills`}
                          className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                        >
                          See More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="w-full my-[2rem] h-px bg-border" />

                <div className="flex gap-[1.4rem] w-full">
                  <Link
                    href={`/portfolio/${portfolio.id}`}
                    className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 text-center rounded-[0.6rem] max-w-max text-nowrap"
                  >
                    View Details
                  </Link>
                  {companyType !== "leewop" && (
                    <Link
                      href={portfolio?.link}
                      className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] text-center max-w-max text-nowrap"
                    >
                      Launch Project - Live Preview
                    </Link>
                  )}
                  {portfolio?.has_testimonial && (
                    <Link
                      href={locationLink}
                      className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 text-center rounded-[0.6rem] max-w-max text-nowrap"
                    >
                      Check Client Testimonial
                    </Link>
                  )}
                </div>
              </div>

              {/* Image Section */}
              <div className="w-1/2 flex flex-col items-center justify-center">
                {portfolio?.thumbnail && (
                  <div className="relative w-full h-[300px] rounded-[1.2rem] overflow-hidden">
                    <Image
                      src={
                        portfolio?.title === "Velzon"
                          ? "/VelzonThumbnail.PNG"
                          : portfolio?.title === "Beyond Competitions"
                          ? "/BeyondCompetetionThumbnail.webp"
                          : portfolio?.thumbnail ||
                            "/images/dummy_port_img.webp"
                      }
                      alt="Project Image"
                      fill
                      sizes="100vw, 30rem"
                      loading="eager"
                      priority={true}
                      className="rounded-[1.2rem] object-fill w-full border !h-[300px] border-border border-solid"
                    />
                  </div>
                )}

                <Link
                  href={`/portfolio?sectionId=${portfolio.id}&openGallery=true`}
                  className="text-white py-[6px] mt-[17px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative max-w-max text-nowrap"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore the Gallery
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default HomePortfolioCard;