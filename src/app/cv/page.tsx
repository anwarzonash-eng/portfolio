"use client";

import Image from "next/image";
import Link from "next/link";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import ExperienceItemCard from "@/components/ExperienceItemCard";
import PortfolioItemCard from "@/components/PortfolioItemCard";

export default function Home() {
  useBodyBackgroundColor("#EFF5FD");

  const contactDetails = [
    {
      type: "Email",
      iconSrc: "/images/mail-icon.svg",
      alt: "Mail",
      value: "john@example.com",
      href: "mailto:john@example.com",
    },
    {
      type: "Website",
      iconSrc: "/images/link-icon.svg",
      alt: "Link",
      value: "https://www.findusman.me/a/cv",
      href: "https://www.findusman.me/a/cv",
    },
    {
      type: "Phone",
      iconSrc: "/images/phone-icon.svg",
      alt: "Phone",
      value: "(+44) 736 2204608",
      href: "tel:+447700900000",
    },
    {
      type: "Location",
      iconSrc: "/images/location-icon.svg",
      alt: "Location",
      value: "Lahore, Pakistan",
      href: "#",
    },
  ];
  const socialLinks = [
    {
      platform: "Upwork",
      iconSrc: "/images/upwork.svg",
      alt: "Upwork",
      username: "@username",
      href: "/",
    },
    {
      platform: "Github",
      iconSrc: "/images/github.svg",
      alt: "Github",
      username: "@username",
      href: "/",
    },
    {
      platform: "Linkedin",
      iconSrc: "/images/linkedin.svg",
      alt: "Linkedin",
      username: "@username",
      href: "/",
    },
    {
      platform: "Dribbble",
      iconSrc: "/images/dribbble.svg",
      alt: "Dribbble",
      username: "@username",
      href: "/",
    },
    {
      platform: "Behance",
      iconSrc: "/images/behance.svg",
      alt: "Behance",
      username: "@username",
      href: "/",
    },
  ];
  // Tools Line 1
  const tools1 = [
    { title: "Figma", imgSrc: "/images/figma.png" },
    { title: "Maze", imgSrc: "/images/maze.png" },
    { title: "Spline", imgSrc: "/images/spline.png" },
    { title: "Zeplin", imgSrc: "/images/zeplin.png" },
  ];
  // Tools Line 1
  const tools2 = [
    { title: "Vectornator", imgSrc: "/images/vectornator.png" },
    { title: "Rotato", imgSrc: "/images/rotato.png" },
    { title: "VS Code", imgSrc: "/images/vscode.png" },
    { title: "Xcode", imgSrc: "/images/xcode.png" },
    { title: "Notion", imgSrc: "/images/notion.png" },
  ];
  const educationData = [
    {
      id: 1,
      university: "University of South Asia",
      degree: "Bachelor’s In Computer Science (BSCS)",
      duration: "Jan 2010 - Feb 2014",
      image: "/images/edu1.png",
    },
    {
      id: 2,
      university: "University of South Asia",
      degree: "Master's degree In Computer Science",
      duration: "Jan 2014 - Feb 2016",
      image: "/images/edu2.png",
    },
    {
      id: 3,
      university: "University of South Asia",
      degree: "Bachelor’s In Computer Science (BSCS)",
      duration: "Jan 2010 - Feb 2014",
      image: "/images/edu1.png",
    },
  ];
  const blogs = [
    {
      id: 1,
      category: "Design",
      date: "17 Jan 2022",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      image: "/images/blogPost1.png",
      link: "/",
    },
    {
      id: 2,
      category: "Design",
      date: "17 Jan 2022",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      image: "/images/blogPost2.png",
      link: "/",
    },
    {
      id: 3,
      category: "Design",
      date: "17 Jan 2022",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      image: "/images/blogPost3.png",
      link: "/",
    },
  ];

  return (
    <div className="mainContainer bg-white flex flex-col lg:flex-row gap-[4rem] relative pb-[5rem] lg:pb-[7rem] mb-[10rem] lg:mb-[9.6rem]">
      {/* Side Panel */}
      <aside className="lg:max-w-[40rem] w-full flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover py-[5rem] px-[3rem]">
        <div className="flex flex-col items-center">
          {/* Profile Bg */}
          <Image
            src={"/images/CVProfile.png"}
            height={1200}
            width={1200}
            alt="Profile Picture"
            className="h-[20.12rem] w-[20.12rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
          />
          {/* Name */}
          <h1 className="text-heading text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem]">
            Angelo Libero
          </h1>
          {/* Designation */}
          <h3 className="text-primary text-[2rem] font-medium leading-normal mt-[0.9rem]">
            Full-Stack Developer
          </h3>
          {/* Info */}
          <p className="my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center">
            Reach out today and I'll provide you with my comprehensive
            onboarding package designed for full-time employment or Contract
            Based Jobs. This package covers various aspects that potential
            employers often inquire about, such as my salary expectations and
            the seamless integration process into your company.
          </p>
          {/* Divider */}
          <hr className="w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] inline-block" />
          {/* Availability */}
          <div className="mb-[4rem] w-full text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden">
            <div className="bg-[#F7F9FC]  p-[1.5rem]">
              <p className="text-[1.6rem] leading-normal font-normal text-heading">
                Next available
              </p>
              <h4 className="text-[2rem] font-medium text-primary leading-normal">
                September 2024.
              </h4>
            </div>
            <button className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300">
              Hire Me
            </button>
          </div>
          {/* Email, Website, Phone, Location */}
          <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
            {/* Iterate through the contact details array */}
            {contactDetails.map((contact, index) => (
              <div key={index} className="flex items-center gap-[1.78rem]">
                <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                  <Image
                    src={contact.iconSrc}
                    height={24}
                    width={24}
                    alt={contact.alt}
                  />
                </div>
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    {contact.type}
                  </p>
                  {contact.type === "Location" ? (
                    <h4 className="text-[1.55rem] font-medium leading-[2rem] text-heading">
                      {contact.value}
                    </h4>
                  ) : (
                    <Link
                      href={contact.href}
                      className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                    >
                      {contact.value}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr className="w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] sm:hidden lg:inline-block" />

          {/* Work Proof */}
          <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
            {/* Title */}
            <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
              Work Proof
            </h3>
            {/* Iterating on Icons */}
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-[1.78rem]">
                <Image
                  src={social.iconSrc}
                  height={35}
                  width={35}
                  alt={social.alt}
                />
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    {social.platform}
                  </p>
                  <Link
                    href={social.href}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    {social.username}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Only Display on The Devices Between Small To Large */}
          <div className="hidden sm:flex lg:hidden w-full gap-[2rem] items-start">
            {/* Email, Website, Phone, Location */}
            <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
              {contactDetails.map((contact, index) => (
                <div key={index} className="flex items-center gap-[1.78rem]">
                  <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                    <Image
                      src={contact.iconSrc}
                      height={24}
                      width={24}
                      alt={contact.alt}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.45rem]">
                    <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                      {contact.type}
                    </p>
                    {contact.type === "Location" ? (
                      <h4 className="text-[1.55rem] font-medium leading-[2rem] text-heading">
                        {contact.value}
                      </h4>
                    ) : (
                      <Link
                        href={contact.href}
                        className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                      >
                        {contact.value}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Work Proof */}
            <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
              {/* Title */}
              <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
                Work Proof
              </h3>

              {/* Iterating on Icons */}
              {socialLinks.map((social, index) => (
                <div key={index} className="flex items-center gap-[1.78rem]">
                  <Image
                    src={social.iconSrc}
                    height={35}
                    width={35}
                    alt={social.alt}
                  />
                  <div className="flex flex-col gap-[0.45rem]">
                    <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                      {social.platform}
                    </p>
                    <Link
                      href={social.href}
                      className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                    >
                      {social.username}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
      {/* Right Content Section */}
      <section className="w-full pt-[7rem]">
        {/* 10 Years Experience */}
        <div className="py-[5rem] px-[3.4rem] primaryGradient text-white text-[2.2rem] leading-[3.1rem] font-bold rounded-[1rem] text-center">
          10+ years of experience in front-end and back-end web development.
          Ambitious and communicative. Good mentor and tech lead.
        </div>

        {/* Timeline Section */}
        <div className=" w-full ">
          {/* Timeline */}
          <div className="flex items-center justify-center mt-[4rem] lg:mt-[6rem]">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 w-[1.5px] h-[100%] bg-border" />
              {/* Timeline items Container */}
              <div className="space-y-[1rem] lg:space-y-[2rem]">
                {/* Overview & Skills Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem]">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                      Overview & Skills
                    </h2>
                    <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem]">
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem]">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Full Stack Developer with deep expertise in{" "}
                          <span className="text-primary font-medium">
                            designing, building, and deploying
                          </span>{" "}
                          end-to-end web solutions.
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Dynamic and results-driven eCommerce specialist with{" "}
                          <span className="text-primary font-medium">
                            extensive experience
                          </span>{" "}
                          in managing online retail operations, including
                          payment gateway integration, inventory management, and
                          customer relationship management.
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Proficient in front-end technologies such as{" "}
                          <span className="text-primary font-medium">
                            React, Next.js, Redux, HTML, CSS, Bootstrap,
                            TailwindCSS, and MaterialUI.
                          </span>{" "}
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Mastery in JavaScript and TypeScript, reinforced with
                          tools like GraphQL for efficient data fetching. Solid
                          background in back-end development with Node.js,
                          coupled with hands-on experience in{" "}
                          <span className="text-primary font-medium">
                            MongoDB, MySQL, and PostgreSQL.
                          </span>{" "}
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Adept at creating and integrating REST APIs ensuring
                          seamless front-to-back functionality and API
                          Integrations.
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem]">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Renowned for effective team collaboration and
                          communication, ensuring aligned progress and shared
                          vision.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Skills Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                      Skills
                    </h2>
                    <div className="w-full flex flex-wrap gap-[0.4rem] mb-[4rem]">
                      {tools1.map((skill, index) => (
                        <div
                          className="w-[9rem] lg:w-[19.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]"
                          key={index}
                        >
                          <div className="flex flex-col items-center gap-[0.6rem]">
                            <Image
                              src={skill.imgSrc}
                              alt={skill.title}
                              height={24}
                              width={24}
                            />
                            <h4 className="text-[1.3rem] font-medium text-[#2E2E48]">
                              {" "}
                              {/* Fixed text color class */}
                              {skill.title}
                            </h4>
                          </div>
                        </div>
                      ))}

                      {tools2.map((skill, index) => (
                        <div
                          className="w-[9rem] lg:w-[15.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]"
                          key={index}
                        >
                          <div className="flex flex-col items-center gap-[0.6rem]">
                            <Image
                              src={skill.imgSrc}
                              alt={skill.title}
                              height={24}
                              width={24}
                            />
                            <h4 className="text-[1.3rem] font-medium text-[#2E2E48]">
                              {skill.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <div className="flex items-center justify-between w-full mb-[3.5rem]">
                      <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] ">
                        Experience
                      </h2>
                      <div className="flex items-center gap-[0.6rem] group cursor-pointer">
                        <p className="text-[1.4rem] text-heading font-medium">
                          View all
                        </p>
                        <div className="group-hover:translate-x-[1rem] duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337"
                              stroke="#262626"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <ExperienceItemCard />
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <ExperienceItemCard />
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <ExperienceItemCard />
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <ExperienceItemCard />
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <ExperienceItemCard />
                  </div>
                </div>

                {/* Portfolio Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <div className="flex items-center justify-between w-full mb-[3rem]">
                      <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] ">
                        Portfolio
                      </h2>
                      <div className="flex items-center gap-[0.6rem] group cursor-pointer">
                        <p className="text-[1.4rem] text-heading font-medium">
                          View all
                        </p>
                        <div className="group-hover:translate-x-[1rem] duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337"
                              stroke="#262626"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <PortfolioItemCard />
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <PortfolioItemCard />

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <PortfolioItemCard />

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <PortfolioItemCard />

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <PortfolioItemCard />
                  </div>
                </div>

                {/* Education Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                      Education
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.2rem] w-full">
                      {educationData.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-[2rem] rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
                        >
                          <div className="flex items-center gap-[1.8rem]">
                            <Image
                              src={edu.image}
                              height={34}
                              width={34}
                              alt={edu.university}
                            />
                            <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                              {edu.university}
                            </h3>
                          </div>
                          {/* Divider */}
                          <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />
                          <div>
                            <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                              {edu.degree}
                            </h2>
                            <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                              {edu.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Blogs Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem]">
                        Blogs
                      </h2>
                      <button className="btn-secondary text-white py-[1rem] px-[2.4rem] text-[1.6rem] font-medium">
                        View all
                      </button>
                    </div>
                    {/* Map Through the Blogs Array */}
                    {blogs.map((blog) => (
                      <article
                        key={blog.id}
                        className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row"
                      >
                        {/* Card Image */}
                        <div className="sm:w-[20rem] h-[19rem] w-full flex-shrink-0">
                          <Image
                            src={blog.image}
                            height={300}
                            width={300}
                            alt={`Blog ${blog.id}`}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        {/* Card Content */}
                        <div className="">
                          {/* Date */}
                          <div className="mb-[1.2rem] flex items-center">
                            <h4 className="text-heading text-[1.4rem] leading-[2rem] font-medium">
                              {blog.category}
                            </h4>
                            <div className="flex items-center">
                              {/* SVG Dot */}
                              <div className="mx-[0.6rem]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="5"
                                  height="6"
                                  viewBox="0 0 5 6"
                                  fill="none"
                                >
                                  <circle
                                    cx="2.5"
                                    cy="3"
                                    r="2.5"
                                    fill="#C6CBD8"
                                  />
                                </svg>
                              </div>
                              <p className="text-paragraph1 text-[1.4rem] leading-[2rem] font-normal">
                                {blog.date}
                              </p>
                            </div>
                          </div>
                          {/* Title */}
                          <h2 className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]">
                            {blog.title}
                          </h2>
                          {/* Description */}
                          <p className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]">
                            {blog.description}
                          </p>
                          <Link
                            href={blog.link}
                            className="duration-300 inline-flex items-center gap-[0.8rem] group"
                          >
                            <p className="text-primary text-[1.4rem] font-medium leading-[2.4rem]">
                              Read Now
                            </p>
                            {/* Arrow */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              className="group-hover:translate-x-[1rem] duration-300"
                            >
                              <path
                                d="M4.02783 12.8789H20.5278"
                                stroke="#00473C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.7778 6.12891L20.5278 12.8789L13.7778 19.6289"
                                stroke="#00473C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
