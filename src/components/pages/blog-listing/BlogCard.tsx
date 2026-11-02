"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import type { BlogSummary } from "@/types/api";

interface BlogCardProps {
  blog: BlogSummary;
  imageSrc: string;
}

/** Single blog listing card (extracted verbatim from pages/blog-listing). */
const BlogCard = ({ blog, imageSrc }: BlogCardProps) => (
  <Link
    href={`/blog-listing/${blog?.id}`}
    className="max-w-[41.8rem] w-full p-[2.4rem] bg-surface shadow-lg mb-[1.6rem]"
  >
    {/* Card Image */}
    {blog && (
      <Image
        src={imageSrc}
        height={240}
        width={370}
        alt="blog"
        className="h-[240px] w-[370px]"
      />
    )}

    {/* Card Content */}
    <div className="mt-[3.2rem]">
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
              <circle cx="2.5" cy="3" r="2.5" fill="#C6CBD8" />
            </svg>
          </div>
          <p className="text-paragraph1 text-[1.4rem] leading-[2rem] font-normal">
            {formatDate(blog?.date, dateFormatsOptions.dayMonthYear)}
          </p>
        </div>
      </div>
      {/* Title */}
      <div className="w-full flex items-center justify-between mb-[1.2rem]">
        <h2
          dangerouslySetInnerHTML={{
            __html: blog?.title,
          }}
          className="text-[2.4rem] font-medium leading-[3.2rem] text-heading"
        ></h2>
        <Link
          href={`/blog-listing/${blog?.id}`}
          className="hover:rotate-90 duration-300"
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
);

export default BlogCard;
