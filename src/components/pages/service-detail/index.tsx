"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { modifiedContent } from "@/hooks/modifiedContent";
import { handleCategoryPicture } from "@/hooks/apihandlers/categoryApiHandler";
import PageRendering from "@/components/PageRendering";
import { useAppSelector } from "@/store";

const ServiceDetail = ({ params }: { params: any }) => {
  useBodyBackgroundColor("#EFF5FD");

  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service");

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [mainService, setMainService] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listOfskills, setListOfSkills] = useState([]);
  const [categoryPictures, setCategoryPictures] = useState({});
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [activeDropdown, setActiveDropdown] = useState(0);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  // useEffect(() => {
  //   setURLInfo(getRoutesDetails(params, searchParams));
  // }, [searchParams]);

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
      });
    }
  }, [urlInfo]);

  useEffect(() => {
    if (urlInfo && listOfdata) {
      setMainService(
        listOfdata?.services?.find((service) => service.type === "main")
      );
      setDetailService(
        listOfdata?.services?.filter((service) => service.type === "detail")
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

  const filteredServices = selectedService
    ? detailService?.filter((service) => service.title === selectedService)
    : detailService;

  return (
    <div className="bg-[#EFF5FD] print:my-[3rem] ">
      <PageRendering
        props={{
          list: listOfdata,
          loading,
          actualPage: (
            <div className="mainContainer w-full mt-[6rem] relative">
              {filteredServices &&
                filteredServices
                  .filter((service) => service.title)
                  .map((service, index) => (
                    <div
                      key={index}
                      className="w-full bg-white print:break-before-page block rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden relative print-section"
                    >
                      <div
                        className={`p-[1rem] lg:p-[3rem] print:p-[17px] mb-[5rem] print:!mb-[2rem] bg-primary bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain cursor-pointer print:bg-black print:text-white ${
                          activeDropdown === index ? "bg-expanded" : ""
                        }`}
                        onClick={() => setActiveDropdown(index)}
                      >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
                          <div className="w-full flex items-center justify-between">
                            <div className="w-full flex items-center">
                              {service?.picture && (
                                <div className="w-[9.3rem] print:hidden h-[9.3rem] flex items-center justify-center rounded-[12rem] shadow relative">
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
                              <h3 className="text-[2.4rem] lg:text-[4.5rem] print:!font-semibold text-white print:!text-white leading-tight font-medium">
                                {service.title}
                              </h3>
                            </div>
                            <img
                              src="/images/expand_icon.png"
                              alt=""
                              className={`w-[52px] print:hidden block ${
                                activeDropdown === index ? "hidden" : "block"
                              }`}
                            />
                            {/* <img
                              src="/images/collaps_icon.png"
                              alt=""
                              className={`w-[52px] print:hidden block ${
                                activeDropdown === index ? "block" : "hidden"
                              }`}
                            /> */}
                          </div>
                        </div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: service.intro_main,
                          }}
                          className="text-white print:!text-white list-div text-[1.6rem] print:!font-medium leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]"
                        ></p>
                      </div>

                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          activeDropdown === index
                            ? "md:max-h-[950px] opacity-100"
                            : "max-h-0 opacity-0"
                        } print-expanded`}
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
                            className="p-[1rem] offer_main list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] bg-white"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ServiceDetail;
