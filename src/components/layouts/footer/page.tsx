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
  const pathname = usePathname();

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

  const socialLinks = [
    {
      href: listOfdata?.github,
      label: "GitHub",
      icon: (
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      ),
    },
    {
      href: listOfdata?.linkedIn,
      label: "LinkedIn",
      icon: (
        <>
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
    {
      href: listOfdata?.upwork,
      label: "Upwork",
      icon: null, // will render with Image instead of SVG path
    },
    {
      href: listOfdata?.behance_link,
      label: "Behance",
      icon: (
        <>
          <path d="M3 9h6.5a2.5 2.5 0 010 5H3V9z" />
          <path d="M3 14h7a3 3 0 010 6H3v-6z" />
          <path d="M14 9h7M15.5 13a4 4 0 110-4 4 4 0 010 4z" />
        </>
      ),
    },
  ].filter(({ href }) => !!href);

  console.log("Footer data:", listOfdata);
  return (
    <>
      {!loading && (
        <>
          {/* Contact Me section */}
          {!urlInfo?.u && (
            <section className="bg-transparent print:hidden block">
              <div className="mainContainer">
                <ContactMe listOfdata={listOfdata} />
              </div>
            </section>
          )}

          {/* Upwork activity on contact page */}
          {pathname.includes("/contact-me") &&
            listOfdata &&
            listOfdata?.upwork_show_status === "show" && (
              <div className="mt-[2rem] lg:mt-[4rem] w-full">
                <UpworkActivitySection
                  urlInfo={urlInfo}
                  cvTrue={false}
                  data={listOfdata}
                />
              </div>
            )}

          {/* ===== Footer ===== */}
          <footer className="print:block mt-[2rem] bg-sectionBG pt-12">
            <div className="w-full mainContainer text-[1.8rem] font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start lg:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src={listOfdata?.profile_photo_1}
                      height={48}
                      width={48}
                      alt="Profile Picture"
                      className="rounded-[50%]"
                    />
                    <span className="text-white font-bold text-[2rem] tracking-tight uppercase">
                      {listOfdata?.name || "Developer"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-[370px] md:max-w-[360px]">
                    {listOfdata?.designation}
                  </p>

                  {/* Social icons – only rendered when the link is available */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {socialLinks.map(({ href, label, icon }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        aria-label={label}
                        className="w-10 h-10 rounded-full border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all"
                      >
                        {label === "Upwork" ? (
                          <span className="text-[1.2rem] font-semibold">{"up"}</span>
                        ) : (
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {icon}
                          </svg>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Pages */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Pages</h4>
                  <ul className="space-y-3">
                    {footerLinks
                      .filter(({ title }) =>
                        ["Home", "Cover Letter", "Portfolios", "Blog", "CV", "Contact Me"].includes(title)
                      )
                      .filter(({ title }) =>
                        urlInfo?.u && title === "Contact Me" ? false : true
                      )
                      .map(({ href, title }) =>
                        href ? (
                          <li key={title}>
                            <Link href={href} className="text-gray-400 hover:text-gray-200 text-xs transition-colors">
                              {title}
                            </Link>
                          </li>
                        ) : null
                      )}
                  </ul>
                </div>

                {/* always show Services column */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
                  <ul className="space-y-3">
                    {services.length > 0 ? (
                      services.slice(0, 6).map((service, index) => (
                        <li key={index}

                          className="text-gray-400 hover:text-gray-200 text-xs transition-colors"
                        >
                          {service?.title}

                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 text-xs">No services available</li>
                    )}
                  </ul>
                </div>

                {/* Contact info */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
                  <ul className="space-y-3">
                    {listOfdata?.location && (
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 text-xs mt-px">📍</span>
                        <Link
                          href={`https://www.google.com/maps/place/${listOfdata?.location}`}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-200 text-xs leading-relaxed transition-colors"
                        >
                          {listOfdata?.location}
                        </Link>
                      </li>
                    )}
                    {listOfdata?.email && (
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 text-xs mt-px">✉️</span>
                        <Link
                          href={`mailto:${listOfdata?.email}`}
                          className="text-gray-400 hover:text-gray-200 text-xs leading-relaxed transition-colors"
                        >
                          {listOfdata?.email}
                        </Link>
                      </li>
                    )}
                    {listOfdata?.phone_no && (
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 text-xs mt-px">📞</span>
                        <Link
                          href={`https://wa.me/${listOfdata.phone_no.replace(/\D/g, "")}`}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-200 text-xs leading-relaxed transition-colors"
                        >
                          {listOfdata?.phone_no}
                        </Link>
                      </li>
                    )}
                    {listOfdata?.calendly_link && !urlInfo?.u && (
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 text-xs mt-px">📅</span>
                        <Link
                          href={listOfdata?.calendly_link}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-200 text-xs leading-relaxed transition-colors"
                        >
                          Schedule a Call
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-white/5 pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-400 text-xs print:hidden">
                  All Rights Reserved ©{" "}
                  <span className="uppercase">{listOfdata?.name || "Developer"}</span>{" "}
                  {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </footer>
        </>
      )
      }
    </>
  );
};

export default Footer;
