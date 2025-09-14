import { openChat } from "@/hooks/openTawkTochat";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tooltip from "./Tooltip";

const ThankyouPopup = ({ setIsModalOpen, listOfdata, text = null }) => {
  const contactOptions = [
    listOfdata?.upwork && {
      href: listOfdata.upwork,
      src: "/images/upworkforContactComponent.svg",
      alt: "upwork",
      bg: "transparent",
      isButton: false,
    },
    listOfdata?.github && {
      href: listOfdata?.github,
      src: "/images/github.svg",
      alt: "github",
      bg: "transparent",
      isButton: false,
    },
    listOfdata?.linkedIn && {
      href: listOfdata?.linkedIn,
      src: "/images/linkedin.svg",
      alt: "Linkedin",
      bg: "transparent",
      isButton: false,
    },
    listOfdata?.phone_no && {
      href: `https://wa.me/${listOfdata.phone_no}`,
      src: "/images/whatsappforContactComponent.svg",
      alt: "whatsapp",
      bg: "transparent",
      isButton: false,
    },
    listOfdata?.calendly_link && {
      href: listOfdata.calendly_link,
      src: "/images/calendlyicon.svg",
      alt: "calendly",
      bg: "#006bff",
      isButton: false,
    },
    {
      href: "#",
      src: "/images/chatNowIcon.svg",
      alt: "chat",
      bg: "#22357b",
      isButton: true,
    },
  ].filter(Boolean); // removes null/false entries

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-3xl z-[500]">
      <div className="rounded-[1.2rem] relative w-full h-full overflow-y-auto py-[10rem]">
        <div className="mx-6">
          <div className="rounded-[1.2rem] max-w-[60.4rem] w-full mx-auto bg-white relative shadow-2xl shadow-primary">
            {/* Close Icon */}
            <div className="absolute top-[-1rem] right-[-1rem] cursor-pointer z-[60]">
              <Image
                src="/images/close-icon.svg"
                height={50}
                width={50}
                className="h-[3rem] w-[3rem]"
                alt="Close Icon"
                onClick={() => setIsModalOpen(false)} // Close popup on click
              />
            </div>
            <div className="p-[5rem] text-center">
              <h3 className="text-[2.8rem] font-medium text-primary mb-4">
                Thank you for {text ? text : "subscribing"} !
              </h3>
              <p className="text-[1.7rem] mb-6 px-5">
                We will be in touch with you within the next hour. For a quicker
                response, please explore the following options:
              </p>
              <div className="flex items-start justify-center flex-wrap gap-[1.6rem] mt-[2.4rem]">
                {contactOptions.map(({ href, src, alt, bg, isButton }, idx) => (
                  <Tooltip
                    text={`My ${alt.charAt(0).toUpperCase() + alt.slice(1)}`}
                    key={idx}
                  >
                    {isButton ? (
                      <button
                        onClick={(e) => openChat(e)}
                        className="text-primary font-bold text-lg"
                      >
                        <div
                          className={`h-[4rem] w-[4rem] rounded-lg flex items-center justify-center`}
                          style={{ backgroundColor: bg }}
                        >
                          <Image
                            alt={alt}
                            src={src}
                            width={100}
                            height={100}
                            className="h-[3rem] w-[3rem]"
                          />
                        </div>
                      </button>
                    ) : (
                      <Link href={href} target="_blank">
                        <div
                          className={`h-[4rem] w-[4rem] rounded-lg flex items-center justify-center`}
                          style={{ backgroundColor: bg }}
                        >
                          <Image
                            alt={alt}
                            src={src}
                            width={100}
                            height={100}
                            className={`${
                              bg === "transparent"
                                ? "h-[4rem] w-[4rem]"
                                : "h-[3rem] w-[3rem]"
                            }`}
                          />
                        </div>
                      </Link>
                    )}
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankyouPopup;
