"use client";

import React from "react";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";

const blogListing = () => {
  useBodyBackgroundColor("#EFF5FD");

  const blogData = [
    {
      imageSrc: "/images/blogListing/blog1.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog2.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog3.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog4.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog5.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog6.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog7.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog8.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogListing/blog9.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    // Add more blog entries here
  ];

  return (
    <div className="bg-[#EFF5FD]">
      {/* Hero Banner */}
      <section className="w-full relative">
        <div className="mainContainer h-[60.7rem] lg:h-[77rem] w-full relative">
          {/* Background SVG */}
          <div className="absolute top-0 left-0 w-full h-auto">
            {/* Desktop */}
            <svg
              viewBox="0 0 1550 770"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full hidden md:block"
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
              className="h-full w-full md:hidden"
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
          {/* Badge Heading and Paara Text */}
          <div className="max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] lg:pt-[12.5rem] relative z-20">
            {/* Badge */}
            <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight mx-auto mb-[1.6rem]">
              Our blog
            </div>
            {/* Heading */}
            <div className="text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[2rem] mb-[2.5rem] sm:mb-[4rem]">
              Resources and insights
            </div>
            {/* Pars Text */}
            <p className="text-[2rem] leading-[3rem] font-normal text-heading">
              The latest industry news, interviews, technologies, and resources.
            </p>
          </div>
        </div>
      </section>
      {/* Blog Cards */}
      <div className="mainContainer  mt-[-26rem]  lg:mt-[-40rem] relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 justify-items-center gap-[3.2rem]">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            imageSrc={blog.imageSrc}
            category={blog.category}
            date={blog.date}
            title={blog.title}
            description={blog.description}
            link={blog.link}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="mainContainer w-full flex justify-between items-center mt-[6.4rem]">
        <div className="flex items-center gap-[0.8rem] group cursor-pointer">
          <div className="group-hover:translate-x-[-1rem] duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.8334 10.0003H4.16675M4.16675 10.0003L10.0001 15.8337M4.16675 10.0003L10.0001 4.16699"
                stroke="#262626"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-[1.4rem] text-heading font-medium">Previous</p>
        </div>
        <div className="flex justify-start items-start">
          <div className="h-[4rem] w-[4rem] flex items-center justify-center group hover:bg-primary rounded-[0.8rem] duration-300">
            <p className="text-[1.4rem] font-medium text-heading group-hover:text-white">
              1
            </p>
          </div>
          <div className="h-[4rem] w-[4rem] flex items-center justify-center group hover:bg-primary rounded-[0.8rem] duration-300">
            <p className="text-[1.4rem] font-medium text-heading group-hover:text-white">
              2
            </p>
          </div>
          <div className="h-[4rem] w-[4rem] hidden md:flex items-center justify-center group hover:bg-primary rounded-[0.8rem] duration-300">
            <p className="text-[1.4rem] font-medium text-heading group-hover:text-white">
              3
            </p>
          </div>
          {/* Three Dots */}
          <div className="h-[4rem] w-[4rem] flex items-center justify-center ">
            <p className="text-[1.4rem] font-medium text-heading ">...</p>
          </div>
          <div className="h-[4rem] w-[4rem] hidden md:flex items-center justify-center group hover:bg-primary rounded-[0.8rem] duration-300">
            <p className="text-[1.4rem] font-medium text-heading group-hover:text-white">
              8
            </p>
          </div>
          <div className="h-[4rem] w-[4rem] hidden md:flex items-center justify-center group hover:bg-primary rounded-[0.8rem] duration-300">
            <p className="text-[1.4rem] font-medium text-heading group-hover:text-white">
              9
            </p>
          </div>
          <div className="h-[4rem] w-[4rem] flex items-center justify-center group hover:bg-primary rounded-[0.8rem] duration-300">
            <p className="text-[1.4rem] font-medium text-heading group-hover:text-white">
              10
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[0.8rem] group cursor-pointer">
          <p className="text-[1.4rem] text-heading font-medium">Next</p>
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
      {/* Newsletter */}
      <div className="w-full my-[9.6rem]">
        <Newsletter />
      </div>
    </div>
  );
};

export default blogListing;
