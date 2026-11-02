"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";
import OurBlogs from "@/components/OurBlogs";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { useAppDispatch } from "@/store";
import { setProfileUrlInfo } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { formatDate } from "@/hooks/formatdate";
import { authorBlogIds, dateFormatsOptions } from "@/data/JsonData";
import PageRendering from "@/components/PageRendering";
import BlogDetailMobileSVG from "@/components/BlogDetailMobileSVG";
import BlogDetailDesktopSVG from "@/components/BlogDetailDesktopSVG";
import { getImageForIndex } from "@/utils/getImageForIndex";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import EducationComponent from "@/components/EducationComponent";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import type { PageProps } from "@/types/page";

const BlogDetails = ({ params }: PageProps) => {
  const [urlInfo, setURLInfo] = useState(null);
  const [loadingblogs, setLoadingBlogs] = useState(true);
  const [, setLoading] = useState(false);
  const [listOfdata, setListOfData] = useState(null);
  const [blogdata, setBlogData] = useState(null);
  const [error, setError] = useState(null);
  const [blogsList, setBlogsList] = useState([]); // Add state for blogs list
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useEffect(() => {
    if (urlInfo) {
      dispatch(setProfileUrlInfo(urlInfo));
      reportsApiHandler({
        urlInfo,
        setLoading,
        setError,
        setListOfData,
      });
    }
  }, [urlInfo, dispatch]);

  // Load blogs to find the index
  useEffect(() => {
    if (listOfdata?.domain) {
      loadBlogs({
        domain: listOfdata.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata]);

  // Fetch individual blog data
  useEffect(() => {
    const blogsListing = async () => {
      try {
        setLoadingBlogs(true);
        const author = authorBlogIds.find(
          (item) => item.authorName === listOfdata?.domain
        );
        if (author) {
          const response = await fetch(author.fileName);
          const data = await response.json();
          const foundData = data?.find(
            (blog) => blog.id === Number(params?.id)
          );
          setBlogData(foundData);
        }
      } catch {
        setError("Invalid URL. Please try again.");
      } finally {
        setLoadingBlogs(false);
      }
    };

    if (listOfdata && params?.id) {
      blogsListing();
    }
  }, [listOfdata, params]);

  // Find the index of the current blog in blogsList
  const blogIndex = blogsList.findIndex(
    (blog) => blog.id === Number(params?.id)
  );

  useBodyBackgroundColor("#EFF5FD");

  return (
    <div className="bg-[#EFF5FD] dark:bg-pageBG">
      <PageRendering
        props={{
          list: blogdata,
          loading: loadingblogs,
          error: error,
          actualPage: (
            <>
              <section className="mainContainer w-full lg:h-[90rem] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-auto">
                  <BlogDetailDesktopSVG />
                  <BlogDetailMobileSVG />
                </div>
                <div className="mainContainer w-full flex items-center justify-center flex-col text-center pt-[12.5rem] pb-[8rem] relative z-20">
                  <div className="flex items-center text-white text-[1.4rem] leading-[2rem] font-medium">
                    <p>
                      {formatDate(
                        blogdata?.date,
                        dateFormatsOptions.dayMonthYear
                      )}
                    </p>
                  </div>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: blogdata?.title?.rendered,
                    }}
                    className="text-[4rem] lg:text-[6rem] leading-[5rem] lg:leading-[8rem] font-medium text-white mt-[1.6rem] mb-[2.4rem]"
                  ></h1>
                  <div className="flex items-center justify-center gap-[1.2rem]">
                    <div className="h-[4rem] px-[1.6rem] flex items-center gap-[0.8rem] justify-center bg-white/30 rounded-[0.8rem] shadow border border-[#c6cbd8]/40 backdrop-blur-[14px] cursor-pointer">
                      <Image
                        src={"/images/copy.svg"}
                        height={20}
                        width={20}
                        alt="Copy"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(blogdata?.link);
                          Swal.fire({
                            icon: "success" as SweetAlertIcon,
                            title: "Copied!",
                          });
                        }}
                        className="text-white font-medium text-[1.4rem] leading-[2rem]"
                      >
                        Copy link
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="mainContainer w-full relative top-0 lg:mt-[-54rem]">
                <div className="max-w-[102.4rem] mx-auto w-full my-[5rem] rounded-[1rem]">
                  {/* Use getImageForIndex for the blog image */}
                  {blogdata && blogIndex !== -1 && (
                    <>
                      <Image
                        src={getImageForIndex(listOfdata?.domain, blogIndex)}
                        height={532}
                        width={1024}
                        alt="Banner"
                        className="hidden lg:block h-[53.2rem] w-[102.4rem] object-contain rounded-[1rem]"
                      />
                      <Image
                        src={getImageForIndex(listOfdata?.domain, blogIndex)}
                        height={410}
                        width={800}
                        alt="Banner"
                        className="w-full object-contain lg:hidden rounded-[1rem]"
                      />
                    </>
                  )}
                  <div className="my-[4.4rem] w-full">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogdata?.content?.rendered,
                      }}
                      className="text-heading list-div modifiedText blogs-modified text-[1.8rem] leading-[3.6rem] self-stretch justify-start items-start w-full mt-[3.2rem]"
                    ></div>
                  </div>
                </div>
              </section>
              <div>
                <UpworkActivitySection
                  urlInfo={urlInfo}
                  cvTrue={false}
                  data={listOfdata}
                />
              </div>
              {/* Education Section */}
              <div id="education" className="my-[5rem]">
                {listOfdata && (
                  <EducationComponent
                    listOfdata={listOfdata}
                    formatDate={formatDate}
                    dateFormatsOptions={dateFormatsOptions}
                  />
                )}
              </div>

              <div className="w-full my-[5rem]">
                <OurBlogs domain={listOfdata?.domain} />
              </div>
              {!urlInfo?.u && (
                <section className="w-full mb-[5rem]">
                  <Newsletter listOfdata={listOfdata} />
                </section>
              )}
            </>
          ),
        }}
      />
    </div>
  );
};

export default BlogDetails;
