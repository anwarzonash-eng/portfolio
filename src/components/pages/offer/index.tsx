"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import HomeSlider from "@/components/Sliders/HomeSlider";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { cardData } from "@/data/JsonData";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import WebsiteLoader from "@/components/WebsiteLoader";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { modifiedContent } from "@/hooks/modifiedContent";
import { handleCategoryPicture } from "@/hooks/apihandlers/categoryApiHandler";
import PageRendering from "@/components/PageRendering";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import Background from "@/components/background";
import { useAppSelector } from "@/store";

const Offer = ({ params }: { params: any }) => {
  // This is the Custom Hook That
  // use to SET the Background Color
  // OF THE Current Page
  useBodyBackgroundColor("#EFF5FD");
  const searchParams = useSearchParams();

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [mainService, setMainService] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listOfskills, setListOfSkills] = useState([]);
  const [categoryPictures, setCategoryPictures] = useState({});
  const serviceRefs = useRef([]);
  const serviceToScroll = searchParams.get("service");
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [activeDropdown, setActiveDropdown] = useState(0); // Track the active dropdown index

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "home",
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    if (urlInfo) {
      const tmpMainservice = listOfdata?.services?.find((service) => {
        return service.type === "main";
      });

      setMainService(tmpMainservice);

      setDetailService(
        listOfdata?.services?.filter((service) => {
          return service.type === "detail";
        })
      );
    }
  }, [listOfdata]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (Array.isArray(detailService)) {
      detailService.forEach((item) => {
        const category_id = item?.category_id;
        if (category_id) {
          handleCategoryPicture(category_id, setCategoryPictures);
        }
      });
    }
  }, [detailService]);

  useEffect(() => {
    if (
      serviceRefs?.current &&
      serviceToScroll &&
      serviceRefs?.current[serviceToScroll]
    ) {
      serviceRefs?.current[serviceToScroll]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [serviceToScroll, detailService]);

  return (
    <div className="bg-[#EFF5FD] print:my-[3rem] ">
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,

          actualPage: (
            <>
              {/* Hero Banner */}
              <section className="w-full relative">
                <div className="mainContainer h-[70rem] lg:h-[60rem] w-full relative">
                  {/* Background SVG */}
                  <Background />
                  {/* Badge Heading and Para Text */}
                  <div className="max-w-[1024px] mx-auto print:mb-[8rem] text-center px-[2rem] pt-[7rem] print:pt-[4rem] relative z-20">
                    {/* Heading */}
                    <div className="text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem] print:hidden block">
                      Cover Letter
                    </div>
                    <div className=" items-start justify-strat gap-[4rem] print:flex hidden  w-full  ">
                      <img
                        src={listOfdatas?.profile_photo_1}
                        alt=""
                        className="w-[145px] h-[143px] rounded-full"
                      />
                      <div className="flex items-start justify-start flex-col">
                        <h2 className="text-[6rem] font-bold">
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
                    {/* Badge */}
                  </div>
                </div>
              </section>

              {/* Offer Letter Section */}
              <div className="mainContainer w-full mt-[-50rem] lg:mt-[-38rem] relative">
                {/* Content Box Top */}
                {mainService?.tagline && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mainService?.tagline,
                    }}
                    className="px-[2rem] py-[1.4rem] max-w-[1024px] bg-white rounded-[2.2rem] border border-border border-solid text-center  text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem] font-medium  mx-auto mb-[1.6rem]"
                  ></div>
                )}
                {mainService && (
                  <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[4rem]">
                    {mainService?.intro_main && (
                      <div className="p-[1rem] lg:p-[3rem]">
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              mainService?.intro_main,
                              listOfskills,
                              listOfdata
                            ),
                          }}
                          className="text-center list-div text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem]  border border-border border-solid p-[1rem] lg:p-[3rem] shadow-lg"
                        ></h3>
                      </div>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: modifiedContent(
                          mainService?.intro_detail,
                          listOfskills,
                          listOfdata
                        ),
                      }}
                      className=" p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] bg-white"
                    ></div>
                    {mainService?.skills && mainService?.skills.length > 0 && (
                      <SkillsComponent
                        service={mainService}
                        skillsList={listOfskills}
                      />
                    )}
                  </div>
                )}
                {/* Content Box Bottom 4 */}
                <>
                  {detailService &&
                    detailService.map((service, index) => (
                      <>
                        <div
                          key={index}
                          ref={(el) => {
                            serviceRefs.current[service?.title] = el;
                          }}
                          className="w-full bg-white block print:hidden rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden"
                        >
                          <div
                            className={`p-[1rem] lg:p-[3rem] mb-[5rem] bg-primary bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain cursor-pointer ${
                              activeDropdown === index ? "bg-expanded" : ""
                            }`}
                            onClick={() => toggleDropdown(index)}
                          >
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
                              <div className="w-full flex items-center justify-between">
                                <div className="w-full flex items-center">
                                  {service?.picture && (
                                    <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center rounded-[12rem] shadow relative">
                                      <div className="flex items-center justify-center w-[9.3rem] h-[9.3rem]">
                                        <Image
                                          src={service?.picture}
                                          alt="Icon"
                                          layout="fill"
                                          objectFit="cover"
                                          className="rounded-[12rem] w-[9.3rem] h-[9.3rem] object-contain"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <h3 className="text-[2.4rem] lg:text-[4.5rem] text-white leading-tight font-medium">
                                    {service.title}
                                  </h3>
                                </div>
                                <img
                                  src="/images/expand_icon.png"
                                  alt=""
                                  className={`w-[52px] ${
                                    activeDropdown === index
                                      ? "hidden"
                                      : "block"
                                  }`}
                                />
                                <img
                                  src="/images/collaps_icon.png"
                                  alt=""
                                  className={`w-[52px] ${
                                    activeDropdown === index
                                      ? "block"
                                      : "hidden"
                                  }`}
                                />
                              </div>
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: service.intro_main,
                              }}
                              className="text-white list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]"
                            ></p>
                          </div>

                          {/* Expandable content with smooth transitions */}
                          <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                              activeDropdown === index
                                ? "md:max-h-[950px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="flex w-full flex-col items-start">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: modifiedContent(
                                    service.intro_detail,
                                    listOfskills,
                                    listOfdata
                                  ),
                                }}
                                className="p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] bg-white"
                              ></div>
                              {service?.skills &&
                                service?.skills.length > 0 && (
                                  <SkillsComponent
                                    service={service}
                                    skillsList={listOfskills}
                                    index={index}
                                  />
                                )}
                            </div>
                          </div>
                        </div>
                        <div
                          key={index}
                          ref={(el) => {
                            serviceRefs.current[service?.title] = el;
                          }}
                          className="w-full hidden print:block bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden"
                        >
                          <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-primary bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
                              {/* Circle Icon */}
                              {/* {service.category_id &&
                                                  categoryPictures[service?.category_id] && ( */}
                              {service?.picture && (
                                <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center rounded-[12rem] shadow relative">
                                  <div className="flex items-center justify-center w-[9.3rem] h-[9.3rem]">
                                    <Image
                                      src={service?.picture}
                                      alt="Icon"
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded-[12rem] w-[9.3rem] h-[9.3rem] object-contain"
                                    />
                                  </div>
                                </div>
                              )}
                              {/* Title */}
                              <h3 className="text-[2.4rem] lg:text-[4.5rem] text-white leading-tight font-medium">
                                {service.title}
                              </h3>
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: service.intro_main,
                              }}
                              className="text-white list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]"
                            ></p>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: modifiedContent(
                                service.intro_detail,
                                listOfskills,
                                listOfdata
                              ),
                            }}
                            className=" p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white"
                          ></div>
                          {service?.skills && service?.skills.length > 0 && (
                            <SkillsComponent
                              service={service}
                              skillsList={listOfskills}
                              index={index}
                            />
                          )}
                        </div>
                      </>
                    ))}
                </>
              </div>
              {/* My Work Section Slider  */}
              {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <section className="w-full block print:hidden">
                  <div className="mainContainer my-[5rem]">
                    {/* Badge */}
                    <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
                      My Work
                    </div>
                    {/* Heading */}
                    <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
                      Explore My Technical Endeavors
                    </div>

                    {/* Home Page Slider */}
                    <HomeSlider
                      portfolios={listOfdata?.portfolios_ids}
                      companyType={listOfdata?.companytype}
                    />
                  </div>
                </section>
              )}
              {/* Our Blogs */}
              <div className="my-[10rem] lg:my-[12.6rem] print:hidden block">
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

