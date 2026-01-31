"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Confetti from "./Confetti";
import VideoPlayer from "./VideoPlayer";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import Tooltip from "./Tooltip";

const FreeTrialPopup = ({ listOfdata, urlInfo }) => {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

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

  // ✅ Hide/show chat button when popup is toggled
  useEffect(() => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      if (open) {
        window.Tawk_API.hideWidget();
      } else {
        window.Tawk_API.showWidget();
      }
    }
  }, [open]);

  if (!open) return null;

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
      id?: string;
    }[];
  } = skillsGrouping(listOfdata?.skills_ids);

  // // console.log("PopUp API RES:", listOfdata);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-2xl z-[1500]">
        <div className="relative max-h-[90vh] overflow-y-auto w-full h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Confetti />
          {/* Free Trial PopUp */}
          <div className="mx-6">
            <div className="rounded-[1.2rem] max-w-[102.4rem] w-full mx-auto bg-primary relative">
              {/* Close Icon */}
              <div className="flex items-center justify-center lg:justify-end pt-3 lg:p-2">
                <div className="text-black bg-border text-[1.2rem] h-[3rem] w-[3rem] rounded-full cursor-pointer">
                  <Image
                    src="/images/close-icon.svg"
                    height={50}
                    width={50}
                    className="h-[3rem] w-[3rem]"
                    alt="Close Icon"
                    onClick={handleClose} // Close popup on click
                  />
                </div>
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
                <div className="flex flex-wrap justify-center lg:justify-between lg:flex-nowrap gap-[2rem] lg:items-end py-[2rem] px-[3rem] border-b border-solid border-border">
                  <div className="max-w-[614px] w-full flex-shrink-0">
                    <p className="text-primary text-[3rem] font-bold font-['Helvetica Neue']">
                      {listOfdata?.name}
                    </p>
                    <p className="text-primary text-[1.8rem] font-bold font-['Helvetica Neue']">
                      {listOfdata?.designation}
                    </p>
                    <p
                      dangerouslySetInnerHTML={{ __html: listOfdata?.tag_line }}
                      className="text-black text-[1.8rem] font-normal leading-[150%]"
                    ></p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="btn-primary px-[3rem] py-[1.2rem] rounded-[0.4rem] text-[1.4rem] lg:text-[2rem] text-white"
                  >
                    Keep Exploring My Website
                  </button>
                  {/* <div>
                  </div> */}
                </div>
                {/* Social Profiles and Skills */}
                <div className="flex flex-wrap md:flex-nowrap">
                  {/* Social links */}
                  <div className="md:max-w-[40.8rem] w-full rounded-[0.8rem] overflow-hidden flex flex-col gap-[1.2rem] py-[2rem] md:pl-[3rem] max-md:px-[1rem] md:pr-[1rem]">
                    {/* Pricing and Availability */}
                    <div className="w-full flex gap-[1.2rem]">
                      {/* Pricing */}
                      <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex items-center justify-center text-primary font-medium">
                          <div>
                          <span className="text-[2.5rem]">${listOfdata?.hourly_rate}</span>
                          <span className="text-[1.6rem]">/ {listOfdata?.salary_type === "per_day" ? "day" : "hour"}</span>
                        </div>
                      </div>
                      {/* Availability */}
                      <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex items-center justify-center text-primary font-medium">
                        <div>
                          <span className="text-[2.5rem]">45 hr</span>{" "}
                          <span className="text-[1.6rem]">/ week</span>
                        </div>
                      </div>
                    </div>
                    {/* Contact & Work Proof */}
                    <div className="w-full flex gap-[1.2rem]">
                      {/* Contact */}
                      {!urlInfo?.u && (
                        <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex items-center justify-between gap-[1rem]">
                          <div>
                            <div className="w-full flex items-center gap-[1.4rem] mb-[0.5rem]">
                              {/* Gmail */}
                              <Tooltip text="My Gmail">
                                <Link href={`mailto:${listOfdata?.email}`}>
                                  <Image
                                    src="/images/gmail.svg"
                                    height={45}
                                    width={45}
                                    alt="Gmail"
                                    className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                                  />
                                </Link>
                              </Tooltip>

                              {/* WhatsApp */}
                              <Tooltip text="My WhatsApp">
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
                              </Tooltip>

                              {/* Phone Number */}
                              <Tooltip text="Call Me">
                                <Link href={`tel:${listOfdata?.phone_no}`}>
                                  <Image
                                    src="/images/number.svg"
                                    height={45}
                                    width={45}
                                    alt="Phone Number"
                                    className="h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]"
                                  />
                                </Link>
                              </Tooltip>
                            </div>

                            <p className="text-[1.2rem] font-normal text-paragraph1 text-center">
                              Contact Me
                            </p>
                          </div>
                        </div>
                      )}
                      {/* Divider */}
                      {/* <div className="h-[5.2rem] w-[3px] bg-border " /> */}

                      {/* Work Proof */}
                      <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex items-center justify-between gap-[1rem]">
                        <div className="w-full">
                          <div
                            className={`w-full flex items-center ${
                              urlInfo?.u ? "justify-center" : ""
                            } gap-[1.4rem] mb-[0.5rem]`}
                          >
                            {listOfdata?.upwork && (
                              <Tooltip text="My Upwork">
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
                              </Tooltip>
                            )}

                            {listOfdata?.github && (
                              <Tooltip text="My GitHub">
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
                              </Tooltip>
                            )}

                            {listOfdata?.linkedIn && (
                              <Tooltip text="My LinkedIn">
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
                              </Tooltip>
                            )}

                            {listOfdata?.behance_link && !urlInfo?.u && (
                              <Tooltip text="My Behance">
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
                              </Tooltip>
                            )}
                          </div>

                          <p className="text-[1.2rem] font-normal text-paragraph1 text-center">
                            My Work Proof
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Skills */}
                  {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                    <div className="md:max-w-[62rem] w-full overflow-hidden p-[1rem]">
                      <div className="flex items-center justify-center mb-[1rem]">
                        <h3 className="badge">My Skills</h3>
                      </div>
                      <div className="w-full p-[1rem] md:p-[2rem] flex items-center border border-border border-solid gap-[1rem] flex-wrap flex-shrink-0 rounded-[1rem]">
                        {/* New Code More Good */}
                        <div className="flex flex-col items-center gap-[1.5rem] overflow-hidden w-full">
                          {/* SKILLS DISPLAY */}
                          <div className="md:max-w-[536px] w-full bg-white/70 backdrop-blur-[1.2rem] flex flex-wrap gap-[1rem] max-h-[160px] overflow-y-auto transition-all duration-500 p-2 rounded-lg">
                            {(showAll
                              ? Object.values(skills).flat() // all skills
                              : Object.values(skills).flat().slice(0, 6)
                            ) // only 6 initially
                              .map((skill, i) => (
                                <Link
                                  href={skill?.url || "#"}
                                  key={skill.id}
                                  className="text-center hover:text-white text-primary text-[1.8rem] font-semibold hover:bg-primary px-[1.8rem] md:px-[2.2rem] py-[0.5rem] md:py-[1rem] bg-white rounded-[5rem] shadow-skillShadow border-[1.5px] flex-shrink-0 border-solid border-[#DDD] justify-center items-center"
                                  style={{ animationDelay: `${i * 0.3}s` }}
                                >
                                  {skill.title}
                                </Link>
                              ))}
                          </div>

                          {/* SHOW MORE / SHOW LESS BUTTON */}
                          {Object.values(skills).flat().length > 6 && (
                            <button
                              onClick={() => setShowAll(!showAll)}
                              className="btn-primary px-[3rem] py-[1rem] rounded-[100px] text-[2rem] text-white"
                            >
                              {showAll ? "Show Less" : "Show All Skills"}
                            </button>
                          )}
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
