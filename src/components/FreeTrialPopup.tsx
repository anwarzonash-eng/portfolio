"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Confetti from "./Confetti";
import VideoPlayer from "./VideoPlayer";
import { scrollToSection } from "@/hooks/scrollToSection";
import { skillsGrouping } from "@/hooks/skillsGrouping";

const FreeTrialPopup = ({ listOfdata, urlInfo }) => {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Prev Logic For 1 Day
  // useEffect(() => {
  //   const introPopupViewed = localStorage.getItem("IntropopupViewed");

  //   if (!introPopupViewed || introPopupViewed !== "true") {
  //     const timer = setTimeout(() => {
  //       setOpen(true);
  //     }, 1000);

  //     const removeIntroPopupViewed = setTimeout(() => {
  //       localStorage.removeItem("IntropopupViewed");
  //       setOpen(true);
  //     }, 24 * 60 * 60 * 1000); // 1 day

  //     return () => clearTimeout(removeIntroPopupViewed);
  //   }
  // }, []);

  // const handleClose = () => {
  //   localStorage.setItem("IntropopupViewed", "true");
  //   setOpen(false);
  // };

  useEffect(() => {
    const lastShown = localStorage.getItem("introPopupLastShown");

    // If never shown or it's been more than 2 days
    if (
      !lastShown ||
      Date.now() - parseInt(lastShown) > 2 * 24 * 60 * 60 * 1000
    ) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000); // delay 1s before opening
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("introPopupLastShown", Date.now().toString());
    setOpen(false);
  };

  // Handle Backgroudn Scoll Desktop + Mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(
    listOfdata?.skills_ids && listOfdata?.skills_ids.length > 6
      ? listOfdata.skills_ids.slice(0, 6)
      : listOfdata?.skills_ids
  );

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-2xl z-[500]">
        {/* <div className="rounded-[1.2rem] relative w-full h-full overflow-y-auto  py-[10rem]"> */}
        <div className="relative max-h-[90vh] overflow-y-auto w-full h-auto py-[4rem]">
          <Confetti />
          {/* Free Trial PopUp */}
          <div className="mx-6">
            <div className="rounded-[1.2rem] max-w-[102.4rem] w-full mx-auto bg-primary relative">
              {" "}
              {/* Close Icon */}
              <div className="absolute top-[-1rem] right-[-1rem] cursor-pointer z-[60]">
                <Image
                  src="/images/close-icon.svg"
                  height={50}
                  width={50}
                  className="h-[3rem] w-[3rem]"
                  alt="Close Icon"
                  onClick={handleClose} // Close popup on click
                />
              </div>
              {/* Top Content */}
              <div
                className={`relative w-full ${
                  listOfdata?.video_attached?.videoURL &&
                  "min-h-[44rem] sm:min-h-[62rem]"
                }`}
              >
                {/* Image */}
                <Image
                  src="/images/popupLine.svg"
                  height={620}
                  width={1024}
                  className="absolute h-full w-full bg-cover z-10"
                  alt="Popup Line"
                />
                {/* Content */}
                <div className="relative w-full h-full z-20">
                  <div className="text-white text-center flex flex-col gap-[1.2rem] items-center justify-center py-[3rem]">
                    <h1 className="text-[3.2rem] lg:text-[5rem] font-bold leading-normal px-[2rem]">
                      {listOfdata?.companytype == "leewop"
                        ? "2 Weeks Free Trial Bookkeeping Services!"
                        : "2 Weeks Free Trial Development!"}
                    </h1>
                    <p
                      className="text-[1.8rem] lg:text-[2.2rem] font-normal leading-normal 
                    p-[1rem]"
                    >
                      Work with me for 2 weeks with guaranteed satisfaction.
                    </p>
                  </div>
                  {listOfdata?.video_attached?.videoURL && (
                    <div className="pb-10 relative rounded-[1.2rem] flex items-end justify-center max-w-[97.7rem] w-full px-[1.5rem] mx-auto">
                      {/* Video Section */}
                      <video
                        autoPlay
                        muted
                        loop
                        controls
                        className="rounded-xl w-full h-[28.8rem] sm:h-[44rem] object-cover"
                      >
                        <source
                          src={listOfdata?.video_attached?.videoURL}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
              {/* Bottom Content */}
              <div className="bg-white rounded-[1.2rem]">
                {/* Heading and Button */}
                <div className="flex flex-wrap justify-center lg:justify-between lg:flex-nowrap lg:items-center gap-[2rem] py-[2rem] px-[3rem] border-b border-solid border-border">
                  <div className="max-w-[614px] w-full flex-shrink-0">
                    <p className="text-primary text-[3rem] font-bold font-['Helvetica Neue'] leading-[45px]">
                      {listOfdata?.name}
                    </p>
                    <p className="text-primary text-[2.5rem] font-bold font-['Helvetica Neue'] leading-[45px]">
                      {listOfdata?.designation}
                    </p>
                    <p
                      dangerouslySetInnerHTML={{ __html: listOfdata?.tag_line }}
                      className="text-black text-[1.8rem] font-normal leading-[150%]"
                    ></p>
                  </div>
                  <div>
                    <button
                      onClick={handleClose}
                      className="btn-primary px-[3.4rem] py-[1.5rem] rounded-[0.4rem] text-[2rem] text-white"
                    >
                      Keep Exploring My Website
                    </button>
                  </div>
                </div>
                {/* Social Profiles and Skills */}
                <div className="flex flex-wrap md:flex-nowrap">
                  {/* Social links */}
                  <div className="md:max-w-[40.8rem] w-full rounded-[0.8rem] overflow-hidden flex flex-col gap-[1.2rem] py-[2rem] md:pl-[3rem] max-md:px-[1rem] md:pr-[1rem]">
                    <div className="w-full flex flex-col md:flex-row gap-[1.2rem]">
                      {/* Pricing and Availability */}
                      <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex items-center justify-between gap-[1rem]">
                        <div className="text-primary font-medium flex items-center px-[2rem] justify-between w-full">
                          <p>
                            <span className="text-[2rem]">
                              ${listOfdata?.hourly_rate}
                            </span>
                            <span className="text-[1.6rem]">/ hour</span>
                          </p>
                          {/* Divider Visible only Up to Medium Devices */}
                          <div className="h-[5.2rem] w-[3px] bg-border" />
                          <p className="">
                            <span className="text-[2rem]">45 hr</span>{" "}
                            <span className="text-[1.6rem]">/ week</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex items-center justify-between gap-[1rem]">
                      {/* Contact */}
                      {!urlInfo?.u && (
                        <div>
                          <div className="w-full flex items-center gap-[1.4rem] mb-[0.5rem]">
                            <Link href={`mailto:${listOfdata?.email}`}>
                              <Image
                                src="/images/gmail.svg"
                                height={45}
                                width={45}
                                alt="Gmail"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                            <Link
                              target="_blank"
                              href={`https://wa.me/${listOfdata?.phone_no}`}
                            >
                              <Image
                                src="/images/whatsapp.svg"
                                height={45}
                                width={45}
                                alt="WhatsApp"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                            <Link href={`tel:${listOfdata?.phone_no}`}>
                              <Image
                                src="/images/number.svg"
                                height={45}
                                width={45}
                                alt="Phone Number"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                          </div>
                          <p className="text-[1.2rem] font-normal text-paragraph1 text-center">
                            Contact Me
                          </p>
                        </div>
                      )}
                      {/* Divider */}
                      <div className="h-[5.2rem] w-[3px] bg-border" />
                      {/* Work Proof */}
                      <div>
                        <div className="w-full flex items-center gap-[1.4rem] mb-[0.5rem]">
                          {listOfdata?.upwork && (
                            <Link
                              target="_blank"
                              href={listOfdata?.upwork || "#"}
                            >
                              <Image
                                src="/images/upwork.svg"
                                height={100}
                                width={100}
                                alt="Upwork"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                          )}
                          {listOfdata?.github && (
                            <Link
                              target="_blank"
                              href={listOfdata?.github || "#"}
                            >
                              <Image
                                src="/images/github.svg"
                                height={100}
                                width={100}
                                alt="GitHub"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                          )}
                          {listOfdata?.linkedIn && (
                            <Link
                              target="_blank"
                              href={listOfdata?.linkedIn || "#"}
                            >
                              <Image
                                src="/images/linkedin.svg"
                                height={100}
                                width={100}
                                alt="LinkedIn"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                          )}

                          {listOfdata?.behance_link && !urlInfo?.u && (
                            <Link
                              target="_blank"
                              href={listOfdata?.behance_link || "#"}
                            >
                              <Image
                                src="/images/behance.svg"
                                height={100}
                                width={100}
                                alt="Behance"
                                className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                              />
                            </Link>
                          )}
                        </div>
                        <p className="text-[1.2rem] font-normal text-paragraph1 text-center">
                          My Work Proof
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Skills */}
                  {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                    <div className="md:max-w-[62rem] w-full overflow-hidden max-md:p-[1rem] md:py-[2rem] md:pr-[3rem] md:pl-[1rem] ">
                      <div className="flex justify-between mb-[1rem]">
                        <h3 className="flex items-center align-middle justify-center text-[1.8rem] font-bold text-primary mb-[1.2rem]">
                          My Skills
                        </h3>

                        {listOfdata?.skills_ids.length > 6 && (
                          <button
                            onClick={() => {
                              handleClose(), scrollToSection("skills_ids");
                            }}
                            className=" text-center hover:text-white text-primary text-[1.8rem] font-medium hover:bg-primary px-[1.5rem] md:px-[2.1rem]  bg-white rounded-[5rem] shadow-skillShadow border-[1.5px] flex-shrink-0 border-solid border-[#DDD] justify-center items-center gap-[1rem] flex"
                          >
                            See More
                          </button>
                        )}
                      </div>
                      <div className="w-full p-[1rem] md:p-[2rem] flex items-center justify-center border border-border border-solid gap-[1rem] flex-wrap flex-shrink-0 rounded-[1rem]">
                        <div className="md:max-w-[536px] w-full bg-white/70 backdrop-blur-[1.2rem] hidden flex-wrap gap-[1rem]">
                          {Object?.values(skills)?.map((group, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                              {group.map((skill, i) => (
                                <Link
                                  href={skill?.url || "#"}
                                  key={i}
                                  className="text-center hover:text-white text-primary text-[1.8rem] font-medium hover:bg-primary px-[1.5rem] md:px-[2.1rem] py-[0.4rem] md:py-[0.8rem] bg-white rounded-[5rem] shadow-skillShadow border-[1.5px] flex-shrink-0 border-solid border-[#DDD] justify-center items-center gap-[1rem]"
                                  style={{ animationDelay: `${i * 0.3}s` }}
                                >
                                  {skill.title}
                                </Link>
                              ))}
                              {/* Line break after each group */}
                              <div className="w-full mb-[1px]" />
                            </React.Fragment>
                          ))}
                        </div>

                        {/* New Code */}
                        <div className="flex flex-col items-center gap-[1.5rem]">
                          {/* SKILLS DISPLAY */}
                          <div
                            className={`md:max-w-[536px] w-full bg-white/70 backdrop-blur-[1.2rem] flex flex-wrap gap-[1rem] justify-center overflow-hidden transition-all duration-500 ${
                              showAll ? "max-h-[1000px]" : "max-h-[12rem]" // 3 lines approx
                            }`}
                          >
                            {Object?.values(skills)?.map(
                              (group, groupIndex) => (
                                <div className="p-2.5" key={groupIndex}>
                                  {group.map((skill, i) => (
                                    <Link
                                      href={skill?.url || "#"}
                                      key={i}
                                      className="text-center hover:text-white text-primary text-[1.8rem] font-semibold hover:bg-primary px-[1.8rem] md:px-[2.2rem] py-[0.5rem] md:py-[1rem] bg-white rounded-[5rem] shadow-skillShadow border-[1.5px] flex-shrink-0 border-solid border-[#DDD] justify-center items-center"
                                      style={{ animationDelay: `${i * 0.3}s` }}
                                    >
                                      {skill.title}
                                    </Link>
                                  ))}
                                </div>
                              )
                            )}
                          </div>

                          {/* SHOW MORE / SHOW LESS BUTTON */}
                          <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn-primary px-[3rem] py-[1rem] rounded-[100px] text-[2rem] text-white"
                          >
                            {showAll ? "Show Less" : "Show All Skills"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeTrialPopup;
