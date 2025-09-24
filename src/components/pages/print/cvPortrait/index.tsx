"use client";

import Image from "next/image";
import Link from "next/link";
import "@/styles/printStyles/cvPortrait.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import React, { useEffect, useState } from "react";
import {
  blogData,
  contactDetails,
  dateFormatsOptions,
  socialLinks,
} from "@/data/JsonData";
import WebsiteLoader from "@/components/WebsiteLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { scrollToSection } from "@/hooks/scrollToSection";
import {
  blogsListing,
  loadBlogs,
} from "@/hooks/apihandlers/blogListingApiHandler";
import PageRendering from "@/components/PageRendering";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import Background from "@/components/background";
import { useAppSelector } from "@/store";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import { modifiedContentPrint } from "@/hooks/modifiedContentPrint";
import { getImageForIndex } from "@/utils/getImageForIndex";
import DesignationDomain from "@/components/DesignationDomain";
import NoteClickable from "@/components/NoteClickable";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import EducationBlogsPortrait from "@/components/EducationBlogsPortrait";
import HomeSliderPrint from "@/components/Sliders/HomeSliderPrint";
import SkillsContainerPrint from "@/components/SkillsContainerPrint";
type SkillType = {
  title: string;
  url?: string;
  // add other properties if they exist
};
const CV_Portrait = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (
    pictures: string,
    thumbnail: string,
    child_hero_banner: string
  ) => {
    const portfolioImages = JSON.parse(pictures) as string[];
    const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
    setSelectedPorfolioPicturesforPopup(allImages);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

  const router = useRouter();
  // Navigate to portfolio detail page -> skills section
  const handleSeeMore = () => {
    // Navigate to portfolio detail with skills section scroll
    router.push(
      `/portfolio/${listOfdata?.portfolios_ids[0]?.id}?scroll=skills`
    );
  };

  const handleViewMore = () => {
    router.push("/?scrollTo=experiences&expand=true");
  };

  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showMoreSkillsForExperiences, setShowMoreSkillsForExperiences] =
    useState([]);
  const [showMoreSkillsForPortfolios, setShowMoreSkillsForPortfolios] =
    useState([]);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (listOfdata) {
      loadBlogs({
        domain: listOfdata?.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata]);

  const domain = listOfdata?.domain;

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  const [expandedItems, setExpandedItems] = useState({});

  // Toggle the "Show More" state for a specific item
  const toggleShowMore = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific item
    }));
  };

  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  // console.log("Skills Inside List of data: ", listOfdata?.skills);
  // console.log("List of skills: ", listOfskills);
  // console.log("List of data: ", listOfdata);
  // console.log("Skills Group  Data:", listOfdata?.skills_groups);

  return (
    <>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
          error,
          actualPage: (
            <div className="bg-[#EFF5FD]">
              {/* Intoduction Section ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative print:bg-cvSideBg print:bg-no-repeat print:bg-cover">
                {/* Note For BTN's */}
                <NoteClickable />
                <div className="max-w-[1550px] w-full mx-auto flex flex-col items-center print:bg-none bg-cvSideBg bg-no-repeat bg-cover p-[4rem]">
                  {/* Profile Bg */}
                  <div className="print:flex flex flex-col items-center justify-center gap-4 print:w-full">
                    <div className="print:flex flex flex-col print:flex-row items-center justify-center gap-4 print:w-full">
                      <Link href="/" className=" block">
                        <Image
                          src={listOfdata?.profile_photo_1}
                          height={1200}
                          width={1200}
                          alt="Profile Picture"
                          className="h-[20.12rem] w-[20.12rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
                        />
                      </Link>
                      <div className="">
                        {/* Name */}

                        <Link
                          href={"/"}
                          className="text-heading text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem] text-center"
                        >
                          {listOfdata?.name}
                        </Link>
                        {/* Designation */}
                        <h3 className="text-primary text-[2rem] font-medium leading-normal mt-[0.9rem]">
                          {listOfdata?.designation
                            ?.split("|")
                            .map((item, index) => (
                              <div key={index} className="text-center">
                                {item.trim()}
                              </div>
                            ))}
                        </h3>
                        <div className="flex items-center justify-center">
                          <DesignationDomain />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center print:w-full">
                      {/* Info */}
                      <p className="my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center">
                        Reach out today and I'll provide you with my
                        comprehensive full-time employment or Contract Based
                        Jobs. This package covers various aspects that potential
                        employers often inquire about, such as my salary
                        expectations and the seamless integration process into
                        your company.
                      </p>
                    </div>
                  </div>
                  {/* Divider */}
                  <hr className="w-full h-[0.2rem] bg-[#E2E6EE] print:hidden mb-[4rem] inline-block" />
                  {/* Availability */}
                  <div className="mb-[4rem] w-full hidden text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden">
                    <div className="bg-[#F7F9FC]  p-[1.5rem]">
                      <p className="text-[1.6rem] leading-normal font-normal text-heading">
                        Next available
                      </p>
                      <h4 className="text-[2rem] font-medium text-primary leading-normal">
                        {formatDate(
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1
                          ),
                          dateFormatsOptions.longMonthYear
                        )}
                      </h4>
                    </div>
                  </div>
                  {/* Contact & Work Proof Container */}
                  <div className="flex w-full gap-[2rem] items-start px-[3rem]">
                    {/* Email, Website, Phone, Location */}
                    <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
                      {contactDetails(listOfdata)
                        .filter(({ alt }) =>
                          urlInfo?.u ? alt === "Location" : true
                        )
                        .map((contact, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[1.78rem]"
                          >
                            {contact.iconSrc && (
                              <div
                                className="h-[35px] w-[35px] bg-[#E2E6EE] rounded-[50%]
                                 relative"
                              >
                                <Image
                                  src={contact.iconSrc}
                                  height={24}
                                  width={24}
                                  alt={contact.alt}
                                  className="h-[24px] w-[24px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                              </div>
                            )}
                            <div className="flex flex-col gap-[0.45rem]">
                              <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                                {contact.type}
                              </p>

                              <Link
                                href={contact.href || "#"}
                                className="hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                              >
                                {contact.value}
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Work Proof */}
                    <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
                      {/* Title */}
                      <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
                        Work Proof
                      </h3>

                      {/* Iterating on Icons */}
                      {socialLinks(listOfdata)
                        .filter(({ alt }) =>
                          urlInfo?.u
                            ? alt === "Github" ||
                              alt === "Upwork" ||
                              alt === "Linkedin"
                            : true
                        )
                        .slice(0, 3)
                        .map((social, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[1.78rem]"
                          >
                            {social.iconSrc && (
                              <Image
                                src={social.iconSrc}
                                height={35}
                                width={35}
                                alt={social.alt}
                                className="h-[35px] w-[35px]"
                              />
                            )}
                            <div className="flex flex-col gap-[0.45rem]">
                              <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                                {social.platform}
                              </p>
                              <Link
                                href={social.href || "#"}
                                className="break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                              >
                                {social.username}
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Overview Section ✅ */}
              {listOfdata?.skills && (
                <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative my-[4rem] print:m-0 bg-cvSideBg bg-no-repeat bg-cover">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  <div className="relative flex items-start max-w-[1550px] w-full mx-auto px-[4rem]">
                    <div className="print:break-before-page print_p_m">
                      {/* Title */}
                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                        Overview & Skills
                      </h2>
                      <div
                        className="text-heading services_main list-div text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem] list-inside"
                        dangerouslySetInnerHTML={{
                          __html: modifiedContent(
                            listOfdata?.skills,
                            listOfskills,
                            listOfdata
                          ),
                        }}
                      ></div>
                      <div className="flex items-center justify-center">
                        <Link
                          href={"/cv"}
                          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight mb-[2rem] block"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Skills Section ✅ */}
              {listOfdata?.skills_ids && (
                <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0 bg-cvSideBg bg-no-repeat bg-cover">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  <div className="relative flex items-center justify-center max-w-[1550px] w-full mx-auto px-[4rem]">
                    <div className="print:mt-[4rem]">
                      {/* Title */}
                      <div className="flex items-center justify-center print:mb-[5rem]">
                        <div className="badge">Skills</div>
                      </div>
                      <SkillsContainerPrint
                        list={listOfdata?.skills_ids}
                        numColumns={6} // ✅ Dynamic columns (you can make this dynamic based on screen size or other conditions)
                        numSkills={30} // ✅ Dynamic number of skills to display
                        portfolioId={listOfdata?.portfolios_ids[0]?.id}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* Experience Section ✅ */}
              {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
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
                      <div className="w-full mx-auto flex items-center justify-center mt-[2rem] print:m-0 ">
                        <div className="relative print:flex flex-col gap-4">
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
                                  ShowmoreSkills[index]
                                    ? experience?.skills
                                    : experience?.skills?.slice(0, 5)
                                );
                                return (
                                  <>
                                    {/* Timeline items Container */}
                                    <div className="space-y-[1rem] space-x-[9rem]">
                                      {/* Timeline item */}
                                      <>
                                        <div className="relative flex items-start">
                                          {/* Card */}
                                          <div
                                            className="bg-white p-[1.6rem]
                                           rounded-[1rem] shadow w-full mb-[1rem]"
                                          >
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
                                                      {experience?.company_name}
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
                                                        View my upwork Freelance
                                                        Profile
                                                      </Link>
                                                    )}{" "}
                                                  </div>
                                                </div>
                                              </div>
                                              <h1 className="mb-[1rem] text-primary text-[1.8rem] leading-[2rem] font-bold">
                                                {new Date(
                                                  experience.starting_date
                                                ).toLocaleString("en-US", {
                                                  month: "short",
                                                  year: "numeric",
                                                })}{" "}
                                                -{" "}
                                                {isNaN(
                                                  new Date(
                                                    experience.ending_Date
                                                  ).getTime()
                                                )
                                                  ? experience.ending_Date
                                                  : new Date(
                                                      experience.ending_Date
                                                    ).toLocaleString("en-US", {
                                                      month: "short",
                                                      year: "numeric",
                                                    })}
                                              </h1>
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

                                            <hr className="w-full my-[1rem] h-px bg-border" />

                                            {experience?.skills &&
                                              experience?.skills.length > 0 && (
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
                                                        (group, groupIndex) => (
                                                          <React.Fragment
                                                            key={groupIndex}
                                                          >
                                                            {group.map(
                                                              (skill, i) => {
                                                                // Calculate the skill number (groupIndex+1).(i+1)
                                                                const skillNumber = `${
                                                                  groupIndex + 1
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
                                                        onClick={handleSeeMore}
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
                </>
              )}

              {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
                <>
                  {/* Professional Experience Timeline Section 1✅ */}
                  <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
                    {/* Note and Domain For Each Page */}
                    <NoteDomainForPint
                      direction={"hidden print:right-0 print:block"}
                    />
                    <div className="max-w-[1550px] w-full mx-auto">
                      {/* Timeline */}
                      <div className="w-full mx-auto flex items-center justify-center mt-[2rem] print:m-0 ">
                        <div className="relative print:flex flex-col gap-4">
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
                                  ShowmoreSkills[index]
                                    ? experience?.skills
                                    : experience?.skills?.slice(0, 5)
                                );
                                return (
                                  <>
                                    {/* Timeline items Container */}
                                    <div className="space-y-[1rem] space-x-[9rem]">
                                      {/* Timeline item */}
                                      <>
                                        <div className="relative flex items-start">
                                          {/* Card */}
                                          <div
                                            className="bg-white p-[1.6rem]
                                           rounded-[1rem] shadow w-full mb-[1rem]"
                                          >
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
                                                      {experience?.company_name}
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
                                                        View my upwork Freelance
                                                        Profile
                                                      </Link>
                                                    )}{" "}
                                                  </div>
                                                </div>
                                              </div>
                                              <h1 className="mb-[1rem] text-primary text-[1.8rem] leading-[2rem] font-bold">
                                                {new Date(
                                                  experience.starting_date
                                                ).toLocaleString("en-US", {
                                                  month: "short",
                                                  year: "numeric",
                                                })}{" "}
                                                -{" "}
                                                {isNaN(
                                                  new Date(
                                                    experience.ending_Date
                                                  ).getTime()
                                                )
                                                  ? experience.ending_Date
                                                  : new Date(
                                                      experience.ending_Date
                                                    ).toLocaleString("en-US", {
                                                      month: "short",
                                                      year: "numeric",
                                                    })}
                                              </h1>
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

                                            <hr className="w-full my-[1rem] h-px bg-border" />

                                            {experience?.skills &&
                                              experience?.skills.length > 0 && (
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
                                                        (group, groupIndex) => (
                                                          <React.Fragment
                                                            key={groupIndex}
                                                          >
                                                            {group.map(
                                                              (skill, i) => {
                                                                // Calculate the skill number (groupIndex+1).(i+1)
                                                                const skillNumber = `${
                                                                  groupIndex + 1
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
                                                        onClick={handleSeeMore}
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
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={handleViewMore}
                          className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium"
                        >
                          View All Experiences
                        </button>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {/* Portfolio Section ✅ */}
              {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  {/* Title and View All Link */}
                  <div className="flex items-center justify-center">
                    <h2 className="badge">Portfolios</h2>
                  </div>

                  {/* <Link
                                    href={"/portfolio"}
                                    className=" flex items-center gap-[0.6rem] group cursor-pointer"
                                  >
                                    <div className="hover:font-bold hover:text-primary text-[1.4rem] text-heading font-medium">
                                      View all
                                    </div>
                                    <div className="group-hover:translate-x-[1rem] duration-300">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337"
                                          stroke="#262626"
                                          strokeWidth="1.67"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  </Link> */}

                  {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                    if (index >= 1) {
                      return null;
                    }

                    return (
                      <div
                        className="max-w-[1550px] mx-auto w-full relative"
                        key={index}
                      >
                        <div className="w-full px-[3rem]">
                          {/* Date */}
                          {/* <h2
                            key={index}
                            className="text-heading leading-[2.67rem] text-[2rem] font-bold 
                  pl-[0.5rem] mb-[3rem]"
                          >
                            {formatDate(
                              portfolio?.starting_date,
                              dateFormatsOptions.shortMonthYear // 👈 Month + Year instead of onlyYear
                            )}{" "}
                            -{" "}
                            {isNaN(
                              new Date(portfolio.ending_Date).getFullYear()
                            )
                              ? portfolio.ending_Date
                              : formatDate(
                                  portfolio.ending_Date,
                                  dateFormatsOptions.shortMonthYear // 👈 Month + Year here too
                                )}
                          </h2> */}

                          <HomeSliderPrint
                            portfolios={listOfdata?.portfolios_ids}
                            isPortraitMode={true}
                            companyType={listOfdata?.companytype}
                            locationLink={`/?sectionId=myWork`}
                            portfolioId={listOfdata?.portfolios_ids[0]?.id}
                            from={0}
                            max={1}
                          />
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                    if (index !== 1) {
                      return null;
                    }

                    return (
                      <div
                        className="max-w-[1550px] mx-auto w-full relative"
                        key={index}
                      >
                        <div className="w-full px-[3rem]">
                          {/* Date */}
                          <h2
                            key={index}
                            className="text-heading leading-[2.67rem] text-[2rem] font-bold 
                  pl-[0.5rem] mb-[3rem]"
                          >
                            {formatDate(
                              portfolio?.starting_date,
                              dateFormatsOptions.shortMonthYear // 👈 Month + Year instead of onlyYear
                            )}{" "}
                            -{" "}
                            {isNaN(
                              new Date(portfolio.ending_Date).getFullYear()
                            )
                              ? portfolio.ending_Date
                              : formatDate(
                                  portfolio.ending_Date,
                                  dateFormatsOptions.shortMonthYear // 👈 Month + Year here too
                                )}
                          </h2>

                          <HomeSliderPrint
                            portfolios={listOfdata?.portfolios_ids}
                            isPortraitMode={true}
                            companyType={listOfdata?.companytype}
                            locationLink={`/?sectionId=myWork`}
                            portfolioId={listOfdata?.portfolios_ids[0]?.id}
                            from={1}
                            max={2}
                          />
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0">
                  {/* Note and Domain For Each Page */}
                  <NoteDomainForPint
                    direction={"hidden print:right-0 print:block"}
                  />
                  {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                    if (index !== 2) {
                      return null;
                    }

                    return (
                      <div
                        className="max-w-[1550px] mx-auto w-full relative"
                        key={index}
                      >
                        <div className="w-full px-[3rem]">
                          {/* Date */}
                          {/* <h2
                            key={index}
                            className="text-heading leading-[2.67rem] text-[2rem] font-bold 
                  pl-[0.5rem] mb-[3rem]"
                          >
                            {formatDate(
                              portfolio?.starting_date,
                              dateFormatsOptions.shortMonthYear // 👈 Month + Year instead of onlyYear
                            )}{" "}
                            -{" "}
                            {isNaN(
                              new Date(portfolio.ending_Date).getFullYear()
                            )
                              ? portfolio.ending_Date
                              : formatDate(
                                  portfolio.ending_Date,
                                  dateFormatsOptions.shortMonthYear // 👈 Month + Year here too
                                )}
                          </h2> */}

                          <HomeSliderPrint
                            portfolios={listOfdata?.portfolios_ids}
                            isPortraitMode={true}
                            companyType={listOfdata?.companytype}
                            locationLink={`/?sectionId=myWork`}
                            portfolioId={listOfdata?.portfolios_ids[0]?.id}
                            from={2}
                            max={3}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center mt-8">
                    <Link
                      href={"/portfolio"}
                      className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium"
                    >
                      View All Portfolios
                    </Link>
                  </div>
                </section>
              )}

              {/* Education and Blog Section Section ✅ */}
              <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                {/* Education & Blogs Section */}
                <EducationBlogsPortrait />
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};
export default CV_Portrait;
