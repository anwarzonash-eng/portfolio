"use client";
import Image from "next/image";
import "@/styles/printStyles/home_p.css";
import NoteClickable from "@/components/NoteClickable";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import Faqs from "@/components/Faqs";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import MyServices from "@/components/MyServicesCards";
import FreeTrialPopup from "@/components/FreeTrialPopup";
import React, { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import Link from "next/link";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import { dateFormatsOptions } from "@/data/JsonData";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import OurBlogs from "@/components/OurBlogs";
import PageRendering from "@/components/PageRendering";
import { scrollToSection } from "@/hooks/scrollToSection";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useMediaQuery } from "react-responsive";
import SkillsContainerPrint from "@/components/SkillsContainerPrint";
import HomeSliderPrint from "@/components/Sliders/HomeSliderPrint";
import NoteDomainForPint from "../../../NoteDomainForPint";
import OurBlogsLandscape from "@/components/OurBlogsLandscape";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DesignationDomain from "@/components/DesignationDomain";
import ShowmoreSkills from "@/components/showmoreSkills";
import ContactMe from "@/components/ContactMe";
import EducationBlogsLandscape from "@/components/EducationBlogsLandscape";
import ContactMePrint from "@/components/ContactMePrint";

const Home_p = ({ params }: { params: any }) => {
  useBodyBackgroundColor("#f8f9fa");
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const skillsContainerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "home",
        urlInfo,
        setError,
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

  console.log("Data", listOfdata);

  return (
    <>
      <main className="w-full bg-[#EFF5FD]">
        <PageRendering
          props={{
            list: listOfdata,
            loading: loading,
            error,
            actualPage: (
              <>
                <FreeTrialPopup listOfdata={listOfdata} urlInfo={urlInfo} />
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

                {/* Hero Section ✅ */}
                <div className="print:h-screen print:section bg-bannerBG !w-full overflow-hidden relative">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  {/* Hero Section  */}
                  <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                    <div className="text-center mt-[3rem] print:mt-0 print:pt-[3rem]">
                      <p className="text-heading text-[3.66rem] font-normal leading-normal mb-[1rem]">
                        Hello! I’m
                      </p>
                      <h1 className="font-bold md:text-[8rem] lg:text-[12rem] text-primary mt-[-3.5rem]">
                        {listOfdata?.name}
                      </h1>
                      {/* Badge */}
                      <div className="relative z-[50] mt-[1rem] flex flex-col items-start">
                        <div
                          className="inline-block py-[1rem] px-[4rem] bg-primary
                         max-w-[45rem] rounded-[5rem] text-center text-[2.4rem] font-bold text-white border-none outline-none mb-[0.5rem]"
                        >
                          {listOfdata?.designation
                            ?.split("|")
                            .map((item, index) => (
                              <div key={index} className="text-center">
                                {item.trim()}
                              </div>
                            ))}
                        </div>
                        <div className="ml-10">
                          <DesignationDomain />
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
                        <div className="max-w-[55rem] print:max-w-[42rem] w-full absolute right-[-4rem] print:right-[-2rem] top-[7rem]">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: listOfdata?.tag_line,
                            }}
                            className="w-full text-primary text-[2.2rem] print:text-[1.8rem] font-medium leading-[3rem] mb-[2rem] text-left"
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
                                  {Object.values(skills)
                                    .flat()
                                    .slice(0, 15)
                                    .map((skill, i) => {
                                      return (
                                        <Link
                                          href={skill.url || "#"}
                                          legacyBehavior
                                          key={i}
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

                {/* About Section for print ✅ */}
                <section className="h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] mt-20 print:mt-0 relative">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  {/* Container Div for print*/}
                  <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center gap-[2rem]">
                    {/* Container For Image and Badges */}
                    <div className="w-full max-w-[50%] flex items-center justify-center">
                      <div
                        className="relative h-[65rem] bg-top bg-cover bg-no-repeat w-full rounded-[1rem]"
                        style={{
                          backgroundImage: `url('${listOfdata?.profile_photo_3}')`,
                        }}
                      >
                        {/* Experience Badge */}
                        <div className="bg-white rounded-[0.8rem] absolute bottom-auto left-auto top-[-3rem] right-[3rem] p-[1.4rem] flex items-center shadow-md gap-[1rem]  animate-bounce">
                          {/* Badge SVG */}
                          <div className="bg-[#2A97FC] rounded-[50%] h-[6.8rem] w-[6.8rem] relative">
                            <img
                              src="/images/experience.svg"
                              alt="Experience"
                              className="h-[3.4rem] w-[3.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
                        <div className="bg-white mb-3 rounded-[0.8rem] absolute top-auto right-auto bottom-[-4rem] left-[3rem] p-[1.4rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] animate-bounce">
                          {/* Badge SVG */}
                          <div className="bg-[#FC822A] rounded-[50%] h-[6.8rem] w-[6.8rem] relative">
                            <img
                              src="/images/badge.svg"
                              alt="Experience"
                              className="h-[3.4rem] w-[3.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
                        <div
                          className="px-[4rem] mt-[3rem] py-[1.4rem] bg-white rounded-[100px] border border-border border-solid text-center max-w-max text-heading
                          text-[2rem] font-medium font-Inter leading-[2rem]"
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
                            <div className="w-full flex items-center gap-[1.4rem] mb-[0.8rem]">
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
                      {/* <Link href={"/?sectionId=about"}>
                        <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                          View CV Online
                        </button>
                      </Link> */}
                      <Link href={"/cv"} target="_blank">
                        <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                          View CV Online
                        </button>
                      </Link>
                    </div>
                  </div>
                </section>

                {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                  <>
                    {/* Skills Section Completed ✅ */}
                    <section className="px-[4rem] my-[5rem] print:h-screen print:section flex items-center justify-center relative">
                      {/* Note and Domain For Each Page */}
                      <NoteDomainForPint
                        direction={"hidden print:right-0 print:block"}
                      />
                      <div className="max-w-[1550px] w-full mx-auto">
                        {/* Badge */}
                        <div className="flex items-center justify-center mb-[1rem]">
                          <div className="badge">Skills</div>
                        </div>
                        {/* Heading */}
                        {/* <div
                          className="text-center text-heading text-[3rem] font-medium 
                        leading-[2.8rem] my-[3rem]"
                        >
                          {listOfdata?.companytype == "leewop"
                            ? "The skills & tools I am really good at:"
                            : " The skills, tools and technologies I am really good at:"}
                        </div> */}
                        {/* Skills Container */}
                        <SkillsContainerPrint
                          list={listOfdata?.skills_ids}
                          numColumns={6} // number of columns to display
                          numSkills={24} // number of skills to display
                          portfolioId={listOfdata?.portfolios_ids[0]?.id}
                        />
                      </div>
                    </section>
                  </>
                )}

                {/* Services Section Completed ✅ */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <section
                      className="
                      w-full bg-sectionBG my-[5rem] print:m-0
                      print:break-before-page flex items-center justify-center
                      print:h-screen print:section print:FlexWrapContainer relative"
                    >
                      {/* Note and Domain For Each Page */}
                      <div className="absolute hidden print:block top-10 px-10  print:right-0">
                        <Link
                          className="text-white font-medium text-[2rem] underline ml-2"
                          href={`https://www.${listOfdatas.domain}`}
                        >
                          {listOfdatas.domain}
                        </Link>
                      </div>
                      <div
                        className="max-w-[1550px] w-full mx-auto 
                        px-[4rem] py-[5rem] print:py-0"
                      >
                        {/* Badge */}
                        <div className="flex items-center justify-center mb-[2rem]">
                          <div className="badge">My Services</div>
                        </div>
                        {/* Heading */}
                        {/* <div className="text-center text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                          I am not limited with this only services. Together we
                          can do more
                        </div> */}
                        {/* Services Cards */}
                        <MyServices
                          services={listOfdata?.services
                            ?.filter((service) => service?.type !== "main")
                            ?.slice(0, 8)}
                        />
                      </div>
                    </section>
                  )}

                {listOfdata &&
                  listOfdata.portfolios_ids &&
                  listOfdata.portfolios_ids.length > 0 && (
                    <>
                      {/* My Work Section Slider 1 ✅ */}
                      <section className="h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
                        {/* Note and Domain For Each Page */}
                        <NoteDomainForPint
                          direction={"hidden print:right-0 print:block"}
                        />
                        <div className="max-w-[1550px] w-full mx-auto">
                          {/* Badge */}
                          <div className="flex items-center justify-center pb-[2rem]">
                            <div className="badge">My Work</div>
                          </div>

                          {/* Home Page Slider */}
                          <HomeSliderPrint
                            portfolios={listOfdata?.portfolios_ids}
                            isPortraitMode={false}
                            companyType={listOfdata?.companytype}
                            portfolioId={listOfdata?.portfolios_ids[0]?.id}
                            locationLink={`/?sectionId=myWork`}
                            from={0}
                            max={1}
                          />
                        </div>
                      </section>

                      {/* My Work Section Slider 2 ✅ */}
                      <section className="h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
                        {/* Note and Domain For Each Page */}
                        <NoteDomainForPint
                          direction={"hidden print:right-0 print:block"}
                        />
                        <div className="max-w-[1550px] w-full mx-auto">
                          {/* Home Page Slider */}
                          <HomeSliderPrint
                            portfolios={listOfdata?.portfolios_ids}
                            isPortraitMode={false}
                            companyType={listOfdata?.companytype}
                            locationLink={`/?sectionId=myWork`}
                            portfolioId={listOfdata?.portfolios_ids[0]?.id}
                            from={1}
                            max={2}
                          />
                        </div>
                      </section>

                      {/* My Work Section Slider 3 ✅ */}
                      <section className="h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative flex-col gap-[3rem]">
                        {/* Note and Domain For Each Page */}
                        <NoteDomainForPint
                          direction={"hidden print:right-0 print:block"}
                        />
                        <div className="max-w-[1550px] w-full mx-auto">
                          {/* Home Page Slider */}
                          <HomeSliderPrint
                            portfolios={listOfdata?.portfolios_ids}
                            isPortraitMode={false}
                            companyType={listOfdata?.companytype}
                            locationLink={`/?sectionId=myWork`}
                            portfolioId={listOfdata?.portfolios_ids[0]?.id}
                            from={2}
                            max={3}
                          />
                        </div>

                        <div className="mt-[2rem]">
                          <Link
                            href={`/portfolio`}
                            target="_blank"
                            className={
                              "bg-primary text-white py-[1rem] px-[2rem] border border-primary border-solid hover:text-primary hover:bg-white rounded-[0.5rem] text-[1.8rem] font-medium leading-normal"
                            }
                          >
                            View all Projects
                          </Link>
                        </div>
                      </section>
                    </>
                  )}

                {listOfdata &&
                  listOfdata.experiences_ids &&
                  listOfdata.experiences_ids.length > 0 && (
                    <>
                      {/* Professional Experience Timeline Section 1✅ */}
                      <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
                        {/* Note and Domain For Each Page */}
                        <NoteDomainForPint
                          direction={"hidden print:right-0 print:block"}
                        />
                        <div className="max-w-[1550px] w-full mx-auto">
                          {/* Badge */}
                          <div className="flex items-center justify-center pb-[2rem]">
                            <div className="badge">Professional Experience</div>
                          </div>
                          {/* Timeline */}
                          <div className="max-w-[1550px] w-full mx-auto px-[4rem] flex items-center justify-center mt-[2rem] print:m-0 ">
                            <div className="relative print:flex flex-col gap-4">
                              {/* Vertical line */}
                              <div className="absolute left-[10rem] top-[3rem] print:top-[5rem] w-[0.4rem] h-[calc(100%-78px)] bg-primary mx-[2.1rem]" />
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
                                    1,
                                    showAllExperiences
                                      ? listOfdata.experiences_ids.length
                                      : 4
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
                                        : experience?.skills?.slice(0, 5)
                                    );
                                    return (
                                      <>
                                        {/* Timeline items Container */}
                                        <div className="space-y-[1rem] space-x-[9rem]">
                                          {/* Date and divider */}
                                          <div
                                            className="mb-auto ml-auto print:mt-[3rem] absolute left-[-1.5rem]
                                           z-10 text-[1.6rem] text-paragraph1 capitalize 
                                           flex-col flex gap-1"
                                          >
                                            <span>
                                              From:{" "}
                                              {formatDate(
                                                experience.starting_date,
                                                dateFormatsOptions.shortMonthYear
                                              )}
                                            </span>

                                            <span>
                                              To:{" "}
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
                                            </span>
                                          </div>
                                          {/* Timeline item */}
                                          <>
                                            <div className="relative flex items-start">
                                              {/* Dot */}
                                              <div className="absolute top-0 left-[2rem] block">
                                                <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                                  <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                                                </div>
                                              </div>
                                              {/* Card */}
                                              <div className="bg-white p-[1.6rem] rounded-[1rem] shadow ml-[6rem] w-full">
                                                <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                                                  {/* About Content */}
                                                  <div className="flex gap-[1rem] items-center  w-full justify-between">
                                                    <div className="flex items-center gap-2">
                                                      {experience?.thumbnail && (
                                                        <div className="h-[3.5rem] w-[3.5rem] bg-[#D1E9FF] rounded-[0.4rem] relative">
                                                          <Image
                                                            src={
                                                              experience?.thumbnail
                                                            }
                                                            height={26}
                                                            width={26}
                                                            alt="Logo Mark"
                                                            className="h-[2.6rem] 
                                                            w-[2.6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                          />
                                                        </div>
                                                      )}
                                                      <div>
                                                        <p className="text-[1.2rem] font-normal text-paragraph1">
                                                          {
                                                            experience?.company_name
                                                          }
                                                        </p>
                                                        <h3 className="text-[1.4rem] font-medium text-heading">
                                                          {experience?.title}
                                                        </h3>
                                                      </div>
                                                    </div>

                                                    {/* Link */}
                                                    <div className="flex justify-end w-auto">
                                                      <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                                                        <div className=" py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white ">
                                                          <Link
                                                            href={
                                                              experience.company_website
                                                            }
                                                            className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold relative py-2 pl-[1rem] text-[1.3rem]"
                                                          >
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
                                                </div>

                                                <div className="w-full">
                                                  <p
                                                    className="mt-[1rem] list-div text-[1.4rem] font-medium text-paragraph1 line-clamp-2"
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        modifiedContent(
                                                          experience?.short_description,
                                                          listOfskills,
                                                          listOfdata
                                                        ) +
                                                        (experience
                                                          ?.short_description
                                                          .length > 80
                                                          ? "..."
                                                          : ""), // Add ellipsis if description is long
                                                    }}
                                                  />
                                                  <Link
                                                    href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`} // Navigate to CV page with experience ID
                                                    className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary mt-[0.3rem]"
                                                  >
                                                    Read More
                                                  </Link>
                                                </div>

                                                {experience?.skills &&
                                                  experience?.skills.length >
                                                    0 && (
                                                    <div className="w-full">
                                                      <h4 className="text-[1.3rem] text-black font-medium mb-[0.5rem] mt-[1rem]">
                                                        AREAS OF EXPERTISE I'VE
                                                        WORKED IN
                                                      </h4>
                                                      <div className="w-full flex-col items-start flex gap-5">
                                                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
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
                                                                          className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.2rem] font-medium py-[0.3rem] px-[1.5rem] bg-white flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
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
                                                          <button
                                                            className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary 
                                                          text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                                                          >
                                                            Show More Skills
                                                          </button>
                                                        </div>
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
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Professional Experience Timeline Section 2✅ */}
                      <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
                        <div className="max-w-[1550px] w-full mx-auto">
                          {/* Timeline */}
                          <div className="max-w-[1550px] w-full mx-auto px-[4rem] flex items-center justify-center mt-[2rem] print:m-0 ">
                            <div className="relative print:flex flex-col gap-4">
                              {/* Vertical line */}
                              <div className="absolute left-[10rem] top-[3rem] print:top-[5rem] w-[0.4rem] h-[calc(100%-78px)] bg-primary mx-[2.1rem]" />
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
                                    4,
                                    showAllExperiences
                                      ? listOfdata.experiences_ids.length
                                      : 7
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
                                        : experience?.skills?.slice(0, 5)
                                    );
                                    return (
                                      <>
                                        {/* Timeline items Container */}
                                        <div className="space-y-[1rem] space-x-[9rem]">
                                          {/* Date and divider */}
                                          <div
                                            className="mb-auto ml-auto print:mt-[3rem] absolute left-[-1.5rem]
                                           z-10 text-[1.6rem] text-paragraph1 capitalize 
                                           flex-col flex gap-1"
                                          >
                                            <span>
                                              From:{" "}
                                              {formatDate(
                                                experience.starting_date,
                                                dateFormatsOptions.shortMonthYear
                                              )}
                                            </span>

                                            <span>
                                              To:{" "}
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
                                            </span>
                                          </div>
                                          {/* Timeline item */}
                                          <>
                                            <div className="relative flex items-start">
                                              {/* Dot */}
                                              <div className="absolute top-0 left-[2rem] block">
                                                <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                                  <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                                                </div>
                                              </div>

                                              {/* Card */}
                                              <div className="bg-white p-[1.6rem] rounded-[1rem] shadow ml-[6rem] w-full">
                                                <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                                                  {/* About Content */}
                                                  <div className="flex gap-[1rem] items-center  w-full justify-between">
                                                    <div className="flex items-center gap-2">
                                                      {experience?.thumbnail && (
                                                        <div className="h-[3.5rem] w-[3.5rem] bg-[#D1E9FF] rounded-[0.4rem] relative">
                                                          <Image
                                                            src={
                                                              experience?.thumbnail
                                                            }
                                                            height={26}
                                                            width={26}
                                                            alt="Logo Mark"
                                                            className="h-[2.6rem] 
                                                            w-[2.6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                          />
                                                        </div>
                                                      )}
                                                      <div>
                                                        <p className="text-[1.2rem] font-normal text-paragraph1">
                                                          {
                                                            experience?.company_name
                                                          }
                                                        </p>
                                                        <h3 className="text-[1.4rem] font-medium text-heading">
                                                          {experience?.title}
                                                        </h3>
                                                      </div>
                                                    </div>

                                                    {/* Link */}
                                                    <div className="flex justify-end w-auto">
                                                      <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                                                        <div className=" py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white ">
                                                          <Link
                                                            href={
                                                              experience.company_website
                                                            }
                                                            className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold relative py-2 pl-[1rem] text-[1.3rem]"
                                                          >
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
                                                </div>

                                                <div className="w-full">
                                                  <p
                                                    className="mt-[1rem] list-div text-[1.4rem] font-medium text-paragraph1 line-clamp-2"
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        modifiedContent(
                                                          experience?.short_description,
                                                          listOfskills,
                                                          listOfdata
                                                        ) +
                                                        (experience
                                                          ?.short_description
                                                          .length > 80
                                                          ? "..."
                                                          : ""), // Add ellipsis if description is long
                                                    }}
                                                  />
                                                  <Link
                                                    href={`/cv?sectionId=experienceSection&experienceId=${experience.id}`} // Navigate to CV page with experience ID
                                                    className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary mt-[0.3rem]"
                                                  >
                                                    Read More
                                                  </Link>
                                                </div>

                                                {experience?.skills &&
                                                  experience?.skills.length >
                                                    0 && (
                                                    <div className="w-full">
                                                      <h4 className="text-[1.3rem] text-black font-medium mb-[0.5rem] mt-[1rem]">
                                                        AREAS OF EXPERTISE I'VE
                                                        WORKED IN
                                                      </h4>
                                                      <div className="w-full flex-col items-start flex gap-5">
                                                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
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
                                                                          className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.2rem] font-medium py-[0.3rem] px-[1.5rem] bg-white flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
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
                                                          <button
                                                            className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary 
                                                          text-[1.2rem] font-medium py-[0.4rem] px-[1.5rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] shadow opacity-0 animate-fadeIn relative group border border-transparent hover:border-primary"
                                                          >
                                                            Show More Skills
                                                          </button>
                                                        </div>
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
                            </div>
                          </div>
                          {listOfdata.experiences_ids.length > 3 && (
                            <div className="flex justify-center mt-8">
                              <button
                                onClick={() =>
                                  setShowAllExperiences(!showAllExperiences)
                                }
                                className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium"
                              >
                                {showAllExperiences
                                  ? "Show Less"
                                  : "View Full Career Timeline"}
                              </button>
                            </div>
                          )}
                        </div>
                      </section>
                    </>
                  )}

                {/* FAQ Section Completed ✅ */}
                <Faqs
                  urlInfo={urlInfo}
                  companyType={listOfdata?.companytype}
                  listOfdata={listOfdata}
                />

                {!urlInfo?.u && <ContactMePrint listOfdata={listOfdata} />}

                {/* Education and Blogs Landscape Section ✅ */}
                <EducationBlogsLandscape />
              </>
            ),
          }}
        />
      </main>
    </>
  );
};

export default Home_p;
