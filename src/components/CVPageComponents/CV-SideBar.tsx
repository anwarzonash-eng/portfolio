"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";

interface CVSideBarProps {
  listOfdata: any;
  urlInfo?: any;
  scrollToSection?: (id: string) => void;
  contactDetails: (data: any) => Array<{
    href?: string;
    iconSrc?: string;
    alt: string;
    type: string;
    value: string;
  }>;
  socialLinks: (data: any) => Array<{
    href?: string;
    iconSrc?: string;
    alt: string;
    platform: string;
    username: string;
  }>;
}

const CVSideBar: React.FC<CVSideBarProps> = ({
  listOfdata,
  urlInfo,
  scrollToSection = () => {},
  contactDetails,
  socialLinks,
}) => {

  console.log("Profile Image: ", listOfdata?.profile_photo_1)
  return (
    <aside className="lg:max-w-[40rem] print:w-full print:break-before-page w-full flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover pb-[2rem] pt-[5rem] print:pt-[2rem] px-[2rem] lg:px-[3rem]">
      <div className="flex flex-col items-center">
        {/* Profile + Info */}
        <div className="print:flex flex flex-col items-center justify-center gap-4 print:w-full">
          <div className="print:flex flex flex-col print:flex-row items-center justify-center gap-4 print:w-full">
            <Link href="/" className="block">
              <img
                src={listOfdata?.profile_photo_1}
                height={1200}
                width={1200}
                alt="Profile Picture"
                className="h-[20.12rem] w-[20.12rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
              />
            </Link>
            <div>
              <Link
                href={"/"}
                className="text-heading text-[2.5rem] text-center lg:text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem]"
              >
                {listOfdata?.name}
              </Link>
              <h3 className="text-primary text-[2rem] font-medium leading-normal mt-[0.9rem]">
                {listOfdata?.designation
                  ?.split("|")
                  .map((item: string, index: number) => (
                    <div key={index} className="text-center">
                      {item.trim()}
                    </div>
                  ))}
              </h3>
            </div>
          </div>

          {/* Info Paragraph */}
          <div className="flex flex-col items-center justify-center print:w-full">
            <p className="my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center">
              Reach out today and I'll provide you with my comprehensive
              onboarding package designed for full-time employment or Contract
              Based Jobs. This package covers various aspects that potential
              employers often inquire about, such as my salary expectations and
              the seamless integration process into your company.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full h-[0.2rem] bg-[#E2E6EE] print:hidden mb-[4rem] inline-block" />

        {/* Availability */}
        <div className="mb-[4rem] w-full print:hidden text-center border border-solid border-[#E2E6EE] rounded-[0.6rem] overflow-hidden">
          <div className="bg-[#F7F9FC] p-[1.5rem]">
            <p className="text-[1.6rem] leading-normal font-normal text-heading">
              Next available
            </p>
            <h4 className="text-[2rem] font-medium text-primary leading-normal">
              {formatDate(
                new Date(new Date().getFullYear(), new Date().getMonth() + 1),
                dateFormatsOptions.longMonthYear
              )}
            </h4>
          </div>

          {!urlInfo?.u && (
            <>
              {listOfdata?.calendly_link ? (
                <Link target="_blank" href={listOfdata?.calendly_link || "#"}>
                  <button className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300">
                    Schedule Call
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300"
                >
                  Hire Me
                </button>
              )}
            </>
          )}
        </div>

        {/* Contact Details (Desktop) */}
        <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
          {contactDetails(listOfdata)
            .filter(({ alt }) => (urlInfo?.u ? alt === "Location" : true))
            .map((contact, index) => (
              <Link
                key={index}
                href={contact.href || "#"}
                className="flex items-center gap-[1.78rem] p-2 hover:bg-[#E2E6EE] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
              >
                {contact.iconSrc && (
                  <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                    <Image
                      src={contact.iconSrc}
                      height={24}
                      width={24}
                      alt={contact.alt}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    {contact.type}
                  </p>
                  <Link
                    target="_blank"
                    href={contact.href || "#"}
                    className="hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    {contact.value}
                  </Link>
                </div>
              </Link>
            ))}
        </div>

        {/* Divider */}
        <hr className="w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] sm:hidden lg:inline-block" />

        {/* Work Proof (Desktop) */}
        <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
          <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
            Work Proof
          </h3>
          {socialLinks(listOfdata)
            .filter(({ alt }) =>
              urlInfo?.u
                ? alt === "Github" || alt === "Linkedin" || alt === "Upwork"
                : true
            )
            .map((social, index) =>
              social.href ? (
                <Link
                  target="_blank"
                  href={social.href || "#"}
                  key={index}
                  className="flex items-center gap-[1.78rem] p-2 hover:bg-[#E2E6EE] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
                >
                  {social.iconSrc && (
                    <Image
                      src={social.iconSrc}
                      height={35}
                      width={35}
                      alt={social.alt}
                    />
                  )}
                  <div className="flex flex-col gap-[0.45rem]">
                    <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                      {social.platform}
                    </p>
                    <div className="break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading">
                      {social.username}
                    </div>
                  </div>
                </Link>
              ) : null
            )}
        </div>

        {/* Contact + Work Proof (Tablet Only) */}
        <div className="hidden sm:flex lg:hidden w-full gap-[2rem] items-start">
          <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
            {contactDetails(listOfdata)
              .filter(({ alt }) => (urlInfo?.u ? alt === "Location" : true))
              .map((contact, index) => (
                <Link
                  key={index}
                  target="_blank"
                  href={contact.href || "#"}
                  className="flex items-center gap-[1.78rem] p-2 hover:bg-[#E2E6EE] hover:scale-[98%] transition-all duration-300 cursor-pointer rounded-[6px] hover:drop-shadow-2xl max-w-max"
                >
                  {contact.iconSrc && (
                    <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                      <Image
                        src={contact.iconSrc}
                        height={24}
                        width={24}
                        alt={contact.alt}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-[0.45rem]">
                    <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                      {contact.type}
                    </p>
                    <Link
                      href={contact.href || "#"}
                      className="hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                    >
                      {contact.value}
                    </Link>
                  </div>
                </Link>
              ))}
          </div>

          {/* Work Proof */}
          <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
            <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
              Work Proof
            </h3>
            {socialLinks(listOfdata)
              .filter(({ alt }) =>
                urlInfo?.u
                  ? alt === "Github" || alt === "Upwork" || alt === "Linkedin"
                  : true
              )
              .map((social, index) => (
                <div key={index} className="flex items-center gap-[1.78rem]">
                  {social.iconSrc && (
                    <Image
                      src={social.iconSrc}
                      height={35}
                      width={35}
                      alt={social.alt}
                    />
                  )}
                  <div className="flex flex-col gap-[0.45rem]">
                    <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                      {social.platform}
                    </p>
                    <Link
                      href={social.href || "#"}
                      className="break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                    >
                      {social.username}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CVSideBar;
