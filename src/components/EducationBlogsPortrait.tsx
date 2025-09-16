"use client";

import Image from "next/image";
import Link from "next/link";
import "@/styles/printStyles/cvPortrait.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { formatDate } from "@/hooks/formatdate";
import React, { useEffect, useState } from "react";
import { dateFormatsOptions } from "@/data/JsonData";
import WebsiteLoader from "@/components/WebsiteLoader";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import PageRendering from "@/components/PageRendering";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useAppSelector } from "@/store";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import { getImageForIndex } from "@/utils/getImageForIndex";

type SkillType = {
  title: string;
  url?: string;
};

// ✅ Simple cache for reuse across renders
const cache: {
  urlInfo?: any;
  listOfdata?: any;
  blogsList?: any[];
  skills?: any[];
} = {};

const EducationBlogsPortrait = () => {
  const searchParams = useSearchParams();

  const [urlInfo, setURLInfo] = useState(cache.urlInfo || null);
  const [listOfdata, setListOfData] = useState(cache.listOfdata || null);
  const [listOfskills, setListOfSkills] = useState(cache.skills || []);
  const [blogsList, setBlogsList] = useState(cache.blogsList || []);
  const [loading, setLoading] = useState(!cache.listOfdata);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // ✅ getRoutesDetails needs both params + searchParams
  useEffect(() => {
    if (!urlInfo) {
      const info = getRoutesDetails({}, searchParams);
      setURLInfo(info);
      cache.urlInfo = info;
    }
  }, [urlInfo, searchParams]);

  // Fetch CV data
  useEffect(() => {
    if (urlInfo && !listOfdata) {
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
        setError,
        setLoading,
        setListOfData: (data) => {
          setListOfData(data);
          cache.listOfdata = data;
        },
      });
    }
  }, [urlInfo, listOfdata]);

  // Fetch Skills
  useEffect(() => {
    if (!listOfskills?.length) {
      handleSkillsApiCall({
        setListOfSkills: (skills) => {
          setListOfSkills(skills);
          cache.skills = skills;
        },
      });
    }
  }, [listOfskills]);

  // Fetch Blogs
  useEffect(() => {
    if (listOfdata && !blogsList?.length) {
      loadBlogs({
        domain: listOfdata?.domain,
        setBlogs: (blogs) => {
          setBlogsList(blogs);
          cache.blogsList = blogs;
        },
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata, blogsList]);

  const domain = listOfdata?.domain;

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    if (urlInfo) store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return (
    <PageRendering
      props={{
        list: listOfdata,
        loading,
        error,
        actualPage: (
          <div className="bg-[#EFF5FD]">
            <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative my-[4rem] print:m-0 pr-[2rem] bg-cvSideBg bg-no-repeat bg-cover">
              {/* Note and Domain For Each Page */}
              <NoteDomainForPint
                direction={"hidden print:right-0 print:block"}
              />

              <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                {/* Education Section */}
                {listOfdata?.education_ids?.length > 0 && (
                  <div className="w-full ">
                    <h2 className="text-heading text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                      Education
                    </h2>
                    <div className="grid grid-cols-2 gap-[1.2rem] w-full">
                      {listOfdata?.education_ids?.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
                        >
                          <div className="flex items-center gap-[1.8rem]">
                            {edu?.thumbnail && (
                              <Image
                                src={edu?.thumbnail}
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
                            <p className="text-[1.2rem] text-[#3E3E3E]">
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
                )}

                {/* Blogs Section */}
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h2 className="text-heading text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
                      Blogs
                    </h2>
                    <Link href={"/blog-listing"}>
                      <button className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium">
                        View All Blogs
                      </button>
                    </Link>
                  </div>

                  {loadingblogs ? (
                    <WebsiteLoader height="h-[20rem]" />
                  ) : (
                    blogsList
                      ?.slice(0, Math.min(2, blogsList.length))
                      .map((blog, index) => (
                        <Link
                          href={`/blog-listing/${blog?.id}`}
                          key={index}
                          className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row"
                        >
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
                              <p className="text-[1.4rem] text-paragraph1">
                                {formatDate(
                                  blog?.date,
                                  dateFormatsOptions.dayMonthYear
                                )}
                              </p>
                            </div>
                            <h2
                              dangerouslySetInnerHTML={{ __html: blog?.title }}
                              className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]"
                            />
                            <p
                              dangerouslySetInnerHTML={{
                                __html: blog?.excerpt,
                              }}
                              className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]"
                            />
                          </div>
                        </Link>
                      ))
                  )}
                </div>
              </div>
            </section>
          </div>
        ),
      }}
    />
  );
};

export default EducationBlogsPortrait;
