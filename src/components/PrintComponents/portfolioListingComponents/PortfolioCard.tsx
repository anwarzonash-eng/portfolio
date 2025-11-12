"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { skillsGrouping } from "@/hooks/skillsGrouping";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};

// Simplified AreasOfExpertise component for print
const AreasOfExpertiesSkillComponent: React.FC<{
  skill: SkillType;
  index: number;
}> = ({ skill, index }) => {
  const animationDelay = `${index * 0.1}s`;

  if (skill.url) {
    return (
      <Link href={skill.url} target="_blank" rel="noopener noreferrer">
        <span
          style={{ animationDelay }}
          className="capitalize text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] hover:bg-primary hover:text-white transition-colors"
        >
          {skill.title}
        </span>
      </Link>
    );
  }

  return (
    <span
      style={{ animationDelay }}
      className="capitalize text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575]"
    >
      {skill.title}
    </span>
  );
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

interface PortfolioCardProps {
  portfolio: PortfolioType;
  companyType?: string;
  showMoreSkills?: any[];
  index?: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  companyType = "",
  showMoreSkills = [],
  index = 0
}) => {
  if (!portfolio) return null;

  // Group skills for this portfolio
  const skills = skillsGrouping(
    showMoreSkills[index]
      ? portfolio?.skills
      : portfolio?.skills?.slice(0, 15)
  ) as Record<string, SkillType[]>;

  return (
    <div className="w-full p-[2rem] pt-0">
      <div className="flex flex-row rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden w-full bg-white">
        <div className="flex flex-col-reverse items-stretch bg-white rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden h-full w-full p-[3rem] gap-[4rem]">
          
          {/* Content Section */}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex items-start w-full flex-col justify-between h-full">
              <div>
                <div className="flex gap-[2rem] mb-[1rem]">
                  <h1 className="flex items-center text-[3.2rem] font-bold leading-[4rem] text-heading">
                    {portfolio.title}
                  </h1>
                </div>
                <p className="text-[2rem] font-medium text-heading">
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
                </p>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: portfolio.tagline_1,
                    }}
                    className="text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem] line-clamp-2"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: portfolio.tagline_2,
                    }}
                    className="text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem] line-clamp-3"
                  />
                </div>
              </div>

              <hr className="w-full my-[2rem] h-px bg-border" />
              
              <div className="text-black text-[1.8rem] leading-[2.8rem] font-medium">
                <p className="mb-[1rem]">AREAS OF EXPERTISE I'VE WORKED IN:</p>
                <div className="flex items-center gap-[0.7rem] text-nowrap flex-wrap">
                  {Object.values(skills)
                    .flat()
                    .slice(0, 5)
                    .map((skill: SkillType, i: number) => (
                      <AreasOfExpertiesSkillComponent
                        key={i}
                        skill={skill}
                        index={i}
                      />
                    ))}

                  {Object.values(skills).flat().length > 5 && (
                    <span className="capitalize text-center bg-primary text-white text-[1.3rem] font-medium py-[0.4rem] px-[2rem] flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-primary">
                      +{Object.values(skills).flat().length - 5} More
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr className="w-full my-[2rem] h-px bg-border" />

            {/* Action buttons for print mode */}
            <div className="flex gap-[1.4rem] w-full">
              <div className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient text-center rounded-[0.6rem] max-w-max text-nowrap">
                Portfolio Details Available Online
              </div>
              {companyType !== "leewop" && portfolio?.link && (
                <div className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid border-primary rounded-[0.6rem] text-center max-w-max text-nowrap">
                  Live Project Available
                </div>
              )}
              {portfolio?.has_testimonial && (
                <div className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient text-center rounded-[0.6rem] max-w-max text-nowrap">
                  Client Testimonial Available
                </div>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full flex flex-col items-center justify-center">
            {portfolio?.thumbnail && (
              <div 
                className="relative w-full rounded-[1.2rem] overflow-hidden"
                style={{
                  // A4 portrait width is ~210mm, converted to pixels (96 DPI) ≈ 794px
                  // Height = width / 1.75
                  // For full page width: height ≈ 454px
                  height: `calc(100vw / 1.75)`,
                  maxHeight: '450px', // fallback for A4 portrait
                  minHeight: '400px'
                }}
              >
                <Image
                  src={
                    portfolio?.title === "Velzon"
                      ? "/VelzonThumbnail.PNG"
                      : portfolio?.title === "Beyond Competitions"
                      ? "/BeyondCompetetionThumbnail.webp"
                      : portfolio?.thumbnail || "/images/dummy_port_img.webp"
                  }
                  alt="Project Image"
                  fill
                  sizes="100vw"
                  className="rounded-[1.2rem] object-fill w-full h-full border border-border border-solid"
                />
              </div>
            )}

            <div className="text-white py-[6px] mt-[17px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient text-center rounded-[0.6rem] relative max-w-max text-nowrap">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Gallery Available Online
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
