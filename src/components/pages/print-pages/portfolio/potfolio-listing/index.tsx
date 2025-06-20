"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import "@/styles/printStyles/portfolio_p.css";
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
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";

const PortfolioListing_p = ({ params }: { params: any }) => {
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "portfolio",
        urlInfo,
        setLoading,
        setListOfData,
      });
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
                className="w-[145px] h-[143px] rounded-full"
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
            <div className="print:flex hidden items-center  gap-[2.1rem] mt-[4rem] mb-[0.8rem]">
              <WorkProofLinks
                props={{
                  upwork: listOfdata?.upwork,
                  github: listOfdata?.github,
                  linkedIn: listOfdata?.linkedIn,
                  behance_link: listOfdata?.behance_link,
                  u: urlInfo?.u,
                }}
              />
              <ContactMeLinks
                props={{
                  email: listOfdata?.email,
                  phone_no: listOfdata?.phone_no,
                }}
              />
            </div>{" "}
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
                        <div className="ml-[3rem] lg:ml-[6rem] print:m-auto print:!mt-[2rem]  w-full">
                          {/* Year */}
                          <h1 className="mb-[3rem] print:mb-[1rem]  text-heading text-[2rem] leading-[2.7rem] font-bold max-lg:ml-[0.5rem] block">
                            {new Date(portfolio.starting_date).getFullYear()} -{" "}
                            {isNaN(
                              new Date(portfolio.ending_Date).getFullYear()
                            )
                              ? portfolio.ending_Date
                              : new Date(portfolio.ending_Date).getFullYear()}
                          </h1>
                          {/* Card */}
                          {/* for desktop */}
                          <div className="flex print:hidden flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem]">
                            {/* Content */}
                            <div className="w-full">
                              {" "}
                              {/* Title and Description */}
                              <div className="print:flex flex-row print:w-full gap-3 items-center justify-center print:flex-row-reverse">
                                {portfolio?.thumbnail && (
                                  <div className="ms-0 lg:ms-5 lg:w-[50rem]  float-right w-full  rounded-[1.2rem] relative align-middle justify-center flex-col flex  items-center ">
                                    <img
                                      src={
                                        portfolio?.thumbnail
                                          ? portfolio.thumbnail
                                          : "/images/project_img.png"
                                      }
                                      onClick={() => {
                                        openModal(
                                          portfolio?.pictures,
                                          portfolio?.thumbnail,
                                          portfolio?.child_hero_banner
                                        );
                                      }}
                                      alt="Portfolio Image"
                                      height={800}
                                      width={800}
                                      className="lg:h-[300px] lg:w-[800px] w-full object-cover rounded-[1.2rem] border border-solid border-border cursor-pointer"
                                    />

                                    <button
                                      className="mb-3 print:hidden min-w-[137px] lg:min-w-[220px] text-white py-[6px] mt-[17px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] relative "
                                      onClick={() =>
                                        openModal(
                                          portfolio?.pictures,
                                          portfolio?.thumbnail,
                                          portfolio?.child_hero_banner
                                        )
                                      }
                                    >
                                      Explore the Gallery
                                    </button>
                                  </div>
                                )}
                                <div className="">
                                  <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                    {portfolio?.title}
                                  </h1>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: portfolio.tagline_1,
                                    }}
                                    className="text-[1.9rem] leading-[150%] font-medium mt-[1rem] text-primary"
                                  ></p>
                                  {/* <hr className='w-full my-[1.6rem] h-px bg-border' /> */}
                                  {/* Points */}
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: modifiedContent(
                                        portfolio.features_short,
                                        listOfskills,
                                        listOfdata
                                      ),
                                    }}
                                    className="mt-[2rem] list-div-portfolio1 pl-[2rem]"
                                  ></p>
                                  {/* Skills */}
                                </div>
                              </div>
                              <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                                AREAS OF EXPERTISE I'VE WORKED IN
                              </h4>
                              <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
                                {Object?.values(skills)?.map(
                                  (group, groupIndex) => (
                                    <React.Fragment key={groupIndex}>
                                      {group.map((skill, i) => (
                                        <Link
                                          key={i}
                                          href={skill.url || "#"}
                                          target="_blank"
                                          className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                        >
                                          {skill.title}
                                        </Link>
                                      ))}
                                      {/* Line break after each group */}
                                      {showMoreSkills[index] && (
                                        <div className="w-full mb-[1px]" />
                                      )}
                                    </React.Fragment>
                                  )
                                )}

                                <ShowmoreSkills
                                  props={{
                                    list: portfolio?.skills,
                                    index,
                                    setShowMoreSkills,
                                    showMoreSkills,
                                  }}
                                />
                              </div>
                              <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />
                              {/* Links */}
                              <div className="flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem] print:hidden">
                                <Link
                                  href={`/print-pages/portfolio/${portfolio.id}`}
                                  className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent print:!border-primary hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem] print:!text-primary"
                                >
                                  View Details
                                </Link>

                                {listOfdata?.companytype !== "leewop" && (
                                  <a
                                    href={portfolio?.link}
                                    target="_blank"
                                    className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary print:!text-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center"
                                  >
                                    Launch Project - Live Preview
                                  </a>
                                )}

                                {portfolio?.has_testimonial == true && (
                                  <Link
                                    href={"#"}
                                    className="text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center"
                                  >
                                    Check Client Testimonial
                                  </Link>
                                )}
                              </div>
                            </div>
                            {/* Image */}
                          </div>

                          {/* for print */}
                          <div className="print:flex items-center justify-center hidden p-[1.5rem] bg-white shadow-testimonialeShadow ">
                            {/* Content */} {/* Title and Description */}
                            <div className="flex flex-col w-full gap-3 items-center justify-center ">
                              {portfolio?.thumbnail && (
                                <div className=" w-full  rounded-[1.2rem]  ">
                                  <img
                                    src={
                                      portfolio?.thumbnail
                                        ? portfolio.thumbnail
                                        : "/images/project_img.png"
                                    }
                                    alt="Portfolio Image"
                                    height={800}
                                    width={800}
                                    className="h-[300px]  w-full object-cover rounded-[1.2rem] border border-solid border-border cursor-pointer"
                                  />
                                </div>
                              )}
                              <div className="">
                                <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                  {portfolio?.title}
                                </h1>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: portfolio.tagline_1,
                                  }}
                                  className="text-[1.9rem] leading-[150%] font-medium mt-[1rem] text-primary"
                                ></p>

                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: modifiedContent(
                                      portfolio.features_short,
                                      listOfskills,
                                      listOfdata
                                    ),
                                  }}
                                  className="mt-[2rem] list-div-portfolio1 pl-[2rem]"
                                ></p>
                                <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                                  AREAS OF EXPERTISE I'VE WORKED IN
                                </h4>
                                <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
                                  {Object?.values(skills)?.map(
                                    (group, groupIndex) => (
                                      <React.Fragment key={groupIndex}>
                                        {group.map((skill, i) => (
                                          <Link
                                            key={i}
                                            href={skill.url || "#"}
                                            target="_blank"
                                            className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                          >
                                            {skill.title}
                                          </Link>
                                        ))}
                                        {/* Line break after each group */}
                                        {showMoreSkills[index] && (
                                          <div className="w-full mb-[1px]" />
                                        )}
                                      </React.Fragment>
                                    )
                                  )}

                                  <ShowmoreSkills
                                    props={{
                                      list: portfolio?.skills,
                                      index,
                                      setShowMoreSkills,
                                      showMoreSkills,
                                    }}
                                  />
                                </div>
                                <hr className="w-full my-[2.4rem] h-px bg-border print:hidden" />
                                {/* Links */}
                                <div className="flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem] print:hidden">
                                  <Link
                                    href={`/portfolio/${portfolio.id}`}
                                    className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent print:!border-primary hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem] print:!text-primary"
                                  >
                                    View Details
                                  </Link>

                                  {listOfdata?.companytype !== "leewop" && (
                                    <a
                                      href={portfolio?.link}
                                      target="_blank"
                                      className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary print:!text-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center"
                                    >
                                      Launch Project - Live Preview
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* Image */}
                          </div>
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

export default PortfolioListing_p;
