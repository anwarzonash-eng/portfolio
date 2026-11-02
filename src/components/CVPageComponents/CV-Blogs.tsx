"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebsiteLoader from "../WebsiteLoader";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import { getImageForIndex } from "@/utils/getImageForIndex";

import type { BlogSummary } from "@/types/api";

interface CVBlogsProps {
  blogsList: BlogSummary[];
  loadingblogs: boolean;


  domain: string;
}

const CVBlogs: React.FC<CVBlogsProps> = ({
  blogsList,
  loadingblogs,
  domain,
}) => {
  return (
    <div className="overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] w-full">
      {/* Title */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
          Blogs
        </h2>
        <Link
          href={"/blog-listing"}
          className=" flex items-center gap-[0.6rem] group cursor-pointer"
        >
          <div className="hover:font-bold hover:text-primary text-[1.4rem] text-heading font-medium">
            View all
          </div>
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
        </Link>
      </div>

      {/* Blogs List */}
      {loadingblogs ? (
        <WebsiteLoader height="h-[20rem]" />
      ) : (
        <>
          {blogsList
            ?.slice(0, Math.min(3, blogsList.length))
            .map((blog, index) => (
              <Link
                href={`/blog-listing/${blog?.id}`}
                key={index}
                className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row"
              >
                {/* Card Image */}
                {blog?.featuredImage && (
                  <div className="sm:w-[20rem] h-[19rem] w-full flex-shrink-0">
                    <Image
                      src={getImageForIndex(domain, index)}
                      height={300}
                      width={300}
                      alt={`Blog ${index + 1}`}
                      className="object-cover h-full w-full"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div>
                  {/* Date */}
                  <div className="mb-[1.2rem] flex items-center">
                    <div className="flex items-center">
                      <div className="mx-[0.6rem]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="5"
                          height="6"
                          viewBox="0 0 5 6"
                          fill="none"
                        >
                          <circle cx="2.5" cy="3" r="2.5" fill="#C6CBD8" />
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
                  <h2
                    dangerouslySetInnerHTML={{ __html: blog?.title }}
                    className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]"
                  ></h2>

                  {/* Description */}
                  <p
                    dangerouslySetInnerHTML={{ __html: blog?.excerpt }}
                    className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]"
                  ></p>

                  {/* Read Now */}
                  <Link
                    href={`/blog-listing/${blog?.id}`}
                    className="duration-300 inline-flex items-center gap-[0.8rem] group"
                  >
                    <p className="text-primary text-[1.4rem] font-medium leading-[2.4rem]">
                      Read Now
                    </p>
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
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default CVBlogs;
