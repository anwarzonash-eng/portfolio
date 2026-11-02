"use client";

import { useEffect, useState } from "react";
import Newsletter from "@/components/Newsletter";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails, type RoutesInfo } from "@/hooks/url";
import { store } from "@/store";
import { setProfileUrlInfo } from "@/store/profileSlice";
import { dateFormatsOptions } from "@/data/JsonData";
import WebsiteLoader from "@/components/WebsiteLoader";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { formatDate } from "@/hooks/formatdate";
import { getImageForIndex } from "@/utils/getImageForIndex";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import EmptyState from "@/components/EmptyState";
import EducationComponent from "@/components/EducationComponent";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import BlogHeroBanner from "@/components/pages/blog-listing/BlogHeroBanner";
import BlogCard from "@/components/pages/blog-listing/BlogCard";
import type { BlogSummary, ProfileReport } from "@/types/api";
import type { PageProps } from "@/types/page";

// NOTE: this page keeps its own bootstrap instead of useProfileReport — it
// historically starts with loading=false and never mirrors profileLoading
// into the store, and changing that would alter the header's visibility
// timing on this route.
const BlogListing = ({ params }: PageProps) => {
  const [urlInfo, setURLInfo] = useState<RoutesInfo | null>(null);
  const [blogsList, setBlogsList] = useState<BlogSummary[]>([]);
  const [listOfdata, setListOfData] = useState<ProfileReport | null>(null);
  const [loadingblogs, setLoadingBlogs] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useEffect(() => {
    if (urlInfo) {
      reportsApiHandler({
        urlInfo,
        setLoading,
        setListOfData,
        setError,
      });
    }
  }, [urlInfo]);

  const domain = listOfdata?.domain || "default";

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    if (listOfdata) {
      loadBlogs({
        domain: listOfdata?.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata]);

  // 👉 Handle error state
  if (error) {
    return <EmptyState message={error || "No data found."} />;
  }

  // 👉 Handle loading state
  if (loading || loadingblogs) {
    return <WebsiteLoader height="h-[30rem]" />;
  }

  return (
    <div className="bg-[#EFF5FD] dark:bg-pageBG">
      {/* Hero Banner */}
      <BlogHeroBanner loading={loading} loadingblogs={loadingblogs} />

      {/* Blog Cards */}
      {blogsList && blogsList.length > 0 && (
        <div className="mainContainer  mt-[-26rem]  lg:mt-[-40rem] relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 justify-items-center gap-[3.2rem]">
          {blogsList.map((blog, index) => (
            <BlogCard
              key={index}
              blog={blog}
              imageSrc={getImageForIndex(domain, index)}
            />
          ))}
          {/* Newsletter */}
        </div>
      )}

      {/* Upwork Activity Section */}
      {listOfdata && listOfdata?.upwork_show_status === "show" && (
        <div className="mt-[2rem] lg:mt-[3rem]">
          <UpworkActivitySection
            urlInfo={urlInfo}
            cvTrue={false}
            data={listOfdata}
          />
        </div>
      )}

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

      {!urlInfo?.u && (
        <div className="w-full my-[5rem]">
          <Newsletter listOfdata={listOfdata} />
        </div>
      )}

      {/* Pagination */}
    </div>
  );
};

export default BlogListing;
