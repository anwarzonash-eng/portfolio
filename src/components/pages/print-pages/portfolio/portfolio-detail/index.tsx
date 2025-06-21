"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/styles/printStyles/portfolio_detail_p.css";
import Newsletter from "@/components/Newsletter";
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
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import PageRendering from "@/components/PageRendering";
import SkillsContainer from "@/components/SkillsContainer";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import Header from "@/components/layouts/header/page";
import OurBlogsPortrait from "@/components/OurBlogsPortrait";

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
              {/* <Welcome /> */}
              <section className="!w-full h-full relative flex flex-col print:bg-[#a3ddd3] print:break-before-page">
                {/* Hero Section */}
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]  relative overflow-hidden">
                  {/* Background SVG */}
                  <Portfoliodetailbg />
                  {/* Hero Top Content */}
                  <div className="max-w-[1550px] w-full mx-auto px-[4rem] flex items-center justify-center flex-col text-center pt-[6.5rem] pb-[8rem] relative z-20">
                    {/* info */}
                    <div className="flex items-center text-white text-[1.4rem] print:text-[2.4rem] leading-[2rem] font-medium">
                      <p className="">
                        {formatDate(
                          portfolioDetails?.updated_date,
                          dateFormatsOptions.dayMonthYear
                        )}
                      </p>
                    </div>
                    {/* Heading */}
                    <h1 className="text-[4rem] print:text-[6rem] print:mt-10 leading-[5rem] font-medium break-all text-white mt-[1.6rem] mb-[2.4rem]">
                      {portfolioDetails?.title}
                    </h1>
                  </div>
                </div>
                {/* Welcome Card */}
                <div className="w-full relative hidden print:!block h-[858px]">
                  <div className="max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] relative z-20 print:mt-[5rem]">
                    <div className="items-center justify-strat gap-[4rem] print:flex flex-col hidden w-full">
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
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[2.1rem] mt-[4rem] mb-[0.8rem] ">
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
                    </div>
                  </div>
                </div>
              </section>

              {/* Blog Content Section */}
              <section className="max-w-[1550px] w-full mx-auto px-[4rem]  relative top-[20px] print:top-0 print:p-6 print:break-before-page">
                {/* Blog Detail Pic*/}
                <Image
                  src={portfolioDetails?.thumbnail}
                  height={1500}
                  width={3000}
                  alt="Banner"
                  className="w-full object-contain rounded-[1rem] print:h-[725px] print:object-cover print:mt-5"
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
              </section>

              {/* Blog Detail Content */}
              <section className="max-w-[1550px] w-full mx-auto px-[4rem] relative top-[20px] print:top-0 print:p-6 print:break-before-page mt-10 print:mt-8">
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
                  <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap my-[3.2rem] ">
                    {skillsforDetailPortfolio && (
                      <>
                        {Object?.values(skillsforDetailPortfolio)?.map(
                          (group, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                              {group.map((skill, i) => (
                                <Link
                                  href={skill?.url || "#"}
                                  className="hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.6rem] font-medium leading-normal"
                                >
                                  {skill.title}
                                </Link>
                              ))}
                              {/* Line break after each group */}
                            </React.Fragment>
                          )
                        )}
                      </>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-col text-nowrap  gap-[1.4rem] ">
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
              </section>

              {/* Key Modules and Contributions */}
              <section className="max-w-[1550px] w-full mx-auto px-[4rem] print:p-6 print-section mt-10 print:mt-8">
                <div
                  className="text-[1.8rem] print:text-[2.1rem]"
                  dangerouslySetInnerHTML={{
                    __html: modifiedContent(
                      portfolioDetails?.features_long,
                      listOfskills,
                      listOfdata
                    ),
                  }}
                ></div>
              </section>

              {/* Skills & Tool Chain Section */}
              <section className="max-w-[1550px] w-full mx-auto px-[4rem] print:p-6 print:break-before-page mt-10 print:mt-8">
                <Image
                  src={portfolioDetails?.thumbnail}
                  height={1500}
                  width={1500}
                  alt="Banner"
                  className="object-contain rounded-[1rem] print:h-[500px] print:object-cover"
                />
                {/* My Tools and Technologies */}
                <article className="mt-[3rem]">
                  {/* Heading */}
                  <div className="text-heading text-[3rem] font-medium leading-[2.8rem] text-center">
                    The skills, tools and technologies I used in this project:
                  </div>
                  {/* Skills Container */}
                  <SkillsContainer list={portfolioDetails?.skills} />
                </article>
              </section>

              {/* Slider Contact Form and Blog Sections */}
              <section className="max-w-[1550px] w-full mx-auto px-[4rem] print:p-6 print:break-before-page mt-10 print:mt-8">
                {/* SliderXL */}
                {portfolioDetails !== null && (
                  <SliderXL portfolioPictures={portfolioDetails?.pictures} />
                )}
                {/* Our Blogs Section */}
                <div className="w-full my-8">
                  <OurBlogsPortrait domain={listOfdata?.domain} />
                </div>
              </section>
            </>
          ),
        }}
      />
    </div>
  );
};

export default PortfolioDetails_p;
