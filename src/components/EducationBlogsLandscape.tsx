"use client";
import Image from "next/image";
import Link from "next/link";
import "@/styles/printStyles/cvLandscape.css";
import { formatDate } from "@/hooks/formatdate";
import React, { useEffect, useState } from "react";
import { dateFormatsOptions } from "@/data/JsonData";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import { getImageForIndex } from "@/utils/getImageForIndex";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import PageRendering from "./PageRendering";

/** ---------- SIMPLE IN-MEMORY CACHE ---------- **/
const cache: {
  urlInfo?: any;
  listOfdata?: any;
  blogsList?: any[];
  error?: string | null;
} = {};

const EducationBlogsLandscape = () => {
  const searchParams = useSearchParams();

  const [urlInfo, setURLInfo] = useState<any>(cache.urlInfo ?? null);
  const [listOfdata, setListOfData] = useState<any>(cache.listOfdata ?? null);
  const [blogsList, setBlogsList] = useState<any[]>(cache.blogsList ?? []);
  const [error, setError] = useState<string | null>(cache.error ?? null);

  /** STEP 1: get URL info once */
  /** STEP 1: derive URL info once (Asynchronously) */
  useEffect(() => {
    // Only proceed if urlInfo hasn't been set yet (either in state or cache)
    if (!urlInfo) {
      // 🛑 Define and call an async function inside useEffect 🛑
      const fetchAndSetUrlInfo = async () => {
        try {
          // Await the asynchronous function call
          const info = await getRoutesDetails({}, searchParams);

          // Update state and cache with the resolved info object
          setURLInfo(info);
          cache.urlInfo = info;
        } catch (e) {
          // It's good practice to handle potential errors in the async operation
          console.error("Failed to get URL details:", e);
          setError("Failed to retrieve necessary URL parameters.");
        }
      };

      fetchAndSetUrlInfo();
    }
    // Dependencies are correct: [urlInfo, searchParams]
  }, [urlInfo, searchParams]);

  /** STEP 2: fetch reports data once */
  useEffect(() => {
    if (urlInfo && !listOfdata) {
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
        setError: (err: string | null) => {
          setError(err);
          cache.error = err;
        },
        setLoading: () => {}, // no spinner
        setListOfData: (data: any) => {
          setListOfData(data);
          cache.listOfdata = data;
        },
      });
    }
  }, [urlInfo, listOfdata]);

  /** STEP 3: fetch blogs once */
  useEffect(() => {
    if (listOfdata?.domain && blogsList.length === 0) {
      loadBlogs({
        domain: listOfdata.domain,
        setBlogs: (blogs: any[]) => {
          setBlogsList(blogs);
          cache.blogsList = blogs;
        },
        setLoading: () => {}, // skip spinner
      });
    }
  }, [listOfdata, blogsList.length]);

  const domain = listOfdata?.domain;

  // console.log("Education Data Checking:", listOfdata);

  return (
    <PageRendering
      props={{
        list: listOfdata,
        loading: false, // ✅ always false, no spinner needed
        error,
        actualPage: (
          <div className="bg-white">
            {/* Education + Blogs Section */}
            <section
              className="print:h-screen print:section !w-full print:FlexWrapContainer
                flex items-center justify-center overflow-hidden relative my-[4rem] print:m-0 pr-[2rem]"
            >
              <NoteDomainForPint
                direction={"hidden print:right-0 print:block"}
              />
              <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                {/* ---------- Education Section ---------- */}
                {listOfdata?.education_ids?.length > 0 && (
                  <div className="relative w-full">
                    <div className="w-full ml-10">
                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                        Education
                      </h2>
                      <div className="grid grid-cols-2 gap-[1.2rem] w-full">
                        {listOfdata.education_ids.map((edu: any) => (
                          <div
                            key={edu.id}
                            className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
                          >
                            <div className="flex items-center gap-[1.8rem]">
                              {edu?.thumbnail && (
                                <Image
                                  src={edu.thumbnail}
                                  height={34}
                                  width={34}
                                  alt={edu.university_name}
                                  className="h-[34px] w-[34px]"
                                />
                              )}
                              <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                                {edu.university_name}
                              </h3>
                            </div>
                            <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem]" />
                            <div>
                              <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                                {edu.degree_name}
                              </h2>
                              <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                                {formatDate(
                                  edu.degree_start_date,
                                  dateFormatsOptions.shortMonthYear
                                )}{" "}
                                -{" "}
                                {isNaN(
                                  new Date(edu.degree_end_date).getFullYear()
                                )
                                  ? edu.degree_end_date
                                  : formatDate(
                                      edu.degree_end_date,
                                      dateFormatsOptions.shortMonthYear
                                    )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------- Blogs Section ---------- */}
                <div className="relative w-full">
                  <div className="w-full ml-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                        Blogs
                      </h2>
                      <div className="w-full sm:w-auto flex justify-center">
                        <Link href={"/blog-listing"}>
                          <button className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium">
                            View All Blogs
                          </button>
                        </Link>
                      </div>
                    </div>

                    {blogsList?.slice(0, 2).map((blog, index) => (
                      <Link
                        href={`/blog-listing/${blog.id}`}
                        key={index}
                        className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem]"
                      >
                        {blog?.featuredImage && (
                          <div className="w-[20rem] h-[16rem] flex-shrink-0">
                            <Image
                              src={getImageForIndex(domain, index)}
                              height={300}
                              width={300}
                              alt={`Blog ${index + 1}`}
                              className="object-cover h-full w-full"
                            />
                          </div>
                        )}
                        <div>
                          <div className="mb-[1.2rem] flex items-center">
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
                                blog.date,
                                dateFormatsOptions.dayMonthYear
                              )}
                            </p>
                          </div>
                          <h2
                            dangerouslySetInnerHTML={{ __html: blog.title }}
                            className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]"
                          />
                          <p
                            dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                            className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ),
      }}
    />
  );
};

export default EducationBlogsLandscape;
