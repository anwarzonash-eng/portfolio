"use client";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import HomeSlider from "@/components/Sliders/HomeSlider";
import Faqs from "@/components/Faqs";
import FreeTrialPopup from "@/components/FreeTrialPopup";
import React, { useEffect, useRef, useState, useMemo } from "react";
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

  // typed states
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [urlInfo, setURLInfo] = useState<any | null>(null);
  const [listOfdata, setListOfData] = useState<any | null>(null);

  // FIX: keep API result separate from filtered display list
  const [allSkills, setAllSkills] = useState<any[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [showAll, setShowAll] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // Experiences Section Timeline View Logic:
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // breakpoint: < lg
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // REF moved to section wrapper so scrollTo works predictably (FIX)
  const experiencesRef = useRef<HTMLElement | null>(null);

  // FIX: derive filtered skills from allSkills — do not overwrite allSkills
  useEffect(() => {
    if (listOfdata && handleSkillsApiCall) {
      // handleSkillsApiCall expects an object with setListOfSkills
      handleSkillsApiCall({ setListOfSkills: setAllSkills });
    }
  }, [listOfdata]);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some(
          (dataSkill: any) => dataSkill.id === skill.id
        )
      );
      setFilteredSkills(matchedSkills);
    } else {
      setFilteredSkills([]);
    }
  }, [listOfdata, allSkills]);

  // FIX: single overflow check, trigger when filtered skills change (removed duplicate)
  useEffect(() => {
    const skillsContainer = skillsContainerRef?.current;
    if (skillsContainer) {
      setIsOverflowing(
        skillsContainer.scrollHeight > skillsContainer.clientHeight
      );
    }
  }, [filteredSkills]);

  // Scroll to experiences section
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    const expand = searchParams.get("expand");

    if (
      scrollTo === "experiences" &&
      experiencesRef.current &&
      listOfdata?.experiences_ids?.length > 0
    ) {
      const headerOffset = 100;
      const elementPosition =
        experiencesRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (expand === "true") {
        setShowAllExperiences(true);
      }
    }
  }, [searchParams, listOfdata]);

  // how many to show initially
  const initialCount = isMobile ? 3 : 6;
  // memoize experiences array sorted by date
  const experiences = useMemo(
    () => [...(listOfdata?.experiences_ids || [])].sort(sortByDate),
    [listOfdata]
  );

  // console.log("URL Info:", urlInfo);

  // Use getRoutesDetails
  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
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
    if (urlInfo) store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  // grouping used elsewhere — keep as is
  const skills = skillsGrouping(listOfdata?.skills_ids);
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
                  // FIX: pass filteredSkills to show only profile-specific skills
                  skills={skillsGrouping(filteredSkills)}
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
                  <div
                    id="skillSection"
                    className="mainContainer print:!pt-[4rem] print:my-[0rem] my-[5rem]  print:h-screen print:break-before-page break-before-avoid print:bg-[#a3ddd3]"
                  >
                    <div className="flex items-center justify-center mt-[2rem] lg:hidden">
                      <div id="skills_ids" className="badge">
                        Skills
                      </div>
                    </div>

                    <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] print:text-[3rem] print:mb-[1.5rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
                      {listOfdata?.companytype == "leewop"
                        ? "The skills & tools I am really good at:"
                        : " The skills, tools and technologies I am really good at:"}
                    </div>

                    {/* FIX: pass filteredSkills to SkillsContainer */}
                    <SkillsContainer list={filteredSkills} />
                  </div>
                )}

                {/* Services Section */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <ServicesSection
                      services={listOfdata.services.filter(
                        (service: any) => service?.type !== "main"
                      )}
                    />
                  )}

                {/* My Work Section Slider */}
                {listOfdata &&
                  listOfdata.portfolios_ids &&
                  listOfdata.portfolios_ids.length > 0 && (
                    <section
                      id="myWork"
                      className="w-full mt-[4rem] lg:mt-[8rem] mb-[3.5rem] lg:mb-[7rem] print_p_m print:!pt-[3rem] print:bg-[#a3ddd3] print:break-before-page print:h-screen "
                    >
                      <div className="mainContainer   my-[5rem] print:my-[1rem] ">
                        <div className="flex items-center justify-center lg:hidden">
                          <div className="badge">My Work</div>
                        </div>

                        <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
                          Explore My Technical Endeavors
                        </div>

                        <HomeSlider portfolios={uniqueList} />
                      </div>
                    </section>
                  )}

                {/* Experience Section */}
                {listOfdata &&
                  listOfdata.experiences_ids &&
                  listOfdata.experiences_ids.length > 0 && (
                    <section
                      ref={experiencesRef} // FIX: ref on section wrapper
                      className="w-full print_p_m print:h-screen print:break-before-page print:bg-[#a3ddd3]"
                    >
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
                          .map((experience) => (
                            <div key={experience.id}>
                              <ExperienceSection
                                index={experience.id}
                                experience={experience}
                                listOfskills={filteredSkills} // FIX: pass filteredSkills
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

                <Faqs
                  urlInfo={urlInfo}
                  companyType={listOfdata?.companytype}
                  listOfdata={listOfdata}
                />

                <div id="education" className="my-[5rem]">
                  <EducationComponent />
                </div>

                <div id="ourBlogs" className="my-[5rem]">
                  <OurBlogs domain={listOfdata?.domain} />
                </div>

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
