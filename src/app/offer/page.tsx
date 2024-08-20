"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";

const offer = () => {
  // This is the Custom Hook That
  // use to SET the Background Color
  // OF THE Current Page
  useBodyBackgroundColor("#EFF5FD");

  return (
    <div className="bg-[#EFF5FD]">
      {/* Hero Banner */}
      <section className="w-full relative">
        <div className="mainContainer h-[70rem] lg:h-[60rem] w-full relative">
          {/* Background SVG */}
          <div className="absolute top-0 left-0 w-full h-auto">
            {/* Desktop */}
            <svg
              viewBox="0 0 1550 770"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full hidden lg:block"
            >
              <g clip-path="url(#clip0_411_2212)">
                <path
                  d="M-480 -11H1920V458.556L-480 758.555V-11Z"
                  className="fill-bannerBG"
                />
                <path
                  d="M1375 526.006L1841.67 467.653V538.764L1375 597.117V526.006Z"
                  className="fill-primary"
                  fill-opacity="0.4"
                />
                <path
                  d="M1375 526.006L1841.67 467.653V538.764L1375 597.117V526.006Z"
                  fill="url(#paint0_radial_411_2212)"
                />
                <path
                  d="M895 515.787L1575 430.444V501.555L895 586.898V515.787Z"
                  className="fill-bannerBG"
                />
                <path
                  d="M1088 421.352L1554.67 363V434.111L1088 492.463V421.352Z"
                  className="fill-primary"
                />
                <path
                  d="M1088 421.352L1554.67 363V434.111L1088 492.463V421.352Z"
                  fill="url(#paint1_radial_411_2212)"
                />
                <path
                  d="M-25 630.463L441.667 572.11V643.221L-25 701.574V630.463Z"
                  className="fill-primary"
                  fill-opacity="0.4"
                />
                <path
                  d="M-25 630.463L441.667 572.11V643.221L-25 701.574V630.463Z"
                  fill="url(#paint2_radial_411_2212)"
                />
                <path
                  d="M-193.889 722.673L272.778 664.32V735.431L-193.889 793.784V722.673Z"
                  className="fill-primary"
                />
                <path
                  d="M-193.889 722.673L272.778 664.32V735.431L-193.889 793.784V722.673Z"
                  fill="url(#paint3_radial_411_2212)"
                />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(1608.33 467.653) rotate(90) scale(129.463 466.667)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(1321.33 363) rotate(90) scale(129.463 466.667)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(208.333 572.11) rotate(90) scale(129.463 466.667)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint3_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(39.4447 664.32) rotate(90) scale(129.463 466.667)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <clipPath id="clip0_411_2212">
                  <rect width="1550" height="770" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {/* Mobile */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="393"
              height="770"
              viewBox="0 0 393 770"
              fill="none"
              className="h-full w-full lg:hidden"
            >
              <g clip-path="url(#clip0_411_2212)">
                <path
                  d="M-480 -11H1920V458.556L-480 758.555V-11Z"
                  className="fill-bannerBG"
                />
                <path
                  d="M342.3 548.79L606 515.816V555.999L342.3 588.972V548.79Z"
                  className="fill-primary"
                  fill-opacity="0.4"
                />
                <path
                  d="M342.3 548.79L606 515.816V555.999L342.3 588.972V548.79Z"
                  fill="url(#paint0_radial_411_2212)"
                />
                <path
                  d="M71.0664 543.016L455.314 494.791V534.974L71.0664 583.198V543.016Z"
                  className="fill-bannerBG"
                />
                <path
                  d="M180.125 489.654L443.825 456.681V496.863L180.125 529.837V489.654Z"
                  className="fill-primary"
                />
                <path
                  d="M180.125 489.654L443.825 456.681V496.863L180.125 529.837V489.654Z"
                  fill="url(#paint1_radial_411_2212)"
                />
                <path
                  d="M-98.4546 607.816L165.245 574.843V615.026L-98.4546 647.999V607.816Z"
                  className="fill-primary"
                  fill-opacity="0.4"
                />
                <path
                  d="M-98.4546 607.816L165.245 574.843V615.026L-98.4546 647.999V607.816Z"
                  fill="url(#paint2_radial_411_2212)"
                />
                <path
                  d="M-193.889 659.92L69.8109 626.947V667.13L-193.889 700.103V659.92Z"
                  className="fill-primary"
                />
                <path
                  d="M-193.889 659.92L69.8109 626.947V667.13L-193.889 700.103V659.92Z"
                  fill="url(#paint3_radial_411_2212)"
                />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(474.15 515.816) rotate(90) scale(73.1559 263.7)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(311.975 456.681) rotate(90) scale(73.1559 263.7)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(33.3952 574.843) rotate(90) scale(73.1559 263.7)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint3_radial_411_2212"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(-62.0389 626.947) rotate(90) scale(73.1559 263.7)"
                >
                  <stop stop-color="white" stop-opacity="0.3" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <clipPath id="clip0_411_2212">
                  <rect width="393" height="770" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {/* Badge Heading and Para Text */}
          <div className="max-w-[1024px] mx-auto text-center px-[2rem] pt-[7rem] relative z-20">
            {/* Heading */}
            <div className="text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem]">
              Cover Letter
            </div>
            {/* Badge */}
            <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium  leading-tight mx-auto mb-[1.6rem]">
              A full-stack software engineer with over 10+ years of experience.
            </div>
          </div>
        </div>
      </section>
      {/* Offer Letter Section */}
      <div className="mainContainer w-full mt-[-42rem] lg:mt-[-28rem] relative">
        {/* Content Box 1 */}
        <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[4rem]">
          <div className="p-[1rem] lg:p-[3rem]">
            <h3 className="text-center text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem] font-medium border border-border border-solid p-[1rem] lg:p-[3rem] shadow-lg">
              I have maintained, developed, and launched multiple projects from
              scratch, carrying the development of its' back-end and front-end
              codebases. My current toolset includes JavaScript, TypeScript,
              Node.js, React, Next.js, Serverless Programming, HTML5,
              CSS/SASS/SCSS, Redux, Appolo, GraphQL, TailwindCSS, MaterialUI,
              Docker, AWS, MongoDB, PostgreSQL, Git, CI/CD, and the other
              various frameworks, libraries, and technologies related to them.
            </h3>
          </div>
          <div className="p-[1rem] lg:p-[3rem]">
            <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Full Stack Developer with deep expertise in{" "}
                  <span className="text-primary font-medium">
                    designing, building, and deploying
                  </span>{" "}
                  end-to-end web solutions.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Dynamic and results-driven eCommerce specialist with{" "}
                  <span className="text-primary font-medium">
                    extensive experience
                  </span>{" "}
                  in managing online retail operations, including payment
                  gateway integration, inventory management, and customer
                  relationship management.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Proficient in front-end technologies such as{" "}
                  <span className="text-primary font-medium">
                    React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS,
                    and MaterialUI.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Mastery in JavaScript and TypeScript, reinforced with tools
                  like GraphQL for efficient data fetching. Solid background in
                  back-end development with Node.js, coupled with hands-on
                  experience in{" "}
                  <span className="text-primary font-medium">
                    MongoDB, MySQL, and PostgreSQL.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Adept at creating and integrating REST APIs ensuring seamless
                  front-to-back functionality and API Integrations.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Renowned for effective team collaboration and communication,
                  ensuring aligned progress and shared vision.
                </p>
              </li>
            </ul>
          </div>
        </div>
        {/* Content Box 2 */}
        <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden">
          <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG  bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
              {/* Circle */}
              <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow ">
                <div className="text-center text-white text-[4.3rem] font-medium ">
                  📢
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium">
                Front-end Web <br /> Development
              </h3>
            </div>
            <p className="text-white text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
              Equipped with a wealth of frontend development expertise, I
              specialize in crafting seamless user experiences using
              technologies such as TypeScript, JavaScript, React, Next.js,
               Redux, Appolo, Vanilla S,
               TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment
              to delivering performant, secure, and accessible web applications
              is evident.
            </p>
          </div>
          <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white">
            <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Full Stack Developer with deep expertise in{" "}
                  <span className="text-primary font-medium">
                    designing, building, and deploying
                  </span>{" "}
                  end-to-end web solutions.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Dynamic and results-driven eCommerce specialist with{" "}
                  <span className="text-primary font-medium">
                    extensive experience
                  </span>{" "}
                  in managing online retail operations, including payment
                  gateway integration, inventory management, and customer
                  relationship management.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Proficient in front-end technologies such as{" "}
                  <span className="text-primary font-medium">
                    React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS,
                    and MaterialUI.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Mastery in JavaScript and TypeScript, reinforced with tools
                  like GraphQL for efficient data fetching. Solid background in
                  back-end development with Node.js, coupled with hands-on
                  experience in{" "}
                  <span className="text-primary font-medium">
                    MongoDB, MySQL, and PostgreSQL.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Adept at creating and integrating REST APIs ensuring seamless
                  front-to-back functionality and API Integrations.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Renowned for effective team collaboration and communication,
                  ensuring aligned progress and shared vision.
                </p>
              </li>
            </ul>
            <Link
              href={"/"}
              className="inline-flex items-center gap-[0.6rem] group mt-[1rem] mx-[2rem] "
            >
              <span className="text-[1.6rem] font-medium text-primary">
                Check now
              </span>
              <Image
                src={"./images/ArrowRightGreen.svg"}
                height={16}
                width={16}
                className="group-hover:translate-x-[1rem] duration-300 h-[1.6rem] w-[1.6rem]"
                alt="Arrow Right"
              />
            </Link>
          </div>
        </div>
        {/* Content Box 3 */}
        <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden">
          <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
              {/* Circle */}
              <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow ">
                <div className="text-center text-white text-[4.3rem] font-medium ">
                  📢
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium ">
                Front-end Web <br /> Development
              </h3>
            </div>
            <p className="text-white text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
              Equipped with a wealth of frontend development expertise, I
              specialize in crafting seamless user experiences using
              technologies such as TypeScript, JavaScript, React, Next.js,
               Redux, Appolo, Vanilla S,
               TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment
              to delivering performant, secure, and accessible web applications
              is evident.
            </p>
          </div>
          <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white">
            <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Full Stack Developer with deep expertise in{" "}
                  <span className="text-primary font-medium">
                    designing, building, and deploying
                  </span>{" "}
                  end-to-end web solutions.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Dynamic and results-driven eCommerce specialist with{" "}
                  <span className="text-primary font-medium">
                    extensive experience
                  </span>{" "}
                  in managing online retail operations, including payment
                  gateway integration, inventory management, and customer
                  relationship management.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Proficient in front-end technologies such as{" "}
                  <span className="text-primary font-medium">
                    React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS,
                    and MaterialUI.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Mastery in JavaScript and TypeScript, reinforced with tools
                  like GraphQL for efficient data fetching. Solid background in
                  back-end development with Node.js, coupled with hands-on
                  experience in{" "}
                  <span className="text-primary font-medium">
                    MongoDB, MySQL, and PostgreSQL.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Adept at creating and integrating REST APIs ensuring seamless
                  front-to-back functionality and API Integrations.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Renowned for effective team collaboration and communication,
                  ensuring aligned progress and shared vision.
                </p>
              </li>
            </ul>
            <Link
              href={"/"}
              className="inline-flex items-center gap-[0.6rem] group mt-[1rem] mx-[2rem] "
            >
              <span className="text-[1.6rem] font-medium text-primary">
                Check now
              </span>
              <Image
                src={"./images/ArrowRightGreen.svg"}
                height={16}
                width={16}
                className="group-hover:translate-x-[1rem] duration-300 h-[1.6rem] w-[1.6rem]"
                alt="Arrow Right"
              />
            </Link>
          </div>
        </div>
        {/* Content Box 4 */}
        <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden">
          <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
              {/* Circle */}
              <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow ">
                <div className="text-center text-white text-[4.3rem] font-medium ">
                  📢
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium ">
                Front-end Web <br /> Development
              </h3>
            </div>
            <p className="text-white text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
              Equipped with a wealth of frontend development expertise, I
              specialize in crafting seamless user experiences using
              technologies such as TypeScript, JavaScript, React, Next.js,
               Redux, Appolo, Vanilla S,
               TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment
              to delivering performant, secure, and accessible web applications
              is evident.
            </p>
          </div>
          <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white">
            <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Full Stack Developer with deep expertise in{" "}
                  <span className="text-primary font-medium">
                    designing, building, and deploying
                  </span>{" "}
                  end-to-end web solutions.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Dynamic and results-driven eCommerce specialist with{" "}
                  <span className="text-primary font-medium">
                    extensive experience
                  </span>{" "}
                  in managing online retail operations, including payment
                  gateway integration, inventory management, and customer
                  relationship management.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Proficient in front-end technologies such as{" "}
                  <span className="text-primary font-medium">
                    React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS,
                    and MaterialUI.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Mastery in JavaScript and TypeScript, reinforced with tools
                  like GraphQL for efficient data fetching. Solid background in
                  back-end development with Node.js, coupled with hands-on
                  experience in{" "}
                  <span className="text-primary font-medium">
                    MongoDB, MySQL, and PostgreSQL.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Adept at creating and integrating REST APIs ensuring seamless
                  front-to-back functionality and API Integrations.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Renowned for effective team collaboration and communication,
                  ensuring aligned progress and shared vision.
                </p>
              </li>
            </ul>
            <Link
              href={"/"}
              className="inline-flex items-center gap-[0.6rem] group mt-[1rem] mx-[2rem] "
            >
              <span className="text-[1.6rem] font-medium text-primary">
                Check now
              </span>
              <Image
                src={"./images/ArrowRightGreen.svg"}
                height={16}
                width={16}
                className="group-hover:translate-x-[1rem] duration-300 h-[1.6rem] w-[1.6rem]"
                alt="Arrow Right"
              />
            </Link>
          </div>
        </div>
        {/* Content Box 5 */}
        <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden">
          <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
              {/* Circle */}
              <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow ">
                <div className="text-center text-white text-[4.3rem] font-medium ">
                  📢
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium ">
                Front-end Web <br /> Development
              </h3>
            </div>
            <p className="text-white text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
              Equipped with a wealth of frontend development expertise, I
              specialize in crafting seamless user experiences using
              technologies such as TypeScript, JavaScript, React, Next.js,
               Redux, Appolo, Vanilla S,
               TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment
              to delivering performant, secure, and accessible web applications
              is evident.
            </p>
          </div>
          <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white">
            <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Full Stack Developer with deep expertise in{" "}
                  <span className="text-primary font-medium">
                    designing, building, and deploying
                  </span>{" "}
                  end-to-end web solutions.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Dynamic and results-driven eCommerce specialist with{" "}
                  <span className="text-primary font-medium">
                    extensive experience
                  </span>{" "}
                  in managing online retail operations, including payment
                  gateway integration, inventory management, and customer
                  relationship management.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Proficient in front-end technologies such as{" "}
                  <span className="text-primary font-medium">
                    React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS,
                    and MaterialUI.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Mastery in JavaScript and TypeScript, reinforced with tools
                  like GraphQL for efficient data fetching. Solid background in
                  back-end development with Node.js, coupled with hands-on
                  experience in{" "}
                  <span className="text-primary font-medium">
                    MongoDB, MySQL, and PostgreSQL.
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Adept at creating and integrating REST APIs ensuring seamless
                  front-to-back functionality and API Integrations.
                </p>
              </li>
              <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                <Image
                  src={"/images/blueDisc.svg"}
                  height={20}
                  width={20}
                  alt="Blue Disc"
                  className="flex-shrink-0"
                />
                <p>
                  Renowned for effective team collaboration and communication,
                  ensuring aligned progress and shared vision.
                </p>
              </li>
            </ul>
            <Link
              href={"/"}
              className="inline-flex items-center gap-[0.6rem] group mt-[1rem] mx-[2rem] "
            >
              <span className="text-[1.6rem] font-medium text-primary">
                Check now
              </span>
              <Image
                src={"./images/ArrowRightGreen.svg"}
                height={16}
                width={16}
                className="group-hover:translate-x-[1rem] duration-300 h-[1.6rem] w-[1.6rem]"
                alt="Arrow Right"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* My Work Slider */}
      <section className="w-full hidden">
        <div className="mainContainer my-[12rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight mx-auto">
            My Work
          </div>
          {/* Heading */}
          <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            Explore My Technical Endeavors
          </div>
          {/* Testimonials */}
          <div className="w-full my-[6rem] flex items-center justify-center">
            {/* Slide One */}
            <div className=" hidden flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden">
              {/* Content */}
              <div className="lg:py-[6.4rem] lg:pl-[6.4rem] w-full">
                <div className="bg-[#005CE8] p-[1.8rem] lg:p-[2.4rem] rounded-[1.6rem] inline-block max-lg:my-[2rem] lg:mb-[3.2rem]">
                  <Image
                    src={"/images/Rocket.svg"}
                    alt="Case"
                    height={34}
                    width={34}
                    className="h-[2.5rem] w-[2.5rem] lg:h-[3.4rem] lg:w-[3.4rem]"
                  />
                </div>
                {/* Heading */}
                <h1 className="text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading">
                  EaseMyKid - Education Learning Management System
                </h1>
                {/* Para */}
                <p className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem]">
                  EaseMyKid is an education, courses, and online (LMS) learning
                  management system Figma template designed for people who want
                  to start teaching online, create an LMS etc.
                </p>
                {/* Skills Badges */}
                <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] mt-[3.4rem] mb-[3.2rem] text-nowrap flex-wrap">
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    AWS
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    React
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    jQuery
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    Bootstrap 5
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    HTML
                  </div>
                </div>
                {/* Links */}
                <div className="flex items-center flex-wrap text-nowrap max-md:flex-col max-md:items-start">
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    Check Online
                  </Link>
                  <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                    /
                  </span>
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    View Details
                  </Link>
                  <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                    /
                  </span>
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    Check Client Testimonial
                  </Link>
                </div>
              </div>
              {/* Image */}
              <div className="lg:max-w-[70rem] w-full relative top-0 lg:right-[-1rem]  xl:flex-shrink-0">
                <Image
                  src={"/images/AnaysisImage.png"}
                  alt="Project Image"
                  height={800}
                  width={800}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            {/* Slide Two */}
            <div className=" flex flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden">
              {/* Content */}
              <div className="lg:py-[6.4rem] lg:pl-[6.4rem] w-full">
                <div className="bg-[#FCDC2A] p-[1.8rem] lg:p-[2.4rem] rounded-[1.6rem] inline-block max-lg:my-[2rem] lg:mb-[3.2rem]">
                  <Image
                    src={"/images/case.svg"}
                    alt="Case"
                    height={34}
                    width={34}
                    className="h-[2.5rem] w-[2.5rem] lg:h-[3.4rem] lg:w-[3.4rem]"
                  />
                </div>
                {/* Heading */}
                <h1 className="text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading">
                  EaseMyKid - Education Learning Management System
                </h1>
                {/* Para */}
                <p className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem]">
                  EaseMyKid is an education, courses, and online (LMS) learning
                  management system Figma template designed for people who want
                  to start teaching online, create an LMS etc.
                </p>
                {/* Skills Badges */}
                <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] mt-[3.4rem] mb-[3.2rem] text-nowrap flex-wrap">
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    AWS
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    React
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    jQuery
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    Bootstrap 5
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    HTML
                  </div>
                </div>
                {/* Links */}
                <div className="flex items-center flex-wrap text-nowrap max-md:flex-col max-md:items-start">
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    Check Online
                  </Link>
                  <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                    /
                  </span>
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    View Details
                  </Link>
                  <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                    /
                  </span>
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    Check Client Testimonial
                  </Link>
                </div>
              </div>
              {/* Image */}
              <div className="lg:max-w-[70rem] w-full relative top-0 lg:right-[-1rem]  xl:flex-shrink-0">
                <Image
                  src={"/images/ProjectImage.png"}
                  alt="Project Image"
                  height={800}
                  width={800}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            {/* Slide Three */}
            <div className=" hidden  flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden">
              {/* Content */}
              <div className="lg:py-[6.4rem] lg:pl-[6.4rem] w-full">
                <div className="bg-[#005CE8] p-[1.8rem] lg:p-[2.4rem] rounded-[1.6rem] inline-block max-lg:my-[2rem] lg:mb-[3.2rem]">
                  <Image
                    src={"/images/Rocket.svg"}
                    alt="Case"
                    height={34}
                    width={34}
                    className="h-[2.5rem] w-[2.5rem] lg:h-[3.4rem] lg:w-[3.4rem]"
                  />
                </div>
                {/* Heading */}
                <h1 className="text-[2.4rem] lg:text-[3.2rem] font-bold leading-[3rem] lg:leading-[4rem] text-heading">
                  EaseMyKid - Education Learning Management System
                </h1>
                {/* Para */}
                <p className="text-[1.6rem] lg:text-[1.8rem] leading-[2.4rem] font-normal text-paragraph1 mt-[1rem]">
                  EaseMyKid is an education, courses, and online (LMS) learning
                  management system Figma template designed for people who want
                  to start teaching online, create an LMS etc.
                </p>
                {/* Skills Badges */}
                <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] mt-[3.4rem] mb-[3.2rem] text-nowrap flex-wrap">
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    AWS
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    React
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    jQuery
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    Bootstrap 5
                  </div>
                  <div className="py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]">
                    HTML
                  </div>
                </div>
                {/* Links */}
                <div className="flex items-center flex-wrap text-nowrap max-md:flex-col max-md:items-start">
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    Check Online
                  </Link>
                  <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                    /
                  </span>
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    View Details
                  </Link>
                  <span className="inline-block text-border text-[2rem] px-[0.5rem] max-md:hidden">
                    /
                  </span>
                  <Link
                    href={"/"}
                    className="text-primary underline text-[1.6rem] leading-[2.4rem] font-semibold"
                  >
                    Check Client Testimonial
                  </Link>
                </div>
              </div>
              {/* Image */}
              <div className="lg:max-w-[70rem] w-full relative top-0 lg:right-[-1rem]  xl:flex-shrink-0">
                <Image
                  src={"/images/AnaysisImage.png"}
                  alt="Project Image"
                  height={800}
                  width={800}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
          {/* Navigation UI Buttons Sample */}
          <div className="flex items-center justify-center w-full mt-[6rem]">
            <div className="flex items-center justify-center gap-[1.2rem]">
              <div className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary group duration-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.25 12H3.75"
                    className="stroke-primary group-hover:stroke-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 5.25L3.75 12L10.5 18.75"
                    className="stroke-primary group-hover:stroke-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="rounded-[50%] h-[5.6rem] w-[5.6rem] border-[0.2rem] border-primary border-solid flex items-center justify-center hover:bg-primary group duration-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.75 12H20.25"
                    className="stroke-primary group-hover:stroke-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 5.25L20.25 12L13.5 18.75"
                    className="stroke-primary group-hover:stroke-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Blogs */}
      <div className="my-[10rem] lg:my-[12.6rem]">
        <OurBlogs />
      </div>

      {/* Newsletter */}
      <div className="w-full my-[9.6rem]">
        <Newsletter />
      </div>
    </div>
  );
};

export default offer;
