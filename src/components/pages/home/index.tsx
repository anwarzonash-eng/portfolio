"use client";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import HomeSlider from "@/components/Sliders/HomeSlider";
import Faqs from "@/components/Faqs";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import MyServices from "@/components/MyServicesCards";
import TestimonialSlider from "@/components/Sliders/TestimonialSlider";
import FreeTrialPopup from "@/components/FreeTrialPopup";
import Welcome from "@/components/Welcome";
import React, { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import Link from "next/link";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import { dateFormatsOptions } from "@/data/JsonData";
import WebsiteLoader from "@/components/WebsiteLoader";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { skillsSyncApi } from "@/apiHandlers/skillsApi";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { getColors, updateCSSVariables } from "@/hooks/colors";
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { downloadFile } from "@/hooks/downloadFile";
import OurBlogs from "@/components/OurBlogs";
import Newsletter from "@/components/Newsletter";
import PageRendering from "@/components/PageRendering";
import { scrollToSection } from "@/hooks/scrollToSection";
import SkillsContainer from "@/components/SkillsContainer";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Header from "@/components/layouts/header/page";
import { SmoothScroll } from "@/hooks/SmoothScroll";

const Home = ({ params }: { params: any }) => {
  useBodyBackgroundColor("#f8f9fa");
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const skillsContainerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [showAll, setShowAll] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  useEffect(() => {
    const sectionID = searchParams.get("sectionId");
    if (!sectionID) return;
    // Example: URL query ya koi condition ke basis par scroll karo
    console.log("Section ID:", sectionID);
    const targetId = "about";
    SmoothScroll(sectionID);
  }, [listOfdata]);

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "home",
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    const skillsContainer = skillsContainerRef?.current;
    if (skillsContainer) {
      // Check if content overflows the specified height (e.g., 40rem)
      setIsOverflowing(
        skillsContainer?.scrollHeight > skillsContainer?.clientHeight
      );
    }
  }, [listOfdata?.skills_ids]);

  useEffect(() => {
    if (listOfdata) {
      // console.log(listOfdata);
      // skillsSyncApi({ setListOfSkills });
    }
    listOfdata && handleSkillsApiCall({ setListOfSkills });
  }, [listOfdata]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(listOfdata?.skills_ids);

  return (
    <>
      <main className="w-full print:bg-[#a3ddd3]">
        <PageRendering
          props={{
            list: listOfdata,
            loading: loading,
            actualPage: (
              <>
                <FreeTrialPopup listOfdata={listOfdata} urlInfo={urlInfo} />
                {/* <Welcome /> */}
                <section className="!w-full relative print:flex flex-col hidden h-screen print:bg-[#a3ddd3] print:break-before-page">
                  <div className="relative print:block !w-full hidden">
                    <Header />
                  </div>
                  <div className="mainContainer w-full relative ">
                    <div className="max-w-[1024px]  mx-auto text-center px-[2rem] pt-[8rem] relative z-20 print:mt-[20rem] ">
                      <div className=" items-center justify-strat gap-[4rem] print:flex hidden  w-full  ">
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
                          <div className="text-[2rem] font-medium flex items-center justify-center flex-wrap gap-[3px]">
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
                      <div className="flex items-center gap-[2.1rem] mt-[4rem] mb-[0.8rem]">
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
                {/* Hero Section */}
                <div className="w-full overflow-hidden relative bg-bannerBG print:break-before-page  print:h-screen print:m-0">
                  {/*Hero Section For Mobile and Tablet Devices*/}
                  <div className="mainContainer relative xl:hidden print:hidden ">
                    {/* Hero Section Mobile Content */}
                    <div className="text-center mt-[7.6rem] ">
                      <p className="text-heading text-[2rem] md:text-[3.66rem] font-normal">
                        Hello! I’m
                      </p>
                      <div className="print:flex flex-col w-full print:mx-auto gap-8 items-center justify-center">
                        <div className="mt-[0.5rem] print:flex items-center justify-center flex-col print:w-full font-bold text-[4rem] print:text-[10rem] md:text-[8rem] lg:text-[12rem] text-primary  gap-[1rem] relative inline-block">
                          {listOfdata?.name}
                          <Image
                            src={"/images/mobileStars.svg"}
                            height={45}
                            width={45}
                            alt="Mobile Stars"
                            className="max-[365px]:hidden print:hidden block mt-[1rem] h-[4.5rem] w-[4.5rem] absolute top-0 right-[-4.5rem]"
                          />
                        </div>
                        {/* Badge */}
                        <div className="flex  print:flex items-center  print:w-full  justify-center max-w-[88rem] mx-auto mb-[2rem]">
                          <button className="px-[2rem] py-[1.5rem] print:px-[5rem] print:py-[1.4rem] lg:py-[2rem] lg:px-[4rem] bg-primary rounded-[5rem] text-center text-[1.6rem] print:text-[2.3rem] lg:text-[2.4rem] font-bold text-white border-none outline-none my-[2rem] lg:mb-auto">
                            {listOfdata?.designation
                              ?.split("|")
                              .map((item, index) => (
                                <div key={index} className="text-center">
                                  {item.trim()}
                                </div>
                              ))}
                          </button>
                        </div>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: listOfdata?.tag_line,
                        }}
                        className="mb-[2rem] text-primary leading-[2rem] text-[1.6rem] text-center lg:hidden"
                      ></p>
                      {/* for small screen */}
                      {listOfdata &&
                        listOfdata.skills_ids &&
                        listOfdata.skills_ids.length > 0 && (
                          <div className="w-full p-[1.5rem] flex justify-center items-center flex-col gap-[1rem] lg:hidden">
                            <div className="w-full flex justify-center items-center gap-[0.6rem] flex-wrap">
                              {/* Normal view (shows limited skills) */}
                              {Object.values(skills)
                                .flat()
                                .slice(0, !showAll ? 10 : undefined)
                                .map((skill, i) => {
                                  const groupIndex = Object.values(
                                    skills
                                  ).findIndex((group) => group.includes(skill));
                                  const skillNumber = `${groupIndex + 1}.${
                                    skills[
                                      Object.keys(skills)[groupIndex]
                                    ].indexOf(skill) + 1
                                  }`;

                                  return (
                                    <Link
                                      href={skill.url || "#"}
                                      legacyBehavior
                                      key={`${groupIndex}-${i}`}
                                    >
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          animationDelay: `${i * 0.1}s`,
                                        }}
                                        className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group print:opacity-100"
                                      >
                                        {skill?.title}
                                      </a>
                                    </Link>
                                  );
                                })}

                              {/* Print view (shows all skills) */}
                              <div className="hidden print:flex print:flex-wrap  print:justify-center print:items-center print:gap-[18px] print:w-full">
                                {Object.values(skills)
                                  .flat()
                                  .slice(0, !showAll ? 12 : undefined)
                                  .map((skill, i) => {
                                    const groupIndex = Object.values(
                                      skills
                                    ).findIndex((group) =>
                                      group.includes(skill)
                                    );
                                    const skillNumber = `${groupIndex + 1}.${
                                      skills[
                                        Object.keys(skills)[groupIndex]
                                      ].indexOf(skill) + 1
                                    }`;

                                    return (
                                      <Link
                                        href={skill.url || "#"}
                                        legacyBehavior
                                        key={`print-${groupIndex}-${i}`}
                                      >
                                        <a
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="capitalize text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center  rounded-[5rem] shadow border border-[#757575]"
                                        >
                                          {skill?.title}
                                        </a>
                                      </Link>
                                    );
                                  })}
                              </div>
                            </div>

                            {/* Buttons hidden on print */}
                            {!showAll &&
                              Object.values(skills).flat().length > 10 && (
                                <button
                                  onClick={() => setShowAll(true)}
                                  className="mt-4 bg-primary text-white px-4 py-2 mb-[15px] rounded hover:bg-primary-dark transition-colors print:hidden"
                                >
                                  Show More Skills
                                </button>
                              )}

                            {showAll && (
                              <button
                                onClick={() => setShowAll(false)}
                                className="mt-4 bg-primary text-white px-4 py-2 mb-[15px] rounded hover:bg-primary-dark transition-colors print:hidden"
                              >
                                Show Less
                              </button>
                            )}
                          </div>
                        )}
                    </div>
                    {/*Hero Section Developer Image */}
                    <div className="print:flex gap-3 print:w-full items-start justify-center ">
                      <div className="relative  print:w-[50%] md:flex justify-center ">
                        <Image
                          width={731}
                          height={907}
                          alt=""
                          src={listOfdata?.profile_photo_2}
                          className="print:h-[700px] print-w-[640px]"
                        />
                        {/* Positioned Elementes Price */}
                        <div className="flex gap-[0.35rem] text-nowrap text-primary text-[1.4rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg px-[1.2rem] absolute top-[25%] left-[98%] translate-x-[-90%] md:left-[80%] md:translate-x-[-80%] animate-pulse min-w-max ">
                          <Image
                            src={"/images/clock.svg"}
                            height={14}
                            width={14}
                            alt="Clock"
                            className="h-[2rem] w-[2rem]"
                          />
                          <p>45 hr / Week </p>
                        </div>

                        {/* Positioned Elementes Availability */}
                        <div className="flex gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg max-w-max px-[0.9rem] pr-[1.4rem] absolute bottom-[25%] left-[10%] translate-x-[-15%] md:left-[20%] md:translate-x-[-20%] animate-pulse">
                          <Image
                            src={"/images/dollar-symbol.svg"}
                            height={14}
                            width={14}
                            alt="Dollar Symbol"
                            className="h-[auto] w-[auto]"
                          />
                          <p>${listOfdata?.hourly_rate} / hour</p>
                        </div>
                      </div>
                      <div className="print:w-[50%] print:block hidden print:mt-[45px]">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: listOfdata?.tag_line,
                          }}
                          className="mb-[2rem] text-primary  text-[2.6rem] leading-[40px] text-start "
                        ></p>
                        {listOfdata &&
                          listOfdata.skills_ids &&
                          listOfdata.skills_ids.length > 0 && (
                            <div className="   ">
                              <div className="flex justify-between bg-primary border-b border-border w-full py-[1rem] px-[2rem]">
                                <div className="text-left text-white text-[1.8rem] font-medium">
                                  My Skills
                                </div>
                              </div>

                              <div
                                ref={skillsContainerRef}
                                className="w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap r"
                                style={{ maxHeight: "46.3rem" }}
                              >
                                {Object?.values(skills)?.map(
                                  (group, groupIndex) => (
                                    <React.Fragment key={groupIndex}>
                                      {group.map((skill, i) => {
                                        // Calculate the skill number (groupIndex+1).(i+1)
                                        const skillNumber = `${
                                          groupIndex + 1
                                        }.${i + 1}`;

                                        return (
                                          <Link
                                            href={skill.url || "#"}
                                            legacyBehavior
                                            key={`${groupIndex}-${i}`}
                                          >
                                            <a
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{
                                                animationDelay: `${i * 0.1}s`,
                                              }}
                                              className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                            >
                                              {skill?.title}
                                            </a>
                                          </Link>
                                        );
                                      })}
                                    </React.Fragment>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  {/* Hero Section For Desktop  */}
                  <div className="mainContainer hidden xl:block print:hidden">
                    <div className="text-center mt-[3rem]">
                      <p className="text-heading text-[3.66rem] font-normal leading-normal mb-[1rem]">
                        Hello! I’m
                      </p>
                      <h1 className="font-bold md:text-[8rem] lg:text-[12rem] text-primary mt-[-3.5rem]">
                        {listOfdata?.name}
                      </h1>
                      {/* Badge */}
                      <div className="relative z-[50] mt-[1rem] flex items-center justify-start">
                        <div className="inline-block px-[2rem] py-[1.5rem] lg:py-[1rem] lg:px-[4rem] bg-primary lg:max-w-[45rem] rounded-[5rem] text-center text-[1.6rem] lg:text-[2.4rem] font-bold text-white border-none outline-none mb-[2rem]">
                          {listOfdata?.designation
                            ?.split("|")
                            .map((item, index) => (
                              <div key={index} className="text-center">
                                {item.trim()}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="mt-[-12rem] flex justify-center relative">
                        {/* Center Dev Image */}
                        <Image
                          width={731}
                          height={707}
                          alt=""
                          src={listOfdata?.profile_photo_2}
                          className="mr-[12rem]"
                        />

                        {/* Left Pricing and Hours Badge Positoned */}
                        <div className="absolute left-0 top-[24rem] w-[33.5rem] h-[18rem] inline-flex items-center justify-center bg-Circle bg-no-repeat bg-contain animate-bounce">
                          {/* Prev Code For Pricing */}
                          {/* <div className="h-[100px] p-5 rounded  justify-center items-center gap-5 inline-flex ">
                            <div className="text-primary">
                              <h3 className="text-[4rem] font-medium leading-[4rem]">
                                ${listOfdata?.hourly_rate}
                              </h3>
                              <p className="text-[2rem] font-normal">hour</p>
                            </div>
                            <hr className="h-[6rem] w-[0.1rem] bg-border" />
                            <div className="text-primary">
                              <h3 className="text-[4rem] font-medium leading-[4rem]">
                                40hr
                              </h3>
                              <p className="text-[2rem] font-normal">week</p>
                            </div>
                          </div> */}

                          {/* New Code For Pricing */}
                          <div className="h-[100px] p-5 rounded flex justify-center items-center gap-5">
                            {/* Hourly rate */}
                            <div className="text-primary text-center">
                              <h3 className="text-[4rem] font-medium leading-[4rem]">
                                ${listOfdata?.hourly_rate}
                              </h3>
                              <p className="text-[4rem] font-normal">hour</p>
                            </div>

                            <hr className="h-[6rem] w-[0.1rem] bg-border" />

                            {/* Number of hours */}
                            <div className="text-primary text-center">
                              <h3 className="text-[4rem] font-medium leading-[4rem]">
                                40hr
                              </h3>
                              <p className="text-[4rem] font-normal">week</p>
                            </div>
                          </div>
                        </div>
                        {/* Positioned Skills and Text Desktop */}
                        <div className="max-w-[55rem] w-full absolute right-[-4rem] top-[7rem]">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: listOfdata?.tag_line,
                            }}
                            className="w-full text-primary text-[2.2rem] font-medium leading-[3rem] mb-[2rem] text-left"
                          ></p>

                          {listOfdata &&
                            listOfdata.skills_ids &&
                            listOfdata.skills_ids.length > 0 && (
                              <div className="z-[50] absolute max-w-[49rem] w-full rounded-[0.6rem] border border-border border-solid overflow-hidden">
                                <div className="flex justify-between bg-primary border-b border-border w-full py-[1rem] px-[2rem]">
                                  <div className="text-left text-white text-[1.8rem] font-medium">
                                    My Skills
                                  </div>
                                  {isOverflowing && (
                                    <button
                                      onClick={() =>
                                        scrollToSection("skills_ids")
                                      }
                                      className="py-[3px] px-[1.6rem] text-center text-primary text-[1rem] font-medium bg-white rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn"
                                    >
                                      See More Skills
                                    </button>
                                  )}
                                </div>

                                <div
                                  ref={skillsContainerRef}
                                  className="w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap overflow-y-auto hide-scrollbar"
                                  style={{ maxHeight: "46.3rem" }}
                                >
                                  {Object?.values(skills)?.map(
                                    (group, groupIndex) => (
                                      <React.Fragment key={groupIndex}>
                                        {group.map((skill, i) => {
                                          // Calculate the skill number (groupIndex+1).(i+1)
                                          const skillNumber = `${
                                            groupIndex + 1
                                          }.${i + 1}`;

                                          return (
                                            <Link
                                              href={skill.url || "#"}
                                              legacyBehavior
                                              key={`${groupIndex}-${i}`}
                                            >
                                              <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                  animationDelay: `${i * 0.1}s`,
                                                }}
                                                className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                              >
                                                {/* <span className=" bg-primary text-white group-hover:bg-white group-hover:text-primary text-[0.8rem] pt-[1.5px] font-bold rounded-full size-[21px] flex items-center justify-center">
      {skillNumber}
    </span> */}
                                                {skill?.title}
                                              </a>
                                            </Link>
                                          );
                                        })}
                                      </React.Fragment>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Hero Section For Print section  */}
                  <div className="!px-0 w-full !m-0 hidden print:block">
                    <div className="text-center mx-[3rem] mt-[3rem]">
                      <p className="text-heading text-[4rem] font-normal leading-normal mb-[1rem]">
                        Hello! I’m
                      </p>
                      <h1 className="font-bold text-[11rem] text-primary mt-[-3.5rem]">
                        {listOfdata?.name}
                      </h1>
                      {/* Badge */}
                      <div className="relative z-[50] mt-[1rem] flex items-center justify-start">
                        <div className="inline-block px-[2rem] py-[1.5rem] lg:py-[1rem] lg:px-[4rem] bg-primary lg:max-w-[45rem] rounded-[5rem] text-center text-[1.6rem] lg:text-[2.4rem] font-bold text-white border-none outline-none mb-[2rem]">
                          {listOfdata?.designation
                            ?.split("|")
                            .map((item, index) => (
                              <div key={index} className="text-center">
                                {item.trim()}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="mt-[-4rem] flex justify-center relative">
                        {/* Center Dev Image */}
                        <Image
                          width={731}
                          height={707}
                          alt=""
                          src={listOfdata?.profile_photo_2}
                          className="mr-[12rem] w-[706px] h-[707px]"
                        />

                        {/* Left Pricing and Hours Badge Positoned */}
                        <div className="absolute left-0 top-[24rem] w-[33.5rem] h-[18rem] inline-flex items-center justify-center bg-Circle bg-no-repeat bg-contain animate-bounce">
                          <div className="h-[100px] p-5 rounded  justify-center items-center gap-5 inline-flex">
                            <div className="text-primary">
                              <h3 className="text-[4rem] font-medium leading-[4rem]">
                                ${listOfdata?.hourly_rate}
                              </h3>
                              <p className="text-[2rem] font-normal">hour</p>
                            </div>
                            <hr className="h-[6rem] w-[0.1rem] bg-border" />
                            <div className="text-primary">
                              <h3 className="text-[4rem] font-medium leading-[4rem]">
                                40hr
                              </h3>
                              <p className="text-[2rem] font-normal">week</p>
                            </div>
                          </div>
                        </div>
                        {/* Positioned Skills and Text Desktop */}
                        <div className="max-w-[55rem] w-full absolute right-[-4rem] top-[7rem]">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: listOfdata?.tag_line,
                            }}
                            className="w-full text-primary text-[2.2rem] font-medium leading-[3rem] mb-[2rem] text-left"
                          ></p>

                          {listOfdata &&
                            listOfdata.skills_ids &&
                            listOfdata.skills_ids.length > 0 && (
                              <div className="z-[50] absolute max-w-[49rem] w-full rounded-[0.6rem] border border-border border-solid overflow-hidden">
                                <div className="flex justify-between bg-primary border-b border-border w-full py-[1rem] px-[2rem]">
                                  <div className="text-left text-white text-[1.8rem] font-medium">
                                    My Skills
                                  </div>
                                </div>

                                <div
                                  ref={skillsContainerRef}
                                  className="w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap "
                                  style={{ maxHeight: "45.3rem" }}
                                >
                                  {Object?.values(skills)?.map(
                                    (group, groupIndex) => (
                                      <React.Fragment key={groupIndex}>
                                        {group.map((skill, i) => {
                                          // Calculate the skill number (groupIndex+1).(i+1)
                                          const skillNumber = `${
                                            groupIndex + 1
                                          }.${i + 1}`;

                                          return (
                                            <Link
                                              href={skill.url || "#"}
                                              legacyBehavior
                                              key={`${groupIndex}-${i}`}
                                            >
                                              <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                  animationDelay: `${i * 0.1}s`,
                                                }}
                                                className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                              >
                                                {skill?.title}
                                              </a>
                                            </Link>
                                          );
                                        })}
                                      </React.Fragment>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Shape Divider */}
                  <div className="custom-shape-divider-bottom-1722849639 z-[10]">
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"
                      />
                    </svg>
                  </div>
                </div>

                {/* About Section for desktop*/}
                <section
                  id="about"
                  className="w-full flex items-center justify-center mb-[5rem] print:hidden"
                >
                  {/* Container Div for desktop*/}
                  <div className="mainContainer flex flex-col-reverse gap-[5rem]   xl:gap-0 xl:flex-row items-center justify-center xl:justify-between">
                    {/* Container For Image and Badges */}
                    <div className="w-full h-full xl:w-[67rem] xl:h-[64rem] flex-shrink-0 max-xl:flex  justify-center">
                      <div
                        className="relative h-[44rem] xl:h-[65rem] max-w-[56rem] bg-center bg-cover bg-no-repeat w-full rounded-[1rem]"
                        style={{
                          backgroundImage: `url('${listOfdata?.profile_photo_3}')`,
                        }}
                      >
                        {/* Experience Badge */}
                        <div className="bg-white rounded-[0.8rem] absolute   bottom-auto left-auto top-[-3rem] right-[3rem] xl:top-[7rem] xl:right-[-8rem] p-[1.4rem] xl:h-[12rem] xl:w-[26rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce">
                          {/* Badge SVG */}
                          <div className="bg-[#2A97FC] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                            <img
                              src="./images/experience.svg"
                              alt="Experience"
                              className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                            />
                          </div>
                          {/* Badge Content */}
                          <div className="flex flex-col justify-center">
                            <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                              Experience
                            </h3>
                            <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                              {listOfdata?.no_of_experiences}+{" "}
                              <span className="text-[2rem]">
                                {listOfdata?.no_of_experiences === 1
                                  ? "year"
                                  : "years"}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Projects Badge */}
                        <div className="bg-white  mb-3 rounded-[0.8rem] absolute   top-auto right-auto bottom-[-4rem]   xl:bottom-[3rem] xl:left-[3rem] left-[3rem] p-[1.4rem] xl:h-[12rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce xl:animate-none">
                          {/* Badge SVG */}
                          <div className="bg-[#FC822A] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                            <img
                              src="./images/badge.svg"
                              alt="Experience"
                              className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                            />
                          </div>
                          {/* Badge Content */}
                          <div className="flex flex-col justify-center">
                            <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                              Projects Completed
                            </h3>
                            <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                              {listOfdata?.projects_completed}+
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Contact Details */}
                    <div className="w-full">
                      {/* About Context */}
                      <div className="w-full">
                        {/* Badge */}
                        <div
                          className="px-[2rem] mt-[3rem] py-[1rem] bg-white 
                        rounded-[2.2rem] border border-border border-solid text-center
                        max-w-max text-heading text-[2rem] font-medium font-Inter leading-[2rem]"
                        >
                          About Me
                        </div>
                        {/* Heading */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: listOfdata?.tag_line,
                          }}
                          className="text-heading text-[2.4rem] mt-[2rem] mb-[1.2rem] font-medium leading-[2.8rem] lg:text-[3rem] lg:leading-[3.8rem]"
                        ></div>
                        {/* Paragraph */}
                        {listOfdata?.designation && (
                          <p className="text-[1.6rem] font-normal text-paragraph1  leading-[2.4rem]">
                            Currently Open for full time position as a{" "}
                            <span className="lowercase">
                              {listOfdata?.designation}
                            </span>
                            .
                          </p>
                        )}
                      </div>
                      {/* Info Cards */}
                      <div className="my-[2rem] rounded-[0.8rem] overflow-hidden  w-full grid grid-cols-12">
                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${
                            urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                          }`}
                        >
                          <div className="w-full">
                            <h4 className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary">
                              {listOfdata?.name}
                            </h4>
                            <p className="text-[1.4rem] font-normal text-paragraph1">
                              Name
                            </p>
                          </div>
                        </div>
                        {!urlInfo?.u && (
                          <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                            <div className="w-full text-wrap break-words">
                              <Link
                                href={`mailto:${listOfdata?.email}`}
                                className="hover:font-bold  text-[1.6rem] duration-300  font-normal text-primary "
                              >
                                {listOfdata?.email}
                              </Link>
                              <p className="text-[1.4rem] font-normal text-paragraph1">
                                Email
                              </p>
                            </div>
                          </div>
                        )}

                        {!urlInfo?.u && (
                          <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                            <div className="w-full">
                              <Link
                                href={`tel:${listOfdata?.phone_no}`}
                                className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary"
                              >
                                {formatPhoneNumber(listOfdata?.phone_no)}
                              </Link>
                              <p className="text-[1.4rem] font-normal text-paragraph1">
                                Contact
                              </p>
                            </div>
                          </div>
                        )}

                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                            urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                          }`}
                        >
                          <div className="w-full flex justify-between">
                            <div>
                              <Link
                                target="_blank"
                                href={`https://www.google.com/maps/place/${listOfdata?.location}
                )}`}
                                className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary"
                              >
                                {listOfdata?.location}
                              </Link>
                              <p className="text-[1.4rem] font-normal text-paragraph1">
                                Address
                              </p>{" "}
                            </div>
                            {listOfdata?.location?.includes(
                              "Manchester, UK"
                            ) && (
                              <Image
                                src={"/images/ukFlag.svg"}
                                height={35}
                                width={35}
                                className="h-[3rem] w-[3rem] rounded-full object-cover"
                                alt="Uk Flag"
                              />
                            )}
                          </div>
                        </div>

                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                            urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                          }`}
                        >
                          <div className="w-full flex items-center gap-[1.4rem] mb-[0.8rem]">
                            <WorkProofLinks
                              props={{
                                upwork: listOfdata?.upwork,
                                github: listOfdata?.github,
                                linkedIn: listOfdata?.linkedIn,
                                behance_link: listOfdata?.behance_link,
                                u: urlInfo?.u,
                              }}
                            />
                          </div>
                          <p className="text-[1.35rem] font-normal text-paragraph1">
                            My Work Proof
                          </p>
                        </div>
                        {!urlInfo?.u && (
                          <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                            <div className="w-full flex items-center  gap-[1.4rem] mb-[0.8rem]">
                              <ContactMeLinks
                                props={{
                                  email: listOfdata?.email,
                                  phone_no: listOfdata?.phone_no,
                                }}
                              />
                            </div>
                            <p className="text-[1.35rem] font-normal text-paragraph1">
                              Contact Me
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Button Line */}
                      <div className="md:space-x-5 py-[2rem]">
                        <Link href={"/cv"}>
                          <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                            {" "}
                            View CV Online
                          </button>
                        </Link>

                        {listOfdata?.is_pdf_generated &&
                          listOfdata?.pdf_download_links?.length > 0 &&
                          listOfdata.pdf_download_links
                            .filter((link) => link.type === "CV")
                            .map((cvLink, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  downloadFile(
                                    cvLink.cvFileUrl,
                                    `${listOfdata?.name} - CV`
                                  )
                                }
                                className="w-full md:max-w-max mt-5 md:mt-0 btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom"
                              >
                                Download CV
                              </button>
                            ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* About Section for print*/}
                <section className="w-full print:flex h-screen hidden items-center justify-center print:break-before-page pt-[56px] px-[4rem]">
                  {/* Container Div for print*/}
                  <div className="  w-full  px-0  gap-[2rem] flex flex-row items-center justify-center">
                    {/* Container For Image and Badges */}
                    <div className="w-full max-w-[50%] flex items-center justify-center">
                      <div
                        className="relative h-[65rem] bg-center bg-cover bg-no-repeat w-full rounded-[1rem]"
                        style={{
                          backgroundImage: `url('${listOfdata?.profile_photo_3}')`,
                        }}
                      >
                        {/* Experience Badge */}
                        <div className="bg-white rounded-[0.8rem] absolute   bottom-auto left-auto top-[-3rem] right-[3rem] xl:top-[7rem] xl:right-[-8rem] p-[1.4rem] xl:h-[12rem] xl:w-[26rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce">
                          {/* Badge SVG */}
                          <div className="bg-[#2A97FC] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                            <img
                              src="./images/experience.svg"
                              alt="Experience"
                              className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                            />
                          </div>
                          {/* Badge Content */}
                          <div className="flex flex-col justify-center">
                            <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                              Experience
                            </h3>
                            <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                              {listOfdata?.no_of_experiences}+{" "}
                              <span className="text-[2rem]">
                                {listOfdata?.no_of_experiences === 1
                                  ? "year"
                                  : "years"}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Projects Badge */}
                        <div className="bg-white  mb-3 rounded-[0.8rem] absolute   top-auto right-auto bottom-[-4rem]   xl:bottom-[3rem] xl:left-[3rem] left-[3rem] p-[1.4rem] xl:h-[12rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce xl:animate-none">
                          {/* Badge SVG */}
                          <div className="bg-[#FC822A] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                            <img
                              src="./images/badge.svg"
                              alt="Experience"
                              className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                            />
                          </div>
                          {/* Badge Content */}
                          <div className="flex flex-col justify-center">
                            <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                              Projects Completed
                            </h3>
                            <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                              {listOfdata?.projects_completed}+
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Contact Details */}
                    <div className="w-full max-w-[50%]">
                      {/* About Context */}
                      <div className="w-full">
                        {/* Badge */}
                        <div className="px-[6rem] mt-[3rem] py-[1.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[3rem] font-medium  font-Inter leading-[2rem] ">
                          About Me
                        </div>
                        {/* Heading */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: listOfdata?.tag_line,
                          }}
                          className="text-heading text-[2.4rem] mt-[2rem] mb-[1.2rem] font-medium leading-[2.8rem] lg:text-[3rem] lg:leading-[3.8rem]"
                        ></div>
                        {/* Paragraph */}
                        {listOfdata?.designation && (
                          <p className="text-[1.6rem] font-normal text-paragraph1  leading-[2.4rem]">
                            Currently Open for full time position as a{" "}
                            <span className="lowercase">
                              {listOfdata?.designation}
                            </span>
                            .
                          </p>
                        )}
                      </div>
                      {/* Info Cards */}
                      <div className="my-[2rem] rounded-[0.8rem] overflow-hidden  w-full grid grid-cols-12">
                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${
                            urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                          }`}
                        >
                          <div className="w-full">
                            <h4 className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary">
                              {listOfdata?.name}
                            </h4>
                            <p className="text-[1.4rem] font-normal text-paragraph1">
                              Name
                            </p>
                          </div>
                        </div>
                        {!urlInfo?.u && (
                          <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                            <div className="w-full text-wrap break-words">
                              <Link
                                href={`mailto:${listOfdata?.email}`}
                                className="hover:font-bold  text-[1.6rem] duration-300  font-normal text-primary "
                              >
                                {listOfdata?.email}
                              </Link>
                              <p className="text-[1.4rem] font-normal text-paragraph1">
                                Email
                              </p>
                            </div>
                          </div>
                        )}

                        {!urlInfo?.u && (
                          <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                            <div className="w-full">
                              <Link
                                href={`tel:${listOfdata?.phone_no}`}
                                className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary"
                              >
                                {formatPhoneNumber(listOfdata?.phone_no)}
                              </Link>
                              <p className="text-[1.4rem] font-normal text-paragraph1">
                                Contact
                              </p>
                            </div>
                          </div>
                        )}

                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                            urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                          }`}
                        >
                          <div className="w-full flex justify-between">
                            <div>
                              <Link
                                target="_blank"
                                href={`https://www.google.com/maps/place/${listOfdata?.location}
                )}`}
                                className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary"
                              >
                                {listOfdata?.location}
                              </Link>
                              <p className="text-[1.4rem] font-normal text-paragraph1">
                                Address
                              </p>{" "}
                            </div>
                            {listOfdata?.location?.includes(
                              "Manchester, UK"
                            ) && (
                              <Image
                                src={"/images/ukFlag.svg"}
                                height={35}
                                width={35}
                                className="h-[3rem] w-[3rem] rounded-full object-cover"
                                alt="Uk Flag"
                              />
                            )}
                          </div>
                        </div>

                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                            urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                          }`}
                        >
                          <div className="w-full flex items-center gap-[1.4rem] mb-[0.8rem]">
                            <WorkProofLinks
                              props={{
                                upwork: listOfdata?.upwork,
                                github: listOfdata?.github,
                                linkedIn: listOfdata?.linkedIn,
                                behance_link: listOfdata?.behance_link,
                                u: urlInfo?.u,
                              }}
                            />
                          </div>
                          <p className="text-[1.35rem] font-normal text-paragraph1">
                            My Work Proof
                          </p>
                        </div>
                        {!urlInfo?.u && (
                          <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                            <div className="w-full flex items-center  gap-[1.4rem] mb-[0.8rem]">
                              <ContactMeLinks
                                props={{
                                  email: listOfdata?.email,
                                  phone_no: listOfdata?.phone_no,
                                }}
                              />
                            </div>
                            <p className="text-[1.35rem] font-normal text-paragraph1">
                              Contact Me
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Button Line */}
                      <div className="md:space-x-5 py-[2rem] ">
                        <Link href={"/cv"}>
                          <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                            {" "}
                            View CV Online
                          </button>
                        </Link>

                        {listOfdata?.is_pdf_generated &&
                          listOfdata?.pdf_download_links?.length > 0 &&
                          listOfdata.pdf_download_links
                            .filter((link) => link.type === "CV")
                            .map((cvLink, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  downloadFile(
                                    cvLink.cvFileUrl,
                                    `${listOfdata?.name} - CV`
                                  )
                                }
                                className="w-full md:max-w-max mt-5 md:mt-0 btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom"
                              >
                                Download CV
                              </button>
                            ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Custom Video Player Section */}
                {listOfdata?.video_attached?.videoURL && (
                  <div className="w-full mb-[10rem] xl:mb-[12rem] mainContainer print:hidden ">
                    <video
                      autoPlay
                      muted
                      loop
                      controls
                      className="rounded-xl h-[40rem] lg:h-[70rem] w-full object-cover"
                    >
                      <source
                        src={listOfdata?.video_attached?.videoURL}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                  <>
                    {/* Skills Section Completed */}
                    <div
                      id="skillSection"
                      className="mainContainer print:!pt-[4rem] print:my-[0rem] my-[5rem]  print:h-screen print:break-before-page break-before-avoid print:bg-[#a3ddd3]"
                    >
                      {/* Badge */}
                      <div
                        id="skills_ids"
                        className="px-[2rem] mt-[3rem] py-[1rem] bg-white 
                        rounded-[2.2rem] border border-border border-solid text-center
                        max-w-max text-heading text-[2rem] font-medium font-Inter leading-[2rem] mx-auto  section_top_button"
                      >
                        Skills
                      </div>
                      {/* Heading */}
                      <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] print:text-[3rem] print:mb-[1.5rem] font-medium leading-[2.8rem] mt-[2rem]">
                        {listOfdata?.companytype == "leewop"
                          ? "The skills & tools I am really good at:"
                          : " The skills, tools and technologies I am really good at:"}
                      </div>
                      {/* Skills Container */}

                      <SkillsContainer list={listOfdata?.skills_ids} />
                    </div>{" "}
                  </>
                )}

                {/* Services Section Completed */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <section className="w-full bg-sectionBG my-[5rem] print:m-0  print:break-before-page print:h-screen ">
                      <div className="mainContainer py-[5rem] xl:py-[10rem]">
                        {/* Badge */}
                        <div
                          className="px-[2rem] py-[1rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading 
                        text-[2rem] font-medium font-Inter leading-tight mx-auto  section_top_button "
                        >
                          My Services
                        </div>
                        {/* Heading */}
                        <div className="text-center text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                          I am not limited with this only services. Together we
                          can do more
                        </div>
                        {/* Services Cards */}
                        <MyServices
                          services={listOfdata?.services?.filter(
                            (service) => service?.type !== "main"
                          )}
                        />
                      </div>
                    </section>
                  )}

                {listOfdata &&
                  listOfdata.portfolios_ids &&
                  listOfdata.portfolios_ids.length > 0 && (
                    <>
                      {/* My Work Section Slider  */}
                      <section
                        id="myWork"
                        className="w-full mt-[8rem] mb-[7rem] print_p_m print:!pt-[3rem] print:bg-[#a3ddd3] print:break-before-page print:h-screen "
                      >
                        <div className="mainContainer   my-[5rem] print:my-[1rem] ">
                          {/* Badge */}
                          <div className="px-[2rem] py-[1rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[2rem] font-medium font-Inter leading-tight mx-auto  section_top_button ">
                            My Work
                          </div>
                          {/* Heading */}
                          <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                            Explore My Technical Endeavors
                          </div>

                          {/* Home Page Slider */}
                          <HomeSlider
                            portfolios={listOfdata?.portfolios_ids}
                            companyType={listOfdata?.companytype}
                          />
                        </div>
                      </section>
                    </>
                  )}

                {listOfdata &&
                  listOfdata.experiences_ids &&
                  listOfdata.experiences_ids.length > 0 && (
                    <>
                      {/* Professional Experience Timeline Section Completed */}
                      <section
                        id="workExperiences"
                        className="w-full   print_p_m print:h-screen print:break-before-page print:bg-[#a3ddd3]  "
                      >
                        <div className="mainContainer   print:shadow-none print:!pt-[3rem] ">
                          {/* Badge */}
                          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto  section_top_button ">
                            Professional Experience
                          </div>
                          {/* Heading */}
                          <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                            My Professional Career Journey
                          </div>
                          {/* Timeline */}
                          <div className="mainContainer flex items-center justify-center mt-[2rem] print:m-0 ">
                            <div className="relative print:flex flex-col gap-4">
                              {/* Vertical line */}
                              <div className="absolute print_hidden left-[10rem] top-[3rem] w-[0.4rem] h-[calc(100%-78px)] bg-border  mx-[2.1rem] hidden xl:block" />
                              {listOfdata?.experiences_ids &&
                                [...listOfdata.experiences_ids]
                                  ?.sort((a, b) => {
                                    const yearA = new Date(
                                      a.ending_Date
                                    ).getFullYear();
                                    const yearB = new Date(
                                      b.ending_Date
                                    ).getFullYear();

                                    if (yearA !== yearB) {
                                      return yearB - yearA;
                                    }

                                    const monthA = new Date(
                                      a.ending_Date
                                    ).getMonth();
                                    const monthB = new Date(
                                      b.ending_Date
                                    ).getMonth();

                                    return monthB - monthA;
                                  })
                                  ?.slice(
                                    0,
                                    showAllExperiences
                                      ? listOfdata.experiences_ids.length
                                      : 3
                                  )
                                  ?.map((experience, index) => {
                                    const skillsforExpereince: {
                                      [key: string]: {
                                        title: string;
                                        url?: string;
                                        order?: string;
                                        icon?: string;
                                      }[];
                                    } = skillsGrouping(
                                      showMoreSkills[index]
                                        ? experience?.skills
                                        : experience?.skills?.slice(0, 15)
                                    );
                                    return (
                                      <>
                                        {/* Timeline items Container */}
                                        <div className="space-y-[1rem]  xl:space-y-[3rem] xl:space-x-[9rem] mt-10 print_p_m">
                                          {/* Date and divider */}
                                          <div className="ml-[0.5rem]  xl:mb-auto xl:ml-auto xl:absolute left-[-7.6rem] z-10 text-[1.8rem] text-paragraph1 capitalize">
                                            {formatDate(
                                              experience.starting_date,
                                              dateFormatsOptions.shortMonthYear
                                            )}{" "}
                                            -{" "}
                                            {isNaN(
                                              new Date(
                                                experience.ending_Date
                                              ).getFullYear()
                                            )
                                              ? experience.ending_Date
                                              : formatDate(
                                                  experience.ending_Date,
                                                  dateFormatsOptions.shortMonthYear
                                                )}
                                          </div>
                                          {/* Timeline item */}
                                          <>
                                            <div className="relative  flex items-start">
                                              {/* Dot */}
                                              <div className="absolute print_hidden top-0 left-[2rem] hidden xl:block">
                                                <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                                  <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                                                </div>
                                              </div>
                                              {/* Card */}
                                              <div className="bg-white  p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow xl:ml-[6rem] w-full">
                                                <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                                                  {/* About Content */}
                                                  <div className="flex gap-[1rem]">
                                                    {experience?.thumbnail && (
                                                      <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                                                        <Image
                                                          src={
                                                            experience?.thumbnail
                                                          }
                                                          height={32}
                                                          width={32}
                                                          alt="Logo Mark"
                                                        />
                                                      </div>
                                                    )}
                                                    <div>
                                                      <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                                                        {
                                                          experience?.company_name
                                                        }
                                                      </p>
                                                      <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                                                        {experience?.title}
                                                      </h3>
                                                    </div>
                                                  </div>

                                                  {/* Link */}

                                                  <div className="flex justify-center md:justify-end w-full md:w-auto">
                                                    <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                                                      <div className=" py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white ">
                                                        <Link
                                                          href={
                                                            experience?.company_website ||
                                                            "#"
                                                          }
                                                          className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold"
                                                        >
                                                          <Image
                                                            src={
                                                              "/images/link.svg"
                                                            }
                                                            height={18}
                                                            width={18}
                                                            alt="Link"
                                                          />{" "}
                                                          {
                                                            experience.company_website
                                                              .replace(
                                                                /^(https?:\/\/)?(www\.)?/,
                                                                ""
                                                              )
                                                              .split("/")[0]
                                                          }{" "}
                                                        </Link>
                                                      </div>
                                                      {experience.company_website.includes(
                                                        "upwork"
                                                      ) && (
                                                        <Link
                                                          href={
                                                            experience.company_website
                                                          }
                                                          className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                                        >
                                                          View my upwork
                                                          Freelance Profile
                                                        </Link>
                                                      )}{" "}
                                                    </div>
                                                  </div>
                                                </div>

                                                <p
                                                  className="mt-[2rem] list-div text-[1.6rem] font-medium text-paragraph1"
                                                  dangerouslySetInnerHTML={{
                                                    __html: modifiedContent(
                                                      experience?.short_description,
                                                      listOfskills,
                                                      listOfdata
                                                    ),
                                                  }}
                                                ></p>

                                                {experience?.skills &&
                                                  experience?.skills.length >
                                                    0 && (
                                                    <div className="w-full">
                                                      <h4 className=" text-[1.5rem] text-primary font-medium my-[1.6rem] ">
                                                        AREAS OF EXPERTISE I'VE
                                                        WORKED IN
                                                      </h4>
                                                      <div className="w-full flex-col items-start flex gap-5">
                                                        <div className="flex print:hidden items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                                                          {Object?.values(
                                                            skillsforExpereince
                                                          )?.map(
                                                            (
                                                              group,
                                                              groupIndex
                                                            ) => (
                                                              <React.Fragment
                                                                key={groupIndex}
                                                              >
                                                                {group.map(
                                                                  (
                                                                    skill,
                                                                    i
                                                                  ) => {
                                                                    // Calculate the skill number (groupIndex+1).(i+1)
                                                                    const skillNumber = `${
                                                                      groupIndex +
                                                                      1
                                                                    }.${i + 1}`;

                                                                    return (
                                                                      <Link
                                                                        href={
                                                                          skill.url ||
                                                                          "#"
                                                                        }
                                                                        legacyBehavior
                                                                        key={`${groupIndex}-${i}`}
                                                                      >
                                                                        <a
                                                                          target="_blank"
                                                                          rel="noopener noreferrer"
                                                                          style={{
                                                                            animationDelay: `${
                                                                              i *
                                                                              0.1
                                                                            }s`,
                                                                          }}
                                                                          className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                                                        >
                                                                          {
                                                                            skill?.title
                                                                          }
                                                                        </a>
                                                                      </Link>
                                                                    );
                                                                  }
                                                                )}
                                                              </React.Fragment>
                                                            )
                                                          )}
                                                        </div>

                                                        <div className="hidden print:flex print:flex-wrap print:gap-[0.5rem]">
                                                          {Object.values(
                                                            skillsforExpereince
                                                          )
                                                            .flat()
                                                            .slice(0, 7)
                                                            .map((skill, i) => (
                                                              <span
                                                                key={`print-skill-${i}`}
                                                                className="capitalize text-primary text-[1.1rem] font-medium py-[0.2rem] px-[1.2rem] bg-white rounded-[5rem] border border-[#757575] print:border-gray-300 print:shadow-none"
                                                              >
                                                                {skill?.title}
                                                              </span>
                                                            ))}
                                                        </div>

                                                        <ShowmoreSkills
                                                          props={{
                                                            list: experience?.skills,
                                                            index,
                                                            setShowMoreSkills,
                                                            showMoreSkills,
                                                          }}
                                                        />
                                                      </div>
                                                    </div>
                                                  )}
                                              </div>
                                            </div>
                                          </>
                                        </div>{" "}
                                      </>
                                    );
                                  })}{" "}
                              {listOfdata.experiences_ids.length > 3 && (
                                <div className="flex justify-center mt-8 print_hidden">
                                  <button
                                    onClick={() =>
                                      setShowAllExperiences(!showAllExperiences)
                                    }
                                    className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium"
                                    // className="bg-primary  text-white py-[0.4rem] px-[2rem] border border-primary border-solid hover:text-primary hover:bg-white rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                  >
                                    {showAllExperiences
                                      ? "Show Less"
                                      : "View Full Career Timeline"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                {/* FAQ Section Completed */}
                <Faqs urlInfo={urlInfo} companyType={listOfdata?.companytype} />
                {/* Our Blogs */}
                <div id="ourBlogs" className="my-[5rem] print:bg-[#a3ddd3]">
                  <OurBlogs domain={listOfdata?.domain} />
                </div>

                {/* Newsletter */}
                {!urlInfo?.u && (
                  <div className="w-full mb-[5rem]">
                    <Newsletter listOfdata={listOfdata} />
                  </div>
                )}
              </>
            ),
          }}
        />
      </main>
    </>
  );
};

export default Home;
