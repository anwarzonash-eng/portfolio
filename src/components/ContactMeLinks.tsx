import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip"; // adjust path if needed

const ContactMeLinks = ({ props }) => {
  interface ContactLinks {
    href: string;
    src: string;
    alt: string;
    label: string;
  }

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
                className="size-[50px] print:size-[80px]"
              />
            </Link>
          </Tooltip>
        ) : null
      )}
    </>
  );
};

export default ContactMeLinks;
