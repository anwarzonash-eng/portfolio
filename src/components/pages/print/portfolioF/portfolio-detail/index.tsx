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
import OurBlogsPortrait from "@/components/OurBlogsPortrait";
import SliderXLPrint from "@/components/Sliders/SliderXLPrint";
import SkillsContainerPrint from "@/components/SkillsContainerPrint";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import DesignationDomain from "@/components/DesignationDomain";
import NoteClickable from "@/components/NoteClickable";

const PortfolioDetails_p = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  useEffect(() => {
    console.log({ allparams: params.value });

    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "portfolioById",
        urlInfo,
        setLoading,
        setListOfData,
        itemID: params.id ? params?.id : JSON.parse(params.value).id,
      });
  }, [urlInfo]);

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

  return (
    <div className="bg-[#EFF5FD]">
      <PageRendering
        props={{
          list: portfolioDetails,
          loading: loading,
          actualPage: (
            <>
              {/* Welcome ✅ */}
              <section className="print:h-screen print:section bg-bannerBG !w-full print:FlexWrapContainer flex items-center justify-center relative">
                {/* Note For BTN */}
                <NoteClickable />
                {/* Welcome Card */}
                <div className="text-center p-[4rem] print:p-0">
                  <div className="items-center justify-strat gap-[4rem] flex flex-col w-full">
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
                      <div className="text-[4rem] font-medium flex items-center justify-center flex-wrap gap-[3px] w-full">
                        {" "}
                        {listOfdatas?.designation
                          ?.split("|")
                          .map((item, index) => (
                            <div key={index} className="text-center">
                              {item.trim()}
                            </div>
                          ))}
                      </div>
                      <div className="flex items-center justify-center w-full">
                        <DesignationDomain />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-[2.1rem] mt-[4rem] mb-[0.8rem] ">
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
              </section>

              {/* Blog Content Section ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative flex-col">
                <div
                  className={`absolute z-[1000] top-10 hidden print:right-0 print:block px-20`}
                >
                  <Link
                    className="text-white font-medium text-[2rem] underline ml-2"
                    href={`https://www.${listOfdatas.domain}`}
                  >
                    {listOfdatas.domain}
                  </Link>
                </div>
                {/* Portfolio Detail Container */}
                <div className="w-full h-[30rem] overflow-hidden  absolute top-0 left-0">
                  {/* Background SVG */}
                  <Portfoliodetailbg />
                  {/* Hero Top Content */}
                  <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-medium ">
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
                </div>
                <div className="max-w-[1550px] w-full mx-auto px-[4rem] mt-[34rem] print:mt-[30rem]">
                  {/* Blog Detail Pic*/}
                  <Image
                    src={portfolioDetails?.thumbnail}
                    height={1500}
                    width={3000}
                    alt="Banner"
                    className="w-full object-contain rounded-[1rem] print:h-[40rem] print:object-cover print:mt-5"
                  />
                  {/* Aside */}
                  <div
                    className="rounded-[1rem] grid grid-cols-2 print:grid-cols-1 bg-white p-[1.6rem] w-full 
                     gap-[3.2rem] mt-6"
                  >
                    {/* Aside Child */}
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
                    {/* Aside Child */}
                    {portfolioDetails?.services_i_provide && (
                      <div className="">
                        <p className="text-[1.8rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                          SERVICE I PROVIDE
                        </p>
                        <div
                          className="text-[2rem] text-heading font-medium leading-[2.6rem] list-inside list-disc"
                          dangerouslySetInnerHTML={{
                            __html: portfolioDetails?.services_i_provide,
                          }}
                        ></div>
                      </div>
                    )}
                    {/* Aside Child */}
                    <div className="print:border-l-[5px] border-primary print:pl-5">
                      <p className="text-[1.8rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                        PROJECT DURATION
                      </p>
                      <ul className="text-[2rem] text-heading font-medium leading-[2.6rem]">
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
                    {/* Aside Child */}
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
                    {/* Aside Child */}
                    {portfolioDetails?.has_testimonial && (
                      <div className="">
                        <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                          CLIENT DESIGNATION
                        </p>
                        <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
                          <li>
                            This slide is 100% editable. Adapt it to your needs
                            and capture your audience’s attention.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Blog Detail Content ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative mt-10 print:m-0">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                  {/* Content */}
                  <div className="w-full ">
                    {/* Heading and Para */}
                    <div className="text-heading">
                      <Link
                        href={portfolioDetails?.link || "#"}
                        className="text-primary text-[2.5rem] leading-[2.4rem] font-medium w-full text-left mb-[2rem] inline-block"
                      >
                        {portfolioDetails?.title}
                      </Link>
                      {/* Heading */}
                      <h1 className="text-[3.2rem] font-medium leading-[4rem]">
                        Client/Project Brief Description
                      </h1>
                      {/* Para */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: modifiedContent(
                            portfolioDetails?.tagline_1,
                            listOfskills,
                            listOfdata
                          ),
                        }}
                        className="text-[2.4rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
                      ></p>
                      {/* Para */}
                      <p
                        ref={skillsRef}
                        className="text-[2rem] list-div leading-[3.2rem] font-normal  text-paragraph1"
                        dangerouslySetInnerHTML={{
                          __html: modifiedContent(
                            portfolioDetails?.tagline_2,
                            listOfskills,
                            listOfdata
                          ),
                        }}
                      ></p>
                    </div>

                    {/* Skills Badges */}
                    <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap my-[3.2rem]">
                      {skillsforDetailPortfolio && (
                        <>
                          {Object.values(skillsforDetailPortfolio)
                            .flat()
                            .slice(0, 10)
                            .map((skill, i) => (
                              <Link
                                key={i}
                                href={skill?.url || "#"}
                                className="hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.6rem] font-medium leading-normal"
                              >
                                {skill.title}
                              </Link>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                  {/* Paragraph Text */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        portfolioDetails?.features_short,
                        listOfskills,
                        listOfdata
                      ),
                    }}
                    className="w-full list-div my-[6.4rem] leading-[3.2rem] font-normal"
                  ></div>
                </div>
              </section>

              {/* Key Modules and Contributions ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                  <Image
                    src={portfolioDetails?.thumbnail}
                    height={1500}
                    width={1500}
                    alt="Banner"
                    className="rounded-[1rem] h-[500px] object-cover mb-[6rem]"
                  />
                  <div
                    className="text-[1.8rem] line-clamp-[8]"
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        portfolioDetails?.features_long,
                        listOfskills,
                        listOfdata
                      ),
                    }}
                  ></div>
                </div>
              </section>

              {/* Skills & Tool Chain Section ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative flex-col">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                {/* My Tools and Technologies */}
                <div className="max-w-[1550px] w-full mx-auto px-[4rem] ">
                  {/* Badge */}
                  <div
                    className="px-[4rem] mt-[3rem] py-[1.4rem] bg-white rounded-[100px] border border-border border-solid text-center max-w-max text-heading
                    text-[2rem] font-medium font-Inter leading-[2rem] mx-auto"
                  >
                    Skills
                  </div>
                  {/* Heading */}
                  <div
                    className="text-center text-heading text-[2.4rem] print:text-[3rem] 
                    font-medium leading-[2.8rem] my-[2rem]"
                  >
                    {listOfdata?.companytype == "leewop" ? (
                      <span>The skills & tools I am really good at</span>
                    ) : (
                      <span>
                        The skills, tools and technologies I am good at
                      </span>
                    )}
                  </div>
                  {/* Skills Container */}
                  <SkillsContainerPrint
                    list={portfolioDetails?.skills}
                    layoutType={true}
                    initialVisibleItems={8}
                  />
                </div>
                {/* Slider  Sections ✅ */}
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                  {portfolioDetails !== null && (
                    <SliderXLPrint
                      portfolioPictures={portfolioDetails?.pictures}
                    />
                  )}
                </div>
              </section>

              {/* Our Blogs Section ✅ */}
              <section className="max-w-[1550px] w-full mx-auto">
                <OurBlogsPortrait
                  domain={listOfdata?.domain}
                  locationLink={`/portfolio/?sectionId=blogsSection`}
                />
              </section>
            </>
          ),
        }}
      />
    </div>
  );
};

export default PortfolioDetails_p;
