"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import { Behance, Facebook, Instagram, Twitter, LinkedIn } from "@/components/SVGI-Icons";
import type { ProfileReport } from "@/types/api";

/** "Follow me on social media" + quick contact icon rows (extracted verbatim from ContactMe). */
const ContactSocialLinks = ({
  listOfdata,
}: {
  listOfdata: ProfileReport | null;
}) => {
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

  if (
    !(
      listOfdata?.behance_link ||
      listOfdata?.twitter ||
      listOfdata?.instagram ||
      listOfdata?.facebook ||
      listOfdata?.linkedin ||
      listOfdata?.phone_no ||
      listOfdata?.upwork
    )
  )
    return null;

  return (
    <>
      <hr className="w-full h-[1px] bg-border" />
      <div className="block sm:flex md:block xl:flex justify-between">
        {listOfdata?.behance_link ||
          listOfdata?.twitter ||
          listOfdata?.instagram ||
          listOfdata?.facebook ? (
          <div className="w-full px-[0.8rem] mt-[1.2rem]">
            <p className="text-[1.6rem] font-normal uppercase text-heading text-center sm:text-left">
              Follow me on social media
            </p>
            {/* SVG Social Icons */}
            <div>
              <div className="flex items-start justify-center sm:justify-normal flex-wrap gap-[1.6rem] mt-[1.4rem]">
                {socialMediaLinksForContactComponent?.map((C, i) => (
                  <>
                    {C.link && (
                      <Link href={C.link ? C.link : "#"} target="_blank" key={i}>
                        <C.SVG />
                      </Link>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="w-full px-[0.8rem] mt-[1.2rem]">
          <p className="mt-[3rem] sm:mt-0 md:mt-[3rem] xl:mt-0 text-[1.6rem] font-normal uppercase text-heading text-center sm:text-left">
            Contact Me
          </p>
          {/* SVG Social Icons */}
          <div>
            <div className="flex items-start justify-center sm:justify-normal flex-wrap gap-[1.6rem] mt-[1.4rem]">
              {listOfdata?.phone_no && (
                <Tooltip text="My WhatsApp">
                  <Link
                    href={`https://wa.me/${listOfdata?.phone_no}`}
                    target="_blank"
                    className="flex items-center justify-center"
                  >
                    <Image
                      alt="WhatsApp"
                      src="/images/whatsappforContactComponent.svg"
                      width={100}
                      height={100}
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
                      className="h-[4rem] w-[4rem]"
                    />
                  </Link>
                </Tooltip>
              )}

              {listOfdata?.calendly_link && (
                <Tooltip text="Schedule Meeting">
                  <Link href={listOfdata?.calendly_link} target="_blank">
                    <div className="h-[4rem] w-[4rem] bg-[#006bff] rounded-lg flex items-center justify-center">
                      <Image
                        alt=""
                        src="/images/calendlyicon.svg"
                        width={100}
                        height={100}
                        className="h-[3rem] w-[3rem]"
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
  );
};

export default ContactSocialLinks;
