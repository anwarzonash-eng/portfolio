"use client";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import Faqs from "@/components/Faqs";
import { useRef, useState, useMemo } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { useSearchParams } from "next/navigation";
import { downloadFile } from "@/hooks/downloadFile";
import OurBlogs from "@/components/OurBlogs";
import Newsletter from "@/components/Newsletter";
import PageRendering from "@/components/PageRendering";
import { scrollToSection } from "@/hooks/scrollToSection";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { sortByDate } from "@/utils/sortByDate";
import HeroSection from "@/components/HomePageComponents/HeroSection";
import AboutSection from "@/components/HomePageComponents/AboutSection";
import ServicesSection from "@/components/HomePageComponents/ServicesSection";
import HomeVideoSection from "@/components/HomePageComponents/HomeVideoSection";
import HomeSkillsSection from "@/components/HomePageComponents/HomeSkillsSection";
import HomeWorkSlider from "@/components/HomePageComponents/HomeWorkSlider";
import HomeExperienceList from "@/components/HomePageComponents/HomeExperienceList";
import TestimonialsSection from "@/components/HomePageComponents/TestimonialsSection";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import { useUniquePortfolios } from "@/hooks/useUniquePortfolios";
import { useProfileReport } from "@/hooks/useProfileReport";
import { useFilteredSkills } from "@/hooks/useFilteredSkills";
import { useHomeNavigation } from "@/hooks/useHomeNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useOverflowCheck } from "@/hooks/useOverflowCheck";
import type { PageProps } from "@/types/page";
import type { Service } from "@/types/api";

const Home = ({ params }: PageProps) => {
  useBodyBackgroundColor("#f8f9fa");

  const searchParams = useSearchParams();

  // Shared page bootstrap: route info + profile report + store sync
  const { urlInfo, listOfdata, loading, error } = useProfileReport({
    params,
    searchParams,
  });

  // Shared skills plumbing (home refetches once profile data is present and
  // resets the filtered list when there is no match)
  const { filteredSkills, sortedSkills } = useFilteredSkills(listOfdata, {
    fetchOn: "whenData",
    resetWhenEmpty: true,
  });

  // Local UI state
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false);

  // Experiences Section Timeline View Logic:
  const isMobile = useIsMobile();

  // REF moved to section wrapper so scrollTo works predictably (FIX)
  const experiencesRef = useRef<HTMLElement | null>(null);
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);

  // FIX: single overflow check, trigger when filtered skills change
  const isOverflowing = useOverflowCheck(skillsContainerRef, [filteredSkills]);

  const uniqueList = useUniquePortfolios(listOfdata?.portfolios_ids);

  // Unified navigation system - handles all scroll-to-section logic
  const { highlightedExperienceId, highlightedPortfolioId } = useHomeNavigation(
    {
      searchParams,
      listOfdata,
      uniqueList,
      setShowAllExperiences,
    },
  );

  // how many to show initially
  const initialCount = isMobile ? 3 : 6;
  // memoize experiences array sorted by date
  const experiences = useMemo(
    () => [...(listOfdata?.experiences_ids || [])].sort(sortByDate),
    [listOfdata],
  );

  const servicesSectionHeading =
    listOfdata?.website_purpose === "upwork"
      ? "Expert Development Services"
      : listOfdata?.website_purpose === "startup"
        ? "Full-Cycle Product Solutions"
        : listOfdata?.website_purpose === "contract"
          ? "Technical Specializations"
          : "Tech Stack";

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
                <HomeVideoSection listOfdata={listOfdata} />

                <HomeSkillsSection
                  listOfdata={listOfdata}
                  sortedSkills={sortedSkills}
                  heading={servicesSectionHeading}
                />

                {/* Services Section */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <ServicesSection
                      services={listOfdata.services.filter(
                        (service: Service) => service?.type !== "main",
                      )}
                    />
                  )}

                {/* My Work Section Slider */}
                <HomeWorkSlider
                  listOfdata={listOfdata}
                  uniqueList={uniqueList}
                  highlightedPortfolioId={highlightedPortfolioId}
                />

                {/* Experience Section */}
                <HomeExperienceList
                  listOfdata={listOfdata}
                  experiences={experiences}
                  showAllExperiences={showAllExperiences}
                  setShowAllExperiences={setShowAllExperiences}
                  initialCount={initialCount}
                  highlightedExperienceId={highlightedExperienceId}
                  showMoreSkills={showMoreSkills}
                  setShowMoreSkills={setShowMoreSkills}
                  experiencesRef={experiencesRef}
                />

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
      </main>
    </>
  );
};

export default Home;
