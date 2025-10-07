"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/styles/printStyles/portfolio_detail_p.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/hooks/formatdate";
import Portfoliodetailbg from "@/components/portfoliodetailbg";
import { dateFormatsOptions } from "@/data/JsonData";
import { modifiedContent } from "@/hooks/modifiedContent";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import PageRendering from "@/components/PageRendering";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import SliderXLPrint from "@/components/Sliders/SliderXLPrint";
import SkillsContainerPrint from "@/components/SkillsContainerPrint";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import DesignationDomain from "@/components/DesignationDomain";
import NoteClickable from "@/components/NoteClickable";
import EducationBlogsPortrait from "@/components/EducationBlogsPortrait";
import EducationBlogsLandscape from "@/components/EducationBlogsLandscape";

const PortfolioDetails_p = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

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
  }, [urlInfo, params.id, params.value]); //

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
  const skillsRef = useRef<HTMLDivElement | null>(null); // Create a ref for the skills section

  useEffect(() => {
    if (portfolioDetails) {
      if (searchParams.get("scroll") === "skills" && skillsRef.current) {
        skillsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams, portfolioDetails]);

  const skillsforDetailPortfolio: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(portfolioDetails?.skills);

  // Simple print-only logic: count number of <li> items in features_short
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const [featuresItemCount, setFeaturesItemCount] = useState(0);

useEffect(() => {
  if (!portfolioDetails) {
    setFeaturesItemCount(0);
    return;
  }
  try {
    const rawHtml = modifiedContent(
      portfolioDetails?.features_short,
      filteredSkills,
      listOfdata
    );
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml || "", "text/html");
    const lis = doc.querySelectorAll("li");
    setFeaturesItemCount(lis.length);
  } catch (e) {
    setFeaturesItemCount(0);
  }
}, [portfolioDetails, filteredSkills, listOfdata]);

 

  return (
    <div className="bg-[#EFF5FD]">
      <PageRendering
        props={{
          list: portfolioDetails,
          loading: loading,
          actualPage: (
            <>
              {/* Welcome ✅ */}
              <section className="h-screen print:section bg-bannerBG !w-full  print:FlexWrapContainer flex items-center justify-center relative">
                {/* Note and Domain For Each Page */}
                <NoteClickable />
                <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <div className="items-center justify-strat gap-[4rem] flex w-full">
                      <img
                        src={listOfdatas?.profile_photo_1}
                        alt=""
                        className="size-[245px] rounded-full"
                      />
                      <div className="flex items-start justify-start flex-col">
                        <h2 className="text-[7rem] font-bold">
                          {" "}
                          {listOfdata?.name}
                        </h2>
                        <div className="text-[4rem] font-medium flex items-center justify-center flex-wrap gap-[3px]">
                          {" "}
                          {listOfdatas?.designation
                            ?.split("|")
                            .map((item, index) => (
                              <div key={index} className="text-center">
                                {item.trim()}
                              </div>
                            ))}
                        </div>

                        {/* Designation Domain */}
                        <DesignationDomain />
                      </div>
                    </div>
                    <div className="flex items-center gap-[2rem] mb-[0.8rem] justify-start ml-[280px]">
                      {urlInfo?.u ? (
                        <WorkProofLinks
                          props={{
                            upwork: listOfdata?.upwork,
                            github: listOfdata?.github,
                            linkedIn: listOfdata?.linkedIn,
                            behance_link: listOfdata?.behance_link,
                            u: urlInfo?.u,
                          }}
                        />
                      ) : (
                        <>
                          <WorkProofLinks
                            props={{
                              upwork: listOfdata?.upwork,
                              github: listOfdata?.github,
                              linkedIn: listOfdata?.linkedIn,
                              behance_link: listOfdata?.behance_link,
                              u: urlInfo?.u,
                            }}
                          />
                          <ContactMeLinks
                            props={{
                              email: listOfdata?.email,
                              phone_no: listOfdata?.phone_no,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Blog Content Section ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative flex-col"> 
                {/* Portfolio Detail Container */}
                <div className="w-full min-h-screen overflow-hidden ">
                  {/* Background SVG */}
                  <Portfoliodetailbg />
                  {/* Hero Top Content */}
                  <div className="absolute z-20 top-[5rem] left-1/2 -translate-x-1/2  text-white font-medium">
                    {/* info */}
                    <div className="text-center text-[1.4rem] leading-[2rem]">
                      <p className="">
                        {formatDate(
                          portfolioDetails?.updated_date,
                          dateFormatsOptions.dayMonthYear
                        )}
                      </p>
                    </div>
                    {/* Heading */}
                    <h1 className="text-[5rem] leading-[5rem] mt-[1.6rem] text-center">
                      {portfolioDetails?.title}
                    </h1>
                  </div>
                  <div className="relative z-50 top-[18rem] max-w-[1000px] mx-auto w-full min-h-[700px]">
                    {/* Blog Detail Pic*/}
                    <Image
                      src={portfolioDetails?.thumbnail}
                      height={2000}
                      width={2000}
                      alt="Banner"
                      className="rounded-[1rem] h-full w-full object-fill border border-solid border-border"
                    />
                  </div>
                </div>
              </section>

              {/* Blog Detail Section ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative mt-10 print:m-0">
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                  <article className="flex  items-center justify-center">
                    <div className="flex gap-[4rem]">
                      <div className="flex flex-col gap-[1rem] min-w-[28rem]">
                        <aside
                          className="rounded-[1rem] bg-white p-[2.4rem] 
                        w-full flex flex-col gap-[3.2rem]"
                        >
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
                                className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc line-clamp-6"
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
                        <Link href={"/cv"}>
                          <button className="w-full btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5rem] text-[1.8rem] font-medium border border-solid border-custom">
                            View CV Online
                          </button>
                        </Link>
                      </div>
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
                          className="text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem] line-clamp-6"
                        ></p>
                        <p
                          className="text-[2rem] list-div leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem] line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              portfolioDetails?.tagline_2,
                              filteredSkills,
                              listOfdata
                            ),
                          }}
                        ></p>
                    <div className="w-full ">
                      <h4 className="text-primary text-[1.4rem] lg:text-[2rem] font-medium">
                        AREAS OF EXPERTISE I'VE WORKED IN:
                      </h4>
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem] mb-[3.2rem] mt-[1rem]">
                        {skillsforDetailPortfolio && (
                          <>
                            {Object.values(skillsforDetailPortfolio)
                              .flat() // flatten nested groups into one array
                              .slice(0, 10) // take only first 10
                              .map((skill, i) => (
                                <Link
                                  key={i}
                                  href={skill?.url || "#"}
                                  className="hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                >
                                  {skill.title}
                                </Link>
                              ))}
                          </>
                        )}
                      </div>
                      <div className="flex flex-col text-nowrap  gap-[1.4rem]">
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
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              {/* Blog Tech Stacks I worked On  Section ✅  */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative mt-10 print:m-0">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem] limit-height-portfolio-detail">
                  <h2 className="text-primary text-center text-[4rem] font-semibold my-[1rem]">
                    Tech Stacks I worked On
                  </h2>
                  {/* Paragraph Text */}
                  <div className="w-full relative">
                    <div
                      ref={featuresRef}
                      dangerouslySetInnerHTML={{
                        __html: modifiedContent(
                          portfolioDetails?.features_short,
                          filteredSkills,
                          listOfdata
                        ),
                      }}
                      className="w-full list-div my-[6.4rem] print:my-[2rem] leading-[3.2rem] font-normal limit-features-height"
                    ></div>
                    {/* Print-only Read More: show only in print and only if > 9 items */}
                    {featuresItemCount > 9 && (
                      <div className="print:flex print:text-center print:mt-4 items-center justify-center hidden">
                        <Link
                        // href={`/portfolio/${portfolioDetails?.id}`}
                        href={`/portfolio/${portfolioDetails?.id}?scroll=points`}
                        target="_blank"
                        className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max"
                        >
                          Read More
                        </Link>
                        </div>
                    )}

                    
                  </div>
                </div>
              </section>

              {/* Key Modules and Contributions ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative mt-10 print:m-0">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem] limit-height-portfolio-detail">
                  {/* <Image
                    src={portfolioDetails?.thumbnail}
                    height={1500}
                    width={1500}
                    alt="Banner"
                    className="rounded-[1rem] h-[500px] object-cover mb-[6rem]"
                  /> */}

                  <h2 className="text-primary text-center text-[4rem] font-semibold my-[1rem]">
                    Features & Modules
                  </h2>
                  <div
                    className="text-[1.8rem]"
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        portfolioDetails?.features_long,
                        filteredSkills,
                        listOfdata
                      ),
                    }}
                  ></div>
                </div>
              </section>

              {/* Skills & Tool Chain Section ✅ */}
              <section className="px-[4rem] my-[5rem] print:h-screen print:section flex items-center justify-center relative">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                {/* My Tools and Technologies */}
                <div className="max-w-[1550px] w-full mx-auto px-[4rem] ">
                  {/* Badge */}
                  <div
                    className="px-[4rem] my-[2rem] py-[1.4rem] bg-white rounded-[100px] border border-border border-solid text-center max-w-max text-heading
                    text-[2rem] font-medium font-Inter leading-[2rem] mx-auto"
                  >
                    Skills
                  </div>

                  {/* Skills Container */}
                  <SkillsContainerPrint
                    list={listOfdata?.skills_ids}
                    numColumns={6} // number of columns to display
                    numSkills={24} // number of skills to display
                    // Prefer the current portfolio's id, then the route param, then fallback to the first portfolio id
                    portfolioId={
                      portfolioDetails?.id ||
                      params?.id ||
                      listOfdata?.portfolios_ids?.[0]?.id
                    }
                  />
                </div>
              </section>

              {/* Slider  Sections ✅ */}
              <section className="px-[4rem] my-[5rem] print:h-screen print:section flex items-center justify-center relative">
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                  {portfolioDetails !== null && (
                    <SliderXLPrint
                      portfolioPictures={portfolioDetails?.pictures}
                      portfolioId={portfolioDetails?.id || params?.id}
                    />
                  )}
                </div>
              </section>

              {/* Education & Blogs Section */}
              <EducationBlogsLandscape />
            </>
          ),
        }}
      />
    </div>
  );
};

export default PortfolioDetails_p;
