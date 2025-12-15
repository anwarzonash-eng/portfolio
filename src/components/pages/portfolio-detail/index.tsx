"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import SliderXL from "@/components/Sliders/SliderXL";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/hooks/formatdate";
import Portfoliodetailbg from "@/components/portfoliodetailbg";
import { dateFormatsOptions } from "@/data/JsonData";
import WebsiteLoader from "@/components/WebsiteLoader";
import { modifiedContent } from "@/hooks/modifiedContent";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import PageRendering from "@/components/PageRendering";
import SkillsContainer from "@/components/SkillsContainer";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import EducationComponent from "@/components/EducationComponent";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import AreasOfExpertiesSkillComponent from "@/components/AreasOfExpertiesSkillComponent";
import { useSortedSkills } from "@/hooks/useSortedSkills";

const PortfolioDetails = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // New States Start
  const [featuresItemCount, setFeaturesItemCount] = useState(0);
  const [fullFeaturesHtml, setFullFeaturesHtml] = useState<string | null>(null);
  const [defaultTruncatedHtml, setDefaultTruncatedHtml] = useState<
    string | null
  >(null);
  const [isExpanded, setIsExpanded] = useState(false); // screen expansion toggle
  // End

  // Ref for the SkillsContainer section
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const techStacksRef = useRef<HTMLHeadingElement | null>(null);

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  // SKills List Managmeent useEffect
  useEffect(() => {
    if (!portfolioDetails) {
      setFeaturesItemCount(0);
      setFullFeaturesHtml("");
      setDefaultTruncatedHtml("");
      return;
    }

    try {
      const rawHtml =
        modifiedContent(
          portfolioDetails?.features_short,
          filteredSkills,
          listOfdata
        ) || "";

      const parserForCount = new DOMParser();
      const docForCount = parserForCount.parseFromString(rawHtml, "text/html");
      const allLis = Array.from(docForCount.querySelectorAll("li"));
      setFeaturesItemCount(allLis.length);
      setFullFeaturesHtml(rawHtml);

      // Helper builds truncated HTML
      const buildTruncated = (count: number) => {
        if (!rawHtml) return "";
        const parser = new DOMParser();
        const tempDoc = parser.parseFromString(rawHtml, "text/html");
        const lis = Array.from(tempDoc.querySelectorAll("li"));
        if (lis.length === 0) return rawHtml;

        const firstList = tempDoc.querySelector("ul, ol");
        const listTag = firstList ? firstList.tagName.toLowerCase() : "ul";

        const newDoc = document.implementation.createHTMLDocument("");
        const container = newDoc.createElement("div");
        const newList = newDoc.createElement(listTag);

        const take = Math.min(count, lis.length);
        lis.slice(0, take).forEach((li) => {
          newList.appendChild(li.cloneNode(true));
        });

        container.appendChild(newList);
        return container.innerHTML;
      };

      // Truncate to 15 items for screen
      setDefaultTruncatedHtml(
        allLis.length > 15 ? buildTruncated(15) : rawHtml
      );
    } catch (e) {
      console.error("[features] parse error:", e);
      setFeaturesItemCount(0);
      setFullFeaturesHtml("");
      setDefaultTruncatedHtml("");
    }
  }, [portfolioDetails, filteredSkills, listOfdata]);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
      );
      setFilteredSkills(matchedSkills);
    }
  }, [listOfdata, allSkills]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills: setAllSkills });
  }, []);

  // useEffect(() => {
  //   // console.log({ allparams: params.value });
  //   setURLInfo(getRoutesDetails(params, searchParams));
  // }, [params, searchParams]);

  // Use getRoutesDetails
  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "portfolioById",
        urlInfo,
        setError,
        setLoading,
        setListOfData, // 🛑 CORRECTED LOGIC 🛑
        itemID: params.id
          ? params.id // Case 1: ID is directly in params.id
          : Array.isArray(params.value)
          ? params.value[0] // Case 2: ID is the first element of a catch-all array
          : typeof params.value === "object" && params.value !== null
          ? params.value.id // Case 3: ID is nested as an object property
          : params.value, // 🛑 END CORRECTED LOGIC 🛑
      });
  }, [urlInfo, params.id, params.value]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (listOfdata && listOfdata?.portfolios_ids?.length > 0) {
      setPortfolioDetails(listOfdata?.portfolios_ids[0]);
    }
  }, [listOfdata]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

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

  // Here im Using Custom Hook in useSortedSkills
  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills,
  });

  // console.log("Sorted SKills:", sortedSkills);

  // console.log("portfolioDetails", portfolioDetails);

  return (
    <div className="bg-[#EFF5FD]">
      <PageRendering
        props={{
          list: portfolioDetails,
          loading: loading,
          error,
          actualPage: (
            <>
              {/* Hero Section */}
              <section className="mainContainer w-full lg:h-[90rem] relative overflow-hidden">
                <Portfoliodetailbg />
                <div className="mainContainer w-full flex items-center justify-center flex-col text-center pt-[6.5rem] pb-[8rem] relative z-20 ">
                  <div className="flex items-center text-white text-[1.4rem] leading-[2rem] font-medium">
                    <p className="">
                      {formatDate(
                        portfolioDetails?.updated_date,
                        dateFormatsOptions.dayMonthYear
                      )}
                    </p>
                  </div>
                  <h1 className="text-[4rem] lg:text-[6rem] leading-[5rem] lg:leading-[8rem] font-medium break-all text-white mt-[1.6rem] mb-[2.4rem]">
                    {portfolioDetails?.title}
                  </h1>
                </div>
              </section>
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
                    <aside className="rounded-[1rem] bg-white p-[2.4rem] md:max-w-[31.2rem] w-full flex flex-col gap-[3.2rem] ">
                      {portfolioDetails?.my_role && (
                        <div className="">
                          <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                            MY ROLE
                          </p>
                          <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc">
                            {portfolioDetails?.my_role}
                          </ul>
                        </div>
                      )}
                      {portfolioDetails?.services_i_provide && (
                        <div className="">
                          <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                            SERVICE I PROVIDE
                          </p>
                          <div
                            className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc"
                            dangerouslySetInnerHTML={{
                              __html: portfolioDetails?.services_i_provide,
                            }}
                          ></div>
                        </div>
                      )}
                      <div className="">
                        <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                          PROJECT DURATION
                        </p>
                        <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                          <li>
                            {formatDate(
                              portfolioDetails?.starting_date,
                              dateFormatsOptions.shortMonthYear
                            )}{" "}
                            -{" "}
                            {formatDate(
                              portfolioDetails?.ending_Date,
                              dateFormatsOptions.shortMonthYear
                            )}
                          </li>
                        </ul>
                      </div>
                      {portfolioDetails?.client_name && (
                        <div className="">
                          <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                            Client
                          </p>
                          <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                            <li>{portfolioDetails?.client_name}</li>
                          </ul>
                        </div>
                      )}
                      {portfolioDetails?.has_testimonial && (
                        <div className="">
                          <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                            CLIENT DESIGNATION
                          </p>
                          <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                            <li>
                              This slide is 100% editable. Adapt it to your
                              needs and capture your audience’s attention.
                            </li>
                          </ul>
                        </div>
                      )}
                    </aside>
                    <div className="w-full ">
                      <div className="text-heading">
                        <Link
                          href={portfolioDetails?.link || "#"}
                          className="text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center mb-[1.2rem]"
                        >
                          {portfolioDetails?.title}
                        </Link>
                        <h1 className="text-[3.2rem] font-medium leading-[4rem]">
                          Client/Project Brief Description
                        </h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              portfolioDetails?.tagline_1,
                              filteredSkills,
                              listOfdata
                            ),
                          }}
                          className="text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
                        ></p>
                        <p
                          className="text-[2rem] list-div leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              portfolioDetails?.tagline_2,
                              filteredSkills,
                              listOfdata
                            ),
                          }}
                        ></p>
                      </div>
                      <h4 className="text-primary text-[1.4rem] lg:text-[2rem] font-medium">
                        AREAS OF EXPERTISE I'VE WORKED IN:
                      </h4>
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem] mb-[3.2rem] mt-[1rem]">
                        {skillsforDetailPortfolio && (
                          <>
                            {Object?.values(skillsforDetailPortfolio)?.map(
                              (group, groupIndex) => (
                                <React.Fragment key={groupIndex}>
                                  {group.map((skill, i) => (
                                    <AreasOfExpertiesSkillComponent
                                      key={`${groupIndex}-${i}`}
                                      skill={skill}
                                      index={i}
                                      groupIndex={groupIndex}
                                      variant="different"
                                    />
                                  ))}
                                </React.Fragment>
                              )
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className="flex flex-col text-nowrap  
                      gap-[1.4rem] max-lg:items-center"
                      >
                        {portfolioDetails?.link &&
                          listOfdata?.companytype !== "leewop" && (
                            <Link
                              href={portfolioDetails?.link || "#"}
                              className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max"
                            >
                              Launch Project - Live Preview
                            </Link>
                          )}
                        {portfolioDetails?.has_testimonial && (
                          <Link
                            href={"/"}
                            className="text-primary  max-w-max text-[1.6rem] leading-[2.4rem] font-medium inline-block text-center"
                          >
                            Check Client Testimonial
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                  {/* OLd Section */}
                  {/* <div className="w-full my-[6.4rem]">
                    <h2
                     
                      className="text-primary 
                      text-center text-[2rem] xl:text-[4rem] 
                      font-semibold mb-[2rem] xl:mb-[3rem]"
                    >
                      Tech Stacks I worked On
                    </h2>
                    <div
                    id="tech-stacks"
                    ref={techStacksRef}
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                          portfolioDetails?.features_short,
                          filteredSkills,
                          listOfdata
                        ),
                      }}
                    className="w-full list-div 
                    text-[2rem] leading-[3.2rem] text-paragraph1 font-normal"
                    ></div>
                  </div> */}

                  {/* New Section */}
                  <div className="w-full my-[6.4rem]">
                    <h2
                      ref={techStacksRef}
                      id="tech-stacks-heading"
                      className="text-primary text-center text-[2rem] xl:text-[4rem] font-semibold mb-[2rem] xl:mb-[3rem]"
                    >
                      Tech Stacks I Have Worked On
                    </h2>
                    <div className="w-full relative">
                      <div
                        id="tech-stacks"
                        dangerouslySetInnerHTML={{
                          __html: isExpanded
                            ? fullFeaturesHtml || ""
                            : defaultTruncatedHtml || "",
                        }}
                        className="w-full list-div text-[2rem] leading-[3.2rem] text-paragraph1 font-normal"
                      ></div>

                      {/* Read More Button: show only if > 15 items */}
                      {featuresItemCount > 15 && (
                        <div className="text-center mt-4">
                          <button
                            onClick={() => setIsExpanded((s) => !s)}
                            className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max"
                          >
                            {isExpanded ? "Show Less" : "Read More"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
                      className="object-fill rounded-[1rem] border border-border border-solid"
                    />
                  </div>
                  <div className="w-full my-[6.4rem]">
                    <h2
                      className="text-primary 
                      text-center text-[2rem] xl:text-[4rem] 
                      font-semibold mb-[2rem] xl:mb-[3rem]"
                    >
                      Features & Modules
                    </h2>
                    <div
                      className=" list-div text-[2rem] "
                      dangerouslySetInnerHTML={{
                        __html: modifiedContent(
                          portfolioDetails?.features_long,
                          filteredSkills,
                          listOfdata
                        ),
                      }}
                    ></div>
                  </div>
                  
                  {/* My Tools and Technologies */}
                  <article className="my-[6.4rem]">
                    <div className="text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] text-center">
                      The skills, tools and technologies I used in this project:
                    </div>
                    <div ref={skillsContainerRef}>
                      <SkillsContainer
                        list={sortedSkills}
                        variant="portfolio"
                        autoExpandOnParam
                        layoutType
                      />
                    </div>
                  </article>
                  {portfolioDetails !== null && (
                    <SliderXL portfolioPictures={portfolioDetails?.pictures} />
                  )}
                  <div className="mt-[5rem] lg:mt-[10rem]">
                  <UpworkActivitySection
                    urlInfo={urlInfo}
                    cvTrue={true}
                    data={listOfdata}
                  />
                  </div>
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
