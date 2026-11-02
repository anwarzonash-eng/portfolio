"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import { contactDetails } from "@/data/JsonData";
import { socialLinks } from "@/data/JsonData";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import CVSideBar from "@/components/CVPageComponents/CV-SideBar";
import CVEducation from "@/components/CVPageComponents/CV-Education";
import CVBlogs from "@/components/CVPageComponents/CV-Blogs";
import CVTimelineDot from "@/components/CVPageComponents/CVTimelineDot";
import CVOverviewSection from "@/components/CVPageComponents/CVOverviewSection";
import CVExperiencesSection from "@/components/CVPageComponents/CVExperiencesSection";
import CVPortfoliosSection from "@/components/CVPageComponents/CVPortfoliosSection";
import CVSectionHeading from "@/components/CVPageComponents/CVSectionHeading";
import Newsletter from "@/components/Newsletter";
import PageRendering from "@/components/PageRendering";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import WebsiteLoader from "@/components/WebsiteLoader";
import Background from "@/components/background";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import SkillsContainer from "@/components/SkillsContainer";
import { useProfileReport } from "@/hooks/useProfileReport";
import { useFilteredSkills } from "@/hooks/useFilteredSkills";
import { useCvNavigation } from "@/hooks/useCvNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { BlogSummary } from "@/types/api";
import type { PageProps } from "@/types/page";

const CV = ({ params }: PageProps) => {
  const searchParams = useSearchParams();

  // Shared page bootstrap: route info + profile report + store sync
  const { urlInfo, listOfdata, loading, error } = useProfileReport({
    params,
    searchParams,
  });

  // Shared skills plumbing (cv fetches the global list once on mount)
  const { filteredSkills, sortedSkills } = useFilteredSkills(listOfdata);

  // Experiences section
  const isMobile = useIsMobile();
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState<boolean[]>([]);
  // Portfolio popup
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Blogs
  const [blogsList, setBlogsList] = useState<BlogSummary[]>([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);

  // Scroll/highlight navigation driven by query params
  const { highlightedExperienceId, highlightedPortfolioId } = useCvNavigation({
    searchParams,
    listOfdata,
    setShowAllExperiences,
  });

  const domain = listOfdata?.domain || "default-domain";

  useEffect(() => {
    if (listOfdata) {
      loadBlogs({
        domain: listOfdata?.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata]);

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

  return (
    <>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
          error,
          actualPage: (
            <div className="bg-[#EFF5FD]">
              <section className="w-full relative print:hidden">
                <div className="mainContainer h-[60.7rem] lg:h-[65rem] print:h-auto w-full relative ">
                  <Background />
                  <div className="max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] relative z-20">
                    <div className="text-center text-primary text-[4rem] lg:text-[10rem] font-medium leading-[5rem] lg:leading-[6rem] mt-[1.6rem]">
                      CV
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
                <div className="bg-white flex flex-col lg:flex-row gap-[4rem] rounded-[1.4rem] relative pb-[5rem] lg:pb-[7rem] px-[2rem] lg:px-[3rem] mb-[10rem] lg:mb-[9.6rem]">
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

                  <section
                    id="skillsSection"
                    className="w-full mt-[-2rem] lg:mt-0 md:pt-[7rem]"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: listOfdata?.tag_line }}
                      className="py-[5rem] px-[3.4rem] print:hidden block primaryGradient text-white text-[2.2rem] leading-[3.1rem]
                      font-medium md:font-bold rounded-[1rem] text-center"
                    ></div>
                    <div className="w-full print:mt-[5rem] print:pt-[5rem]">
                      <div className="flex items-center justify-center mt-[4rem] lg:mt-[6rem]">
                        <div className="relative">
                          <div className="absolute left-0 top-0 w-[1.5px] h-[100%] bg-border print:hidden z-[50]" />
                          <div className="space-y-[1rem] lg:space-y-[2rem]">
                            <CVOverviewSection
                              listOfdata={listOfdata}
                              filteredSkills={filteredSkills}
                              isMobile={isMobile}
                            />
                            {listOfdata?.skills_ids && (
                              <div className="relative  print:break-before-page lg:pl-[4rem]">
                                <CVSectionHeading title="Skills" />
                                <CVTimelineDot />

                                <SkillsContainer
                                  list={sortedSkills}
                                  variant="portfolio"
                                  autoExpandOnParam={true}
                                />
                              </div>
                            )}
                            <CVExperiencesSection
                              listOfdata={listOfdata}
                              filteredSkills={filteredSkills}
                              isMobile={isMobile}
                              showAllExperiences={showAllExperiences}
                              setShowAllExperiences={setShowAllExperiences}
                              highlightedExperienceId={highlightedExperienceId}
                              showMoreSkills={showMoreSkills}
                              setShowMoreSkills={setShowMoreSkills}
                            />
                            <CVPortfoliosSection
                              listOfdata={listOfdata}
                              filteredSkills={filteredSkills}
                              highlightedPortfolioId={highlightedPortfolioId}
                              showMoreSkills={showMoreSkills}
                              setShowMoreSkills={setShowMoreSkills}
                              openModal={openModal}
                            />

                            {listOfdata &&
                              listOfdata?.upwork_show_status === "show" && (
                                <div className="w-full relative">
                                  <CVTimelineDot circleClassName="my-[3rem]" />
                                  <UpworkActivitySection
                                    urlInfo={urlInfo}
                                    cvTrue={true}
                                    data={listOfdata}
                                  />
                                </div>
                              )}

                            {listOfdata &&
                              listOfdata?.education_ids?.length > 0 && (
                                <div className="relative flex items-start print:break-before-page print:w-full print:flex print:items-center print:justify-center">
                                  <CVTimelineDot circleClassName="my-[3rem]" />
                                  <CVEducation
                                    educationList={
                                      listOfdata?.education_ids || []
                                    }
                                  />
                                </div>
                              )}
                            <div
                              id="blogsSection"
                              className="relative flex items-start print:hidden"
                            >
                              <CVTimelineDot circleClassName="my-[3rem]" />
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
