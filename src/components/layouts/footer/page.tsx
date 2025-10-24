"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactMe from "@/components/ContactMe";
import FooterNewsLetter from "@/components/FooterNewsLetter";
import { useAppSelector } from "@/store";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname(); // Gets the current pathname

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
    { href: "/portfolio", title: "Portfolios" },
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
            <section className="bg-transparent print:hidden block">
              <div className="mainContainer">
                <ContactMe listOfdata={listOfdata} />
              </div>
            </section>
          )}
          {pathname.includes("/contact-me") && (
            <div className="mt-[2rem] lg:mt-[4rem] w-full">
              <UpworkActivitySection
                urlInfo={urlInfo}
                cvTrue={false}
                data={listOfdata}
              />
            </div>
          )}
          {/* Footer */}
          <footer className="print:block mt-[2rem] bg-sectionBG ">
            <div
              className={`${
                urlInfo?.u ? "" : ""
              } w-full mainContainer text-[1.8rem] font-medium bg-sectionBG bg-Newslatter bg-no-repeat bg-contain bg-right`}
            >
              <div className="py-[3rem] w-full flex justify-between flex-col sm:flex-row">
                {/* CTA Section */}
                <div className="mr-10 lg:min-w-[550px]">
                  <FooterNewsLetter listOfdata={listOfdata} />
                  <p className="print:hidden text-pageBG text-[1.4rem] font-normal py-[1.5rem]">
                    All Rights Reserved ©{" "}
                    <span className="uppercase">
                      {listOfdata?.name || "Cypexsoft"}
                    </span>{" "}
                    2025
                  </p>
                </div>
                {/* Links Section  */}
                <div className="flex  justify-between lg:justify-end flex-wrap gap-[4rem] lg:gap-[8rem] w-full">
                  {/* Pages Column */}
                  <div className="flex flex-col items-start gap-4">
                    <h4 className="text-[2rem] font-medium text-pageBG">
                      Pages
                    </h4>
                    {footerLinks
                      .filter(({ title }) =>
                        [
                          "Home",
                          "Cover Letter",
                          "Portfolios",
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
                    <h4 className="text-[2rem] font-medium text-pageBG">
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
                      .filter(({ title }) =>
                        // if urlInfo.u is true, exclude "Schedule a Call"
                        urlInfo?.u && title === "Schedule Call" ? false : true
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
                  {process.env.IS_SERVICES_ALLOWED === "true" &&
                    services.length > 0 && (
                      <div className="flex flex-col items-start gap-4">
                        <h4 className="text-[2rem] font-medium text-pageBG">
                          Servises
                        </h4>
                        {services.slice(0, 6).map((service, index) => (
                          <Link
                            // href={`/offer?service=${service?.title}`}
                            href={`/service-detail?service=${encodeURIComponent(
                              service?.title
                            )}`}
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
          </footer>
        </>
      )}
    </>
  );
};

export default Footer;
