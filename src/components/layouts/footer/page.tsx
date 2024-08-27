"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactMe from "@/components/ContactMe";

const Footer = () => {
  interface FooterLink {
    href: string;
    title: string;
  }
  const footerLinks: FooterLink[] = [
    { href: "/", title: "Home" },
    { href: "/", title: "Cover Letter" },
    { href: "/", title: "Projects" },
    { href: "/", title: "CV" },
    { href: "/", title: "Skill" },
    { href: "/", title: "Services" },
    { href: "/", title: "GitHub" },
    { href: "/", title: "upWork" },
    { href: "/", title: "Dribble" },
    { href: "/", title: "Behance" },
    { href: "/", title: "Blog" },
  ];
  return (
    <>
      {/* Contact Form Section */}
      <section className="bg-transparent">
        <div className="mainContainer">
          <ContactMe />
        </div>
      </section>
      {/* Footer  */}
      <footer className="">
        <div className="bg-footerBg h-[46.4rem] lg:h-[57.6rem] py-[6rem] lg:py-[10rem] w-full bg-center bg-cover bg-no-repeat flex flex-col items-center justify-end">
          <div className="mainContainer flex items-center justify-center">
            {/* Footer Links */}
            <div className=" max-w-[63.5rem] w-full flex items-center justify-center flex-wrap gap-[4rem] text-heading text-[1.8rem] font-medium">
              {footerLinks.map(({ href, title }) => (
                <Link href={href} key={title} className="footerLink">
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-heading text-[1.8rem] font-normal  py-[1.5rem] px-[2rem] bg-white">
          All Rights Reserved © Cypexsoft 2024
        </p>
      </footer>
    </>
  );
};
export default Footer;
