"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import { useAppSelector } from "@/store";
import { scrollToSection } from "@/hooks/scrollToSection";
import OfferBanner from "@/components/OfferBanner";

interface HeaderLink {
  title: string;
  src: string;
  isDropdown?: boolean;
}

interface HeaderProps {
  initialBgColor?: string;
}

const Header = ({ initialBgColor = "bg-transparent" }) => {
  // Use localStorage or initialBgColor for initial background state
  const [bgColor, setBgColor] = useState(initialBgColor);

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
  const loading = useAppSelector((state) => state.profile.profileLoading);
  const pathname = usePathname(); // Gets the current pathname
  // Gets the search params (query string)
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const resourceDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarHamburgerButtonRef = useRef(null);
  const servivesDropdownButtonRef = useRef(null);
  const resourcesDropdownButtonRef = useRef(null);
  const resourcesDivRef = useRef(null);
  const servicesDivRef = useRef(null);

  const headerLinks: HeaderLink[] = [
    { title: "Home", src: "/" },
    ...(listOfdata?.services && listOfdata?.services?.length > 0
      ? [{ title: "Cover Letter", src: "/offer" }]
      : []),

    ...(listOfdata?.services && listOfdata?.services?.length > 0
      ? [{ title: "Services", src: "#", isDropdown: true }]
      : []),
    { title: "Portfolios ", src: "/portfolio" },
    { title: "Blogs", src: "/blog-listing" },
    { title: "CV", src: "/cv" },
  ];
  const serviceContentMap = {
    "Database Development": {
      image: "/images/my_services/db.jpg",
      description:
        "Design and manage scalable, secure databases to support your applications and business logic.",
    },
    "Shopify Development": {
      image: "/images/my_services/shopify.png",
      description:
        "Build and customize high-performing Shopify stores to grow your eCommerce business effectively.",
    },
    "Product Development": {
      image: "/images/my_services/product.png",
      description:
        "Transform ideas into fully functional digital products with end-to-end design and development support.",
    },
    "Back-End Web Development": {
      image: "/images/my_services/backend.png",
      description:
        "Create robust server-side logic, APIs, and integrations to power modern, scalable web applications.",
    },
    "Full-Stack Developer": {
      image: "/images/my_services/Full Stack Programmer.png",
      description:
        "Deliver complete solutions from front-end interfaces to back-end systems with end-to-end development expertise.",
    },
    "Front-End Web Development": {
      image: "/images/my_services/Front-End Web Development.png",
      description:
        "Craft responsive, user-friendly interfaces with modern technologies that enhance user experience.",
    },
    "Wordpress Development": {
      image: "/images/my_services/wordpress.webp",
      description:
        "Develop dynamic WordPress websites with custom themes, plugins, and SEO optimization for better performance.",
    },
    " Shopify Theme Customaization": {
      image: "/images/my_services/Shopify Theme Development.png",
      description:
        "Tailor your Shopify store’s look and feel with custom themes designed to match your brand and boost engagement.",
    },
    "Shopify Theme Development": {
      image: "/images/my_services/Shopify Theme.png",
      description:
        "Build responsive, high-converting Shopify themes from scratch to deliver a seamless shopping experience.",
    },
    "Shopify App  Development": {
      image: "/images/my_services/Shopify App  Development.png",
      description:
        "Create powerful custom Shopify apps to enhance functionality, automate processes, and improve user experience.",
    },

    "Web Performance Optimization": {
      image: "/images/my_services/Web Performance Optimization.png",
      description:
        "Enhance website speed, loading times, and overall user experience through advanced performance tuning techniques.",
    },

    "Next.js Expert": {
      image: "/images/my_services/nextjs.svg",
      description:
        "Build high-performance, SEO-friendly, and scalable web apps using the powerful Next.js framework.",
    },

    "API Development and Integration": {
      image: "/images/my_services/api.png",
      description:
        "Design robust APIs and seamlessly integrate third-party services to enable smooth data communication across platforms.",
    },

    "AWS Web Services Development": {
      image: "/images/my_services/aws.png",
      description:
        "Leverage AWS cloud solutions for building secure, scalable, and highly available web applications and infrastructures.",
    },

    "DevOps Developer": {
      image: "/images/my_services/devops.png",
      description:
        "Streamline development and deployment pipelines using CI/CD, containerization, and cloud automation practices.",
    },
  };

  const handleToggleResource = () => {
    setIsResourceOpen(!isResourceOpen);
  };

  const handleToggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Check if `window` is available to safely access `localStorage`
    if (typeof window !== "undefined") {
      const savedBgColor = localStorage.getItem("bgColor");
      if (savedBgColor) {
        setBgColor(savedBgColor);
      }
    }
  }, [initialBgColor]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 10) {
        setBgColor("bg-white");
        localStorage.setItem("bgColor", "bg-white");
      } else {
        setBgColor(initialBgColor);
        localStorage.setItem("bgColor", initialBgColor);
      }
    };

    // Initial check to set the background color based on the current scroll position
    handleScroll();

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialBgColor]);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsResourceOpen(false);
      setIsServicesOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resourceDropdownRef.current &&
        !resourceDropdownRef.current.contains(event.target as Node) &&
        resourcesDropdownButtonRef.current &&
        !resourcesDropdownButtonRef.current.contains(event.target) &&
        resourcesDivRef.current &&
        !resourcesDivRef.current.contains(event.target)
      ) {
        setIsResourceOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        servivesDropdownButtonRef.current &&
        !servivesDropdownButtonRef.current.contains(event.target) &&
        servicesDivRef.current &&
        !servicesDivRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarHamburgerButtonRef.current &&
        !sidebarHamburgerButtonRef.current.contains(event.target)
      ) {
        setSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {!loading && (
        <>
          {/* {!urlInfo?.u && <OfferBanner listOfdata={listOfdata} />} */}
          {/* {!pathname.includes('cv') && ( */}
          {/* header for desktop */}
          <header
            className={`sticky top-0 left-0 w-full  z-[100]  transition-colors duration-300 print:hidden block  ${bgColor}`}
          >
            {/* Header Navbar */}
            <div className="w-full print:hidden block ">
              {/* Desktop Header */}
              <div className="max-[1100px]:hidden  print:hidden  mainContainer h-[7.5rem] py-[2rem] border-b border-border flex justify-between items-center ">
                {/* User Profile */}
                <Link
                  prefetch={true}
                  href={"/"}
                  className="flex justify-center items-center gap-[1.2rem] "
                >
                  <Image
                    src={listOfdata?.profile_photo_1}
                    height={48}
                    width={48}
                    alt="Profile Picture"
                    className="rounded-[50%]"
                  />

                  <div className="text-heading text-[1.6rem] font-normal leading-tight break-all capitalize">
                    {listOfdata?.name}
                  </div>
                </Link>
                {/* NavLinks and Buttons */}
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-[2.4rem]">
                    {/* Nav Link */}
                    <nav className="text-paragraph1 text-[1.6rem] font-normal leading-normal flex justify-center items-center gap-[2.4rem]">
                      {headerLinks.map((link, index) =>
                        link.isDropdown ? (
                          <div
                            className="flex items-center relative"
                            ref={servicesDropdownRef}
                          >
                            <div
                              className="flex gap-[0.2rem] text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer"
                              onClick={handleToggleServices}
                              ref={servivesDropdownButtonRef}
                            >
                              {link.title}
                              <Image
                                src="/images/dropDown.svg"
                                height={24}
                                width={24}
                                alt="Dropdown"
                                className={`cursor-pointer duration-300 ${
                                  isServicesOpen ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            </div>

                            {/* Positioned DropDown Menu */}
                            {isServicesOpen && (
                              <nav
                                ref={servicesDivRef}
                                className={`rounded-[0.8rem] duration-300 shadow-lg bg-white absolute top-[4rem] left-[-26rem] z-50
        ${isServicesOpen ? "opacity-100" : "opacity-0"}
        p-[2rem] w-[90rem]`}
                              >
                                {/* Services Grid - 3 columns */}
                                <div className="grid grid-cols-3 gap-6">
                                  {listOfdata?.services
                                    ?.filter(({ type }) => type !== "main")
                                    .map((service, index) => {
                                      const content = serviceContentMap[
                                        service.title
                                      ] || {
                                        image:
                                          "/images/my_services/Full Stack Programmer.png",
                                        description:
                                          "Deliver complete solutions from front-end interfaces to back-end systems with end-to-end development expertise.",
                                      };

                                      return (
                                        <Link
                                          prefetch={true}
                                          href={`/offer?service=${service?.title}`}
                                          key={index}
                                          className="group p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:shadow-sm"
                                        >
                                          <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100">
                                              <Image
                                                src={content.image}
                                                width={20}
                                                height={20}
                                                alt={service.title}
                                                className="text-blue-500"
                                              />
                                            </div>
                                            <h3 className="text-[1.6rem] font-semibold text-gray-800 group-hover:text-primary">
                                              {service?.title}
                                            </h3>
                                          </div>

                                          <p className="text-[1.4rem] text-gray-600 pl-[3.2rem]">
                                            {content.description}
                                          </p>
                                        </Link>
                                      );
                                    })}
                                </div>
                              </nav>
                            )}
                          </div>
                        ) : (
                          <div
                            key={index}
                            className={`hover:text-primary duration-300 ${
                              pathname === link.src ||
                              (link.src !== "/" && pathname.includes(link.src))
                                ? "font-bold text-primary"
                                : ""
                            }`}
                          >
                            <Link prefetch={true} href={link.src}>
                              {link.title}
                            </Link>
                          </div>
                        )
                      )}
                    </nav>

                    {/* New Updated Drop  */}
                    <div
                      className="flex items-center relative mr-[2.4rem]"
                      ref={resourceDropdownRef}
                    >
                      <div
                        className="text-paragraph1 flex gap-[0.2rem] text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer"
                        onClick={handleToggleResource}
                        ref={resourcesDropdownButtonRef}
                      >
                        Resources
                        <Image
                          src="/images/dropDown.svg"
                          height={24}
                          width={24}
                          alt="Dropdown"
                          className={`cursor-pointer duration-300 ${
                            isResourceOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />{" "}
                      </div>
                      {/* Positioned DropDown Menu */}
                      {isResourceOpen && (
                        <nav
                          ref={resourcesDivRef}
                          className={`rounded-[0.8rem] duration-300 shadow-md bg-white absolute top-[4rem] left-[-10rem] z-50
                         ${isResourceOpen ? "opacity-100" : "opacity-0"}
                         p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] w-[29.6rem] text-nowrap`}
                        >
                          {/* Work Proof */}
                          <div className="w-full">
                            <div className="w-full flex items-center gap-[1.4rem]">
                              <WorkProofLinks
                                props={{
                                  upwork: listOfdata?.upwork,
                                  github: listOfdata?.github,
                                  linkedIn: listOfdata?.linkedIn,
                                  behance_link: listOfdata?.behance_link,
                                  u: urlInfo?.u,
                                }}
                              />
                            </div>
                            <p className="text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]">
                              My Work Proof
                            </p>
                          </div>
                          {!urlInfo?.u && (
                            <>
                              <hr className="h-[0.1rem] w-full bg-border" />
                              {/* Contact Me */}
                              <div className="w-full">
                                <div className="w-full flex items-center gap-[1.4rem]">
                                  <ContactMeLinks
                                    props={{
                                      email: listOfdata?.email,
                                      phone_no: listOfdata?.phone_no,
                                    }}
                                  />
                                </div>
                                <p className="text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]">
                                  Contact Me
                                </p>
                              </div>
                            </>
                          )}
                        </nav>
                      )}
                    </div>
                  </div>
                  {/* Buttons */}
                  {!urlInfo?.u && (
                    <div className="flex items-center gap-[1rem]">
                      <Link prefetch={true} href={"/contact-me"}>
                        <button
                          //  onClick={() => scrollToSection('contact')}
                          className="btn-secondary  py-[1rem] px-[2.4rem] text-[1.6rem] font-medium rounded-[0.6rem]"
                        >
                          Contact Me
                        </button>
                      </Link>
                      {listOfdata?.calendly_link ? (
                        <Link
                          target="_blank"
                          prefetch={true}
                          className="text-center btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white"
                          href={listOfdata?.calendly_link || "#"}
                        >
                          Schedule Call
                        </Link>
                      ) : (
                        <button
                          className="btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white"
                          onClick={() => scrollToSection("contact")}
                        >
                          Hire Me
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Header  */}
              <div className="min-[1100px]:hidden mainContainer  print:hidden  flex items-center justify-between bg-white py-[1.2rem] relative z-[200]">
                {/* User Profile  */}
                <Link
                  prefetch={true}
                  href={"/"}
                  className="flex justify-center items-center gap-[1.2rem]"
                >
                  {" "}
                  <Image
                    src={listOfdata?.profile_photo_1}
                    height={48}
                    width={48}
                    alt="Profile Picture"
                    className="rounded-[50%]"
                  />
                  <div className="text-heading text-[1.6rem] font-normal leading-tight break-all capitalize">
                    {listOfdata?.name}
                  </div>
                </Link>
                {/* Hamburger Icon */}
                <Image
                  src={"/images/menu.svg"}
                  height={24}
                  width={24}
                  className={`cursor-pointer`}
                  onClick={handleSidebar}
                  ref={sidebarHamburgerButtonRef}
                  alt="menu"
                />
                {/* Positioned Sidebar */}
                <div
                  className={`fixed top-[7.2rem] w-[30rem] right-0 z-[100] h-full bg-white shadow-lg  duration-300  ${
                    sideBarOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-[30rem] opacity-0"
                  }`}
                >
                  <div className="overflow-y-auto h-full">
                    {/* Navinks and Buttons */}
                    <div className="flex flex-col p-[1rem]">
                      <div className="flex flex-col">
                        {/* Nav Link */}
                        <nav
                          ref={sidebarRef}
                          className="text-[#101828] text-[1.6rem] font-medium leading-[2.4rem] flex flex-col  gap-[2.4rem]"
                        >
                          {headerLinks.map((link, index) =>
                            link.isDropdown ? (
                              <div
                                className="flex flex-col"
                                ref={servicesDropdownRef}
                              >
                                <div
                                  className="text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer flex gap-[0.2rem]"
                                  onClick={handleToggleServices}
                                >
                                  <p className="font-medium">{link?.title}</p>
                                  <Image
                                    src="/images/dropDown.svg" // Use a relative path starting with '/'
                                    alt="dropMenu"
                                    height={24}
                                    width={24}
                                    className={`cursor-pointer duration-300 ${
                                      isServicesOpen ? "rotate-180" : "rotate-0"
                                    }`}
                                  />
                                </div>
                                {/* Positioned DropDown Menu */}
                                {isServicesOpen && (
                                  <nav
                                    className={`rounded-[0.8rem] duration-300 shadow-md bg-white z-50
                    ${isServicesOpen ? "opacity-100" : "h-0 opacity-0"}
                   
                       p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] max-w-[32rem] w-full text-nowrap`}
                                  >
                                    <div className="w-full">
                                      {listOfdata?.services
                                        ?.filter(({ type }) => type !== "main")
                                        .map((service, index) => (
                                          <Link
                                            prefetch={true}
                                            href={`/offer?service=${service?.title}`}
                                            key={index}
                                            className={`w-full flex items-center gap-[1.4rem] px-4 py-2 hover:bg-primary hover:text-white hover:rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-wrap border-b border-gray-200 last:border-b-0`}
                                          >
                                            {service?.title}
                                          </Link>
                                        ))}
                                    </div>
                                  </nav>
                                )}
                              </div>
                            ) : (
                              <div
                                key={index}
                                className={`hover:text-primary duration-300  ${
                                  pathname === link.src ||
                                  (link.src !== "/" &&
                                    pathname.includes(link.src))
                                    ? "font-extrabold text-primary"
                                    : null
                                }`}
                                onClick={() => setSideBarOpen(!sideBarOpen)}
                              >
                                <Link prefetch={true} href={link.src}>
                                  {link.title}
                                </Link>
                              </div>
                            )
                          )}
                          {/* Resources DropDwon Menu */}
                          <div
                            className="flex flex-col mb-[2rem]"
                            ref={resourceDropdownRef}
                          >
                            <div
                              className="text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer flex gap-[0.2rem]"
                              onClick={handleToggleResource}
                            >
                              <p className="font-medium">Resources</p>
                              <Image
                                src="/images/dropDown.svg" // Use a relative path starting with '/'
                                alt="dropMenu"
                                height={24}
                                width={24}
                                className={`cursor-pointer duration-300 ${
                                  isResourceOpen ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            </div>
                            {/* Positioned DropDown Menu */}
                            {isResourceOpen && (
                              <nav
                                className={`rounded-[0.8rem] duration-300 shadow-md bg-white z-50
                  ${
                    isResourceOpen ? "h-[21.5rem] opacity-100" : "h-0 opacity-0"
                  }
                
                     p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] max-w-[32rem] w-full text-nowrap`}
                              >
                                <div className="w-full">
                                  <div className="w-full flex items-center gap-[1.4rem]">
                                    <WorkProofLinks
                                      props={{
                                        upwork: listOfdata?.upwork,
                                        github: listOfdata?.github,
                                        linkedIn: listOfdata?.linkedIn,
                                        behance_link: listOfdata?.behance_link,
                                        u: urlInfo?.u,
                                      }}
                                    />
                                  </div>
                                  <p className="text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]">
                                    My Work Proof
                                  </p>
                                </div>
                                {!urlInfo?.u && (
                                  <>
                                    <hr className="h-[0.1rem] w-full bg-border" />
                                    <div className="w-full">
                                      <div className="w-full flex items-center gap-[1.4rem]">
                                        <ContactMeLinks
                                          props={{
                                            email: listOfdata?.email,
                                            phone_no: listOfdata?.phone_no,
                                          }}
                                        />
                                      </div>
                                      <p className="text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]">
                                        Contact Me
                                      </p>
                                    </div>
                                  </>
                                )}
                              </nav>
                            )}
                          </div>{" "}
                        </nav>
                      </div>
                      {/* Buttons */}
                      {!urlInfo?.u && (
                        <div className="w-full flex flex-col gap-[1rem] h-[200px] ">
                          <Link prefetch={true} href={"/contact-me"}>
                            <button
                              //  onClick={() => scrollToSection('contact')}
                              className="w-full hover:cursor-pointer py-[1rem] px-[2.4rem] text-[1.6rem] font-medium  rounded-[0.6rem] btn-secondary"
                            >
                              Contact Me
                            </button>
                          </Link>

                          {listOfdata?.calendly_link ? (
                            <Link
                              target="_blank"
                              prefetch={true}
                              className="text-center btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white"
                              href={listOfdata?.calendly_link || "#"}
                            >
                              Schedule Call
                            </Link>
                          ) : (
                            <button
                              onClick={() => scrollToSection("contact")}
                              className="btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white"
                            >
                              Hire Me{" "}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>


          {/* header for print */}
          <header
            className={`print:block hidden w-full ${bgColor}`}
          >
            {/* Header Navbar */}
              {/* Desktop Header */}
              <div className=" print:block !w-full bg-white  h-[7.5rem] m-0 px-0 py-[2rem]  !flex !justify-between items-center !flex-row ">
                {/* User Profile */}
                <Link
                  prefetch={true}
                  href={"/"}
                  className="flex justify-center items-center gap-[1.2rem] "
                >
                  <Image
                    src={listOfdata?.profile_photo_1}
                    height={48}
                    width={48}
                    alt="Profile Picture"
                    className="rounded-[50%]"
                  />

                  <div className="text-heading text-[1.6rem] font-normal leading-tight break-all capitalize">
                    {listOfdata?.name}
                  </div>
                </Link>
                {/* NavLinks and Buttons */}
                <div className="flex justify-center items-center">
                  {/* Buttons */}
                  {!urlInfo?.u && (
                    <div className="flex items-center gap-[1rem]">
                      <Link prefetch={true} href={"/contact-me"}>
                        <button
                          //  onClick={() => scrollToSection('contact')}
                          className="btn-secondary  py-[1rem] px-[2.4rem] text-[1.6rem] font-medium rounded-[0.6rem]"
                        >
                          Contact Me
                        </button>
                      </Link>
                      {listOfdata?.calendly_link ? (
                        <Link
                          target="_blank"
                          prefetch={true}
                          className="text-center btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white"
                          href={listOfdata?.calendly_link || "#"}
                        >
                          Schedule Call
                        </Link>
                      ) : (
                        <button
                          className="btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white"
                          onClick={() => scrollToSection("contact")}
                        >
                          Hire Me
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
          </header>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default Header;
