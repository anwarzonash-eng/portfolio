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

const PortfolioDetails = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();

  const [portfolioDetails, setPortfolioDetails] = useState(null);

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
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
              {/* Hero Section */}
              <section className="mainContainer w-full lg:h-[90rem] relative overflow-hidden">
                {/* Background SVG */}
                <Portfoliodetailbg />
                {/* Hero Top Content */}
                <div className="mainContainer w-full flex items-center justify-center flex-col text-center pt-[6.5rem] pb-[8rem] relative z-20 ">
                  {/* info */}
                  <div className="flex items-center text-white text-[1.4rem] leading-[2rem] font-medium">
                    <p className="">
                      {formatDate(
                        portfolioDetails?.updated_date,
                        dateFormatsOptions.dayMonthYear
                      )}
                    </p>
                  </div>
                  {/* Heading */}
                  <h1 className="text-[4rem] lg:text-[6rem] leading-[5rem] lg:leading-[8rem] font-medium break-all text-white mt-[1.6rem] mb-[2.4rem]">
                    {portfolioDetails?.title}
                  </h1>
                </div>
              </section>
              {/* Blog Content Section */}
              <section className="mainContainer w-full relative top-0 lg:mt-[-55rem] ">
                <div className="w-full mt-[1rem]">
                  {/* Blog Detail Pic Desktop*/}
                  <Image
                    src={portfolioDetails?.thumbnail}
                    height={1500}
                    width={3000}
                    alt="Banner"
                    className="hidden lg:block h-[70rem] object-contain rounded-[1rem]"
                  />
                  {/* Mobile */}
                  <Image
                    src={portfolioDetails?.thumbnail}
                    height={410}
                    width={800}
                    alt="Banner"
                    className=" w-full object-contain lg:hidden rounded-[1rem]"
                  />
                  {/* Blog Detail Content */}
                  <article className="mt-[6rem] flex gap-[4rem] flex-col items-center justify-center md:flex-row md:items-start md:justify-normal">
                    {/* Aside */}
                    <aside className="rounded-[1rem] bg-white p-[2.4rem] md:max-w-[31.2rem] w-full flex flex-col gap-[3.2rem] ">
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
                          <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
                            SERVICE I PROVIDE
                          </p>
                          {/* <ul className='text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc'>
                <li>UI/UX Designer</li>
                <li>Webflow Development</li>
                <li>Product Marketing</li>
                <li>Website Content Writing</li>
              </ul> */}
                          <div
                            className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc"
                            dangerouslySetInnerHTML={{
                              __html: portfolioDetails?.services_i_provide,
                            }}
                          ></div>
                        </div>
                      )}
                      {/* Aside Child */}
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
                              This slide is 100% editable. Adapt it to your
                              needs and capture your audience’s attention.
                            </li>
                          </ul>
                        </div>
                      )}
                    </aside>
                    {/* Content */}
                    <div className="w-full ">
                      {/* Heading and Para */}
                      <div className="text-heading">
                        <Link
                          href={portfolioDetails?.link || "#"}
                          className="text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center mb-[1.2rem]"
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
                          className="text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
                        ></p>
                        {/* Para */}
                        <p
                          ref={skillsRef}
                          className="text-[2rem] list-div leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]"
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
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem] my-[3.2rem]">
                        {skillsforDetailPortfolio && (
                          <>
                            {Object?.values(skillsforDetailPortfolio)?.map(
                              (group, groupIndex) => (
                                <React.Fragment key={groupIndex}>
                                  {group.map((skill, i) => (
                                    <Link
                                      href={skill?.url || "#"}
                                      className="hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                    >
                                      {skill.title}
                                    </Link>
                                  ))}
                                  {/* Line break after each group */}
                                  <div className="w-full mb-[1px]" />
                                </React.Fragment>
                              )
                            )}
                          </>
                        )}
                      </div>

                      {/* Links */}
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
                  </article>

                  {/* Paragraph Text */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        portfolioDetails?.features_short,
                        listOfskills,
                        listOfdata
                      ),
                    }}
                    className="w-full list-div my-[6.4rem] text-[2rem] leading-[3.2rem] text-paragraph1 font-normal"
                  ></div>

                  {/* Detiald Banner 2 */}
                  <div className="w-full h-auto">
                    <Image
                      src={portfolioDetails?.thumbnail}
                      height={1500}
                      width={1500}
                      alt="Banner"
                      className=" object-contain rounded-[1rem] "
                    />
                  </div>

                  {/* Key Modules and Contributions */}
                  <div
                    className="my-[6.4rem] list-div text-[2rem] "
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        portfolioDetails?.features_long,
                        listOfskills,
                        listOfdata
                      ),
                    }}
                  ></div>

                  {/* My Tools and Technologies */}
                  <article className="my-[6.4rem]">
                    {/* Heading */}
                    <div className="text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] ">
                      The skills, tools and technologies I used in this project:
                    </div>
                    {/* Skills Container */}
                    <SkillsContainer list={portfolioDetails?.skills} />
                  </article>

                  {/* SliderXL */}
                  {portfolioDetails !== null && (
                    <SliderXL portfolioPictures={portfolioDetails?.pictures} />
                  )}
                </div>
              </section>
              {/* Our Blogs Section */}
              <div className="w-full my-[10rem] lg:my-[12rem]">
                <OurBlogs domain={listOfdata?.domain} />
              </div>
              {/* Newsletter */}

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
