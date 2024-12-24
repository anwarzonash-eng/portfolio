"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactMe from "@/components/ContactMe";
import { useAppSelector } from "@/store";

const Footer = () => {
  interface FooterLink {
    href: string;
    title: string;
  }

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
  const loading = useAppSelector((state) => state.profile.profileLoading);

  const footerLinks: FooterLink[] = [
    { href: "/", title: "Home" },
    ...(listOfdata?.services && listOfdata?.services?.length > 0
      ? [{ title: "Cover Letter", href: "/offer" }]
      : []),
    { href: "/portfolio", title: "Projects" },
    { href: "/blog-listing", title: "Blog" },
    { href: "/cv", title: "CV" },
    { href: "/contact-me", title: "Contact Me" },
    { href: listOfdata?.calendly_link, title: "Schedule Call" },
    { href: listOfdata?.github, title: "GitHub" },
    { href: listOfdata?.upwork, title: "Upwork" },
    { href: listOfdata?.behance_link, title: "Behance" },
    { href: listOfdata?.linkedIn, title: "LinkedIn" },
  ];

  const services =
    listOfdata?.services?.filter(({ type }) => type !== "main") || [];

  return (
    <>
      {!loading && (
        <>
          {/* Contact Form Section */}
          {!urlInfo?.u && (
            <section className="bg-transparent">
              <div className="mainContainer">
                <ContactMe listOfdata={listOfdata} />
              </div>
            </section>
          )}
          {/* Footer */}
          <footer>
            <div
              className={`bg-footerBg ${
                urlInfo?.u ? "" : ""
              } w-full bg-center bg-cover bg-no-repeat flex print:hidden flex-col items-center justify-end`}
            >
              <div className="mainContainer text-[1.8rem] font-medium flex items-center justify-center">
                <div className="py-[3rem] w-full flex items-start justify-between flex-wrap gap-[4rem] text-heading text-[1.8rem] font-medium">
                  {/* Pages Column */}
                  <div className="flex flex-col items-start gap-4">
                    <h4 className="text-[2.5rem] font-bold text-heading footerLink">
                      Pages
                    </h4>
                    {footerLinks
                      .filter(({ title }) =>
                        [
                          "Home",
                          "Cover Letter",
                          "Projects",
                          "Blog",
                          "CV",
                          "Contact Me",
                        ].includes(title)
                      )
                      .map(({ href, title }) =>
                        href ? (
                          <Link
                            href={href}
                            key={title}
                            className="footerLink"
                            target="_blank"
                          >
                            {title}
                          </Link>
                        ) : null
                      )}
                  </div>

                  {/* Social Links Column */}
                  <div className="flex flex-col items-start gap-4">
                    <h4 className="text-[2.5rem] font-bold text-heading footerLink">
                      Contacts
                    </h4>
                    {footerLinks
                      .filter(({ title }) =>
                        [
                          "Schedule Call",
                          "GitHub",
                          "Upwork",
                          "Behance",
                          "LinkedIn",
                        ].includes(title)
                      )
                      .map(({ href, title }) =>
                        href ? (
                          <Link
                            href={href}
                            key={title}
                            className="footerLink"
                            target="_blank"
                          >
                            {title}
                          </Link>
                        ) : null
                      )}
                  </div>

                  {/* Services Column */}
                  {services.length > 0 && (
                    <div className="flex flex-col items-start gap-4">
                      <h4 className="text-[2.5rem] font-bold text-heading footerLink">
                        Servises
                      </h4>
                      {services.map((service, index) => (
                        <Link
                          href={`/offer?service=${service?.title}`}
                          key={index}
                          className="footerLink"
                        >
                          {service?.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-center text-heading text-[1.8rem] font-normal py-[1.5rem] px-[2rem] bg-white">
              All Rights Reserved ©{" "}
              <span className="capitalize">
                {listOfdata?.name || "Cypexsoft"}
              </span>{" "}
              2024
            </p>
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;
