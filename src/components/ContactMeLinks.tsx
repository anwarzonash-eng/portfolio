import React from "react";
import Link from "next/link";
import Image from "next/image";

const ContactMeLinks = () => {
  interface ConstactLinks {
    href: string;
    src: string;
    alt: string;
  }

  const constactLinks: ConstactLinks[] = [
    { href: "/", src: "/images/gmail.svg", alt: "gmail" },
    { href: "/", src: "/images/whatsapp.svg", alt: "whatsapp" },
    { href: "/", src: "/images/number.svg", alt: "number" },
  ];
  return (
    <>
      {constactLinks.map(({ href, src, alt }) => (
        <Link href={href} key={alt}>
          <Image src={src} height={45} width={45} alt={alt} />
        </Link>
      ))}
    </>
  );
};

export default ContactMeLinks;
