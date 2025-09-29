"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ShowmoreSkills from "./showmoreSkills";
import { modifiedContent } from "@/hooks/modifiedContent"; // Assuming this is available in the same location

interface Skill {
  title: string;
  url?: string;
}

interface PortfolioContentProps {
  portfolio: {
    id: string | number;
    title: string;
    link?: string;
    company_icon?: string;
    thumbnail?: string;
    tagline_2?: string;
    features_short?: string;
    pictures?: string[];
    child_hero_banner?: string;
    skills?: Skill[];
    has_testimonial?: boolean;
    companytype?: string;
  };
  thumbnailToUse: string | null;
  listOfskills: Record<string, any>;
  listOfdata: Record<string, any>;
  skills: Record<string, Skill[]>;
  index: number;
  showMoreSkills: boolean[];
  setShowMoreSkills: React.Dispatch<React.SetStateAction<boolean[]>>;
  openModal: (
    pictures: string[] | string | undefined,
    thumbnail: string | null,
    childBanner: string | undefined
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
  const [isMobile, setIsMobile] = useState(false);
  const [expansionState, setExpansionState] = useState<
    "collapsed" | "partial" | "full"
  >("collapsed");

  useEffect(() => {
    const checkMobile = window.innerWidth < 768; // Match Tailwind 'md' breakpoint
    setIsMobile(checkMobile);
    setExpansionState(checkMobile ? "collapsed" : "partial");

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      setExpansionState(newIsMobile ? "collapsed" : "partial");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize the processed HTML from modifiedContent
  const rawHtml = useMemo(
    () =>
      modifiedContent(portfolio.features_short || "", listOfskills, listOfdata),
    [portfolio.features_short, listOfskills, listOfdata]
  );

  // Parse the <li> elements, preserving all HTML and styles
  const items = useMemo(() => {
    if (!rawHtml) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");
    return Array.from(doc.querySelectorAll("li")).map((li) => li.outerHTML);
  }, [rawHtml]);

  // Determine visible count based on state
  const visibleCount = useMemo(() => {
    switch (expansionState) {
      case "collapsed":
        return 0;
      case "partial":
        return Math.min(4, items.length);
      case "full":
        return items.length;
      default:
        return 0;
    }
  }, [expansionState, items.length]);

  const visibleItems = items.slice(0, visibleCount);

  // Handle toggle logic
  const handleToggle = useCallback(() => {
    switch (expansionState) {
      case "collapsed":
        setExpansionState("partial");
        break;
      case "partial":
        setExpansionState("full");
        break;
      case "full":
        setExpansionState("collapsed");
        break;
    }
  }, [expansionState]);

  return (
    <div className="w-full">
      {/* Title + Thumbnail */}
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
            <div className="relative pt-[56.25%] w-full border border-solid rounded-[1.2rem] border-border">
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
              See all
            </button>
          </div>
        )}
      </div>

      {/* Expandable Features */}
      <div className="mb-2">
        {visibleCount > 0 && (
          <ul
            className="mt-[2rem] pl-[2rem] text-heading text-[1.6rem] leading-[2.4rem]"
            dangerouslySetInnerHTML={{ __html: visibleItems.join("") }}
          />
        )}
        {items.length > 0 && (
          <button
            onClick={handleToggle}
            className={`${
              expansionState === "full" ? "mt-[1rem]" : "mt-[1rem]"
            } bg-primary leading-normal text-center py-[0.6rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border-primary hover:text-primary rounded-[2rem] text-[1.4rem] font-medium`}
            aria-label={
              expansionState === "full" ? "Collapse content" : "Expand content"
            }
          >
            {expansionState === "full" ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />
      {/* Skills */}
      <div>
        <h4 className="text-heading text-[1.2rem] lg:text-[1.4rem] mt-[1rem] font-medium mb-[1.2rem] ml-[0.2rem]">
          AREAS OF EXPERTISE I'VE WORKED IN
        </h4>
        <div className="flex items-center justify-start gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
          {Object.values(skills).map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.map((skill, i) => (
                <Link
                  key={i}
                  href={skill.url || "#"}
                  target="_blank"
                  className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                  aria-label={`Learn more about ${skill.title}`}
                >
                  {skill.title || "Unknown Skill"}
                </Link>
              ))}
              {showMoreSkills[index] && <div className="w-full mb-[1px]" />}
            </React.Fragment>
          ))}
          <ShowmoreSkills
            props={{
              list: portfolio?.skills || [],
              index,
              setShowMoreSkills,
              showMoreSkills,
            }}
          />
        </div>
      </div>

      <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />

      {/* Actions */}
      <div className="flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem] print:hidden">
        <Link
          href={`/portfolio/${portfolio.id}`}
          className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent print:!border-primary hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem] print:!text-primary"
          aria-label={`View details for ${portfolio.title || "portfolio"}`}
        >
          View Details
        </Link>
        {listOfdata?.companytype !== "leewop" && (
          <Link
            href={portfolio?.link || "#"}
            target="_blank"
            className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary print:!text-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center"
            aria-label={`Launch ${portfolio.title || "portfolio"} project`}
          >
            Launch Project - Live Preview
          </Link>
        )}
        {portfolio?.has_testimonial && (
          <Link
            href={"#"}
            className="text-primary text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center"
            aria-label={`View testimonial for ${
              portfolio.title || "portfolio"
            }`}
          >
            Check Client Testimonial
          </Link>
        )}
      </div>
    </div>
  );
};

export default PortfolioContent;
