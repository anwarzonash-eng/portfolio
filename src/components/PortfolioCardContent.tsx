import React from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioFeatures from "./PortfolioFeatures";
import ShowmoreSkills from "./showmoreSkills";
import useIsDesktop from "@/hooks/useIsDesktop";

interface PortfolioCardContentProps {
  portfolio: {
    id: string;
    thumbnail?: string;
    pictures?: string;
    child_hero_banner?: string;
    company_icon?: string;
    title?: string;
    link?: string;
    tagline_2?: string;
    features_short?: string;
    skills?: any[] | any[][];
    has_testimonial?: boolean;
  };
  thumbnailSize: string;
  listOfskills: any[];
  listOfdata: any;
  index: number;
  showMoreSkills: boolean[];
  setShowMoreSkills: React.Dispatch<React.SetStateAction<boolean[]>>;
  openModal: (
    pictures?: string,
    thumbnail?: string,
    child_hero_banner?: string
  ) => void;
}

const PortfolioCardContent: React.FC<PortfolioCardContentProps> = ({
  portfolio,
  listOfskills,
  listOfdata,
  index,
  thumbnailSize,
  showMoreSkills,
  setShowMoreSkills,
  openModal,
}) => {
  const skills = portfolio?.skills || [];
  const isSkillsNested =
    Array.isArray(skills) && skills.length > 0 && Array.isArray(skills[0]);
  const flatSkills = isSkillsNested ? skills.flat() : skills; // Flatten nested skills for consistent rendering
  const isDesktop = useIsDesktop(1024); // matches Tailwind's lg breakpoint
  const initialSkillLimit = isDesktop ? 15 : 6;
  const skillsToShow = showMoreSkills[index]
    ? flatSkills
    : flatSkills.slice(0, initialSkillLimit);

  return (
    <div className="flex flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] print:mt-[10rem]">
      {/* Content */}
      <div className="w-full">
        {/* Title and Description */}
        <div className="print:flex flex-row print:w-full gap-3 items-center justify-center print:flex-row-reverse">
          {portfolio?.thumbnail && (
            <div
              className={`ms-0 lg:ms-5 ${
                thumbnailSize === "small" ? "lg:w-[30rem]" : "lg:w-[50rem]"
              } float-right w-full rounded-[1.2rem] relative align-middle justify-center flex-col flex items-center`}
            >
              <img
                src={
                  portfolio.thumbnail
                    ? portfolio.thumbnail
                    : "/images/project_img.png"
                }
                alt="Project Image"
                height={800}
                width={800}
                className={` ${
                  thumbnailSize === "small" ? "lg:h-[200px]" : "lg:h-[300px]"
                } lg:w-[800px] w-full object-cover rounded-[1.2rem] border border-solid border-border`}
              />
              <button
                className="btn-primary text-white py-[1rem] mt-[1rem] px-[3.4rem] text-[1.8rem] font-medium relative z-[200]"
                onClick={() =>
                  openModal(
                    portfolio?.pictures,
                    portfolio?.thumbnail,
                    portfolio?.child_hero_banner
                  )
                }
              >
                See Gallery
              </button>
            </div>
          )}
          <div>
            <Link
              href={portfolio?.link || "#"}
              target="_blank"
              className="inline-flex gap-[1rem] p-2 hover:bg-[#D1E9FF] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max max-lg:mt-[1rem]"
            >
              {portfolio?.company_icon && (
                <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block">
                  <Image
                    src={portfolio.company_icon}
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
              dangerouslySetInnerHTML={{ __html: portfolio.tagline_2 || "" }}
              className="text-[1.6rem] leading-[150%] font-medium mt-[1rem] text-primary"
            />
            <PortfolioFeatures
              features_short={portfolio.features_short || ""}
              skillsList={listOfskills}
              listOfdata={listOfdata}
            />
            <hr className="w-full my-[2rem] h-px bg-border print:hidden" />
            {/* Skills */}
            <h4 className="text-heading text-[1.4rem] lg:text-[1.6rem] font-medium mb-[1.2rem] ml-[0.2rem]">
              AREAS OF EXPERTISE I'VE WORKED IN
            </h4>
            <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
              {Array.isArray(skillsToShow) && skillsToShow.length > 0 && (
                <React.Fragment>
                  {skillsToShow.map((skill: any, i: number) => (
                    <Link
                      key={i}
                      href={skill.url || "#"}
                      target="_blank"
                      className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                    >
                      {skill.title}
                    </Link>
                  ))}
                  {showMoreSkills[index] && <div className="w-full mb-[1px]" />}
                </React.Fragment>
              )}
              <ShowmoreSkills
                props={{
                  list: flatSkills,
                  index,
                  setShowMoreSkills,
                  showMoreSkills,
                }}
              />
            </div>
            <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />
            {/* Links */}
            <div className="flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem] print:hidden">
              <Link
                href={`/portfolio/${portfolio.id}`}
                className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent print:!border-primary hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem] print:!text-primary"
              >
                View Details
              </Link>
              {listOfdata?.companytype !== "leewop" && (
                <a
                  href={portfolio?.link}
                  target="_blank"
                  className="py-[1rem] px-[2rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary print:!text-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center text-nowrap"
                >
                  Launch Project - Live Preview
                </a>
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
    </div>
  );
};

export default PortfolioCardContent;
