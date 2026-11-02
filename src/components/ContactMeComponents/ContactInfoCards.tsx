"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import type { ProfileReport } from "@/types/api";

/** Email / phone / address / quick-link cards (extracted verbatim from ContactMe). */
const ContactInfoCards = ({
  listOfdata,
}: {
  listOfdata: ProfileReport | null;
}) => {
  // Contact Links
  const constactLinks = [
    { href: listOfdata?.upwork, src: "/images/upwork.svg", alt: "upwork" },
    { href: listOfdata?.github, src: "/images/github.svg", alt: "github" },
    {
      href: listOfdata?.calendly_link,
      src: "/images/chatNowIcon.svg",
      alt: "calendly",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-[1.5rem] mb-[2rem]">
      <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
        <Image
          src={"/images/envelop.svg"}
          height={40}
          width={40}
          alt="envelop"
          className="print:h-[4rem] print:w-[4rem]"
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
          alt="phone"
          className="print:h-[4rem] print:w-[4rem]"
        />
        <Link href={`tel:${listOfdata?.phone_no}`}>
          <div className="w-full font-medium">
            <p className="text-paragraph1 text-[1.2rem] uppercase">Call Me</p>
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
          alt="location"
          className="print:h-[4rem] print:w-[4rem]"
        />
        <div className="w-full flex justify-between print:justify-start print:gap-8">
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
              className="h-[3rem] w-[3rem] rounded-full object-cover print:h-[4rem] print:w-[4rem]"
              alt="Uk Flag"
            />
          )}
        </div>
      </div>
      <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center justify-around print:justify-start print:gap-8">
        {constactLinks.map(({ href, src, alt }) =>
          href ? (
            <Tooltip
              text={`My ${alt.charAt(0).toUpperCase() + alt.slice(1)}`}
              key={alt}
            >
              <Link href={href ? href : "#"} target="_blank">
                <Image src={src.trim()} height={50} width={50} alt={alt} />
              </Link>
            </Tooltip>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default ContactInfoCards;
