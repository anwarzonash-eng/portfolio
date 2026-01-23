import DesignationDomain from "@/components/DesignationDomain";
import { contactDetails, dateFormatsOptions, socialLinks } from "@/data/JsonData";
import { formatDate } from "@/hooks/formatdate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const IntroCvPortrait = ({listOfdata, urlInfo}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center  bg-cvSideBg bg-no-repeat bg-cover px-[2rem]">
      <div className="w-full">
        {/* Profile Bg */}
        <div className="print:flex flex flex-col items-center justify-center gap-4 print:w-full">
          <div className="print:flex flex flex-col print:flex-row items-center justify-center gap-4 print:w-full">
            <Link href="/" className=" block">
              <Image
                src={listOfdata?.profile_photo_1}
                 loading="eager"
                 priority={true}
                height={1200}
                width={1200}
                alt="Profile Picture"
                className="h-[20.12rem] w-[20.12rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
              />
            </Link>
            <div className="">
              {/* Name */}

              <Link
                href={"/"}
                className="text-heading text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem] text-center"
              >
                {listOfdata?.name}
              </Link>
              {/* Designation */}
              <h3 className="text-primary text-[2rem] font-medium leading-normal mt-[0.9rem]">
                {listOfdata?.designation?.split("|").map((item, index) => (
                  <div key={index} className="text-center">
                    {item.trim()}
                  </div>
                ))}
              </h3>
              <div className="flex items-center justify-center">
                <DesignationDomain />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center print:w-full">
            {/* Info */}
            <p className="my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center">
              Reach out today, and I’ll share my comprehensive professional
              profile. It includes essential details that help potential
              collaborators understand my expertise, expectations, and how I can
              seamlessly integrate into your team or organization.
            </p>
          </div>
        </div>
        {/* Divider */}
        <hr className="w-full h-[0.2rem] bg-[#E2E6EE] print:hidden mb-[4rem] inline-block" />
        {/* Availability */}
        <div className="mb-[4rem] w-full hidden text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden">
          <div className="bg-[#F7F9FC]  p-[1.5rem]">
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
        </div>
        {/* Contact & Work Proof Container */}
        <div className="flex w-full gap-[2rem] items-start px-[3rem]">
          {/* Email, Website, Phone, Location */}
          <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
            {contactDetails(listOfdata, urlInfo)
              .filter(({ alt }) => (urlInfo?.u ? alt === "Location" : true))
              .map((contact, index) => (
                <div key={index} className="flex items-center gap-[1.78rem]">
                  {contact.iconSrc && (
                    <div
                      className="h-[35px] w-[35px] bg-[#E2E6EE] 
                      rounded-[50%] relative">
                      <Image
                        src={contact.iconSrc}
                         loading="eager"
                         priority={true}
                        height={24}
                        width={24}
                        alt={contact.alt}
                        className="h-[24px] w-[24px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
                </div>
              ))}
          </div>

          {/* Work Proof */}
          <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
            {/* Title */}
            <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
              Work Proof
            </h3>

            {/* Iterating on Icons */}
            {socialLinks(listOfdata)
              .filter(({ alt }) =>
                urlInfo?.u
                  ? alt === "Github" || alt === "Upwork"
                  : true
              )
              .slice(0, 3)
              .map((social, index) => (
                <div key={index} className="flex items-center gap-[1.78rem]">
                  {social.iconSrc && (
                    <Image
                      src={social.iconSrc}
                       loading="eager"
                       priority={true}
                      height={35}
                      width={35}
                      alt={social.alt}
                      className="h-[35px] w-[35px]"
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
    </div>
  );
};

export default IntroCvPortrait;
