"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ExperienceDescription from "./ExperienceDescription";
import ShowmoreSkills from "./showmoreSkills";

interface PortfolioContentProps {
  portfolio: any;
  thumbnailToUse: string | null;
  listOfskills: any;
  listOfdata: any;
  skills: Record<string, any[]>;
  index: number;
  showMoreSkills: boolean[];
  setShowMoreSkills: React.Dispatch<React.SetStateAction<boolean[]>>;
  openModal: (
    pictures: any,
    thumbnail: string | null,
    childBanner: any
  ) => void;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  portfolio,
  thumbnailToUse,
  listOfskills,
  listOfdata,
  skills,
  index,
  showMoreSkills,
  setShowMoreSkills,
  openModal,
}) => {
  return (
    <div className="w-full">
      {/* Title + Thumbnail */}
      <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[2rem]">
        <div className="order-1">
          <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
            {portfolio?.title}
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: portfolio.tagline_2,
            }}
            className="text-[1.9rem] leading-[150%] font-medium mt-[1rem] text-primary"
          ></p>
        </div>

        {thumbnailToUse && (
          <div className="lg:w-[50rem] w-full rounded-[1.2rem] relative order-0 lg:order-2">
            <div
              className="h-[200px] lg:h-[300px] lg:w-[500px] w-full 
                rounded-[1.2rem] border border-solid border-border cursor-pointer overflow-hidden"
            >
              <Image
                src={thumbnailToUse}
                onClick={() =>
                  openModal(
                    portfolio?.pictures,
                    thumbnailToUse,
                    portfolio?.child_hero_banner
                  )
                }
                fill
                className="rounded-[1.2rem] object-fill !h-[200px] lg:!h-[300px] w-full"
                alt="Portfolio Image"
              />
            </div>

            <button
              className="mb-3 max-w-max lg:min-w-[220px]
                text-white py-[6px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient 
                hover:bg-white hover:text-primary outline-none border border-solid border-transparent 
                hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] 
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={() =>
                openModal(
                  portfolio?.pictures,
                  thumbnailToUse,
                  portfolio?.child_hero_banner
                )
              }
            >
              Explore the Gallery
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <ExperienceDescription
        rawHtml={portfolio.features_short}
        listOfskills={listOfskills}
        listOfdata={listOfdata}
        index={index}
      />

      {/* Skills */}
      <h4 className="text-heading text-[1.2rem] lg:text-[1.4rem] mt-[1rem] font-medium mb-[1.2rem] ml-[0.2rem]">
        AREAS OF EXPERTISE I'VE WORKED IN
      </h4>

      <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
        {Object.values(skills).map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => (
              <Link
                key={i}
                href={skill.url || "#"}
                target="_blank"
                className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] 
                  border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] 
                  font-medium leading-normal"
              >
                {skill.title}
              </Link>
            ))}
            {showMoreSkills[index] && <div className="w-full mb-[1px]" />}
          </React.Fragment>
        ))}

        <ShowmoreSkills
          props={{
            list: portfolio?.skills,
            index,
            setShowMoreSkills,
            showMoreSkills,
          }}
        />
      </div>

      <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />

      {/* Actions */}
      <div className="flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem] print:hidden">
        <Link
          href={`/portfolio/${portfolio.id}`}
          className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient 
            hover:bg-white hover:text-primary border border-solid border-transparent 
            print:!border-primary hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem] 
            print:!text-primary"
        >
          View Details
        </Link>

        {listOfdata?.companytype !== "leewop" && (
          <a
            href={portfolio?.link}
            target="_blank"
            className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary 
              border border-solid hover:border-transparent border-primary 
              print:!text-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] 
              max-sm:w-full text-center"
          >
            Launch Project - Live Preview
          </a>
        )}

        {portfolio?.has_testimonial === true && (
          <Link
            href={"#"}
            className="text-primary text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center"
          >
            Check Client Testimonial
          </Link>
        )}
      </div>
    </div>
  );
};

export default PortfolioContent;
