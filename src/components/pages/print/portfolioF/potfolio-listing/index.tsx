"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import "@/styles/printStyles/portfolio_p.css";
import Link from "next/link";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { modifiedContent } from "@/hooks/modifiedContent";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import { useAppSelector } from "@/store";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import OurBlogsPortrait from "@/components/OurBlogsPortrait";
import NoteDomainForPint from "@/components/NoteDomainForPint";

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
      {/* Welcome ✅ */}
      <section className="print:h-screen print:section bg-bannerBG !w-full print:FlexWrapContainer flex items-center justify-center relative">
        {/* Note and Domain For Each Page */}
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
        {/* Welcome Card */}
        <div className="text-center p-[4rem] print:p-0">
          <div className="items-center justify-strat gap-[4rem] flex flex-col w-full">
            <img
              src={listOfdatas?.profile_photo_1}
              alt=""
              className="size-[245px] rounded-full"
            />
            <div className="flex items-start justify-start flex-col">
              <h2 className="text-[7rem] font-bold"> {listOfdata?.name}</h2>
              <div className="text-[4rem] font-medium flex items-center justify-center flex-wrap gap-[3px] w-full">
                {" "}
                {listOfdatas?.designation?.split("|").map((item, index) => (
                  <div key={index} className="text-center">
                    {item.trim()}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full">
                <p className="text-white font-medium px-4 py-1 text-[1.6rem] rounded-[100px] bg-primary">
                  Note: All The Buttons are Clickable
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[2.1rem] mt-[4rem] mb-[0.8rem] ">
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
          </div>
        </div>
      </section>

      {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
        <>
          {/* Portfolio Timeline Section */}
          <div className="bg-transparent max-w-[1550px] w-full mx-auto flex items-center justify-center">
            {/* Timeline items Container */}
            <div className="space-y-[3.5rem] print:space-y-0">
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
                  <section
                    className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative"
                    key={index}
                  >
                    <NoteDomainForPint
                      direction={"hidden print:right-0 print:block"}
                    />

                    <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                      {/* Year */}
                      <h1 className="mb-[3rem] print:mb-[1rem]  text-heading text-[2rem] leading-[2.7rem] font-bold max-lg:ml-[0.5rem] block">
                        {new Date(portfolio.starting_date).getFullYear()} -{" "}
                        {isNaN(new Date(portfolio.ending_Date).getFullYear())
                          ? portfolio.ending_Date
                          : new Date(portfolio.ending_Date).getFullYear()}
                      </h1>
                      {/* Card */}
                      <div className="flex items-center justify-center p-[1.5rem] bg-white shadow-testimonialeShadow ">
                        {/* Content */} {/* Title and Description */}
                        <div className="flex flex-col w-full gap-3">
                          {portfolio?.thumbnail && (
                            <div className="w-full rounded-[1.2rem]">
                              <img
                                src={portfolio.thumbnail}
                                alt="Portfolio Image"
                                height={800}
                                width={800}
                                className="h-[300px] w-full object-cover rounded-[1.2rem] border border-solid border-border cursor-pointer"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null; // prevent infinite loop if fallback fails
                                  target.src =
                                    "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                                }}
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
                              className="mt-[2rem] list-div-portfolio1 pl-[2rem] line-clamp-5"
                            ></p>
                            <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                              AREAS OF EXPERTISE I'VE WORKED IN
                            </h4>
                            <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
                              {Object.values(skills)
                                .flat()
                                .slice(0, 9)
                                .map((skill, index) => (
                                  <Link
                                    key={index}
                                    href={skill.url || "#"}
                                    target="_blank"
                                    className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                  >
                                    {skill.title}
                                  </Link>
                                ))}
                              <Link href={`/portfolio`}>
                                <button className="bg-primary text-white py-[0.4rem] px-[2rem] border border-primary border-solid hover:text-primary hover:bg-white rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                                  Show More Skills
                                </button>
                              </Link>
                            </div>
                            <hr className="w-full my-[2.4rem] h-px bg-border" />
                            {/* Links */}
                            <div className="flex  flex-col gap-[1.4rem]">
                              <Link
                                href={`/print/portfolioF/${portfolio.id}`}
                                className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem]"
                              >
                                View Details
                              </Link>

                              {listOfdata?.companytype !== "leewop" && (
                                <a
                                  href={`/portfolio`}
                                  target="_blank"
                                  className="py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary print:!text-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center"
                                >
                                  Launch Project - Live Preview
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
          {/* Our Blogs Section */}
          <OurBlogsPortrait
            locationLink={`/portfolio/?sectionId=blogsSection`}
            domain={listOfdata?.domain}
          />
        </>
      )}
    </div>
  );
};

export default PortfolioListing_p;
