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
import { useSearchParams } from "next/navigation";
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

  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showMoreSkillsForExperiences, setShowMoreSkillsForExperiences] =
    useState([]);
  const [showMoreSkillsForPortfolios, setShowMoreSkillsForPortfolios] =
    useState([]);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const initialVisibleItems = 3 * 6;

  const visibleSkills = showAll
    ? listOfdata?.skills_ids
    : listOfdata?.skills_ids.slice(0, initialVisibleItems);

  const skillsforCV: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
      icon?: string;
    }[];
  } = skillsGrouping(visibleSkills);

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
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

  console.log("listOfdata:", listOfdata);

  return (
    <>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
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
                  <div className="flex w-full gap-[2rem] items-start">
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
                    {/* Dot */}
                    <div className="absolute left-[2.5rem] top-0  block z-20">
                      <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                        <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                      </div>
                    </div>
                    {/* Vertical line */}
                    <div className="absolute left-[4rem] top-0 w-[1.5px] h-[100%] bg-primary" />

                    <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print:break-before-page print_p_m">
                      {/* Title */}
                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                        Overview & Skills
                      </h2>

                      <div
                        className="text-heading services_main list-div text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem] list-inside print:p-0"
                        dangerouslySetInnerHTML={{
                          __html: modifiedContentPrint(
                            listOfdata?.skills,
                            listOfskills,
                            listOfdata,
                            10 // ← show only first 5 bullet points
                          ),
                        }}
                      ></div>
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
                  <div className="relative flex items-start max-w-[1550px] w-full mx-auto px-[4rem] ">
                    {/* Dot */}
                    <div className="absolute left-[2.5rem] top-0  block z-20">
                      <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                        <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                      </div>
                    </div>
                    {/* Vertical line */}
                    <div className="absolute left-[4rem] top-0 w-[1.5px] h-[100%] bg-primary" />
                    <div className="print:mt-[4rem]">
                      {/* Title */}
                      <h2 className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem] text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                        Skills
                      </h2>
                      <div className="flex flex-col items-center">
                        <div className="grid  grid-cols-5  xl:grid-cols-6 gap-[1.5rem] ml-[2rem] ">
                          {Object.values(skillsforCV)
                            .flat()
                            .slice(0, 20)
                            .map((skill, i) => (
                              <div
                                key={i}
                                style={{
                                  animationDelay: `${i * 0.2}s`,
                                }}
                                className="mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] max-w-[15rem] lg:max-w-[19rem] w-full animate-fadeIn opacity-0"
                              >
                                {skill.icon && (
                                  <div className="flex items-center justify-center h-[6.4rem] w-[6.4rem]">
                                    <Image
                                      src={skill?.icon}
                                      alt={skill?.title}
                                      height={64}
                                      width={64}
                                      className="object-contain rounded-full h-[6.4rem] w-[6.4rem]"
                                    />
                                  </div>
                                )}
                                <p className="mt-[1.5rem] text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                                  {skill.title}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Link href={`/cv/?sectionId=skillsSection`}>
                      <button className="bg-primary text-white py-[0.4rem] px-[2rem] border border-primary border-solid hover:text-primary hover:bg-white rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                        Show More Skills
                      </button>
                    </Link>
                  </div>
                </section>
              )}

              {/* Experience Section ✅ */}
              {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
                <>
                  <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0 bg-cvSideBg bg-no-repeat bg-cover">
                    {/* Note and Domain For Each Page */}
                    <NoteDomainForPint
                      direction={"hidden print:right-0 print:block"}
                    />
                    <h2
                      className="text-heading  leading-[3.56rem] text-[3.67rem] font-medium 
                      pt-[3rem] pb-[1rem]  pl-[5rem] self-start"
                    >
                      Experiences
                    </h2>
                    {listOfdata?.experiences_ids &&
                      [...listOfdata.experiences_ids]
                        ?.sort((a, b) => {
                          const yearA = new Date(a.ending_Date).getFullYear();
                          const yearB = new Date(b.ending_Date).getFullYear();
                          if (yearA !== yearB) return yearB - yearA;
                          const monthA = new Date(a.ending_Date).getMonth();
                          const monthB = new Date(b.ending_Date).getMonth();
                          return monthB - monthA;
                        })
                        ?.map((experience, index) => {
                          if (index >= 2) {
                            return null;
                          }

                          const skillsforExpereinces = skillsGrouping(
                            showMoreSkillsForExperiences[index]
                              ? experience?.skills
                              : experience?.skills?.slice(0, 15)
                          );
                          return (
                            <div
                              className="relative flex items-start max-w-[1550px] w-full mx-auto px-[4rem]"
                              key={index}
                            >
                              {/* Dot */}
                              <div className="absolute left-[2.5rem] top-0  block z-20">
                                <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                  <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                </div>
                              </div>
                              {/* Vertical line */}
                              <div className="absolute left-[4rem] top-0 w-[1.5px] h-[100%] bg-primary" />

                              <div className="w-full ml-10">
                                {/* <h2 className="text-heading block leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] pb-[2rem] print_p_m print:!pt-[2rem]">
                                  Experience
                                </h2> */}
                                {/* Date */}
                                <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem]  print:!pt-[1.4rem] mb-[3rem]">
                                  {formatDate(
                                    experience?.starting_date,
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
                                </h2>
                                {/* Card */}
                                <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem]  rounded-[1rem] shadow mb-[2rem] ">
                                  <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                                    {/* About Content */}
                                    <div className="flex align-middle justify-center items-center gap-[1rem]">
                                      {experience?.thumbnail && (
                                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                                          <Image
                                            src={experience?.thumbnail}
                                            height={32}
                                            width={32}
                                            alt="Logo Mark"
                                          />
                                        </div>
                                      )}

                                      <div>
                                        <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                                          {experience.title}
                                        </h3>
                                        {experience?.company_website && (
                                          <div className="flex items-center gap-[0.52rem]">
                                            <Image
                                              src={"/images/link.svg"}
                                              height={18}
                                              width={18}
                                              alt="Link"
                                              className="h-[18px] w-[18px]"
                                            />
                                            <Link
                                              href={`/cv/?sectionId=expericeSection`}
                                              className="text-[#1F4FE1] break-all text-[1.6rem] lg:text-[1.8rem] font-normal leading-normal"
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
                                        )}
                                      </div>
                                    </div>

                                    {/* Link */}
                                    <div className="flex justify-end w-auto">
                                      <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                                        <div className=" py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white ">
                                          <Link
                                            href={`/cv/?sectionId=expericeSection`}
                                            className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold relative py-2 pl-[1rem]"
                                          >
                                            <Image
                                              src={"/images/link.svg"}
                                              height={18}
                                              width={18}
                                              className="h-[1.8rem] w-[1.8rem] absolute top-1/2 left-[-1rem] -translate-y-1/2"
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
                                            href={`/cv/?sectionId=expericeSection`}
                                            className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                          >
                                            View my upwork Freelance Profile
                                          </Link>
                                        )}{" "}
                                      </div>
                                    </div>
                                  </div>

                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        experience?.short_description,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                    className="mt-[2rem] list-div text-[1.6rem] font-medium text-paragraph1 line-clamp-2"
                                  ></p>

                                  {/* Skills Badges */}
                                  <div className="mt-[2.2rem]">
                                    <h4 className="mb-[1.2rem] ml-[0.2rem] text-[1.5rem] text-primary font-medium my-[1.6rem] ">
                                      AREAS OF EXPERTISE I'VE WORKED IN
                                    </h4>

                                    <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                                      {Object.values(skillsforExpereinces)
                                        .flat()
                                        .slice(0, 8)
                                        .map((skill: SkillType, i: number) => (
                                          <Link
                                            href={`/cv/?sectionId=expericeSection`}
                                            key={i}
                                            className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                          >
                                            {skill.title}
                                          </Link>
                                        ))}
                                      <Link
                                        href={`/cv/?sectionId=expericeSection`}
                                      >
                                        <button className="bg-primary text-white py-[0.4rem] px-[2rem] border border-primary border-solid hover:text-primary hover:bg-white rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                                          Show More Skills
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </section>
                </>
              )}

              {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
                <>
                  <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0 bg-cvSideBg bg-no-repeat bg-cover">
                    {/* Note and Domain For Each Page */}
                    <NoteDomainForPint
                      direction={"hidden print:right-0 print:block"}
                    />
                    {listOfdata?.experiences_ids &&
                      [...listOfdata.experiences_ids]
                        ?.sort((a, b) => {
                          const yearA = new Date(a.ending_Date).getFullYear();
                          const yearB = new Date(b.ending_Date).getFullYear();
                          if (yearA !== yearB) return yearB - yearA;
                          const monthA = new Date(a.ending_Date).getMonth();
                          const monthB = new Date(b.ending_Date).getMonth();
                          return monthB - monthA;
                        })
                        ?.map((experience, index) => {
                          if (index < 2 || index >= 4) {
                            return null;
                          }

                          const skillsforExpereinces = skillsGrouping(
                            showMoreSkillsForExperiences[index]
                              ? experience?.skills
                              : experience?.skills?.slice(0, 15)
                          );
                          return (
                            <div
                              className="relative flex items-start max-w-[1550px] w-full mx-auto px-[4rem]"
                              key={index}
                            >
                              {/* Dot */}
                              <div className="absolute left-[2.5rem] top-0  block z-20">
                                <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                  <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                </div>
                              </div>
                              {/* Vertical line */}
                              <div className="absolute left-[4rem] top-0 w-[1.5px] h-[100%] bg-primary" />

                              <div className="w-full ml-10">
                                {/* Date */}
                                <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem]  print:!pt-[1.4rem] mb-[3rem]">
                                  {formatDate(
                                    experience?.starting_date,
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
                                </h2>
                                {/* Card */}
                                <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem]  rounded-[1rem] shadow mb-[2rem] ">
                                  <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                                    {/* About Content */}
                                    <div className="flex align-middle justify-center items-center gap-[1rem]">
                                      {experience?.thumbnail && (
                                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                                          <Image
                                            src={experience?.thumbnail}
                                            height={32}
                                            width={32}
                                            alt="Logo Mark"
                                          />
                                        </div>
                                      )}

                                      <div>
                                        <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                                          {experience.title}
                                        </h3>
                                        {experience?.company_website && (
                                          <div className="flex items-center gap-[0.52rem]">
                                            <Image
                                              src={"/images/link.svg"}
                                              height={18}
                                              width={18}
                                              alt="Link"
                                              className="h-[18px] w-[18px]"
                                            />
                                            <Link
                                              href={`/cv/?sectionId=expericeSection`}
                                              className="text-[#1F4FE1] break-all text-[1.6rem] lg:text-[1.8rem] font-normal leading-normal"
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
                                        )}
                                      </div>
                                    </div>

                                    {/* Link */}
                                    <div className="flex justify-end w-auto">
                                      <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                                        <div className=" py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white ">
                                          <Link
                                            href={`/cv/?sectionId=expericeSection`}
                                            className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold relative py-2 pl-[1rem]"
                                          >
                                            <Image
                                              src={"/images/link.svg"}
                                              height={18}
                                              width={18}
                                              className="h-[1.8rem] w-[1.8rem] absolute top-1/2 left-[-1rem] -translate-y-1/2"
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
                                            href={`/cv/?sectionId=expericeSection`}
                                            className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                          >
                                            View my upwork Freelance Profile
                                          </Link>
                                        )}{" "}
                                      </div>
                                    </div>
                                  </div>

                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        experience?.short_description,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                    className="mt-[2rem] list-div text-[1.6rem] font-medium text-paragraph1 line-clamp-2"
                                  ></p>

                                  {/* Skills Badges */}
                                  <div className="mt-[2.2rem]">
                                    <h4 className="mb-[1.2rem] ml-[0.2rem] text-[1.5rem] text-primary font-medium my-[1.6rem] ">
                                      AREAS OF EXPERTISE I'VE WORKED IN
                                    </h4>

                                    <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                                      {Object.values(skillsforExpereinces)
                                        .flat()
                                        .slice(0, 8)
                                        .map((skill: SkillType, i: number) => (
                                          <Link
                                            href={`/cv/?sectionId=expericeSection`}
                                            key={i}
                                            className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium py-[0.4rem] px-[2rem] bg-white flex items-center print:py-[0.2rem] print:px-[1.5rem] justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                          >
                                            {skill.title}
                                          </Link>
                                        ))}

                                      <Link
                                        href={`/cv/?sectionId=expericeSection`}
                                      >
                                        <button className="bg-primary text-white py-[0.4rem] px-[2rem] border border-primary border-solid hover:text-primary hover:bg-white rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                                          Show More Skills
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </section>
                </>
              )}

              {/* Portfolio Section ✅ */}
              {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <>
                  {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                    if (index >= 3) {
                      return null;
                    }

                    const skillsForPortfolios: {
                      [key: string]: {
                        title: string;
                        url?: string;
                        order?: string;
                      }[];
                    } = skillsGrouping(
                      showMoreSkillsForPortfolios[index]
                        ? portfolio?.skills
                        : portfolio?.skills?.slice(0, 15)
                    );

                    return (
                      <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative my-[4rem] print:m-0 pr-[2rem] bg-cvSideBg bg-no-repeat bg-cover">
                        {/* Note and Domain For Each Page */}
                        <NoteDomainForPint
                          direction={"hidden print:right-0 print:block"}
                        />
                        <div
                          className="relative max-w-[1550px] w-full mx-auto px-[4rem]"
                          key={index}
                        >
                          {/* Dot */}
                          <div className="absolute left-[2.5rem] top-0  block z-20">
                            <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                              <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                            </div>
                          </div>
                          {/* Vertical line */}
                          <div className="absolute left-[4rem] top-0 w-[1.5px] h-[100%] bg-primary" />
                          <div className="w-full ml-10">
                            <h2 className="text-heading block leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] print:p-0 pb-[2rem]">
                              Portfolio
                            </h2>
                            {/* Date */}
                            <h2
                              key={index}
                              className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] print:mb-[0rem] print:!mt-[1.3rem] mb-[3rem] "
                            >
                              {formatDate(
                                portfolio?.starting_date,
                                dateFormatsOptions.onlyYear
                              )}{" "}
                              -{" "}
                              {isNaN(
                                new Date(portfolio.ending_Date).getFullYear()
                              )
                                ? portfolio.ending_Date
                                : formatDate(
                                    portfolio.ending_Date,
                                    dateFormatsOptions.onlyYear
                                  )}
                            </h2>
                            {/* Card */}
                            <div className="bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                              {/* Content */}
                              <div className="w-full ">
                                <div className="text-heading">
                                  {portfolio?.thumbnail && (
                                    <div className="relative w-full print:h-[300px] h-[600px]">
                                      <Image
                                        src={portfolio.thumbnail}
                                        alt="Project Image"
                                        fill
                                        sizes="100vw"
                                        className="rounded-[1.2rem] object-fill absolute top-0 left-0 w-full h-full"
                                        priority={index === 0}
                                      />
                                    </div>
                                  )}
                                  {/* Explore Galary Button */}
                                  <div className="flex items-center justify-center w-full">
                                    <Link
                                      href={`/cv/?sectionId=portfolioSection`}
                                    >
                                      <button className="text-white py-[6px] mt-[17px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative max-w-max text-nowrap">
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                          Explore the Gallery
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </span>
                                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                                <div className="mt-[1rem]">
                                  <h1 className="text-[2rem] font-bold leading-[2.69rem]">
                                    {portfolio?.title}
                                  </h1>

                                  <p
                                    className=" text-[1.6rem] leading-[150%] font-normal mt-[1rem] line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        portfolio?.tagline_1,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                  ></p>
                                  <p
                                    className="text-primary text-[1.6rem] leading-[150%] font-normal mt-[1rem] line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        portfolio?.tagline_2,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                  ></p>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        portfolio.features_short,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                    className="mt-[2rem] list-div-portfolio1 pl-[2rem] mb-[2rem] line-clamp-2"
                                  ></p>
                                  {/* Skills Badges */}
                                  <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                                    AREAS OF EXPERTISE I'VE WORKED IN
                                  </h4>

                                  <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                                    {Object.values(skillsForPortfolios)
                                      .flat()
                                      .slice(0, 5)
                                      .map((skill: SkillType, i: number) => (
                                        <Link
                                          key={i}
                                          href={`/cv/?sectionId=portfolioSection`}
                                          className="hover:text-white hover:bg-primary py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                        >
                                          {skill?.title}
                                        </Link>
                                      ))}
                                  </div>
                                </div>
                                <div className="flex items-center print:grid grid-cols-1 gap-[1.4rem] py-[1rem]">
                                  <Link
                                    href={`/cv/?sectionId=portfolioSection`}
                                    className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 text-center rounded-[0.6rem]  text-nowrap print:w-full"
                                  >
                                    View Details
                                  </Link>
                                  <Link
                                    href={`/cv/?sectionId=portfolioSection`}
                                    className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] text-center text-nowrap print:w-full"
                                  >
                                    Launch Project - Live Preview
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </>
              )}

              {/* Education and Blog Section Section ✅ */}
              <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative my-[4rem] print:m-0 pr-[2rem] bg-cvSideBg bg-no-repeat bg-cover">
                {/* Note and Domain For Each Page */}
                <NoteDomainForPint
                  direction={"hidden print:right-0 print:block"}
                />
                <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                  {/* Education Section */}
                  {listOfdata && listOfdata?.education_ids?.length > 0 && (
                    <div className="relative w-full">
                      {/* Dot */}
                      <div className="absolute left-[-1.5rem] top-0  block z-20">
                        <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                          <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                        </div>
                      </div>
                      {/* Vertical line */}
                      <div className="absolute left-0 top-0 w-[1.5px] h-[100%] bg-primary" />
                      <div className="w-full ml-10">
                        {/* Title */}
                        <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                          Education
                        </h2>
                        {/* for desktop */}
                        <div className="grid grid-cols-2 gap-[1.2rem] w-full">
                          {listOfdata?.education_ids?.map((edu) => (
                            <div
                              key={edu.id}
                              className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
                            >
                              <div className="flex items-center gap-[1.8rem]">
                                {edu?.thumbnail && (
                                  <Image
                                    src={edu?.thumbnail}
                                    height={34}
                                    width={34}
                                    alt={edu.university_name}
                                    className="h-[34px] w-[34px]"
                                  />
                                )}
                                <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                                  {edu.university_name}
                                </h3>
                              </div>
                              {/* Divider */}
                              <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />
                              <div>
                                <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                                  {edu.degree_name}
                                </h2>
                                <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                                  {formatDate(
                                    edu.degree_start_date,
                                    dateFormatsOptions.shortMonthYear
                                  )}{" "}
                                  -{" "}
                                  {isNaN(
                                    new Date(edu.degree_end_date).getFullYear()
                                  )
                                    ? edu.degree_end_date
                                    : formatDate(
                                        edu.degree_end_date,
                                        dateFormatsOptions.shortMonthYear
                                      )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Blogs Section */}
                  <div className="relative w-full">
                    {/* Dot */}
                    <div className="absolute left-[-1.5rem] top-0  block z-20">
                      <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                        <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                      </div>
                    </div>
                    {/* Vertical line */}
                    <div className="absolute left-0 top-0 w-[1.5px] h-[100%] bg-primary" />
                    <div className="w-full ml-10">
                      <div className="flex items-center justify-between">
                        {/* Title */}
                        <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                          Blogs
                        </h2>
                        <div className="w-full sm:w-auto flex justify-center">
                          <Link href={`/cv/?sectionId=blogsSection`}>
                            <button
                              className="btn-primary text-white py-[1rem] 
                                      px-[3.4rem] text-[1.8rem] font-medium"
                            >
                              View All Blogs
                            </button>
                          </Link>
                        </div>
                      </div>
                      {/* Map Through the Blogs Array */}
                      {loadingblogs ? (
                        <WebsiteLoader height="h-[20rem]" />
                      ) : (
                        <>
                          {blogsList
                            ?.slice(0, Math.min(2, blogsList.length))
                            .map((blog, index) => (
                              <Link
                                href={`/blog-listing/${blog?.id}`}
                                key={index}
                                className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row"
                              >
                                {/* Card Image */}
                                {blog?.featuredImage && (
                                  <div className="sm:w-[20rem] h-[19rem] w-full flex-shrink-0">
                                    <Image
                                      // src={blog?.featuredImage}
                                      src={getImageForIndex(domain, index)}
                                      height={300}
                                      width={300}
                                      alt={`Blog ${index + 1}`}
                                      className="object-cover h-full w-full"
                                    />
                                  </div>
                                )}
                                {/* Card Content */}
                                <div className="">
                                  {/* Date */}
                                  <div className="mb-[1.2rem] flex items-center">
                                    <div className="flex items-center">
                                      {/* SVG Dot */}
                                      <div className="mx-[0.6rem]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="5"
                                          height="6"
                                          viewBox="0 0 5 6"
                                          fill="none"
                                        >
                                          <circle
                                            cx="2.5"
                                            cy="3"
                                            r="2.5"
                                            fill="#C6CBD8"
                                          />
                                        </svg>
                                      </div>
                                      <p className="text-paragraph1 text-[1.4rem] leading-[2rem] font-normal">
                                        {formatDate(
                                          blog?.date,
                                          dateFormatsOptions.dayMonthYear
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  {/* Title */}
                                  <h2
                                    dangerouslySetInnerHTML={{
                                      __html: blog?.title,
                                    }}
                                    className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]"
                                  ></h2>
                                  {/* Description */}
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: blog?.excerpt,
                                    }}
                                    className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]"
                                  ></p>
                                </div>
                              </Link>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ),
        }}
      />
    </>
  );
};
export default CV_Portrait;
