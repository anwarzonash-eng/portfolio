"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import AreasOfExpertiesSkillComponent from "@/components/AreasOfExpertiesSkillComponent";
import { ArrowRight } from "lucide-react";
import { modifiedContent } from "@/hooks/modifiedContent";
import type { ProfileReport, SkillRef, Portfolio } from "@/types/api";

type SkillType = {
  title: string;
  url?: string;
  order?: string;
  icon?: string;
};


interface PortfolioPortraitProps {
  portfolios: Portfolio[];
  companyType: string;
  locationLink: string;
  portfolioId: string | number;
  listOfskills: SkillRef[];
  listOfdata: ProfileReport | null;
  hideLinks?: boolean;
  from: number;
  max?: number;
}

const PortfolioPortrait: React.FC<PortfolioPortraitProps> = ({
  portfolios,
  companyType,
  locationLink,
  listOfskills,
  listOfdata,
  hideLinks,
  from,
  max,
}) => {

  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!portfolios || portfolios.length === 0) return null;

  const topTwoPortfolios = portfolios.slice(from, max);

  return (
    <div className="w-full px-[2rem] pb-[2rem]">

      {/* Portfolio Content */}
      <div className="w-full flex flex-col items-center gap-6 mt-[2rem]">
        {topTwoPortfolios.map((portfolio, index) => {
          // Smart skills display logic - adjust count based on skill name lengths
          const getOptimalSkillsToShow = (skills) => {
            if (!skills || skills.length === 0) return [];

            // Check if any of the first 5 skills has a long name (more than 12 characters)

            // If there are long names, show 4 skills to leave room for button
            // Otherwise, show 5 skills

            return skills.slice(0, 11);
          };

          const allSkills = Object.values(skillsGrouping(
            portfolio.skills.length < 15
              ? portfolio.skills
              : portfolio.skills.slice(0, 15)
          )).flat();

          const skillsToDisplay = getOptimalSkillsToShow(allSkills);
          const totalSkillsAvailable = allSkills.length;
          const shouldShowSeeMore = totalSkillsAvailable > skillsToDisplay.length;

          return (
            <div
              key={index}
              className="flex flex-row rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden w-full bg-white"
            >
              <div
                className={`flex flex-col-reverse items-stretch
                       bg-white rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden h-full w-full p-[1.6rem] gap-[4rem]`}
              >
                {/* Content Section */}
                <div
                  className={`w-full flex flex-col items-center justify-center`}
                >
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
                          ? portfolio.ending_Date // fallback if value is "Present" or invalid
                          : new Date(portfolio.ending_Date).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                      </p>
                      <div className="">

                        <div
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              portfolio.tagline_1,
                              listOfskills,
                              listOfdata
                            ),
                          }}
                          className={`text-[1.6rem] leading-[2rem] font-normal text-primary mt-[1rem] ${hideLinks ? 'line-clamp-6' : 'line-clamp-3'}`}
                        ></div>
                        {!hideLinks &&
                          <div className="w-full flex items-start mt-[2rem]">
                            <Link
                              href={`/portfolio?sectionId=portfolioSection&portfolioId=${portfolio.id}`}
                              className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                            >
                              Read More
                            </Link>
                          </div>
                        }
                      </div>
                    </div>

                    <hr className="w-full my-[2rem] h-px bg-border" />
                    <div className="text-black text-[1.8rem] leading-[2.8rem] font-medium">
                      <p className="mb-[1rem]">
                        AREAS OF EXPERTISE I&apos;VE WORKED IN:
                      </p>
                      <div className="flex items-center gap-[0.7rem] text-nowrap flex-wrap">
                        {skillsToDisplay.map(
                          (skill: SkillType, i: number) => (
                            <AreasOfExpertiesSkillComponent
                              key={i}
                              skill={skill}
                              index={i}
                              variant="medium"
                              hideLinks={hideLinks}
                            />
                          )
                        )}

                        {shouldShowSeeMore && !hideLinks && (
                          <Link
                            href={`/portfolio?sectionId=portfolioSection&portfolioId=${portfolio.id}`}
                            className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                          >
                            See More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {!hideLinks && <hr className="w-full my-[2rem] h-px bg-border" />}

                  {!hideLinks &&
                    <div className={`flex  gap-[1.4rem] w-full`}>
                      <Link
                        href={`/portfolio/${portfolio.id}`}
                        className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 text-center rounded-[0.6rem] max-w-max text-nowrap"
                      >
                        View Details
                      </Link>
                      {companyType !== "leewop" && (
                        <Link
                          href={portfolio?.link ? portfolio?.link : "#"}
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
                  }
                </div>

                {/* Image Section */}
                <div
                  className={`w-full flex flex-col items-center justify-center`}
                >
                  {portfolio?.thumbnail && (
                    <div
                      className="relative w-full rounded-[1.2rem] overflow-hidden"
                      style={{ aspectRatio: "16 / 9" }}
                    >
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
                        loading="eager"
                        priority={true}
                        // sizes="100vw"
                        className="object-fill w-full h-full rounded-[1.2rem] border border-border"
                      />
                    </div>
                  )}
                  {!hideLinks &&
                    <Link
                      href={`/portfolio?sectionId=${portfolio.id}&openGallery=true`}
                      className="text-white py-[6px] mt-[17px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative max-w-max text-nowrap"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Explore the Gallery
                        <ArrowRight />
                      </span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  }
                </div>
              </div>
            </div>
          );
        })}
        {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
          <PortfolioPopUp
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            portfolioImages={selectedPorfolioPicturesforPopup}
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioPortrait;
