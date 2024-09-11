"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import HomeSlider from "@/components/Sliders/HomeSlider";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { cardData } from "@/data/JsonData";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import WebsiteLoader from "@/components/WebsiteLoader";

const Offer = ({ params }: { params: { slug: string } }) => {
  // This is the Custom Hook That
  // use to SET the Background Color
  // OF THE Current Page
  useBodyBackgroundColor("#EFF5FD");

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [mainSerice, setMainSerice] = useState(null);
  const [detailSerice, setDetailSerice] = useState(null);

  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "home",
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    if (urlInfo) {
      const tmpMainservice = listOfdata.services?.find((service) => {
        return service.type === "main";
      });
      let modifiedHtml = tmpMainservice.intro_detail?.replace(
        /<ul>/g,
        "<ul class='text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]'>"
      );
      modifiedHtml = modifiedHtml.replace(
        /<li>/g,
        `<li class="flex items-center gap-[1rem] lg:gap-[1.7rem] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-3 before:h-3 before:bg-primary before:rounded-full pl-10 m-1">`
      );
      tmpMainservice.intro_detail = modifiedHtml;

      setMainSerice(tmpMainservice);

      setDetailSerice(
        listOfdata.services?.filter((service) => {
          return service.type === "detail";
        })
      );
    }
  }, [listOfdata]);

  // useEffect(() => {
  //   if (mainSerice) {
  //     const modifiedHtml = mainSerice.intro_detail.replace(
  //       /<ul>/g,
  //       "<ul class='text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]'>"
  //     );
  //     setMainSerice((prevState) => ({
  //       ...prevState,
  //       intro_detail: modifiedHtml,
  //     }));
  //   }
  // }, [mainSerice]);

  if (!loading && listOfdata) {
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
                {listOfdata.tag_line}
              </div>
            </div>
          </div>
        </section>
        {/* Offer Letter Section */}
        <div className="mainContainer w-full mt-[-42rem] lg:mt-[-28rem] relative">
          {/* Content Box Top */}
          {mainSerice && (
            <div className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[4rem]">
              <div className="p-[1rem] lg:p-[3rem]">
                <h3
                  dangerouslySetInnerHTML={{ __html: mainSerice?.intro_main }}
                  className="text-center text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem] font-medium border border-border border-solid p-[1rem] lg:p-[3rem] shadow-lg"
                ></h3>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: mainSerice?.intro_detail }}
                className="p-[1rem] lg:p-[3rem]"
              ></div>
              {/* <div className="p-[1rem] lg:p-[3rem]">
              <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
                <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-3 before:h-3 before:bg-primary before:rounded-full pl-10 m-1">
                  <p>
                    Full Stack Developer with deep expertise in{" "}
                    <span className="text-primary font-medium">
                      designing, building, and deploying
                    </span>{" "}
                    end-to-end web solutions.
                  </p>
                </li>
                <li className="flex items-center gap-[1rem] lg:gap-[1.7rem] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M8.33355 12.1388C6.41589 12.1388 4.86133 10.5842 4.86133 8.66656C4.86133 6.7489 6.41589 5.19434 8.33355 5.19434C10.2512 5.19434 11.8058 6.7489 11.8058 8.66656C11.8058 10.5842 10.2512 12.1388 8.33355 12.1388Z"
                      fill="#2E2E48"
                    />
                  </svg>
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
                    like GraphQL for efficient data fetching. Solid background
                    in back-end development with Node.js, coupled with hands-on
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
                    Adept at creating and integrating REST APIs ensuring
                    seamless front-to-back functionality and API Integrations.
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
            </div> */}
            </div>
          )}
          {/* Content Box Bottom 4 */}
          {detailSerice &&
            detailSerice.map((service, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden"
              >
                <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
                    {/* Circle Icon */}
                    <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow ">
                      <div className="text-center text-white text-[4.3rem] font-medium ">
                        {/* {service.icon} */}

                        {service.picture && (
                          <Image
                            src={service.picture}
                            height={100}
                            width={100}
                            alt="Icon"
                          />
                        )}
                      </div>
                    </div>
                    {/* Title */}
                    <h3 className="text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-white text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
                    {/* {card.description} */}
                  </p>
                </div>
                <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white">
                  {/* <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
                    {card.listItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-[1rem] lg:gap-[1.7rem] "
                      >
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0"
                        />
                        <p>
                          {item.highlight &&
                          item.text.includes(item.highlight) ? (
                            <>
                              {item.text.split(item.highlight)[0]}
                              <span className="text-primary font-medium">
                                {item.highlight}
                              </span>
                              {item.text.split(item.highlight)[1]}
                            </>
                          ) : (
                            item.text
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={card.linkUrl}
                    className="inline-flex items-center gap-[0.6rem] group mt-[1rem] mx-[2rem] "
                  >
                    <span className="text-[1.6rem] font-medium text-primary">
                      {card.linkText}
                    </span>
                    <Image
                      src={"./images/ArrowRightGreen.svg"}
                      height={16}
                      width={16}
                      className="group-hover:translate-x-[1rem] duration-300 h-[1.6rem] w-[1.6rem]"
                      alt="Arrow Right"
                    />
                  </Link> */}
                </div>
              </div>
              //   <div
              //   key={index}
              //   className="w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden"
              // >
              //   <div className="p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain">
              //     <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
              //       {/* Circle Icon */}
              //       <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow ">
              //         <div className="text-center text-white text-[4.3rem] font-medium ">
              //           {/* {service.icon} */}
              //         </div>
              //       </div>
              //       {/* Title */}
              //       <h3 className="text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium">
              //         {service.title}
              //       </h3>
              //     </div>
              //     <p className="text-white text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]">
              //       {/* {card.description} */}
              //     </p>
              //   </div>
              //   <div className="p-[1rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white">
              //     <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem]">
              //       {card.listItems.map((item, index) => (
              //         <li
              //           key={index}
              //           className="flex items-center gap-[1rem] lg:gap-[1.7rem] "
              //         >
              //           <Image
              //             src={"/images/blueDisc.svg"}
              //             height={20}
              //             width={20}
              //             alt="Blue Disc"
              //             className="flex-shrink-0"
              //           />
              //           <p>
              //             {item.highlight &&
              //             item.text.includes(item.highlight) ? (
              //               <>
              //                 {item.text.split(item.highlight)[0]}
              //                 <span className="text-primary font-medium">
              //                   {item.highlight}
              //                 </span>
              //                 {item.text.split(item.highlight)[1]}
              //               </>
              //             ) : (
              //               item.text
              //             )}
              //           </p>
              //         </li>
              //       ))}
              //     </ul>
              //     <Link
              //       href={card.linkUrl}
              //       className="inline-flex items-center gap-[0.6rem] group mt-[1rem] mx-[2rem] "
              //     >
              //       <span className="text-[1.6rem] font-medium text-primary">
              //         {card.linkText}
              //       </span>
              //       <Image
              //         src={"./images/ArrowRightGreen.svg"}
              //         height={16}
              //         width={16}
              //         className="group-hover:translate-x-[1rem] duration-300 h-[1.6rem] w-[1.6rem]"
              //         alt="Arrow Right"
              //       />
              //     </Link>
              //   </div>
              // </div>
            ))}
        </div>
        {/* My Work Section Slider  */}
        <section className="w-full">
          <div className="mainContainer my-[12rem]">
            {/* Badge */}
            <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
              My Work
            </div>
            {/* Heading */}
            <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
              Explore My Technical Endeavors
            </div>

            {/* Home Page Slider */}
            {/* <HomeSlider portfolios={listOfdata?.portfolios_ids} /> */}
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
  } else {
    // return <div>Loading</div>;
    <WebsiteLoader />;
  }
};

export default Offer;
