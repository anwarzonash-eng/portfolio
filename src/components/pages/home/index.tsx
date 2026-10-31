"use client";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import HomeSlider from "@/components/Sliders/HomeSlider";
import Faqs from "@/components/Faqs";
import FreeTrialPopup from "@/components/FreeTrialPopup";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
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
import { SmoothScroll } from "@/hooks/SmoothScroll";
import SkillsContainer from "@/components/SkillsContainer";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useMediaQuery } from "react-responsive";
import ExperienceSection from "@/components/ExperienceSection";
import { sortByDate } from "@/utils/sortByDate";
// import EducationComponent from "@/components/EducationComponent";
import HeroSection from "@/components/HomePageComponents/HeroSection";
import AboutSection from "@/components/HomePageComponents/AboutSection";
import ServicesSection from "@/components/HomePageComponents/ServicesSection";
import { useUniquePortfolios } from "@/hooks/useUniquePortfolios";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import TestimonialsSection from "@/components/HomePageComponents/TestimonialsSection";

// Test
// types.ts or directly in your component file
interface Prototype {
  video?: string;
}

interface Testimonial {
  client_company: string;
  client_company_website: string;
  client_designation: string;
  client_name: string;
  client_pic: string;
  id: string;
  linkedin: string;
  portfolio_id: number;
  review_text: string;
  Prototype?: Prototype[];
  upwork?: string;
  website_purpose?: string | null;
  twitter?: string;
}

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
    (state) => state.profile.listOfProfileData,
  );

  // Experiences Section Timeline View Logic:
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);
  // Highlight specific experience
  const [highlightedExperienceId, setHighlightedExperienceId] = useState<
    string | null
  >(null);
  // Highlight specific portfolio
  const [highlightedPortfolioId, setHighlightedPortfolioId] = useState<
    string | null
  >(null);

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

  // console.log("The Skills Section Data: ", listOfdata?.skills_ids)

  // This was Prev Logic
  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some(
          (dataSkill: any) => dataSkill.id === skill.id,
        ),
      );
      setFilteredSkills(matchedSkills);
    } else {
      setFilteredSkills([]);
    }
  }, [listOfdata, allSkills]);

  // Here im Using Custom Hook in useSortedSkills
  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills,
  });

  // FIX: single overflow check, trigger when filtered skills change (removed duplicate)
  useEffect(() => {
    const skillsContainer = skillsContainerRef?.current;
    if (skillsContainer) {
      setIsOverflowing(
        skillsContainer.scrollHeight > skillsContainer.clientHeight,
      );
    }
  }, [filteredSkills]);

  // console.log("Filtered Skills: ", filteredSkills);

  // console.log("API Data:", listOfdata)
  // console.log("PDF URL's Data:", listOfdata && listOfdata?.pdf_urls?.urls)

  // grouping used elsewhere — keep as is
  const skills = skillsGrouping(listOfdata?.skills_ids);
  const uniqueList = useUniquePortfolios(listOfdata?.portfolios_ids);

  // Unified navigation system - handles all scroll-to-section logic
  useEffect(() => {
    if (!listOfdata) return;

    const portfolioId = searchParams.get("portfolioId");
    const experienceId = searchParams.get("experienceId");
    const sectionId = searchParams.get("sectionId");
    const scrollTo = searchParams.get("scrollTo");
    const scroll = searchParams.get("scroll");
    const nav = searchParams.get("nav");
    const expand = searchParams.get("expand");

    console.log("🚀 Navigation System:", {
      portfolioId,
      experienceId,
      sectionId,
      scrollTo,
      scroll,
      nav,
      expand,
    });

    // Helper function to wait for element to exist and be rendered
    const waitForElement = (elementId: string): Promise<HTMLElement | null> => {
      return new Promise((resolve) => {
        const checkElement = () => {
          const element = document.getElementById(elementId);
          if (element && element.offsetHeight > 0) {
            resolve(element);
          } else {
            // Use requestAnimationFrame for better performance than setTimeout
            requestAnimationFrame(checkElement);
          }
        };
        checkElement();
      });
    };

    // Scroll to element with proper offset
    const scrollToElement = (element: HTMLElement, offset: number = 100) => {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };

    // Navigation logic in priority order
    const handleNavigation = async () => {
      try {
        // 1. Portfolio-specific navigation (highest priority)
        if (
          portfolioId &&
          (sectionId === "myWork" ||
            scrollTo === "myWork" ||
            nav === "portfolio")
        ) {
          console.log("📍 Portfolio Navigation");
          setHighlightedPortfolioId(portfolioId);

          // Set carousel slide if portfolio exists
          if (uniqueList?.length > 0) {
            const portfolioIndex = uniqueList.findIndex(
              (p) => p.id === portfolioId,
            );
            if (portfolioIndex !== -1) {
              window.dispatchEvent(
                new CustomEvent("setCarouselSlide", {
                  detail: { slideIndex: portfolioIndex },
                }),
              );
            }
          }

          const element = await waitForElement("myWork");
          if (element) scrollToElement(element, 80);
          return;
        }

        // 2. Experience-specific navigation
        if (
          experienceId ||
          (nav === "experience" &&
            (scrollTo === "experiences" || sectionId === "experienceSection"))
        ) {
          console.log("📍 Experience Navigation");

          if (expand === "true") setShowAllExperiences(true);

          if (experienceId) {
            setHighlightedExperienceId(experienceId);
            setShowAllExperiences(true);

            // Wait for experience expansion if needed
            if (expand === "true") {
              await new Promise((resolve) => setTimeout(resolve, 100)); // Brief wait for state update
            }

            const specificElement = await waitForElement(
              `experience-${experienceId}`,
            );
            if (specificElement) {
              scrollToElement(specificElement, 120);
              return;
            }
          }

          // Fallback to section
          const sectionElement = await waitForElement("experienceSection");
          if (sectionElement) scrollToElement(sectionElement, 100);
          return;
        }

        // 3. Skills section navigation
        if (
          (sectionId === "skillSection" ||
            scrollTo === "skills" ||
            scroll === "skills") &&
          nav !== "portfolio" &&
          nav !== "experience"
        ) {
          console.log("📍 Skills Navigation");

          const element = await waitForElement("skillSection");
          if (element) scrollToElement(element, 100);
          return;
        }

        // 4. General section navigation
        if (
          sectionId &&
          !["myWork", "experienceSection", "skillSection"].includes(
            sectionId,
          ) &&
          !nav &&
          !portfolioId &&
          !experienceId
        ) {
          console.log("📍 General Section Navigation:", sectionId);

          const element = await waitForElement(sectionId);
          if (element) scrollToElement(element, 100);
          return;
        }

        console.log("ℹ️ No navigation action needed");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };

    handleNavigation();
  }, [searchParams, listOfdata, uniqueList]);

  // how many to show initially
  const initialCount = isMobile ? 3 : 6;
  // memoize experiences array sorted by date
  const experiences = useMemo(
    () => [...(listOfdata?.experiences_ids || [])].sort(sortByDate),
    [listOfdata],
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

  const servicesSectionHeading =
    listOfdata?.website_purpose === "upwork"
      ? "Expert Development Services"
      : listOfdata?.website_purpose === "startup"
        ? "Full-Cycle Product Solutions"
        : listOfdata?.website_purpose === "contract"
          ? "Technical Specializations"
          : "Tech Stack";

  // grouping used elsewhere — keep as is
  // console.log("URL Info:", urlInfo);
  // console.log("List of Data:", listOfdata);

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
                {/* <FreeTrialPopup listOfdata={listOfdata} urlInfo={urlInfo} /> */}
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

                {/* Upwork Activity Section */}
                {listOfdata?.upwork_show_status === "show" && (
                  <div className="mb-[20px] lg:mb-[90px]">
                    <UpworkActivitySection
                      urlInfo={urlInfo}
                      cvTrue={false}
                      data={listOfdata}
                    />
                  </div>
                )}

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
                    className="pt-20 mb-0 print:!pt-[4rem] print:my-[0rem] my-[5rem]  print:h-screen print:break-before-page break-before-avoid print:bg-[#a3ddd3] bg-surface"
                  >
                    <div className="flex items-center justify-center mt-[2rem] lg:hidden mb-20">
                      <div id="skills_ids" className="badge capitalize">
                        {servicesSectionHeading}
                      </div>
                    </div>

                    <div
                      className="text-center text-heading text-[2.4rem] xl:text-[3rem]
                      font-medium leading-[2.8rem] mt-[2rem] hidden lg:block capitalize mb-[2rem] lg:mb-[6rem] "
                    >
                      {servicesSectionHeading}
                    </div>

                    <SkillsContainer
                      list={sortedSkills}
                      variant="default"
                      autoExpandOnParam={true}
                    />
                  </div>
                )}

                {/* Services Section */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <ServicesSection
                      services={listOfdata.services.filter(
                        (service: any) => service?.type !== "main",
                      )}
                    />
                  )}

                {/* My Work Section Slider */}
                {listOfdata &&
                  listOfdata.portfolios_ids &&
                  listOfdata.portfolios_ids.length > 0 && (
                    <section
                      id="myWork"
                      className="w-full  bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:bg-none dark:bg-surfaceMuted pt-[4rem] lg:pt-[7rem] pb-[4rem] mb-[3.5rem] lg:mb-[7rem] print_p_m print:!pt-[3rem] print:bg-[#a3ddd3] print:break-before-page print:h-screen "
                    >
                      <div className="mainContainer   my-[5rem] print:my-[1rem] ">
                        <div className="flex items-center justify-center lg:hidden">
                          <div className="badge">My Work</div>
                        </div>

                        <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem] hidden lg:block">
                          Explore My Technical Endeavor
                        </div>

                        <HomeSlider
                          portfolios={uniqueList}
                          highlightedPortfolioId={highlightedPortfolioId}
                        />
                      </div>
                    </section>
                  )}

                {/* Experience Section */}
                {listOfdata &&
                  listOfdata.experiences_ids &&
                  listOfdata.experiences_ids.length > 0 && (
                    <section
                      id="experienceSection"
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

                        {/* {experiences
                          .slice(
                            0,
                            showAllExperiences
                              ? experiences.length
                              : initialCount
                          )
                          .map((experience) => (
                            <div 
                              key={experience.id}
                              id={`experience-${experience.id}`}
                              className={highlightedExperienceId === experience.id
                                ? "border border-primary rounded-[1rem] p-4"
                                : ""}
                            >
                              {
                                const isLastItem = index === experiencesData.length - 1;
                                return (
                                  <ExperienceSection
                                index={experience.id}
                                experience={experience}
                                listOfskills={listOfdata?.skills_ids} // FIX: pass filteredSkills
                                listOfdata={listOfdata}
                                showMoreSkills={showMoreSkills}
                                setShowMoreSkills={setShowMoreSkills}
                                isLast={isLastItem}
                                variant="timeline"
                              />
                                )
                              }
                            
                            </div>
                          ))} */}

                        {experiences
                          .slice(
                            0,
                            showAllExperiences
                              ? experiences.length
                              : initialCount,
                          )
                          .map((experience, index) => {
                            // ⬅️ IMPORTANT: Add 'index' to the map callback arguments

                            // 1. Declare the variable and logic inside the map function's body.
                            const isLastItem =
                              index ===
                              experiences.slice(
                                0,
                                showAllExperiences
                                  ? experiences.length
                                  : initialCount,
                              ).length -
                              1;

                            // 2. Return the JSX element.
                            return (
                              <div
                                key={experience.id}
                                id={`experience-${experience.id}`}
                                className={
                                  highlightedExperienceId === experience.id
                                    ? "border border-primary rounded-[1rem] p-4"
                                    : ""
                                }
                              >
                                <ExperienceSection
                                  index={index} // Changed this to the array index, as it is usually required for showMoreSkills array index
                                  experience={experience}
                                  listOfskills={listOfdata?.skills_ids}
                                  listOfdata={listOfdata}
                                  showMoreSkills={showMoreSkills}
                                  setShowMoreSkills={setShowMoreSkills}
                                  isLast={isLastItem} // ⬅️ Passed the correctly calculated isLast prop
                                  variant="timeline"
                                />
                              </div>
                            );
                          })}

                        {!showAllExperiences &&
                          experiences.length > initialCount && (
                            <div className="flex items-center justify-center lg:ml-20">
                              <button
                                onClick={() => setShowAllExperiences(true)}
                                className="btn-primary text-onPrimary py-[1rem] mt-[2rem] px-[3.4rem] text-[1.8rem] font-medium"
                              >
                                View Full Career Timeline
                              </button>
                            </div>
                          )}
                      </div>
                    </section>
                  )}

                {listOfdata?.testimonials && (
                  <TestimonialsSection
                    testimonials={listOfdata?.testimonials}
                    designation={listOfdata?.designation}
                  />
                )}

                <Faqs
                  urlInfo={urlInfo}
                  companyType={listOfdata?.companytype}
                  apiData={listOfdata}
                />

                {/* <div id="education" className="my-[5rem]">
                  <EducationComponent />
                </div> */}

                <div id="ourBlogs" className="my-[5rem]">
                  <OurBlogs domain={listOfdata?.domain} />
                </div>

                {listOfdata &&
                  listOfdata?.upwork_show_status === "show_at_end" && (
                    <div className="mb-[20px] lg:mb-[90px]">
                      <UpworkActivitySection
                        urlInfo={urlInfo}
                        cvTrue={false}
                        data={listOfdata}
                      />
                    </div>
                  )}

                {!urlInfo?.u && (
                  <div className="w-full mb-[5rem]">
                    <Newsletter listOfdata={listOfdata} />
                  </div>
                )}
              </>
            ),
          }}
        />
      </main >
    </>
  );
};

export default Home;
