"use client";

import Image from "next/image";
import Link from "next/link";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import React, { useEffect, useState } from "react";
import PortfolioPopUp from "@/components/PortfolioPopUp";
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
import Newsletter from "@/components/Newsletter";
import PageRendering from "@/components/PageRendering";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import Background from "@/components/background";
import { useAppSelector } from "@/store";
import Footer from "@/components/layouts/footer/page";
import Header from "@/components/layouts/header/page";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import { getImageForIndex } from "@/utils/getImageForIndex";
import ExperienceDescription from "@/components/ExperienceDescription";
type SkillType = {
  title: string;
  url?: string;
  // add other properties if they exist
};
const CV = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [expandedPortfolio, setExpandedPortfolio] = useState(false);
  // Logic For Overview & Skill Section
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size (mobile or not)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate modified HTML content
  const rawHtml = modifiedContent(listOfdata?.skills, listOfskills, listOfdata);

  // Extract <li> items
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const items = Array.from(doc.querySelectorAll("li")).map(
    (li) => li.outerHTML
  );

  // Decide how many to show
  const visibleItems = isMobile && !expanded ? items.slice(0, 4) : items;

  useEffect(() => {
    const sectionID = searchParams.get("sectionId");
    if (!sectionID) return;
    // Example: URL query ya koi condition ke basis par scroll karo
    console.log("Section ID:", sectionID);
    SmoothScroll(sectionID);
  }, [listOfdata]);

  const [loading, setLoading] = useState(true);
  const domain = listOfdata?.domain || "default-domain";

  console.log("Rpeorts API Data: ", listOfdata);

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
    ? listOfdata?.skills_ids ?? []
    : (listOfdata?.skills_ids ?? []).slice(0, initialVisibleItems);

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

  useBodyBackgroundColor("#EFF5FD");

  // Function to open the modal
  const openModal = (pictures, thumbnail, child_hero_banner) => {
    const portfolioImages = JSON.parse(pictures);
    const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
    setSelectedPorfolioPicturesforPopup(allImages);

    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

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

  return (
    <>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
          actualPage: (
            <div className="bg-[#EFF5FD]">
              <section 
              className="w-full relative print:hidden"
              // className="hidden"
              >
                <div className="mainContainer h-[60.7rem] lg:h-[65rem] print:h-auto  w-full relative ">
                  {/* Background SVG */}
                  <Background />
                  {/* Badge Heading and Paara Text */}
                  <div className="max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] relative z-20">
                    {/* Badge */}

                    {/* Heading */}
                    <div className="text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem]">
                      CV
                    </div>
                    <div className="items-start justify-strat gap-[4rem] hidden w-full">
                      <img
                        src={listOfdatas?.profile_photo_1}
                        alt=""
                        className="w-[145px] h-[143px] rounded-full"
                      />
                      <div className="flex items-start justify-start flex-col">
                        <h2 className="text-[5rem] font-bold">
                          {" "}
                          {listOfdata?.name}
                        </h2>
                        <div className="text-[3rem] font-medium flex items-center justify-center flex-wrap gap-[3px]">
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
                    {loading && <WebsiteLoader height="h-[30rem]" />}
                  </div>
                </div>
              </section>
              {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
                <PortfolioPopUp
                  isModalOpen={isModalOpen}
                  closeModal={closeModal}
                  portfolioImages={selectedPorfolioPicturesforPopup}
                />
              )}

              <div className="mt-[-40rem] print:mt-0 max-w-[1550px] print:max-w-[1550px] w-full mx-auto px-[1.5rem]">
                <div className="bg-white flex flex-col lg:flex-row gap-[4rem]  rounded-[1.4rem] relative pb-[5rem] lg:pb-[7rem] px-[2rem] lg:px-[3rem] mb-[10rem] lg:mb-[9.6rem]">
                  {/* Side Panel */}
                  <aside
                   className="lg:max-w-[40rem] print:w-full print:break-before-page w-full  flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover pb-[2rem] pt-[5rem] print:pt-[2rem] px-[2rem] lg:px-[3rem]"
                  // className="hidden"
                  >
                    <div className="flex flex-col items-center">
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
                              className="text-heading text-[2.5rem] text-center lg:text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem]"
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
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center print:w-full">
                          {/* Info */}
                          <p className="my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center">
                            Reach out today and I'll provide you with my
                            comprehensive onboarding package designed for
                            full-time employment or Contract Based Jobs. This
                            package covers various aspects that potential
                            employers often inquire about, such as my salary
                            expectations and the seamless integration process
                            into your company.
                          </p>
                        </div>
                      </div>
                      {/* Divider */}
                      <hr className="w-full h-[0.2rem] bg-[#E2E6EE] print:hidden mb-[4rem] inline-block" />
                      {/* Availability */}
                      <div className="mb-[4rem] w-full print:hidden text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden">
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
                        {!urlInfo?.u && (
                          <>
                            {listOfdata?.calendly_link ? (
                              <Link
                                target="_blank"
                                href={listOfdata?.calendly_link || "#"}
                              >
                                <button className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300">
                                  Schedule Call
                                </button>
                              </Link>
                            ) : (
                              <button
                                onClick={() => scrollToSection("contact")}
                                className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300"
                              >
                                Hire Me
                              </button>
                            )}
                          </>
                        )}
                      </div>
                      {/* Email, Website, Phone, Location */}
                      <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
                        {/* Iterate through the contact details array */}
                        {contactDetails(listOfdata)
                          .filter(({ alt }) =>
                            urlInfo?.u ? alt === "Location" : true
                          )
                          .map((contact, index) => (
                            <Link
                              key={index}
                              href={contact.href || "#"}
                              className="flex items-center gap-[1.78rem] p-2 hover:bg-[#E2E6EE] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
                            >
                              {contact?.iconSrc && (
                                <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                                  <Image
                                    src={contact?.iconSrc}
                                    height={24}
                                    width={24}
                                    alt={contact.alt}
                                  />
                                </div>
                              )}
                              <div className="flex flex-col gap-[0.45rem]">
                                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                                  {contact.type}
                                </p>

                                <Link
                                  target="_blank"
                                  href={contact.href || "#"}
                                  className="hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                                >
                                  {contact.value}
                                </Link>
                              </div>
                            </Link>
                          ))}
                      </div>

                      {/* Divider */}
                      <hr className="w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] sm:hidden lg:inline-block" />

                      {/* Work Proof */}
                      <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
                        {/* Title */}
                        <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
                          Work Proof
                        </h3>
                        {/* Iterating on Icons */}
                        {socialLinks(listOfdata)
                          .filter(({ alt }) =>
                            urlInfo?.u
                              ? alt === "Github" ||
                                alt === "Linkedin" ||
                                alt === "Upwork"
                              : true
                          )
                          .map((social, index) => (
                            <>
                              {social?.href && (
                                <Link
                                  target="_blank"
                                  href={social.href || "#"}
                                  key={index}
                                  className="flex items-center gap-[1.78rem] p-2 hover:bg-[#E2E6EE] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
                                >
                                  {social?.iconSrc && (
                                    <Image
                                      src={social?.iconSrc}
                                      height={35}
                                      width={35}
                                      alt={social.alt}
                                    />
                                  )}
                                  <div className="flex flex-col gap-[0.45rem]">
                                    <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                                      {social.platform}
                                    </p>
                                    <div className="break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading">
                                      {social.username}
                                    </div>
                                  </div>
                                </Link>
                              )}
                            </>
                          ))}
                      </div>

                      {/* Only Display on The Devices Between Small To Large */}
                      <div className="hidden sm:flex lg:hidden w-full gap-[2rem] items-start">
                        {/* Email, Website, Phone, Location */}
                        <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
                          {contactDetails(listOfdata)
                            .filter(({ alt }) =>
                              urlInfo?.u ? alt === "Location" : true
                            )
                            .map((contact, index) => (
                              <Link
                                key={index}
                                target="_blank"
                                href={contact.href || "#"}
                                className="flex items-center gap-[1.78rem] p-2 hover:bg-[#E2E6EE] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
                              >
                                {contact.iconSrc && (
                                  <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                                    <Image
                                      src={contact.iconSrc}
                                      height={24}
                                      width={24}
                                      alt={contact.alt}
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
                              </Link>
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
                  </aside>
                  {/* Right Content Section */}
                  <section className="w-full mt-[-2rem] lg:mt-0 md:pt-[7rem]">
                    {/* 10 Years Experience */}
                    <div
                      dangerouslySetInnerHTML={{ __html: listOfdata?.tag_line }}
                      className="py-[5rem] px-[3.4rem] print:hidden block primaryGradient text-white text-[2.2rem] leading-[3.1rem] font-bold rounded-[1rem] text-center"
                      // className="hidden"
                    ></div>

                    {/* Timeline Section */}
                    <div className=" w-full print:mt-[5rem] print:pt-[5rem]">
                      {/* Timeline */}
                      <div className="flex items-center justify-center mt-[4rem] lg:mt-[6rem]">
                        <div className="relative">
                          {/* Vertical line */}
                          <div className="absolute left-0 top-0 w-[1.5px] h-[100%] bg-border print:hidden" />
                          {/* Timeline items Container */}
                          <div className="space-y-[1rem] lg:space-y-[2rem]">
                            {/* Overview & Skills Timeline item ✅ */}
                            {listOfdata?.skills && (
                              <div
                                className="relative flex items-start print:break-before-page"
                                // className="hidden"
                              >
                                {/* Dot */}
                                <div className="absolute top-0 left-[-1.3rem] block  print:hidden">
                                  <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                    <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                  </div>
                                </div>
                                <div className="  overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print:break-before-page print_p_m">
                                  {/* Title */}
                                  <h2 className="text-heading leading-[3.56rem] text-[2.5rem] lg:text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                                    Overview & Skills
                                  </h2>

                                  {/* <div
                                    className="text-heading services_main list-div text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem] list-inside print:p-0"
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        listOfdata?.skills,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                  ></div> */}
                                  {/* New Code With Mobile Check */}
                                  <div
                                    className="text-heading services_main list-div text-[1.6rem] leading-[2.4rem] 
     flex flex-col gap-[1rem] mb-[5rem] list-inside print:p-0 w-full max-w-full"
                                  >
                                    <ul
                                      dangerouslySetInnerHTML={{
                                        __html: visibleItems.join(""),
                                      }}
                                    />

                                    {isMobile && items.length > 4 && (
                                      <button
                                        onClick={() =>
                                          setExpanded((prev) => !prev)
                                        }
                                        className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300"
                                      >
                                        {expanded ? "Read Less" : "Read More"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Skills Timeline item ✅ */}
                            {listOfdata?.skills_ids && (
                              <div
                                id="skillsSection"
                                className="relative flex items-start print:break-before-page"
                                // className="hidden"
                              >
                                {/* Dot */}
                                <div className="absolute top-0 left-[-1.3rem] block  print:hidden">
                                  <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                    <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                  </div>
                                </div>
                                <div className="print:mt-[4rem] w-full">
                                  {/* Title */}
                                  <h2 className="  overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                                    Skills
                                  </h2>
                                  <div className="flex flex-col items-center w-full">
                                    <div
                                      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 min-[1220px]:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 print:grid-cols-5 
                                      gap-[1rem] xl:gap-[1.5rem] mx-auto justify-center items-center ml-[1rem] overflow-hidden"
                                    >
                                      {Object?.values(skillsforCV)?.map(
                                        (group, groupIndex) => (
                                          <>
                                            {group.map((skill, i) => (
                                              <div
                                                key={i}
                                                style={{
                                                  animationDelay: `${i * 0.2}s`,
                                                }}
                                                className="mx-auto mb-[2rem] xl:mb-[4rem] flex flex-col items-center justify-start gap-[0.4rem] xl:gap-[0.8rem] max-w-[15rem] lg:max-w-[19rem] w-full animate-fadeIn opacity-0"
                                              >
                                                {skill.icon && (
                                                  <div
                                                    className="flex items-center justify-center 
                                                    max-h-[6.4rem] max-w-[6.4rem] h-full w-full"
                                                  >
                                                    <Image
                                                      src={skill?.icon}
                                                      alt={skill?.title}
                                                      height={64}
                                                      width={64}
                                                      className="object-cover rounded-full w-full h-full"
                                                    />
                                                  </div>
                                                )}
                                                <p className="mt-[1.5rem] text-paragraph1 text-center line-clamp-1 text-[1.3rem] min-[500px]:text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis">
                                                  {skill.title}
                                                </p>
                                              </div>
                                            ))}
                                          </>
                                        )
                                      )}
                                    </div>
                                    {listOfdata?.skills_ids?.length >
                                      initialVisibleItems && (
                                      <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="px-[4rem] print:hidden py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight mx-auto"
                                      >
                                        {showAll
                                          ? "Show Less Skills"
                                          : "Show More Skills"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Experience Section Problamatic Working */}
                            {listOfdata &&
                              listOfdata?.experiences_ids?.length > 0 && (
                                <div
                                  id="expericeSection"
                                  className="relative flex items-start print:break-before-page"
                                  // className="hidden"
                                >
                                  {/* Dot */}
                                  <div className="absolute top-0 left-[-1.3rem]">
                                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center mt-[3rem] mb-[2rem]">
                                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                    </div>
                                  </div>

                                  <div
                                    className="ml-[2rem] md:ml-[3rem] 
                                    lg:ml-[5rem] print_p_m"
                                  >
                                    {/* Title - Hidden in print */}
                                    <div className="w-full mb-[3.5rem]">
                                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] pb-[2rem]">
                                        Experiences
                                      </h2>
                                    </div>

                                    {listOfdata?.experiences_ids &&
                                      [...listOfdata.experiences_ids]
                                        ?.sort((a, b) => {
                                          const yearA = new Date(
                                            a.ending_Date
                                          ).getFullYear();
                                          const yearB = new Date(
                                            b.ending_Date
                                          ).getFullYear();
                                          if (yearA !== yearB)
                                            return yearB - yearA;
                                          const monthA = new Date(
                                            a.ending_Date
                                          ).getMonth();
                                          const monthB = new Date(
                                            b.ending_Date
                                          ).getMonth();
                                          return monthB - monthA;
                                        })
                                        ?.map((experience, index) => {
                                          if (isPrinting && index >= 2) {
                                            return null;
                                          }

                                          const skillsforExpereinces =
                                            skillsGrouping(
                                              showMoreSkillsForExperiences[
                                                index
                                              ]
                                                ? experience?.skills
                                                : experience?.skills?.slice(
                                                    0,
                                                    15
                                                  )
                                            );
                                          return (
                                            <div
                                              className="relative flex items-start mt-[2rem] print-section"
                                              key={index}
                                            >
                                              {/* Dot */}
                                              <div
                                                className="absolute top-0 left-[-3.5rem] 
                                                md:left-[-4.2rem] lg:left-[-6.2rem] block"
                                              >
                                                <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                                  <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                                </div>
                                              </div>

                                              <div className="w-full">
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
                                                <div className="bg-[#F7F9FC] p-[1.5rem] 
                                                lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]">
                                                  <div className="flex items-center flex-wrap 
                                                  min-[400px]:text-nowrap gap-[1.5rem] md:justify-between">
                                                    {/* About Content */}
                                                    <Link
                                                      href={
                                                        experience?.company_website ||
                                                        "#"
                                                      }
                                                      target="_blank"
                                                      className="flex gap-[1rem] p-2 hover:bg-[#D1E9FF] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] 
                                                      hover:drop-shadow-2xl"
                                                    >
                                                      {experience?.thumbnail && (
                                                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                                                          <Image
                                                            src={
                                                              experience?.thumbnail
                                                            }
                                                            height={40}
                                                            width={40}
                                                            alt="Logo Mark"
                                                            className="h-full w-full object-cover"
                                                          />
                                                        </div>
                                                      )}

                                                      <div>
                                                        <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                                                          {
                                                            experience.company_name
                                                          }
                                                        </p>
                                                        <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                                                          {experience.title}
                                                        </h3>
                                                        {experience?.company_website && (
                                                          <div className="flex items-center gap-[0.52rem]">
                                                            {/* <Image
                                                              src={
                                                                "/images/link.svg"
                                                              }
                                                              height={18}
                                                              width={18}
                                                              alt="Link"
                                                            /> */}
                                                            <Link
                                                              href={
                                                                experience?.company_website ||
                                                                "#"
                                                              }
                                                              className="text-[#1F4FE1] break-all text-[1.4rem] lg:text-[1.6rem] font-normal leading-normal"
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
                                                    </Link>

                                                    {/* Link */}
                                                    <div className="flex justify-center md:justify-end w-full md:w-auto print:hidden">
                                                      <div className="flex flex-col-reverse gap-[1rem] items-center justify-center">
                                                        <div className="py-[1rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] max-w-max">
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
                                                        </div>
                                                        {experience.company_website.includes(
                                                          "upwork"
                                                        ) && (
                                                          <Link
                                                            href={
                                                              experience.company_website
                                                            }
                                                            className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] 
                                                            rounded-[1.8rem] text-[1.4rem] font-medium leading-normal 
                                                            w-full text-center"
                                                          >
                                                            View My Freelance
                                                            Profile
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
                                                    className="mt-[2rem] list- text-[1.6rem] font-medium text-paragraph1"
                                                  ></p>
                                                  {/* New Code For Experiece Section */}
                                                  <ExperienceDescription
                                                    experience={experience}
                                                    listOfskills={listOfskills}
                                                    listOfdata={listOfdata}
                                                    index={index}
                                                  />

                                                  {/* Skills Badges */}
                                                  <div className="mt-[2.2rem]">
                                                    <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                                                      AREAS OF EXPERTISE I'VE
                                                      WORKED IN
                                                    </h4>
                                                    <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                                                      {Object?.values(
                                                        skillsforExpereinces
                                                      )?.map(
                                                        (
                                                          group: SkillType[],
                                                          groupIndex: number // Explicitly type the group
                                                        ) => (
                                                          <React.Fragment
                                                            key={groupIndex}
                                                          >
                                                            {group.map(
                                                              (
                                                                skill: SkillType,
                                                                i: number // Explicitly type skill
                                                              ) => (
                                                                <Link
                                                                  href={
                                                                    skill?.url ||
                                                                    "#"
                                                                  }
                                                                  key={i}
                                                                  className="hover:bg-primary py-[0.4rem] px-[2rem] hover:text-white bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal"
                                                                >
                                                                  {skill.title}
                                                                </Link>
                                                              )
                                                            )}
                                                          </React.Fragment>
                                                        )
                                                      )}
                                                      <ShowmoreSkills
                                                        props={{
                                                          list: experience?.skills,
                                                          index,
                                                          setShowMoreSkills:
                                                            setShowMoreSkillsForExperiences,
                                                          showMoreSkills:
                                                            showMoreSkillsForExperiences,
                                                          className:
                                                            "bg-primary py-[0.4rem] px-[2rem] print:hidden text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border hover:border-primary hover:border-solid hover:text-primary rounded-[1.2rem] text-[1.2rem] font-medium leading-normal",
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                  </div>
                                </div>
                              )}

                            {/* Portfolio Timeline item Problamatic */}
                            {listOfdata &&
                              listOfdata?.portfolios_ids?.length > 0 && (
                                <div
                                  id="portfolioSection"
                                  className="relative flex items-start print:break-before-page"
                                  // className="hidden"
                                >
                                  {/* Dot */}
                                  <div className="absolute top-0 left-[-1.3rem] block print:hidden ">
                                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center mt-[3rem] mb-[2rem]">
                                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                    </div>
                                  </div>
                                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print_p_m print:!pt-[2rem] ">
                                    {/* Title */}
                                    <div className="flex items-center print:hidden justify-between w-full my-[3rem]">
                                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem]">
                                        Portfolios
                                      </h2>
                                      <Link
                                        href={"/portfolio"}
                                        className=" flex items-center gap-[0.6rem] group cursor-pointer mt-1.5"
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
                                      </Link>
                                    </div>
                                    {listOfdata?.portfolios_ids?.map(
                                      (portfolio, index) => {
                                        if (isPrinting && index >= 2) {
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
                                          <div
                                            className="relative flex items-start mt-[2rem] print-section"
                                            key={index}
                                          >
                                            {/* Dot */}
                                            <div className="absolute top-0 left-[-3.2rem] md:left-[-4.2rem] lg:left-[-6.2rem] block print:hidden">
                                              <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                                                <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                              </div>
                                            </div>
                                            <div className="w-full">
                                              <h2 className="text-heading print:block hidden  leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] print:p-0 pb-[2rem]">
                                                Portfolios
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
                                                  new Date(
                                                    portfolio.ending_Date
                                                  ).getFullYear()
                                                )
                                                  ? portfolio.ending_Date
                                                  : formatDate(
                                                      portfolio.ending_Date,
                                                      dateFormatsOptions.onlyYear
                                                    )}
                                              </h2>
                                              {/* Card */}
                                              <div className="max-lg:p-[1.5rem] print_p_m print:!mt-[2rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                                                {/* Content */}
                                                <div className="w-full">
                                                  <div className="">
                                                    <div className="">
                                                      <div className="flex items-center justify-between flex-col-reverse xl:flex-row">
                                                        <div>
                                                          <Link
                                                            href={
                                                              portfolio?.link ||
                                                              "#"
                                                            }
                                                            target="_blank"
                                                            className="flex gap-[1rem] p-2 hover:bg-[#D1E9FF] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
                                                          >
                                                            {portfolio?.company_icon && (
                                                              <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block">
                                                                <Image
                                                                  src={
                                                                    portfolio?.company_icon
                                                                  }
                                                                  alt="Case"
                                                                  height={34}
                                                                  width={34}
                                                                  className="h-[2rem] w-[2rem]"
                                                                />
                                                              </div>
                                                            )}

                                                            {/* Heading */}
                                                            <div>
                                                              <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                                                {
                                                                  portfolio?.title
                                                                }
                                                              </h1>

                                                              <Link
                                                                href={
                                                                  portfolio?.link ||
                                                                  "#"
                                                                }
                                                                className="text-[#1F4FE1] break-all text-[1.4rem] lg:text-[1.6rem] font-normal leading-normal"
                                                              >
                                                                {
                                                                  portfolio?.link
                                                                    ?.replace(
                                                                      /^(https?:\/\/)?(www\.)?/,
                                                                      ""
                                                                    )
                                                                    .split(
                                                                      "/"
                                                                    )[0]
                                                                }
                                                              </Link>
                                                            </div>
                                                          </Link>

                                                          <p
                                                            className="text-primary text-[1.6rem] leading-[150%] font-normal mt-[1rem]"
                                                            dangerouslySetInnerHTML={{
                                                              __html:
                                                                modifiedContent(
                                                                  portfolio?.tagline_2,
                                                                  listOfskills,
                                                                  listOfdata
                                                                ),
                                                            }}
                                                          ></p>
                                                        </div>

                                                        {/* slider image */}
                                                        {portfolio?.thumbnail && (
                                                          <div className="md:ms-[2rem] flex items-center gap-2 flex-col lg:w-[30rem] float-right w-full rounded-[1.2rem] print:hidden relative min-w-[28rem]">
                                                            {/* Container with fixed aspect ratio (16:9 example) */}
                                                            <div className="relative pt-[56.25%] w-full">
                                                              {" "}
                                                              {/* 16:9 aspect ratio */}
                                                              <Image
                                                                src={
                                                                  portfolio.thumbnail
                                                                }
                                                                alt="Project Image"
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, 30rem"
                                                                className="rounded-[1.2rem] object-fill absolute top-0 left-0 w-full h-full"
                                                                priority={
                                                                  index === 0
                                                                } // Only prioritize first image
                                                              />
                                                            </div>
                                                            {/* Button remains the same */}
                                                            <button
                                                              onClick={() =>
                                                                openModal(
                                                                  portfolio?.pictures,
                                                                  portfolio?.thumbnail,
                                                                  portfolio?.child_hero_banner
                                                                )
                                                              }
                                                              className="my-[1rem]
                                                              py-[1rem] px-[2.5rem] rounded-[0.7rem] border-2 border-solid border-[#fff] text-[1.6rem] font-medium max-w-max backdrop-blur-[0.8rem] duration-300 bg-primary hover:bg-opacity-80 text-white hover:bg-white hover:text-primary hover:border-1 hover:border-primary"
                                                            >
                                                              Explore the
                                                              Gallery
                                                            </button>
                                                          </div>
                                                        )}
                                                      </div>
                                                      {/* Heading and Para */}
                                                      <div className="text-heading">
                                                        {/* Para */}

                                                        {/* <p
                                                          className=" text-[1.6rem] leading-[150%] font-normal mt-[1rem]"
                                                          dangerouslySetInnerHTML={{
                                                            __html:
                                                              modifiedContent(
                                                                portfolio?.tagline_1,
                                                                listOfskills,
                                                                listOfdata
                                                              ),
                                                          }}
                                                        ></p> */}

                                                        {/* Portfolio Read More Section */}
                                                        <div className="mb-2">
                                                          {expandedPortfolio && (
                                                            <p
                                                              dangerouslySetInnerHTML={{
                                                                __html:
                                                                  modifiedContent(
                                                                    portfolio.features_short,
                                                                    listOfskills,
                                                                    listOfdata
                                                                  ),
                                                              }}
                                                              className="mt-[2rem] list-div-portfolio1 pl-[2rem]"
                                                            ></p>
                                                          )}

                                                          <button
                                                            onClick={() =>
                                                              setExpandedPortfolio(
                                                                (prev) => !prev
                                                              )
                                                            }
                                                            className={`${expandedPortfolio
                                                              ? "mt-[-3rem]"
                                                              : "mt-[1rem]"}  bg-primary print:hidden block py-[0.4rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border hover:border-primary hover:border-solid hover:text-primary  rounded-[1.2rem] text-[1.2rem] font-medium leading-normal`}
                                                          >
                                                            {expandedPortfolio
                                                              ? "Read Less"
                                                              : "Read More"}
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* Image */}
                                                  </div>
                                                  {/* Line */}
                                                  {/* <hr className='w-full my-[2.1rem] h-px bg-border' /> */}
                                                  {/* List */}
                                                  {/* <div
                                                dangerouslySetInnerHTML={{
                                                  __html: modifiedContent(
                                                    portfolio.features_short,
                                                    listOfskills,
                                                    listOfdata
                                                  ),
                                                }}
                                                className='mt-[2rem] list-div-portfolio text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]'
                                                ></div> */}
                                                  {/* Skills Badges */}
                                                  <div>
                                                    <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                                                      AREAS OF EXPERTISE I'VE
                                                      WORKED IN
                                                    </h4>
                                                    <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]  flex-wrap text-[1.2rem]">
                                                      {Object?.values(
                                                        skillsForPortfolios
                                                      )?.map(
                                                        (group, groupIndex) => (
                                                          <React.Fragment
                                                            key={groupIndex}
                                                          >
                                                            {group.map(
                                                              (skill, i) => (
                                                                <Link
                                                                  href={
                                                                    skill?.url ||
                                                                    "#"
                                                                  }
                                                                  className="hover:text-white hover:bg-primary py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                                                >
                                                                  {skill?.title}
                                                                </Link>
                                                              )
                                                            )}

                                                            {showMoreSkillsForPortfolios[
                                                              index
                                                            ] && (
                                                              <div className="w-full mb-[1px]" />
                                                            )}
                                                          </React.Fragment>
                                                        )
                                                      )}
                                                      <ShowmoreSkills
                                                        props={{
                                                          list: portfolio?.skills,
                                                          index,
                                                          setShowMoreSkills:
                                                            setShowMoreSkillsForPortfolios,
                                                          showMoreSkills:
                                                            showMoreSkillsForPortfolios,
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                  <hr className="w-full my-[2.4rem] h-px bg-border" />
                                                  <div className="flex items-center flex-wrap max-sm:flex-col print:hidden max-md:items-start gap-[1.4rem]">
                                                    <Link
                                                      href={`/portfolio/${portfolio.id}`}
                                                      className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 w-full md:max-w-max text-center rounded-[0.6rem]"
                                                    >
                                                      View Details
                                                    </Link>
                                                    {listOfdata?.companytype !==
                                                      "leewop" && (
                                                      <Link
                                                        href={portfolio?.link}
                                                        className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] w-full md:max-w-max text-center whitespace-nowrap"
                                                      >
                                                        Launch Project - Live
                                                        Preview
                                                      </Link>
                                                    )}
                                                    {portfolio?.has_testimonial ==
                                                      true && (
                                                      <Link
                                                        href={"#"}
                                                        className="text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center"
                                                      >
                                                        Check Client Testimonial
                                                      </Link>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )}

                            {/* Education Timeline item */}
                            {listOfdata &&
                              listOfdata?.education_ids?.length > 0 && (
                                <div
                                  className="relative flex items-start print:break-before-page print:w-full print:flex print:items-center print:justify-center"
                                  // className="hidden"
                                >
                                  {/* Dot */}
                                  <div className="absolute top-0 left-[-1.3rem]  block print:hidden ">
                                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center my-[3rem] ">
                                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                    </div>
                                  </div>
                                  <div className="   overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print_p_m print:flex print:flex-col items-start justify-center">
                                    {/* Title */}
                                    <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                                      Education
                                    </h2>
                                    {/* for desktop */}
                                    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-[1.2rem] w-full print:hidden">
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
                                                new Date(
                                                  edu.degree_end_date
                                                ).getFullYear()
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

                                    {/* for print */}
                                    <div className=" gap-[2.2rem] w-full print:flex flex-col items-center justify-center hidden ">
                                      {listOfdata?.education_ids?.map((edu) => (
                                        <div
                                          key={edu.id}
                                          className="p-[2rem] w-full max-w-[100%]  rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
                                        >
                                          <div className="flex items-center gap-[1.8rem] ">
                                            {edu?.thumbnail && (
                                              <Image
                                                src={edu?.thumbnail}
                                                height={34}
                                                width={34}
                                                alt={edu.university_name}
                                              />
                                            )}
                                            <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                                              {edu.university_name}
                                            </h3>
                                          </div>
                                          {/* Divider */}
                                          <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />
                                          <div className="">
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
                                                new Date(
                                                  edu.degree_end_date
                                                ).getFullYear()
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
                                    {/* <div className=" hidden print:!block w-full ">
                                      <Footer />
                                    </div>  */}
                                  </div>
                                </div>
                              )}

                            {/* Blogs Timeline item */}
                            <div
                              id="blogsSection"
                              className="relative flex items-start print:hidden"
                              // className="hidden"
                            >
                              {/* Dot */}
                              <div className="absolute top-0 left-[-1.3rem]  block print:hidden ">
                                <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center my-[3rem]">
                                  <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                                </div>
                              </div>
                              <div className="   overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print:break-before-page  w-full">
                                {/* Title */}
                                <div className="flex items-center justify-between mb-5">
                                  <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                                    Blogs
                                  </h2>
                                  <Link
                                    href={"/blog-listing"}
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
                                  </Link>
                                </div>
                                {/* Map Through the Blogs Array */}
                                {loadingblogs ? (
                                  <WebsiteLoader height="h-[20rem]" />
                                ) : (
                                  <>
                                    {blogsList
                                      ?.slice(0, Math.min(3, blogsList.length))
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
                                                src={getImageForIndex(
                                                  domain,
                                                  index
                                                )}
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
                                            <Link
                                              href={`/blog-listing/${blog?.id}`}
                                              className="duration-300 inline-flex items-center gap-[0.8rem] group"
                                            >
                                              <p className="text-primary text-[1.4rem] font-medium leading-[2.4rem]">
                                                Read Now
                                              </p>
                                              {/* Arrow */}
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 25 25"
                                                fill="none"
                                                className="group-hover:translate-x-[1rem] duration-300"
                                              >
                                                <path
                                                  d="M4.02783 12.8789H20.5278"
                                                  stroke="#00473C"
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M13.7778 6.12891L20.5278 12.8789L13.7778 19.6289"
                                                  stroke="#00473C"
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Link>
                                          </div>
                                        </Link>
                                      ))}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              {!urlInfo?.u && (
                <div className="w-full mb-[5rem]">
                  <Newsletter listOfdata={listOfdata} />
                </div>
              )}
            </div>
          ),
        }}
      />
    </>
  );
};
export default CV;
