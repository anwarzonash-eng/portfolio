"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import SliderXL from "@/components/Sliders/SliderXL";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import { modifiedContent } from "@/hooks/modifiedContent";
import PageRendering from "@/components/PageRendering";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import EducationComponent from "@/components/EducationComponent";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import PortfolioHero from "@/components/pages/portfolio-detail/PortfolioHero";
import PortfolioSidebar from "@/components/pages/portfolio-detail/PortfolioSidebar";
import PortfolioBrief from "@/components/pages/portfolio-detail/PortfolioBrief";
import TechStackSection from "@/components/pages/portfolio-detail/TechStackSection";
import ToolsAndTechnologies from "@/components/pages/portfolio-detail/ToolsAndTechnologies";
import { useProfileReport } from "@/hooks/useProfileReport";
import { useFilteredSkills } from "@/hooks/useFilteredSkills";
import { useTruncatedFeatures } from "@/hooks/useTruncatedFeatures";
import type { Portfolio } from "@/types/api";
import type { PageProps } from "@/types/page";

const PortfolioDetails = ({ params }: PageProps) => {
  const searchParams = useSearchParams();
  const [portfolioDetails, setPortfolioDetails] = useState<Portfolio | null>(
    null,
  );

  // Shared page bootstrap: route info + profile report (with the portfolio
  // item id resolved from the route params) + store sync
  const { urlInfo, listOfdata, loading, error } = useProfileReport({
    params,
    searchParams,
    dispatchNullUrlInfo: true,
    itemID: params.id
      ? params.id // Case 1: ID is directly in params.id
      : Array.isArray(params.value)
        ? params.value[0] // Case 2: ID is the first element of a catch-all array
        : typeof params.value === "object" && params.value !== null
          ? params.value.id // Case 3: ID is nested as an object property
          : (params.value as string | undefined),
  });

  // Shared skills plumbing (fetches the global list once on mount)
  const { filteredSkills, sortedSkills } = useFilteredSkills(listOfdata);

  // Ref for the SkillsContainer section
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const techStacksRef = useRef<HTMLHeadingElement | null>(null);

  // Features truncation state machine (counts <li>s, keeps full + truncated HTML)
  const {
    featuresItemCount,
    fullFeaturesHtml,
    defaultTruncatedHtml,
    isExpanded,
    setIsExpanded,
  } = useTruncatedFeatures({
    enabled: portfolioDetails,
    rawHtml: portfolioDetails
      ? modifiedContent(
          portfolioDetails?.features_short,
          filteredSkills,
          listOfdata,
        ) || ""
      : "",
    limit: 15,
  });

  useEffect(() => {
    if (listOfdata && listOfdata?.portfolios_ids?.length > 0) {
      setPortfolioDetails(listOfdata?.portfolios_ids[0]);
    }
  }, [listOfdata]);

  useBodyBackgroundColor("#EFF5FD");

  // Scroll to SkillsContainer when scroll=skills is in URL
  useEffect(() => {
    if (
      portfolioDetails &&
      searchParams.get("scroll") === "skills" &&
      skillsContainerRef.current
    ) {
      setTimeout(() => {
        if (skillsContainerRef.current) {
          const headerOffset = 100; // Adjust based on your fixed header height
          const elementPosition =
            skillsContainerRef.current.getBoundingClientRect().top +
            window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [searchParams, portfolioDetails]);

  // ✅ Scroll to Tech Stack section when ?scroll=points is in the URL
  useEffect(() => {
    if (!portfolioDetails || searchParams.get("scroll") !== "points") {
      return;
    }

    const scrollToTechStack = () => {
      // Try to find the element by ref first, then by ID
      const targetElement =
        techStacksRef.current || document.getElementById("tech-stacks-heading");

      if (targetElement) {
        const headerOffset = 100;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    // Wait for images and content to load before scrolling
    const timeoutId = setTimeout(() => {
      scrollToTechStack();

      // Fallback scroll attempt in case the first one fails
      setTimeout(scrollToTechStack, 500);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [searchParams, portfolioDetails]);

  const skillsforDetailPortfolio: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(portfolioDetails?.skills);

  const techStackHeading =
    listOfdata?.website_purpose === "upwork"
      ? "How I used the tech"
      : listOfdata?.website_purpose === "startup"
        ? "Strategic Implementation"
        : listOfdata?.website_purpose === "contract"
          ? "Technical Implementation"
          : "Tech Stack";

  const modulesFeaturesHeading =
    listOfdata?.website_purpose === "upwork"
      ? "Key features delivered"
      : listOfdata?.website_purpose === "startup"
        ? "Strategic Milestones"
        : listOfdata?.website_purpose === "contract"
          ? "Technical Components"
          : "Modules & Features";

  const testimonialHeading =
    listOfdata?.website_purpose === "upwork"
      ? "Client Feedback"
      : listOfdata?.website_purpose === "startup"
        ? "Founder Endorsement"
        : listOfdata?.website_purpose === "contract"
          ? "Professional Refrence"
          : "Client Testimonial";

  return (
    <div className="bg-[#EFF5FD] dark:bg-pageBG">
      <PageRendering
        props={{
          list: portfolioDetails,
          loading: loading,
          error,
          actualPage: (
            <>
              {/* Hero Section */}
              <PortfolioHero portfolioDetails={portfolioDetails} />
              {/* Blog Content Section */}
              <section className="mainContainer w-full relative top-0 lg:mt-[-67rem]">
                <div className="w-full mt-[1rem]">
                  <Image
                    src={
                      portfolioDetails?.title === "Velzon"
                        ? "/VelzonThumbnail.PNG"
                        : portfolioDetails?.thumbnail
                    }
                    height={1500}
                    width={3000}
                    alt="Banner"
                    className="hidden lg:block h-[70rem] w-auto mx-auto object-fill rounded-[1.5rem] border border-border border-solid"
                  />
                  <Image
                    src={
                      portfolioDetails?.title === "Velzon"
                        ? "/VelzonThumbnail.PNG"
                        : portfolioDetails?.thumbnail
                    }
                    height={410}
                    width={800}
                    alt="Banner"
                    className="object-fill lg:hidden rounded-[1rem] w-auto border border-border border-solid mx-auto"
                  />
                  <article className="mt-[6rem] flex gap-[4rem] flex-col items-center justify-center md:flex-row md:items-start md:justify-normal">
                    <PortfolioSidebar
                      portfolioDetails={portfolioDetails}
                      listOfdata={listOfdata}
                      testimonialHeading={testimonialHeading}
                    />
                    <PortfolioBrief
                      portfolioDetails={portfolioDetails}
                      listOfdata={listOfdata}
                      filteredSkills={filteredSkills}
                      skillsforDetailPortfolio={skillsforDetailPortfolio}
                    />
                  </article>
                  {/* New Section */}
                  <TechStackSection
                    heading={techStackHeading}
                    techStacksRef={techStacksRef}
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    fullFeaturesHtml={fullFeaturesHtml}
                    defaultTruncatedHtml={defaultTruncatedHtml}
                    featuresItemCount={featuresItemCount}
                  />
                  <div className="w-full h-auto">
                    <Image
                      src={
                        portfolioDetails?.title === "Velzon"
                          ? "/VelzonThumbnail.PNG"
                          : portfolioDetails?.thumbnail
                      }
                      height={1500}
                      width={1500}
                      alt="Banner"
                      className="shadow-2xl object-fill rounded-[1rem] border border-border border-solid"
                    />
                  </div>
                  <div className="w-full my-[6.4rem]">
                    <h2
                      className="text-primary
                      text-center text-[2rem] xl:text-[4rem]
                      font-semibold mb-[2rem] xl:mb-[3rem] capitalize"
                    >
                      {modulesFeaturesHeading}
                    </h2>
                    <div
                      className=" list-div text-[2rem] "
                      dangerouslySetInnerHTML={{
                        __html: modifiedContent(
                          portfolioDetails?.features_long,
                          filteredSkills,
                          listOfdata,
                        ),
                      }}
                    ></div>
                  </div>

                  {/* My Tools and Technologies */}
                  <ToolsAndTechnologies
                    sortedSkills={sortedSkills}
                    skillsContainerRef={skillsContainerRef}
                  />
                  {portfolioDetails !== null && (
                    <SliderXL portfolioPictures={portfolioDetails?.pictures} />
                  )}

                  {/* Upwork Activity Section */}
                  {listOfdata && listOfdata?.upwork_show_status === "show" && (
                    <div className=" lg:mt-[10rem] border rounded-2xl">
                      <UpworkActivitySection
                        urlInfo={urlInfo}
                        cvTrue={true}
                        data={listOfdata}
                      />
                    </div>
                  )}
                </div>
              </section>
              <div className="my-[5rem]">
                {listOfdata && (
                  <EducationComponent
                    listOfdata={listOfdata}
                    formatDate={formatDate}
                    dateFormatsOptions={dateFormatsOptions}
                  />
                )}
              </div>
              <div className="w-full my-[5rem]">
                <OurBlogs domain={listOfdata?.domain} />
              </div>
              {!urlInfo?.u && (
                <section className="w-full mb-[5rem]">
                  <Newsletter listOfdata={listOfdata} />
                </section>
              )}
            </>
          ),
        }}
      />
    </div>
  );
};

export default PortfolioDetails;
