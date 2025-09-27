"use client";

import React, { useEffect, useState } from "react";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import HomeSlider from "@/components/Sliders/HomeSlider";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { modifiedContent } from "@/hooks/modifiedContent";
import { handleCategoryPicture } from "@/hooks/apihandlers/categoryApiHandler";
import PageRendering from "@/components/PageRendering";
import Background from "@/components/background";
import { useAppSelector } from "@/store";
import SkillsComponent from "@/components/SkillsComponent";
import ExpandableServiceCard from "@/components/ExpandableServiceCard";
import EducationComponent from "@/components/EducationComponent";
import { useUniquePortfolios } from "@/hooks/useUniquePortfolios";

const Offer = ({ params }: { params: any }) => {
  useBodyBackgroundColor("#EFF5FD");
  const searchParams = useSearchParams();

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [mainService, setMainService] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(0);

  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
      );
      setFilteredSkills(matchedSkills);
    }
  }, [listOfdata, allSkills]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills: setAllSkills });
  }, []);

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

  useEffect(() => {
    if (urlInfo && listOfdata) {
      const tmpMainservice = listOfdata?.services?.find(
        (service) => service.type === "main"
      );
      setMainService(tmpMainservice);

      setDetailService(
        listOfdata?.services?.filter((service) => service.type === "detail")
      );
    }
  }, [listOfdata, urlInfo]);

  useEffect(() => {
    if (Array.isArray(detailService)) {
      detailService.forEach((item) => {
        const category_id = item?.category_id;
        if (category_id) {
          handleCategoryPicture(category_id, () => {}); // kept but no state storing
        }
      });
    }
  }, [detailService]);

  // List Points Logic
  const [expanded, setExpanded] = useState(false);

  const uniqueList = useUniquePortfolios(listOfdata?.portfolios_ids);

  // Safely get content string (fallback to "")
  const content =
    modifiedContent(
      mainService?.intro_detail || "",
      filteredSkills,
      listOfdata
    ) || "";

  // Try to extract <li> elements
  const items = content ? content.match(/<li[^>]*>.*?<\/li>/g) || [] : [];

  // If no <li>, fall back to treating content as one "block"
  const visibleItems = items.length
    ? expanded
      ? items
      : items.slice(0, 4)
    : [content]; // fallback for <p> or plain text

  return (
    <div className="bg-[#EFF5FD] print:my-[3rem] ">
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
          error,
          actualPage: (
            <>
              {/* Hero Banner */}
              <section className="w-full relative">
                <div className="mainContainer h-[70rem] lg:h-[60rem] w-full relative">
                  <Background />
                  <div className="max-w-[1024px] mx-auto print:mb-[8rem] text-center px-[2rem] pt-[7rem] print:pt-[4rem] relative z-20">
                    <div className="text-center text-primary text-[4rem] lg:text-[6rem] font-medium leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem] ">
                      Cover Letter
                    </div>
                    <div className=" items-start justify-start gap-[4rem] print:flex hidden  w-full  ">
                      <img
                        src={listOfdatas?.profile_photo_1}
                        alt=""
                        className="w-[145px] h-[143px] rounded-full"
                      />
                      <div className="flex items-start justify-start flex-col">
                        <h2 className="text-[5rem] font-bold">
                          {listOfdata?.name}
                        </h2>
                        <div className="text-[3rem] font-medium flex items-center justify-center flex-wrap gap-[3px]">
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
                  </div>
                </div>
              </section>

              {/* Offer Letter Section */}
              <div className="mainContainer w-full mt-[-50rem] lg:mt-[-38rem] relative">
                {mainService?.tagline && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mainService?.tagline,
                    }}
                    className="px-[2rem] print:!mt-[10rem] py-[1.4rem] max-w-[1024px] bg-white rounded-[2.2rem] border border-border border-solid text-center  text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem] font-medium  mx-auto mb-[1.6rem]"
                  />
                )}
                {mainService && (
                  <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[4rem]">
                    {mainService?.intro_main && (
                      <div className="p-[1rem] lg:p-[3rem]">
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              mainService?.intro_main,
                              filteredSkills,
                              listOfdata
                            ),
                          }}
                          className="text-center list-div text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem]  border border-border border-solid p-[1rem] lg:p-[3rem] shadow-lg"
                        />
                      </div>
                    )}
                    <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] bg-white services_main list-div text-[1.6rem]">
                      <ul
                        dangerouslySetInnerHTML={{
                          __html: visibleItems.join(""),
                        }}
                      />
                      {items.length > 4 && (
                        <button
                          onClick={() => setExpanded((prev) => !prev)}
                          className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight mt-[2rem]"
                        >
                          {expanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>
                    {mainService?.skills?.length > 0 && (
                      <SkillsComponent
                        service={mainService}
                        skillsList={filteredSkills}
                      />
                    )}
                  </div>
                )}

                {/* All Service Cards */}
                {detailService &&
                  detailService.map((service, index) => (
                    <ExpandableServiceCard
                      key={index}
                      service={service}
                      index={index}
                      activeDropdown={activeDropdown}
                      setActiveDropdown={setActiveDropdown}
                      listOfskills={filteredSkills}
                      listOfdata={listOfdata}
                    />
                  ))}
              </div>

              {/* My Work Section Slider */}
              {listOfdata?.portfolios_ids?.length > 0 && (
                <section className="w-full block print:hidden">
                  <div className="mainContainer my-[5rem]">
                    <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
                      My Work
                    </div>
                    <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                      Explore My Technical Endeavors
                    </div>
                    <HomeSlider portfolios={uniqueList} />
                  </div>
                </section>
              )}

              {/* Education Section */}
              <div id="education" className="my-[5rem]">
                <EducationComponent />
              </div>

              {/* Our Blogs */}
              <div className="my-[5rem]">
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
    </div>
  );
};

export default Offer;
