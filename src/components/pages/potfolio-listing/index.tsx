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
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import ExperienceDescription from "@/components/ExperienceDescription";

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
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  useEffect(() => {
    const sectionID = searchParams.get("sectionId");
    if (!sectionID) return;
    // Example: URL query ya koi condition ke basis par scroll karo
    console.log("Section ID:", sectionID);
    SmoothScroll(sectionID);
  }, [listOfdata]);

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

  console.log("Portfolio Listing Data:", listOfdata?.portfolio);

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

      {/* Maped Code */}
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
                  {(() => {
                    const renderedTitles = new Set();

                    return listOfdata?.portfolios_ids?.map(
                      (portfolio, index) => {
                        // Skip "Beyond Competitions" if already rendered
                        if (
                          portfolio?.title === "Beyond Competitions" &&
                          renderedTitles.has("Beyond Competitions")
                        ) {
                          return null;
                        }

                        // Mark "Beyond Competitions" as rendered
                        if (portfolio?.title === "Beyond Competitions") {
                          renderedTitles.add("Beyond Competitions");
                        }

                        // Override thumbnail for Velzon
                        const thumbnailToUse =
                          portfolio?.title === "Velzon"
                            ? "/VelzonThumbnail.PNG"
                            : portfolio?.thumbnail;

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
                                {new Date(
                                  portfolio.starting_date
                                ).getFullYear()}{" "}
                                -{" "}
                                {isNaN(
                                  new Date(portfolio.ending_Date).getFullYear()
                                )
                                  ? portfolio.ending_Date
                                  : new Date(
                                      portfolio.ending_Date
                                    ).getFullYear()}
                              </h1>

                              {/* Card */}
                              {/* for desktop */}
                              <div className="flex print:hidden flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem]">
                                {/* Content */}
                                <div className="w-full">
                                  <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[2rem]">
                                    <div className="order-1">
                                      <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                        {portfolio?.title}
                                      </h1>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: portfolio.tagline_2,
                                        }}
                                        className="text-[1.9rem] leading-[150%] font-medium mt-[1rem] text-primary"
                                      ></p>
                                    </div>
                                    {thumbnailToUse && (
                                      <div className="lg:w-[50rem] w-full rounded-[1.2rem] relative order-0 lg:order-2">
                                        <div
                                          className="h-[200px] lg:h-[300px] lg:w-[500px] w-full 
                                          rounded-[1.2rem] border border-solid border-border cursor-pointer overflow-hidden"
                                        >
                                          <Image
                                            src={thumbnailToUse}
                                            onClick={() => {
                                              openModal(
                                                portfolio?.pictures,
                                                thumbnailToUse,
                                                portfolio?.child_hero_banner
                                              );
                                            }}
                                            fill
                                            className="rounded-[1.2rem] object-fill !h-[200px] lg:!h-[300px] w-full"
                                            alt="Portfolio Image"
                                          />
                                        </div>

                                        <button
                                          className="mb-3 max-w-max lg:min-w-[220px]
                                          text-white py-[6px] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary outline-none border border-solid border-transparent hover:border-primary duration-300 max-lg:w-full text-center rounded-[0.6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                          onClick={() =>
                                            openModal(
                                              portfolio?.pictures,
                                              thumbnailToUse,
                                              portfolio?.child_hero_banner
                                            )
                                          }
                                        >
                                          Explore the Gallery
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  <ExperienceDescription
                                    rawHtml={portfolio.features_short} // ✅ pass raw HTML
                                    listOfskills={listOfskills}
                                    listOfdata={listOfdata}
                                    index={index}
                                  />

                                  <h4 className="text-heading text-[1.2rem] lg:mt-[1.4rem] mt-[1rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                                    AREAS OF EXPERTISE I'VE WORKED IN
                                  </h4>

                                  <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
                                    {Object.values(skills).map(
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
                              </div>
                            </div>
                          </div>
                        );
                      }
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          {/* Our Blogs Section */}
          <div
            className="w-full my-[10rem] lg:my-[12rem] print:my-1"
            id="blogsSection"
          >
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
