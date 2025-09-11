"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { store, useAppSelector } from "@/store";
import { setProfileUrlInfo, setProfileLoading } from "@/store/profileSlice";

import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";

import { getRoutesDetails } from "@/hooks/url";
import { modifiedContent } from "@/hooks/modifiedContent";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import { sortByDate } from "@/utils/sortByDate";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { contactDetails } from "@/data/JsonData";
import { socialLinks } from "@/data/JsonData";

import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";

import CVSideBar from "@/components/CV-Components/CV-SideBar";
import CVSkills from "@/components/CV-Components/CV-Skills";
import ExperienceSection from "@/components/ExperienceSection";
import CVPortfolio from "@/components/CV-Components/CV-Portfolio";
import CVEducation from "@/components/CV-Components/CV-Education";
import CVBlogs from "@/components/CV-Components/CV-Blogs";
import Newsletter from "@/components/Newsletter";
import PageRendering from "@/components/PageRendering";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import WebsiteLoader from "@/components/WebsiteLoader";
import Background from "@/components/background";
import { imageOptimizer } from "next/dist/server/image-optimizer";

const CV = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();

  // Global state
  const [urlInfo, setURLInfo] = useState<any>(null);
  const [listOfdata, setListOfData] = useState<any>(null);
  const [listOfskills, setListOfSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Skills expansion
  const [expanded, setExpanded] = useState(false);

  // Experiences section
  const [isMobile, setIsMobile] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState<any[]>([]);

  // Portfolio popup
  const [expandedPortfolio, setExpandedPortfolio] = useState(false);
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Blogs
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);

  // Skills
  const [showAll, setShowAll] = useState(false);
  const [showMoreSkillsForExperiences, setShowMoreSkillsForExperiences] =
    useState<{ [key: number]: boolean }>({});
  const [showMoreSkillsForPortfolios, setShowMoreSkillsForPortfolios] =
    useState<any[]>([]);

  // Redux profile data (if needed)
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // Derived values
  const experiences = [...(listOfdata?.experiences_ids || [])].sort(sortByDate);
  const initialVisibleItems = 18; // 3 rows × 6
  const visibleSkills = showAll
    ? listOfdata?.skills_ids ?? []
    : (listOfdata?.skills_ids ?? []).slice(0, initialVisibleItems);

  const skillsforCV = skillsGrouping(visibleSkills);
  const domain = listOfdata?.domain || "default-domain";

  // Check screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll on query param
  useEffect(() => {
    const sectionID = searchParams.get("sectionId");
    if (sectionID) SmoothScroll(sectionID);
  }, [listOfdata]);

  // API Calls
  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    if (urlInfo) {
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
        setLoading,
        setListOfData,
        setError,
      });
    }
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

  // Redux sync
  useEffect(() => {
    if (urlInfo) store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  // Styling
  useBodyBackgroundColor("#EFF5FD");

  // Modal handlers
  const openModal = (pictures, thumbnail, child_hero_banner) => {
    const portfolioImages = JSON.parse(pictures);
    const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
    setSelectedPorfolioPicturesforPopup(allImages);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

  // Generate HTML for skills (overview section)
  const rawHtml = modifiedContent(listOfdata?.skills, listOfskills, listOfdata);
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const items = Array.from(doc.querySelectorAll("li")).map(
    (li) => li.outerHTML
  );
  const visibleItems = !expanded ? items.slice(0, 4) : items;

  return (
    <>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
          error,
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
                  <CVSideBar
                    listOfdata={listOfdata}
                    urlInfo={urlInfo}
                    scrollToSection={(id) => {
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    contactDetails={contactDetails}
                    socialLinks={socialLinks}
                  />
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

                                    {items.length > 4 && (
                                      <button
                                        onClick={() =>
                                          setExpanded((prev) => !prev)
                                        }
                                        className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary border-transparent hover:border-primary  border border-solid duration-300 sm:max-w-[200px]"
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
                                <CVSkills
                                  skillsforCV={skillsforCV}
                                  listOfdata={listOfdata}
                                  initialVisibleItems={16}
                                />
                              </div>
                            )}

                            {/* Experience Section Problamatic Working */}
                            {listOfdata &&
                              listOfdata?.experiences_ids?.length > 0 && (
                                <div
                                  id="expericeSection"
                                  className="relative flex items-start print:break-before-page"
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
                                    {/* Title */}
                                    <div className="w-full">
                                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] pb-[2rem]">
                                        Experiences
                                      </h2>
                                    </div>
                                    <div className="">
                                      {[...(listOfdata?.experiences_ids || [])]
                                        .sort(sortByDate)
                                        .slice(
                                          0,
                                          showAllExperiences
                                            ? listOfdata.experiences_ids.length
                                            : isMobile
                                            ? 3 // 📱 show 3 on mobile
                                            : 6 // 💻 show 6 on desktop
                                        )
                                        .map((experience, index) => (
                                          <ExperienceSection
                                            key={index}
                                            experience={experience}
                                            index={index}
                                            listOfskills={listOfskills}
                                            listOfdata={listOfdata}
                                            showMoreSkills={showMoreSkills}
                                            setShowMoreSkills={
                                              setShowMoreSkills
                                            }
                                            variant="list"
                                          />
                                        ))}
                                    </div>

                                    {/* View full career timeline button */}
                                    {listOfdata?.experiences_ids?.length >
                                      (isMobile ? 3 : 6) &&
                                      !showAllExperiences && (
                                        <div className="flex justify-center mt-6">
                                          <button
                                            onClick={() =>
                                              setShowAllExperiences(true)
                                            }
                                            className="bg-primary py-[0.8rem] px-[2.4rem] text-white hover:bg-white border border-primary hover:text-primary rounded-[2rem] text-[1.6rem] font-medium transition-colors"
                                          >
                                            View Full Career Timeline
                                          </button>
                                        </div>
                                      )}
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
                                            <CVPortfolio
                                              portfolio={portfolio}
                                              index={index}
                                              listOfskills={listOfskills}
                                              listOfdata={listOfdata}
                                              skillsForPortfolios={
                                                skillsForPortfolios
                                              }
                                              showMoreSkillsForPortfolios={
                                                showMoreSkillsForPortfolios
                                              }
                                              setShowMoreSkillsForPortfolios={
                                                setShowMoreSkillsForPortfolios
                                              }
                                              openModal={openModal}
                                              modifiedContent={modifiedContent}
                                              expandedPortfolio={
                                                expandedPortfolio
                                              }
                                              setExpandedPortfolio={
                                                setExpandedPortfolio
                                              }
                                            />
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
                                  <CVEducation
                                    educationList={
                                      listOfdata?.education_ids || []
                                    }
                                  />
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
                              <CVBlogs
                                blogsList={blogsList}
                                loadingblogs={loadingblogs}
                                domain={domain}
                              />
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
