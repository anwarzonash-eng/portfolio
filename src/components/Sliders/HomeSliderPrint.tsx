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
}

const HomeSliderPrint: React.FC<HomeSliderPrintProps> = ({
  portfolios,
  companyType,
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!portfolios || portfolios.length === 0) return null;

  const topTwoPortfolios = portfolios.slice(0, 2);

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
            className="flex flex-row rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden w-full"
          >
            {/* Left Content */}
            <div className="p-[2rem] w-1/2 flex flex-col justify-between">
              <div>
                <Link href={`/portfolio/${portfolio.id}`}>
                  <h1 className="text-[3rem] font-bold text-heading mb-[1rem]">
                    {portfolio.title}
                  </h1>
                </Link>

                <div className="h-[120px] overflow-auto custom-scrollbar">
                  <p
                    dangerouslySetInnerHTML={{ __html: portfolio.tagline_1 }}
                    className="text-[1.8rem] text-paragraph1"
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: portfolio.tagline_2 }}
                    className="text-[1.6rem] text-primary mt-[1rem]"
                  />
                </div>
              </div>

              <div className="text-black text-[1.6rem] font-medium my-[1rem]">
                AREAS OF EXPERTISE I'VE WORKED IN:
                <div className="flex flex-wrap gap-[1rem] mt-[1.5rem]">
                  {Object.values(skills)
                    .flat()
                    .slice(0, showAllSkills ? undefined : 5)
                    .map((skill, i) => (
                      <Link
                        key={i}
                        href={skill.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-primary hover:text-white text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white border border-[#757575] rounded-[5rem]"
                      >
                        {skill.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-1/2 flex justify-center items-center">
              <div className="relative w-full h-[300px] rounded-[1.2rem] overflow-hidden">
                <Image
                  src={portfolio.thumbnail || "/images/dummy_port_img.webp"}
                  alt="Project Image"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-[1.2rem] cursor-pointer object-top"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeSliderPrint;
