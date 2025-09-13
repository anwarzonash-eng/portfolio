import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip"; // adjust path if needed
import { useAppSelector } from "@/store";

const ContactMeLinks = ({ props }) => {
  interface ContactLinks {
    href: string;
    src: string;
    alt: string;
    label: string;
  }

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);

  const contactLinks: ContactLinks[] = [
    {
      href: `mailto:${props?.email}`,
      src: "/images/gmail.svg",
      alt: "gmail",
      label: "My Gmail",
    },
    {
      href: `https://wa.me/${props?.phone_no}`,
      src: "/images/whatsapp.svg",
      alt: "whatsapp",
      label: "My WhatsApp",
    },
    {
      href: `tel:${props?.phone_no}`,
      src: "/images/number.svg",
      alt: "number",
      label: "Call Me",
    },
    {
      href: `${listOfdata?.calendly_link}`,
      src: "/images/calendlyicon.svg",
      alt: "calendly",
      label: "Schedule Meeting",
    },
  ];

  return (
    <>
      {contactLinks.map(({ href, src, alt, label }) =>
        href ? (
          <Tooltip text={label} key={alt}>
            <Link href={href} target="_blank">
              <Image
                src={src}
                height={45}
                width={45}
                alt={alt}
                className={`size-[50px] print:size-[80px] ${
                  src == "/images/calendlyicon.svg"
                    ? "h-[5rem] w-[5rem] bg-[#006bff] rounded-full flex items-center justify-center"
                    : ""
                }`}
              />
            </Link>
          </Tooltip>
        ) : null
      )}
    </>
  );
};

export default ContactMeLinks;
