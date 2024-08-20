"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Confetti from "./Confetti";

const FreeTrialPopup: React.FC = () => {
  const mySkills: string[] = [
    "Java",
    "React",
    "Vue js",
    "Angular",
    "iOS",
    "DevOps",
    "Backend",
    "node.js",
    ".Net",
    "AWS",
    "Shopify",
    "Python",
    "Odoo",
    "Android",
  ];

  return (
    <>
      <Confetti />
      <div className="min-h-screen w-full absolute top-0 left-0 z-[200] py-[8rem] bg-primary bg-opacity-50">
        <div className="max-w-[102.4rem] mx-auto mw-full bg-trialPopUpGradient relative">
          {/* Close Icon */}
          <div className="absolute top-[-1rem] right-[-1rem] cursor-pointer z-[60]">
            <Image
              src={"/images/close-icon.svg"}
              height={50}
              width={50}
              className="h-[3rem] w-[3rem]"
              alt="Close Icon"
            />
          </div>
          {/* Top Content */}
          <div className="h-[62rem] w-full relative">
            {/* Image */}
            <Image
              src={"/images/popupLine.svg"}
              height={620}
              width={1024}
              className="absolute h-full w-full bg-cover z-10"
              alt="Popup Line"
            />
            {/* Content */}
            <div className="w-full h-full absolute top-0 left-0 z-50">
              <div className="text-white text-center h-[20.4rem] flex flex-col gap-[1rem] items-center justify-center">
                <h1 className="text-[5rem] font-bold">
                  2 Weeks Free Trial Development!
                </h1>
                <p className="text-[2.2rem] font-normal">
                  Work with me for 2 weeks with guaranteed satisfaction.
                </p>
              </div>
              <div className="h-[42.6rem] max-w-[97.7rem] mx-auto p-[1.5rem] flex items-center justify-center relative bottom-[1rem]">
                <Image
                  src="/images/popUpPic.png"
                  className="h-full w-full object-cover rounded-[1rem]"
                  height={700}
                  width={1200}
                  alt="Popup Picture"
                />
                <div className="h-[6.5rem] w-[6.5rem] absolute top1/2 left-1/2 -translate-x-1/2 cursor-pointer">
                  <Image
                    src={"/images/popUpPlay.svg"}
                    height={100}
                    width={100}
                    alt="Play Icon"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Content */}
          <div className="w-full bg-white">
            {/* Heading and Button */}
            <div className="flex flex-wrap justify-center lg:justify-between lg:flex-nowrap lg:items-center gap-[2rem] py-[2rem] px-[3rem] border-b border-solid border-border">
              <div className="max-w-[614px] w-full flex-shrink-0">
                <p className="text-primary text-[3rem] font-bold font-['Helvetica Neue'] leading-[45px]">
                  Full Stack Developer
                </p>
                <p className="text-black text-[1.8rem] font-normal leading-[150%]">
                  10+ years of experience in front-end and back-end web
                  development. Ambitious and communicative. Good mentor and tech
                  lead.
                </p>
              </div>
              <div className="">
                <button className="px-[2rem] py-[1.5rem] rounded-[0.4rem] bg-primary border border-solid border-transparent text-[2rem] text-white hover:bg-white hover:text-primary hover:border-primary duration-300">
                  Keep Exploring
                </button>
              </div>
            </div>
            {/* Social Profiles and Skills */}
            <div className="flex flex-wrap lg:flex-nowrap">
              {/* Social links */}
              <div className="max-w-[40.8rem] w-full rounded-[0.8rem] overflow-hidden flex flex-col gap-[1.2rem] py-[2rem] pl-[3rem] pr-[1rem] ">
                <div className="w-full flex gap-[1.2rem]">
                  {/* Pricing and Availability */}
                  <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] rounded-[0.8rem] py-[2.5rem] max-w-[15rem] w-full flex items-center justify-center h-[9.4rem]">
                    <div className="text-primary font-medium">
                      <p className="mb-[1rem]">
                        <span className="text-[2rem]">$26</span>
                        <span className="text-[1.6rem]">/ hour</span>
                      </p>
                      <p>
                        <span className="text-[2rem]">45 hr</span>{" "}
                        <span className="text-[1.6rem]">/ week</span>
                      </p>
                    </div>
                  </div>
                  {/* Contact */}
                  <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] py-[2.5rem] px-[2rem] max-w-[22rem] w-full flex items-center justify-start rounded-[0.8rem] h-[9.4rem]">
                    <div>
                      <div className="w-full flex items-center gap-[1.4rem] mb-[1rem]">
                        <Link href="">
                          <Image
                            src={"./images/gmail.svg"}
                            height={45}
                            width={45}
                            alt="Gmail"
                          />
                        </Link>
                        <Link href="">
                          <Image
                            src={"./images/whatsapp.svg"}
                            height={45}
                            width={45}
                            alt="WhatsApp"
                          />
                        </Link>
                        <Link href="">
                          <Image
                            src={"./images/number.svg"}
                            height={45}
                            width={45}
                            alt="Phone Number"
                          />
                        </Link>
                      </div>
                      <p className="text-[1.2rem] font-normal text-paragraph1">
                        Contact Me
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex flex-col justify-center gap-[1rem]">
                  <div className="w-full flex items-center gap-[1.4rem]">
                    <Link href="">
                      <Image
                        src={"./images/upwork.svg"}
                        height={100}
                        width={100}
                        className="h-[3.4rem] w-[3.4rem]"
                        alt="Upwork"
                      />
                    </Link>
                    <Link href="">
                      <Image
                        src={"./images/github.svg"}
                        height={100}
                        width={100}
                        className="h-[3.4rem] w-[3.4rem]"
                        alt="GitHub"
                      />
                    </Link>
                    <Link href="">
                      <Image
                        src={"./images/linkedin.svg"}
                        height={100}
                        width={100}
                        className="h-[3.4rem] w-[3.4rem]"
                        alt="LinkedIn"
                      />
                    </Link>
                    <Link href="">
                      <Image
                        src={"./images/dribbble.svg"}
                        height={100}
                        width={100}
                        className="h-[3.4rem] w-[3.4rem]"
                        alt="Dribbble"
                      />
                    </Link>
                    <Link href="">
                      <Image
                        src={"./images/behance.svg"}
                        height={100}
                        width={100}
                        className="h-[3.4rem] w-[3.4rem]"
                        alt="Behance"
                      />
                    </Link>
                  </div>
                  <p className="text-[1.2rem] font-normal text-paragraph1">
                    My Work Proof
                  </p>
                </div>
              </div>
              {/* Skills */}
              <div className="max-w-[62rem] w-full overflow-hidden py-[2rem] pr-[3rem] pl-[1rem]">
                <h3 className="text-[1.8rem] font-bold text-primary mb-[1.2rem]">
                  My Skills
                </h3>
                <div className="w-full p-[2rem] flex items-center justify-center border border-border border-solid gap-[1rem] flex-wrap flex-shrink-0 rounded-[1rem]">
                  <div className="max-w-[536px] w-full bg-white/70 backdrop-blur-[1.2rem] flex flex-wrap flex-shrink-0 gap-[1rem]">
                    {mySkills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-[2.1rem] py-[0.8rem] bg-white rounded-[5rem] shadow-skillShadow border-[1.5px] flex-shrink-0 border-solid border-[#DDD] justify-center items-center gap-[1rem] flex"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <div className="text-center text-primary text-[1.8rem] font-medium">
                          {skill}
                        </div>
                      </div>
                    ))}
                  </div>
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
