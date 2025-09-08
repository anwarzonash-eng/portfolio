"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import Background from "@/components/background";
import { useAppSelector } from "@/store";
import SkillsComponent from "@/components/SkillsComponent";
import ExpandableServiceCard from "@/components/ExpandableServiceCard";

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
  const filteredServices = serviceToScroll
    ? detailService?.filter((service) => service.title === serviceToScroll)
    : detailService;
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [activeDropdown, setActiveDropdown] = useState(0);

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
    if (serviceRefs?.current && serviceToScroll && detailService?.length) {
      const indexToExpand = detailService.findIndex(
        (service) => service.title === serviceToScroll
      );

      if (indexToExpand !== -1) {
        // Expand only if it wasn’t already expanded
        setActiveDropdown((prev) =>
          prev === indexToExpand ? prev : indexToExpand
        );

        // Scroll into view, but don’t collapse again on refresh
        serviceRefs.current[serviceToScroll]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailService]); // 👈 removed serviceToScroll from deps so it runs only once

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
                    <div className="text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem] ">
                      Cover Letter
                    </div>
                    <div className=" items-start justify-strat gap-[4rem] print:flex hidden  w-full  ">
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
                    className="px-[2rem] print:!mt-[10rem] py-[1.4rem] max-w-[1024px] bg-white rounded-[2.2rem] border border-border border-solid text-center  text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem] font-medium  mx-auto mb-[1.6rem]"
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
                      className=" p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] bg-white services_main"
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
                  {filteredServices &&
                    filteredServices?.map((service, index) => (
                      <ExpandableServiceCard
                        key={index}
                        service={service}
                        index={index}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                        serviceRefs={serviceRefs}
                        listOfskills={listOfskills}
                        listOfdata={listOfdata}
                      />
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
