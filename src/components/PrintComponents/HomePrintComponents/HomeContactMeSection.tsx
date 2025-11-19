import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { openChat } from "@/hooks/openTawkTochat";
import Tooltip from "@/components/Tooltip";
import {
  Behance,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
} from "@/components/SVGI-Icons";

declare global {
  interface Window {
    Tawk_API?: any;
  }
}

const HomeContactMeSection = ({ listOfdata, formatPhoneNumber }) => {
  interface ConstactLinks {
    href: string;
    src: string;
    alt: string;
  }

  // console.log("Data:", listOfdata.linkedIn);

  // Contact Links
  const constactLinks: ConstactLinks[] = [
    { href: listOfdata?.upwork, src: "/images/upwork.svg", alt: "upwork" },
    { href: listOfdata?.github, src: "/images/github.svg", alt: "github" },
    {
      href: `https://wa.me/${listOfdata?.phone_no}`,
      src: "/images/whatsapp.svg",
      alt: "whatsapp",
    },
  ];

  // Social Media Links
  const socialMediaLinksForContactComponent = [
    {
      link: listOfdata?.behance_link,
      SVG: Behance,
    },
    {
      link: listOfdata?.twitter,
      SVG: Twitter,
    },
    {
      link: listOfdata?.instagram,
      SVG: Instagram,
    },
    {
      link: listOfdata?.facebook,
      SVG: Facebook,
    },
    {
      link: listOfdata?.linkedIn,
      SVG: LinkedIn,
    },
  ];

  return (
    <div
      id="contact"
      className="bg-footerDesktop bg-no-repeat bg-left-top w-full  bg-cover rounded-[1rem] relative p-[2rem] gap-[2.4rem] flex-shrink-0 h-screen  flex items-center justify-center overflow-hidden"
    >
      {/* Contact Details */}
      <div className="w-full">
        {/* Badge */}
        <div className="flex items-center justify-center">
          <div className="badge">Stay In Touch</div>
        </div>
        {/* Heading */}
        <div className="text-heading text-[4rem] p-[0.8rem] font-medium leading-[4.8rem] text-center">
          You want to hire me?
        </div>
        <div className="text-primary text-[3rem] p-[0.8rem] font-medium leading-[4.8rem] mb-[3.2rem] text-center">
          Book either an appointment or explore following option for quick chat:
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-[1.5rem] mb-[2rem]">
          <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
            <Image
              src={"/images/envelop.svg"}
              height={40}
              width={40}
              loading="eager"
              priority={true}
              alt="envelop"
              className="h-[4rem] w-[4rem]"
            />
            <div className="overflow-hidden text-wrap break-words">
              <div className="w-full font-medium">
                <p className="text-paragraph1 text-[1.4rem] uppercase">
                  Chat with me
                </p>
                <Link
                  href={`mailto:${listOfdata?.email}`}
                  className="text-heading text-[1.5rem] hover:text-primary duration-300 "
                >
                  {listOfdata?.email}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
            <Image
              src={"/images/phone.svg"}
              height={40}
              width={40}
              loading="eager"
              priority={true}
              alt="phone"
              className="h-[4rem] w-[4rem]"
            />
            <Link href={`tel:${listOfdata?.phone_no}`}>
              <div className="w-full font-medium">
                <p className="text-paragraph1 text-[1.2rem] uppercase">
                  Call Me
                </p>
                <h4 className="text-heading text-[1.5rem] hover:text-primary duration-300 ">
                  {formatPhoneNumber(listOfdata?.phone_no)}
                </h4>
              </div>
            </Link>
          </div>
          <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
            <Image
              src={"/images/location.svg"}
              height={40}
              width={40}
              loading="eager"
              priority={true}
              alt="location"
              className="h-[4rem] w-[4rem]"
            />
            <div className="w-full flex justify-start gap-8">
              <div>
                <div className=" font-medium">
                  <p className="text-paragraph1 text-[1.2rem] uppercase ">
                    Address
                  </p>
                  <Link
                    target="_blank"
                    className="text-heading text-[1.5rem] hover:text-primary duration-300 "
                    href={`https://www.google.com/maps/place/${listOfdata?.location}
                  )}`}
                  >
                    {listOfdata?.location}
                  </Link>
                </div>{" "}
              </div>

              {listOfdata?.location?.includes("Manchester, UK") && (
                <Image
                  src={"/images/ukFlag.svg"}
                  height={35}
                  width={35}
                  loading="eager"
                  priority={true}
                  className="rounded-full object-cover h-[4rem] w-[4rem]"
                  alt="Uk Flag"
                />
              )}
            </div>
          </div>
          <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center justify-start gap-8">
            {constactLinks.map(({ href, src, alt }) =>
              href ? (
                <Tooltip
                  text={`My ${alt.charAt(0).toUpperCase() + alt.slice(1)}`}
                  key={alt}
                >
                  <Link href={href} target="_blank">
                    <Image
                      src={src}
                      loading="eager"
                      priority={true}
                      height={50}
                      width={50}
                      alt={alt}
                    />
                  </Link>
                </Tooltip>
              ) : null
            )}
          </div>
        </div>
        {/* Ruler Line */}

        {/* Follow Me On Social Media */}
        {listOfdata?.behance_link ||
        listOfdata?.twitter ||
        listOfdata?.instagram ||
        listOfdata?.facebook ||
        listOfdata?.linkedin ||
        listOfdata?.phone_no ||
        listOfdata?.upwork ? (
          <>
            <hr className="w-full h-[1px] bg-border" />
            <div className="flex justify-between items-start mt-[4rem]
            px-5">
              {listOfdata?.behance_link ||
              listOfdata?.twitter ||
              listOfdata?.instagram ||
              listOfdata?.facebook ? (
                <div className="w-full">
                  <p className="text-[1.6rem] font-normal uppercase text-heading text-left">
                    Follow me on social media
                  </p>
                  {/* SVG Social Icons */}
                  <div>
                    <div className="flex items-start justify-normal flex-wrap gap-[1.6rem] mt-[1.4rem]">
                      {socialMediaLinksForContactComponent?.map((C) => (
                        <>
                          {C.link && (
                            <Link href={C.link} target="_blank">
                              <C.SVG />
                            </Link>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="w-full">
                <p className="text-[1.6rem] font-normal uppercase text-heading text-left">
                  Contact Me
                </p>
                {/* SVG Social Icons */}
                <div>
                  <div className="flex items-start flex-wrap gap-[1.6rem] mt-[1.4rem]">
                    {listOfdata?.phone_no && (
                      <Tooltip text="My WhatsApp">
                        <Link
                          href={`https://wa.me/${listOfdata?.phone_no}`}
                          target="_blank"
                        >
                          <Image
                            alt="WhatsApp"
                            src="/images/whatsappforContactComponent.svg"
                            width={100}
                            height={100}
                            loading="eager"
                            priority={true}
                            className="h-[4rem] w-[4rem]"
                          />
                        </Link>
                      </Tooltip>
                    )}

                    {listOfdata?.upwork && (
                      <Tooltip text="My Upwork">
                        <Link href={listOfdata?.upwork} target="_blank">
                          <Image
                            alt="Upwork"
                            src="/images/upworkforContactComponent.svg"
                            width={100}
                            height={100}
                            loading="eager"
                            priority={true}
                            className="h-[4rem] w-[4rem]"
                          />
                        </Link>
                      </Tooltip>
                    )}

                    <Tooltip text="Chat Now">
                      <button
                        onClick={(e) => openChat(e)}
                        className="text-primary font-bold text-lg"
                      >
                        <div className="h-[4rem] w-[4rem] bg-[#22357b] rounded-lg relative">
                          <Image
                            alt="Chat Now"
                            src="/images/chatNowIcon.svg"
                            width={100}
                            height={100}
                            loading="eager"
                            priority={true}
                            className="h-[3rem] w-[3rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                      </button>
                    </Tooltip>

                    {listOfdata?.calendly_link && (
                      <Tooltip text="Schedule Meeting">
                        <Link href={listOfdata?.calendly_link} target="_blank">
                          <div className="h-[4rem] w-[4rem] bg-[#006bff] rounded-lg flex items-center justify-center relative">
                            <Image
                              alt=""
                              src="/images/calendlyicon.svg"
                              width={100}
                              height={100}
                              loading="eager"
                              priority={true}
                              className="h-[3rem] w-[3rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                          </div>
                        </Link>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HomeContactMeSection;
