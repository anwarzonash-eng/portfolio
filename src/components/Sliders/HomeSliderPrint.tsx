"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioPopUp from "../PortfolioPopUp";
import { skillsGrouping } from "@/hooks/skillsGrouping";

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
};

interface HomeSliderPrintProps {
  portfolios: PortfolioType[];
  companyType: string;
  locationLink: string;
  from: number;
  max?: number;
}

const HomeSliderPrint: React.FC<HomeSliderPrintProps> = ({
  portfolios,
  companyType,
  locationLink,
  from,
  max,
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!portfolios || portfolios.length === 0) return null;

  const topTwoPortfolios = portfolios.slice(from, max);

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-[2rem]">
      {topTwoPortfolios.map((portfolio, index) => {
        const skills = skillsGrouping(
          portfolio.skills.length < 15
            ? portfolio.skills
            : portfolio.skills.slice(0, 15)
        ) as Record<string, SkillType[]>;

        return (
          <div
            key={index}
            className="flex flex-row rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden w-full bg-white"
          >
            <div className="flex items-stretch bg-white rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden h-full w-full p-[3rem]">
              {/* Content Section */}
              <div className="w-1/2  flex items-start justify-between flex-col">
                <div className="flex items-start w-full flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-[2rem] mb-[2rem]">
                      <Link href={`/portfolio/${portfolio.id}`}>
                        <h1 className="flex items-center text-[3.2rem] font-bold leading-[4rem] text-heading">
                          {portfolio.title}
                        </h1>
                      </Link>
                    </div>
                    <div className="">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: portfolio.tagline_1,
                        }}
                        className="text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem] line-clamp-2"
                      ></p>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: portfolio.tagline_2,
                        }}
                        className="text-[1.8rem] leading-[2.4rem] font-normal text-primary mt-[1rem] line-clamp-4"
                      ></p>
                    </div>
                  </div>

                  <div className="text-black text-[1.8rem] leading-[2.8rem] font-medium my-[2rem]">
                    AREAS OF EXPERTISE I'VE WORKED IN:
                    <div className="flex items-center gap-[0.7rem] my-[2rem] text-nowrap flex-wrap">
                      {Object.values(skills)
                        .flat()
                        .slice(0, showAllSkills ? undefined : 6)
                        .map((skill: SkillType, i: number) => (
                          <Link
                            href={skill.url || "#"}
                            legacyBehavior
                            key={`skill-${i}`}
                          >
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                animationDelay: `${i * 0.1}s`,
                              }}
                              className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                            >
                              {skill?.title}
                            </a>
                          </Link>
                        ))}

                      {Object.values(skills).flat().length > 8 && (
                        <Link href={locationLink}>
                          <button
                            onClick={() => setShowAllSkills(!showAllSkills)}
                            className="bg-primary text-white border border-transparent py-[0.4rem] px-[2rem] hover:bg-white hover:text-primary hover:border-primary hover:border text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]"
                          >
                            {showAllSkills ? "Show Less" : "See More"}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[1.4rem]">
                  <Link
                    href={locationLink}
                    className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 text-center rounded-[0.6rem] max-w-max text-nowrap"
                  >
                    View Details
                  </Link>
                  {companyType !== "leewop" && (
                    <Link
                      href={locationLink}
                      className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] text-center max-w-max text-nowrap"
                    >
                      Launch Project - Live Preview
                    </Link>
                  )}
                  {portfolio?.has_testimonial == true && (
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
                  <div className="relative w-full h-[400px] rounded-[1.2rem] overflow-hidden">
                    <Image
                      src={
                        portfolio?.thumbnail
                          ? portfolio?.thumbnail
                          : "/images/dummy_port_img.webp"
                      }
                      alt="Project Image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-[1.2rem] cursor-pointer"
                    />
                  </div>
                )}
                <Link href={locationLink}>
                  <button className="text-white py-[6px] mt-[17px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative max-w-max text-nowrap">
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
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeSliderPrint;
