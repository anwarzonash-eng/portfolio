"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { dateFormatsOptions } from "@/data/JsonData";
import {
  blogsListing,
  loadBlogs,
} from "@/hooks/apihandlers/blogListingApiHandler";
import { formatDate } from "@/hooks/formatdate";
import Image from "next/image";
import WebsiteLoader from "./WebsiteLoader";
import PageRendering from "./PageRendering";
import Footer from "./layouts/footer/page";
import ContactMe from "./ContactMe";
import { useAppSelector } from "@/store";
import NoteDomainForPint from "./NoteDomainForPint";
import { getImageForIndex } from "@/utils/getImageForIndex";

const OurBlogsPortrait = ({ domain, locationLink }) => {
  const [blogsList, setBlogs] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);

  useEffect(() => {
    loadBlogs({
      domain: domain,
      setBlogs: setBlogs,
      setLoading: setLoadingBlogs,
    });
  }, [domain]);

  return (
    <>
      {/* Blog Section */}
      <section className="bg-transparent print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center relative">
        {/* Note and Domain For Each Page */}
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
        <div className="w-full px-[4rem]">
          {/* Top Content */}
          <div className="flex justify-between flex-wrap items-end sm:items-center gap-[2rem] my-[4rem] print:my-[2rem]">
            <h3 className="text-heading text-[3.6rem] print:text-[2rem]  leading-[4.4rem] font-medium mt-[1.2rem] print:m-0">
              My Latest Blogs
            </h3>
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
                <div className="w-full grid grid-cols-1 justify-items-center gap-[2rem]">
                  {blogsList
                    ?.slice(0, Math.min(3, blogsList.length))
                    .map((blog, index) => (
                      <Link
                        key={index}
                        href={`/blog-listing/${blog?.id}`}
                        className="w-full p-[2.4rem] print:!pt-[1rem] bg-white shadow-lg  grid grid-cols-2"
                      >
                        <div className="h-[250px] w-full pr-5">
                          {blog?.featuredImage && (
                            <Image
                              // src={blog?.featuredImage}
                              src={getImageForIndex(domain, index)}
                              height={250}
                              width={370}
                              className="h-full w-full object-cover"
                              alt="blog"
                            />
                          )}
                        </div>
                        {/* Card Content */}
                        <div className="border-l-[5px] border-primary pl-5">
                          {/* Date */}
                          <div className="mb-[1.2rem] flex items-center">
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
        </div>
      </section>
      {/* Contact Form Section */}
      {!urlInfo?.u && (
        <section className="bg-transparent print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center mt-20 print:m-0 relative print:bg-footerDesktop bg-cover bg-center">
          {/* Note and Domain For Each Page */}
          <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
          <div className="w-full px-[4rem]">
            <ContactMe listOfdata={listOfdata} />
          </div>
        </section>
      )}
    </>
  );
};

export default OurBlogsPortrait;
