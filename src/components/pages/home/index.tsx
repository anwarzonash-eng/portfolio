"use client";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import HomeSlider from "@/components/Sliders/HomeSlider";
import Faqs from "@/components/Faqs";
import FreeTrialPopup from "@/components/FreeTrialPopup";
import React, { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { downloadFile } from "@/hooks/downloadFile";
import OurBlogs from "@/components/OurBlogs";
import Newsletter from "@/components/Newsletter";
import PageRendering from "@/components/PageRendering";
import { scrollToSection } from "@/hooks/scrollToSection";
import SkillsContainer from "@/components/SkillsContainer";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useMediaQuery } from "react-responsive";
import ExperienceSection from "@/components/ExperienceSection";
import { sortByDate } from "@/utils/sortByDate";
import EducationComponent from "@/components/EducationComponent";
import HeroSection from "@/components/HomePageComponents/HeroSection";
import AboutSection from "@/components/HomePageComponents/AboutSection";
import ServicesSection from "@/components/HomePageComponents/ServicesSection";
import { useUniquePortfolios } from "@/hooks/useUniquePortfolios";

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
  const [error, setError] = useState<string | null>(null);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // Experieces Section Timeline View Logic:
  const [isMobile, setIsMobile] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // breakpoint: < lg
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const experiencesRef = useRef<HTMLDivElement>(null);
  // Filter skills based on listOfdata.skills_ids
  useEffect(() => {
    if (listOfdata?.skills_ids && listOfskills.length > 0) {
      const matchedSkills = listOfskills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
      );
      setListOfSkills(matchedSkills);
      // console.log("Filtered Skills:", matchedSkills); // Debug
    }
  }, [listOfdata, listOfskills]);

  // API Calls
  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    if (urlInfo) {
      reportsApiHandler({
        actionType: "home",
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

  console.log("Filtered List:", listOfskills); // Debug

  useEffect(() => {
    const skillsContainer = skillsContainerRef?.current;
    if (skillsContainer) {
      setIsOverflowing(
        skillsContainer?.scrollHeight > skillsContainer?.clientHeight
      );
    }
  }, [listOfdata?.skills_ids]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  // Scroll to experiences section
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    const expand = searchParams.get("expand");

    if (
      scrollTo === "experiences" &&
      experiencesRef.current &&
      listOfdata?.experiences_ids?.length > 0
    ) {
      // Calculate offset for fixed header (adjust this value based on your header height)
      const headerOffset = 100; // Example: 100px for a fixed header; adjust as needed
      const elementPosition =
        experiencesRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      // Scroll with offset to ensure section is fully in view
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (expand === "true") {
        setShowAllExperiences(true);
        // console.log("Expanding all experiences");
      }
    }
  }, [searchParams, listOfdata]);

  // how many to show initially
  const initialCount = isMobile ? 3 : 6;
  const experiences = [...(listOfdata?.experiences_ids || [])].sort(sortByDate);

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
        setError,
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
      // // console.log(listOfdata);
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

  // console.log("Lists Data", listOfdata);

  // Assign unique IDs to portfolios
  // console.log("Portfolios ID:", listOfdata?.portfolios_ids);

  const uniqueList = useUniquePortfolios(listOfdata?.portfolios_ids);

  return (
    <>
      <main className="w-full print:bg-[#a3ddd3]">
        <PageRendering
          props={{
            list: listOfdata,
            loading: loading,
            error,
            actualPage: (
              <>
                <FreeTrialPopup listOfdata={listOfdata} urlInfo={urlInfo} />

                <HeroSection
                  listOfdata={listOfdata}
                  skills={skillsGrouping(listOfskills)}
                  showAll={showAll}
                  setShowAll={setShowAll}
                  skillsContainerRef={skillsContainerRef}
                  isOverflowing={isOverflowing}
                  scrollToSection={scrollToSection}
                />

                <AboutSection
                  listOfdata={listOfdata}
                  urlInfo={urlInfo}
                  formatPhoneNumber={formatPhoneNumber}
                  downloadFile={downloadFile}
                />

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
                      <div className="flex items-center justify-center mt-[2rem] lg:hidden">
                        <div id="skills_ids" className="badge">
                          Skills
                        </div>
                      </div>
                      {/* Heading */}
                      <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] print:text-[3rem] print:mb-[1.5rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
                        {listOfdata?.companytype == "leewop"
                          ? "The skills & tools I am really good at:"
                          : " The skills, tools and technologies I am really good at:"}
                      </div>
                      {/* Skills Container */}

                      <SkillsContainer list={listOfskills} />
                    </div>{" "}
                  </>
                )}

                {/* Services Section Completed */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <ServicesSection
                      services={listOfdata.services.filter(
                        (service) => service?.type !== "main"
                      )}
                    />
                  )}

                {listOfdata &&
                  listOfdata.portfolios_ids &&
                  listOfdata.portfolios_ids.length > 0 && (
                    <>
                      {/* My Work Section Slider  */}
                      <section
                        id="myWork"
                        className="w-full mt-[4rem] lg:mt-[8rem] mb-[3.5rem] lg:mb-[7rem] print_p_m print:!pt-[3rem] print:bg-[#a3ddd3] print:break-before-page print:h-screen "
                      >
                        <div className="mainContainer   my-[5rem] print:my-[1rem] ">
                          {/* Badge */}
                          <div className="flex items-center justify-center lg:hidden">
                            <div className="badge">My Work</div>
                          </div>
                          {/* Heading */}
                          <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
                            Explore My Technical Endeavors
                          </div>

                          {/* Home Page Slider */}
                          <HomeSlider portfolios={uniqueList} />
                        </div>
                      </section>
                    </>
                  )}

                {/* Experience Section Completed */}
                {listOfdata &&
                  listOfdata.experiences_ids &&
                  listOfdata.experiences_ids.length > 0 && (
                    <section className="w-full print_p_m print:h-screen print:break-before-page print:bg-[#a3ddd3]">
                      <div className="mainContainer print:shadow-none print:!pt-[3rem]">
                        <div className="flex items-center justify-center lg:hidden">
                          <div className="badge">Professional Experience</div>
                        </div>
                        <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
                          My Professional Career Journey
                        </div>
                        {experiences
                          .slice(
                            0,
                            showAllExperiences
                              ? experiences.length
                              : initialCount
                          )
                          .map((experience, index) => (
                            <div ref={experiencesRef} key={experience.id}>
                              <ExperienceSection
                                key={index}
                                experience={experience}
                                index={index}
                                listOfskills={listOfskills}
                                listOfdata={listOfdata}
                                showMoreSkills={showMoreSkills}
                                setShowMoreSkills={setShowMoreSkills}
                                variant="timeline"
                              />
                            </div>
                          ))}
                        {!showAllExperiences &&
                          experiences.length > initialCount && (
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => setShowAllExperiences(true)}
                                className="btn-primary text-white py-[1rem] mt-[2rem] px-[3.4rem] text-[1.8rem] font-medium"
                              >
                                View Full Career Timeline
                              </button>
                            </div>
                          )}
                      </div>
                    </section>
                  )}

                {/* FAQ Section Completed */}
                <Faqs
                  urlInfo={urlInfo}
                  companyType={listOfdata?.companytype}
                  listOfdata={listOfdata}
                />

                {/* Education Section */}
                <div id="education" className="my-[5rem]">
                  <EducationComponent />
                </div>

                {/* Our Blogs */}
                <div id="ourBlogs" className="my-[5rem]">
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
