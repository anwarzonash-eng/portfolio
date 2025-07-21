"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { dateFormatsOptions } from "@/data/JsonData";
import {
  blogsListing,
  loadBlogs,
} from "@/hooks/apihandlers/blogListingApiHandler";
import { formatDate } from "@/hooks/formatdate";
import Image from "next/image";
import PageRendering from "./PageRendering";
import ContactMe from "./ContactMe";
import { useAppSelector } from "@/store";
import { usePathname } from "next/navigation";
import NoteDomainForPint from "./NoteDomainForPint";
import { getImageForIndex } from "@/utils/getImageForIndex";

const OurBlogs = ({ domain }) => {
  const [blogsList, setBlogs] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);

  const pathname = usePathname();

  const forcePrintStyles =
    pathname?.startsWith("/print/portfolio") ||
    pathname?.startsWith("/print/cvF") ||
    pathname?.startsWith("/print/homeF");

  useEffect(() => {
    loadBlogs({
      domain: domain,
      setBlogs: setBlogs,
      setLoading: setLoadingBlogs,
    });
  }, [domain]);

  return (
    <>
      {!urlInfo?.u && forcePrintStyles && (
        <section className="bg-transparent h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative print:bg-footerDesktop bg-center bg-cover ">
          <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
          <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center">
            <ContactMe listOfdata={listOfdata} />
          </div>
        </section>
      )}
      <section className="mainContainer print:m-0  print:pt-[1.5rem]  print:section !w-full print:FlexWrapContainer flex justify-center flex-col">
        <div className="hidden print:block relative top-[-120px]">
          <NoteDomainForPint direction={"right-0 "} />
        </div>

        {/* Top Content */}
        <div className="flex justify-between flex-wrap items-end sm:items-center gap-[2rem] mb-[4rem] print:mb-[2rem]">
          <div>
            <p className="text-sectionBG print:hidden text-[1.6rem] leading-[2.4rem] font-medium">
              Our blog
            </p>
            <h3 className="text-heading text-[3.6rem] leading-[4.4rem] font-medium mt-[1.2rem] print:m-0">
              My Latest Blogs
            </h3>
          </div>
          <div className="w-full sm:w-auto flex justify-center">
            <Link href={"/blog-listing"}>
              <button
                className="btn-primary text-white py-[1rem] 
                px-[3.4rem] text-[1.8rem] font-medium"
              >
                View All Blogs
              </button>
            </Link>
          </div>
        </div>

        <PageRendering
          props={{
            list: blogsList,
            loading: loadingblogs,
            loaderHeight: "h-[20rem]",
            actualPage: (
              <div className="w-full grid grid-cols-1 print:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[3.2rem]">
                {blogsList
                  ?.slice(0, Math.min(3, blogsList.length))
                  .map((blog, index) => (
                    <Link
                      key={index}
                      href={`/blog-listing/${blog?.id}`}
                      className="max-w-[41.8rem] w-full p-[2.4rem] print:!pt-[1rem] bg-white shadow-lg mb-[1.6rem]"
                    >
                      {blog && (
                        <Image
                          // src={blog?.featuredImage}
                          src={getImageForIndex(domain, index)}
                          height={250}
                          width={370}
                          className="h-[200px]"
                          alt="blog"
                        />
                      )}
                      {/* Card Content */}
                      <div className="mt-[3.2rem]">
                        {/* Date */}
                        <div className="mb-[1.2rem] flex items-center">
                          {/* <h4 className="text-heading text-[1.4rem] leading-[2rem] font-medium">
                          {category}
                          </h4> */}
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
                              {formatDate(
                                blog?.date,
                                dateFormatsOptions.dayMonthYear
                              )}
                            </p>
                          </div>
                        </div>
                        {/* Title */}
                        <div className="w-full flex items-center justify-between mb-[1.2rem]">
                          <h2
                            dangerouslySetInnerHTML={{
                              __html: blog?.title,
                            }}
                            className="text-[2.4rem] print:text-[2rem] font-medium leading-[3.2rem] text-heading"
                          ></h2>
                          <Link
                            href={`/blog-listing/${blog?.id}`}
                            className="hover:rotate-90 duration-300 print:hidden"
                          >
                            {/* Arrow */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                            >
                              <path
                                d="M7.66675 17L17.6667 7M17.6667 7H7.66675M17.6667 7V17"
                                className="stroke-heading"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </div>
                        {/* Description */}
                        <p
                          dangerouslySetInnerHTML={{
                            __html: blog?.excerpt,
                          }}
                          className="text-[1.6rem] leading-[2.4rem] text-paragraph1"
                        ></p>
                      </div>
                    </Link>
                  ))}
              </div>
            ),
          }}
        />
      </section>
    </>
  );
};

export default OurBlogs;
