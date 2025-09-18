"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import WebsiteLoader from "@/components/WebsiteLoader";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import OurBlogs from "@/components/OurBlogs";
import { modifiedContent } from "@/hooks/modifiedContent";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { toggleShowMoreSkills } from "@/hooks/toggleShowMoreSkills";
import ShowmoreSkills from "@/components/showmoreSkills";
import Background from "@/components/background";
import { useAppSelector } from "@/store";
import EmptyState from "@/components/EmptyState";
import PortfolioFeatures from "@/components/PortfolioFeatures";
import PortfolioCardContent from "@/components/PortfolioCardContent";

const PortfolioListing = ({ params }: { params: any }) => {
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    if (urlInfo) {
      reportsApiHandler({
        actionType: "portfolio",
        urlInfo,
        setLoading,
        setError,
        setListOfData,
      });
    }
  }, [urlInfo]);

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  // Function to open the modal
  const openModal = (pictures, thumbnail, child_hero_banner) => {
    const portfolioImages = JSON.parse(pictures);
    const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
    setSelectedPorfolioPicturesforPopup(allImages);

    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  // Features Points Logic Code:

  if (error) {
    return <EmptyState message={error || "Something went wrong."} />;
  }

  return (
    <div className="bg-[#EFF5FD]">
      {/* Hero Banner */}

      <section className="w-full relative banner-section">
        <div className="mainContainer h-[60.7rem] lg:h-[65rem] print:h-auto w-full relative ">
          {/* Background SVG */}
          <Background />
          {/* Badge Heading and Paara Text */}
          <div className="max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] relative z-20 print:mt-[20rem] ">
            {/* Badge */}
            <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto mb-[1.6rem]">
              Portfolio
            </div>
            {/* Heading */}
            <div className="text-center print:hidden  text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem]">
              My Recent Work
            </div>
            {/* Pars Text */}
            <p className="text-[2rem] leading-[3rem] font-normal text-heading print:hidden">
              Check out some of the best work I have done.
            </p>
            <div className=" items-start justify-strat gap-[4rem] print:flex hidden  w-full  ">
              <img
                src={listOfdatas?.profile_photo_1}
                alt=""
                className="w-[145px] h-[143px] rounded-full "
              />
              <div className="flex items-start justify-start flex-col">
                <h2 className="text-[5rem] font-bold"> {listOfdata?.name}</h2>
                <div className="text-[3rem] font-medium flex items-center justify-center flex-wrap gap-[3px]">
                  {" "}
                  {listOfdatas?.designation?.split("|").map((item, index) => (
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

      {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
        <>
          {/* Portfolio Timeline Section */}
          <div className="mainContainer mt-[-30rem] lg:mt-[-40rem] xl:mt-[-36rem] print:mt-0  w-full ">
            {/* Timeline */}
            <div className="flex items-center justify-center mt-[2rem]">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[-1rem] print:hidden lg:left-[1rem] top-0 w-[2px] h-[100%] bg-[#7B869E;] mx-[2.1rem] " />
                {/* Timeline items Container */}
                <div className="space-y-[3.5rem]">
                  {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                    const skills: {
                      [key: string]: {
                        title: string;
                        url?: string;
                        order?: string;
                      }[];
                    } = skillsGrouping(
                      showMoreSkills[index]
                        ? portfolio?.skills
                        : portfolio?.skills?.slice(0, 15)
                    );
                    return (
                      <div
                        className="relative flex items-start portfolio-item w-full"
                        key={index}
                      >
                        {/* Dot */}
                        <div className="absolute top-0 left-0 lg:left-[1.8rem] print:hidden ">
                          <div className="w-[2.6rem]  h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                            <div className="w-[0.7rem] h-[0.7rem] bg-[#5531A7] rounded-full"></div>
                          </div>
                        </div>
                        <div className="ml-[3rem] lg:ml-[6rem] print:m-auto  w-full">
                          {/* Year */}
                          <h1 className="mb-[3rem] text-heading text-[2rem] leading-[2.7rem] font-bold max-lg:ml-[0.5rem] print:hidden block">
                            {new Date(portfolio.starting_date).getFullYear()} -{" "}
                            {isNaN(
                              new Date(portfolio.ending_Date).getFullYear()
                            )
                              ? portfolio.ending_Date
                              : new Date(portfolio.ending_Date).getFullYear()}
                          </h1>
                          {/* Card */}
                          <PortfolioCardContent
                            portfolio={portfolio}
                            thumbnailSize={"large"}
                            listOfskills={listOfskills}
                            listOfdata={listOfdata}
                            index={index}
                            showMoreSkills={showMoreSkills}
                            setShowMoreSkills={setShowMoreSkills}
                            openModal={openModal}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Our Blogs Section */}
          <div className="w-full my-[10rem] lg:my-[12rem] print:my-1">
            <OurBlogs domain={listOfdata?.domain} />
          </div>
          {/* Newsletter */}
          {!urlInfo?.u && (
            <div className="w-full mb-[5rem]">
              <Newsletter listOfdata={listOfdata} />
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default PortfolioListing;