const SkillsComponent = ({ service, skillsList, index = 0 }) => {
  const [showMoreSkills, setShowMoreSkills] = useState([]);

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(
    showMoreSkills[index] ? service?.skills : service?.skills?.slice(0, 15)
  );
  return (
    <div className="px-[1rem] lg:px-[3rem] text-black list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
      AREAS OF EXPERTISE I'VE WORKED IN
      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] my-[2.4rem] text-nowrap flex-wrap">
        {Object?.values(skills)?.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.map((skill, i) => {
              const matchedSkill = skillsList.find(
                (s) => s.title === skill.title
              );
              const href = matchedSkill?.url;

              return href ? (
                <Link
                  href={href}
                  target="_blank"
                  key={i}
                  className="hover:bg-primary capitalize hover:text-white py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]"
                >
                  {skill.title}
                </Link>
              ) : (
                <div
                  key={i}
                  className="hover:bg-primary capitalize hover:text-white py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]"
                >
                  {skill.title}
                </div>
              );
            })}
            {/* Line break after each group */}
            {showMoreSkills[index] && <div className="w-full mb-[1px]" />}
          </React.Fragment>
        ))}{" "}
        <ShowmoreSkills
          props={{
            list: service?.skills,
            index,
            setShowMoreSkills,
            showMoreSkills,
          }}
        />
      </div>
    </div>
  );
};
